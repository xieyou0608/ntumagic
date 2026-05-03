const router = require("express").Router();
const Joi = require("joi");

const { db, FieldValue } = require("../lib/firestore");
const { currentPhase } = require("../lib/phases");
const { sendMail, bookingMail } = require("../lib/email");

const MAX_TICKETS_PER_EMAIL = 6;

const positionSchema = Joi.object({
  floor: Joi.number().integer().valid(1, 2).required(),
  area: Joi.string().valid("S", "A", "B", "C").required(),
  row: Joi.number().integer().min(1).required(),
  col: Joi.number().integer().min(1).required(),
});

const bookingSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(1).max(50).required(),
  phone: Joi.string().allow("", null).max(50),
  bankAccount: Joi.string().min(1).max(50).required(),
  // FB / IG handle 或其他聯絡方式（萬一 email 填錯時的救援管道）
  contact: Joi.string().min(1).max(100).required(),
  positions: Joi.array()
    .items(positionSchema)
    .min(1)
    .max(MAX_TICKETS_PER_EMAIL)
    .required(),
});

function positionKey(p) {
  return `${p.floor}-${p.area}-${p.row}-${p.col}`;
}

// 用 (floor, area, row, col) query 找一個 sellable seat doc。
// 因為座位是 auto-id，沒辦法 by id 直查，要靠 query。query 結果集理論上永遠 ≤ 1。
function seatLookupQuery(p) {
  return db
    .collection("seats")
    .where("floor", "==", p.floor)
    .where("area", "==", p.area)
    .where("row", "==", p.row)
    .where("col", "==", p.col)
    .limit(1);
}

// GET /api/seats — 全部座位（含 placeholder 跟 sold 狀態），給前端畫圖用
// orderBy(sortIndex) 讓回傳的 array 順序對齊 generate_seats() 的 layout 順序，
// 前端 Auditorium 才能用 array slice 切出每 row。
//
// Cache-Control: 開賣瞬間 2000 人同時載入這支 → 600 doc reads × 2000 = 120 萬 reads，
// 而且會擠掉 booking endpoint 的 Function instance。Firebase Hosting CDN 看到這個 header
// 會在 edge cache 15 秒，把同瞬間的 burst 收斂成 1 次回源。
// stale 不會造成超賣 — 後端 transaction 還是會擋（撞到回 409，前端帶 cache-bust 重撈）。
router.get("/", async (_req, res) => {
  try {
    const snap = await db.collection("seats").orderBy("sortIndex").get();
    const seats = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.set("Cache-Control", "public, max-age=15, s-maxage=15");
    res.status(200).json(seats);
  } catch (err) {
    console.error("GET /api/seats failed:", err);
    res.status(500).json({ success: false, message: "Please try again" });
  }
});

// POST /api/seats/getSeat — 用 email 拿自己劃了哪些座位
router.post("/getSeat", async (req, res) => {
  const email = (req.body.email || "").toLowerCase();
  if (!email) return res.status(400).json({ success: false, message: "Missing email" });
  try {
    const snap = await db
      .collection("seats")
      .where("buyerEmail", "==", email)
      .get();
    const seats = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json(seats);
  } catch (err) {
    console.error("POST /api/seats/getSeat failed:", err);
    res.status(500).json({ success: false, message: "Cannot get seat data" });
  }
});

// 階段 gate：開放搶位的時段控制
router.use("/booking", (req, res, next) => {
  const phase = currentPhase();
  const email = (req.body.email || "").toLowerCase();
  switch (phase) {
    case "TEST":
    case "PUBLIC":
      return next();
    case "NTU_ONLY":
      if (!email.endsWith("@ntu.edu.tw")) {
        return res
          .status(403)
          .json({ success: false, message: "目前為校內優先時段，請使用台大信箱" });
      }
      return next();
    case "GAP":
      return res
        .status(403)
        .json({ success: false, message: "測試結束，劃位將於校內售票時段開放" });
    case "CLOSED":
    default:
      return res
        .status(403)
        .json({ success: false, message: "線上劃位已截止，請至現場購票！" });
  }
});

