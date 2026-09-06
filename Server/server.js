// Main Express entrypoint.
// Wires security middleware and routes.
const path = require('path');
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const pinoHttp = require("pino-http");

const itemsRouter = require("./routes/items");
const publicRouter = require("./routes/public");
const usersRouter = require("./routes/users");
const reportRouter = require("./routes/reports");
const labelRouter = require("./routes/labels");
const uploadRouter = require("./routes/upload");
const logRouter = require("./routes/log");
const logger = require("./logger"); // ✅ use CommonJS require

const app = express();

// Attach Pino to every request (do this early)
app.use(
  pinoHttp({
    logger,
  })
);

// Basic security headers
app.use(helmet());
logger.info("App starting...");

// Allow frontend (React) to call this API
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// User authentication routes
app.use("/api/users", usersRouter);

// Owner (authenticated) APIs
app.use("/api/items", itemsRouter);

// Public (no auth) APIs
app.use("/api/public", publicRouter);

// Report APIs
app.use("/api/reports", reportRouter);

// Label APIs
app.use("/api/labels", labelRouter);

// Upload photo
app.use("/api/upload", uploadRouter);

// Log history for Item
app.use("/api/logs", logRouter);

// Simple health check
app.get("/health", (req, res) => {
  req.log.info("Health check hit"); // ✅ request-scoped logger
  res.json({ ok: true });
});

//Get all API endpoints 
app.use(express.static(__dirname));
app.get('/api-docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'api.html'));
});

// Simple route
app.get("/ping", (req, res) => {
  req.log.info("Handling /ping route"); // ✅ request-scoped logger
  res.json({ message: "pong" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  logger.info(`Backend listening on port ${port}`); // ✅ use Pino, not console.log
});