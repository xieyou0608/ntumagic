import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const Login = ({ setCurrentUser }) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    AuthService.login(email, password)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
          window.alert("登入成功!");
          setCurrentUser(AuthService.getCurrentUser());
          navigate("/prebooking");
        }
      })
      .catch((e) => {
        setErrorMessage(e.response.data);
      });
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
        <h1>登入</h1>
        {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
        <TextField
          onChange={handleChangeEmail}
          type="email"
          label="Email"
          variant="outlined"
          sx={{ marginTop: 2 }}
        />
        <TextField
          onChange={handleChangePassword}
          type="password"
          label="Password"
          variant="outlined"
          sx={{ marginTop: 2 }}
        />

        <Button onClick={handleLogin} variant="contained" sx={{ marginTop: 2 }}>
          登入
        </Button>
        <Button component={Link} to="/register" sx={{ marginTop: 1 }}>
          尚未註冊，點此註冊
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
