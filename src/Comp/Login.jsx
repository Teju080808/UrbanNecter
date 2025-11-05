import React, { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import { app } from "../Firebase";

const database = getDatabase(app);

function Login({ setLogin }) {
  const [state, setState] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailKey = state.email.replace(/\./g, "_");
    const userRef = ref(database, "users/" + emailKey);

    onValue(
      userRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data && data.password === state.password) {
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({ name: data.username, email: data.email })
          );
          setLogin(data.username);
          alert("Login successful!");
          navigate("/");
        } else {
          alert("Invalid email or password");
        }
      },
      { onlyOnce: true }
    );
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
        <h2 className="text-success" style={{ marginBottom: "25px", fontWeight: 700, fontSize: "26px" }}>
          Login
        </h2>
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
          className="btn btn-success w-100"
         
        >
          Login
        </button>
        <p style={{ marginTop: "15px", fontSize: "14px", color: "#444" }}>
          Don’t have an account?{" "}
          <Link to="/signup" className="nav-link text-success">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
