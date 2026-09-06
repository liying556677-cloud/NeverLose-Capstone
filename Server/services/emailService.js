// services/emailService.js
// -----------------------------------------------------------------------------
// EmailService (SendGrid Version)
// -----------------------------------------------------------------------------

const sgMail = require("@sendgrid/mail");
const { db } = require("../config/firebaseConfig");

const OUTBOX_COLLECTION = "emailOutbox";

// -----------------------------------------------------------------------------
// Configure SendGrid Client
// -----------------------------------------------------------------------------
// Make sure SENDGRID_API_KEY is set in Render Environment Variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// -----------------------------------------------------------------------------
// Log an email attempt to Firestore
// -----------------------------------------------------------------------------
async function logOutbox({ to, subject, body, status, error }) {
  const ref = db.collection(OUTBOX_COLLECTION).doc();

  const entry = {
    id: ref.id,
    to,
    subject,
    body,
    status, // SENT, FAILED_ATTEMPT_X, FAILED
    error: error || null,
    createdAt: new Date().toISOString(),
    env: process.env.NODE_ENV || "development",
  };

  ref.set(entry).catch((err) => {
    console.error("Failed to write email outbox entry:", err);
  });
}

// -----------------------------------------------------------------------------
// Send Found Report Email (SendGrid version)
// -----------------------------------------------------------------------------
async function sendFoundReportEmail({ to, subject, body }) {
  const maxRetries = parseInt(process.env.MAX_EMAIL_ATTEMPT || "3", 10);

  // CRITICAL: Without a domain, the 'from' email MUST be the one 
  // you verified in SendGrid's "Single Sender Verification".
  const verifiedSender = process.env.EMAIL_USER; 

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const msg = {
        to: to, 
        from: verifiedSender, 
        subject: subject,
        html: `<pre>${body}</pre>`,
      };

      // SendGrid's .send() returns a promise
      await sgMail.send(msg);

      // Log success
      await logOutbox({
        to,
        subject,
        body,
        status: "SENT",
      });

      console.log(`EMAIL SENT via SendGrid → ${to} (attempt ${attempt})`);
      return;

    } catch (err) {
      // SendGrid errors are inside err.response.body
      const errorMessage = err.response ? JSON.stringify(err.response.body) : err.message;
      console.error(`Email attempt ${attempt} failed:`, errorMessage);

      await logOutbox({
        to,
        subject,
        body,
        status: `FAILED_ATTEMPT_${attempt}`,
        error: errorMessage,
      });

      if (attempt === maxRetries) {
        await logOutbox({
          to,
          subject,
          body,
          status: "FAILED",
          error: errorMessage,
        });
        return;
      }

      const wait = 1000 * Math.pow(2, attempt - 1);
      await delay(wait);
    }
  }
}

module.exports = {
  sendFoundReportEmail,
};