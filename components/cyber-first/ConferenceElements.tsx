"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CYBER_BLUE = "#01BBF5";
const EASE = [0.16, 1, 0.3, 1] as const;

// Conference elements with background images
const elements = [
  {
    id: "keynotes",
    title: "Keynotes & Panels",
    description:
      "High-level presentations and moderated discussions featuring CISOs, government leaders, and security practitioners.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    id: "awards",
    title: "Awards Ceremony",
    description:
      "Recognizing excellence in cybersecurity — from innovative defenders to visionary leaders shaping the region.",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&q=80",
  },
  {
    id: "meetings",
    title: "1-on-1 Meetings",
    description:
      "Pre-scheduled face-to-face meetings between enterprise buyers and solution providers. Every meeting is curated.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
  },
  {
    id: "hackathon",
    title: "Hackathon & CTF",
    description:
      "Hands-on cybersecurity challenges testing real-world skills — from penetration testing to incident response.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
  },
  {
    id: "networking",
    title: "Networking & Luncheons",
    description:
      "Structured networking sessions and sit-down luncheons designed to build lasting professional relationships.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
  },
  {
    id: "media",
    title: "Media & Live Broadcast",
    description:
      "Full media coverage including live streaming, post-event highlights, and industry press engagement.",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=600&q=80",
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
          style={{ textAlign: "center", marginBottom: 48 }}
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
              The Experience
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
            More Than a Conference
          </h2>

          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 16,
              color: "#707070",
              maxWidth: 520,
              margin: "14px auto 0",
              lineHeight: 1.7,
            }}
          >
            Every element is designed for one outcome — that the right people
            leave with the right connections, insights, and momentum.
          </p>
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
                ease: EASE,
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
 * ElementCard — Photo-backed conference element card
 */
function ElementCard({
  element,
}: {
  element: (typeof elements)[0];
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderRadius: 16,
        border: `1px solid ${isHovered ? "rgba(1, 187, 245, 0.1)" : "rgba(255, 255, 255, 0.04)"}`,
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: isHovered ? "0 16px 48px rgba(0, 0, 0, 0.3)" : "none",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "default",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={element.image}
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: isHovered
              ? "brightness(0.25) saturate(0.6)"
              : "brightness(0.15) saturate(0.4)",
            transform: isHovered ? "scale(1.06)" : "scale(1)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, rgba(10,10,10,0.95) 10%, rgba(10,10,10,0.5) 60%, rgba(10,10,10,0.7) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="relative"
        style={{
          zIndex: 2,
          padding: 32,
          minHeight: 220,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 700,
            color: "var(--white)",
            margin: 0,
            letterSpacing: "-0.3px",
          }}
        >
          {element.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 14,
            fontWeight: 300,
            color: isHovered ? "#999" : "#707070",
            lineHeight: 1.65,
            marginTop: 8,
            transition: "color 0.3s",
          }}
        >
          {element.description}
        </p>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 2,
          background: CYBER_BLUE,
          opacity: isHovered ? 0.6 : 0,
          transition: "opacity 0.4s",
          zIndex: 3,
        }}
      />
    </div>
  );
}
