import React, { useEffect } from "react";
import Seat from "./Seat";
import { v4 as uuidv4 } from "uuid";
import { Grid } from "@mui/material";

const Auditorium = ({
  seatsData,
  setSeatsData,
  chosenSeats,
  setChosenSeats,
  currentUser,
}) => {
  const cols = [...Array(24).keys()];
  return (
    <div className="auditorium">
      {seatsData && (
        <Grid container>
          {cols.map((c) => {
            return (
              <Grid item xs={12} key={uuidv4()}>
                {seatsData.slice(34 * c, 34 * c + 34).map((seat_obj) => {
                  return (
                    <Seat
                      key={uuidv4()}
                      seatData={seat_obj}
                      chosenSeats={chosenSeats}
                      setChosenSeats={setChosenSeats}
                      currentUser={currentUser}
                    />
                  );
                })}
              </Grid>
            );
          })}
        </Grid>
      )}
      {/* {seatsData &&
        cols.map((c) => {
          return (
            <div className="row" key={uuidv4()}>
              {seatsData.slice(34 * c, 34 * c + 34).map((seat_obj) => {
                return (
                  <Seat
                    key={uuidv4()}
                    seatData={seat_obj}
                    chosenSeats={chosenSeats}
                    setChosenSeats={setChosenSeats}
                    currentUser={currentUser}
                  />
                );
              })}
            </div>
          );
        })} */}
    </div>
  );
};

export default Auditorium;
