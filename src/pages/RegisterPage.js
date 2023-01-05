import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import { AuthLayout, AuthBox } from "./LoginPage";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <AuthBox sx={{ mt: 2 }}>
        <RegisterForm />
      </AuthBox>
    </AuthLayout>
  );
};

export default RegisterPage;