// PATCH /api/seats/booking — 搶位 transaction（query-based lookup）
router.patch("/booking", async (req, res) => {
  const { error, value } = bookingSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  const email = value.email.toLowerCase();
  const { username, phone = null, bankAccount, contact, positions } = value;

  // 去重
  const uniquePositions = Array.from(
    new Map(positions.map((p) => [positionKey(p), p])).values()
  );

  let lockedSeats;
  let isNewBooking;

  try {
    await db.runTransaction(async (tx) => {
      // 1) 並行 query 找每個 position 對應的 seat doc。
      //    transaction 內的 query 會鎖住整個結果集；condition 已包含全部 4 個欄位，
      //    result 永遠 0 或 1 筆，跟舊版 by-id 直查的 lock 範圍等效。
      const seatSnaps = await Promise.all(
        uniquePositions.map((p) => tx.get(seatLookupQuery(p)))
      );

      // 2) 驗證每個都找得到、且還沒被劃
      const seatDocs = seatSnaps.map((snap, i) => {
        if (snap.empty) {
          const err = new Error("SEAT_NOT_FOUND");
          err.status = 400;
          err.userMessage = `座位不存在: ${positionKey(uniquePositions[i])}`;
          throw err;
        }
        const doc = snap.docs[0];
        if (doc.data().sold) {
          const err = new Error("SEAT_TAKEN");
          err.status = 409;
          err.userMessage = "位置已被其他人選擇，請重新劃位";
          throw err;
        }
        return doc;
      });

      // 3) 算這個 email 已經劃了幾張，檢查 6 張上限
      const existing = await tx.get(
        db.collection("seats").where("buyerEmail", "==", email)
      );
      if (existing.size + uniquePositions.length > MAX_TICKETS_PER_EMAIL) {
        const err = new Error("OVER_LIMIT");
        err.status = 400;
        err.userMessage = `劃位上限為 ${MAX_TICKETS_PER_EMAIL} 張，您已劃 ${existing.size} 張`;
        throw err;
      }

      // 4) 讀/upsert booking
      const bookingRef = db.doc(`bookings/${email}`);
      const bookingSnap = await tx.get(bookingRef);
      isNewBooking = !bookingSnap.exists;

      // 5) 寫座位
      const now = FieldValue.serverTimestamp();
      seatDocs.forEach((doc) => {
        tx.update(doc.ref, {
          sold: true,
          buyerEmail: email,
          bookedAt: now,
        });
      });

      // 6) 寫 booking。第二次劃位 merge 既有資料，emailSent 重置成 false 提醒 admin 補寄。
      const bookingPayload = {
        email,
        username,
        phone,
        bankAccount,
        contact,
        emailSent: false,
        updatedAt: now,
      };
      if (isNewBooking) bookingPayload.createdAt = now;
      tx.set(bookingRef, bookingPayload, { merge: true });

      // response 用（顯示更新後的狀態）
      const nowIso = new Date().toISOString();
      lockedSeats = seatDocs.map((doc, i) => ({
        id: doc.id,
        ...doc.data(),
        ...uniquePositions[i],
        sold: true,
        buyerEmail: email,
        bookedAt: nowIso,
      }));
    });
  } catch (err) {
    if (err.userMessage) {
      return res
        .status(err.status || 400)
        .json({ success: false, message: err.userMessage });
    }
    console.error("劃位 transaction 失敗:", err);
    return res.status(500).json({ success: false, message: "系統錯誤，請稍後再試" });
  }

  // 7) DB 已 commit，寄信屬於 side effect，失敗只記 log 不回滾。
  try {
    await sendMail(bookingMail({ to: email, username, seats: lockedSeats }));
    console.log("劃位 email 發送成功:", email);
  } catch (mailErr) {
    console.error("劃位 email 發送失敗:", mailErr);
  }

  res.json({
    success: true,
    email,
    username,
    seats: lockedSeats,
    isNewBooking,
  });
});

module.exports = router;
