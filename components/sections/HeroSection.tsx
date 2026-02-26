"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Hero images from S3 bucket
const S3_BASE = "https://efg-final.s3.eu-north-1.amazonaws.com/Good";

const heroImages = [
  `${S3_BASE}/4N8A0005.JPG`,
  `${S3_BASE}/4N8A0133.JPG`,
  `${S3_BASE}/4N8A0050.JPG`,
  `${S3_BASE}/4N8A0375.JPG`,
  `${S3_BASE}/4N8A0035.JPG`,
];

// Next event data for the countdown
const nextEvent = {
  name: "Cyber First Kuwait",
  location: "Kuwait City, Kuwait",
  date: new Date("2026-04-21T09:00:00"),
};

// Slideshow timing
const SLIDE_DURATION = 3500; // 3.5 seconds per image
const CROSSFADE_DURATION = 1.2; // 1.2 second crossfade

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Hero images from S3
  const imageSources = heroImages;

  // Parallax scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (imageSources.length === 0) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imageSources.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [imageSources.length]);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{
        height: "100vh",
        background: "transparent",
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════
          LAYER 1: BACKGROUND IMAGE SLIDESHOW
          Like memories fading into one another
          ═══════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
          willChange: "transform",
        }}
      >
        <AnimatePresence mode="sync">
          {imageSources.map((src, index) => (
            index === activeIndex && (
              <motion.div
                key={`${src}-${index}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: CROSSFADE_DURATION,
                  ease: "easeInOut",
                }}
              >
                <HeroImage src={src} isActive={index === activeIndex} />
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 2: GRADIENT OVERLAY
          Dark top for nav, hint of image in middle, dark bottom for transition
          ═══════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background: `
            linear-gradient(
              to right,
              rgba(10, 10, 10, 0.85) 0%,
              rgba(10, 10, 10, 0.6) 45%,
              rgba(10, 10, 10, 0.25) 75%,
              rgba(10, 10, 10, 0.15) 100%
            ),
            linear-gradient(
              to bottom,
              rgba(10, 10, 10, 0.5) 0%,
              rgba(10, 10, 10, 0.1) 35%,
              rgba(10, 10, 10, 0.15) 65%,
              rgba(10, 10, 10, 0.95) 100%
            )
          `,
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 3: VIGNETTE
          Radial darkening pulling the eye inward
          ═══════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none z-2"
        style={{
          background: `radial-gradient(
            ellipse 70% 60% at 50% 45%,
            transparent 0%,
            rgba(10, 10, 10, 0.55) 100%
          )`,
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 4: FILM GRAIN — SUBTLE CINEMA TEXTURE
          ═══════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 5: HERO CONTENT — VERTICALLY CENTERED
          ═══════════════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 flex items-center px-6 hero-content-wrapper"
        style={{
          height: "100%",
          paddingTop: 160,
          paddingBottom: 100,
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(20px, 4vw, 60px)", width: "100%" }}>
          {/* Main Headline — Geometric, Bold, Left-aligned with accent bar */}
          <div style={{ marginBottom: 24, display: "flex", gap: 20 }}>
            {/* Orange vertical accent bar */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                width: 4,
                background: "linear-gradient(to bottom, var(--orange), var(--orange-bright))",
                borderRadius: 2,
                transformOrigin: "top",
                flexShrink: 0,
                alignSelf: "stretch",
              }}
            />
            <h1
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 800,
                fontStyle: "normal",
                fontSize: "clamp(46px, 7vw, 88px)",
                lineHeight: 1.05,
                letterSpacing: "-2px",
                color: "var(--white)",
                textAlign: "left",
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="block"
                style={{ fontStyle: "normal" }}
              >
                Built for the
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="block"
                style={{ fontStyle: "normal" }}
              >
                Leaders
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="block"
                style={{ fontStyle: "normal" }}
              >
                Who Build
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="block"
                style={{
                  fontStyle: "normal",
                  background: "linear-gradient(90deg, #FFFFFF 0%, #E8651A 30%, #FF7A2E 60%, #FFFFFF 100%)",
                  backgroundSize: "300% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 5s ease-in-out infinite alternate",
                }}
              >
                the Region.
              </motion.span>
            </h1>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: "clamp(15px, 1.4vw, 18px)",
              lineHeight: 1.7,
              color: "#A0A0A0",
              maxWidth: 560,
              marginBottom: 48,
            }}
          >
            Curating world-class events that drive industry transformation
            across cybersecurity, digital, and AI in the GCC.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            {/* Primary Button */}
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 transition-all duration-300"
              style={{
                padding: "16px 36px",
                borderRadius: 60,
                background: "var(--orange)",
                color: "white",
                fontFamily: "var(--font-outfit)",
                fontSize: 15,
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--orange-bright)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 40px var(--orange-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--orange)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span>Explore Events</span>
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{ fontSize: 16 }}
              >
                →
              </span>
            </Link>

            {/* Ghost Button */}
            <Link
              href="/sponsors-and-partners"
              className="transition-all duration-300"
              style={{
                padding: "16px 36px",
                borderRadius: 60,
                background: "transparent",
                color: "var(--white)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontFamily: "var(--font-outfit)",
                fontSize: 15,
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
              }}
            >
              Become a Partner
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDESHOW INDICATORS — Subtle dots showing current image
          ═══════════════════════════════════════════════════════════════ */}
      {imageSources.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute flex flex-col items-center gap-2 z-10"
          style={{ bottom: 100, right: 40 }}
        >
          {imageSources.map((_, index) => (
            <div
              key={index}
              className="transition-all duration-400"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: index === activeIndex ? "#E8651A" : "rgba(255, 255, 255, 0.2)",
                boxShadow: index === activeIndex ? "0 0 8px rgba(232, 101, 26, 0.5)" : "none",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          COUNTDOWN TICKER — Fixed at viewport bottom
          ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          background: "rgba(10, 10, 10, 0.7)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          padding: "15px 0",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 clamp(20px, 4vw, 60px)",
          }}
        >
          {/* Left side: Event info */}
          <div className="flex items-center gap-3">
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                style={{ background: "var(--orange)", animationDuration: "2s" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "var(--orange)" }}
              />
            </span>

            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "var(--white-muted)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              Next Up
            </span>

            <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>

            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--white)",
                fontFamily: "var(--font-display)",
              }}
            >
              {nextEvent.name}
            </span>

            <span
              style={{
                fontSize: 13,
                color: "var(--white-dim)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              · {nextEvent.location}
            </span>
          </div>

          {/* Right side: Countdown + Register */}
          <div className="flex items-center gap-6">
            <CountdownDisplay date={nextEvent.date} />

            <Link
              href="/events/cyber-first/kuwait-april-2026"
              className="transition-colors duration-300 flex items-center gap-1"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--orange)",
                fontFamily: "var(--font-outfit)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--orange-bright)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--orange)";
              }}
            >
              Register <span>→</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Shimmer animation keyframes */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (max-width: 768px) {
          .hero-content-wrapper {
            padding-bottom: 140px !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * HeroImage — Individual slideshow image with Ken Burns effect
 */
function HeroImage({
  src,
  isActive,
}: {
  src: string;
  isActive: boolean;
}) {
  // Ken Burns: scale from 1.0 to 1.05 over slide duration while active
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        transform: isActive ? "scale(1.05)" : "scale(1)",
        transition: `transform ${SLIDE_DURATION}ms ease-out`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="w-full h-[120%] object-cover"
        style={{
          filter: "brightness(0.6)",
          transition: "filter 0.5s ease",
        }}
      />
    </div>
  );
}

/**
 * CountdownDisplay — The live countdown numbers
 */
function CountdownDisplay({ date }: { date: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = date.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return (
    <div className="flex items-center gap-1">
      <CountdownUnit value={timeLeft.days} label="D" />
      <span style={{ color: "rgba(232, 101, 26, 0.4)", fontSize: 18 }}>:</span>
      <CountdownUnit value={timeLeft.hours} label="H" />
      <span style={{ color: "rgba(232, 101, 26, 0.4)", fontSize: 18 }}>:</span>
      <CountdownUnit value={timeLeft.minutes} label="M" />
      <span style={{ color: "rgba(232, 101, 26, 0.4)", fontSize: 18 }}>:</span>
      <CountdownUnit value={timeLeft.seconds} label="S" />
    </div>
  );
}

/**
 * CountdownUnit — Individual countdown number display
 */
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-0.5">
      <span
        className="tabular-nums"
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "var(--white)",
          fontFamily: "var(--font-display)",
          minWidth: 32,
          textAlign: "center",
        }}
      >
        {value.toString().padStart(2, "0")}
      </span>
      <span
        style={{
          fontSize: 9,
          textTransform: "uppercase",
          color: "var(--white-muted)",
          fontFamily: "var(--font-outfit)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
