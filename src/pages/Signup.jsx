import { useState } from "react";
import API from "../api/axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setMsg("");

      await API.post("/auth/signup", { name, email, password });

      setMsg("⭐ Account created — Redirecting...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);

    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden", // scroll HATAYA
        background: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >

      {/* 🔥 HEADER */}
      <div
        style={{
          width: "100%",
          padding: "20px 0",
          background: "#1f1fff",
          color: "white",
          textAlign: "center",
          fontWeight: 700,
          fontSize: "22px",
          letterSpacing: "1px",
        }}
      >
         CRM Pro — Level Up Your Sales
      </div>

      {/* CENTER BOX */}
      <div
        style={{
          marginTop: "80px",
          background: "white",
          padding: "35px",
          width: "380px",
          borderRadius: "12px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "700",
            fontFamily: "sans-serif",
          }}
        >
          Create Account
        </h2>

        <form
          onSubmit={handleSignup}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          />

          <input
            placeholder="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              background: "#1f1fff",
              color: "white",
              fontWeight: "600",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Signup
          </button>
        </form>

        {msg && (
          <p
            style={{
              marginTop: "12px",
              textAlign: "center",
              color: msg.includes("failed") ? "red" : "green",
              fontWeight: 500,
            }}
          >
            {msg}
          </p>
        )}

        <p
          style={{
            marginTop: "12px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <a href="/login" style={{ color: "#1f1fff" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
