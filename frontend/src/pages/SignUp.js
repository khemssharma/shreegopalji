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
                            const res = await fetch("http://localhost:5000/api/auth/register", {
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
        padding: "1rem",
    },
    card: {
        background: "#fff",
        padding: "2.5rem 2rem",
        borderRadius: "18px",
        boxShadow: "0 8px 32px rgba(60,60,60,0.15)",
        maxWidth: "400px",
        width: "100%",
        textAlign: "center",
        transition: "box-shadow 0.2s, max-width 0.2s",
    },
    logo: {
        width: "90px",
        marginBottom: "1rem",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(44,83,100,0.08)",
    },
    title: {
        margin: "0 0 0.5rem 0",
        color: "#2d3a4b",
        fontWeight: 700,
        letterSpacing: "1px",
        fontSize: "2rem",
    },
    subtitle: {
        color: "#5c6b7a",
        marginBottom: "1.5rem",
        fontSize: "1.05rem",
        lineHeight: 1.5,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
    },
    input: {
        width: "100%",
        maxWidth: "340px",
        padding: "0.85rem",
        borderRadius: "10px",
        border: "1px solid #d1d5db",
        fontSize: "1rem",
        outline: "none",
        transition: "border 0.2s, box-shadow 0.2s",
        margin: "0 auto",
        boxSizing: "border-box",
        background: "#f9fafb",
    },
    button: {
        width: "100%",
        maxWidth: "340px",
        padding: "0.85rem",
        borderRadius: "10px",
        border: "none",
        background: "linear-gradient(90deg, #0f2027 0%, #2c5364 100%)",
        color: "#fff",
        fontWeight: 700,
        fontSize: "1.08rem",
        cursor: "pointer",
        marginTop: "0.5rem",
        transition: "background 0.2s, box-shadow 0.2s",
        boxShadow: "0 2px 8px rgba(44,83,100,0.08)",
    },
    localError: {
        color: "#d32f2f",
        background: "#ffebee",
        padding: "0.6rem",
        borderRadius: "7px",
        fontSize: "0.97rem",
        margin: "0.2rem 0",
    },
    success: {
        color: "#388e3c",
        background: "#e8f5e9",
        padding: "0.6rem",
        borderRadius: "7px",
        fontSize: "0.97rem",
        margin: "0.2rem 0",
    },
    footer: {
        marginTop: "2rem",
        color: "#7b8a99",
        fontSize: "0.97rem",
        textAlign: "center",
        padding: "0.5rem",
    },
    // Responsive styles for mobile and tablets
    '@media (max-width: 600px)': {
        card: {
            maxWidth: "98vw",
            padding: "1.2rem 0.5rem",
            borderRadius: "12px",
        },
        input: {
            width: "98%",
            maxWidth: "98vw",
            fontSize: "0.98rem",
            padding: "0.7rem",
        },
        button: {
            width: "98%",
            maxWidth: "98vw",
            fontSize: "1rem",
            padding: "0.7rem",
        },
        logo: {
            width: "70px",
        },
        title: {
            fontSize: "1.4rem",
        },
        subtitle: {
            fontSize: "0.98rem",
        },
    },
    '@media (max-width: 400px)': {

        card: {
            padding: "0.7rem 0.2rem",
        },
        input: {
            fontSize: "0.95rem",
            padding: "0.6rem",
        },
        button: {
            fontSize: "0.97rem",
            padding: "0.6rem",
        },
        title: {
            fontSize: "1.1rem",
        },
    },
};

export default SignUp;