import React from "react";

const BuyerInfo = ({ userInfo }) => {
  return (
    <div className="buyer-info">
      <div>
        <p>姓名：{userInfo && userInfo.name}</p>
        <p>手機：{userInfo && userInfo.phone}</p>
        <p>可劃位數: 2</p>
      </div>
    </div>
  );
};

export default BuyerInfo;
