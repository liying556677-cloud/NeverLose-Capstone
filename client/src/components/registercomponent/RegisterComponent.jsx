import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useSignup } from "../../hooks/useSignUp";
import "./RegisterComponent.css";

function RegisterComponent() {
  const { formData, status, loading, handleChange, handleSubmit } = useSignup();//Custom hook handles form state, validation, and signup logic

  return (
    // Form submission handled by custom hook
    <form onSubmit={handleSubmit} className="d-grid gap-3" noValidate>
      {/* Full Name input  */}
      <div className="form-group text-start">
        <label className="form-label fw-bold">Full Name:</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      {/* Email input  */}
      <div className="form-group text-start">
        <label className="form-label fw-bold">Email:</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      {/* password input */}
      <div className="form-group text-start">
        <label className="form-label fw-bold">Password</label>
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          className="form-control"
          placeholder="Minimum of 6 characters"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {/* Confirm Password input */}
      <div className="form-group text-start">
        <label className="form-label fw-bold">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="form-control"
          placeholder="Repeat the same password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
     {/* Submit button with loading state */}
      <CustomButton type="submit" variant="primary" disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </CustomButton>
      {/* Show error/status message if any  */}
      {status && <p className="text-danger small text-center mt-2">{status}</p>}
      {/* Redirect link to login page  */}
      <p className="text-center mt-1 small">
        Already have an account?{" "}
        <Link to="/login" className="text-primary fw-bold text-decoration-none">
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterComponent;
