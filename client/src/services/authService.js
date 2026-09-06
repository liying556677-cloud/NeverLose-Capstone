// src/services/authService.js
import axiosClient from "../api/axiosClient";
import { auth } from "../config/firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

/**
 * Signup (handled by backend)
 */
export async function signup({ name, email, password }) {
  const res = await axiosClient.post("/api/users/signup", {
    name,
    email,
    password,
  });
  return res.data;
}

/**
 * Login (backend verifies password, Firebase creates session)
 */
export async function login({ email, password }) {
  // Step 1: backend verifies credentials
  await axiosClient.post("/api/users/login", { email, password });

  // Step 2: Firebase client logs user in (session)
  await signInWithEmailAndPassword(auth, email, password);

  return { ok: true };
}

/**
 * Logout (Firebase only)
 */
export async function logout() {
  await signOut(auth);
}

/**
 * Observe auth state
 */
export function observeAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Get Firebase ID token (used by axios interceptor)
 */
export async function getIdToken() {
  if (!auth.currentUser) return null;
  return await auth.currentUser.getIdToken();
}