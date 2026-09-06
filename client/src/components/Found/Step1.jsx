import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import UploadPhoto from "../uploadPhoto/UploadPhoto";

export default function Step1ItemPreview({
  item,
  onNext,
  answer,
  photoUrl,
  seturl,
  setAnswer,
}) {
  // Check if item has a verification question
  const hasQuestion =
    item?.verificationQuestion && item.verificationQuestion.trim() !== "";
  // Validate answer only when question exists
  const isAnswerValid = hasQuestion ? answer.trim().length > 0 : true;
  return (
    <div className="container py-5 px-4" style={{ maxWidth: "700px" }}>
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-2 text-dark">Help the owner recognize it</h1>
        <p className="text-muted fs-5">
          {hasQuestion
            ? "Help us verify it by answering this quick question from the owner."
            : "The owner will be thrilled! A photo of the item helps confirm its status."}
        </p>
      </div>

      <div className="px-md-4">
        {/* Show question and answer section only if question exists */}
        {hasQuestion && (
          <>
            <div className="question-section nl-animated-fade">
              {/* Owner's question  */}
              <label
                className="d-block fw-bold small text-uppercase mb-4"
                style={{ color: "var(--nl-tech-blue)", letterSpacing: "1px" }}
              >
                Owner's Question
              </label>
              <h5 className="fw-bold text-dark mb-4">
                {/* <span className="text-danger me-1">*</span> */}
                {item.verificationQuestion}
              </h5>
            </div>
            {/* Answer input  */}
            <div className="answer-section mb-4">
              <label className="form-label fw-bold small text-muted  mb-2">
                <span className="text-danger me-1">*</span>Your Answer:
              </label>
              <textarea
                className="form-control"
                rows="4"
                style={{ resize: "none" }}
                placeholder="Provide a brief detail (e.g., color, stickers, unique marks)..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                maxLength={200}
              />
              {/* Validation message and character count  */}
              {!isAnswerValid && (
                <div className="nl-animated-fade d-flex justify-content-between align-items-center mt-1 px-2">
                  <small
                    className="text-danger fw-medium"
                    style={{ maxWidth: "75%" }}
                  >
                    <i className="bi bi-exclamation-circle me-1"></i>Please
                    provide a brief answer to help the owner
                  </small>

                  <p className="text-muted small mb-0">
                    {answer?.length || 0}/200
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        <div className="photo-section pb-4">
          <label className="form-label fw-bold small text-muted mb-2">
            Evidence Photo (Optional)
          </label>

          <UploadPhoto photoUrl={photoUrl} onUploaded={(data) => seturl(data.data.photoUrl)} />
        </div>

        {/* CTA */}
        <div className="pt-3 text-end">
          {/* Handle inactive item case */}
          {item.status === "CLOSED" ? (
            <div className="alert alert-danger rounded-pill text-center fw-bold">
              This tag is inactive.
            </div>
          ) : (
            <div className="d-flex justify-content-between my-5">
              {/* Next button (disabled if answer invalid)  */}
              <CustomButton variant="outline">Back</CustomButton>
              <CustomButton
                variant="primary"
                className="px-5 py-2"
                onClick={onNext}
                disabled={!isAnswerValid}
              >
                Next
              </CustomButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
