// services/storageService.js

const { bucket } = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

exports.uploadFile = async (file, userId, scanId, folder) => {
    const filename = `${Date.now()}_${file.originalname}`;
    const filePath = `${folder}/${userId}/${scanId}/${filename}`;

    const blob = bucket.file(filePath);

    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: file.mimetype,
            metadata: {
                firebaseStorageDownloadTokens: uuidv4(),
            },
        },
    });

    return new Promise((resolve, reject) => {
        blobStream.on("error", reject);

        blobStream.on("finish", async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

            resolve({
                path: filePath,
                url: publicUrl,
            });
        });

        blobStream.end(file.buffer);
    });
};