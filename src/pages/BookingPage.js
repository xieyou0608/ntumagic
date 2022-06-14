import React, { useState } from "react";
import Booking from "../components/booking/Booking";
import { Routes, Route, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import moment from "moment";
import tz from "moment-timezone";
import { Grid } from "@mui/material";

const BookingPage = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  moment.tz.setDefault("Asia/Taipei");
  let isStudentTime = moment().isBetween(
    "2022-05-21 20:00:00",
    "2022-05-22 15:00:00"
  );
  let isOthersTime = moment().isAfter("2022-05-22 20:00:00");
  let isOpening = moment().isBefore("2022-06-14 15:00:00");

  const checkTimeAvailable = () => {
    if (currentUser.user.role === "admin") {
      return true;
    }
    if (!isOpening) {
      return false;
    }
    if (isStudentTime && currentUser.user.isStudent) {
      return true;
    } else if (isOthersTime) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {!currentUser && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "70vh" }}
          className="prebooking"
        >
          <Alert severity="warning">請先登入帳號</Alert>
        </Grid>
      )}
      {currentUser && checkTimeAvailable() && (
        <Booking currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}
      {currentUser && !checkTimeAvailable() && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "70vh" }}
          className="prebooking"
        >
          <Alert severity="warning">
            線上劃位已截止，請於現場進行購票，感謝您的支持！
            <br />
            （現場將於 17:00 開始進行售票）
          </Alert>

          <button
            className="preview-btn"
            onClick={() => {
              navigate("/preview");
            }}
          >
            查看當前座位
          </button>
        </Grid>
      )}
    </div>
  );
};

export default BookingPage;
