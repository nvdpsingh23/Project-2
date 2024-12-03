import React from "react";
import "./AboutUs.css";
import backgroundImage from "../images/img2.jpg";
// AboutUs component displaying information about the Visionary Tales project
const AboutUs = () => {
  return (
    // Main container for the About Us section with a background image
    <div
      className="about-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
        {/* Overlay to enhance readability of text over the background image */}
      <div className="about-overlay">
        <div className="about-content">
          <h1 className="main-heading">About Visionary Tales</h1>
          {/* Section detailing the mission of Visionary Tales */}
          <section className="mission">
            <h2>Mission Statement</h2>
            <p>
              At Visionary Tales, we believe every image has a story waiting to
              be told. Our mission is to bridge the gap between memories and
              narratives through the power of cutting-edge AI technology.
            </p>
          </section>
          {/* Section describing what Visionary Tales does */}
          <section className="what-we-do">
            <h2>What We Do</h2>
            <p>
              Visionary Tales is an innovative platform that transforms your
              everyday photos into extraordinary stories. Using Google Vision API
              and advanced AI, we analyze your images, identify key
              elements, and craft a tale that's uniquely yours.
            </p>
          </section>
          {/* Section outlining the vision of Visionary Tales */}
          <section className="vision">
            <h2>Our Vision</h2>
            <p>
              To make storytelling accessible to everyone by combining technology
              with creativity, turning moments into narratives that last a
              lifetime.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
