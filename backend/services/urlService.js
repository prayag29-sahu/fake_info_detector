// services/urlService.js

const aiService = require("./aiService");

exports.processURL = async (url) => {
    return await aiService.checkURL(url);
};