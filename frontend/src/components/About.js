import React from "react";
import "./About.css";
import GM from "../assets/gm.avif";
import MD from "../assets/md.avif";

const About = () => (
  <div className="about-container" style={{ padding: "2rem", maxWidth: 900, margin: "auto" }}>
    <h1 style={{ color: "#1a237e" }}>About Shree Gopalji Infratech Pvt. Ltd.</h1>
    <hr style={{ margin: "1rem 0" }} />
    <section>
      <p>
        <strong>Shree Gopalji Infratech Pvt. Ltd.</strong> is a leading real estate and infrastructure development company, renowned for its commitment to quality, innovation, and customer satisfaction. Established with a vision to redefine urban living, we have consistently delivered landmark projects that blend modern architecture with sustainable practices.
      </p>
    </section>
    <section>
      <h2>Our Vision</h2>
      <p>
        To be a trusted leader in the real estate and infrastructure sector, creating value for our customers, partners, and society by delivering exceptional projects that stand the test of time.
      </p>
    </section>
    <section>
      <h2>Our Mission</h2>
      <ul>
        <li>Deliver high-quality residential, commercial, and industrial spaces.</li>
        <li>Adopt innovative construction technologies and sustainable practices.</li>
        <li>Ensure transparency, integrity, and customer-centricity in all our dealings.</li>
        <li>Contribute to the growth and development of communities.</li>
      </ul>
    </section>
    <section>
      <h2>Our Services</h2>
      <ul>
        <li>Residential & Commercial Real Estate Development</li>
        <li>Infrastructure & Civil Construction</li>
        <li>Project Management & Consultancy</li>
        <li>Land Acquisition & Development</li>
        <li>Turnkey Solutions</li>
      </ul>
    </section>
    <section>
      <h2>Why Choose Us?</h2>
      <ul>
        <li><strong>Experience:</strong> Years of expertise in delivering successful projects.</li>
        <li><strong>Quality:</strong> Uncompromising standards in construction and materials.</li>
        <li><strong>Innovation:</strong> Embracing new technologies and design trends.</li>
        <li><strong>Customer Focus:</strong> Transparent processes and dedicated support.</li>
        <li><strong>Sustainability:</strong> Eco-friendly initiatives and green building practices.</li>
      </ul>
    </section>
    <section>
      <h2>Leadership</h2>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <div style={{ flex: "1 1 200px", textAlign: "center" }}>
          <img
            src={MD}
            alt="Gourav Thapak - Managing Director"
            style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", marginBottom: "0.5rem" }}
            onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/120?text=No+Image"; }}
          />
          <h3>Managing Director</h3>
          <strong>Gourav Thapak</strong>
          <p style={{ fontSize: "0.95rem", marginTop: "0.5rem" }}>
            With a visionary approach and decades of experience, Gourav Thapak leads the company towards excellence and innovation in every project.
          </p>
        </div>
        <div style={{ flex: "1 1 200px", textAlign: "center" }}>
          <img
            src={GM}
            alt="Ashish Dantre - General Manager"
            style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", marginBottom: "0.5rem" }}
            onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/120?text=No+Image"; }}
          />
          <h3>General Manager</h3>
          <strong>Ashish Dantre</strong>
          <p style={{ fontSize: "0.95rem", marginTop: "0.5rem" }}>
            Ashish Dantre ensures smooth operations and upholds the highest standards of quality and client satisfaction across all company endeavors.
          </p>
        </div>
      </div>
    </section>
    <section>
      <h2>Our Team</h2>
      <p>
        Our team comprises seasoned professionals, architects, engineers, and project managers who are passionate about delivering excellence. Their expertise and dedication drive our success and ensure timely delivery of every project.
      </p>
    </section>
    <section>
      <h2>Contact Us</h2>
      <p>
        <strong>Shree Gopalji Infratech Pvt. Ltd.</strong><br />
        Registered Office:  Door Sanchar Colony, Shahpura,
          Bhopal, Madhya Pradesh, India,
          PIN: 462039  <br />
        Phone: +91 12356 67890<br />
        Email: shrigopalji1978@gmail.com<br />
        Website: <a href="https://www.sgipl.com" target="_blank" rel="noopener noreferrer">www.sgipl.com</a>
      </p>
    </section>
  </div>
);

export default About;