const crypto = require("crypto");//this package used to encrypt firebase config details
const fs = require("fs");

// Read the raw Firebase Admin SDK JSON file.
const serviceAccount = fs.readFileSync("./FireBaseAdmin.json", "utf8");// this file has all the firebase configurations
const key = crypto.randomBytes(32); // 256-bit key i.e 32-byte

// Generate a 16‑byte initialization vector (IV) required for AES‑CBC encryption.
const iv = crypto.randomBytes(16);

// Create an AES‑256‑CBC cipher instance using the generated key and IV.
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

// Encrypt the Firebase config JSON into a Base64 string.
let encrypted = cipher.update(serviceAccount, "utf8", "base64");
encrypted += cipher.final("base64");

//store these output values to the .env file.
console.log("Encrypted Credentials:\n", encrypted);
console.log("Encryption Key:\n", key.toString("base64"));
console.log("IV:\n", iv.toString("base64"));