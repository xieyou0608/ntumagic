import React, { useState } from "react";
import Booking from "../components/booking/Booking";
import { Routes, Route } from "react-router-dom";
import Alert from "@mui/material/Alert";
import moment from "moment";
import tz from "moment-timezone";

const BookingPage = ({ currentUser, setCurrentUser }) => {
  moment.tz.setDefault("Asia/Taipei");
  let isStudentTime = moment().isAfter(moment("2022-05-21 20:00:00"));
  let isOthersTime = moment().isAfter(moment("2022-05-22 20:00:00"));
  const checkTimeAvailable = () => {
    if (isStudentTime && currentUser.user.isStudent) {
      return true;
    } else if (isOthersTime) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="booking">
      {!currentUser && <Alert severity="warning">請先登入帳號</Alert>}
      {currentUser && checkTimeAvailable() && (
        <Booking currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}
      {currentUser && !checkTimeAvailable() && (
        <Alert severity="warning">尚未開放售票</Alert>
      )}
    </div>
  );
};

export default BookingPage;
