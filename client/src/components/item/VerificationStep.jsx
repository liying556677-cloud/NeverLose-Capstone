import React from "react";
import VerificationImage from "../../assets/VerificationImage.svg";
import CustomButton from "../CustomButton/CustomButton";
import "./ItemForm.css";
import { useNavigate } from "react-router-dom";

function VerificationStep({ form, setForm, next, back }) {
  const navigate = useNavigate(); //used for navigation
  // Toggle verification on/off
  const toggle = () =>
    setForm({
      ...form,
      verification: {
        ...form.verification,
        enabled: !form.verification.enabled,
      },
    });
  // Step tracking
  const totalSteps = 3;
  const currentStep = 2;
  // Disable button if verification is enabled but question is empty
  const isButtonDisabled =
    form.verification.enabled &&
    (!form.verification.question || form.verification.question.trim() === "");

  return (
    <div className="item-form-content">
      {/* Header with title, back navigation */}
      <div className="d-flex flex-column align-items-start mb-0 mb-md-3 p-2 p-md-0">
        <h3 className="text-white fw-bold mb-2">Set a Security Layer</h3>

        <button
          className="btn btn-link text-white text-decoration-none p-0 pb-1 pb-md-0 opacity-hover"
          onClick={currentStep === 1 ? () => navigate(-1) : back}
          style={{ transition: "opacity 0.2s" }}
        >
          <i className="bi bi-chevron-left"></i>
          <span className="ms-1">Back</span>
        </button>
      </div>
      {/* Main container  */}
      <div className="d-flex align-items-center justify-content-center px-5 bg-white rounded-4 shadow-sm w-100">
        <div style={{ maxWidth: "900px" }} className="w-100">
          <p
            className="text-center text-muted m-5 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            Ask a question that only someone holding the item can answer.
          </p>

          <div className="pb-4">
            <div className="row align-items-center gx-lg-5">
              {/* left side */}
              <div className="col-12 col-md-6 d-flex justify-content-center">
                <div
                  className="rounded-4 border overflow-hidden bg-light d-flex align-items-center justify-content-center mx-auto"
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                  }}
                >
                  {form.photoUrl ? (
                    <img
                      src={form.photoUrl}
                      alt="Item"
                      className="w-100 h-100 object-fit-cover"
                    />
                  ) : (
                    <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                      No image uploaded
                    </div>
                  )}
                </div>
              </div>

              {/* right side */}
              <div className="col-md-6 order-2 order-md-2">
                <div className="form-check form-switch mb-4 pt-3 pt-md-0">
                  <input
                    type="checkbox"
                    className="form-check-input shadow-none "
                    checked={form.verification.enabled}
                    onChange={toggle}
                    id="enableVerification"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="enableVerification"
                  >
                    Enable Verification Question
                  </label>
                </div>
                {/* Show textarea only if verification is enabled  */}
                {form.verification.enabled && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <span className="text-danger me-1">*</span>Your Security
                      Question:
                    </label>

                    <textarea
                      style={{
                        zIndex: 2,
                        position: "relative",
                        backgroundColor: "var(--nl-light-bg)",
                      }}
                      className="form-control"
                      maxLength={200}
                      rows="4"
                      value={form.verification.question}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          verification: {
                            ...form.verification,
                            question: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g., What color is the inside pocket or is there any specific brand on the zipper?"
                    />
                    <div
                      className="nl-animated-fade position-relative mt-1 pt-1 d-flex justify-content-between px-2"
                      style={{
                        zIndex: 1,
                      }}
                    >
                      <p
                        className="text-muted small mb-0"
                        style={{ maxWidth: "75%" }}
                      >
                        The finder will see this question to prove they have the
                        item.
                      </p>
                      <p className="text-end small fw-medium mb-0">
                        {form.verification.question?.length || 0}/200
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons Bar */}
            <div className="order-3 text-end pb-2">
              <CustomButton
                variant="primary"
                onClick={next}
                disabled={isButtonDisabled}
              >
                Review & Create
              </CustomButton>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pb-2 my-3 mx-auto" style={{ maxWidth: "450px" }}>
            <div className="progress rounded-pill" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: "66%", transition: "width 0.4s ease" }}
              ></div>
            </div>
            {/*  */}
            <p className="mt-2 text-center small text-muted fw-medium">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VerificationStep;
