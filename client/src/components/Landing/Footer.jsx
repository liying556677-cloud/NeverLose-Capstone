import React from "react";
import logoWhite from "../../assets/Neverlose-logo-white-wide.svg";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer-custom border-0">
      <div className="container px-0 px-md-5 ">
        <div className="row gy-5 align-items-center">
          {/* left side */}
          <div className="col-12 col-md-6 text-center text-md-start">
            <img
              src={logoWhite}
              alt="Neverlose Logo"
              onClick={() => navigate("/Home")}
              className="footer-logo mb-4"
              style={{
                cursor: "pointer",
              }}
            />

            <div className="d-flex gap-4 justify-content-center justify-content-md-start">
              <a href="#" className="social-link">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-facebook"></i>
              </a>
            </div>
          </div>

          {/* right side */}
          <div className="col-12 col-md-6 text-center text-md-end">
            <h6 className="text-white fw-bold mb-3 text-uppercase small ls-widest">
              Platform
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <a href="#how-it-works" className="footer-nav-link">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#features" className="footer-nav-link">
                  Features
                </a>
              </li>
              <li>
                <a href="#found-an-item" className="footer-nav-link">
                  Found an Item?
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom mt-5 pt-4 border-top border-secondary border-opacity-25 text-center">
          <p className="small text-white opacity-50 mb-0">
            © 2026 Neverlose. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
