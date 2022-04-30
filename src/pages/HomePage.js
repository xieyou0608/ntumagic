import { useEffect, useState } from "react";
import poster from "../img/magic_night.jpg";
import Box from "@mui/material/Box";

const HomePage = ({ setUserInfo }) => {
  return (
    <div className="homepage">
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        <img src={poster} alt="魔夜宣傳海報" className="poster" />
      </Box>
      <Box sx={{ display: { xs: "flex", sm: "none" }, paddingTop: 27 }}>
        <img src={poster} alt="魔夜宣傳海報" className="poster" />
      </Box>
    </div>
  );
};
export default HomePage;
