// routes/urlRoutes.js

const express = require("express");
const router = express.Router();

const urlController = require("../controllers/urlController");

const { authMiddleware } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validateRequest");
const { urlValidation } = require("../validators/urlValidator");

// POST /api/url/check
router.post(
    "/url/check",
    authMiddleware,
    urlValidation,
    validateRequest,
    urlController.checkURL
);

module.exports = router;