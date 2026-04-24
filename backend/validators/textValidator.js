// validators/textValidator.js

const { body } = require("express-validator");

exports.textValidation = [
    body("text")
        .notEmpty()
        .withMessage("Text is required")
        .isString()
        .withMessage("Text must be a string")
        .isLength({ min: 5 })
        .withMessage("Text must be at least 5 characters long")
        .isLength({ max: 5000 })
        .withMessage("Text too long (max 5000 characters)"),
];