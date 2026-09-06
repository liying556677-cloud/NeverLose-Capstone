import React from "react";
import "./Landing.css";
import foundImage from "../../assets/Landing/nl-finder-scanning.webp";

const FoundItem = () => {
  const points = [
    {
      title: "Scan the Tag",
      desc: "Use your smartphone camera to scan the QR code.",
    },
    {
      title: "Notify the Owner",
      desc: "Answer a quick security question set by the owner and tell them where the item is safe.",
    },
    {
      title: "Coordinate the Return",
      desc: "Send an anonymous message to the owner. You decide how and when to connect, keeping your privacy 100% protected.",
    },
  ];

  return (
    <section
      id="found-an-item"
      className="found-section py-4 py-md-5 px-4 px-md-0"
      style={{ backgroundColor: "rgba(189, 226, 231, 0.45)" }}
    >
      <div className="container py-2 my-3">
        <div className="row d-flex flex-column flex-lg-row align-items-center">
          {/* Left side */}
          <div className="col-12 col-lg-6 order-1 order-lg-2  text-lg-start pt-5 pt-md-0">
            <h2
              className="display-5 fw-bold mb-4"
              style={{
                color: "var(--nl-tech-blue)",
                textShadow: "0 10px 20px rgba(0,0,0,0.1)",
              }}
            >
              <span style={{ color: "var(--nl-dark-navy)" }}>
                Did you find something
              </span>{" "}
              with a Neverlose tag?
            </h2>
            <p className="lead mb-5 " style={{ color: "var(--nl-dark-navy)" }}>
              Your kindness is the key to a happy reunion. If you’ve found an
              item with one of our tags, you’re just one scan away from making
              someone’s day.
              <span className="fw-semibold">
                {" "}
                No apps, no accounts, just pure honesty.
              </span>
            </p>

            <div className="steps-list">
              {points.map((point, index) => (
                <div key={index} className="d-flex align-items-start mb-4">
                  <div className="check-icon-wrapper me-3">
                    <div
                      className="d-flex align-items-center justify-content-center shadow-sm"
                      style={{
                        backgroundColor: "white",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    >
                      <i
                        className="bi bi-check fs-4"
                        style={{ color: "var(--nl-tech-blue)" }}
                      ></i>
                    </div>
                  </div>

                  <div>
                    <h5
                      className="fw-bold mb-1"
                      style={{ color: "var(--nl-tech-blue)" }}
                    >
                      {point.title}
                    </h5>
                    <p className="text-muted mb-0">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="col-12 col-lg-6 order-1 order-lg-1 position-relative image-column-wrapper d-flex justify-content-center align-items-center p-5 p-md-0">
            <div className="main-image-container">
              <img
                src={foundImage}
                alt="Scanning a Neverlose tag"
                className="img-fluid main-found-img shadow-lg"
                style={{
                  borderRadius: "30px",
                  maxHeight: "700px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="floating-icon-card icon-top-right shadow-lg">
              <i className="bi bi-shield-lock-fill"></i>
            </div>

            <div className="floating-icon-card icon-bottom-left shadow-lg">
              <i className="bi bi-qr-code-scan"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundItem;
