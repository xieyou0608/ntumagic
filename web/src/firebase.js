import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Firebase Web SDK config 是可公開的（安全靠 Security Rules + Auth）。
// 換專案時改這份即可。
const firebaseConfig = {
  apiKey: "AIzaSyAGwXgK5GZJ5mEI4utTUBPmUFQHN8FYJAM",
  authDomain: "ntu-magic-night.firebaseapp.com",
  projectId: "ntu-magic-night",
  storageBucket: "ntu-magic-night.firebasestorage.app",
  messagingSenderId: "971771083557",
  appId: "1:971771083557:web:af8f6a19571b8cc7a9f8cc",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Localhost 一律走 auth emulator。否則 admin 登入會打到 prod auth、token 跟
// 跑 emulator 的 functions 對不起來（functions 在 emulator 模式只認 emulator
// 簽的 token）。
if (
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
}

export default app;
