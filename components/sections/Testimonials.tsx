"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Testimonial data
const testimonials = [
  {
    id: 1,
    quote:
      "This isn't your typical industry event. Every person I spoke with was a decision-maker. The conversations were real, the connections were lasting, and I left with three partnerships that we're still building on today.",
    name: "Sarah Al-Rashid",
    title: "VP of Information Security, Saudi Telecom",
    badge: "Cyber First Dubai",
    badgeColor: "#01BBF5",
  },
  {
    id: 2,
    quote:
      "We've sponsored technology events across the globe. Nothing matches the quality of audience that EFG delivers in the GCC. These are the people who sign the purchase orders.",
    name: "Mark Henderson",
    title: "Regional Director, Palo Alto Networks",
    badge: "Sponsor — Cyber First",
    badgeColor: "#E8651A",
  },
  {
    id: 3,
    quote:
      "The NetworkFirst boardroom was the most productive two hours of my quarter. Fifteen CISOs, no cameras, no agenda — just honest conversation about the problems we're all facing.",
    name: "Dr. Fatima Al-Kuwari",
    title: "CISO, Qatar National Bank",
    badge: "NetworkFirst Boardroom",
    badgeColor: "#E8651A",
  },
];

const ROTATION_INTERVAL = 6000; // 6 seconds

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start/restart auto-rotation
  const startRotation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, ROTATION_INTERVAL);
  }, []);

  // Handle dot click
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    startRotation(); // Reset timer
  };

  // Auto-rotation effect
  useEffect(() => {
    startRotation();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startRotation]);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "var(--black-light)",
        padding: "clamp(80px, 10vw, 130px) 0",
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════
          BACKGROUND TEXTURE LAYERS
          ═══════════════════════════════════════════════════════════════ */}
      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 100%, rgba(232, 101, 26, 0.04) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 0% 50%, rgba(232, 101, 26, 0.02) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(232, 101, 26, 0.02) 0%, transparent 50%)
          `,
        }}
      />

      {/* Diagonal line pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.012,
          backgroundImage: `
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.15) 40px,
              rgba(255,255,255,0.15) 41px
            )
          `,
        }}
      />

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Background Quote Mark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "400px",
          color: "rgba(255, 255, 255, 0.02)",
          fontWeight: 800,
          zIndex: 0,
        }}
      >
        "
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          CONTENT
          ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center"
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        {/* Label with lines */}
        <div className="flex items-center justify-center gap-4">
          <span
            style={{
              width: 40,
              height: 1,
              background: "rgba(232, 101, 26, 0.4)",
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
            What People Say
          </span>
          <span
            style={{
              width: 40,
              height: 1,
              background: "rgba(232, 101, 26, 0.4)",
            }}
          />
        </div>

        {/* Quote Mark */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 72,
            fontWeight: 800,
            color: "rgba(232,101,26,0.15)",
            lineHeight: 1,
            marginTop: 24,
            marginBottom: 8,
          }}
        >
          "
        </div>

        {/* Quote Display Area */}
        <div style={{ minHeight: 200, position: "relative" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Quote Text */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontStyle: "italic",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.6,
                  letterSpacing: "-0.3px",
                  margin: 0,
                }}
              >
                {activeTestimonial.quote}
              </p>

              {/* Attribution */}
              <div style={{ marginTop: 28 }}>
                {/* Name */}
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "white",
                    letterSpacing: "0.2px",
                    margin: 0,
                  }}
                >
                  {activeTestimonial.name}
                </p>

                {/* Title */}
                <p
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: 13,
                    fontWeight: 400,
                    color: "#606060",
                    marginTop: 4,
                  }}
                >
                  {activeTestimonial.title}
                </p>

                {/* Series Badge */}
                <div
                  className="inline-flex items-center justify-center"
                  style={{
                    marginTop: 10,
                    padding: "4px 12px",
                    borderRadius: 50,
                    background: `${activeTestimonial.badgeColor}14`,
                    border: `1px solid ${activeTestimonial.badgeColor}26`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-outfit)",
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: activeTestimonial.badgeColor,
                    }}
                  >
                    {activeTestimonial.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div
          className="flex items-center justify-center gap-2.5"
          style={{ marginTop: 32 }}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="transition-all"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background:
                  index === activeIndex ? "#E8651A" : "rgba(255,255,255,0.15)",
                boxShadow:
                  index === activeIndex
                    ? "0 0 8px rgba(232, 101, 26, 0.3)"
                    : "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transitionDuration: "0.4s",
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
