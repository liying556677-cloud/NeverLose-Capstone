import React from "react";
import "./Landing.css";
import Navbar from "../navbar/NavBar";
import Hero from "../Landing/Hero";
import HowItWorks from "../Landing/HowItWorks";
import Features from "../Landing/Features";
import FoundItem from "../Landing/FoundItem";
import MissionCTA from "../Landing/MissionCTA";
import Team from "../Landing/Team";
import Footer from "../Landing/Footer";

const Landing = () => {
  return (
    <div className="landing-wrapper position-relative">
      <div className="nav-container-floating position-absolute w-100 z-3">
        <Navbar isSticky={false} />
      </div>
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <FoundItem />
        <MissionCTA />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
