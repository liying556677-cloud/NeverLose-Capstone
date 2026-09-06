// routes/logRoutes.js
// -----------------------------------------------------------------------------
// Routes for accessing event history logs.
// These routes are typically used by:
// - Owner dashboards (recent activity)
// - Admin tools
// - Debugging interfaces
//
// All log writing is handled by LogService.
// This file only exposes READ endpoints.
// -----------------------------------------------------------------------------

const express = require("express");
const router = express.Router();

const { LogController } = require("../controllers/logController");

// -----------------------------------------------------------------------------
// GET /api/logs/item/:itemId
// Returns all event history entries for a specific item.
// Ordered by newest first.
// -----------------------------------------------------------------------------
router.get("/item/:itemId", LogController.getItemEvents);

module.exports = router;