import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material";

const StyledDiv = styled("div")`
  padding: 3rem;
  p {
    font-size: 1.5rem;
  }
`;

const BuyerInfo = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <StyledDiv>
      <div>
        <p>姓名：{currentUser.user.username}</p>
        <p>手機：{currentUser.user.phone}</p>
        <p>
          可劃位數:{" "}
          {currentUser.user.friends.length -
            currentUser.user.tickets.length +
            1}
        </p>
      </div>
    </StyledDiv>
  );
};

export default BuyerInfo;
