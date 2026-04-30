import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SeatService from "../../services/seat.service";

import { Alert, Button, CircularProgress, styled } from "@mui/material";
import PriceSigns from "./PriceSigns";
import Auditorium from "./Auditorium";
import BookingInfo from "./BookingInfo";

const BookingLayout = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 5vh 0;
`;

const ConfirmBox = styled("div")`
  margin-top: 5vh;
  display: flex;
  column-gap: 3vw;
`;

const ConfirmButton = styled(Button)`
  transition: 0.5s;

  &:hover {
    transform: scale(1.2);
    opacity: 0.5;
  }
`;

const Booking = ({
  isTesting,
  isStudentTime,
  testingNotice,
  studentNotice,
}) => {
  const navigate = useNavigate();
  const [seatsData, setSeatsData] = useState(null);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [buyer, setBuyer] = useState({
    email: "",
    username: "",
    bankAccount: "",
  });

  const loadSeatsData = async () => {
    try {
      const res = await SeatService.getAllSeats();
      setSeatsData([...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSeatsData();
    const lastBuyer = localStorage.getItem("buyer");
    if (lastBuyer) {
      console.log(JSON.parse(lastBuyer));
      setBuyer(JSON.parse(lastBuyer));
    }
  }, []);

  const clearChosenHandler = () => {
    setChosenSeats([]);
  };

  const submitHandler = async () => {
    // console.log("【Debug】送出前 chosenSeats:", chosenSeats);
    if (!window.confirm("確定劃位")) {
      return;
    }
    if (!checkBuyer()) {
      window.alert("請填寫匯款資訊！");
      return;
    }
    if (isStudentTime && !buyer.email.includes("ntu.edu.tw")) {
      window.alert("現在為校內售票時間，請使用台大信箱");
      return;
    }

    localStorage.setItem("buyer", JSON.stringify(buyer));

    try {
      const positions = chosenSeats.map((x) => ({
        floor: x.floor,
        area: x.area,
        row: x.row,
        col: x.col,
      }));
      await SeatService.booking(
        positions,
        buyer.email,
        buyer.username,
        buyer.bankAccount
      );
      window.alert("劃位成功！");
      navigate("/pay");
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || "劃位失敗，請重試";
      alert(msg);
      setChosenSeats([]);
      loadSeatsData();
    }
  };

  const checkBuyer = () => {
    if (
      buyer.email === "" ||
      buyer.bankAccount === "" ||
      buyer.username === ""
    ) {
      return false;
    }
    return true;
  };

  return (
    <BookingLayout>
      {/* <Alert severity="warning">
        劃位功能將於 15:00 關閉 <br />
        使用線上劃位請於 17:00 前進行匯款 <br />
        今日 17:00 後將開放現場購票
      </Alert> */}
      <h1>座位區</h1>
      {isTesting && <Alert color="error">{testingNotice}</Alert>}
      {isStudentTime && <Alert color="info">{studentNotice}</Alert>}

      <PriceSigns />

      {!seatsData && <CircularProgress size={100} sx={{ my: 10 }} />}
      {seatsData && (
        <Auditorium
          seatsData={seatsData}
          setSeatsData={setSeatsData}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      )}
      <br />

      <BookingInfo
        chosenSeats={chosenSeats}
        clearChosenHandler={clearChosenHandler}
        buyer={buyer}
        setBuyer={setBuyer}
      />

      {chosenSeats.length ? (
        <ConfirmBox>
          <ConfirmButton
            variant="contained"
            size="large"
            color="error"
            onClick={submitHandler}
          >
            確定劃位
          </ConfirmButton>
          <ConfirmButton
            variant="contained"
            size="large"
            onClick={clearChosenHandler}
          >
            清空座位
          </ConfirmButton>
        </ConfirmBox>
      ) : (
        <ConfirmBox>
          <p>請選擇至少一個位子</p>
        </ConfirmBox>
      )}
    </BookingLayout>
  );
};

export { BookingLayout };

export default Booking;
