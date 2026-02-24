"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CYBER_BLUE = "#01BBF5";
const EASE = [0.16, 1, 0.3, 1] as const;

// Full series timeline — past + future
const timeline = [
  {
    id: 1,
    label: "1st Edition",
    name: "Cyber First Kuwait",
    date: "Apr 2025",
    city: "Kuwait City",
    venue: "Radisson Blu",
    status: "completed" as const,
  },
  {
    id: 2,
    label: "2nd Edition",
    name: "Cyber First UAE",
    date: "Feb 2026",
    city: "Abu Dhabi",
    venue: "Rosewood Abu Dhabi",
    status: "completed" as const,
  },
  {
    id: 3,
    label: "3rd Edition",
    name: "Cyber First Kuwait",
    date: "Apr 21, 2026",
    city: "Kuwait City",
    venue: "Radisson Blu",
    status: "upcoming" as const,
  },
  {
    id: 4,
    label: "4th Edition",
    name: "Cyber First KSA",
    date: "2026",
    city: "Riyadh",
    venue: null,
    status: "planned" as const,
  },
  {
    id: 5,
    label: "5th Edition",
    name: "Cyber First Qatar",
    date: "2026",
    city: "Doha",
    venue: null,
    status: "planned" as const,
  },
];

export default function SeriesTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--black)",
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
              Series Journey
            </span>
            <span style={{ width: 30, height: 1, background: CYBER_BLUE }} />
          </div>

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
            Built to Scale. Built to Stay.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Horizontal line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            style={{
              position: "absolute",
              top: 24,
              left: "5%",
              right: "5%",
              height: 1,
              background: `linear-gradient(90deg, rgba(1, 187, 245, 0.3), rgba(1, 187, 245, 0.08))`,
              transformOrigin: "left",
            }}
          />

          {/* Nodes */}
          <div
            className="timeline-nodes"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${timeline.length}, 1fr)`,
              gap: 12,
              position: "relative",
            }}
          >
            {timeline.map((item, index) => (
              <TimelineNode
                key={item.id}
                item={item}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .timeline-nodes {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .timeline-nodes {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * TimelineNode — Single edition on the timeline
 */
function TimelineNode({
  item,
  index,
  isInView,
}: {
  item: (typeof timeline)[0];
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isCompleted = item.status === "completed";
  const isUpcoming = item.status === "upcoming";
  const isPlanned = item.status === "planned";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "default" }}
    >
      {/* Dot */}
      <div
        className="flex items-center justify-center"
        style={{ height: 48 }}
      >
        <div
          className={isUpcoming ? "animate-pulse" : ""}
          style={{
            width: isUpcoming ? 14 : 10,
            height: isUpcoming ? 14 : 10,
            borderRadius: "50%",
            background: isCompleted
              ? CYBER_BLUE
              : isUpcoming
                ? "transparent"
                : "transparent",
            border: isCompleted
              ? "none"
              : isUpcoming
                ? `2px solid ${CYBER_BLUE}`
                : "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: isUpcoming
              ? `0 0 12px rgba(1, 187, 245, 0.4)`
              : isCompleted
                ? `0 0 8px rgba(1, 187, 245, 0.2)`
                : "none",
            transition: "all 0.3s",
          }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          padding: "16px 14px",
          background: hovered ? "#141414" : "#111111",
          border: `1px solid ${
            hovered
              ? "rgba(1, 187, 245, 0.08)"
              : isPlanned
                ? "rgba(255, 255, 255, 0.04)"
                : "rgba(255, 255, 255, 0.05)"
          }`,
          borderRadius: 12,
          borderStyle: isPlanned ? "dashed" : "solid",
          opacity: isPlanned ? 0.6 : 1,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Status badge */}
        <span
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: isCompleted || isUpcoming ? CYBER_BLUE : "#404040",
          }}
        >
          {isCompleted ? "Completed" : isUpcoming ? "Upcoming" : "Planned"}
        </span>

        {/* City */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 15,
            color: "var(--white)",
            margin: "6px 0 0",
            lineHeight: 1.3,
          }}
        >
          {item.city}
        </h3>

        {/* Date + Label */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 12,
            color: "#606060",
            margin: "4px 0 0",
          }}
        >
          {item.label} &middot; {item.date}
        </p>

        {/* Venue */}
        {item.venue && (
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              color: "#454545",
              margin: "2px 0 0",
            }}
          >
            {item.venue}
          </p>
        )}
      </div>
    </motion.div>
  );
}
