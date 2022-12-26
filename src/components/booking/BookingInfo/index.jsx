import Cart from "./Cart";
import Buyer from "./Buyer";
import { styled } from "@mui/material";

const InfoLayout = styled("div")`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 5vh;
  width: 70vw;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;

const BookingInfo = ({ chosenSeats, clearChosenHandler }) => {
  return (
    <InfoLayout>
      <Buyer />
      <Cart chosenSeats={chosenSeats} clearChosenHandler={clearChosenHandler} />
    </InfoLayout>
  );
};

export default BookingInfo;
