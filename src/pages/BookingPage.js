import React, { useState } from "react";
import Booking from "../components/booking/Booking";
import { Routes, Route } from "react-router-dom";
import Alert from "@mui/material/Alert";

const BookingPage = ({ currentUser }) => {
  return (
    <div className="booking">
      {!currentUser && <Alert severity="warning">請先登入帳號</Alert>}
      {currentUser && (
        <Booking currentUser={currentUser} />
        // <Routes>
        //   <Route path="/" element={<InfoEdit setUserInfo={setUserInfo} />} />
        //   <Route
        //     path="/pick-seat"
        //     element={<Booking userInfo={userInfo} currentUser={currentUser} />}
        //   />
        // </Routes>
      )}
    </div>
  );
};

export default BookingPage;
