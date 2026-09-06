const { auth, db } = require("../config/firebaseConfig"); // Firebase Admin SDK (Auth + Firestore)
const { LogService } = require("../services/logService"); // Centralized event logging service

// Firestore collection names
const COLLECTION = "items";
const FOUND_COLLECTION = "foundReports";
const USER_COLLECTION = "users";

exports.PublicService = {
  /**
   * Fetch an item using its public token.
   * This is used when a finder scans a QR code.
   *
   * @param {string} token - The public token assigned to an item
   * @returns {Promise<object|null>} - The item or null if not found
   */
  async getItemByToken(token) {
    const snap = await db
      .collection(COLLECTION)
      .where("token", "==", token)
      .limit(1)
      .get();

    if (snap.empty) return null;
    return snap.docs[0].data();
  },

  /**
   * Convert an item into a safe public-facing structure.
   * This ensures no sensitive fields are exposed to finders.
   *
   * @param {object} item - Full item document
   * @returns {object} - Sanitized public view
   */
  toPublicView(item) {
    return {
      token: item.token,
      nickname: item.nickname,
      status: item.status,
      verificationQuestion: item.verification?.enabled
        ? item.verification.question
        : null,
      instructions: item.instructions || null, // Optional field if enabled
    };
  },

  /**
   * Fetch the owner profile for an item.
   * Used when sending notifications or showing owner info.
   *
   * @param {string} ownerId - Firebase Auth UID
   * @returns {Promise<object|null>}
   */
  async getItemOwner(ownerId) {
    if (!ownerId) throw new Error("UID is required");

    const doc = await db.collection(USER_COLLECTION).doc(ownerId).get();
    return doc.exists ? doc.data() : null;
  },

  /**
   * Create a new "found report" when someone reports finding an item.
   * Includes:
   *  - Rate limiting by IP
   *  - First-report detection
   *  - Item status update
   *  - Event history logging
   *
   * @param {object} params
   * @param {object} params.item - The item being reported
   * @param {string} params.token - Public token for the item
   * @param {object} params.payload - Finder details + message
   * @param {string} params.ip - Finder's IP address for rate limiting
   */
  async createFoundReport({ item, token, payload, ip }) {
    const createdAt = new Date().toISOString();

    // Finder email (required for rate limiting + notifications)
    const finderEmail = payload.finder.email;

    // Max allowed attempts per IP per item
    const MAX_ATTEMPTS = parseInt(process.env.MAX_FOUNDER_ATTEMPTS || "3", 10);

    // -------------------------------------------------------------------------
    // RATE LIMITING: Prevent spam by limiting attempts per IP per item
    // -------------------------------------------------------------------------
    const existingReportsSnap = await db
      .collection(FOUND_COLLECTION)
      .where("ip", "==", ip)
      .where("itemId", "==", item.id)
      .where("internalStatus", "!=", "CLOSE")
      .get();

    if (existingReportsSnap.size >= MAX_ATTEMPTS) {
      const rateLimitError = new Error("Too many submissions. Please try again later.");
      rateLimitError.code = "RATE_LIMITED";
      rateLimitError.status = 429;
      throw rateLimitError;
    }

    // -------------------------------------------------------------------------
    // Determine if this is the FIRST report for this item
    // -------------------------------------------------------------------------
    const allReportsForItem = await db
      .collection(FOUND_COLLECTION)
      .where("itemId", "==", item.id)
      .get();

    const isFirstReport = allReportsForItem.empty;

    // -------------------------------------------------------------------------
    // CREATE NEW FOUND REPORT
    // -------------------------------------------------------------------------
    const docRef = db.collection(FOUND_COLLECTION).doc();

    const report = {
      id: docRef.id,
      itemId: item.id,
      itemToken: token,
      ownerId: item.ownerId,
      finder: {
        name: payload.finder?.name || "",
        email: finderEmail,
        phone: payload.finder?.phone || "",
      },
      message: payload.message,
      reportStatus: "NEW",
      internalStatus: "OPEN",
      foundLocationText: payload.foundLocationText || "",
      photoUrl: payload.photoUrl || "",
      verificationAnswer: payload.verificationAnswer || "",
      createdAt,
      ip,
    };

    await docRef.set(report);

    // -------------------------------------------------------------------------
    // UPDATE ITEM STATUS (only on first report)
    // -------------------------------------------------------------------------
    await db.collection(COLLECTION).doc(item.id).update({
      status: "LOST",
      updatedAt: new Date().toISOString(),
    });

    // -------------------------------------------------------------------------
    // LOG EVENT HISTORY (non-blocking)
    // -------------------------------------------------------------------------
    LogService.log(item.id, item.ownerId, "FOUND REPORT CREATED", {
      reportId: report.id,
      finderEmail,
      message: payload.message,
      isFirstReport,
    });

    return {
      reportId: report.id,
      ok: true,
    };
  },
};