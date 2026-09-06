import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/userApi";

export const useSignup = (onSuccess) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle any input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = formData.email.trim();

    // client Validations
    if (!formData.name.trim()) {
      return setStatus("Username is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return setStatus("Please enter a valid email address");
    }

    if (formData.password.length < 6) {
      return setStatus("Password must be at least 6 characters long");
    }

    if (formData.password !== formData.confirmPassword) {
      return setStatus("Passwords do not match");
    }

    // Request to server
    setLoading(true);
    try {
      setStatus("");
      await authApi.signup({ ...formData, email: cleanEmail });

      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/login");
      }
    } catch (err) {
      setStatus(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return { formData, status, loading, handleChange, handleSubmit };
};
