const { ItemService } = require("./itemService");
const { streamLabelPdf } = require("../utils/pdfGenerator");

const PUBLIC_BASE_URL = process.env.HOST_URL || "http://localhost:3000";

exports.LabelService = {
  async generateLabelPdfForItem({ ownerId, itemId, preset, widthMm, heightMm, diameterMm, res }) {
    const item = await ItemService.getItemByIdForOwner(itemId, ownerId);
    if (!item) throw new Error("Item not found or access denied");

    const scanUrl = `${PUBLIC_BASE_URL}/f/${item.token}`;

    await streamLabelPdf(res, {
      preset,
      custom: { widthMm, heightMm, diameterMm },
      scanUrl
    });
  }
};