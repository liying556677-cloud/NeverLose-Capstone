const { PublicService } = require("../services/publicService");
const { sendFoundReportEmail } = require("../services/emailService");
// GET /api/public/items/:token
async function getPublicItem(req, res) {
  try {
    const { token } = req.params;

    const item = await PublicService.getItemByToken(token);
    if (!item) {
      return res.status(404).json({ error: "Tag not found" });
    }

    const publicView = PublicService.toPublicView(item);

    // If CLOSED, still return but UI should show inactive state
    return res.json(publicView);
  } catch (err) {
    console.error("Public item fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// POST /api/public/items/:token/found
async function submitFoundReport(req, res) {
  try {
    const { token } = req.params;
    const payload = req._validatedFoundReport;

    const item = await PublicService.getItemByToken(token);
    const ownerid = item.ownerId;
    if (!item) {
      return res.status(404).json({ error: "Tag not found" });
    }

    if (item.status === "CLOSED") {
      return res.status(400).json({ error: "This tag is inactive" });
    }

    // If verification is enabled, require non-empty answer
    if (item.verification?.enabled) {
      if (!payload.verificationAnswer || !payload.verificationAnswer.trim()) {
        return res
          .status(400)
          .json({ error: "Verification answer is required" });
      }
    }
    const ip = req.headers["x-forwarded-for"] || req.ip;

    const result = await PublicService.createFoundReport({
      item,
      token,
      payload: req.body,
      ip,
    });

    const reportId = result.reportId;
    // res.status(201).json(result); // { ok: true, reportId }
    // Fetch owner email
    const owner = await PublicService.getItemOwner(ownerid);

    const emailBody = `
Hi there,

Good news — someone has reported finding an item that matches your tag.

Item: ${item.nickname}
Finder’s Name: ${payload.finder?.name || "Not provided"}
Finder’s Phone: ${payload.finder?.phone || "Not provided"}
Finder’s Email: ${payload.finder?.email}
Location: ${payload.foundLocationText || "N/A"}
Verification Answer: ${payload.verificationAnswer || "N/A"}
Photo: ${payload.photoUrl || "N/A"}
Finder’s Message:
${payload.message}

What happens next?
You can now review this report in your dashboard and decide how you want to respond. 
If verification was enabled, the finder has already submitted their answer.

We recommend replying to the finder directly to coordinate pickup or return.

Stay safe,
The NeverLose Team
`.trim();


    await sendFoundReportEmail({
      to: owner.email,
       subject : `Someone found your item: ${item.nickname}`,

      body: emailBody,
    });

    return res.status(201).json({ ok: true, reportId });
  } catch (err) {
    if (err.code === "RATE_LIMITED") {
      return res.status(429).json({
        ok: false,
        error: "RATE_LIMITED",
        message: "Too many submissions. Please try again later.",
      });
    }
    else {
    // fallback
    res.status(500).json({
      ok: false,
      error: "SERVER_ERROR",
      message: err.message,
    });
  }
  }
}

module.exports = {
  getPublicItem,
  submitFoundReport,
};
