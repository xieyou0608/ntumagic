import React, { useState } from "react";
import AdminBooking from "../components/admin/AdminBooking";
import UsersMonitor from "../components/admin/UsersMonitor";
import SeatsMonitor from "../components/admin/SeatsMonitor";
import { Alert, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [modifyUser, setModifyUser] = useState(true);
  const [modifySeat, setModifySeat] = useState(false);
  const [watchSeat, setWatchSeat] = useState(false);

  const handleModifyUser = () => {
    setModifyUser(true);
    setModifySeat(false);
    setModifySeat(false);
  };
  const handleModifySeat = () => {
    setModifySeat(true);
    setModifyUser(false);
    setWatchSeat(false);
  };
  const handleWatchSeat = () => {
    setModifySeat(false);
    setModifyUser(false);
    setWatchSeat(true);
  };

  return (
    <div>
      {!currentUser && <Alert severity="warning">請先登入帳號</Alert>}
      {currentUser && currentUser.user.role === "admin" && (
        <Box>
          <Button onClick={handleModifyUser} variant="contained">
            用戶後台
          </Button>
          <Button onClick={handleModifySeat} variant="contained">
            修改座位
          </Button>
          <Button onClick={handleWatchSeat} variant="contained">
            查看座位
          </Button>
          {modifyUser && <UsersMonitor />}
          {modifySeat && <AdminBooking />}
          {watchSeat && <SeatsMonitor />}
        </Box>
      )}
    </div>
  );
};

export default AdminPage;
