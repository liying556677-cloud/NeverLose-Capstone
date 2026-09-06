// middleware/rateLimiter.js
// Rate limiting for public endpoints to prevent abuse.

const rateLimit = require("express-rate-limit");

// Example: limit to 10 requests per 10 minutes per IP
const publicLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

module.exports = { publicLimiter };
