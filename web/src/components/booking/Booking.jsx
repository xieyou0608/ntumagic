import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SeatService from "../../services/seat.service";

import {
  Backdrop,
  Button,
  CircularProgress,
  Typography,
  styled,
} from "@mui/material";
import PriceSigns from "./PriceSigns";
import Auditorium from "./Auditorium";
import BookingInfo from "./BookingInfo";

const BookingLayout = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const Booking = ({ isStudentTime }) => {
  const navigate = useNavigate();
  const [seatsData, setSeatsData] = useState(null);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [buyer, setBuyer] = useState({
    email: "",
    username: "",
    bankAccount: "",
    contact: "",
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
      window.alert("請填寫所有欄位");
      return;
    }
    if (isStudentTime && !buyer.email.toLowerCase().endsWith("@ntu.edu.tw")) {
      window.alert("現在為校內售票時間，請使用台大信箱");
      return;
    }

    localStorage.setItem("buyer", JSON.stringify(buyer));

    setSubmitting(true);
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
        buyer.bankAccount,
        buyer.contact
      );
      window.alert("劃位成功！");
      navigate("/pay");
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || "劃位失敗，請重試";
      alert(msg);
      setChosenSeats([]);
      loadSeatsData();
    } finally {
      setSubmitting(false);
    }
  };

  const checkBuyer = () => {
    if (
      buyer.email === "" ||
      buyer.bankAccount === "" ||
      buyer.username === "" ||
      buyer.contact === ""
    ) {
      return false;
    }
    return true;
  };

  return (
    <BookingLayout>
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
            disabled={submitting}
          >
            確定劃位
          </ConfirmButton>
          <ConfirmButton
            variant="contained"
            size="large"
            onClick={clearChosenHandler}
            disabled={submitting}
          >
            清空座位
          </ConfirmButton>
        </ConfirmBox>
      ) : (
        <ConfirmBox>
          <p>請選擇至少一個位子</p>
        </ConfirmBox>
      )}

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.modal + 1,
          flexDirection: "column",
          gap: 2,
        }}
        open={submitting}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6">劃位中，請稍候...</Typography>
      </Backdrop>
    </BookingLayout>
  );
};

export { BookingLayout };

export default Booking;
