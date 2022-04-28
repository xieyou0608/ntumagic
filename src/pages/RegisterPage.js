import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Register from "../components/Register";

const RegisterPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Register />
    </div>
  );
};

export default RegisterPage;
