import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";

const PreBookingPage = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "80vh" }}
      className="prebooking"
    >
      <Typography variant="h5">A. 我只要劃一個位子</Typography>
      <Link to="/booking">
        <button>→直接去劃位!</button>
      </Link>
      <br />
      <Typography variant="h5">B. 我想劃多個位子</Typography>
      <Link to="/profile">
        <button>→新增同行朋友</button>
      </Link>
    </Grid>
  );
};

export default PreBookingPage;
