import React from "react";
import "./Landing.css";
import passportTag from "../../assets/Landing/nl-tag-passport.webp";
import walletTag from "../../assets/Landing/nl-tag-wallet.webp";
import bikeTag from "../../assets/Landing/nl-tag-bike.webp";
import cameraTag from "../../assets/Landing/nl-tag-camera.webp";
import dronTag from "../../assets/Landing/nl-tag-dron.webp";
import collarTag from "../../assets/Landing/nl-tag-dogcollar.webp";

const Features = () => {
  return (
    <div id="features" className="bg-white py-5">
      <section className="container py-4 py-md-5 px-4 px-md-0 mb-md-4">
        <div className="text-center mb-5 py-2">
          <h6
            className="text-uppercase fw-bold ls-2 ls-widest"
            style={{ color: "var(--nl-warning)" }}
          >
            Features
          </h6>
          <h2
            className="display-6 fw-bold"
            style={{ color: "var(--nl-deep-blue)" }}
          >
            One tag for every lifestyle
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "800px" }}>
            Designed to ensure your most valued belongings always find their way
            back to you. From daily essentials to adventurous gear, Neverlose
            provides that vital extra chance for a <strong>safe return</strong>.
          </p>
        </div>

        <div className="features-bento-grid">
          {/* Card 1 */}
          <div
            className="feature-card f-tall"
            style={{
              backgroundImage: `url(${passportTag})`,
              border: "3px solid var(--nl-danger)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
            }}
          ></div>

          {/* Card 2 */}
          <div
            className="feature-card f-blue d-flex flex-column justify-content-center p-4"
            style={{
              border: "3px solid var(--nl-success)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
            }}
          >
            <h4 className="fw-bold" style={{ color: "var(--nl-success)" }}>
              Your ID, hidden.
            </h4>
            <p className="small mb-0" style={{ color: "white" }}>
              Get found without giving away your phone or address.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="feature-card f-wide"
            style={{
              backgroundImage: `url(${walletTag})`,
              border: "3px solid var(--nl-warning)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
            }}
          ></div>

          {/* Card 4 */}
          <div
            className="feature-card f-small"
            style={{
              backgroundImage: `url(${bikeTag})`,
              border: "3px solid var(--nl-success)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
            }}
          ></div>

          {/* Card 5 */}
          <div
            className="feature-card f-small"
            style={{
              backgroundImage: `url(${cameraTag})`,
              border: "3px solid var(--nl-danger)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
            }}
          ></div>

          {/* Card 6 */}
          <div
            className="feature-card f-tall"
            style={{
              backgroundImage: `url(${collarTag})`,
              border: "3px solid var(--nl-success)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
            }}
          ></div>

          {/* Card 7 */}
          <div
            className="feature-card f-dynamic-7"
            style={{
              backgroundImage: `url(${dronTag})`,
              border: "3px solid var(--nl-info)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
            }}
          ></div>

          {/* Card 8 */}
          <div
            className="feature-card f-blue d-flex flex-column justify-content-center p-4"
            style={{
              border: "3px solid var(--nl-warning)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
            }}
          >
            <h4 className="fw-bold" style={{ color: "var(--nl-warning)" }}>
              One-Way Privacy.
            </h4>
            <p className="small mb-0" style={{ color: "white" }}>
              You get the alerts. They never see your email.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
