import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material";

const StyledSeat = styled("div")`
  display: inline-block;
  text-align: center;
  padding: 0.3% 0%;
  width: 2.9%;
  font-size: 50%;
  border-style: solid;
  border-color: black;
  border-width: 0.05rem;
  transition: 0.5s;
  cursor: default;
`;

const SoldSeat = styled(StyledSeat)`
  background-color: white;
  color: black;
`;

const BlankSpace = styled(StyledSeat)`
  font-weight: bold;
  border-style: none;
  color: white;
`;

const RowSign = styled(BlankSpace)`
  color: blue;
`;

const colorMap = {
  A: "rgb(207, 1, 248)",
  B: "rgb(255, 210, 64)",
  C: "rgb(84, 125, 238)",
};

const AvailableSeat = styled(StyledSeat)`
  background-color: ${(props) => colorMap[props.area]};
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    opacity: 0.5;
  }
`;

const ChosenSeat = styled(AvailableSeat)`
  background-color: rgb(148, 13, 13);
  color: white;
`;

const Seat = ({ seatData, chosenSeats, setChosenSeats, isPreview }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const chosenHandler = () => {
    if (isPreview) return;

    let seats_arr = [];
    let available =
      currentUser.user.friends.length - currentUser.user.tickets.length + 1;
    if (chosenSeats.includes(seatData)) {
      seats_arr = chosenSeats.filter((chosen) => chosen !== seatData);
    } else {
      // 管理員無劃位上限
      if (currentUser.user.role === "admin" || chosenSeats.length < available)
        seats_arr = [...chosenSeats, seatData];
      else seats_arr = [...chosenSeats];
    }
    setChosenSeats(seats_arr);
  };

  if (seatData.sold) return <SoldSeat>{seatData.col}</SoldSeat>;
  if (seatData.area === "S") return <SoldSeat>{seatData.col}</SoldSeat>;
  if (seatData.area === "X") return <BlankSpace />;
  if (seatData.area === "M") return <RowSign>{seatData.row}</RowSign>;

  if (chosenSeats.includes(seatData))
    return <ChosenSeat onClick={chosenHandler}>{seatData.col}</ChosenSeat>;
  else {
    return (
      <AvailableSeat area={seatData.area} onClick={chosenHandler}>
        {seatData.col}
      </AvailableSeat>
    );
  }
};

export { SoldSeat, BlankSpace, RowSign, ChosenSeat, AvailableSeat };
export default Seat;
