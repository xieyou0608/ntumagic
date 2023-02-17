import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate, Link } from "react-router-dom";

import { Button, Alert, Box } from "@mui/material";
import { AuthForm, InputBox, iconSx, AuthInput, AuthButton } from "./LoginForm";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPwd) {
      setErrorMessage("密碼不相符");
    } else {
      setErrorMessage("");
      try {
        await AuthService.register(email, password, username, phone);
        window.alert("註冊成功! 將前往登入頁面");
        navigate("/login");
      } catch (error) {
        setErrorMessage(error.response.data);
      }
    }
  };

  return (
    <AuthForm onSubmit={handleRegister}>
      <h1>註冊</h1>
      {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
      <InputBox>
        <EmailIcon sx={iconSx} />
        <AuthInput onChange={handleChangeEmail} type="email" label="信箱" />
      </InputBox>
      <InputBox>
        <LockIcon sx={iconSx} />
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
          <AuthInput
            onChange={handleChangePassword}
            type="password"
            label="密碼"
          />
          <AuthInput
            onChange={handleChangeConfirmPwd}
            type="password"
            label="再次輸入密碼"
          />
        </Box>
      </InputBox>
      <InputBox>
        <AccountCircleIcon sx={iconSx} />
        <AuthInput onChange={handleChangeUsername} type="text" label="姓名" />
      </InputBox>
      <InputBox>
        <PhoneIcon sx={iconSx} />
        <AuthInput onChange={handleChangePhone} type="text" label="聯絡電話" />
      </InputBox>
      <AuthButton type="submit" variant="contained">
        註冊
      </AuthButton>
      <Button component={Link} to="/login">
        已經註冊，點此登入
      </Button>
    </AuthForm>
  );
};

export default RegisterForm;
