// routes/uploadRoutes.js
// Handles uploading a single photo and returning a public URL.

const express = require("express");
const router = express.Router();

const requireFirebaseAuth = require("../middleware/firebaseAuth");
const upload = require("../middleware/upload");
const uploadController = require("../controllers/uploadController");

// Upload a single file and return its public URL
router.post(
  "/photo",
  
  upload.single("photo"),
  uploadController.uploadPhoto
);

module.exports = router;