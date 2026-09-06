import CustomButton from "../CustomButton/CustomButton";
import NavBar from "../../components/navbar/NavBar";
import { useNavigate } from "react-router-dom";

export default function NotFound({
  title = "Oops! We couldn't find this page",
  message,
  icon = "bi-question-circle",
  buttonText = "Explore Neverlose",
  buttonPath = "/home",
}) {
  const navigate = useNavigate();//Navigation hook for redirecting user

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Top navigation bar (non-sticky for clean layout)  */}
      <NavBar isSticky={false} />

      <div className="py-4 mx-4">
        {/* White container */}
        <div
          className="bg-white rounded-4 shadow-lg overflow-hidden animate__animated animate__fadeIn"
          style={{
            width: "100%",
            maxWidth: "1300px",

            margin: "0 auto",
          }}
        >
          {/* Blue container */}
          <div
            className="m-3 m-md-4"
            style={{
              backgroundColor: "var(--nl-deep-blue)",
              borderRadius: "28px",
              padding: "2px",
            }}
          >
            {/* Inner White container */}
            <div
              className="bg-white m-3 m-md-4"
              style={{
                borderRadius: "26px",
                minHeight: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="container py-5 px-5 my-4 text-center"
                style={{ maxWidth: "700px" }}
              >
                {/* Icon Neverlose */}
                <div className="d-flex justify-content-center mb-5">
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
                <div className="mb-5">
                  <h2
                    className="fw-bold mb-4"
                    style={{ color: "var(--nl-deep-blue)", fontSize: "42px" }}
                  >
                    {title}
                  </h2>

                  <p className="lead mb-4">{message}</p>
                </div>

                {/* CTA button (redirects user)*/}
                <CustomButton
                  onClick={() => navigate(buttonPath)}
                  variant="primary"
                  className="px-5 py-3 my-3"
                  style={{
                    borderRadius: "32px",
                    fontSize: "18px",
                    fontWeight: "600",
                    transition: "transform 0.3s ease",
                  }}
                >
                  {buttonText}
                </CustomButton>

                {/* Neverlose finder summary */}
                <div className="border-top py-4 mt-4 text-center border-bottom">
                  <p className="text-muted fs-6 mb-3">
                    Neverlose is a community platform designed to recover lost
                    belongings safely and anonymously.
                  </p>
                  {/* Feature highlights (mapped dynamically) */}
                  <div
                    className="row g-0"
                    style={{ borderColor: "#f0f0f0 !important" }}
                  >
                    {[
                      {
                        icon: "bi-shield-check",
                        label: "Verify",
                        sub: "Confirm item",
                      },
                      {
                        icon: "bi-chat-left-dots",
                        label: "Notify",
                        sub: "Message owner",
                      },
                      {
                        icon: "bi-envelope-paper-heart",
                        label: "Connect",
                        sub: "Return safely",
                      },
                    ].map((item, index) => (
                      <div className="col-4 text-center" key={index}>
                        <div className="mb-2 fs-4 text-primary opacity-75">
                          <i className={`bi ${item.icon}`}></i>
                        </div>
                        <p className="small fw-bold mb-0 text-dark">
                          {item.label}
                        </p>
                        <span
                          className="text-muted d-none d-md-block"
                          style={{ fontSize: "11px" }}
                        >
                          {item.sub}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
