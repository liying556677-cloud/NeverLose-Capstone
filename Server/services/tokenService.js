// services/tokenService.js
// Generates cryptographically secure, URL‑safe tokens for items.
// These tokens are used in public scan URLs (/f/{token}).

const crypto = require("crypto");

exports.TokenService = {
  generateSecureToken() {
    // 128 bits of entropy (16 bytes) encoded as URL‑safe base64.
    return crypto.randomBytes(16).toString("base64url");
  }
};
