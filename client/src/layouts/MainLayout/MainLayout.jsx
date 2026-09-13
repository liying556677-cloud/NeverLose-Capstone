import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import logoWide from "../../assets/Neverlose-Wide.svg";
import userIcon from "../../assets/avatar.svg";

import Footer from "../../components/Landing/Footer";

import "./MainLayout.css";

const MainLayout = ({ children, username = "User" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
  try {
    navigate("/home");
    await logout();
    navigate("/home");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  const menuItems = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "My Secure Tags",
    path: "/my-secure-tags",
  },
  {
    label: "My Group",
    path: "/my-group",
  },
  {
    label: "Finder Reports",
    path: "/finder-reports",
  },
  {
    label: "Item History",
    path: "/item-history",
  },
  {
    label: "My Profile",
    path: "/profile",
  },
];

  return (
  <div className="app-page">

    <div className="app-layout">

      {/* Left Sidebar */}
      <aside className="app-sidebar">

        <div
          className="sidebar-logo"
          onClick={() => navigate("/")}
        >
          <img
            src={logoWide}
            alt="Neverlose"
          />
        </div>

        <nav className="sidebar-navigation">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                className={`sidebar-link ${
                  isActive ? "sidebar-link-active" : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            );
          })}

          <button
            className="sidebar-link"
            onClick={handleLogout}
          >
            Log out
          </button>
        </nav>

      </aside>

      {/* Right Side */}
      <div className="app-main">

        <div className="app-topbar">
          <div className="ms-auto d-flex align-items-center gap-2">

            <button
              className="topbar-user"
              onClick={() => navigate("/profile")}
            >
              <span>{username}</span>

              <div className="topbar-avatar">
                <img
                  src={userIcon}
                  alt="User"
                />
              </div>
            </button>

            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                className="topbar-menu-button"
              >
                ⋮
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow border-0">
                <Dropdown.Item
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={handleLogout}
                  className="text-primary fw-bold"
                >
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </div>
        </div>

        <main className="app-content">
          {children}
        </main>

      </div>

    </div>

    {/* Full-width Footer */}
    <Footer />

  </div>
);
};

export default MainLayout;