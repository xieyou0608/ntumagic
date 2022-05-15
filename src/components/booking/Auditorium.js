import React, { useEffect } from "react";
import Seat from "./Seat";
import { v4 as uuidv4 } from "uuid";

const Auditorium = ({
  seatsData,
  setSeatsData,
  chosenSeats,
  setChosenSeats,
  currentUser,
}) => {
  return (
    <div className="auditorium">
      <div>
        {seatsData &&
          seatsData.map((seat_obj) => {
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
    </div>
  );
};

export default Auditorium;
