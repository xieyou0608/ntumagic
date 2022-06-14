import React, { useState } from "react";

const Seat = ({ seatData, chosenSeats, setChosenSeats, currentUser }) => {
  const seatStyleHandler = (area) => {
    if (area === "A") {
      return "seat-A";
    } else if (area === "B") {
      return "seat-B";
    } else if (area === "C") {
      return "seat-C";
    }
  };

  const chosenHandler = (seatData) => {
    let seats_arr = [];
    let available =
      currentUser.user.friends.length - currentUser.user.tickets.length + 1;
    if (chosenSeats.includes(seatData)) {
      seats_arr = chosenSeats.filter((chosen) => chosen != seatData);
    } else {
      // 管理員無劃位上限
      if (currentUser.user.role === "admin" || chosenSeats.length < available)
        seats_arr = [...chosenSeats, seatData];
      else seats_arr = [...chosenSeats];
    }
    setChosenSeats(seats_arr);
  };

  return seatData.sold || seatData.area == "S" ? (
    <div className="seat-sold">{seatData.col}</div>
  ) : seatData.area == "X" ? (
    <div className="seat seat-X seat-aisle">{seatData.row}</div>
  ) : seatData.area == "M" ? (
    <div className="seat seat-X">{seatData.row}</div>
  ) : (
    <div
      className={`seat 
        ${seatStyleHandler(seatData.area)} 
        ${chosenSeats.includes(seatData) ? "seat-chosen" : ""}`}
      onClick={() => {
        chosenHandler(seatData);
      }}
    >
      {seatData.area != "X" ? seatData.col : seatData.row}
    </div>
  );
};

export default Seat;
