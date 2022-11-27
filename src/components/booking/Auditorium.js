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
  padding-top: 0;

  @media (max-width: 767px) {
    padding: 2rem 2rem;
  }
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
    </AuditoriumLayout>
  );
};

export { AuditoriumLayout };
export default Auditorium;
