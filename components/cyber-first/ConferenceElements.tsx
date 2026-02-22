"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CYBER_BLUE = "#01BBF5";

// Conference elements data
const elements = [
  {
    id: "keynotes",
    icon: "microphone",
    title: "Keynotes & Panels",
    description:
      "High-level presentations and moderated discussions featuring CISOs, government leaders, and security practitioners.",
  },
  {
    id: "awards",
    icon: "trophy",
    title: "Awards Ceremony",
    description:
      "Recognizing excellence in cybersecurity — from innovative defenders to visionary leaders shaping the region's security posture.",
  },
  {
    id: "meetings",
    icon: "users",
    title: "1-on-1 Meetings",
    description:
      "Pre-scheduled face-to-face meetings between enterprise buyers and solution providers. Every meeting is curated for relevance.",
  },
  {
    id: "hackathon",
    icon: "code",
    title: "Hackathon & CTF",
    description:
      "Hands-on cybersecurity challenges testing real-world skills — from penetration testing to incident response scenarios.",
  },
  {
    id: "networking",
    icon: "coffee",
    title: "Networking & Luncheons",
    description:
      "Structured networking sessions, coffee breaks, and sit-down luncheons designed to build lasting professional relationships.",
  },
  {
    id: "media",
    icon: "camera",
    title: "Media & Live Broadcast",
    description:
      "Full media coverage including live streaming, post-event highlights, and industry press engagement.",
  },
];

export default function ConferenceElements() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--black)",
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          {/* Label */}
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
              The Experience
            </span>
            <span style={{ width: 30, height: 1, background: CYBER_BLUE }} />
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
            More Than a Conference
          </h2>
        </motion.div>

        {/* Elements Grid */}
        <div
          className="elements-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {elements.map((element, index) => (
            <motion.div
              key={element.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ElementCard element={element} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .elements-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .elements-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * ElementCard — Individual conference element card
 */
function ElementCard({
  element,
}: {
  element: (typeof elements)[0];
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="transition-all duration-400"
      style={{
        background: isHovered ? "#171717" : "#141414",
        border: `1px solid ${isHovered ? "rgba(1, 187, 245, 0.08)" : "rgba(255, 255, 255, 0.04)"}`,
        borderRadius: 16,
        padding: 32,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <div
        className="transition-opacity duration-300"
        style={{ opacity: isHovered ? 0.8 : 0.5 }}
      >
        <ElementIcon icon={element.icon} />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 700,
          color: "var(--white)",
          marginTop: 16,
        }}
      >
        {element.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 14.5,
          fontWeight: 300,
          color: "#707070",
          lineHeight: 1.65,
          marginTop: 8,
        }}
      >
        {element.description}
      </p>
    </div>
  );
}

/**
 * ElementIcon — SVG icons for each element
 */
function ElementIcon({ icon }: { icon: string }) {
  const style = {
    width: 28,
    height: 28,
    color: CYBER_BLUE,
  };

  switch (icon) {
    case "microphone":
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={style}
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      );
    case "trophy":
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={style}
        >
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      );
    case "users":
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={style}
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "code":
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={style}
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "coffee":
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={style}
        >
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="2" x2="6" y2="4" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="14" y1="2" x2="14" y2="4" />
        </svg>
      );
    case "camera":
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={style}
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    default:
      return null;
  }
}
