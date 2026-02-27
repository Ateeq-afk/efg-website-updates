"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const CYBER_BLUE = "#01BBF5";
const EASE = [0.16, 1, 0.3, 1] as const;

// Flagship — the upcoming edition
const flagship = {
  id: "kuwait",
  city: "Kuwait City",
  country: "Kuwait",
  image:
    "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1200&q=80",
  edition: "3rd Edition",
  date: new Date("2026-04-21T09:00:00"),
  dateString: "April 21, 2026",
  venue: "Jumeirah Messilah Beach Hotel",
  href: "/events/cyber-first/kuwait-april",
  external: false,
};

// Supporting editions
const supporting = [
  {
    id: "uae",
    city: "Abu Dhabi",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    status: "completed" as const,
    edition: "2nd Edition",
    dateString: "Feb 3, 2026",
    venue: "Rosewood Abu Dhabi",
    stat: "380+ Leaders",
    href: "https://uae.cyberfirstseries.com/",
    external: true,
  },
  {
    id: "qatar",
    city: "Doha",
    country: "Qatar",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80",
    status: "upcoming" as const,
    edition: "2nd Edition",
    dateString: "Apr 7, 2026",
    venue: null,
    stat: null,
    href: "https://qatar.cyberfirstseries.com/",
    external: true,
  },
  {
    id: "ksa",
    city: "Riyadh",
    country: "KSA",
    image:
      "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=600&q=80",
    status: "planned" as const,
    edition: "4th Edition",
    dateString: "2026",
    venue: null,
    stat: null,
    href: "/events/cyber-first/ksa",
    external: false,
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
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
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
              Editions
            </span>
            <span style={{ width: 30, height: 1, background: CYBER_BLUE }} />
          </div>

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

        {/* Flagship Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <FlagshipCard />
        </motion.div>

        {/* Supporting Editions Row */}
        <div
          className="editions-supporting"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
            marginTop: 14,
          }}
        >
          {supporting.map((edition, index) => (
            <motion.div
              key={edition.id}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.6,
                delay: 0.4 + index * 0.1,
                ease: EASE,
              }}
            >
              <SupportingCard edition={edition} />
            </motion.div>
          ))}
        </div>

        {/* Post-Event Reports Strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
          style={{ marginTop: 14 }}
        >
          <ReportsStrip />
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .editions-supporting {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * FlagshipCard — Cinematic wide banner for the upcoming edition
 */
function FlagshipCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [daysUntil, setDaysUntil] = useState(0);

  useEffect(() => {
    const calc = () => {
      const diff = flagship.date.getTime() - Date.now();
      setDaysUntil(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    };
    calc();
    const t = setInterval(calc, 60000);
    return () => clearInterval(t);
  }, []);

  const Wrapper = flagship.external ? "a" : Link;
  const linkProps = flagship.external
    ? { href: flagship.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: flagship.href };

  return (
    <Wrapper
      {...linkProps}
      className="flagship-card relative block overflow-hidden"
      style={{
        borderRadius: 20,
        border: isHovered
          ? "1px solid rgba(1, 187, 245, 0.15)"
          : "1px solid rgba(1, 187, 245, 0.06)",
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 80px rgba(1, 187, 245, 0.06)"
          : "none",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        textDecoration: "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flagship.image}
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: isHovered
              ? "brightness(0.3) saturate(0.7)"
              : "brightness(0.18) saturate(0.4)",
            transform: isHovered ? "scale(1.04)" : "scale(1)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 40%)`,
        }}
      />

      {/* Ambient Cyan Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -60,
          right: "15%",
          width: 300,
          height: 200,
          background: `radial-gradient(ellipse, rgba(1, 187, 245, ${isHovered ? 0.08 : 0.04}) 0%, transparent 70%)`,
          transition: "all 0.6s",
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flagship-content"
        style={{
          padding: "clamp(36px, 5vw, 56px) clamp(32px, 5vw, 56px)",
          minHeight: "clamp(260px, 28vw, 380px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* Upcoming Badge */}
        <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
              style={{ background: CYBER_BLUE }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: CYBER_BLUE }}
            />
          </span>
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: CYBER_BLUE,
            }}
          >
            Next Edition
          </span>
        </div>

        {/* City Name */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(36px, 4.5vw, 60px)",
            letterSpacing: "-2px",
            color: "var(--white)",
            lineHeight: 1,
            margin: 0,
          }}
        >
          {flagship.city}
        </h3>

        {/* Details Row */}
        <div
          className="flex flex-wrap items-center gap-2"
          style={{ marginTop: 12 }}
        >
          {[
            flagship.edition,
            flagship.dateString,
            flagship.venue,
          ].map((item, i, arr) => (
            <span key={item} className="flex items-center gap-2">
              <span
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 15,
                  fontWeight: 400,
                  color: "#808080",
                }}
              >
                {item}
              </span>
              {i < arr.length - 1 && (
                <span style={{ color: "#404040" }}>&middot;</span>
              )}
            </span>
          ))}
        </div>

        {/* Countdown + CTA Row */}
        <div
          className="flex flex-wrap items-center gap-6"
          style={{ marginTop: 20 }}
        >
          {/* Countdown */}
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(18px, 2vw, 24px)",
              color: CYBER_BLUE,
              letterSpacing: "-0.5px",
            }}
          >
            IN {daysUntil} DAYS
          </span>

          {/* Register CTA */}
          <span
            className="inline-flex items-center gap-2 transition-all"
            style={{
              padding: "10px 24px",
              borderRadius: 50,
              background: isHovered
                ? "rgba(1, 187, 245, 0.12)"
                : "rgba(1, 187, 245, 0.06)",
              border: isHovered
                ? `1px solid ${CYBER_BLUE}`
                : "1px solid rgba(1, 187, 245, 0.2)",
              fontFamily: "var(--font-outfit)",
              fontSize: 13,
              fontWeight: 500,
              color: CYBER_BLUE,
              transitionDuration: "0.4s",
            }}
          >
            Visit Event Site
            <span
              className="transition-transform"
              style={{
                transform: isHovered ? "translateX(3px)" : "translateX(0)",
                transitionDuration: "0.3s",
              }}
            >
              ↗
            </span>
          </span>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${CYBER_BLUE}, transparent)`,
          opacity: isHovered ? 0.8 : 0.3,
          transition: "opacity 0.4s",
        }}
      />
    </Wrapper>
  );
}

/**
 * SupportingCard — Compact card for completed / planned editions
 */
// Available post-event reports
const reports = [
  {
    id: "uae-2026",
    label: "Cyber First UAE 2026",
    href: "#", // placeholder — replace with actual PDF URL
  },
  {
    id: "kuwait-2025",
    label: "Cyber First Kuwait 2025",
    href: "#", // placeholder — replace with actual PDF URL
  },
];

/**
 * ReportsStrip — Slim dropdown for downloading post-event reports
 */
function ReportsStrip() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 20px",
        background: isHovered
          ? "rgba(255, 255, 255, 0.03)"
          : "rgba(255, 255, 255, 0.015)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: 12,
        transition: "all 0.3s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left — Label */}
      <div className="flex items-center gap-2.5">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={CYBER_BLUE}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.6 }}
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <polyline points="9 15 12 18 15 15" />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 13,
            fontWeight: 500,
            color: "#808080",
          }}
        >
          Post-Event Reports
        </span>
      </div>

      {/* Right — Dropdown Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 transition-all"
        style={{
          padding: "6px 14px",
          background: isOpen
            ? "rgba(1, 187, 245, 0.1)"
            : "rgba(1, 187, 245, 0.04)",
          border: isOpen
            ? `1px solid rgba(1, 187, 245, 0.3)`
            : "1px solid rgba(1, 187, 245, 0.12)",
          borderRadius: 8,
          fontFamily: "var(--font-outfit)",
          fontSize: 12,
          fontWeight: 500,
          color: CYBER_BLUE,
          cursor: "pointer",
          transitionDuration: "0.3s",
        }}
      >
        Select Edition
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke={CYBER_BLUE}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            minWidth: 220,
            background: "#141414",
            border: "1px solid rgba(1, 187, 245, 0.1)",
            borderRadius: 10,
            padding: "6px",
            zIndex: 50,
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5)",
          }}
        >
          {reports.map((report) => (
            <ReportItem
              key={report.id}
              report={report}
              onDownload={() => setIsOpen(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * ReportItem — Single downloadable report in the dropdown
 */
function ReportItem({
  report,
  onDownload,
}: {
  report: (typeof reports)[0];
  onDownload: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={report.href}
      download
      onClick={onDownload}
      className="flex items-center justify-between gap-3 transition-all"
      style={{
        padding: "10px 12px",
        borderRadius: 7,
        background: isHovered ? "rgba(1, 187, 245, 0.06)" : "transparent",
        textDecoration: "none",
        transitionDuration: "0.2s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 13,
          fontWeight: 400,
          color: isHovered ? "var(--white)" : "#909090",
          transition: "color 0.2s",
        }}
      >
        {report.label}
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={isHovered ? CYBER_BLUE : "#505050"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 0.2s", flexShrink: 0 }}
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </a>
  );
}

function SupportingCard({
  edition,
}: {
  edition: (typeof supporting)[0];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isCompleted = edition.status === "completed";
  const isPlanned = edition.status === "planned";
  const isUpcoming = edition.status === "upcoming";

  const CardWrapper = edition.external ? "a" : Link;
  const cardLinkProps = edition.external
    ? { href: edition.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: edition.href };

  return (
    <CardWrapper
      {...cardLinkProps}
      className="relative block overflow-hidden transition-all"
      style={{
        borderRadius: 14,
        border: isPlanned && !isUpcoming
          ? isHovered
            ? "1px dashed rgba(1, 187, 245, 0.12)"
            : "1px dashed rgba(255, 255, 255, 0.06)"
          : isHovered
            ? "1px solid rgba(1, 187, 245, 0.12)"
            : "1px solid rgba(255, 255, 255, 0.06)",
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: isHovered ? "0 12px 40px rgba(0, 0, 0, 0.3)" : "none",
        transitionDuration: "0.5s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: isPlanned && !isUpcoming ? 0.7 : 1,
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
          className="w-full h-full object-cover"
          style={{
            filter: isHovered
              ? `brightness(0.3) saturate(${isCompleted ? "0.3" : "0.6"})`
              : `brightness(0.15) saturate(${isCompleted ? "0" : "0.3"})`,
            transform: isHovered ? "scale(1.06)" : "scale(1)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.6) 100%)`,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10"
        style={{
          padding: "clamp(20px, 3vw, 28px)",
          minHeight: "clamp(140px, 14vw, 180px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* Status */}
        <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
          {isCompleted && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              style={{ opacity: 0.7 }}
            >
              <circle cx="8" cy="8" r="7" stroke={CYBER_BLUE} strokeWidth="1.5" />
              <path
                d="M5 8L7 10L11 6"
                stroke={CYBER_BLUE}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {isUpcoming && (
            <span className="relative flex h-1.5 w-1.5">
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
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: isCompleted || isUpcoming ? "rgba(1, 187, 245, 0.6)" : "#404040",
            }}
          >
            {isCompleted ? "Completed" : isUpcoming ? "Upcoming" : "Announcing Soon"}
          </span>
        </div>

        {/* City */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(20px, 2.2vw, 28px)",
            letterSpacing: "-0.5px",
            color: "var(--white)",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {edition.city}
          <span
            style={{
              fontWeight: 400,
              fontSize: "0.6em",
              color: "#606060",
              marginLeft: 8,
            }}
          >
            {edition.country}
          </span>
        </h3>

        {/* Info line */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 13,
            fontWeight: 300,
            color: "#606060",
            marginTop: 4,
          }}
        >
          {edition.edition} &middot; {edition.dateString}
          {edition.venue && ` · ${edition.venue}`}
        </p>

        {/* Stat for completed */}
        {isCompleted && edition.stat && (
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 12,
              fontWeight: 500,
              color: "rgba(1, 187, 245, 0.5)",
              marginTop: 6,
            }}
          >
            {edition.stat}
          </p>
        )}

        {/* Hover arrow */}
        <span
          className="transition-all"
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 12,
            fontWeight: 500,
            color: CYBER_BLUE,
            marginTop: 8,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateX(0)" : "translateX(-6px)",
            transitionDuration: "0.3s",
          }}
        >
          {isCompleted ? "View Recap" : isUpcoming ? "Visit Event Site" : "Learn More"}{" "}
          {edition.external ? "↗" : "→"}
        </span>
      </div>

      {/* Bottom accent */}
      {(isCompleted || isUpcoming) && (
        <div
          className="absolute bottom-0 left-0 right-0 transition-opacity"
          style={{
            height: 2,
            background: CYBER_BLUE,
            opacity: isHovered ? 0.5 : 0,
            transitionDuration: "0.4s",
          }}
        />
      )}
    </CardWrapper>
  );
}
