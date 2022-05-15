import React from "react";
import AdminBooking from "../components/admin/AdminBooking";
import { Alert } from "@mui/material";

const AdminPage = ({ currentUser }) => {
  return (
    <div className="booking">
      {!currentUser && <Alert severity="warning">請先登入帳號</Alert>}
      {currentUser && currentUser.user.role == "admin" && (
        <AdminBooking currentUser={currentUser} />
      )}
    </div>
  );
};

export default AdminPage;
