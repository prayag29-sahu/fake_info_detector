// services/textService.js

const aiService = require("./aiService");

exports.processText = async (text) => {
    return await aiService.checkText(text);
};