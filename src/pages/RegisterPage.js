import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Register from "../components/Register";
import { Box, Alert, Button } from "@mui/material";

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
            <Alert severity="warning">您已登入成功</Alert>
            <Button
              component={Link}
              to="/prebooking"
              variant="contained"
              sx={{ marginTop: 3 }}
            >
              下一步
            </Button>
          </Box>
        </Box>
      )}

      {!currentUser && <Register />}
    </div>
  );
};

export default RegisterPage;
