// src/lib/qr.js
const QRCode= require('qrcode');

exports.generateQrDataUrl=  async (url)=> {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: 'M',
    margin: 0,
    scale: 8,
  });
}