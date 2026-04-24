// services/documentService.js

const aiService = require("./aiService");

exports.processDocument = async (buffer) => {
    return await aiService.checkDocument(buffer);
};