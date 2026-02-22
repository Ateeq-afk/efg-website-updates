"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CYBER_BLUE = "#01BBF5";

// Edition timeline data
const editions = [
  {
    id: 1,
    year: "2025",
    name: "Cyber First Kuwait",
    edition: "1st Edition",
    date: "Apr 2025",
    city: "Kuwait City",
    venue: "Radisson Blu",
    status: "completed",
  },
  {
    id: 2,
    year: "2026",
    name: "Cyber First UAE",
    edition: "2nd Edition",
    date: "Feb 3, 2026",
    city: "Abu Dhabi",
    venue: "Rosewood Abu Dhabi",
    status: "completed",
  },
  {
    id: 3,
    year: "2026",
    name: "Cyber First Kuwait",
    edition: "3rd Edition",
    date: "Apr 21, 2026",
    city: "Kuwait City",
    venue: "Radisson Blu",
    status: "upcoming",
  },
  {
    id: 4,
    year: "2026",
    name: "Cyber First KSA",
    edition: "4th Edition",
    date: "TBA",
    city: "Riyadh",
    venue: null,
    status: "tba",
  },
  {
    id: 5,
    year: "2026",
    name: "Cyber First Qatar",
    edition: "5th Edition",
    date: "TBA",
    city: "Doha",
    venue: null,
    status: "tba",
  },
];

export default function PastEditionsTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--black)",
        padding: "clamp(60px, 8vw, 100px) 0",
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
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 40 }}
        >
          {/* Label */}
          <div className="flex items-center gap-3">
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
              Series History
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(28px, 3vw, 40px)",
              letterSpacing: "-1px",
              color: "var(--white)",
              lineHeight: 1.15,
              margin: "16px 0 0",
            }}
          >
            A Growing Legacy
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div
          className="timeline-scroll-container"
          style={{
            position: "relative",
            overflowX: "auto",
            overflowY: "visible",
            paddingBottom: 20,
          }}
        >
          {/* Timeline Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: 6,
              left: 0,
              right: 0,
              height: 1,
              background: `rgba(1, 187, 245, 0.12)`,
              transformOrigin: "left",
              minWidth: editions.length * 220,
            }}
          />

          {/* Timeline Nodes */}
          <div
            className="flex gap-4"
            style={{
              minWidth: editions.length * 220,
              paddingTop: 0,
            }}
          >
            {editions.map((edition, index) => (
              <motion.div
                key={edition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  position: "relative",
                  minWidth: 200,
                  maxWidth: 240,
                  flex: "0 0 auto",
                }}
              >
                <TimelineNode edition={edition} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .timeline-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(1, 187, 245, 0.2) transparent;
        }
        .timeline-scroll-container::-webkit-scrollbar {
          height: 4px;
        }
        .timeline-scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .timeline-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(1, 187, 245, 0.2);
          border-radius: 2px;
        }
        @media (max-width: 768px) {
          .timeline-scroll-container {
            scroll-snap-type: x mandatory;
          }
          .timeline-scroll-container > div > div {
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * TimelineNode — Individual edition node on timeline
 */
function TimelineNode({ edition }: { edition: (typeof editions)[0] }) {
  const isCompleted = edition.status === "completed";
  const isUpcoming = edition.status === "upcoming";
  const isTba = edition.status === "tba";

  return (
    <div style={{ position: "relative" }}>
      {/* Dot on timeline */}
      <div
        className={`${isUpcoming ? "animate-pulse" : ""}`}
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: isCompleted
            ? `rgba(1, 187, 245, 0.6)`
            : "transparent",
          border: isUpcoming
            ? `2px solid ${CYBER_BLUE}`
            : isTba
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "none",
          boxShadow: isUpcoming ? `0 0 12px rgba(1, 187, 245, 0.4)` : "none",
          marginBottom: 0,
        }}
      />

      {/* Vertical connector line */}
      <div
        style={{
          width: 1,
          height: 20,
          background: isTba
            ? "rgba(255, 255, 255, 0.06)"
            : `rgba(1, 187, 245, 0.15)`,
          marginLeft: 5.5,
        }}
      />

      {/* Card */}
      <div
        style={{
          background: "#141414",
          border: isTba
            ? "1px dashed rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: 12,
          padding: 20,
          opacity: isTba ? 0.5 : 1,
        }}
      >
        {/* Year */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 11,
            fontWeight: 700,
            color: `rgba(1, 187, 245, 0.5)`,
            margin: 0,
          }}
        >
          {edition.year}
        </p>

        {/* Edition Name */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--white)",
            margin: "6px 0 0",
          }}
        >
          {edition.name}
        </h3>

        {/* Details */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 12,
            color: "#606060",
            margin: "6px 0 0",
          }}
        >
          {edition.edition} · {edition.date}
        </p>

        {/* Venue */}
        {edition.venue && (
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 12,
              color: "#505050",
              margin: "2px 0 0",
            }}
          >
            {edition.venue}
          </p>
        )}

        {/* Status Badge */}
        <div
          style={{
            display: "inline-block",
            marginTop: 10,
            padding: "3px 8px",
            borderRadius: 4,
            background: isCompleted
              ? "rgba(1, 187, 245, 0.08)"
              : isUpcoming
                ? "rgba(1, 187, 245, 0.12)"
                : "rgba(255, 255, 255, 0.03)",
            fontFamily: "var(--font-outfit)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: isCompleted || isUpcoming ? CYBER_BLUE : "#404040",
          }}
        >
          {edition.status === "completed"
            ? "Completed"
            : edition.status === "upcoming"
              ? "Upcoming"
              : "Announcing Soon"}
        </div>
      </div>
    </div>
  );
}
