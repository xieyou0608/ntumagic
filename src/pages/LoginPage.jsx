import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import { styled } from "@mui/material";

const AuthLayout = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const AuthBox = styled("div")((props) => ({
  backgroundColor: "white",
  borderRadius: "2vh",
  width: "30vw",
  padding: "2vw",
  [props.theme.breakpoints.down("sm")]: {
    width: "90vw",
    padding: "4vw",
  },
}));

const LoginPage = () => {
  return (
    <AuthLayout>
      <AuthBox>
        <LoginForm />
      </AuthBox>
    </AuthLayout>
  );
};

export { AuthLayout, AuthBox };
export default LoginPage;
