import React from "react";
import Booking from "../components/booking/Booking";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import moment from "moment-timezone";
import { Grid } from "@mui/material";
import { GentleYellowButton } from "../components/UI/GuideButtons";
import { useSelector } from "react-redux";

const BookingPage = () => {
  const navigate = useNavigate();
  moment.tz.setDefault("Asia/Taipei");
  let isTesting = moment().isBefore("2023-04-28 20:00:00");
  let isStudentTime = moment().isBetween("2023-04-28 20:00:00", "2023-04-29 20:00:00")
  // let isStudentTime = moment().isBefore("2023-04-29 20:00:00");

  // const checkTimeAvailable = () => {
  //   if (currentUser.user.role === "admin") {
  //     return true;
  //   }
  //   if (!isOpening) {
  //     return false;
  //   }
  //   if (isStudentTime && currentUser.user.isStudent) {
  //     return true;
  //   } else if (isOthersTime) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <div>
      <Booking isTesting={isTesting} isStudentTime={isStudentTime} />
      {/* {!checkTimeAvailable() && (
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

          <GentleYellowButton
            onClick={() => {
              navigate("/preview");
            }}
          >
            查看當前座位
          </GentleYellowButton>
        </Grid>
      )} */}
    </div>
  );
};

export default BookingPage;
