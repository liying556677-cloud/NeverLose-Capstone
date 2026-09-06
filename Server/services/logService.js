// services/logService.js
// -----------------------------------------------------------------------------
// LogService
// -----------------------------------------------------------------------------
// Centralized service responsible for writing event history entries into
// Firestore. This ensures all audit logging is consistent, reusable, and
// decoupled from business logic.
//
// Event history is used for:
// - Owner dashboards (recent activity)
// - Admin tools
// - Debugging and traceability
// - Analytics
//
// Each event entry includes:
// - itemId: The item the event belongs to
// - ownerId: The owner of the item
// - type: A short event code (e.g., "CREATED", "UPDATED", "FOUND_REPORT_CREATED")
// - details: Arbitrary metadata describing what changed
// - timestamp: ISO timestamp for ordering
//
// This service is intentionally fire-and-forget. Logging failures should NEVER
// block user-facing operations.
// -----------------------------------------------------------------------------

const { db } = require("../config/firebaseConfig");

const EVENT_COLLECTION = "eventHistory";

exports.LogService = {
  /**
   * Write an event entry to Firestore.
   *
   * @param {string} itemId - The item this event relates to
   * @param {string} ownerId - The owner of the item
   * @param {string} type - Event type (e.g., "CREATED", "UPDATED")
   * @param {object} details - Additional metadata describing the event
   */
  async log(itemId, ownerId, type, details = {}) {
    const ref = db.collection(EVENT_COLLECTION).doc();

    const event = {
      id: ref.id,
      itemId,
      ownerId,
      type,
      details,
      timestamp: new Date().toISOString(),
    };

    // Fire-and-forget: logging should never block main operations
    ref.set(event).catch((err) => {
      console.error("Failed to write event history:", err);
    });
  },

  /**
   * Fetch all events for a given item, ordered by newest first.
   * Useful for dashboards or admin tools.
   *
   * @param {string} itemId
   * @returns {Promise<Array>}
   */
  async getEventsForItem(itemId) {
    const snap = await db
      .collection(EVENT_COLLECTION)
      .where("itemId", "==", itemId)
      .orderBy("timestamp", "desc")
      .get();

    return snap.docs.map((d) => d.data());
  },
};