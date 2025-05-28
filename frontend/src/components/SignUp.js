import React, { useState } from "react";
import useStore from "../store/useAuthStore";
import {Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [success, setSuccess] = useState(false);
    const { signup, loading, error } = useStore();
    const  [localError, setlocalError]  = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setlocalError("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !form.name ||
            !form.email ||
            !form.phone ||
            !form.password ||
            !form.confirmPassword
        ) {
            setlocalError("Please fill in all fields.");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setlocalError("Passwords do not match.");
            return;
        }
        setSuccess(true);
        setForm({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        });
        if (success){
            navigate("/login");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <img
                    src="./sgipllogo.png"
                    alt="Shri Gopalji Infratech Pvt Ltd"
                    style={styles.logo}
                />
                <h2 style={styles.title}>Sign Up</h2>
                <p style={styles.subtitle}>
                    Join <b>Shri Gopalji Infratech Pvt Ltd</b> and start your journey with us!
                </p>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (
                            !form.name ||
                            !form.email ||
                            !form.phone ||
                            !form.password ||
                            !form.confirmPassword
                        ) {
                            setlocalError("Please fill in all fields.");
                            setSuccess(false);
                            return;
                        }
                        if (form.password !== form.confirmPassword) {
                            setlocalError("Passwords do not match.");
                            setSuccess(false);
                            return;
                        }
                        try {
                            const res = await fetch("https://shreegopalji.onrender.com/api/auth/register", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    name: form.name,
                                    email: form.email,
                                    password: form.password,
                                }),
                            });
                            const data = await res.json();
                            if (!res.ok) {
                                setlocalError(data.message || "Registration failed.");
                                setSuccess(false);
                                return;
                            }
                            setSuccess(true);
                            setlocalError("");
                            setForm({
                                name: "",
                                email: "",
                                phone: "",
                                password: "",
                                confirmPassword: "",
                            });
                        } catch (err) {
                            setlocalError("Network localError. Please try again.");
                            setSuccess(false);
                        }
                    }}
                    style={styles.form}
                >
                    <input
                        style={styles.input}
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <input
                        style={styles.input}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <input
                        style={styles.input}
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                    />
                    <input
                        style={styles.input}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <input
                        style={styles.input}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    {localError && <div style={styles.localError}>{localError}</div>}
                    {success && (
                        <div style={styles.success}>
                            Registration successful! Please <a href="/login">log in</a> to continue.
                        </div>
                    )}
                    <button type="submit" style={styles.button}>
                        Create Account
                    </button>
                </form>
                <div style={{ marginTop: "1rem", fontSize: "0.97rem" }}>
                    Already a member?{" "}
                    <Link to="/login" style={{ color: "#2c5364", fontWeight: 600, textDecoration: "underline" }}>
                        Login to continue
                    </Link>
                </div>
            </div>
            <footer style={styles.footer}>
                &copy; {new Date().getFullYear()} Shri Gopalji Infratech Pvt Ltd. All rights reserved.
            </footer>
        </div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        background: "#fff",
        padding: "2.5rem 2rem",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(60,60,60,0.15)",
        maxWidth: "400px",
        width: "100%",
        textAlign: "center",
    },
    logo: {
        width: "90px",
        marginBottom: "1rem",
    },
    title: {
        margin: "0 0 0.5rem 0",
        color: "#2d3a4b",
        fontWeight: 700,
        letterSpacing: "1px",
    },
    subtitle: {
        color: "#5c6b7a",
        marginBottom: "1.5rem",
        fontSize: "1rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    input: {
        padding: "0.75rem",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "1rem",
        outline: "none",
        transition: "border 0.2s",
    },
    button: {
        padding: "0.75rem",
        borderRadius: "8px",
        border: "none",
        background: "linear-gradient(90deg, #0f2027 0%, #2c5364 100%)",
        color: "#fff",
        fontWeight: 600,
        fontSize: "1rem",
        cursor: "pointer",
        marginTop: "0.5rem",
        transition: "background 0.2s",
    },
    localError: {
        color: "#d32f2f",
        background: "#ffebee",
        padding: "0.5rem",
        borderRadius: "6px",
        fontSize: "0.95rem",
    },
    success: {
        color: "#388e3c",
        background: "#e8f5e9",
        padding: "0.5rem",
        borderRadius: "6px",
        fontSize: "0.95rem",
    },
    footer: {
        marginTop: "2rem",
        color: "#7b8a99",
        fontSize: "0.95rem",
        textAlign: "center",
    },
};

export default SignUp;