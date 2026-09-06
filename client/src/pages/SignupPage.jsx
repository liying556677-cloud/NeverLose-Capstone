import React from "react";
import RegisterComponent from "../components/registercomponent/RegisterComponent";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

function SignupPage() {
  const navigate = useNavigate();//Hook for navigation
  return (
    <AuthLayout
      title="Join the community"
      subtitle="Secure your essentials and gain peace of mind"
    >
      {/* After successful signup → navigate to login page */}
      <RegisterComponent onSuccess={() => navigate("/login")} />
    </AuthLayout>
  );
}

export default SignupPage;
