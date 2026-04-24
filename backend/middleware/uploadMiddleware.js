// middleware/uploadMiddleware.js

const multer = require("multer");

// Store file in memory (for Firebase upload)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "video/mp4",
        "application/pdf",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

exports.upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB max
    },
});