#!/usr/bin/env node
/**
 * 把 Firebase Auth 的某個 user 標成 admin（設 custom claim `admin: true`）。
 *
 * Usage:
 *   node scripts/set-admin-claim.js <email> [<password>]
 *
 * - 不帶 password：找不到 user 直接 error。Prod 換新 admin 帳號時用這個 —
 *   account 應該已經由負責人在 Firebase Console 手動建好。
 * - 帶 password：找不到 user 就用這個 password 建一個。Emulator 一鍵把 admin
 *   準備好用這個。
 *
 * 設完之後 user 下次拿 ID Token（或現有 token expire 重抓）就會帶 admin: true。
 *
 * Auth：
 *   - Prod：Application Default Credentials（gcloud auth application-default login）
 *   - Emulator：export FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099
 */

const admin = require("firebase-admin");

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || "ntu-magic-night";
const [, , rawEmail, password] = process.argv;

if (!rawEmail) {
  console.error("Usage: node scripts/set-admin-claim.js <email> [<password>]");
  process.exit(1);
}
const email = rawEmail.toLowerCase();

admin.initializeApp({ projectId: PROJECT_ID });

async function ensureUser() {
  try {
    return await admin.auth().getUserByEmail(email);
  } catch (err) {
    if (err.code !== "auth/user-not-found") throw err;
    if (!password) {
      console.error(
        `找不到 user ${email}。請先在 Firebase Console 建好，或加上 password 參數讓 script 直接建。`,
      );
      process.exit(1);
    }
    console.log(`→ 建立新 user ${email}`);
    return admin.auth().createUser({ email, password });
  }
}

async function main() {
  const target = process.env.FIREBASE_AUTH_EMULATOR_HOST
    ? `emulator (${process.env.FIREBASE_AUTH_EMULATOR_HOST})`
    : `prod (${PROJECT_ID})`;
  console.log(`Target: ${target}`);

  const user = await ensureUser();
  await admin.auth().setCustomUserClaims(user.uid, { admin: true });
  console.log(`✓ ${email} (uid=${user.uid}) 設為 admin`);
  console.log(
    "  注意：已登入的 session 需要重抓 ID Token（或重新登入）才會看到新 claim。",
  );
}

main().catch((err) => {
  console.error("失敗:", err);
  process.exit(1);
});
