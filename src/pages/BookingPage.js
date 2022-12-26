import React from "react";
import Booking from "../components/Booking/Booking";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import moment from "moment-timezone";
import { Grid } from "@mui/material";
import SquareButton from "../components/UI/SquareButton";
import { useSelector } from "react-redux";

const BookingPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  moment.tz.setDefault("Asia/Taipei");
  let isStudentTime = moment().isBetween(
    "2022-05-21 20:00:00",
    "2022-05-22 15:00:00"
  );
  let isOthersTime = moment().isAfter("2022-05-22 20:00:00");
  // let isOpening = moment().isBefore("2022-06-14 15:00:00");
  let isOpening = moment().isBefore("2023-12-31 15:00:00");

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
      {checkTimeAvailable() && <Booking />}
      {!checkTimeAvailable() && (
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

          <SquareButton
            color="#1465dd"
            onClick={() => {
              navigate("/preview");
            }}
          >
            查看當前座位
          </SquareButton>
        </Grid>
      )}
    </div>
  );
};

export default BookingPage;
