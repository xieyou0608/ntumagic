import React, { useState, useEffect } from "react";
import SeatService from "../../services/seat.service";
import AdminService from "../../services/admin.service";
import { TextField, Button } from "@mui/material";
import { BookingLayout } from "../booking/Booking";
import Auditorium from "../booking/Auditorium";

const AdminBooking = ({ token }) => {
  const [seatsData, setSeatsData] = useState(null);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [finalChosen, setFinalChosen] = useState(null);
  const [newArea, setNewArea] = useState("");

  const handleChangeArea = (e) => {
    setNewArea(e.target.value);
  };

  const loadSeatsData = async () => {
    try {
      const res = await SeatService.getAllSeats(token);
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

  useEffect(() => {
    const submitChosen = (submitData) => {
      let positions = submitData.map((x) => {
        return { row: x.row, col: x.col };
      });
      AdminService.modifyArea(positions, newArea)
        .then((res) => {
          console.log(res.data);
          window.alert("修改成功！");
          setChosenSeats([]);
          setFinalChosen(null);
          loadSeatsData();
        })
        .catch((e) => {
          console.log(e);
          window.alert("修改失敗");
          setChosenSeats([]);
          setFinalChosen(null);
          loadSeatsData();
        });
    };
    if (finalChosen) {
      submitChosen(finalChosen);
    }
  }, [finalChosen, newArea]);

  const clearAllSeats = async () => {
    if (window.confirm("確定要清出所有座位？")) {
      try {
        await AdminService.clearAllSeats();
        alert("成功清除");
        loadSeatsData();
      } catch (e) {
        alert("Something wrong");
      }
    }
  };

  return (
    <BookingLayout>
      <h1>座位區</h1>
      <Button variant="contained" color="error" onClick={clearAllSeats}>
        清除所有訂位
      </Button>
      <p>上面這個會清掉所有人的劃位，請謹慎使用，或不要按</p>
      <br />
      <div>
        <p>
          <h2>說明：</h2>
          選擇位子之後填A, B, C, X, S <br />
          X 是不能坐人的地方（沒椅子的地方），會呈現空白，觀眾不能點，但你可以點然後改回
          A 區之類 <br />
          S 是特別座（Special），觀眾劃位會看到是被劃走，但後台可以看到白色 S 方塊
          <br />
          白色數字方塊是被劃走的位子，就不能改，有需要改再另外討論
          <br />
          剛開始改你可以另外開個視窗看觀眾會看到的樣子
        </p>
      </div>
      {seatsData && (
        <Auditorium
          seatsData={seatsData}
          setSeatsData={setSeatsData}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      )}
      <br />
      <div>
        {chosenSeats.map((chosen) => (
          <p key={chosen._id}>
            <span>{chosen.area} 區 </span>
            <span>{chosen.row} 排 </span>
            <span>{chosen.col} 號</span>
          </p>
        ))}

        {chosenSeats.length ? (
          <Button variant="contained" onClick={clearChosenHandler}>
            清除
          </Button>
        ) : null}
      </div>
      <div>
        <TextField
          onChange={handleChangeArea}
          label="要修改的區"
          variant="outlined"
          size="small"
        />
        <Button onClick={submitHandler} variant="contained">
          修改
        </Button>
      </div>
    </BookingLayout>
  );
};

export default AdminBooking;
