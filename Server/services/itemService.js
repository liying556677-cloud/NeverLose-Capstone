// services/itemService.js
// -------------------------------------------------------------
// Handles all Firestore operations related to items, including:
// - Creation
// - Listing (with in-memory caching)
// - Updating
// - Deleting
// - Fetching by ID
//
// NEW: Event History Logging
// A new collection "eventHistory" stores an audit trail of:
// - Item creation
// - Item updates (with diff of changed fields)
// - listItems now returns the most recent event per item
// -------------------------------------------------------------

const { db } = require("../config/firebaseConfig");
const { TokenService } = require("../services/tokenService");
const { LogService } = require("../services/logService");

const COLLECTION = "items";
const EVENT_COLLECTION = "eventHistory";

// -------------------------------------------------------------
// Simple In-Memory Cache (per ownerId)
// -------------------------------------------------------------
const itemsCache = new Map();
const CACHE_TTL_MS = 10 * 1000;

function getCachedItems(ownerId) {
  const entry = itemsCache.get(ownerId);
  if (!entry) return null;

  if (entry.expiresAt < Date.now()) {
    itemsCache.delete(ownerId);
    return null;
  }

  return entry.data;
}

function setCachedItems(ownerId, data) {
  itemsCache.set(ownerId, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

function invalidateCache(ownerId) {
  itemsCache.delete(ownerId);
}

// -------------------------------------------------------------
// Item Service
// -------------------------------------------------------------
exports.ItemService = {
  // -----------------------------------------------------------
  // CREATE ITEM
  // -----------------------------------------------------------
  async createItem(ownerId, payload) {
    if (!payload.nickname || !payload.nickname.trim()) {
      throw new Error("Nickname is required");
    }

    if (payload.verification?.enabled && !payload.verification.question?.trim()) {
      throw new Error("Verification question is required when enabled");
    }

    const token = TokenService.generateSecureToken(128);
    const createdAt = new Date().toISOString();

    const docRef = db.collection(COLLECTION).doc();

    const item = {
      id: docRef.id,
      ownerId,
      nickname: payload.nickname.trim(),
      description: payload.description || "",
      photoUrl: payload.photoUrl || "",
      verification: payload.verification || { enabled: false },
      token,
      status: "SAFE",
      createdAt,
      lastActivityAt: null,
    };

    await docRef.set(item);

    invalidateCache(ownerId);

    // Log event
    LogService.log(item.id, ownerId, "CREATED", { item });

    return item;
  },

  // -----------------------------------------------------------
  // LIST ITEMS (with caching + latest event)
  // -----------------------------------------------------------
  async listItems(ownerId) {
    const cached = getCachedItems(ownerId);
    if (cached) return cached;

    const snap = await db
      .collection(COLLECTION)
      .where("ownerId", "==", ownerId)
      .get();

    const items = snap.docs.map((doc) => doc.data());

    const results = [];

    for (const item of items) {
      // Check open reports
      const reportsSnap = await db
        .collection("foundReports")
        .where("itemId", "==", item.id)
        .where("internalStatus", "==", "OPEN")
        .get();

      // Fetch most recent event
      const eventSnap = await db
        .collection(EVENT_COLLECTION)
        .where("itemId", "==", item.id)
        .orderBy("timestamp", "desc")
        .limit(1)
        .get();

      const latestEvent = eventSnap.empty ? null : eventSnap.docs[0].data();

      results.push({
        ...item,
        hasReports: !reportsSnap.empty,
        reportCount:reportsSnap.empty? 0 : reportsSnap.size,
        latestEvent, // <-- NEW
      });
    }

    setCachedItems(ownerId, results);
    return results;
  },

  // -----------------------------------------------------------
  // UPDATE ITEM
  // -----------------------------------------------------------
  async updateItem(itemId, ownerId, updates) {
    const docRef = db.collection(COLLECTION).doc(itemId);
    const snap = await docRef.get();

    if (!snap.exists) return null;

    const item = snap.data();
    if (item.ownerId !== ownerId) return null;

    const allowed = {};
    const changedFields = {};

    if (updates.nickname?.trim()) {
      allowed.nickname = updates.nickname.trim();
      changedFields.nickname = { from: item.nickname, to: allowed.nickname };
    }

    if (typeof updates.description === "string") {
      allowed.description = updates.description;
      changedFields.description = { from: item.description, to: updates.description };
    }

    if (typeof updates.photoUrl === "string") {
      allowed.photoUrl = updates.photoUrl;
      changedFields.photoUrl = { from: item.photoUrl, to: updates.photoUrl };
    }

    if (updates.verification) {
      allowed.verification = updates.verification;
      changedFields.verification = { from: item.verification, to: updates.verification };
    }

    if (updates.status) {
      allowed.status = updates.status;
      changedFields.status = { from: item.status, to: updates.status };
    }

    allowed.lastActivityAt = new Date().toISOString();

    await docRef.update(allowed);

    invalidateCache(ownerId);

    // Log event
    // And in updateItem:
    LogService.log(itemId, ownerId, "UPDATED", { changedFields });

    return { ...item, ...allowed };
  },

  // -----------------------------------------------------------
  // GET ITEM (Owner)
  // -----------------------------------------------------------
  async getItemByIdForOwner(itemId, ownerId) {
    const doc = await db.collection(COLLECTION).doc(itemId).get();
    if (!doc.exists) return null;

    const item = doc.data();
    if (item.ownerId !== ownerId) return null;

    item.publicUrl = process.env.HOST_URL + "/f/" + item.token;
    return item;
  },

  // -----------------------------------------------------------
  // GET ITEM (Public)
  // -----------------------------------------------------------
  async getItemById(itemId) {
    const doc = await db.collection(COLLECTION).doc(itemId).get();
    const item = doc.data();
    if (!item) return null;

    item.publicUrl = process.env.HOST_URL + "/f/" + item.token;
    return item;
  },

  // -----------------------------------------------------------
  // DELETE ITEM
  // -----------------------------------------------------------
  async deleteItem(itemId) {
    const reportsRef = db.collection("reports").where("itemId", "==", itemId);
    const reportsSnap = await reportsRef.get();

    const batch = db.batch();

    reportsSnap.forEach((doc) => batch.delete(doc.ref));

    const itemRef = db.collection(COLLECTION).doc(itemId);
    const itemSnap = await itemRef.get();

    if (itemSnap.exists) {
      const ownerId = itemSnap.data().ownerId;
      invalidateCache(ownerId);
    }

    batch.delete(itemRef);

    await batch.commit();

    return { deleted: true };
  },
};