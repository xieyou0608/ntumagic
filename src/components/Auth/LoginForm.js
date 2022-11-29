import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../store/user-actions";

import { styled, Box, TextField, Button, Alert } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const AuthForm = styled("form")`
  display: flex;
  flex-direction: column;
  row-gap: 2vh;

  h1 {
    text-align: center;
  }

  .MuiButtonBase-root {
    font-weight: 700;
  }
`;

const InputBox = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      {props.children}
    </Box>
  );
};
const iconSx = { color: "action.active", mr: 1 };
const AuthInput = (props) => {
  return (
    <TextField
      variant="outlined"
      {...props}
      sx={{
        flexGrow: 1,
        "& label": {
          // color: "gray",
          fontWeight: 600,
          // "&.Mui-focused": {
          //   color: (theme) => theme.palette.error.main,
          // },
        },
      }}
    >
      {props.chidren}
    </TextField>
  );
};

const AuthButton = styled(Button)`
  && {
    color: black;
    background-color: #ffc258;
    padding: 1.5vh;
    margin-top: 1vh;
  }
`;

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
    <AuthForm onSubmit={handleLogin}>
      <h1>登入</h1>
      {authApi.fail && <Alert severity="warning">{authApi.errorMsg}</Alert>}
      <InputBox>
        <EmailIcon sx={iconSx} />
        <AuthInput onChange={handleChangeEmail} type="email" label="信箱" />
      </InputBox>
      <InputBox>
        <LockIcon sx={iconSx} />
        <AuthInput
          onChange={handleChangePassword}
          type="password"
          label="密碼"
        />
      </InputBox>

      <AuthButton type="submit" variant="contained">
        {authApi.loading ? "登入中..." : "登入"}
      </AuthButton>
      <Button component={Link} to="/register">
        尚未註冊，點此註冊
      </Button>
    </AuthForm>
  );
};

export default LoginForm;
export { AuthForm, InputBox, iconSx, AuthInput, AuthButton };
