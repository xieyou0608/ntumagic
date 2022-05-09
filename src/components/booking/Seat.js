import React, { useState } from "react";

const Seat = ({ seatData, chosenSeats, setChosenSeats }) => {
  const seatStyleHandler = (area) => {
    if (area === "A") {
      return "seat-A";
    } else if (area === "B") {
      return "seat-B";
    } else if (area === "C") {
      return "seat-C";
    } else {
      return "seat-not-for-sale";
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
  ) : (
    <div
      className={`seat 
        ${seatStyleHandler(seatData.area)} 
        ${seatData.sold ? "seat-sold" : ""}
        ${chosenSeats.includes(seatData) ? "seat-chosen" : ""}`}
      onClick={() => {
        chosenHandler(seatData);
      }}
    >
      {seatData.col}
    </div>
  );
};

export default Seat;
