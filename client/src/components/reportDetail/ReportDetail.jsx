import React from "react";
import "./ReportDetail.css";
import { Row, Col, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";

const statusConfig = {
  NEW: { color: "var(--nl-info)", label: "New" },
  CONTACTED: { color: "var(--nl-warning)", label: "Contacted" },
  RESOLVED: { color: "var(--nl-success)", label: "Recovered" },
  SPAM: { color: "var(--nl-danger)", label: "Spam" },
};

const ReportDetail = ({ report, onUpdateStatus }) => {
  const currentStatus = report.reportStatus || "NEW";
  console.log("Estado actual:", currentStatus);
  console.log("Color a aplicar:", statusConfig[currentStatus]?.color);

  const badgeStyle = statusConfig[currentStatus] || statusConfig.NEW;

  const renderTooltip = (text) => (
    <Tooltip id="button-tooltip" className="custom-tooltip">
      {text}
    </Tooltip>
  );

  // Helper to determine button states based on sequential workflow
  const getButtonProps = (type) => {
    const isNew = currentStatus === "NEW";
    const isContacted = currentStatus === "CONTACTED";
    const isFinal = ["RESOLVED", "SPAM"].includes(currentStatus);

    let isDisabled = true;
    let className = "btn manage-btn w-100 fw-bold ";

    const colors = {
      CONTACTED: "var(--nl-warning)", // #ffb56b
      RESOLVED: "var(--nl-success)", // #95fea1
      SPAM: "var(--nl-danger)", // #ea8a8a
    };

    const color = colors[type];

    // Workflow logic
    if (type === "CONTACTED") {
      isDisabled = !isNew || isFinal;
    } else if (type === "RESOLVED" || type === "SPAM") {
      isDisabled = !isContacted || isFinal;
    }

    if (currentStatus === type) {
      className += "active-status ";
    }

    if (isDisabled && currentStatus !== type) {
      className += "disabled-fade ";
    }

    return {
      disabled: isDisabled,
      className: className.trim(),
      style: {
        color: color,
        border: `1px solid ${isDisabled ? "transparent" : color}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    };
  };

  return (
    <div className="bg-white rounded-4 overflow-hidden shadow-sm p-4 mt-0 mt-md-3 border report-card">
      <div className="mb-1">
        <span
          className="status-pill"
          style={{
            backgroundColor: badgeStyle.color,
            color: "var(--nl-dark-navy)",
          }}
        >
          {badgeStyle.label}
        </span>

        <span className="text-muted small italic">
          {" "}
          Last Activity:{" "}
          {new Date(report.createdAt).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div
        className="status-divider"
        style={{
          backgroundColor: badgeStyle.color,
          height: "2px",
          borderRadius: "2px",
          transition: "background-color 0.4s ease",
          marginBottom: "1.5rem",
        }}
      />

      <Row>
        {/* Left Side: Context and Contact */}
        <Col md={8} className="border-end pe-md-4">
          <section className="mb-4 pb-3 border-bottom">
            <h6 className="text-uppercase text-muted fw-bold small mb-3 ls-wide">
              Discovery Details
            </h6>
            <div className="mb-3 d-flex align-items-baseline">
              <span className="fw-bold me-2 min-w-150">Found Location:</span>
              <span className="small">{report.foundLocationText || "N/A"}</span>
            </div>
            <div className="mb-3 d-flex align-items-baseline">
              <span className="fw-bold me-2 min-w-150">Security Match:</span>
              <span className="text-primary">
                {report.verificationAnswer || "N/A"}
              </span>
            </div>
            <div className="mb-3 d-flex align-items-baseline">
              <span className="fw-bold me-2 min-w-150">Message:</span>
              <span className="text-secondary italic">
                {report.message || "N/A"}
              </span>
            </div>
            <div className="mb-2 d-flex align-items-center">
              <span className="fw-bold me-2 min-w-150">Photo evidence:</span>
              {report.photoUrl ? (
                /* Link exists only if URL is present */
                <a
                  href={report.photoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <div className="evidence-icon-box me-2">
                    <i className="bi bi-image"></i>
                  </div>
                </a>
              ) : (
                /* Static box if no URL */
                <div className="evidence-icon-box me-2 opacity-25">
                  <i className="bi bi-image"></i>
                </div>
              )}
              <span className="text-secondary small">
                {report.photoUrl
                  ? "Click to view evidence"
                  : "No photo uploaded"}
              </span>
              {/*  <span className="text-secondary small">{report.photoUrl || "N/A"}</span> */}
            </div>
          </section>

          <section>
            <h6 className="text-uppercase text-muted fw-bold small mb-3 ls-wide">
              Finder Contact
            </h6>
            <div className="mb-2 d-flex">
              <span className="fw-bold me-2 min-w-150">Email Address:</span>
              <span>{report.finder?.email || "N/A"} </span>
            </div>
            <div className="mb-2 d-flex">
              <span className="fw-bold me-2 min-w-150">Finder Name:</span>
              <span className="small">{report.finder?.name || "N/A"}</span>
            </div>
            <div className="mb-2 d-flex">
              <span className="fw-bold me-2 min-w-150">Phone Number:</span>
              <span className="small">{report.finder?.phone || "N/A"}</span>
            </div>
          </section>
        </Col>

        {/* Right Side: Manage Report */}
        <Col md={4} className="px-md-4 pt-5 pt-md-0">
          <h6 className="text-uppercase text-muted fw-bold small mb-2">
            Recovery Progress
          </h6>
          <p className="extra-small text-muted mb-4">
            Follow the steps to recover your item.
          </p>

          <div className="d-flex flex-column gap-1">
            {/* Contacted */}
            <div className="action-wrapper">
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip(
                  "Step 1: Confirm you contacted the finder.",
                )}
              >
                <span className="d-block">
                  <button
                    {...getButtonProps("CONTACTED")}
                    onClick={() =>
                      onUpdateStatus(report.id, report.itemId, "CONTACTED")
                    }
                  >
                    Contacted
                  </button>
                </span>
              </OverlayTrigger>
              <p className="extra-small text-muted mt-2 px-1">
                <strong>Step 1:</strong> Confirmed! You've started the
                conversation with the finder to coordinate the return.
              </p>
            </div>

            {/* Item Recovered */}
            <div className="action-wrapper">
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip("Step 2: Close case once item is back.")}
              >
                <span className="d-block">
                  <button
                    {...getButtonProps("RESOLVED")}
                    onClick={() =>
                      onUpdateStatus(report.id, report.itemId, "RESOLVED")
                    }
                  >
                    Item Recovered
                  </button>
                </span>
              </OverlayTrigger>
              <p className="extra-small text-muted mt-2 px-1">
                <strong>Step 2:</strong> The best part! Mark this once your item
                is safely back in your hands.
              </p>
            </div>

            {/* Spam */}
            <div className="action-wrapper">
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip("Alternative: Mark as fake/spam.")}
              >
                <span className="d-block">
                  <button
                    {...getButtonProps("SPAM")}
                    onClick={() =>
                      onUpdateStatus(report.id, report.itemId, "SPAM")
                    }
                  >
                    Spam
                  </button>
                </span>
              </OverlayTrigger>
              <p className="extra-small text-muted mt-2 px-1">
                Not yours? Archive this report if the details or photo don't
                match your item.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ReportDetail;
