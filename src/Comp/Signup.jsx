import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import { app } from "../Firebase";

const database = getDatabase(app);

function Signup() {
  const [state, setState] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailKey = state.email.replace(/\./g, "_");

    set(ref(database, "users/" + emailKey), {
      username: state.username,
      email: state.email,
      password: state.password,
    })
      .then(() => {
        alert("Signup successful! Please login.");
        navigate("/login");
      })
      .catch((err) => alert("Signup failed! " + err.message));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e9fce9, #d0f5d0)",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "35px 25px",
          borderRadius: "15px",
          boxShadow: "0 5px 20px rgba(0, 0, 0, 0.15)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "25px", color: "#09a325", fontWeight: 700, fontSize: "26px" }}>
          Sign Up
        </h2>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Username"
          required
          style={{
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
            marginBottom: "15px",
            width: "100%",
            boxSizing: "border-box",
            outline: "none",
          }}
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
            marginBottom: "15px",
            width: "100%",
            boxSizing: "border-box",
            outline: "none",
          }}
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={{
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
            marginBottom: "15px",
            width: "100%",
            boxSizing: "border-box",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#09a325",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            width: "100%",
            transition: "0.3s ease",
            fontWeight: 600,
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#078d20")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#09a325")}
        >
          Sign Up
        </button>
        <p style={{ marginTop: "15px", fontSize: "14px", color: "#444" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#09a325", textDecoration: "none", fontWeight: 600 }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
