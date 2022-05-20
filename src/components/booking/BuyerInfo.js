import React from "react";

const BuyerInfo = ({ currentUser }) => {
  return (
    <div className="buyer-info">
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
    </div>
  );
};

export default BuyerInfo;
