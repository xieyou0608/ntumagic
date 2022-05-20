import React from "react";

const AdminMonitor = ({ currentUser }) => {
  console.log(currentUser);
  return <div>{currentUser.token}</div>;
};

export default AdminMonitor;
