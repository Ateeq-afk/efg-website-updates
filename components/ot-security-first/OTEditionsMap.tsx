"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const OT_CRIMSON = "#D34B9A";
const OT_FIREBRICK = "#E86BB8";

// Four GCC cities
const editions = [
  {
    id: 1,
    city: "Abu Dhabi",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    edition: "1st Edition",
    date: "Feb 4, 2026",
    venue: "Rosewood Abu Dhabi",
    status: "completed",
  },
  {
    id: 2,
    city: "Riyadh",
    country: "KSA",
    image:
      "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=600&q=80",
    edition: "Edition TBA",
    date: "Date TBA",
    venue: null,
    status: "upcoming",
  },
  {
    id: 3,
    city: "Kuwait City",
    country: "Kuwait",
    image:
      "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&q=80",
    edition: "Edition TBA",
    date: "Date TBA",
    venue: null,
    status: "upcoming",
  },
  {
    id: 4,
    city: "Doha",
    country: "Qatar",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80",
    edition: "Edition TBA",
    date: "Date TBA",
    venue: null,
    status: "upcoming",
  },
];

export default function OTEditionsMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#111111",
        padding: "clamp(80px, 10vw, 130px) 0",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3">
            <span style={{ width: 30, height: 1, background: OT_CRIMSON }} />
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: OT_CRIMSON,
              }}
            >
              Editions
            </span>
            <span style={{ width: 30, height: 1, background: OT_CRIMSON }} />
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
              margin: "20px 0 0",
            }}
          >
            Expanding Across the GCC
          </h2>
        </motion.div>

        {/* Edition Cards Grid - 4 columns */}
        <div
          className="editions-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
          }}
        >
          {editions.map((edition, index) => (
            <motion.div
              key={edition.id}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <EditionCard edition={edition} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .editions-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .editions-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * EditionCard — Individual city edition card with portrait aspect ratio
 */
function EditionCard({ edition }: { edition: (typeof editions)[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const isCompleted = edition.status === "completed";

  return (
    <div
      className="relative overflow-hidden transition-all"
      style={{
        aspectRatio: "4 / 5",
        borderRadius: 10,
        background: "#0a0a0a",
        border: isHovered
          ? `1px solid rgba(139, 0, 0, 0.3)`
          : "1px solid rgba(255, 255, 255, 0.05)",
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        transitionDuration: "0.5s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: isCompleted ? "pointer" : "default",
        opacity: isCompleted ? 1 : 0.6,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={edition.image}
          alt={edition.city}
          loading="lazy"
          className="w-full h-full object-cover transition-all"
          style={{
            filter: isHovered
              ? "brightness(0.35) saturate(0.6)"
              : "brightness(0.2) saturate(0.5)",
            transform: isHovered ? "scale(1.06)" : "scale(1)",
            transitionDuration: "0.6s",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Crimson bottom glow on hover for completed */}
      {isCompleted && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity"
          style={{
            background: `linear-gradient(to top, rgba(139,0,0,${isHovered ? 0.25 : 0}) 0%, transparent 40%)`,
            opacity: isHovered ? 1 : 0,
            transitionDuration: "0.5s",
          }}
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ padding: 20 }}
      >
        {/* Status Badge */}
        <span
          style={{
            display: "inline-block",
            padding: "4px 10px",
            background: isCompleted
              ? "rgba(139, 0, 0, 0.15)"
              : "rgba(255, 255, 255, 0.05)",
            border: isCompleted
              ? `1px solid ${OT_CRIMSON}40`
              : "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 4,
            fontFamily: "var(--font-outfit)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: isCompleted ? OT_CRIMSON : "#505050",
            marginBottom: 12,
          }}
        >
          {isCompleted ? "Completed" : "Announcing Soon"}
        </span>

        {/* City Name */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 800,
            color: "var(--white)",
            margin: 0,
          }}
        >
          {edition.city}, {edition.country}
        </h3>

        {/* Edition Details */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 12,
            fontWeight: 400,
            color: "#707070",
            marginTop: 6,
          }}
        >
          {edition.edition} · {edition.date}
          {edition.venue && ` · ${edition.venue}`}
        </p>
      </div>

      {/* Left edge bar on hover (industrial indicator) */}
      <div
        className="absolute left-0 top-0 bottom-0 transition-all"
        style={{
          width: 3,
          background: OT_CRIMSON,
          opacity: isHovered && isCompleted ? 1 : 0,
          transitionDuration: "0.3s",
        }}
      />
    </div>
  );
}
