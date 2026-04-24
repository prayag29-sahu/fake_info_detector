// routes/textRoutes.js

const express = require("express");
const router = express.Router();

const textController = require("../controllers/textController");

const { authMiddleware } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validateRequest");
const { textValidation } = require("../validators/textValidator");

// POST /api/text/check
router.post(
    "/text/check",
    authMiddleware,
    textValidation,
    validateRequest,
    textController.checkText
);

module.exports = router;