const aiService = require("./aiService");

exports.processVideo = async (file) => {
    const result = await aiService.checkVideo(file);
    return result;
};