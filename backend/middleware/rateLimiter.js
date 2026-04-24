// middleware/rateLimiter.js

const rateLimit = require("express-rate-limit");

exports.apiLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
    message: {
        error: "Too many requests, please try again later",
    },
});