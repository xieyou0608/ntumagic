import { useEffect, useState } from "react";
import Edit from "./components/Edit";

const Homepage = ({ setUserInfo }) => {
  return (
    <div className="homepage">
      <Edit setUserInfo={setUserInfo} />
    </div>
  );
};
export default Homepage;
