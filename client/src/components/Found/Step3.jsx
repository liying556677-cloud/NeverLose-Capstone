import CustomButton from "../CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

export default function Step3Success() {
  const navigate = useNavigate();//Navigation hook (used to redirect user)

  return (
    <div className="container py-4 px-4" style={{ maxWidth: "700px" }}>
      {/*  Hero Badge */}
      <div className="d-flex justify-content-center mb-4 animate__animated animate__backInDown ">
        <div
          className="nl-icon-box"
          style={{
            width: "64px",
            height: "64px",
          }}
        >
          <i
            className="bi bi-hand-thumbs-up"
            style={{
              color: "var(--nl-success)",
              fontSize: "28px",
            }}
          ></i>
        </div>
      </div>
      {/* Success message  */}
      <div className="text-center mb-5">
        <h1
          className="text-brand-gradient fw-bold mb-2 text-dark"
          style={{ fontSize: "60px" }}
        >
          You're a Hero!
        </h1>
        <h3>You've done something great today. </h3>
      </div>
      <div className="space-y-1 text-center">
        <p className="font-medium">
          The owner has been notified. Your kindness just made someone's day
          much better. They will contact you soon to coordinate the recovery.
        </p>
      </div>
      {/* CTA button (redirect to home/dashboard) */}
      <div className="d-flex justify-content-center my-2 pb-5">
        
        <CustomButton
          onClick={() => navigate("/home")}
          variant="primary"
          className="px-5 py-3 mt-5"
          style={{
            borderRadius: "32px",
            fontSize: "18px",
            fontWeight: "600",
            transition: "transform 0.3s ease",
          }}
        >
          Discover Neverlose
        </CustomButton>
      </div>

      {/* Neverlose finder summary */}
      <div className="border-top py-4 mt-4 text-center border-bottom">
        <p className="text-muted fs-6 mb-3">
          Neverlose is a community platform designed to recover lost belongings
          safely and anonymously.
        </p>
        <div
          className="row g-0    "
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
              <p className="small fw-bold mb-0 text-dark">{item.label}</p>
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
  );
}
