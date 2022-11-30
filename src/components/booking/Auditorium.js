import React from "react";
import Seat from "./Seat";
import { v4 as uuidv4 } from "uuid";
import { Grid, styled } from "@mui/material";

const AuditoriumLayout = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 4rem;

  ${({ theme }) => theme.breakpoints.down("md")} {
    padding: 2rem 1rem;
    width: 700px;
  }
`;

const Stage = styled("div")`
  border-style: solid;
  margin-top: 3vh;
  padding: 0.5rem 30%;
  background-color: ${({ theme }) => theme.palette.gentle.main};
`;

const Auditorium = ({ seatsData, chosenSeats, setChosenSeats }) => {
  const cols = [...Array(24).keys()];
  return (
    <AuditoriumLayout>
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
                    />
                  );
                })}
              </Grid>
            );
          })}
        </Grid>
      )}
      <Stage>舞台</Stage>
    </AuditoriumLayout>
  );
};

export { AuditoriumLayout, Stage };
export default Auditorium;
