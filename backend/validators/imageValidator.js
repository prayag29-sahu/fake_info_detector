// validators/imageValidator.js

exports.imageValidation = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            error: "Image file is required",
        });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
            success: false,
            error: "Invalid image format (only jpg, png allowed)",
        });
    }

    next();
};