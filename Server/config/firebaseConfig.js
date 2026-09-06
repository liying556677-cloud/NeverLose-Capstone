const admin = require("firebase-admin"); //this package is used to deal with firestore database
const crypto = require("crypto");// this package used to encrup the firebase configuarion details
const dotenv = require("dotenv").config(); // This package is used to data from environment variables 

//configure enviroment 
//dotenv.config();

//firebase configurations are stored in encryped format so decrypting before use
function decryptCredentials() {
  const encrypted = process.env.FIREBASE_ENCRYPTED;
  const key = Buffer.from(process.env.FIREBASE_KEY, "base64");
  const iv = Buffer.from(process.env.FIREBASE_IV, "base64");

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
}
//configure service account
const serviceAccount = decryptCredentials();

//initialized app 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET
});


const db = admin.firestore();
const auth = admin.auth();
const bucket = admin.storage().bucket();


module.exports = { admin, db, auth,bucket };