// routes/adminRoutes.js

const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

const { authMiddleware } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");

// Apply both middlewares to all admin routes
// router.use(authMiddleware, adminMiddleware);

// Admin APIs
router.get("/admin/users", adminController.getAllUsers);

router.put("/admin/block/:userId", adminController.blockUser);
router.put("/admin/unblock/:userId", adminController.unblockUser);

router.get("/admin/scans", adminController.getAllScans);

module.exports = router;