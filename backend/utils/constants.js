// utils/constants.js

module.exports = {
    SCAN_TYPES: {
        TEXT: "text",
        IMAGE: "image",
        VIDEO: "video",
        URL: "url",
        DOCUMENT: "document",
    },

    STATUS: {
        PROCESSING: "processing",
        COMPLETED: "completed",
        FAILED: "failed",
    },

    ROLES: {
        USER: "user",
        ADMIN: "admin",
    },

    FILE_TYPES: {
        IMAGE: "image",
        VIDEO: "video",
        DOCUMENT: "document",
    },

    LIMITS: {
        MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
        MAX_VIDEO_SIZE: 100 * 1024 * 1024, // 100MB
        MAX_DOCUMENT_SIZE: 20 * 1024 * 1024, // 20MB
    },
};