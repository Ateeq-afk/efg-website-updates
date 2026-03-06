"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CYBER_BLUE = "#01BBF5";
const EVENT_DATE = new Date("2026-04-21T09:00:00");

export default function MidPageCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const now = new Date();
    const diff = EVENT_DATE.getTime() - now.getTime();
    setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: `rgba(1, 187, 245, 0.03)`,
        borderTop: `1px solid rgba(1, 187, 245, 0.08)`,
        borderBottom: `1px solid rgba(1, 187, 245, 0.08)`,
        padding: "20px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {/* Left — Event info */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: CYBER_BLUE,
              display: "inline-block",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--white)",
            }}
          >
            Cyber First Kuwait
            <span style={{ color: "#505050", margin: "0 8px" }}>|</span>
            <span style={{ color: "#707070" }}>April 21, 2026</span>
          </span>
        </div>

        {/* Center — Countdown */}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14,
            fontWeight: 700,
            color: CYBER_BLUE,
            letterSpacing: "1px",
          }}
        >
          {daysLeft > 0 ? `${daysLeft} DAYS LEFT` : "EVENT DAY"}
        </span>

        {/* Right — CTA */}
        <a
          href="#register"
          style={{
            padding: "10px 24px",
            borderRadius: 50,
            background: CYBER_BLUE,
            color: "#0A0A0A",
            fontFamily: "var(--font-outfit)",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#33CCFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = CYBER_BLUE;
          }}
        >
          Register Now
        </a>
      </div>
    </motion.div>
  );
}
