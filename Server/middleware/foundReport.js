// middleware/validateFoundReport.js

exports.foundReport = (req, res, next) => {
  try {
    const { finder, message, verificationAnswer } = req.body;

    if (!finder || !finder.email || !finder.email.trim()) {
      return res.status(400).json({ error: "Finder email is required" });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    // If controller says verification is required, it will check later
    req._validatedFoundReport = {
      ...req.body,
      finder: {
        name: finder.name || "",
        email: finder.email.trim(),
        phone: finder.phone || "",
      },
      message: message.trim(),
      verificationAnswer: verificationAnswer || "",
    };

    next();
  } catch (err) {
    console.error("Found report validation error:", err);
    res.status(400).json({ error: "Invalid request body" });
  }
};