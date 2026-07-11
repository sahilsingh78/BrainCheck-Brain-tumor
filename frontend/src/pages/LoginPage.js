import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/UI/Button";

const LoginPage = () => {
  const { login, guestLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // 🔹 prevent double submit

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(typeof err === "string" ? err : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    if (guestLoading) return;

    setError("");
    setGuestLoading(true);

    try {
      await guestLogin();
      navigate("/dashboard");
    } catch (err) {
      setError(typeof err === "string" ? err : "Guest login failed");
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-icon">🧠</div>
          <span className="auth-brand-name">
            Brain<span>Check</span>
          </span>
        </div>

        <h2>Welcome back</h2>
        <p className="subtitle">Sign in to your account to continue</p>

        {/* Error */}
        {error && <div className="alert alert-error">⚠ {error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="doctor@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="btn-primary btn-full"
            loading={loading}
            style={{ marginTop: 8 }}
          >
            Sign In
          </Button>
        </form>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            margin: "20px 0 4px",
          }}
        >
          <div style={{ flex: 1, height: 1, background: "var(--border, #e5e7eb)" }} />
          <span style={{ fontSize: 12, color: "var(--text-2)" }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "var(--border, #e5e7eb)" }} />
        </div>

        <Button
          type="button"
          className="btn-secondary btn-full"
          loading={guestLoading}
          onClick={handleGuestLogin}
          style={{ marginTop: 8 }}
        >
          Continue as Guest (Recruiter Demo)
        </Button>
        <p
          style={{
            marginTop: 8,
            textAlign: "center",
            color: "var(--text-2)",
            fontSize: 12,
          }}
        >
          Explore the full dashboard instantly — no signup required
        </p>

        {/* Footer */}
        <p
          style={{
            marginTop: 24,
            textAlign: "center",
            color: "var(--text-2)",
            fontSize: 13,
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "var(--accent)", fontWeight: 600 }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;