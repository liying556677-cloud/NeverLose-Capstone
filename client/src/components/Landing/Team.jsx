import React from "react";
import "./Landing.css";
import Dhanashree from "../../assets/Landing/Dhana.webp";
import Divya from "../../assets/Landing/Divya.webp";
import Paula from "../../assets/Landing/Paula.webp";
import NPatternBg from "../../assets/NPatternBG.webp";

const Team = () => {
  const members = [
    {
      name: "Dhanashree Pawar",
      role: "Full Stack Developer",
      desc: "I leverage 15+ years of IT expertise to bridge the gap between business needs and technical execution, delivering scalable, secure, and future-ready solutions.",
      img: Dhanashree,
      linkedin: "https://www.linkedin.com/in/dhanashre-pawar-80956b12/",
      github: "https://github.com/Dhanu297",
    },
    {
      name: "Paula Suarez",
      role: "Frontend Developer",
      desc: "Bridging UI/UX design and Web Development to build engaging interactions and memorable, user-centered digital products.",
      img: Paula,
      linkedin: "https://www.linkedin.com/in/paulasuarezm/",
      github: "https://github.com/Paujsm",
    },
    {
      name: "Divya Rayapati",
      role: "Full Stack Developer",
      desc: "I’m passionate about front-end development and creating clean, user-friendly interfaces. I enjoy turning ideas into engaging digital experiences while continuously learning.",
      img: Divya,
      linkedin: "https://www.linkedin.com/in/divya-rayapati/",
      github: "https://github.com/drayapati1998",
    },
  ];

  return (
    <section
      id="our-team"
      className="py-5 position-relative overflow-hidden"
      style={{ backgroundColor: "var(--nl-soft-gray)" }}
    >
      <div
        className="background-pattern"
        style={{
          backgroundImage: `url(${NPatternBg})`,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          opacity: 0.5,
          pointerEvents: "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-5 max-width-700 mx-auto">
          <h2
            className="display-6 fw-bold mb-3"
            style={{ color: "var(--nl-tech-blue)" }}
          >
            Meet <span style={{ color: "var(--nl-deep-blue)" }}>Our Team</span>
          </h2>
          <p className="lead text-muted px-lg-5">
            Our mission is to build technology that protects what you love while
            keeping your personal data completely invisible.
          </p>
        </div>

        <div className="row g-4 mt-4">
          {members.map((m, i) => (
            <div key={i} className="col-12 col-md-4">
              <div className="team-card text-center p-4">
                <div className="member-img-wrapper mb-4">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="img-fluid rounded-circle shadow-sm"
                    style={{ backgroundColor: "rgba(0, 209, 255, 0.37)" }}
                  />
                </div>
                <h4
                  className="fw-bold mb-1"
                  style={{ color: "var(--nl-deep-blue)" }}
                >
                  {m.name}
                </h4>
                <p
                  className="fw-bold small text-uppercase mb-3"
                  style={{ color: "var(--nl-tech-blue)", letterSpacing: "1px" }}
                >
                  {m.role}
                </p>
                <p className="text-muted small">{m.desc}</p>

                {/* Social Links */}
                <div className=" d-flex justify-content-center gap-4 mt-3">
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="media text-primary-nl"
                  >
                    <i className="bi bi-linkedin fs-4"></i>
                  </a>
                  <a
                    href={m.github}
                    target="_blank"
                    rel="noreferrer"
                    className="media text-dark-nl"
                  >
                    <i className="bi bi-github fs-4"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
