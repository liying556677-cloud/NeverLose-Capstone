const { GoogleGenAI } = require("@google/genai"); // Note the new package name
const { uploadImage } = require("../services/uploadService");
const sharp = require("sharp");

// 1. Initialize the client (picks up API key from process.env.GEMINI_API_KEY)
// Option A: Explicit (Safest)
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});
exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No image file provided" });
    }

    // 2. Image Optimization
    const optimizedBuffer = await sharp(req.file.buffer)
      .resize(512, 512, { fit: "inside" })
      .jpeg({ quality: 60 })
      .toBuffer();

    // 3. Parallel Execution using the new SDK syntax
    const [response, photoUrl] = await Promise.all([
      ai.models.generateContent({
        model: "gemini-2.5-flash", // Use the latest 2.5 Flash
        contents: [
          {
            role: "user",
            parts: [
              { text: "Describe this item in one short sentence for a lost-and-found app. Focus on color and brand." },
              {
                inlineData: {
                  data: optimizedBuffer.toString("base64"),
                  mimeType: "image/jpeg",
                },
              },
            ],
          },
        ],
      }),
      uploadImage(optimizedBuffer, "items")
    ]);

    // 4. Send Response
    return res.status(200).json({
      success: true,
      data: {
        photoUrl,
        description: response.text.trim(),
        timestamp: new Date().toISOString(),
      },
    });

  } catch (err) {
    console.error("Upload Error:", err);
    return res.status(500).json({
      success: false,
      error: "Processing failed",
      details: err.message
    });
  }
};