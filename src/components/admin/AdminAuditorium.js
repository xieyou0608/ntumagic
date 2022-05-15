import React, { useEffect } from "react";
import AdminSeat from "./AdminSeat";
import { v4 as uuidv4 } from "uuid";

const AdminAuditorium = ({
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
              <AdminSeat
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

export default AdminAuditorium;
