import React from "react";

const Footer = () => (
    <footer style={{
        background: "#22223b",
        color: "#f2e9e4",
        padding: "40px 0 20px 0",
        textAlign: "center",
        fontFamily: "Segoe UI, Arial, sans-serif"
    }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ margin: 0, fontWeight: 700, letterSpacing: 2 }}>
                Shree Gopalji Infratech Private Limited
            </h2>
            <p style={{ margin: "10px 0 20px 0", fontSize: 16 }}>
                Building Trust. Creating Value. Shaping the Future.
            </p>
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: 30,
                flexWrap: "wrap",
                marginBottom: 20
            }}>
                <div>
                    <strong>Address:</strong><br />
                     Door Sanchar Colony, Shahpura<br />
                    Bhopal, State, 462039
                </div>
                <div>
                    <strong>Email:</strong><br />
                    <a href="mailto:shrigopalji1978@gmail.com" style={{ color: "#c9ada7" }}>
                        shrigopalji1978@gmail.com
                    </a>
                </div>
                <div>
                    <strong>Phone:</strong><br />
                    <a href="tel:+911234567890" style={{ color: "#c9ada7" }}>
                        +91 12345 67890
                    </a>
                </div>
            </div>
            <div style={{ fontSize: 14, color: "#9a8c98" }}>
                &copy; {new Date().getFullYear()} Shree Gopalji Infratech Private Limited. All rights reserved.
            </div>
        </div>
    </footer>
);

export default Footer;