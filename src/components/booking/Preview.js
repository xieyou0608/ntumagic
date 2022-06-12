import React, { useState, useEffect } from "react";
import SeatService from "../../services/seat.service";
import { useNavigate } from "react-router-dom";
import PreviewSeat from "./PreviewSeat";
import { v4 as uuidv4 } from "uuid";
import { Grid } from "@mui/material";

const Preview = ({}) => {
  const [seatsData, setSeatsData] = useState(null);

  const loadSeatsData = async () => {
    try {
      const res = await SeatService.getPreviewSeats();
      setSeatsData([...res.data]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadSeatsData();
  }, []);

  const navigate = useNavigate();

  const cols = [...Array(24).keys()];
  return (
    <div className="booking">
      <h1>預覽座位區</h1>
      <div style={{ marginTop: "1rem" }}>
        <div className="sign-A"></div> A區 500元
        <div className="sign-B"></div> B區 400元
        <div className="sign-C"></div> C區 300元
      </div>

      <p className="light-board">燈音控制台</p>
      <div>
        <div className="auditorium">
          {seatsData && (
            <Grid container>
              {cols.map((c) => {
                return (
                  <Grid item xs={12} key={uuidv4()}>
                    {seatsData.slice(34 * c, 34 * c + 34).map((seat_obj) => {
                      return <PreviewSeat key={uuidv4()} seatData={seat_obj} />;
                    })}
                  </Grid>
                );
              })}
            </Grid>
          )}
        </div>
      </div>
      <p className="stage">舞台</p>
      <button
        className="preview-btn"
        onClick={() => {
          navigate("/guide");
        }}
      >
        前往劃位
      </button>
    </div>
  );
};

export default Preview;
