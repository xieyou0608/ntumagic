import React, { useState } from "react";

const AdminSeat = ({ seatData, chosenSeats, setChosenSeats }) => {
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
    if (chosenSeats.includes(seatData)) {
      seats_arr = chosenSeats.filter((chosen) => chosen != seatData);
    } else {
      seats_arr = [...chosenSeats, seatData];
    }
    console.log(seatData);
    console.log(seats_arr);
    setChosenSeats(seats_arr);
  };

  return seatData.sold ? (
    <div className="seat-sold">{seatData.col}</div>
  ) : seatData.row == 0 ? (
    <div className="seat seat-X seat-aisle">{seatData.row}</div>
  ) : seatData.area == "X" ? (
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

export default AdminSeat;
