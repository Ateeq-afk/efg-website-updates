"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
// ═══════════════════════════════════════════════════════════════
// DESIGN CONSTANTS
// ═══════════════════════════════════════════════════════════════

const AMBER = "#C9935A";
const EASE = [0.16, 1, 0.3, 1] as const;

// Feature card data
const pillars = [
  {
    number: "01",
    title: "Curated Roundtables",
    description:
      "Hand-selected groups of 15–20 C-suite and VP-level executives, matched by industry vertical, challenge, and seniority. Every seat is earned.",
  },
  {
    number: "02",
    title: "Off-the-Record Dialogue",
    description:
      "Chatham House rules. No recordings, no press. The freedom to speak candidly about real challenges, real failures, and real strategies that work.",
  },
  {
    number: "03",
    title: "Sponsor Integration",
    description:
      "Each NetworkFirst session is hosted by a single strategic partner who shapes the agenda, selects the topic, and builds relationships in the most intimate setting possible.",
  },
];

const detailStrip = [
  { label: "15–20 Executives", icon: "users" },
  { label: "Chatham House Rule", icon: "shield" },
  { label: "Sponsor-Hosted", icon: "star" },
];

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function NetworkFirst() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#08080C",
        padding: "clamp(96px, 8vw, 120px) 0 clamp(48px, 5vw, 72px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════
          ATMOSPHERIC BACKGROUND — warm amber radial gradients
          ═══════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at 15% 30%, rgba(201,147,90,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 600px 500px at 85% 60%, rgba(201,147,90,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 400px 300px at 50% 80%, rgba(212,168,100,0.03) 0%, transparent 70%)
          `,
        }}
      />

      {/* NF Monogram watermark */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          right: "clamp(-40px, 5vw, 80px)",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(200px, 25vw, 400px)",
          fontWeight: 900,
          color: "rgba(201,147,90,0.025)",
          letterSpacing: "-15px",
          lineHeight: 0.85,
          whiteSpace: "nowrap",
        }}
      >
        NF
      </div>

      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          position: "relative",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════
            TOP ZONE — Editorial Hero Content
            ═══════════════════════════════════════════════════════════════ */}
        <div
          className="grid gap-12 lg:gap-16"
          style={{
            gridTemplateColumns: "1fr",
            maxWidth: 680,
          }}
        >
          {/* Format label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <div className="flex items-center gap-3">
              <span
                style={{
                  width: 36,
                  height: 1,
                  background: AMBER,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "3.5px",
                  color: AMBER,
                }}
              >
                Invitation-Only
              </span>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(36px, 5vw, 60px)",
                letterSpacing: "-2.5px",
                color: "white",
                lineHeight: 1.05,
                margin: "22px 0 0",
              }}
            >
              A Different Kind
              <br />
              <span style={{ color: AMBER }}>of Room</span>
            </h2>

            {/* Subhead */}
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontWeight: 300,
                fontSize: "clamp(15px, 1.4vw, 18px)",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                maxWidth: 520,
                margin: "20px 0 0",
              }}
            >
              Closed-door sessions for 15–20 hand-selected executives.
              No keynotes. No slides. No recordings. Just the conversations
              that move industries — held under Chatham House Rule.
            </p>

            {/* Details strip */}
            <div
              className="flex flex-wrap items-center gap-4 sm:gap-0"
              style={{ marginTop: 32 }}
            >
              {detailStrip.map((item, i) => (
                <div key={item.label} className="flex items-center">
                  {i > 0 && (
                    <div
                      className="hidden sm:block"
                      style={{
                        width: 1,
                        height: 16,
                        background: "rgba(201,147,90,0.15)",
                        margin: "0 20px",
                      }}
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <DetailIcon type={item.icon} />
                    <span
                      style={{
                        fontFamily: "var(--font-outfit)",
                        fontSize: 12,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.4)",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            BOTTOM ZONE — The Three Pillars
            ═══════════════════════════════════════════════════════════════ */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          style={{ marginTop: "clamp(56px, 7vw, 80px)" }}
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{
                duration: 0.6,
                delay: 0.6 + index * 0.12,
                ease: EASE,
              }}
            >
              <PillarCard {...pillar} />
            </motion.div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            BOTTOM CONTEXT LINE
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          <div
            style={{
              flex: 1,
              maxWidth: 100,
              height: 1,
              background: `rgba(201,147,90,0.08)`,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 12,
              fontWeight: 400,
              color: "#3A3A3A",
              textAlign: "center",
              margin: 0,
            }}
          >
            Hosted year-round across the GCC by strategic partners
          </p>
          <div
            style={{
              flex: 1,
              maxWidth: 100,
              height: 1,
              background: `rgba(201,147,90,0.08)`,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// PILLAR CARD — Left accent bar, no ghost number
// ═══════════════════════════════════════════════════════════════

function PillarCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden transition-all"
      style={{
        background: isHovered ? "rgba(201,147,90,0.04)" : "rgba(201,147,90,0.015)",
        border: `1px solid ${isHovered ? "rgba(201,147,90,0.18)" : "rgba(201,147,90,0.06)"}`,
        borderRadius: 16,
        padding: "32px 28px 32px 32px",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        transitionDuration: "0.4s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 transition-all duration-500"
        style={{
          width: 3,
          background: AMBER,
          opacity: isHovered ? 1 : 0.4,
        }}
      />

      {/* Number label */}
      <span
        className="transition-colors duration-400"
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "3px",
          color: isHovered ? AMBER : "rgba(201,147,90,0.35)",
          display: "block",
          marginBottom: 14,
        }}
      >
        {number}
      </span>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.3px",
          marginBottom: 10,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 13.5,
          fontWeight: 300,
          color: "#606060",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DETAIL ICONS — Small inline icons for the details strip
// ═══════════════════════════════════════════════════════════════

function DetailIcon({ type }: { type: string }) {
  const style = { color: AMBER, opacity: 0.5 };

  if (type === "users") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={style}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={style}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }

  // star
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={style}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
