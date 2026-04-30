const crypto = require("crypto");

function buildVerifyToken(email) {
  const secret = process.env.EMAIL_HASH_SECRET;
  if (!secret) {
    throw new Error("EMAIL_HASH_SECRET not configured");
  }
  return crypto
    .createHash("sha256")
    .update(email + secret)
    .digest("hex");
}

module.exports = { buildVerifyToken };
