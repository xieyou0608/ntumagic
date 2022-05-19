import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const PreBookingPage = () => {
  return (
    <div>
      <p>我只要劃一個位子</p>
      <Button component={Link} to="/booking" variant="contained">
        直接去劃位!
      </Button>
      <p>我想劃多個位子</p>
      <Button component={Link} to="/profile" variant="contained">
        新增同行朋友
      </Button>
    </div>
  );
};

export default PreBookingPage;
