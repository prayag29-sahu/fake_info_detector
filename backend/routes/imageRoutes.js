// routes/imageRoutes.js

const express = require("express");
const router = express.Router();

const imageController = require("../controllers/imageController");

const { authMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const { imageValidation } = require("../validators/imageValidator");

// POST /api/image/check
router.post(
    "/image/check",
    authMiddleware,
    upload.single("image"),
    imageValidation,
    imageController.checkImage
);

module.exports = router;