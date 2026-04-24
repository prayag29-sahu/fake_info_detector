// config/firebase.js

const admin = require("firebase-admin");
const path = require("path");

// Load service account
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
    throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_PATH");
}

const serviceAccount = require(path.resolve(serviceAccountPath));

// Initialize Firebase (only once)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
}

// Get bucket
const bucket = admin.storage().bucket();

module.exports = {
    admin,
    bucket,
};