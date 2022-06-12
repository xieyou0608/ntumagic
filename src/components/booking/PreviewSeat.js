import React, { useState } from "react";

const PreviewSeat = ({ seatData }) => {
  const seatStyleHandler = (area) => {
    if (area === "A") {
      return "seat-A";
    } else if (area === "B") {
      return "seat-B";
    } else if (area === "C") {
      return "seat-C";
    }
  };

  return seatData.sold || seatData.area == "S" ? (
    <div className="seat-sold">{seatData.col}</div>
  ) : seatData.area == "X" ? (
    <div className="preview-seat seat-X seat-aisle">{seatData.row}</div>
  ) : seatData.area == "M" ? (
    <div className="preview-seat seat-X">{seatData.row}</div>
  ) : (
    <div
      className={`preview-seat ${seatStyleHandler(seatData.area)}`}
      //   onClick={() => {}}
    >
      {seatData.area != "X" ? seatData.col : seatData.row}
    </div>
  );
};

export default PreviewSeat;
