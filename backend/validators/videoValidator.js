exports.videoValidation = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: "Video file is required" });
    }

    next();
};