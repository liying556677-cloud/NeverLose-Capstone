const { LabelService } = require("../services/labelService");

exports.getLabel = async (req, res) => {
  try {
    const ownerId = req.user.uid;
    const { itemId } = req.params;

    const preset = req.query["preset[id]"]|| "wallet";
    const widthMm = req.query["preset[widthMm]"];
    const heightMm = req.query["preset[heightMm]"];
    const diameterMm = req.query["preset[diameterMm]"];

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="label-${itemId}.pdf"`);

    await LabelService.generateLabelPdfForItem({
      ownerId,
      itemId,
      preset,
      widthMm,
      heightMm,
      diameterMm,
      res
    });

  } catch (err) {
    if (!res.headersSent) {
      res.status(400).json({ error: err.message });
    } else {
      res.end();
    }
  }
};