import React, { useContext } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { Container, Navbar } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import step1 from "../../assets/Step 1.png";
import step2 from "../../assets/Step 2.png";
import step3 from "../../assets/Step 3.png";

const WelcomeState = ({ onCreateClick }) => {
  // Get logged-in user details from global Auth context
  const { user } = useContext(AuthContext);
  // Fallback to "User" if display name is not available
  const displayName = user?.displayName || "User";

  return (
    <div>
      {/* Main welcome container */}
      <div className="d-flex align-items-center justify-content-center py-5 px-4 bg-white rounded-4 shadow-sm w-100">
        <div className=" text-center w-100" style={{ maxWidth: "900px" }}>
          <h1 className="fw-bold text-nl-dark mb-2">Welcome {displayName}</h1>
          <h2 className="fw-light text-nl-dark mb-5">
            Let’s secure your world!
          </h2>
        {/* Step-by-step onboarding guide  */}
          <div className="d-flex justify-content-center mb-2 flex-wrap">
            <div className="text-center p-2" style={{ flex: "1 1 150px" }}>
              <img alt="" src={step1} width="90" className="me-2" />
              <h4
                className="fw-bold pt-4"
                style={{ color: "var(--nl-deep-blue)" }}
              >
                Step 1
              </h4>
              <p className="small text-muted">Register your favorite items</p>
            </div>
            <div className="text-center p-2" style={{ flex: "1 1 150px" }}>
              <img alt="" src={step2} width="90" className="me-2" />
              <h4
                className="fw-bold pt-4"
                style={{ color: "var(--nl-deep-blue)" }}
              >
                Step 2
              </h4>
              <p className="small text-muted">Print your unique QR code</p>
            </div>
            <div className="text-center p-2" style={{ flex: "1 1 150px" }}>
              <img alt="" src={step3} width="90" className="me-2" />
              <h4
                className="fw-bold pt-4"
                style={{ color: "var(--nl-deep-blue)" }}
              >
                Step 3
              </h4>
              <p className="small text-muted">
                Attach it and enjoy peace of mind
              </p>
            </div>
          </div>
          {/* button to start item creation flow  */}
          <CustomButton
            onClick={onCreateClick}
            variant="primary"
            className="px-5"
          >
            Add New Item
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default WelcomeState;
