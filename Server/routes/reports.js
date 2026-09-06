const express = require("express");
const router = express.Router();

const requireFirebaseAuth = require("../middleware/firebaseAuth");
const reportController = require("../controllers/reportController");

// List all reports for a specific item (owner only)
router.get("/item/:itemId", requireFirebaseAuth, reportController.getReports);

// Update report status
router.patch("/:reportId", requireFirebaseAuth, reportController.changeStatus);

module.exports = router;