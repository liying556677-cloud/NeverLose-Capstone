import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import CustomButton from "../components/CustomButton/CustomButton";
import { AuthContext } from "../context/AuthContext";

export default function GenericErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();//Hook for navigation
  const { user } = useContext(AuthContext);

  const {
    title = "Unexpected Error",
    message = "Something went wrong. Please try again later.",
    buttonText = "Back to Home",
    buttonPath = "/home",
    icon = "bi-question-circle",
  } = location.state || {}; // {} if state is undefined

  return (
    <MainLayout username={user?.displayName || "User"}>
      <div className="max-w-xl mx-auto">
        <div className="d-flex bg-white p-5 rounded-4 flex-column animate__animated animate__fadeIn">
          <div className="flex-grow-1 d-flex p-5 my-5">
            <div
              className="container py-4 px-4 text-center"
              style={{ maxWidth: "900px" }}
            >
              <div className="d-flex justify-content-center mb-4 animate__animated animate__fadeIn">
                {/* Icon Neverlose */}
                <div
                  className="rounded-4 mx-auto"
                  style={{
                    backgroundColor: "var(--nl-deep-blue)",
                    width: "64px",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(5, 21, 51, 0.12)",
                  }}
                >
                  <i
                    className={`bi ${icon}`}
                    style={{ color: "var(--nl-info)", fontSize: "36px" }}
                  ></i>
                </div>
              </div>

              {/* Text */}
              <div className="mb-4">
                <h2
                  className="fw-bold mb-4"
                  style={{ color: "var(--nl-deep-blue)", fontSize: "42px" }}
                >
                  {title}
                </h2>

                <p className="lead mb-4">{message}</p>

                {/* {details && (
                  <pre
                    className="bg-light p-3 rounded text-start mx-auto"
                    style={{ maxWidth: 600 }}
                  >
                    {JSON.stringify(details, null, 2)}
                  </pre>
                )} */}
              </div>

              {/* CTA */}
              <CustomButton
                onClick={() => navigate(buttonPath)}
                variant="primary"
                className="px-5 py-3 mt-5"
                style={{
                  borderRadius: "32px",
                  fontSize: "18px",
                  fontWeight: "600",
                  transition: "transform 0.3s ease",
                }}
              >
                {buttonText}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
