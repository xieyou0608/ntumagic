import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import { Grid, Box, Alert, Button } from "@mui/material";
import GuideButton from "../components/UI/GuideButton";

const LoginPage = ({ currentUser, setCurrentUser }) => {
  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {currentUser && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "70vh" }}
        >
          <Alert severity="warning">您已登入成功</Alert>
          <br />
          <Link to="/prebooking">
            <GuideButton>下一步</GuideButton>
          </Link>
        </Grid>
      )}
      {!currentUser && <Login setCurrentUser={setCurrentUser} />}
    </div>
  );
};

export default LoginPage;
