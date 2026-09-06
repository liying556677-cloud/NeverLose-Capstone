import { useEffect, useState } from "react";
import { publicApi } from "../api/publicApi";
import { useParams, useNavigate } from "react-router-dom";
import Founder from "../layouts/Founder/Founder";
import CustomButton from "../components/CustomButton/CustomButton";
import FinderWelcome from "../assets/Finder-Step0.webp";
import { useFoundFlow } from "../hooks/public/useFoundFlow";
import NotFound from "../components/Found/NotFound";

export default function PublicScan() {
  const { token } = useParams();
  // const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const { item, loading, error } = useFoundFlow(token);

  // useEffect(() => {
  //   publicApi.getItem(token).then((res) => setItem(res.data));
  // }, [token]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <NotFound
        title="Oops! We couldn't find this tag"
        message={
          <>
            It seems like this QR code isn't registered in our system or has
            been deactivated. Please try scanning it again or check if the tag
            is damaged.
            <strong
              className="d-block mt-2"
              style={{ color: "var(--nl-dark-navy)" }}
            >
              {" "}
              Thank you for trying to help!
            </strong>
          </>
        }
        icon="bi-qr-code-scan"
        buttonText="Explore Neverlose"
      />
    );
  }

  return (
    <Founder
      leftImage={FinderWelcome}
      right={
        <div
          className="container py-5 px-5 mt-5 d-flex flex-column align-items-center"
          style={{ maxWidth: "700px" }}
        >
          {/* Header Section */}
          <div className="d-flex justify-content-center mb-4 ">
            <div
              className="nl-icon-box"
              style={{
                width: "64px",
                height: "64px",
              }}
            >
              <i
                className="bi bi-tag"
                style={{
                  color: "var(--nl-warning)",
                  fontSize: "30px",
                }}
              ></i>
            </div>
          </div>

          <div className="text-center ">
            <div className="mb-5">
              <h1
                className="fw-bold mb-4"
                style={{ color: "var(--nl-deep-blue)", fontSize: "2.5rem" }}
              >
                You found a lost item!
              </h1>
              <h3 className="mb-5">
                Thank you for helping this
                <span
                  className="fw-bold"
                  style={{ color: "var(--nl-tech-blue)" }}
                >
                  {" "}
                  "{item?.nickname}"
                </span>
                to find its way back home.
              </h3>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-center gap-5 mb-5 w-100">
            <CustomButton variant="outline" onClick={() => navigate(`/home`)}>
              Learn more
            </CustomButton>
            <CustomButton
              onClick={() => navigate(`/found/${token}`)}
              variant="primary"
            >
              Contact Owner
            </CustomButton>
          </div>

          {/* Neverlose finder summary */}
          <div className="border-top py-4 mt-4 text-center border-bottom">
            <p className="text-muted fs-6 mb-3">
              Neverlose is a community platform designed to recover lost
              belongings safely and anonymously.
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
      }
    />
  );
}
