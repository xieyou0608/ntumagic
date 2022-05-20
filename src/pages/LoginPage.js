import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import { Alert } from "@mui/material";

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
      {currentUser && <Alert severity="warning">您以登入成功</Alert>}
      {!currentUser && <Login setCurrentUser={setCurrentUser} />}
    </div>
  );
};

export default LoginPage;
