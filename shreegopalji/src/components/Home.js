import React from "react";
import "./Home.css"; 
import Roads from "../assets/infra.avif";
import heroImg from "../assets/hero.jpg"

const Home = () => (
  <div className="home-container">
    {/* Hero Section */}
    <section className="hero-section">
      <img src={heroImg} alt="Shree Gopalji Infratech Pvt Ltd" className="hero-img" />
      <div className="hero-overlay">
        <h1>Shree Gopalji Infratech Pvt Ltd</h1>
        <p>Building Trust, Creating Landmarks</p>
        <a href="#about" className="hero-btn">Learn More</a>
      </div>
    </section>

    {/* About Section */}
    <section id="about" className="about-section">
      <h2>About Us</h2>
      <p>
        Shree Gopalji Infratech Pvt Ltd is a leading real estate and infrastructure development company, committed to delivering excellence in every project. With a legacy of trust and innovation, we shape skylines and create sustainable communities.
      </p>
    </section>

    {/* Services Section */}
    <section className="services-section">
      <h2>Our Services</h2>
      <div className="services-list">
        <div className="service-card">
          <img
            src={Roads}
            alt="Residential Projects"
            style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }}
          />
          <h3>Infrastructure Development</h3>
          <p>We have a history of delivering best results in infrastructure development</p>
        </div>
        <div className="service-card">
          <img
            src={heroImg}
            alt="Residential Projects"
            style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }}
          />
          <h3>Commercial Spaces</h3><p>State-of-the-art office complexes and retail spaces for thriving businesses.</p>
        </div>
      </div>
    </section>

    {/* Projects Section */}
    <section className="projects-section">
      <h2>Completed Projects</h2>
      <div className="projects-list">
        <div className="project-card">
          <img
            src={Roads}
            alt="Residential Projects"
            style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }}
          />
          <h4>Nasrullahganj-Sandalpur Expressway</h4>
          <p>Completed in 2025.</p>
        </div>
        <div className="project-card">
          <img
            src={Roads}
            alt="Residential Projects"
            style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }}
          />
          <h4>Chittorgarh-Kota</h4>
          <p>Completed in 2025.</p>
        </div>
        <div className="project-card">
          <img
            src={Roads}
            alt="Residential Projects"
            style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }}
          />
          <h4>Sanchi Expressway</h4>
          <p>Completed in 2025.</p>
        </div>
      </div>
    </section>

    {/* Contact Section */}
    <section className="contact-section">
      <h2>Contact Us</h2>
      <p>
        <strong>Address:</strong> Door Sanchar Colony, Shahpura, Bhopal, Madhya Pradesh 462039, Bhopal, Madhya Pradesh, PIN<br />
        <strong>Email:</strong> shrigopalji1978@gmail.com<br />
        <strong>Phone:</strong> +91-12345-67890
      </p>
      <a href="mailto:shrigopalji1978@gmail.com" className="contact-btn">Get in Touch</a>
    </section>

  </div>
);

export default Home;