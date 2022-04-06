import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Auditorium from "./Auditorium";
import Price from "./Price";
import BuyerInfo from "./BuyerInfo";

const Booking = ({ userInfo }) => {
  const API_URL = "https://ntu-magic-api.herokuapp.com";
  const GET_SEATS_API = `${API_URL}/getSeats`;
  const SET_SEAT_API = `${API_URL}/setSeats`;
  // const SET_SEAT_API = "http://localhost:5000/postTest";

  const [seatsData, setSeatsData] = useState(null);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [finalChosen, setFinalChosen] = useState(null);

  const loadSeatData = async () => {
    const res = await fetch(GET_SEATS_API);
    const data = await res.json();
    console.log(data);
    setSeatsData([...data]);
  };

  useEffect(() => {
    loadSeatData();
  }, []);

  const clearChosenHandler = () => {
    setChosenSeats([]);
  };

  const submitHandler = () => {
    setFinalChosen(chosenSeats);
  };

  const submitChosen = async (submitData) => {
    console.log(JSON.stringify({ ...submitData }));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...submitData }),
    };
    try {
      const res = await fetch(SET_SEAT_API, requestOptions);
      const data = await res.json();
      console.log(data);
      setChosenSeats([]);
      setFinalChosen(null);
      loadSeatData();
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  useEffect(() => {
    if (finalChosen) {
      submitChosen(finalChosen);
    }
  }, [finalChosen]);

  return (
    <div className="booking">
      <h1>座位區</h1>
      <p className="light-board">控台</p>
      <div>
        <Auditorium
          seatsData={seatsData}
          setSeatsData={setSeatsData}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      </div>
      <p className="stage">舞台</p>
      <div className="booking-info">
        <BuyerInfo userInfo={userInfo} />
        <Price chosenSeats={chosenSeats} />
        {chosenSeats.length ? (
          <button className="clear-btn" onClick={clearChosenHandler}>
            清除
          </button>
        ) : null}
      </div>
      {chosenSeats.length ? (
        <button className="buy-btn" onClick={submitHandler}>
          確定購票
        </button>
      ) : (
        <p>請選擇至少一個位子</p>
      )}
    </div>
  );
};

export default Booking;
