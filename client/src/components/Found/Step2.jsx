import { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";

function Step2Verification({
  reportData,
  setReportData,
  onSubmit,
  onBack,
  isLoading,
}) {
  const [errors, setErrors] = useState({});

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // characters counter for message validation
  const isMessageDirty = reportData.message.length > 0;
  const isMessageTooShort =
    isMessageDirty && reportData.message.trim().length < 10;
  const isMessageTooLong = reportData.message.length > 500;
  // overall validation rules
  const isEmailValid =
    reportData.finder.email && isValidEmail(reportData.finder.email);
  const isMessageValid =
    reportData.message.trim().length >= 10 && reportData.message.length <= 500;

  const isFormValid = isEmailValid && isMessageValid;
  // Update top-level fields
  const update = (field, value) =>
    setReportData((prev) => ({ ...prev, [field]: value }));
  // Update nester finder fields
  const updateFinder = (field, value) =>
    setReportData((prev) => ({
      ...prev,
      finder: { ...prev.finder, [field]: value },
    }));
  // Validate form before submission
  const validate = () => {
    let newErrors = {};

    if (!reportData.finder.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(reportData.finder.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!reportData.message) {
      newErrors.message = "Message is required";
    } else if (reportData.message.length < 10) {
      newErrors.message = "Message is too short (min 10 chars)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Handle form submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <div className="container py-4 px-4" style={{ maxWidth: "700px" }}>
      {/* Header Section */}

      <div className="text-center mb-5">
        <h1 className="fw-bold mb-2 text-dark">Reach out to the owner</h1>
        <p className="text-muted fs-5">
          Share where the item is or how they can get it back.
        </p>
      </div>

      <div className="px-md-4">
        <label
          className="d-block fw-bold small text-uppercase mb-4"
          style={{ color: "var(--nl-tech-blue)", letterSpacing: "1px" }}
        >
          Contact Information
        </label>

        <div className="vstack gap-4">
          {/* Email Row */}
          <div className="row align-items-center">
            <div className="col-md-4">
              <label className="fw-bold text-dark">
                <span className="text-danger me-1">*</span>Your Email:
              </label>
            </div>
            <div className="col-md-8">
              <input
                type="email"
                maxLength={50}
                className={"form-control"}
                placeholder="Enter your email"
                value={reportData.finder.email}
                onChange={(e) => updateFinder("email", e.target.value)}
              />
              {reportData.finder.email &&
                !isValidEmail(reportData.finder.email) && (
                  <div className="nl-animated-fade">
                    <small className="text-danger mt-2 d-block ms-2 fw-medium">
                      <i className="bi bi-exclamation-circle me-1"></i>Please
                      enter a valid email address
                    </small>
                  </div>
                )}
            </div>
          </div>

          {/* Message */}
          <div className="row align-items-start">
            <div className="col-md-4 pt-2">
              <label className="fw-bold text-dark">
                <span className="text-danger me-1">*</span>Message:
              </label>
            </div>
            <div className="col-md-8">
              <textarea
                className="form-control"
                placeholder="Ex: I left it with the security guard at..."
                rows={4}
                maxLength={500}
                value={reportData.message}
                onChange={(e) => update("message", e.target.value)}
                style={{ resize: "none" }}
              />

              {isMessageTooShort && (
                <div className="nl-animated-fade position-relative mt-1 pt-1 d-flex justify-content-between px-2">
                  <small
                    className="text-danger mt-1 ms-2 fw-medium"
                    style={{ maxWidth: "75%" }}
                  >
                    <i className="bi bi-exclamation-circle me-1"></i>Please
                    write a bit more to help the owner (min. 10 characters)
                  </small>
                  <small
                    className={`fw-medium ${isMessageTooLong ? "text-danger" : "text-muted"}`}
                    style={{ fontSize: "0.75rem" }}
                  >
                    {reportData.message.length} / 500
                  </small>
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="row align-items-center">
            <div className="col-md-4">
              <label className="fw-medium text-secondary small">
                Found at (Optional):
              </label>
            </div>
            <div className="col-md-8">
              <input
                type="text"
                maxLength={50}
                className="form-control"
                placeholder="Central Park, near the fountain..."
                value={reportData.foundLocationText}
                onChange={(e) => update("foundLocationText", e.target.value)}
              />
            </div>
          </div>

          {/* Optional Info */}
          <div className="row align-items-center">
            <div className="col-md-4">
              <label className="fw-medium text-secondary small">
                Name and phone (Optional)
              </label>
            </div>
            <div className="col-md-8">
              <div className="row g-2">
                <div className="col-6">
                  <input
                    type="text"
                    maxLength={50}
                    className="form-control"
                    placeholder="Name"
                    value={reportData.finder.name || ""}
                    onChange={(e) => updateFinder("name", e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone number"
                    value={reportData.finder.phone || ""}
                    onChange={(e) => updateFinder("phone", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-between my-5">
          <CustomButton variant="outline" onClick={onBack}>
            Back
          </CustomButton>
          <CustomButton
            onClick={handleSubmit}
            variant="primary"
            disabled={!isFormValid || isLoading}
            isLoading={isLoading}
          >
            Send Notification to Owner
          </CustomButton>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-muted small mt-4 px-4">
          We'll keep your data secure. The owner will be notified immediately.
        </p>
      </div>
    </div>
  );
}
export default Step2Verification;
