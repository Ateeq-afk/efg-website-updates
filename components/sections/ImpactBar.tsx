"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Impact metrics data
const metrics = [
  { value: 5000, suffix: "+", label: "ATTENDEES", hasComma: true },
  { value: 12, suffix: "", label: "CITIES", hasComma: false },
  { value: 200, suffix: "+", label: "SPEAKERS", hasComma: false },
  { value: 8, suffix: "", label: "ANNUAL EVENTS", hasComma: false },
  { value: 50, suffix: "+", label: "PARTNERS", hasComma: false },
];

// Partner logos (text placeholders)
const partners = [
  "ARAMCO",
  "ADNOC",
  "STC",
  "NEOM",
  "DU",
  "PALO ALTO NETWORKS",
  "KASPERSKY",
  "CROWDSTRIKE",
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
      style={{
        background: "var(--black-light)",
        padding: "48px 0 56px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════
            METRICS ROW
            ═══════════════════════════════════════════════════════════════ */}
        <div className="metrics-row flex items-center justify-center flex-wrap gap-y-8">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="flex items-center">
              {/* Separator (before each except first) */}
              {index > 0 && (
                <div
                  className="separator hidden md:block"
                  style={{
                    width: 1,
                    height: 40,
                    background: "rgba(255, 255, 255, 0.06)",
                    margin: "0 48px",
                  }}
                />
              )}

              {/* Metric */}
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
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PARTNER TRUST BAR
            ═══════════════════════════════════════════════════════════════ */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          {/* Label */}
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#333333",
              marginBottom: 24,
            }}
          >
            Trusted by Industry Leaders
          </p>

          {/* Partner Names */}
          <div className="flex items-center justify-center flex-wrap gap-x-9 gap-y-4">
            {partners.map((partner) => (
              <span
                key={partner}
                className="transition-opacity duration-300 hover:opacity-65"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.13)",
                  opacity: 0.35,
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.65";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.35";
                }}
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mobile styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .metrics-row {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            gap: 32px !important;
            justify-items: center;
          }
          .metrics-row > div:last-child {
            grid-column: span 2;
          }
          .separator {
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
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now() + delay;
    const duration = 1800; // 1.8 seconds

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
        setAnimationComplete(true);
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
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(36px, 4vw, 52px)",
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
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          color: "#484848",
          marginTop: 6,
        }}
      >
        {label}
      </p>
    </div>
  );
}
