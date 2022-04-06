import React, { useState, useEffect } from "react";
import Booking from "../components/Booking/Booking";
import InfoEdit from "../components/InfoEdit";
import { Routes, Route, Link } from "react-router-dom";

const BookingPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <div className="booking">
      <Routes>
        <Route path="/" element={<InfoEdit setUserInfo={setUserInfo} />} />
        <Route path="pick-seat" element={<Booking userInfo={userInfo} />} />
      </Routes>
    </div>
  );
};

export default BookingPage;
