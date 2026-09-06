import React, { useContext } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import logoWide from "../../assets/Neverlose-Wide.svg";
import Footer from "../../components/Landing/Footer";
import "./MainLayout.css";
import userIcon from "../../assets/avatar.svg";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children, username = "{UserName}" }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
      style={{
        backgroundColor: "var(--nl-deep-blue)",
        width: "40px",
        height: "40px",
        cursor: "pointer",
      }}
    >
      <img src={userIcon} alt="User" style={{ width: "79%", height: "79%" }} />
    </div>
  ));

  const handleHome = () => navigate("/dashboard");

  return (
    <Container fluid className="mt-2 mt-md-4 px-2 px-md-4">
      <div className="bg-white rounded-4 shadow-sm p-3 p-md-4">
        <Row className="align-items-center mb-3 mb-md-4 g-2">
          <Col xs={5} md={6}>
            <div className="d-flex align-items-center">
              <img
                alt="Neverlose Logo"
                src={logoWide}
                height="40"
                className="img-fluid"
                onClick={handleHome}
                style={{ cursor: "pointer", height: "clamp(30px, 5vw, 40px)" }}
              />
            </div>
          </Col>

          {/* User Info & Dropdown */}
          <Col
            xs={7}
            md={6}
            className="d-flex align-items-center justify-content-end"
          >
            <span className="me-2 me-md-3 fw-medium text-secondary d-none d-sm-block">
              Hi, {username}
            </span>

            <Dropdown align="end">
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              />

              <Dropdown.Menu
                className="shadow border-0"
                style={{ minWidth: "35px" }}
              >
                <Dropdown.Item
                  onClick={logout}
                  className="text-primary fw-bold"
                  style={{ fontSize: "14px" }}
                >
                  <i className="bi bi-box-arrow-right"></i> Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <div
          className="rounded-4 p-2 p-md-4 flex-column"
          style={{
            backgroundColor: "var(--nl-deep-blue)",
            // minHeight: "calc(100vh - 150px)",
            transition: "all 0.3s ease",
          }}
        >
          {children}
          <Footer />
        </div>
      </div>
    </Container>
  );
};

export default MainLayout;
