

const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Public routes
router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);

// Protected
router.get("/auth/profile", authMiddleware, authController.getProfile);

module.exports = router;