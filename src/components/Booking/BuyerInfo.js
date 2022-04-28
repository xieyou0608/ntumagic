import React from "react";

const BuyerInfo = ({ currentUser }) => {
  return (
    <div className="buyer-info">
      <div>
        <p>姓名：{currentUser && currentUser.user.username}</p>
        <p>手機：{currentUser && currentUser.user.phone}</p>
        <p>可劃位數: </p>
      </div>
    </div>
  );
};

export default BuyerInfo;
