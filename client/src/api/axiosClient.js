// src/api/axiosClient.js
import axios from "axios";
import { auth } from "../config/firebaseConfig";

// Base URL from environment
const API_BASE_URL = process.env.REACT_APP_API_URL;
console.log("API_BASE_URL:", API_BASE_URL);

// Create axios instance
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------------------
// 🔥 TOKEN CACHE (Fixes production refresh issue)
// -------------------------------
let currentToken = null;

// Firebase notifies us whenever the token changes
auth.onIdTokenChanged(async (user) => {
  if (user) {
    currentToken = await user.getIdToken();
  } else {
    currentToken = null;
  }
});

// -------------------------------
// 🔐 Attach token to every request
// -------------------------------
axiosClient.interceptors.request.use(
  (config) => {
    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;