"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const OT_CRIMSON = "#D34B9A";

// 6 experience elements per spec
const elements = [
  {
    id: 1,
    icon: "M",
    title: "Keynotes & Leadership Panels",
    description:
      "High-level discussions featuring heads of OT security from ADNOC, DP World, KNPC, Oman LNG, and regional energy operators.",
  },
  {
    id: 2,
    icon: "W",
    title: "Hands-On Workshops",
    description:
      "ICS hacking simulation labs, zero-trust segmentation exercises, and applied OT security training with real-world scenarios.",
  },
  {
    id: 3,
    icon: "A",
    title: "OT Security Awards",
    description:
      "Recognizing excellence in OT Innovation, IT/OT Convergence, Women in OT Security, Ransomware Defense, and Critical Infrastructure Resilience.",
  },
  {
    id: 4,
    icon: "1:1",
    title: "Curated 1-on-1 Meetings",
    description:
      "Pre-scheduled meetings between asset owners and OT security vendors. Every meeting curated for industrial sector relevance.",
  },
  {
    id: 5,
    icon: "D",
    title: "Live Technology Demos",
    description:
      "Vendor demonstrations of ICS monitoring, anomaly detection, network segmentation, and industrial incident response tools.",
  },
  {
    id: 6,
    icon: "N",
    title: "Industry Networking",
    description:
      "Structured sessions connecting OT security professionals, SCADA engineers, control system architects, and industrial cyber leaders.",
  },
];

export default function OTExperience() {
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
        {/* Header */}
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
              The Experience
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
            The Full Arsenal
          </h2>
        </motion.div>

        {/* Elements Grid - 3 columns */}
        <div
          className="experience-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
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
              <ExperienceCard element={element} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .experience-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .experience-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * ExperienceCard — Individual experience element (angular 8px radius)
 */
function ExperienceCard({ element }: { element: (typeof elements)[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative transition-all"
      style={{
        background: "#141414",
        border: isHovered
          ? `1px solid rgba(139, 0, 0, 0.25)`
          : "1px solid rgba(255, 255, 255, 0.04)",
        borderRadius: 8,
        padding: 28,
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        transitionDuration: "0.4s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left edge bar on hover */}
      <div
        className="absolute left-0 top-4 bottom-4 transition-all"
        style={{
          width: 3,
          background: OT_CRIMSON,
          opacity: isHovered ? 1 : 0,
          borderRadius: 2,
          transitionDuration: "0.3s",
        }}
      />

      {/* Icon */}
      <div
        className="transition-all"
        style={{
          width: 44,
          height: 44,
          borderRadius: 6,
          background: isHovered
            ? "rgba(139, 0, 0, 0.15)"
            : "rgba(139, 0, 0, 0.08)",
          border: `1px solid rgba(139, 0, 0, ${isHovered ? 0.3 : 0.15})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
          transitionDuration: "0.3s",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: element.icon.length > 2 ? 12 : 16,
            fontWeight: 800,
            color: OT_CRIMSON,
          }}
        >
          {element.icon}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 16,
          fontWeight: 700,
          color: "var(--white)",
          margin: 0,
        }}
      >
        {element.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 13,
          fontWeight: 300,
          lineHeight: 1.6,
          color: "#707070",
          margin: "10px 0 0",
        }}
      >
        {element.description}
      </p>
    </div>
  );
}
