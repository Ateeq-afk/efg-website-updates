"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CYBER_BLUE = "#01BBF5";

export default function CyberFirstNewsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing:", email);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--black-light)",
        padding: "clamp(60px, 8vw, 100px) 0",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: "-0.5px",
            color: "var(--white)",
            margin: 0,
          }}
        >
          Stay updated on Cyber First
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontWeight: 300,
            fontSize: 15,
            color: "#707070",
            lineHeight: 1.6,
            margin: "12px 0 24px",
          }}
        >
          Get notified about upcoming editions, speaker announcements, and
          early-bird registration.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex">
            {/* Email Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={{
                flex: 1,
                padding: "14px 22px",
                background: isFocused
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(255, 255, 255, 0.03)",
                border: isFocused
                  ? `1px solid rgba(1, 187, 245, 0.35)`
                  : "1px solid rgba(255, 255, 255, 0.08)",
                borderRight: "none",
                borderRadius: "60px 0 0 60px",
                color: "white",
                fontFamily: "var(--font-outfit)",
                fontSize: 15,
                fontWeight: 400,
                outline: "none",
                transition: "all 0.3s ease",
              }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="cf-newsletter-btn transition-all duration-300"
              style={{
                padding: "14px 28px",
                background: CYBER_BLUE,
                border: "none",
                borderRadius: "0 60px 60px 0",
                fontFamily: "var(--font-outfit)",
                fontSize: 15,
                fontWeight: 600,
                color: "#0A0A0A",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </div>
        </form>

        {/* Privacy Note */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 11,
            color: "#404040",
            marginTop: 14,
          }}
        >
          No spam, ever. Unsubscribe anytime.
        </p>
      </motion.div>

      <style jsx global>{`
        .cf-newsletter-btn:hover {
          background: #33ccff !important;
        }
        input::placeholder {
          color: #404040;
        }
      `}</style>
    </section>
  );
}
