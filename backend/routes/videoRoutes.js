const express = require("express");
const router = express.Router();

const videoController = require("../controllers/videoController");

const { authMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const { videoValidation } = require("../validators/videoValidator");

router.post(
    "/video/check",
    authMiddleware,
    upload.single("video"),
    videoValidation,
    videoController.checkVideo
);

module.exports = router;