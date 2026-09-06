import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Modal, Button } from "react-bootstrap";

import { labelApi } from "../../api/labelApi";

import qrIcon from "../../assets/QR-Icon.svg";
import tagIcon from "../../assets/tag-icon.svg";
import printIcon from "../../assets/print-icon.svg";

// SVG Icons
import { ReactComponent as WalletIcon } from "../../assets/WalletQR.svg";
import { ReactComponent as CircleIcon } from "../../assets/CircleQR.svg";
import { ReactComponent as SquareIcon } from "../../assets/SquareQR.svg";
import { ReactComponent as CustomIcon } from "../../assets/CustomQR.svg";

// Components
import ConfirmDialog from "../confirmDialog/ConfirmDialog";
import CustomButton from "../CustomButton/CustomButton";
import CopyUrlLabel from "../CopyUrlLabel/CopyUrlLabel";
import "./LabelScreen.css";

const defaultPresets = [
  {
    id: "wallet",
    name: "Wallet",
    description: "Standard ID size",
    shape: "rect",
    widthMm: 85.6,
    heightMm: 54.0,
  },
  {
    id: "airtag",
    name: "AirTag",
    description: "Circular sticker",
    shape: "circle",
    diameterMm: 32.0,
  },
  {
    id: "small-tag",
    name: "Small Tag",
    description: "Ideal for keychains",
    shape: "rect",
    widthMm: 30.0,
    heightMm: 20.0,
  },
  { id: "custom", name: "Custom", description: "Set your own dimensions" },
];
export default function LabelScreen({ item: propItem, embedded = true }) {
  const location = useLocation();

  const initialItem = propItem || location.state;

  const [item] = useState(() => ({
    ...initialItem,
    labelPresets: initialItem?.labelPresets || defaultPresets,
  }));
  const [error, setError] = useState("");

  // Custom size inputs
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");

  //confirmation States
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState(null);
  const [activePreset, setActivePreset] = useState(null);
  const [showDimensionError, setShowDimensionError] = useState(false);

  // --- 3. Logic Functions ---
  const LabelPreviewContent = ({ activePreset, item }) => {
    const qrValue =
      item.publicUrl || `${window.location.origin}/f/${item.token}`;

    // 1. STYLE: WALLET (Horizontal)
    // --- STYLE: WALLET (Exact PDF Logic) ---
    if (activePreset?.id === "wallet") {
      // 1mm = 3.7795px (96 DPI conversion)
      const MM_TO_PX = 96 / 25.4;

      // Physical dimensions converted to pixels
      const w = 85.6 * MM_TO_PX;
      const h = 53.98 * MM_TO_PX;

      // Internal Logic from backend
      const padding = h * 0.1;
      const innerH = h - padding * 2;
      const innerW = w - padding * 2;
      const qrSize = innerH * 0.8;

      // Convert 15pt and 25pt from PDF to PX for alignment
      const ptToPx = 96 / 72;
      const qrOffsetLeft = padding + 15 * ptToPx;
      const textOffsetLeft = padding + qrSize + 25 * ptToPx;

      return (
        <div
          style={{
            width: `${w}px`,
            height: `${h}px`,
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px", // Visual roundness for the "card"
          }}
        >
          {/* 1. Rounded Border (doc.roundedRect(..., 8)) */}
          <div
            style={{
              position: "absolute",
              top: `${padding}px`,
              left: `${padding}px`,
              width: `${innerW}px`,
              height: `${innerH}px`,
              border: "1.5px solid #333",
              borderRadius: "8px",
              pointerEvents: "none",
            }}
          />

          {/* 2. QR Code (doc.image(qrBuffer, padding + 15, (h - qrSize) / 2)) */}
          <div
            style={{
              position: "absolute",
              left: `${qrOffsetLeft}px`,
              top: `${(h - qrSize) / 2}px`,
            }}
          >
            <QRCodeSVG
              value={qrValue}
              size={qrSize}
              level="H"
              marginSize={0} // Important: PDF generation has 0 margin
            />
          </div>

          {/* 3. Neverlose Text (doc.text('Neverlose', ..., h * 0.35)) */}
          <div
            style={{
              position: "absolute",
              left: `${textOffsetLeft}px`,
              top: `${h * 0.35}px`,
              textAlign: "left",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "16pt", // Matching backend .fontSize(16)
                fontWeight: "bold",
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#000",
                lineHeight: 1,
              }}
            >
              Neverlose
            </h3>

            {/* 4. SCAN IF FOUND (doc.text('...', ..., h * 0.55)) */}
            <p
              style={{
                margin: 0,
                marginTop: "8px", // Visual spacing
                fontSize: "9pt", // Matching backend .fontSize(9)
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#666",
                lineHeight: 1,
              }}
            >
              SCAN IF FOUND
            </p>
          </div>
        </div>
      );
    }

    // 2. STYLE: AIRTAG (Circular)
    if (activePreset?.id === "airtag") {
      return (
        <div
          className="preview-card airtag-style d-flex flex-column align-items-center justify-content-center border border-dark rounded-circle bg-white shadow-sm"
          style={{ width: "130px", height: "130px" }}
        >
          <QRCodeSVG value={qrValue} size={100} level="H" />
          <h6 className="fw-bold mt-2 mb-0" style={{ fontSize: "9px" }}>
            SCAN IF FOUND
          </h6>
        </div>
      );
    }

    // 3. STYLE: SMALL TAG (Minimalist)
    if (activePreset?.id === "small-tag") {
      return (
        <div
          className="preview-card small-tag-style d-flex flex-column align-items-center justify-content-center border border-dark rounded-2 bg-white"
          style={{ width: "180px", height: "110px" }}
        >
          <QRCodeSVG value={qrValue} size={60} level="H" />
          <p className="fw-bold mt-2 mb-0" style={{ fontSize: "10px" }}>
            SCAN IF FOUND
          </p>
        </div>
      );
    }

    // 4. STYLE: POSTER / CUSTOM (Vertical Stack)
    return (
      <div
        className="preview-card poster-style d-flex flex-column align-items-center justify-content-center border border-dark p-4 bg-white"
        style={{ width: "250px", height: "350px" }}
      >
        <QRCodeSVG value={qrValue} size={160} level="H" />
        <p className="text-muted mt-4 mb-1" style={{ fontSize: "14px" }}>
          SCAN IF FOUND
        </p>
      </div>
    );
  };
  const getPreviewDimensions = (presetId) => {
    // 1. Handle Custom Case
    if (presetId === "custom") {
      return {
        w: Number(customWidth) * 10 || 50,
        h: Number(customHeight) * 10 || 50,
        shape: "rect",
      };
    }

    // 2. Find the preset in the array
    const p = defaultPresets.find((p) => p.id === presetId);

    // 3. Fallback if preset isn't found or is null
    if (!p) {
      return { w: 50, h: 50, shape: "rect" };
    }

    return {
      w: p.widthMm || p.diameterMm || 50,
      h: p.heightMm || p.diameterMm || 50,
      shape: p.shape || "rect",
    };
  };

  const downloadPreset = async (preset) => {
    try {
      let payload = { preset };

      // Custom requires width + height
      if (preset === "custom") {
        if (!customWidth || !customHeight) {
          setShowDimensionError(true);
          setTimeout(() => setShowDimensionError(false), 3000);
          return;
        }

        const w = Number(customWidth);
        const h = Number(customHeight);

        if (w <= 0 || w > 21 || h <= 0 || h > 21) {
          alert("Width and height must be between 1 and 21 cm.");
          return;
        }

        payload.widthMm = w * 10;
        payload.heightMm = h * 10;
      }

      const res = await labelApi.downloadPdf(propItem.id, payload);

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `label-${preset.id}.pdf`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download failed:", err);
      alert("Failed to download label.");
    }
  };

  const handlePrepareDownload = (preset) => {
    /* if (preset.id === "custom" && (!customWidth || !customHeight)) {
      alert("Please enter dimensions for your custom label.");
      return;
    }
    setSelectedPresetId(preset);
    setIsConfirmOpen(true); */
    downloadPreset(activePreset);
    setIsConfirmOpen(false);
  };
  const handlePreview = (preset) => {
    if (preset.id === "custom" && (!customWidth || !customHeight)) {
      setShowDimensionError(true);
      setTimeout(() => setShowDimensionError(false), 3000);

      return;
    }
    setActivePreset(preset);
    setIsPreviewOpen(true);
  };

  if (!embedded && error) {
    return <div className="alert alert-danger m-5">{error}</div>;
  }
  if (!item) {
    return <p className="p-6">Loading…</p>;
  }
  console.log("ITEM:", item);
  console.log("PRESETS:", item?.labelPresets);
  return (
    <div className={embedded ? "embedded-label-box" : "container py-4 py-md-5"}>
      <div className="nl-QRcontainer rounded-5 p-5 px-md-5 align-items-md-center border-0 ">
        {/* Header Logic */}
        {
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-0 mb-md-3 p-2 p-md-0">
            <div className="mb-3 mb-md-0">
              <h3
                className="fw-bold mb-2"
                style={{
                  color: "var(--nl-deep-blue)",
                  fontSize: "calc(1.3rem + 1vw)",
                }}
              >
                Download Your QR Code
              </h3>
              <p className="text-secondary mb-0" style={{ maxWidth: "500px" }}>
                Select a size below to preview and download your secure tag.
              </p>
            </div>

            <div className="d-none d-md-flex align-items-center gap-2 gap-xl-4">
              <img src={qrIcon} style={{ width: "clamp(40px, 5vw, 70px)" }} />
              <i className="bi bi-arrow-right opacity-50"></i>

              <img
                src={printIcon}
                style={{ width: "clamp(40px, 5vw, 70px)" }}
              />
              <i className="bi bi-arrow-right opacity-50"></i>

              <img src={tagIcon} style={{ width: "clamp(55px, 7vw, 90px)" }} />
            </div>
          </div>
        }

        {/*  GRID */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {item.labelPresets?.map((preset) => (
            <div key={preset.id} className="col">
              {/* Card */}
              <div
                onClick={() => {
                  handlePreview(preset);
                }}
                role="button"
                className="h-100 nl-preset-card shadow-sm d-flex flex-column align-items-center justify-content-center"
              >
                {/* Icons */}
                <div
                  className="my-3 d-flex align-items-center justify-content-center pb-3"
                  style={{ height: "30px" }}
                >
                  {preset.id === "wallet" && (
                    <WalletIcon className="qr-svg-icon" />
                  )}
                  {preset.id === "airtag" && (
                    <CircleIcon className="qr-svg-icon" />
                  )}
                  {preset.id === "small-tag" && (
                    <SquareIcon className="qr-svg-icon" />
                  )}
                </div>

                {/* Info Tag */}
                <div>
                  <h5
                    className="preset-name"
                    style={{ fontFamily: "var(--font-titles)" }}
                  >
                    {preset.name} Size
                  </h5>
                  <p className="preset-desc mb-0">
                    {preset.description || "Click to download"}
                  </p>
                </div>

                {/* Measurement input */}
                {preset.id === "custom" && (
                  <div
                    className="w-100 mt-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="d-flex flex-column gap-2">
                      {[
                        {
                          id: "customWidth",
                          label: "Width (cm)",
                          val: customWidth,
                          set: setCustomWidth,
                          iconClass: "bi-arrows-expand-vertical",
                          rotate: true,
                        },
                        {
                          id: "customHeight",
                          label: "Height (cm)",
                          val: customHeight,
                          set: setCustomHeight,
                          iconClass: "bi-arrows-expand-vertical",
                          rotate: false,
                        },
                      ].map((input) => (
                        <div
                          key={input.id}
                          className="input-group rounded-4 overflow-hidden border shadow-sm align-items-center px-2 "
                          style={{ backgroundColor: "white" }}
                        >
                          {/* Icon */}
                          <span className="input-group-text border-0 bg-transparent ">
                            <i
                              className={`bi ${input.iconClass}`}
                              style={{
                                transform: input.rotate
                                  ? "none"
                                  : "rotate(90deg)",
                                color: "var(--nl-tech-blue)",
                                backgroundColor: "transparent",
                                boxShadow: "none",
                                fontSize: "0.85rem",
                              }}
                            ></i>
                          </span>

                          {/* Floating Input */}
                          <div className="form-floating flex-grow-1 bg-transparent ">
                            <input
                              type="number"
                              min="1"
                              max="50"
                              className="form-control border-0 bg-transparent shadow-none-focus"
                              id={input.id}
                              placeholder={input.label}
                              style={{
                                height: "45px",
                                paddingTop: "1.2rem",
                                paddingBottom: "0.3rem",
                                fontSize: "0.9rem",
                                backgroundColor: "transparent",
                                boxShadow: "none",
                              }}
                              value={input.val}
                              onChange={(e) => {
                                const val = e.target.value;
                                const maxLength = 2;

                                if (val.length <= maxLength) {
                                  input.set(val);
                                }
                              }}
                              onKeyDown={(e) =>
                                ["e", "E", "+", "-"].includes(e.key) &&
                                e.preventDefault()
                              }
                            />
                            <label
                              htmlFor={input.id}
                              className="text-muted small"
                              style={{
                                padding: "0.6rem 0.55rem",
                                fontSize: "0.75rem",
                                backgroundColor: "transparent",
                              }}
                            >
                              {input.label}
                            </label>
                          </div>
                        </div>
                      ))}

                      {/* Error no dimensions */}
                      <div
                        className="text-center overflow-hidden"
                        style={{
                          maxHeight: showDimensionError ? "30px" : "0",
                          transition: "all 0.3s ease-in-out",
                          opacity: showDimensionError ? 1 : 0,
                        }}
                      >
                        <span
                          style={{
                            color: "white",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                          }}
                        >
                          <i className="bi bi-exclamation-circle me-1"></i>
                          Please enter dimensions first
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* URL label */}
        <div className="d-flex justify-content-center w-100 py-2">
          <CopyUrlLabel publicUrl={item.publicUrl} />
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        show={isPreviewOpen}
        onHide={() => setIsPreviewOpen(false)}
        centered
        contentClassName="nl-premium-modal-content"
        className="nl-premium-modal"
        backdropClassName="nl-premium-modal-backdrop"
        dialogClassName="animate__animated animate__zoomIn"
        style={{
          backdropFilter: "blur(9px)",
          backgroundColor: "rgba(9, 32, 121, 0.6)",
        }}
        contentStyle={{ borderRadius: "32px", overflow: "hidden" }}
      >
        <div
          style={{
            backgroundColor: "var(--nl-white)",
            borderRadius: "32px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div className="pt-4 px-4 d-flex justify-content-between align-items-center">
            <h5
              className="fw-bold m-0 nl-title-navy"
              style={{ fontFamily: "var(--font-titles)" }}
            >
              QR Code Preview
            </h5>
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="btn-close shadow-none"
            ></button>
          </div>

          <Modal.Body className="d-flex flex-column align-items-center py-4 px-4">
            <div className="p-3 mb-4">
              <LabelPreviewContent activePreset={activePreset} item={item} />
            </div>

            <p className="text-muted text-center small mb-0 px-3">
              Please ensure the QR code is clearly visible and legible before
              proceeding to print.
            </p>
          </Modal.Body>

          <div className="px-4 pb-4 mt-2">
            <CustomButton
              variant="primary"
              className="w-100 py-3 fw-bold shadow-sm"
              style={{ borderRadius: "16px" }}
              onClick={() => {
                setIsPreviewOpen(false);
                handlePrepareDownload(activePreset);
              }}
            >
              Confirm & Download
            </CustomButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
