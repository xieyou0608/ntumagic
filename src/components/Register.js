import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Typography } from "@mui/material";

const Register = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPwd, setConfirmPwd] = useState("");
  let [username, setUsername] = useState("");
  let [phone, setPhone] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPwd = (e) => {
    setConfirmPwd(e.target.value);
  };
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleRegister = () => {
    if (password !== confirmPwd) {
      setErrorMessage("密碼不相符");
    } else {
      setErrorMessage("");
      AuthService.register(email, password, username, phone)
        .then(() => {
          window.alert("註冊成功! 將前往登入頁面");
          navigate("/login");
        })
        .catch((e) => {
          setErrorMessage(e.response.data);
        });
    }
  };

  return (
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
          borderStyle: "solid",
          borderRadius: "1rem",
          padding: "2rem 3rem",
          // backgroundColor: "gray",
        }}
      >
        <h1>註冊</h1>
        {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
        <TextField
          onChange={handleChangeEmail}
          type="email"
          label="信箱"
          variant="outlined"
          sx={{ marginTop: 2 }}
        />
        <TextField
          onChange={handleChangePassword}
          type="password"
          label="密碼"
          variant="outlined"
          sx={{ marginTop: 2 }}
        />
        <TextField
          onChange={handleChangeConfirmPwd}
          type="password"
          label="再次輸入密碼"
          variant="outlined"
          sx={{ marginTop: 2 }}
        />
        <TextField
          onChange={handleChangeUsername}
          type="text"
          label="姓名"
          variant="outlined"
          sx={{ marginTop: 2 }}
        />
        <TextField
          onChange={handleChangePhone}
          type="text"
          label="聯絡電話"
          variant="outlined"
          sx={{ marginTop: 2 }}
        />
        <Button
          onClick={handleRegister}
          variant="contained"
          sx={{ marginTop: 2 }}
        >
          註冊
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
