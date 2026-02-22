"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        // Use window.location for full page reload to update auth state
        window.location.href = "/admin";
      } else {
        setError("Login succeeded but no session returned");
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            EFG Admin
          </h1>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 14,
              color: "#606060",
              marginTop: 8,
            }}
          >
            Speakers & Sponsors Management
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-outfit)",
                fontSize: 12,
                fontWeight: 500,
                color: "#808080",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "#141414",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                fontFamily: "var(--font-outfit)",
                fontSize: 15,
                color: "#ffffff",
                outline: "none",
              }}
              placeholder="admin@eventsfirstgroup.com"
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-outfit)",
                fontSize: 12,
                fontWeight: 500,
                color: "#808080",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "#141414",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                fontFamily: "var(--font-outfit)",
                fontSize: 15,
                color: "#ffffff",
                outline: "none",
              }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: 8,
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 13,
                  color: "#ef4444",
                  margin: 0,
                }}
              >
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#404040" : "#E8651A",
              border: "none",
              borderRadius: 8,
              fontFamily: "var(--font-outfit)",
              fontSize: 15,
              fontWeight: 600,
              color: "#ffffff",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 12,
            color: "#404040",
            textAlign: "center",
            marginTop: 32,
          }}
        >
          Contact admin for access credentials
        </p>
      </div>
    </div>
  );
}
