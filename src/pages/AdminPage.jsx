import React, { useEffect, useState } from "react";
import AdminBooking from "../components/Admin/AdminBooking";
import UsersMonitor from "../components/Admin/UsersMonitor";
import SeatsMonitor from "../components/Admin/SeatsMonitor";
import { Alert, Box, Button, TextField } from "@mui/material";
import AuthService from "../services/auth.service";

const AdminPage = () => {
  // const currentUser = useSelector((state) => state.user.currentUser);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("user");

  let adminBoard;
  if (currentUser) {
    if (status === "user") {
      adminBoard = <UsersMonitor token={currentUser.token} />;
    }
    if (status === "seat")
      adminBoard = <AdminBooking token={currentUser.token} />;
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("t");
      const res = await AuthService.login(email, password);
      console.log(res);
      if (res.data.token) {
        setCurrentUser(res.data);
        localStorage.setItem("admin", JSON.stringify(res.data));
      }
    } catch (e) {
      alert("something went wrong");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("admin");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  return (
    <div>
      {!currentUser && (
        <Box sx={{ width: "60vw" }}>
          <form onSubmit={handleAdminLogin}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                value={email}
                onChange={handleEmailChange}
                label="信箱"
                sx={{ background: "white" }}
              />
              <TextField
                value={password}
                onChange={handlePasswordChange}
                label="密碼"
                sx={{ background: "white" }}
              />
              <Button type="submit">登入</Button>
            </Box>
          </form>
        </Box>
      )}
      {currentUser && currentUser.user.role === "admin" && (
        <Box>
          <Button onClick={() => setStatus("user")} variant="contained">
            用戶後台
          </Button>
          <Button onClick={() => setStatus("seat")} variant="contained">
            修改座位
          </Button>

          {adminBoard}
        </Box>
      )}
    </div>
  );
};

export default AdminPage;
