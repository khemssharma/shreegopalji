import React, { useState } from "react";

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f2027, #2c5364)",
        fontFamily: "'Segoe UI', sans-serif",
    },
    card: {
        background: "#fff",
        padding: "2.5rem 2rem",
        borderRadius: "16px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
        minWidth: "350px",
        maxWidth: "90vw",
        textAlign: "center",
    },
    logo: {
        width: "60px",
        marginBottom: "1rem",
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "#2c5364",
        marginBottom: "0.5rem",
        letterSpacing: "1px",
    },
    subtitle: {
        fontSize: "1rem",
        color: "#555",
        marginBottom: "2rem",
    },
    input: {
        width: "100%",
        padding: "0.75rem",
        margin: "0.5rem 0",
        borderRadius: "8px",
        border: "1px solid #b0bec5",
        fontSize: "1rem",
        outline: "none",
        transition: "border 0.2s",
    },
    button: {
        width: "100%",
        padding: "0.75rem",
        background: "linear-gradient(90deg, #11998e, #38ef7d)",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontWeight: 600,
        fontSize: "1rem",
        cursor: "pointer",
        marginTop: "1rem",
        transition: "background 0.2s",
    },
    error: {
        color: "#d32f2f",
        marginTop: "0.5rem",
        fontSize: "0.95rem",
    },
    footer: {
        marginTop: "2rem",
        fontSize: "0.9rem",
        color: "#888",
        letterSpacing: "0.5px",
    },
};

export default function ManagementLogin() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.username || !form.password) {
            setError("Please enter both username and password.");
            return;
        }
        try {
            const response = await fetch("https://shreegopalji.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: form.username, // assuming username is email
                    password: form.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed.");
                return;
            }

            // Save token to localStorage/sessionStorage if needed
            localStorage.setItem("token", data.token);

            // Redirect or update UI as needed
            alert("Login successful!");
            // window.location.href = "/dashboard"; // Example redirect
        } catch (err) {
            setError("Network error. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.card} onSubmit={handleSubmit} autoComplete="off">
                {/* Company Logo (replace src with your logo if available) */}
                <img
                    src="https://img.icons8.com/ios-filled/100/2c5364/building.png"
                    alt="Shree Gopalji Infratech Logo"
                    style={styles.logo}
                />
                <div style={styles.title}>Shree Gopalji Infratech Pvt. Ltd.</div>
                <div style={styles.subtitle}>
                    Managerial Staff Login Portal
                </div>
                <input
                    style={styles.input}
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    autoFocus
                />
                <input
                    style={styles.input}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                {error && <div style={styles.error}>{error}</div>}
                <button style={styles.button} type="submit">
                    Login
                </button>
                <div style={styles.footer}>
                    © {new Date().getFullYear()} Shree Gopalji Infratech Pvt. Ltd.<br />
                    For authorized managerial staff only.
                </div>
                <div style={{ marginTop: "1.5rem", color: "#2c5364", fontWeight: 500 }}>
                    Not a member?{" "}
                    <span
                        style={{ textDecoration: "underline", cursor: "pointer" }}
                        onClick={() => window.location.href = "/signup"}
                    >
                        Signup.
                    </span>
                </div>
            </form>
        </div>
    );
}