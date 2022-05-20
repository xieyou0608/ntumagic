import React from "react";
import AdminBooking from "../components/admin/AdminBooking";
import AdminMonitor from "../components/admin/AdminMonitor";
import { Alert, Box } from "@mui/material";

const AdminPage = ({ currentUser }) => {
  return (
    <div className="booking">
      {!currentUser && <Alert severity="warning">請先登入帳號</Alert>}
      {currentUser && currentUser.user.role == "admin" && (
        <Box>
          <AdminMonitor currentUser={currentUser} />
          <AdminBooking currentUser={currentUser} />
        </Box>
      )}
    </div>
  );
};

export default AdminPage;
