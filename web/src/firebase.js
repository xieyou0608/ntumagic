import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

export default app;
