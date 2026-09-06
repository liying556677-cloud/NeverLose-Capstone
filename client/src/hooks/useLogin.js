import { useState } from "react";
import { login } from "../services/authService";

export const useLogin = (onSuccess) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    const cleanPassword = formData.password.trim();

    // client Validations
    if (!cleanEmail || !cleanPassword) {
      return setStatus("All fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return setStatus("Please enter a valid email address");
    }

    if (cleanPassword.length < 6) {
      return setStatus("Password must be at least 6 characters long");
    }

    // Request to server
    setLoading(true);
    try {
      setStatus("");
      await login({ email: cleanEmail, password: cleanPassword });
      if (onSuccess) onSuccess();
    } catch (err) {
      setStatus(err.response?.data?.error || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { formData, status, loading, handleChange, handleSubmit };
};
