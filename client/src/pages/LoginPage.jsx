import React from "react";
import LoginComponent from "../components/logincomponent/LoginComponent";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

function LoginPage() {
  const navigate = useNavigate();//Hook for navigation
  return (
    <AuthLayout
      title="Welcome!"
      subtitle="Sign in to manage your protected items and check your activity"
    >
      <LoginComponent onSuccess={() => navigate("/")} />
    </AuthLayout>
  );
}

export default LoginPage;
