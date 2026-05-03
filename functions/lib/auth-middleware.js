const { auth } = require("./firestore");

// 驗證 Authorization: Bearer <Firebase ID Token>，並檢查 admin custom claim
async function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const idToken = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!idToken) {
    return res.status(401).json({ success: false, message: "Missing ID token" });
  }

  try {
    const decoded = await auth.verifyIdToken(idToken);
    if (decoded.admin !== true) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    req.adminUser = decoded;
    next();
  } catch (err) {
    console.error("ID token verification failed:", err.message);
    return res.status(401).json({ success: false, message: "Invalid ID token" });
  }
}

module.exports = { requireAdmin };
