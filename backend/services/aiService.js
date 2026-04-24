// const axios = require("axios");
// const FormData = require("form-data");

// const AI_BASE_URL = process.env.AI_ENGINE_URL || "http://localhost:8000";

// // TEXT CHECK
// exports.checkText = async (text) => {
//     const response = await axios.post(`${AI_BASE_URL}/predict/text`, {
//         text,
//     });
//     return response.data;
// };

// // IMAGE CHECK
// exports.checkImage = async (fileBuffer) => {
//     const form = new FormData();
//     form.append("image", fileBuffer, "image.jpg");

//     const response = await axios.post(`${AI_BASE_URL}/predict/image`, form, {
//         headers: form.getHeaders(),
//     });

//     return response.data;
// };

// services/aiService.js

const axios = require("axios");
const FormData = require("form-data");

const AI_BASE_URL = process.env.AI_ENGINE_URL || "http://localhost:8000";

// TEXT
exports.checkText = async (text) => {
    const res = await axios.post(`${AI_BASE_URL}/predict/text`, { text });
    return res.data;
};

// IMAGE
exports.checkImage = async (buffer) => {
    const form = new FormData();

    form.append("image", buffer, {
        filename: "image.jpg",
        contentType: "image/jpeg",
    });

    const res = await axios.post(
        `${AI_BASE_URL}/predict/image`,
        form,
        {
            headers: form.getHeaders(),
            timeout: 30000,
        }
    );

    return res.data;
};

// VIDEO
exports.checkVideo = async (buffer) => {
    const form = new FormData();
    form.append("video", buffer, "video.mp4");

    const res = await axios.post(`${AI_BASE_URL}/predict/video`, form, {
        headers: form.getHeaders(),
    });

    return res.data;
};

// URL
exports.checkURL = async (url) => {
    const res = await axios.post(`${AI_BASE_URL}/predict/url`, { url });
    return res.data;
};

// DOCUMENT
exports.checkDocument = async (buffer) => {
    const form = new FormData();
    form.append("document", buffer, "file.pdf");

    const res = await axios.post(`${AI_BASE_URL}/predict/document`, form, {
        headers: form.getHeaders(),
    });

    return res.data;
};


exports.checkVideo = async (file) => {
    const formData = new FormData();

    formData.append("video", file.buffer, file.originalname);

    const response = await axios.post(
        `${process.env.AI_ENGINE_URL}/predict/video`,
        formData,
        {
            headers: formData.getHeaders(),
        }
    );

    return response.data;
};