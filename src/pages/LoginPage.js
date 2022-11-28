import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) navigate("/prebooking");
  }, [currentUser]);

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
