// routes/userRoutes.js
// User authentication & profile routes.

const express = require("express");
const router = express.Router();

const userController = require("../controllers/usersController");
const  requireFirebaseAuth = require("../middleware/firebaseAuth");

// Public routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// Protected route
router.get("/me", requireFirebaseAuth, userController.getCurrentUser);

module.exports = router;