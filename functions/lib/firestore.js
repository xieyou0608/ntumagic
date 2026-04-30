const admin = require("firebase-admin");
const { getFirestore, FieldValue, Timestamp } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = getFirestore();
const auth = getAuth();

module.exports = { admin, db, auth, FieldValue, Timestamp };
