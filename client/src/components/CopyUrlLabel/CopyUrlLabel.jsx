import React, { useState } from "react";

const CopyPill = ({ publicUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy error", err);
    }
  };

  return (
    <div className="d-flex justify-content-center w-100 mt-4">
      <div
        onClick={handleCopy}
        className="d-flex align-items-center px-4 py-2 shadow-sm"
        style={{
          backgroundColor: copied
            ? "rgba(149, 254, 161, 0.15)"
            : "rgba(189, 226, 231, 0.35)",
          border: `1px solid ${copied ? "var(--nl-success)" : "rgba(0, 209, 255, 0.2)"}`,
          borderRadius: "50px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          userSelect: "none",
        }}
      >
        {/* Icon */}
        <i
          className={`bi ${copied ? "bi-check-lg text-success" : "bi-copy"} me-2`}
          style={{ color: copied ? "" : "var(--nl-tech-blue)" }}
        ></i>

        {/* Text */}
        <span
          style={{
            fontSize: "0.9rem",
            fontWeight: "600",
            color: copied ? "var(--nl-dark-navy)" : "inherit",
          }}
        >
          {copied ? (
            <span className="animate__animated animate__fadeIn">
              URL Copied!
            </span>
          ) : (
            <>
              <span
                className="text-uppercase opacity-75"
                style={{ fontSize: "0.8rem", color: "var(--nl-tech-blue)" }}
              >
                public scan URL
              </span>
              <span className="ms-2 font-monospace text-muted d-none d-md-inline">
                {publicUrl}
              </span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default CopyPill;
