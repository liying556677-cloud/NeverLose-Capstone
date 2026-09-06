// Middleware that verifies a Firebase ID token from the Authorization header.
// If valid, attaches a minimal user object to req and calls next().
// If invalid or missing, responds with 401.

const { auth } = require("../config/firebaseConfig");

async function requireFirebaseAuth(req, res, next) {
  const header = req.headers.authorization;

  // Expecting: Authorization: Bearer <firebaseIdToken>
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "UNAUTHENTICATED" });
  }

  const idToken = header.split(" ")[1];

  try {
    // Verify the ID token using Firebase Admin SDK.
    const decoded = await auth.verifyIdToken(idToken);

    // Attach user info to the request for downstream handlers.
    req.user = {
      uid: decoded.uid,
      email: decoded.email || null
    };

    next();
  } catch (err) {
    console.error("Firebase ID token verification failed:", err.message);
    res.status(401).json({ error: "INVALID_TOKEN" });
  }
}

module.exports =  requireFirebaseAuth ;