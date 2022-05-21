import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import { Box, Alert, Button } from "@mui/material";

const LoginPage = ({ currentUser, setCurrentUser }) => {
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
      {!currentUser && <Login setCurrentUser={setCurrentUser} />}
    </div>
  );
};

export default LoginPage;
