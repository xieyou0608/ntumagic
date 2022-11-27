import React, { useState, useEffect } from "react";
import SeatService from "../../services/seat.service";
import AdminService from "../../services/admin.service";
import { v4 } from "uuid";
import { TextField, Button } from "@mui/material";
import { BookingLayout, Stage } from "../booking/Booking";
import Auditorium from "../booking/Auditorium";

const AdminBooking = () => {
  const [seatsData, setSeatsData] = useState(null);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [finalChosen, setFinalChosen] = useState(null);
  const [newArea, setNewArea] = useState("");

  const handleChangeArea = (e) => {
    setNewArea(e.target.value);
  };

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

  useEffect(() => {
    const submitChosen = (submitData) => {
      let positions = submitData.map((x) => {
        return { row: x.row, col: x.col };
      });
      AdminService.modifyArea(positions, newArea)
        .then((res) => {
          console.log(res.data);
          window.alert("修改成功!");
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

  return (
    <BookingLayout>
      <h1>座位區</h1>
      <div>
        <Auditorium
          seatsData={seatsData}
          setSeatsData={setSeatsData}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      </div>
      <Stage>舞台</Stage>
      <br />
      <div>
        <table>
          <tbody>
            {chosenSeats.map((chosen) => {
              return (
                <tr key={v4()}>
                  <td>
                    <p>{chosen.area} 區 </p>
                  </td>
                  <td>
                    <p>{chosen.row} 排</p>
                  </td>
                  <td>
                    <p>{chosen.col} 號</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

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
