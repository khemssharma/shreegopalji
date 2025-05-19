import React from 'react'

const Contact = () => {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
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
  );
};

export default Contact;