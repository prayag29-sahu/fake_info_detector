// validators/urlValidator.js

const { body } = require("express-validator");

exports.urlValidation = [
    body("url")
        .notEmpty()
        .withMessage("URL is required")
        .isURL()
        .withMessage("Invalid URL format")
        .isLength({ max: 2048 })
        .withMessage("URL too long"),
];