const router = require("express").Router();
const Joi = require("joi");

const { db, FieldValue } = require("../lib/firestore");
const { requireAdmin } = require("../lib/auth-middleware");
const { sendMail, paidMail } = require("../lib/email");

// 用 (floor, area, row, col) 找 sellable seat doc。座位是 auto-id，沒辦法 by id 直查。
function seatLookupQuery(p) {
  return db
    .collection("seats")
    .where("floor", "==", p.floor)
    .where("area", "==", p.area)
    .where("row", "==", p.row)
    .where("col", "==", p.col)
    .limit(1);
}

router.use(requireAdmin);

router.get("/", (_req, res) => res.send("Admin api ok"));

// 把整個 collection 用 chunked batched writes 套用 mutator
async function applyToCollectionInChunks(query, mutator) {
  const CHUNK = 400;
  let cursor = null;
  let total = 0;
  while (true) {
    let q = query.orderBy("__name__").limit(CHUNK);
    if (cursor) q = q.startAfter(cursor);
    const snap = await q.get();
    if (snap.empty) break;
    const batch = db.batch();
    snap.docs.forEach((doc) => mutator(batch, doc));
    await batch.commit();
    total += snap.size;
    if (snap.size < CHUNK) break;
    cursor = snap.docs[snap.docs.length - 1];
  }
  return total;
}

// GET /api/admin/bookings — 所有訂單，並把每個訂單對應的座位附在 seats 欄位
router.get("/bookings", async (_req, res) => {
  try {
    const [bookingSnap, seatSnap] = await Promise.all([
      db.collection("bookings").get(),
      db.collection("seats").where("sold", "==", true).get(),
    ]);

    const seatsByEmail = new Map();
    seatSnap.docs.forEach((d) => {
      const data = { id: d.id, ...d.data() };
      if (!data.buyerEmail) return;
      if (!seatsByEmail.has(data.buyerEmail)) {
        seatsByEmail.set(data.buyerEmail, []);
      }
      seatsByEmail.get(data.buyerEmail).push(data);
    });

    const bookings = bookingSnap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ...data,
        seats: seatsByEmail.get(d.id) || [],
      };
    });
    res.json(bookings);
  } catch (err) {
    console.error("GET /admin/bookings failed:", err);
    res.status(500).json({ success: false, message: "Please try again" });
  }
});

// PATCH /api/admin/clearAllSeats — 全部歸零（場次結束 / 重來時用）
router.patch("/clearAllSeats", async (_req, res) => {
  try {
    const seatsCleared = await applyToCollectionInChunks(
      db.collection("seats"),
      (batch, doc) => {
        batch.update(doc.ref, {
          sold: false,
          buyerEmail: null,
          paid: false,
          bookedAt: null,
        });
      }
    );
    const bookingsDeleted = await applyToCollectionInChunks(
      db.collection("bookings"),
      (batch, doc) => batch.delete(doc.ref)
    );
    res.json({
      success: true,
      seatsCleared,
      bookingsDeleted,
    });
  } catch (err) {
    console.error("clearAllSeats failed:", err);
    res.status(500).json({ success: false, message: "Clear fail" });
  }
});

