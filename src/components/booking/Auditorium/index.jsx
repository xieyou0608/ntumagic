import React from "react";
import Seat from "./Seat";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material";
import { Divider, Typography } from "@mui/material";

// 容器樣式
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
  margin-bottom: 3vh;
  padding: 0.5rem 34.5%;
  background-color: ${({ theme }) => theme.palette.gentle.main};
`;


const TOTAL_ROWS = 24;
const NUM_COLS = 44;
const rowIndices = [...Array(TOTAL_ROWS).keys()];
const rowId = rowIndices.map(() => uuidv4());


const floorConfig = [
  { id: "1F", label: "一樓", rowCount: 17 },
  { id: "2F", label: "二樓", rowCount: TOTAL_ROWS - 17 },
];

const Auditorium = ({ seatsData, chosenSeats, setChosenSeats }) => {
  let cumulativeRows = 0;

  return (
    <OverflowBox>
      {floorConfig.map((floor, floorIdx) => {
        const { id, label, rowCount } = floor;
        // get the row count for current floor
        const rowsForFloor = rowIndices.slice(
          cumulativeRows,
          cumulativeRows + rowCount
        );

        // update the cumulative rows for the next floor
        const nextCumulative = cumulativeRows + rowCount;

        return (
          <React.Fragment key={id}>
            {/* floor title */}
            <Typography variant="h6" align="center" sx={{ my: 2 }}>
              {label}
            </Typography>

            <AuditoriumLayout>
              {floorIdx === 0 && <Stage>舞台</Stage>}

              {/* seats */}
              {rowsForFloor.map((rowIndex) => (
                <Row key={rowId[rowIndex]}>
                  {seatsData
                    .slice(
                      rowIndex * NUM_COLS,
                      rowIndex * NUM_COLS + NUM_COLS
                    )
                    .map((seat_obj) => (
                      <Seat
                        key={seat_obj._id}
                        seatData={seat_obj}
                        chosenSeats={chosenSeats}
                        setChosenSeats={setChosenSeats}
                      />
                    ))}
                </Row>
              ))}
            </AuditoriumLayout>

            {/* divider between two floors */}
            {floorIdx === 0 && (
              <Divider sx={{ borderBottomWidth: 2, my: 4 }} />
            )}

            {(() => {
              cumulativeRows = nextCumulative;
              return null;
            })()}
          </React.Fragment>
        );
      })}
    </OverflowBox>
  );
};

export default Auditorium;
