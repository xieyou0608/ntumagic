import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import SeatService from "../services/seat.service";

const ProfilePage = ({ currentUser }) => {
  let [mySeat, setMySeat] = useState(null);

  useEffect(() => {
    SeatService.getMySeats()
      .then((res) => {
        console.log(res);
        setMySeat([...res.data]);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderStyle: "solid",
            borderRadius: "1rem",
            padding: "2rem",
          }}
        >
          {!currentUser && <Alert severity="warning">請先登入帳號</Alert>}
          {currentUser && (
            <div>
              <h1>個人資料</h1>
              <p>{currentUser.user.username}</p>
              <p> {currentUser.user.email}</p>
              <p> {currentUser.user.phone}</p>
            </div>
          )}
          {currentUser && !mySeat && <p>目前尚無劃位</p>}
          {currentUser &&
            mySeat &&
            mySeat.map((seat) => {
              return (
                <div key={seat._id}>
                  <p>
                    {seat.area}區 {seat.row}排 {seat.col}號
                  </p>
                </div>
              );
            })}
        </Box>
      </Box>
    </div>
  );
};

export default ProfilePage;
