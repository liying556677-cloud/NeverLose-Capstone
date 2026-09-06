import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="hero" className="hero-container">
      <div
        className="hero-content p-0 p-md-5 mx-5"
        style={{ maxWidth: "700px" }}
      >
        <h1 className="hero-title display-4" style={{ color: "white" }}>
          Protect what you love. <br />
          <span className="fw-bold" style={{ color: "var(--nl-danger)" }}>
            Recover it, privately.
          </span>
        </h1>
        <p className="hero-subtitle lead mb-5" style={{ color: "white" }}>
          The intelligent recovery network for your valued essentials. Neverlose
          connects finders with owners through anonymous, encrypted technology.
        </p>
        <CustomButton
          variant="secondary"
          text="Get Your Tags"
          size="lg"
          onClick={() => navigate("/signup")}
        />
      </div>
      <div className="hero-image-overlay"></div>
    </section>
  );
};

export default Hero;
