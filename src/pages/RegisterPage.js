import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Register from "../components/Register";
import { Grid, Typography, Box, Alert, Button } from "@mui/material";

const RegisterPage = ({ currentUser }) => {
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
          className="prebooking"
        >
          <Alert severity="warning">您已登入成功</Alert>
          <br />
          <Link to="/prebooking">
            <button>下一步</button>
          </Link>
        </Grid>
      )}

      {!currentUser && <Register />}
    </div>
  );
};

export default RegisterPage;
