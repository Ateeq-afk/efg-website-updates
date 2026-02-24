"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const CYBER_BLUE = "#01BBF5";

// Edition data
const editions = [
  {
    id: "uae",
    city: "Abu Dhabi, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    status: "completed",
    statusLabel: "COMPLETED",
    edition: "2nd Edition",
    date: "Feb 3, 2026",
    venue: "Rosewood Abu Dhabi",
    href: "/events/cyber-first/uae",
  },
  {
    id: "kuwait",
    city: "Kuwait City, Kuwait",
    image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&q=80",
    status: "upcoming",
    statusLabel: "UPCOMING — APR 21",
    edition: "3rd Edition",
    date: "Apr 21, 2026",
    venue: "Radisson Blu Kuwait",
    href: "/events/cyber-first/kuwait",
  },
  {
    id: "ksa",
    city: "Riyadh, KSA",
    image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=600&q=80",
    status: "coming-soon",
    statusLabel: "ANNOUNCING SOON",
    edition: "4th Edition",
    date: "Date TBA",
    venue: null,
    href: "/events/cyber-first/ksa",
  },
  {
    id: "qatar",
    city: "Doha, Qatar",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80",
    status: "coming-soon",
    statusLabel: "ANNOUNCING SOON",
    edition: "5th Edition",
    date: "Date TBA",
    venue: null,
    href: "/events/cyber-first/qatar",
  },
];

export default function EditionsMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--black-light)",
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
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3">
            <span
              style={{
                width: 30,
                height: 1,
                background: CYBER_BLUE,
              }}
            />
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
              Editions
            </span>
            <span
              style={{
                width: 30,
                height: 1,
                background: CYBER_BLUE,
              }}
            />
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
            Four Nations. Total Coverage.
          </h2>
        </motion.div>

        {/* Editions Grid */}
        <div
          className="editions-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {editions.map((edition, index) => (
            <motion.div
              key={edition.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
        @media (max-width: 640px) {
          .editions-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * EditionCard — City edition card with hover effects
 */
function EditionCard({
  edition,
}: {
  edition: (typeof editions)[0];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isConfirmed = edition.status !== "coming-soon";
  const isUpcoming = edition.status === "upcoming";

  return (
    <Link
      href={edition.href}
      className="edition-card relative block overflow-hidden cursor-pointer transition-all"
      style={{
        aspectRatio: "4 / 5",
        background: "#141414",
        border: `1px solid ${isHovered ? "rgba(1, 187, 245, 0.12)" : "rgba(1, 187, 245, 0.06)"}`,
        borderRadius: 18,
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        transitionDuration: "0.5s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={edition.image}
          alt=""
          className="w-full h-full object-cover transition-all"
          style={{
            filter: isHovered
              ? "brightness(0.35) saturate(0.8)"
              : "brightness(0.2) saturate(0.5)",
            transform: isHovered ? "scale(1.06)" : "scale(1)",
            transitionDuration: "0.6s",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 60%, rgba(10,10,10,0.5) 100%)`,
        }}
      />

      {/* Content */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ padding: 28 }}
      >
        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-1.5 ${isUpcoming ? "animate-pulse" : ""}`}
          style={{
            padding: "4px 10px",
            borderRadius: 4,
            background: isConfirmed
              ? "rgba(1, 187, 245, 0.1)"
              : "rgba(255, 255, 255, 0.03)",
            color: isConfirmed ? CYBER_BLUE : "#404040",
            fontFamily: "var(--font-outfit)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {isUpcoming && (
            <span
              className="relative flex h-1.5 w-1.5"
              style={{ marginRight: 2 }}
            >
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                style={{ background: CYBER_BLUE }}
              />
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ background: CYBER_BLUE }}
              />
            </span>
          )}
          {edition.statusLabel}
        </div>

        {/* City Name */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: "-0.5px",
            color: "var(--white)",
            marginTop: 12,
          }}
        >
          {edition.city}
        </h3>

        {/* Edition Info */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 14,
            fontWeight: 300,
            color: "#808080",
            marginTop: 6,
          }}
        >
          {edition.edition} · {edition.date}
          {edition.venue && ` · ${edition.venue}`}
        </p>

        {/* View Edition Link (on hover for confirmed) */}
        {isConfirmed && (
          <p
            className="transition-all"
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 12,
              fontWeight: 500,
              color: CYBER_BLUE,
              marginTop: 12,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateY(0)" : "translateY(8px)",
              transitionDuration: "0.3s",
            }}
          >
            View Edition →
          </p>
        )}
      </div>

      {/* Bottom Blue Glow Line (on hover) */}
      <div
        className="absolute bottom-0 left-0 right-0 transition-opacity"
        style={{
          height: 3,
          background: CYBER_BLUE,
          opacity: isHovered ? 0.8 : 0,
          transitionDuration: "0.4s",
        }}
      />
    </Link>
  );
}
