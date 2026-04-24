// routes/historyRoutes.js

const express = require("express");
const router = express.Router();

const historyController = require("../controllers/historyController");
const { authMiddleware } = require("../middleware/authMiddleware");

// GET /api/history
router.get("/history", authMiddleware, historyController.getHistory);

module.exports = router;