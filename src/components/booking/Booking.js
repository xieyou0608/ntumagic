import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SeatService from "../../services/seat.service";
import { bookTickets, clearAPI } from "../../store/user-actions";

import { Alert, Button, styled } from "@mui/material";
import PriceSigns from "./PriceSigns";
import Auditorium from "./Auditorium";
import Buyer from "./Buyer";
import Cart from "./Cart";

const BookingLayout = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  margin: 5vh 0;
`;

const OverflowBox = styled("div")`
  background-color: ${({ theme }) => theme.palette.background.main};
  border: solid 1vmin black;
  border-radius: 1.5vmin;
  margin-top: 3vh;
  width: 95%;
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 95%;
    overflow: scroll;
  }
`;

const BookingInfo = styled("div")`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 5vh;
  width: 70vw;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
  }
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

const Booking = () => {
  const bookingApi = useSelector((state) => state.user.bookingApi);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [seatsData, setSeatsData] = useState(null);
  const [chosenSeats, setChosenSeats] = useState([]);

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
  }, []);

  const clearChosenHandler = () => {
    setChosenSeats([]);
  };

  const submitHandler = () => {
    if (window.confirm("確定劃位")) {
      dispatch(bookTickets(chosenSeats));
    }
  };

  useEffect(() => {
    if (bookingApi.success) {
      window.alert("劃位成功!");
      dispatch(clearAPI("bookingApi"));
      navigate("/pay");
    }
    if (bookingApi.fail) {
      window.alert(bookingApi.errorMsg);
      setChosenSeats([]);
      loadSeatsData();
    }
  }, [dispatch, navigate, bookingApi]);

  return (
    <BookingLayout>
      {bookingApi.loading && <Alert>isLoading</Alert>}
      {/* <Alert severity="warning">
        劃位功能將於 15:00 關閉 <br />
        使用線上劃位請於 17:00 前進行匯款 <br />
        今日 17:00 後將開放現場購票
      </Alert> */}
      <h1>座位區</h1>
      <PriceSigns />
      <OverflowBox>
        <Auditorium
          seatsData={seatsData}
          setSeatsData={setSeatsData}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      </OverflowBox>

      <BookingInfo>
        <Buyer />
        <Cart
          chosenSeats={chosenSeats}
          clearChosenHandler={clearChosenHandler}
        />
      </BookingInfo>

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

export { BookingLayout, OverflowBox };

export default Booking;
