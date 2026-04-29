import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import AdminBooking from "../components/Admin/AdminBooking";
import UsersMonitor from "../components/Admin/UsersMonitor";
import { Box, Button, TextField } from "@mui/material";
import { auth } from "../firebase";

const AdminPage = () => {
  const [adminUser, setAdminUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("user");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdminUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged 會更新 adminUser
    } catch (err) {
      console.log(err);
      alert("登入失敗，請確認帳號密碼");
    }
  };

  const handleLogout = async () => {
    if (!window.confirm("確定要登出嗎")) return;
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  let adminBoard = null;
  if (adminUser) {
    if (status === "user") adminBoard = <UsersMonitor />;
    if (status === "seat") adminBoard = <AdminBooking />;
  }

  if (authLoading) {
    return null;
  }

  return (
    <div>
      {!adminUser && (
        <Box sx={{ width: "60vw" }}>
          <form onSubmit={handleAdminLogin}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                value={email}
                onChange={handleEmailChange}
                label="信箱"
                type="email"
                sx={{ background: "white" }}
              />
              <TextField
                value={password}
                onChange={handlePasswordChange}
                label="密碼"
                type="password"
                sx={{ background: "white" }}
              />
              <Button type="submit">登入</Button>
            </Box>
          </form>
        </Box>
      )}
      {adminUser && (
        <Box>
          <Button onClick={() => setStatus("user")} variant="contained">
            用戶後台
          </Button>
          <Button onClick={() => setStatus("seat")} variant="contained">
            修改座位
          </Button>
          <Button onClick={handleLogout} variant="outlined" color="error">
            登出
          </Button>

          {adminBoard}
        </Box>
      )}
    </div>
  );
};

export default AdminPage;
