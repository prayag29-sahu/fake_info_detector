// validators/documentValidator.js

exports.documentValidation = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            error: "Document file is required",
        });
    }

    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
    ];

    if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
            success: false,
            error: "Invalid document type",
        });
    }

    next();
};