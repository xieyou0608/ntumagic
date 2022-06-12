import { useEffect, useState } from "react";
import poster from "../img/magic_night.jpg";
// import Box from "@mui/material/Box";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = ({ setUserInfo }) => {
  return (
    <div className="homepage">
      <img src={poster} alt="魔夜宣傳海報" className="poster" />
      <div className="info">
        <h1>台大魔夜劃位系統</h1>
        <p>
          時間：2022/6/14（二）18:00進場 18:30開始 <br />
          地點：民生社區活動中心集會堂 <br />
          票種：A區 500元、B區 400元、C區 300元
        </p>

        {/* 原生 button，也可以直接改這個button */}
        <Link to="/guide">
          <button type="button">點我劃位</button>
        </Link>
        <br />
        <Link to="/preview">
          <button type="button">查看座位</button>
        </Link>
      </div>
    </div>
  );
};
export default HomePage;
