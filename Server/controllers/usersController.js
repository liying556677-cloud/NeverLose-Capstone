// controllers/userController.js
// Handles signup, login, and profile retrieval.

const {userService} = require("../services/userService");

/**
 * POST /api/users/signup
 */
async function signup(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "EMAIL_PASSWORD_NAME_REQUIRED" });
    }

    const user = await userService.createUser({ email, password, name });
    res.status(201).json(user);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: err.message || "SIGNUP_FAILED" });
  }
}

/**
 * POST /api/users/login
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const data = await userService.loginUser({ email, password });
    const profile = await userService.getUserProfile(data.uid);

    res.json({
      ...data,
      profile,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(401).json({ error: err.message || "LOGIN_FAILED" });
  }
}

/**
 * GET /api/users/me
 */
async function getCurrentUser(req, res) {
  try {
    const user = await userService.getUserProfile(req.user.uid);

    if (!user) return res.status(404).json({ error: "USER_NOT_FOUND" });

    res.json(user);
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
}

module.exports = {
  signup,
  login,
  getCurrentUser,
};