import React from "react";

const UserInfo = ({ currentUser }) => {
  return (
    <div>
      {currentUser && (
        <div>
          <h1>個人資料</h1>
          <p>姓名: {currentUser.user.username}</p>
          <p>信箱: {currentUser.user.email}</p>
          <p>電話號碼: {currentUser.user.phone}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
