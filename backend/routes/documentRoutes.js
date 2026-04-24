// routes/documentRoutes.js

const express = require("express");
const router = express.Router();

const documentController = require("../controllers/documentController");

const { authMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const { documentValidation } = require("../validators/documentValidator");

// POST /api/document/check
router.post(
    "/document/check",
    authMiddleware,
    upload.single("document"),
    documentValidation,
    documentController.checkDocument
);

module.exports = router;