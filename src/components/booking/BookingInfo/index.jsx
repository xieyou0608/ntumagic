import Cart from "./Cart";
import Buyer from "./Buyer";
import BuyerForm from "./BuyerForm";
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

const BookingInfo = ({ chosenSeats, clearChosenHandler, buyer, setBuyer }) => {
  return (
    <InfoLayout>
      {/* <Buyer /> */}
      <Cart chosenSeats={chosenSeats} clearChosenHandler={clearChosenHandler} />
      <BuyerForm buyer={buyer} setBuyer={setBuyer} />
    </InfoLayout>
  );
};

export default BookingInfo;
