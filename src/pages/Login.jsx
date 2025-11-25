import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setMsg("");

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      login(res.data.token);

      setMsg("Logged in ✔ — Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
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
         CRM Pro — Welcome Back
      </div>

      {/* CARD */}
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
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          />

          <input
            type="password"
            placeholder="Password"
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
            Login
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
          Don’t have an account?{" "}
          <a href="/" style={{ color: "#1f1fff" }}>
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
