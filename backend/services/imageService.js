// services/imageService.js

const aiService = require("./aiService");

exports.processImage = async (buffer) => {
    return await aiService.checkImage(buffer);
};