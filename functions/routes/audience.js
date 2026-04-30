const router = require("express").Router();

const { db } = require("../lib/firestore");
const { buildVerifyToken } = require("../lib/tokens");

// PATCH /api/audience/verify — 點驗證信連結時打進來
router.patch("/verify", async (req, res) => {
  const email = (req.body.email || "").toLowerCase();
  const { verifyToken } = req.body;

  if (!email || !verifyToken) {
    return res.status(400).json({ success: false, message: "驗證失敗！" });
  }

  // token 是 HMAC(email, SECRET)，比對重算結果即可
  const expected = buildVerifyToken(email);
  if (verifyToken !== expected) {
    return res.status(400).json({ success: false, message: "驗證失敗！" });
  }

  try {
    const ref = db.doc(`bookings/${email}`);
    const snap = await ref.get();
    if (!snap.exists) {
      return res.status(404).json({ success: false, message: "找不到訂單" });
    }
    await ref.update({ emailVerified: true });
    res.json({ success: true, message: "驗證成功！" });
  } catch (err) {
    console.error("verify failed:", err);
    res.status(500).json({ success: false, message: "驗證失敗！" });
  }
});

module.exports = router;
