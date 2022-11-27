import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../store/user-actions";

import { styled, Box, TextField, Button, Alert } from "@mui/material";

const LoginBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "50vw",
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const authApi = useSelector((state) => state.user.authApi);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };

  return (
    <form onSubmit={handleLogin}>
      <LoginBox>
        <h1>登入</h1>
        {authApi.fail && <Alert severity="warning">{authApi.errorMsg}</Alert>}
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

        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          {authApi.loading ? "登入中..." : "登入"}
        </Button>
        <Button component={Link} to="/register" sx={{ marginTop: 1 }}>
          尚未註冊，點此註冊
        </Button>
      </LoginBox>
    </form>
  );
};

export default LoginForm;
