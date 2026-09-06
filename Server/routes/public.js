const express = require("express");
const router = express.Router();

const {
  getPublicItem,
  submitFoundReport  
} = require("../controllers/publicController");
const {foundReport} = require("../middleware/foundReport");


// No auth: public endpoints
// GET /api/public/items/{token}
router.get("/items/:token", getPublicItem);

// POST /api/public/items/{token}/found
router.post(
  "/items/:token/found",
  foundReport,
  submitFoundReport
);

module.exports = router;