// PATCH /api/admin/clearByEmail — 清掉某 email 的所有座位（booking 文件保留以保留驗證狀態）
router.patch("/clearByEmail", async (req, res) => {
  const email = (req.body.email || "").toLowerCase();
  if (!email) return res.status(400).json({ success: false, message: "Missing email" });

  try {
    const seatSnap = await db
      .collection("seats")
      .where("buyerEmail", "==", email)
      .get();

    const batch = db.batch();
    seatSnap.docs.forEach((d) => {
      batch.update(d.ref, {
        sold: false,
        buyerEmail: null,
        paid: false,
        bookedAt: null,
      });
    });
    const bookingRef = db.doc(`bookings/${email}`);
    batch.set(
      bookingRef,
      { emailSent: false, updatedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
    await batch.commit();

    const updated = await bookingRef.get();
    res.json({
      success: true,
      seatsCleared: seatSnap.size,
      booking: updated.exists ? { id: updated.id, ...updated.data() } : null,
    });
  } catch (err) {
    console.error("clearByEmail failed:", err);
    res.status(500).json({ success: false, message: "Error, please try again" });
  }
});

// PATCH /api/admin/removeSeat — 移除單一座位
const removeSeatSchema = Joi.object({
  email: Joi.string().email().required(),
  floor: Joi.number().integer().valid(1, 2).required(),
  area: Joi.string().valid("S", "A", "B", "C").required(),
  row: Joi.number().integer().min(1).required(),
  col: Joi.number().integer().min(1).required(),
});

router.patch("/removeSeat", async (req, res) => {
  const { error, value } = removeSeatSchema.validate(req.body);
  if (error)
    return res.status(400).json({ success: false, message: error.details[0].message });

  const email = value.email.toLowerCase();

  try {
    await db.runTransaction(async (tx) => {
      const seatSnap = await tx.get(seatLookupQuery(value));
      if (seatSnap.empty) {
        const err = new Error("SEAT_NOT_FOUND");
        err.status = 404;
        err.userMessage = "找不到座位";
        throw err;
      }
      const seatDoc = seatSnap.docs[0];
      if (seatDoc.data().buyerEmail !== email) {
        const err = new Error("NOT_OWNED");
        err.status = 400;
        err.userMessage = "此座位不屬於該 email";
        throw err;
      }
      tx.update(seatDoc.ref, {
        sold: false,
        buyerEmail: null,
        paid: false,
        bookedAt: null,
      });
      tx.set(
        db.doc(`bookings/${email}`),
        { emailSent: false, updatedAt: FieldValue.serverTimestamp() },
        { merge: true }
      );
    });
    res.json({ success: true });
  } catch (err) {
    if (err.userMessage) {
      return res
        .status(err.status || 400)
        .json({ success: false, message: err.userMessage });
    }
    console.error("removeSeat failed:", err);
    res.status(500).json({ success: false, message: "Error, please try again" });
  }
});

// PATCH /api/admin/area — 改 area
const areaSchema = Joi.object({
  positions: Joi.array()
    .items(
      Joi.object({
        floor: Joi.number().integer().valid(1, 2).required(),
        area: Joi.string().valid("S", "A", "B", "C").required(),
        row: Joi.number().integer().min(1).required(),
        col: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
  newArea: Joi.string().valid("S", "A", "B", "C").required(),
});

router.patch("/area", async (req, res) => {
  const { error, value } = areaSchema.validate(req.body);
  if (error)
    return res.status(400).json({ success: false, message: error.details[0].message });

  // doc id 是 auto-id，改 area 就是單純 update area 欄位、doc id 不動。
  // 已售出的座位 admin 應該先 clearByEmail / removeSeat 再改 area，這裡擋一下避免誤動。
  let migrated = 0;
  try {
    for (const pos of value.positions) {
      await db.runTransaction(async (tx) => {
        const snap = await tx.get(seatLookupQuery(pos));
        if (snap.empty) return; // 找不到視為 no-op，不報錯
        const doc = snap.docs[0];
        if (doc.data().sold) {
          const err = new Error("SEAT_SOLD");
          err.status = 400;
          err.userMessage = `${pos.floor}F ${pos.area} ${pos.row}-${pos.col} 已被劃，請先清除`;
          throw err;
        }
        tx.update(doc.ref, { area: value.newArea });
        migrated += 1;
      });
    }
    res.json({ success: true, migrated });
  } catch (err) {
    if (err.userMessage) {
      return res
        .status(err.status || 400)
        .json({ success: false, message: err.userMessage });
    }
    console.error("change area failed:", err);
    res.status(500).json({ success: false, message: "更新失敗，請稍後再試" });
  }
});

// PATCH /api/admin/markPaid — 標記某 email 的所有座位為已付款
router.patch("/markPaid", async (req, res) => {
  const email = (req.body.email || "").toLowerCase();
  if (!email) return res.status(400).json({ success: false, message: "Missing email" });

  try {
    const seatSnap = await db
      .collection("seats")
      .where("buyerEmail", "==", email)
      .get();
    if (seatSnap.empty) {
      return res.status(404).json({ success: false, message: "該 email 目前沒有座位" });
    }
    const batch = db.batch();
    seatSnap.docs.forEach((d) => batch.update(d.ref, { paid: true }));
    await batch.commit();
    res.json({ success: true, seatsMarked: seatSnap.size });
  } catch (err) {
    console.error("markPaid failed:", err);
    res.status(500).json({ success: false, message: "更新失敗" });
  }
});

// POST /api/admin/sendPaidEmail — 寄付款成功通知信
router.post("/sendPaidEmail", async (req, res) => {
  const email = (req.body.email || "").toLowerCase();
  if (!email) return res.status(400).json({ success: false, message: "Missing email" });

  try {
    const [bookingSnap, seatSnap] = await Promise.all([
      db.doc(`bookings/${email}`).get(),
      db.collection("seats").where("buyerEmail", "==", email).get(),
    ]);
    if (!bookingSnap.exists) {
      return res.status(404).json({ success: false, message: "找不到訂單" });
    }
    const booking = bookingSnap.data();
    const seats = seatSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    await sendMail(
      paidMail({ to: booking.email, username: booking.username, seats })
    );

    await bookingSnap.ref.update({
      emailSent: true,
      updatedAt: FieldValue.serverTimestamp(),
    });
    res.json({ success: true });
  } catch (err) {
    console.error("sendPaidEmail failed:", err);
    res.status(500).json({ success: false, message: "寄信失敗" });
  }
});

module.exports = router;
