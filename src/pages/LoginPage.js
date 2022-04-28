import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

const LoginPage = ({ setCurrentUser }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Login setCurrentUser={setCurrentUser} />
    </div>
  );
};

export default LoginPage;
