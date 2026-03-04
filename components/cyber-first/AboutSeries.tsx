"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CYBER_BLUE = "#01BBF5";
const EASE = [0.16, 1, 0.3, 1] as const;

// Outcome cards — what attendees walk away with
const outcomes = [
  {
    id: "intelligence",
    number: "01",
    title: "Threat Intelligence You Can Act On",
    description:
      "Not theory — real threat briefings from practitioners defending GCC networks right now. Walk out with a playbook, not just notes.",
  },
  {
    id: "peer-access",
    number: "02",
    title: "Direct Access to Your Peers",
    description:
      "Structured roundtables and closed-door sessions with CISOs who face the same regulatory, cultural, and operational challenges you do.",
  },
  {
    id: "vendor-clarity",
    number: "03",
    title: "Vendor Clarity, Not Noise",
    description:
      "Curated solution showcases from vetted partners. No expo-floor chaos — just focused demonstrations matched to real GCC use cases.",
  },
  {
    id: "regulatory",
    number: "04",
    title: "Regulatory Foresight",
    description:
      "Hear directly from national cyber authorities. Understand what's coming before it's mandated — from UAE's NESA to Saudi's NCA and beyond.",
  },
  {
    id: "partnerships",
    number: "05",
    title: "Partnerships That Last",
    description:
      "Every edition is a reunion. The relationships built at Cyber First compound over years, creating a regional security network that works.",
  },
  {
    id: "strategy",
    number: "06",
    title: "Board-Ready Strategy",
    description:
      "Sessions designed for leaders who report to boards. Take back frameworks, metrics, and narratives that translate security into business language.",
  },
];

export default function AboutSeries() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--black)",
        padding: "clamp(48px, 6vw, 80px) 0",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3">
            <span style={{ width: 30, height: 1, background: CYBER_BLUE }} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: CYBER_BLUE,
                fontFamily: "var(--font-outfit)",
              }}
            >
              Outcomes
            </span>
            <span style={{ width: 30, height: 1, background: CYBER_BLUE }} />
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(30px, 3.5vw, 48px)",
              letterSpacing: "-1.5px",
              color: "var(--white)",
              lineHeight: 1.1,
              margin: "16px 0 0",
            }}
          >
            What You Walk Away With
          </h2>

          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 16,
              color: "#707070",
              maxWidth: 580,
              margin: "16px auto 0",
              lineHeight: 1.7,
            }}
          >
            Every element of Cyber First is designed for one thing — giving
            senior security leaders something they can use the moment they
            return to their desks.
          </p>
        </motion.div>

        {/* Outcomes Grid */}
        <div
          className="outcomes-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + index * 0.07,
                ease: EASE,
              }}
            >
              <OutcomeCard outcome={outcome} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .outcomes-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .outcomes-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * OutcomeCard — Single outcome with hover effect
 */
function OutcomeCard({
  outcome,
}: {
  outcome: { number: string; title: string; description: string };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px 28px",
        background: hovered ? "#141414" : "#111111",
        border: `1px solid ${hovered ? "rgba(1, 187, 245, 0.1)" : "rgba(255, 255, 255, 0.04)"}`,
        borderRadius: 16,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        cursor: "default",
        height: "100%",
      }}
    >
      {/* Number */}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 13,
          color: hovered ? CYBER_BLUE : "rgba(1, 187, 245, 0.35)",
          transition: "color 0.3s",
          letterSpacing: "1px",
        }}
      >
        {outcome.number}
      </span>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 18,
          color: "var(--white)",
          letterSpacing: "-0.3px",
          lineHeight: 1.3,
          margin: "14px 0 0",
        }}
      >
        {outcome.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontWeight: 300,
          fontSize: 14,
          color: "#707070",
          lineHeight: 1.7,
          margin: "10px 0 0",
        }}
      >
        {outcome.description}
      </p>
    </div>
  );
}
