"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const OT_CRIMSON = "#D34B9A";

// Conference Chair data
const chair = {
  name: "Ali Al Kaf Alhashmi",
  title: "VP Cyber Security & Technology",
  company: "Mubadala",
  photo: "https://otsecurityfirst.com/wp-content/uploads/2026/01/Ali-Al-Kaf-Alhashmi.jpg",
  quote:
    "OT Security First brings together the region's most critical voices in industrial cybersecurity. This is where we move from reactive to proactive — where the defenders of our power grids, oil fields, and water systems share the hard-won lessons that keep nations running.",
};

export default function OTChairQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#0A0A0A",
        padding: "clamp(60px, 8vw, 100px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 50% at 20% 50%, ${OT_CRIMSON}08 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="quote-layout relative flex items-center gap-12"
        >
          {/* Left border accent */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              background: `linear-gradient(to bottom, ${OT_CRIMSON} 0%, ${OT_CRIMSON}40 100%)`,
              borderRadius: 2,
            }}
          />

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0"
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                overflow: "hidden",
                border: `3px solid ${OT_CRIMSON}40`,
                boxShadow: `0 0 40px ${OT_CRIMSON}20`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={chair.photo}
                alt={chair.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <div style={{ paddingLeft: 20 }}>
            {/* Quote mark */}
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 60,
                color: OT_CRIMSON,
                opacity: 0.3,
                lineHeight: 0,
                position: "absolute",
                top: -10,
                left: 160,
              }}
            >
              "
            </span>

            {/* Quote text */}
            <blockquote
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(16px, 2vw, 20px)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "#C0C0C0",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {chair.quote}
            </blockquote>

            {/* Attribution */}
            <div style={{ marginTop: 24 }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--white)",
                  margin: 0,
                }}
              >
                {chair.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 13,
                  fontWeight: 400,
                  color: "#707070",
                  margin: "4px 0 0",
                }}
              >
                {chair.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 12,
                  fontWeight: 500,
                  color: `${OT_CRIMSON}B3`,
                  margin: "2px 0 0",
                }}
              >
                {chair.company} · Conference Chair
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .quote-layout {
            flex-direction: column !important;
            text-align: center !important;
            gap: 24px !important;
          }
          .quote-layout > div:last-child {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
