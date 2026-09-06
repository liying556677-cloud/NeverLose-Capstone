// services/userService.js
// Handles all Firebase Auth + Firestore operations for users.
// This layer contains business logic and validation, keeping controllers thin.

const { admin, db } = require("../config/firebaseConfig");

const COLLECTION = "users";

exports.userService = {
  async createUser({ email, password, name }) {
    if (!email || !email.trim()) {
      throw new Error("Email is required");
    }

    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    if (!name || !name.trim()) {
      throw new Error("Name is required");
    }

    // Create Firebase Auth user
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name.trim(),
    });

    const uid = userRecord.uid;
    const createdAt = new Date().toISOString();

    const profile = {
      uid,
      email,
      name: name.trim(),
      createdAt,
    };

    // Store profile in Firestore
    await db.collection(COLLECTION).doc(uid).set(profile);

    return profile;
  },

  async loginUser({ email, password }) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Firebase REST login
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }

    return {
      idToken: data.idToken,
      refreshToken: data.refreshToken,
      uid: data.localId,
    };
  },

  async getUserProfile(uid) {
    if (!uid) throw new Error("UID is required");

    const doc = await db.collection(COLLECTION).doc(uid).get();
    return doc.exists ? doc.data() : null;
  },
};
