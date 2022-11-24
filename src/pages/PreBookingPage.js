import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, styled } from "@mui/material";
import GuideButton from "../components/UI/GuideButton";

const PreBookingPage = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "80vh" }}
    >
      <Typography variant="h5">A. 我只要劃一個位子</Typography>
      <Link to="/booking">
        <GuideButton>→直接去劃位!</GuideButton>
      </Link>
      <br />
      <Typography variant="h5">B. 我想劃多個位子</Typography>
      <Link to="/profile">
        <GuideButton>→新增同行朋友</GuideButton>
      </Link>
    </Grid>
  );
};

export default PreBookingPage;
