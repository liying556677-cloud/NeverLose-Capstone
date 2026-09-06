// controllers/logController.js
// -----------------------------------------------------------------------------
// LogController
// -----------------------------------------------------------------------------
// Optional controller for exposing event history via API.
//
// This is typically used for:
// - Admin dashboards
// - Owner-facing activity timelines
// - Debugging tools
//
// Routes might look like:
//   GET /api/logs/item/:itemId
//
// This controller ONLY reads logs. Writing logs is handled by LogService.
// -----------------------------------------------------------------------------

const { LogService } = require("../services/logService");

exports.LogController = {
  /**
   * GET /api/logs/item/:itemId
   * Returns all event history entries for a specific item.
   */
  async getItemEvents(req, res) {
    try {
      const { itemId } = req.params;

      if (!itemId) {
        return res.status(400).json({ error: "itemId is required" });
      }

      const events = await LogService.getEventsForItem(itemId);

      return res.json({ events });
    } catch (err) {
      console.error("Error fetching event history:", err);
      return res.status(500).json({ error: "Failed to fetch event history" });
    }
  },
};