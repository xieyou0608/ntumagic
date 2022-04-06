import { useEffect, useState } from "react";
import poster from "../img/magic_night.jpg";

const HomePage = ({ setUserInfo }) => {
  return (
    <div className="homepage">
      <img src={poster} alt="魔夜宣傳海報" className="poster" />
    </div>
  );
};
export default HomePage;
