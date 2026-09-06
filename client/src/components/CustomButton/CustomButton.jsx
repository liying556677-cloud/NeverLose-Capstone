import React from "react";
import { Button } from "react-bootstrap";
import "./CustomButton.css";

const CustomButton = ({
  children,
  text,
  type = "button",
  variant = "primary",
  isLoading = false,
  disabled = false,
  onClick,
  className = "",
  ...props
}) => {
  // Map custom variants to CSS classes (keeps styling consistent across app)
  const getVariantClass = () => {
    if (variant === "primary") return "btn-blue";
    if (variant === "secondary") return "btn-red";
    if (variant === "outline") return "btn-outline-blue";
    return "btn-blue"; // default fallback
  };

  return (
    <Button
      type={type}
      className={`custom-btn ${getVariantClass()} ${className}`}
      //disable button when loading or explicitly disabled
      disabled={isLoading || disabled}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        //Show spinner + text when action is in progress
        <div className="d-flex align-items-center">
          <span
            className="spinner-border spinner-border-sm me-2"
            style={{ width: "1rem", height: "1rem" }}
            role="status"
          ></span>
          <span>Sending...</span>
        </div>
      ) : (
        text || children
      )}
    </Button>
  );
};

export default CustomButton;
