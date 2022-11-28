import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/Auth/RegisterForm";
import { AuthLayout, AuthBox } from "./LoginPage";

const RegisterPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) navigate("/prebooking");
  }, [currentUser]);

  return (
    <AuthLayout>
      <AuthBox>
        <RegisterForm />
      </AuthBox>
    </AuthLayout>
  );
};

export default RegisterPage;
