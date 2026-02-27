"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// S3 bucket for background image
const S3_BASE = "https://efg-final.s3.eu-north-1.amazonaws.com/Good";
const BG_IMAGE = `${S3_BASE}/4N8A0133.JPG`;

// Impact metrics data
const metrics = [
  { value: 5000, suffix: "+", label: "SENIOR EXECUTIVES", hasComma: true },
  { value: 12, suffix: "", label: "CITIES ACROSS THE GCC", hasComma: false },
  { value: 200, suffix: "+", label: "EXPERT SPEAKERS", hasComma: false },
  { value: 8, suffix: "", label: "ANNUAL EVENTS", hasComma: false },
  { value: 50, suffix: "+", label: "STRATEGIC PARTNERS", hasComma: false },
];

// Easing function: easeOutExpo
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export default function ImpactBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "#0A0A0A",
        padding: "clamp(96px, 8vw, 120px) 0 clamp(48px, 6vw, 80px)",
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG_IMAGE}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.2) saturate(0.6)" }}
          loading="lazy"
        />
      </div>

      {/* Left-to-right gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              to right,
              rgba(10, 10, 10, 0.7) 0%,
              rgba(10, 10, 10, 0.4) 50%,
              rgba(10, 10, 10, 0.2) 100%
            )
          `,
        }}
      />

      {/* Top/bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(10, 10, 10, 0.9) 0%,
              rgba(10, 10, 10, 0.1) 25%,
              rgba(10, 10, 10, 0.1) 75%,
              rgba(10, 10, 10, 0.9) 100%
            )
          `,
        }}
      />

      <div
        className="relative z-10"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
          style={{ marginBottom: 24 }}
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
            The Region&apos;s Platform
          </span>
        </motion.div>

        {/* Editorial Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(36px, 5.5vw, 72px)",
            letterSpacing: "-2px",
            lineHeight: 1.08,
            maxWidth: 900,
            margin: "0 0 clamp(32px, 4vw, 48px) 0",
          }}
        >
          <span style={{ color: "var(--white)" }}>
            The GCC&apos;s most senior technology leaders don&apos;t attend events.
          </span>
          <br />
          <span style={{ color: "rgba(255, 255, 255, 0.25)" }}>
            They build the future at EFG.
          </span>
        </motion.h2>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="impact-stats-row flex items-start flex-wrap gap-y-8"
          style={{ gap: "0 clamp(32px, 4vw, 64px)" }}
        >
          {metrics.map((metric, index) => (
            <div key={metric.label} className="flex items-start">
              {/* Separator */}
              {index > 0 && (
                <div
                  className="impact-separator hidden md:block"
                  style={{
                    width: 1,
                    height: 48,
                    background: "rgba(255, 255, 255, 0.08)",
                    marginRight: "clamp(32px, 4vw, 64px)",
                    flexShrink: 0,
                  }}
                />
              )}

              <CountingMetric
                value={metric.value}
                suffix={metric.suffix}
                label={metric.label}
                hasComma={metric.hasComma}
                delay={index * 150}
                isInView={isInView}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .impact-stats-row {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            gap: 32px !important;
          }
          .impact-separator {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * CountingMetric — Animated number counter with easeOutExpo
 */
function CountingMetric({
  value,
  suffix,
  label,
  hasComma,
  delay,
  isInView,
}: {
  value: number;
  suffix: string;
  label: string;
  hasComma: boolean;
  delay: number;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now() + delay;
    const duration = 1800;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = Math.floor(easedProgress * value);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        if (suffix) {
          setTimeout(() => setShowSuffix(true), 50);
        }
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, delay, suffix]);

  const formattedValue = hasComma
    ? displayValue.toLocaleString()
    : displayValue.toString();

  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(28px, 3vw, 42px)",
          letterSpacing: "-1.5px",
          color: "var(--white)",
          lineHeight: 1,
        }}
      >
        {formattedValue}
        {suffix && (
          <span
            style={{
              color: "#E8651A",
              display: "inline-block",
              transform: showSuffix ? "scale(1)" : "scale(1.3)",
              opacity: showSuffix ? 1 : 0,
              transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
            }}
          >
            {suffix}
          </span>
        )}
      </div>
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "rgba(255, 255, 255, 0.35)",
          marginTop: 8,
        }}
      >
        {label}
      </p>
    </div>
  );
}
