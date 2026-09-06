import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

const MissionCTA = () => {
  const navigate = useNavigate();
  return (
    <section id="mission-cta" className="mission-cta-container">
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-end text-end">
          <div className="col-12 col-md-7 col-lg-6 mission-content">
            <h2 className="display-5 fw-bold mb-3" style={{ color: "white" }}>
              More than just a tag. <br />
              <span style={{ color: "var(--nl-danger)" }}>
                A community of honesty.
              </span>
            </h2>
            <p className="lead  mb-5" style={{ color: "white" }}>
              Built to protect your most valued belongings. We encrypt every
              code, so you only share your gratitude, never your identity.
              <span className="fw-medium">
                Welcome to a smarter way to stay safe.
              </span>
            </p>
            <div className="d-flex justify-content-end">
              <CustomButton
                variant="secondary"
                text="Get Started"
                size="lg"
                onClick={() => navigate("/signup")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionCTA;
