// middleware/uploadMiddleware.js
// Handles multipart/form-data uploads using Multer.
// This middleware extracts the uploaded file and makes it available as req.file.

const multer = require("multer");

// Store file in memory so we can upload to Firebase Storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

module.exports = upload;