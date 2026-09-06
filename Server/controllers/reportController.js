// controllers/reportController.js
// Handles listing, viewing, and updating reports for an item.
// Firestore logic lives in ReportService.

const { ReportService } = require("../services/reportService");

exports.getReports = async (req, res) => {
  try {
    const { itemId } = req.params;
    const ownerId = req.user.uid;

    const reports = await ReportService.listReports(itemId, ownerId);
    return res.json(reports);
  } catch (err) {
    console.error("List reports error:", err);
    return res.status(500).json({ error: "Failed to list reports" });
  }
};

exports.getReportDetail = async (req, res) => {
  try {
    const { itemId, reportId } = req.params;
    const ownerId = req.user.uid;

    const report = await ReportService.getReport(itemId, reportId, ownerId);

    if (report === "FORBIDDEN") {
      return res.status(403).json({ error: "FORBIDDEN" });
    }

    if (!report) {
      return res.status(404).json({ error: "NOT_FOUND" });
    }

    return res.json(report);
  } catch (err) {
    console.error("Get report error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const {  reportId } = req.params;
    const { itemId, reportStatus  } = req.body;
    const ownerId = req.user.uid;  

    await ReportService.updateReportStatus( reportId,itemId, reportStatus,ownerId );

    return res.json({ ok: true });
  } catch (err) {
    console.error("Update report status error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};