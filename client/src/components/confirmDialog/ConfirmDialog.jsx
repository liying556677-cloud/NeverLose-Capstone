import React from "react";
import CustomButton from "../CustomButton/CustomButton";
//Different dialog types (controls icon, color, and button style)
const DIALOG_VARIANTS = {
  success: {
    icon: "bi-check-circle",
    color: "var(--nl-success)",
    btnClass: "btn-primary",
  },
  delete: {
    icon: "bi-trash",
    color: "var(--nl-danger)",
    btnClass: "btn-danger",
  },
  warning: {
    icon: "bi-exclamation-triangle",
    color: "var(--nl-warning)",
    btnClass: "btn-warning",
  },
  print: {
    icon: "bi-printer",
    color: "var(--nl-info)",
    btnClass: "btn-primary",
  },
};

export default function ConfirmDialog({
  open,
  message,
  onConfirm,
  onCancel,
  title,
  variant = "warning",
}) {
  if (!open) return null; //If dialog is not open, render nothing (prevents unnecessary UI)
  //Pick the correct variant config (fallback to warning if invalid)
  const config = DIALOG_VARIANTS[variant] || DIALOG_VARIANTS.warning;

  return (
    //Full screen overlay with blur background
    <div
      className="fixed-top w-100 h-100 d-flex align-items-center justify-content-center px-3"
      style={{
        backgroundColor: "rgba(9, 32, 121, 0.6)",
        backdropFilter: "blur(9px)",
        zIndex: 9999,
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {/* // Dialog box container */}
      <div
        className="bg-white px-4 py-5 shadow-lg border-0 text-center animate__animated animate__fadeInUp"
        style={{
          maxWidth: "340px",
          width: "100%",
          borderRadius: "28px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
        }}
      >
        {/* Icon section (dynamic based on variant)  */}
        <div className="mb-3">
          <div className="d-flex justify-content-center mb-4 animate__animated animate__backInDown ">
            <div
              className="nl-icon-box"
              style={{
                width: "64px",
                height: "64px",
              }}
            >
              <i
                className={`bi ${config.icon}`}
                style={{
                  color: config.color,
                  fontSize: "32px",
                }}
              ></i>
            </div>
          </div>
        </div>
        {/* Title  */}
        <h4
          className="fw-bold mb-2"
          style={{ color: "#092079", fontSize: "1.25rem" }}
        >
          {title}
        </h4>
        {/* Message content  */}
        <p className="text-muted mb-4 small px-1" style={{ lineHeight: "1.4" }}>
          {message}
        </p>
        {/* Action buttons */}
        <div className="vstack gap-2 px-2">
          {/* Confirm action */}
          <CustomButton
            onClick={onConfirm}
            className="btn btn-primary rounded-pill py-2 fw-bold w-100 border-0 shadow-sm"
            variant="primary"
          >
            Confirm
          </CustomButton>
          {/* Cancel action */}
          <CustomButton
            onClick={onCancel}
            className="btn btn-link text-muted text-decoration-none fw-bold w-100 py-1 small"
            variant="outline"
          >
            Cancel
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
