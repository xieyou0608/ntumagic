import React, { useState, useEffect } from "react";
import Auditorium from "./Auditorium";
import Price from "./Price";
import BuyerInfo from "./BuyerInfo";
import SeatService from "../../services/seat.service";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const Booking = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [seatsData, setSeatsData] = useState(null);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [finalChosen, setFinalChosen] = useState(null);

  const loadSeatsData = async () => {
    try {
      const res = await SeatService.getAllSeats();
      setSeatsData([...res.data]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadSeatsData();
  }, []);

  const clearChosenHandler = () => {
    setChosenSeats([]);
  };

  const submitHandler = () => {
    setFinalChosen(chosenSeats);
  };

  const submitChosen = (submitData) => {
    SeatService.booking(
      submitData.map((x) => {
        return { row: x.row, col: x.col };
      })
    )
      .then((res) => {
        console.log(res.data);
        let temp = currentUser;
        temp.user = res.data;
        setCurrentUser(temp);
        localStorage.setItem("user", JSON.stringify(temp));

        window.alert("劃位成功!");
        setChosenSeats([]);
        setFinalChosen(null);
        navigate("/pay");
      })
      .catch((e) => {
        console.log(e);
        window.alert("位置已被其他人選擇，請重新劃位");
        setChosenSeats([]);
        setFinalChosen(null);
        loadSeatsData();
      });
  };

  useEffect(() => {
    if (finalChosen) {
      submitChosen(finalChosen);
    }
  }, [finalChosen]);

  return (
    <div className="booking">
      <Alert severity="warning">
        劃位功能將於 15:00 關閉 <br />
        使用線上劃位請於 17:00 前進行匯款 <br />
        今日 17:00 後將開放現場購票
      </Alert>
      <h1>座位區</h1>
      <div style={{ marginTop: "1rem" }}>
        <div className="sign-A"></div> A區 500元
        <div className="sign-B"></div> B區 400元
        <div className="sign-C"></div> C區 300元
      </div>

      <p className="light-board">燈音控制台</p>
      <div>
        <Auditorium
          seatsData={seatsData}
          setSeatsData={setSeatsData}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          currentUser={currentUser}
        />
      </div>
      <p className="stage">舞台</p>
      <div className="booking-info">
        <BuyerInfo currentUser={currentUser} />
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
