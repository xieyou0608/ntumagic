import React from "react";
import Seat from "./Seat";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material";

const OverflowBox = styled("div")`
  background-color: ${({ theme }) => theme.palette.background.main};
  border: solid 1vmin black;
  border-radius: 1.5vmin;
  margin-top: 3vh;
  width: 95%;
  overflow: auto;
`;

const AuditoriumLayout = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 0;
  padding: 2rem 4rem;

  ${({ theme }) => theme.breakpoints.down("md")} {
    padding: 2rem 1rem;
    width: 700px;
  }
`;

const Row = styled("div")`
  width: 100%;
  height: 1.5rem;
  display: flex;
`;

const Stage = styled("div")`
  border-style: solid;
  margin-top: 3vh;
  padding: 0.5rem 30%;
  background-color: ${({ theme }) => theme.palette.gentle.main};
`;

const rows = [...Array(24).keys()];
const rowId = [...Array(24).keys()].map((_) => uuidv4());
const NUM_COLS = 34;

const Auditorium = ({ seatsData, chosenSeats, setChosenSeats }) => {
  return (
    <OverflowBox>
      <AuditoriumLayout>
        {rows.map((row) => {
          return (
            <Row key={rowId[row]}>
              {seatsData
                .slice(NUM_COLS * row, NUM_COLS * row + NUM_COLS)
                .map((seat_obj) => {
                  return (
                    <Seat
                      key={seat_obj._id}
                      seatData={seat_obj}
                      chosenSeats={chosenSeats}
                      setChosenSeats={setChosenSeats}
                    />
                  );
                })}
            </Row>
          );
        })}
        <Stage>舞台</Stage>
      </AuditoriumLayout>
    </OverflowBox>
  );
};

export default Auditorium;
