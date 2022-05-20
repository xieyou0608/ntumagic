import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Register from "../components/Register";
import { Box, Alert } from "@mui/material";

const RegisterPage = ({ currentUser }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {currentUser && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Alert severity="warning">您以登入成功</Alert>
          </Box>
        </Box>
      )}

      {!currentUser && <Register />}
    </div>
  );
};

export default RegisterPage;
