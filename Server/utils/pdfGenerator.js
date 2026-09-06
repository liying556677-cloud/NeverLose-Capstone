const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

const MM_TO_PT = 72 / 25.4;

exports.streamLabelPdf = async (res, opts) => {
  const { preset, widthMm, heightMm, scanUrl } = opts;

  // 1. Determine Dimensions based on Image Reference
  let wMm, hMm, isCircle = false;
  switch (preset) {
    case 'wallet': wMm = 85.6; hMm = 53.98; break; 
    case 'airtag': wMm = 32; hMm = 32; isCircle = true; break;
    case 'small-tag': wMm = 47; hMm = 30; break;
    default: wMm = parseFloat(widthMm) || 50; hMm = parseFloat(heightMm) || 50;
  }

  const w = wMm * MM_TO_PT;
  const h = hMm * MM_TO_PT;

  const doc = new PDFDocument({ size: [w, h], margins: 0 });
  doc.pipe(res);

  const qrBuffer = await QRCode.toBuffer(scanUrl, {
    errorCorrectionLevel: 'H',
    margin: 0,
    width: 600
  });

  // --- STYLE A: WALLET (Horizontal Layout) ---
  if (preset === 'wallet') {
    const padding = h * 0.1;
    const innerH = h - (padding * 2);
    const innerW = w - (padding * 2);

    // Rounded Border
    doc.roundedRect(padding, padding, innerW, innerH, 8).lineWidth(1.5).stroke('#333');

    // QR on the Left
    const qrSize = innerH * 0.8;
    doc.image(qrBuffer, padding + 15, (h - qrSize) / 2, { width: qrSize });

    // Text on the Right
    doc.fillColor('#000').font('Helvetica-Bold').fontSize(16)
       .text('Neverlose', padding + qrSize + 25, h * 0.35);
    doc.fillColor('#666').font('Helvetica').fontSize(9)
       .text('SCAN IF FOUND', padding + qrSize + 25, h * 0.55);
  }

  // --- STYLE B: AIRTAG (Circular with Arched Text) ---
  else if (preset === 'airtag') {
    const center = w / 2;
    const radius = (w / 2) - 2;

    // Outer Circle
    doc.circle(center, center, radius).lineWidth(1).stroke('#333');

    // QR Centered
    const qrSize = w * 0.45;
    doc.image(qrBuffer, center - (qrSize / 2), center - (qrSize / 2) - 4, { width: qrSize });

    // Arched Branding (Simplified for PDFKit: centered below)
    doc.fillColor('#000').font('Helvetica-Bold').fontSize(7)
       .text('SCAN IF FOUND', 0, center + (qrSize / 2) + 2, { width: w, align: 'center' });
  }

  // --- STYLE C: SMALL TAG (Minimalist) ---
  else if (preset === 'small-tag') {
    const innerPadding = 2.5 * MM_TO_PT;
    doc.roundedRect(innerPadding, innerPadding, w - (innerPadding * 2), h - (innerPadding * 2), 3)
       .lineWidth(0.8).stroke('#333');

    const qrSize = h * 0.5;
    doc.image(qrBuffer, (w - qrSize) / 2, innerPadding +6, { width: qrSize });

    doc.fillColor('#000').font('Helvetica-Bold').fontSize(6)
       .text('SCAN IF FOUND', 0, h - innerPadding -6, { width: w, align: 'center' });
  }

  // --- STYLE D: POSTER / CUSTOM (The Main Image Style) ---
  else {
    const borderPadding = w * 0.05;
    doc.rect(borderPadding, borderPadding, w - (borderPadding * 2), h - (borderPadding * 2))
       .lineWidth(2).stroke('#333');

    const qrSize = w * 0.6;
    doc.image(qrBuffer, (w - qrSize) / 2, h * 0.15, { width: qrSize });

    doc.fillColor('#666').font('Helvetica').fontSize(w * 0.05)
       .text('SCAN IF FOUND', 0, h * 0.8, { width: w, align: 'center' });

    //doc.fillColor('#000').font('Helvetica-Bold').fontSize(w * 0.1)
    //   .text('Neverlose', 0, h * 0.8, { width: w, align: 'center' });
  }

  doc.end();
};