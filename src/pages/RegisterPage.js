import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import { AuthLayout, AuthBox } from "./LoginPage";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <AuthBox>
        <RegisterForm />
      </AuthBox>
    </AuthLayout>
  );
};

export default RegisterPage;
