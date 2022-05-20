import React, { useState } from "react";
import Booking from "../components/booking/Booking";
import { Routes, Route } from "react-router-dom";
import Alert from "@mui/material/Alert";

const BookingPage = ({ currentUser, setCurrentUser }) => {
  return (
    <div className="booking">
      {!currentUser && <Alert severity="warning">請先登入帳號</Alert>}
      {currentUser && (
        <Booking currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
};

export default BookingPage;
