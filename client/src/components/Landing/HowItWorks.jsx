import React from "react";
import "./Landing.css";
import step1Img from "../../assets/Landing/hiw-step1.webp";
import step2Img from "../../assets/Landing/hiw-step2.webp";
import step3Img from "../../assets/Landing/hiw-step3.webp";
import NPatternBg from "../../assets/NPatternBG.webp";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Activate & Encrypt",
      desc: "Create a secure profile for your item. Your email and identity are locked in our private vault.",
      icon: "bi-shield-lock",
      color: "var(--nl-info)",
      img: step1Img,
    },
    {
      id: "02",
      title: "Print & Protect",
      desc: "Print your custom QR tag and apply it to your gear. One tag, total anonymity, forever protected.",
      icon: "bi-printer",
      color: "var(--nl-warning)",
      img: step2Img,
    },
    {
      id: "03",
      title: "Private Recovery",
      desc: "Receive instant alerts with the finder’s info, while your contact details remain 100% invisible.",
      icon: "bi-person-check",
      color: "var(--nl-success)",
      img: step3Img,
    },
  ];

  return (
    <div
      id="how-it-works"
      className="position-relative overflow-hidden"
      style={{ backgroundColor: "var(--nl-soft-gray)" }}
    >
      <div
        className="background-pattern"
        style={{
          backgroundImage: `url(${NPatternBg})`,
          zIndex: 1,
        }}
      />

      <section
        className="container py-4 py-md-5 px-4 px-md-0 position-relative"
        style={{ zIndex: 2 }}
      >
        <div className="text-center my-5">
          <h6
            className="text-uppercase fw-bold ls-widest"
            style={{ color: "var(--nl-tech-blue)" }}
          >
            How It Works
          </h6>
          <h2
            className="display-6 fw-bold"
            style={{ color: "var(--nl-deep-blue)" }}
          >
            Simple for you. Secure for your data.
          </h2>
          <p
            className="lead text-muted mx-auto mt-3"
            style={{ maxWidth: "700px" }}
          >
            Your privacy is our priority. In just three simple steps, you can
            secure your belongings using our anonymous recovery technology.
          </p>
        </div>

        <div className="row g-4 justify-content-center my-5">
          {steps.map((step) => (
            <div key={step.id} className="col-12 col-md-4">
              <div className="step-card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                {/* image */}
                <div className="step-image-container">
                  <img src={step.img} alt={step.title} className="step-img" />
                </div>

                <div className="p-4 d-flex align-items-start gap-3">
                  {/* left side - icon */}
                  <div
                    className="icon-circle-small d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      backgroundColor: "var(--nl-deep-blue)",
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    <i
                      className={`bi ${step.icon} fs-4`}
                      style={{ color: step.color }}
                    ></i>
                  </div>

                  {/* right side */}
                  <div className="text-start">
                    <h5
                      className="fw-bold mb-1"
                      style={{ color: "var(--nl-deep-blue)" }}
                    >
                      {step.title}
                    </h5>
                    <p
                      className="small text-muted mb-0"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div
        className="py-2 w-100 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "var(--nl-info)",
          color: "var(--nl-deep-blue)",
          fontWeight: "500",
          zIndex: "3",
        }}
      >
        <span className="text-center py-1 px-3">
          Neverlose uses industry-standard encryption for 100% anonymity.
        </span>
      </div>
    </div>
  );
};

export default HowItWorks;
