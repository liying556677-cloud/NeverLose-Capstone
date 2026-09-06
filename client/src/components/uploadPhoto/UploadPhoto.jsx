import { useState, useEffect } from "react";
import uploadApi from "../../api/uploadApi";
import imageCompression from "browser-image-compression"; //

function UploadPhoto({ photoUrl, onUploaded }) {
  const [preview, setPreview] = useState(photoUrl || null);
  const [uploading, setUploading] = useState(false);
  // Update preview when parent sends new photo URL
  useEffect(() => {
    if (photoUrl) setPreview(photoUrl);
  }, [photoUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Show instant preview before upload
    setPreview(URL.createObjectURL(file));

    try {
      setUploading(true);

      // This protects against uploading photos larger than 10MB
      // by compressing them before uploading.
      const options = {
        maxSizeMB: 1, // Max 1MB
        maxWidthOrHeight: 1200, // Max width 1200px
        useWebWorker: true,
      };

      console.log("Compressing...");
      const compressedFile = await imageCompression(file, options);
      console.log(
        `Original: ${file.size / 1024 / 1024}MB | Compresed: ${compressedFile.size / 1024 / 1024}MB`,
      );

      // Upload the compressed file to the API
      const data = await uploadApi.uploadPhoto(compressedFile);
      onUploaded(data);
    } catch (err) {
      console.error(err);
      alert("Failed to compress or upload photo. Please try a smaller image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-photo-container h-100">
      {/* input hide */}
      <input
        type="file"
        id="photo-upload"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {/* Wizard-image-box clickable */}
      <label htmlFor="photo-upload" className="w-100 h-100 d-block">
        <div className={`nl-upload-zone ${uploading ? "opacity-50" : ""}`}>
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-100 h-100 object-fit-cover shadow-sm"
              style={{
                borderRadius: "inherit",
                display: "block",
              }}
            />
          ) : (
            <div className="text-center p-4">
              <i className="bi bi-camera fs-1 text-muted"></i>
              <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                Click to upload photo
              </div>
            </div>
          )}
          {/* Loading overlay during upload/compression  */}
          {uploading && (
            <div className="position-absolute d-flex flex-column align-items-center">
              <div
                className="spinner-border text-primary mb-2"
                role="status"
              ></div>
              <span className="fw-bold text-dark bg-white px-2 rounded">
                Processing...
              </span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}

export default UploadPhoto;
