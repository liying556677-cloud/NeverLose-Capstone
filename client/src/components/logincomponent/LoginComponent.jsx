import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useLogin } from "../../hooks/useLogin";
import "./LoginComponent.css";

function LoginComponent({ onSuccess }) {
  const { formData, status, loading, handleChange, handleSubmit } =
    useLogin(onSuccess);

  return (
    <form onSubmit={handleSubmit} className="d-grid gap-3" noValidate>
      <div className="form-group text-start">
        <label className="form-label fw-bold">Email Address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group text-start">
        <label className="form-label fw-bold">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <CustomButton type="submit" variant="primary" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </CustomButton>

      {status && <p className="text-danger small text-center mt-2">{status}</p>}

      <p className="text-center mt-1 small">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-primary fw-bold text-decoration-none"
        >
          Register
        </Link>
      </p>
    </form>
  );
}

export default LoginComponent;
