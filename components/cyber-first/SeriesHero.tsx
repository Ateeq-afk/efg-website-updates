"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SeriesTickerBar from "@/components/ui/SeriesTickerBar";

// Cyber First accent color
const CYBER_BLUE = "#01BBF5";

// Edition data
const editions = [
  { id: "uae", label: "UAE", status: "completed" },
  { id: "kuwait", label: "KUWAIT", status: "upcoming" },
  { id: "ksa", label: "KSA", status: "coming-soon" },
  { id: "qatar", label: "QATAR", status: "coming-soon" },
];

// Stats data
const stats = [
  { value: 1500, suffix: "+", label: "SECURITY LEADERS" },
  { value: 4, suffix: "", label: "NATIONS" },
  { value: 80, suffix: "+", label: "SPEAKERS" },
  { value: 50, suffix: "+", label: "SPONSORS" },
];

// Easing function: easeOutExpo
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export default function SeriesHero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "var(--black)",
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.12) saturate(0.7)",
          }}
        />
      </div>

      {/* Blue atmosphere gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(1,187,245,0.03) 40%, rgba(10,10,10,0.95) 100%)`,
        }}
      />

      {/* Radial blue glow from bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 80%, rgba(1,187,245,0.06) 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{
          minHeight: "100vh",
          paddingTop: "12vh",
          paddingBottom: 80,
        }}
      >
        <div style={{ maxWidth: 900 }}>
          {/* Series Identity Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center gap-3"
          >
            <span
              style={{
                width: 40,
                height: 2,
                background: CYBER_BLUE,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: CYBER_BLUE,
                fontFamily: "var(--font-outfit)",
              }}
            >
              Cyber First Series
            </span>
            <span
              style={{
                width: 40,
                height: 2,
                background: CYBER_BLUE,
                display: "inline-block",
              }}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(48px, 7vw, 88px)",
              letterSpacing: "-3px",
              color: "var(--white)",
              lineHeight: 1.05,
              marginTop: 16,
            }}
          >
            Cyber First
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: "clamp(16px, 2vw, 22px)",
              color: `rgba(1, 187, 245, 0.7)`,
              letterSpacing: "1px",
              marginTop: 6,
            }}
          >
            The GCC&rsquo;s Definitive Cybersecurity Summit
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 15,
              color: "#909090",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "20px auto 0",
            }}
          >
            Where the region&rsquo;s CISOs, government cyber leaders, and security
            architects convene. Four nations. One platform. The conversations
            that define GCC cybersecurity happen here.
          </motion.p>

          {/* Edition Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-2.5"
            style={{ marginTop: 24 }}
          >
            {editions.map((edition) => (
              <EditionBadge key={edition.id} edition={edition} />
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4"
            style={{ marginTop: 28 }}
          >
            <Link
              href="/events/cyber-first/kuwait-april"
              className="inline-flex items-center gap-2 transition-all duration-300"
              style={{
                padding: "12px 28px",
                borderRadius: 50,
                background: CYBER_BLUE,
                color: "#0A0A0A",
                fontFamily: "var(--font-outfit)",
                fontSize: 14,
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#33CCFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = CYBER_BLUE;
              }}
            >
              <span>Next Edition — Kuwait</span>
              <span>→</span>
            </Link>
            <Link
              href="/sponsors-and-partners"
              className="inline-flex items-center gap-2 transition-all duration-300"
              style={{
                padding: "12px 28px",
                borderRadius: 50,
                background: "transparent",
                border: `1px solid rgba(1, 187, 245, 0.25)`,
                color: CYBER_BLUE,
                fontFamily: "var(--font-outfit)",
                fontSize: 14,
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(1, 187, 245, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span>Become a Sponsor</span>
              <span>→</span>
            </Link>
          </motion.div>

          {/* Stats Row - Floating in content area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="stats-row flex flex-wrap items-center justify-center"
            style={{
              marginTop: 32,
              gap: 40,
            }}
          >
            {stats.map((stat, index) => (
              <StatItem key={stat.label} stat={stat} delay={index * 100} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Ticker Bar - Absolute bottom */}
      <SeriesTickerBar
        accentColor={CYBER_BLUE}
        eventName="Cyber First Kuwait"
        location="Kuwait City, Kuwait"
        targetDate={new Date("2026-04-21T09:00:00")}
        ctaText="Register"
        ctaHref="/events/cyber-first/kuwait-april#register"
        angularRadius={false}
      />

      <style jsx global>{`
        @media (max-width: 768px) {
          .stats-row {
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * EditionBadge — Shows edition status
 */
function EditionBadge({
  edition,
}: {
  edition: { id: string; label: string; status: string };
}) {
  const isCompleted = edition.status === "completed";
  const isUpcoming = edition.status === "upcoming";

  return (
    <div
      className={`transition-all duration-300 ${isUpcoming ? "animate-pulse-glow" : ""}`}
      style={{
        padding: "6px 16px",
        borderRadius: 50,
        background: isCompleted ? "rgba(1, 187, 245, 0.12)" : "transparent",
        border: isCompleted
          ? "1px solid rgba(1, 187, 245, 0.25)"
          : isUpcoming
            ? "1px solid rgba(1, 187, 245, 0.3)"
            : "1px solid rgba(255, 255, 255, 0.08)",
        color: isCompleted || isUpcoming ? CYBER_BLUE : "#404040",
        boxShadow: isUpcoming ? "0 0 12px rgba(1, 187, 245, 0.15)" : "none",
        fontFamily: "var(--font-outfit)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "2px",
        textTransform: "uppercase",
      }}
    >
      {edition.label}
    </div>
  );
}

/**
 * StatItem — Counting stat with easeOutExpo
 */
function StatItem({
  stat,
  delay,
}: {
  stat: { value: number; suffix: string; label: string };
  delay: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);

  useEffect(() => {
    const startTime = Date.now() + delay + 900; // After hero animation
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
      const currentValue = Math.floor(easedProgress * stat.value);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(stat.value);
        if (stat.suffix) {
          setTimeout(() => setShowSuffix(true), 50);
        }
      }
    };

    requestAnimationFrame(animate);
  }, [stat.value, stat.suffix, delay]);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 26,
          color: "var(--white)",
          lineHeight: 1,
        }}
      >
        {displayValue.toLocaleString()}
        {stat.suffix && (
          <span
            style={{
              color: CYBER_BLUE,
              display: "inline-block",
              transform: showSuffix ? "scale(1)" : "scale(1.3)",
              opacity: showSuffix ? 1 : 0,
              transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
            }}
          >
            {stat.suffix}
          </span>
        )}
      </div>
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#505050",
          marginTop: 4,
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}
