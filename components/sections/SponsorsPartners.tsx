"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// Partner names (placeholders for logos)
const partners = [
  "PALO ALTO",
  "CROWDSTRIKE",
  "KASPERSKY",
  "FORTINET",
  "MANDIANT",
  "TENABLE",
  "SPLUNK",
  "RECORDED FUTURE",
];

export default function SponsorsPartners() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--black-light)",
        padding: "clamp(80px, 10vw, 140px) 0",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════
            HEADER — Centered
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          {/* Label with lines on both sides */}
          <div
            className="flex items-center justify-center gap-3"
            style={{ marginBottom: 16 }}
          >
            <span
              style={{
                width: 30,
                height: 1,
                background: "var(--orange)",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "var(--orange)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              Partners & Sponsors
            </span>
            <span
              style={{
                width: 30,
                height: 1,
                background: "var(--orange)",
              }}
            />
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-1.5px",
              color: "var(--white)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            The Companies Powering Our Events
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 16,
              color: "#808080",
              lineHeight: 1.6,
              maxWidth: 580,
              margin: "14px auto 0",
            }}
          >
            From global cybersecurity leaders to regional technology pioneers —
            the organizations that partner with EFG reach the GCC's most
            influential decision-makers.
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            UNIFIED LOGO GRID
            ═══════════════════════════════════════════════════════════════ */}
        <div
          className="partners-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {partners.map((partner, index) => {
            // Calculate row and column for diagonal wave delay
            const row = Math.floor(index / 4);
            const col = index % 4;
            const diagonalDelay = (row + col) * 0.05;

            return (
              <motion.div
                key={partner}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.96 }
                }
                transition={{
                  duration: 0.45,
                  delay: 0.3 + diagonalDelay,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
              >
                <PartnerCard name={partner} />
              </motion.div>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            CTA AREA
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          style={{ marginTop: 52, textAlign: "center" }}
        >
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 16,
              fontWeight: 400,
              color: "#606060",
              marginBottom: 20,
            }}
          >
            Your brand belongs here.
          </p>
          <PartnerCTA />
        </motion.div>
      </div>

      {/* Responsive grid styles */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .partners-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .partners-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * PartnerCard — Individual partner logo placeholder
 */
function PartnerCard({ name }: { name: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center justify-center transition-all duration-400"
      style={{
        background: "var(--black-card)",
        border: isHovered
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: 14,
        padding: "28px 36px",
        minHeight: 80,
        opacity: isHovered ? 0.85 : 0.4,
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: isHovered ? "0 8px 30px rgba(0, 0, 0, 0.2)" : "none",
        cursor: "default",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "1.5px",
          color: "rgba(255, 255, 255, 0.18)",
          textTransform: "uppercase",
        }}
      >
        {name}
      </span>
    </div>
  );
}

/**
 * PartnerCTA — Become a Partner button
 */
function PartnerCTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/sponsors-and-partners"
      className="inline-flex items-center gap-2 transition-all duration-400"
      style={{
        padding: "14px 32px",
        borderRadius: 50,
        border: isHovered
          ? "1px solid #E8651A"
          : "1px solid rgba(255, 255, 255, 0.15)",
        background: isHovered ? "rgba(232, 101, 26, 0.08)" : "transparent",
        fontFamily: "var(--font-outfit)",
        fontSize: 14.5,
        fontWeight: 500,
        color: "white",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>Become a Partner</span>
      <span
        className="transition-transform duration-300"
        style={{
          transform: isHovered ? "translateX(4px)" : "translateX(0)",
        }}
      >
        →
      </span>
    </Link>
  );
}
