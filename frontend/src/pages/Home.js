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
      <div style={{ maxWidth: '75%', margin: "40px auto", padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
      <h1 style={{ color: "#2e7d32", marginBottom: 8 }}>Contact Us</h1>
      <h2 style={{ color: "#555", fontWeight: 400, marginBottom: 24 }}>Shree Gopalji Infratech Pvt. Ltd.</h2>
      <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input type="text" placeholder="Your Name" required style={{ padding: 10, borderRadius: 4, border: "1px solid #ccc" }} />
        <input type="email" placeholder="Your Email" required style={{ padding: 10, borderRadius: 4, border: "1px solid #ccc" }} />
        <input type="tel" placeholder="Your Phone" style={{ padding: 10, borderRadius: 4, border: "1px solid #ccc" }} />
        <textarea placeholder="Your Message" required rows={5} style={{ padding: 10, borderRadius: 4, border: "1px solid #ccc" }} />
        <button type="submit" style={{ background: "#2e7d32", color: "#fff", padding: "12px 0", border: "none", borderRadius: 4, fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
          Send Message
        </button>
      </form>
      <div style={{ marginTop: 32 }}>
        <h3 style={{ marginBottom: 8 }}>Our Office</h3>
        <p>
           Door Sanchar Colony, Shahpura<br />
          Bhopal, Madhya Pradesh, India<br />
          PIN: 462039
        </p>
        <p>
          <strong>Email:</strong> shrigopalji1978@gmail.com<br />
          <strong>Phone:</strong> +91-12345-67890
        </p>
      </div>
      <div style={{ marginTop: 32 }}>
        <iframe
          title="SGIPL Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1090.3194179124735!2d77.43583139157093!3d23.192717563036812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1747648250735!5m2!1sen!2sin"
          width="100%"
          height="220"
          style={{ border: 0, borderRadius: 8 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>

  </div>
);

export default Home;