"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CYBER_BLUE = "#01BBF5";

// Key themes data
const themes = [
  {
    id: "ai-defense",
    title: "AI-Driven Cyber Defense",
    description:
      "Threat detection, response strategies, behavioral analytics, and adaptive security models powered by artificial intelligence.",
  },
  {
    id: "zero-trust",
    title: "Zero Trust & Cloud Security",
    description:
      "Securing hybrid and cloud environments through zero-trust architecture, identity management, and data protection.",
  },
  {
    id: "critical-infrastructure",
    title: "Critical Infrastructure Protection",
    description:
      "Safeguarding OT/ICS systems, energy grids, financial networks, and government digital infrastructure.",
  },
  {
    id: "compliance",
    title: "Regulatory Compliance & Governance",
    description:
      "Navigating evolving UAE, Saudi, Kuwait, and GCC-wide cybersecurity frameworks and data privacy regulations.",
  },
  {
    id: "leadership",
    title: "CISO Leadership & Resilience",
    description:
      "How security leaders drive organizational resilience, manage boards, and build security culture at scale.",
  },
  {
    id: "talent",
    title: "Cyber Talent & Workforce Development",
    description:
      "Closing the cybersecurity skills gap through training, certification, and public-private partnerships.",
  },
];

export default function AboutSeries() {
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
        className="about-container"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        {/* Left Column — The Pitch (Sticky) */}
        <motion.div
          className="about-left"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "sticky",
            top: 140,
          }}
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
              About Cyber First
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
            Building Cyber Resilience Across the GCC
          </h2>

          {/* Paragraphs */}
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 16.5,
              color: "#808080",
              lineHeight: 1.8,
              margin: "20px 0 0",
            }}
          >
            The Cyber First series is a high-level platform that convenes
            CISOs, cybersecurity executives, government officials, and
            technology pioneers to strengthen regional cyber resilience. As GCC
            nations advance their digital economy agendas, cybersecurity has
            become a defining pillar of national development.
          </p>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 16.5,
              color: "#808080",
              lineHeight: 1.8,
              margin: "16px 0 0",
            }}
          >
            Each edition is aligned with the host nation's cybersecurity
            strategy and regulatory landscape, bringing together the specific
            stakeholders, challenges, and opportunities unique to that market.
            From the UAE's National Cybersecurity Strategy to Kuwait's Vision
            2035, Cyber First speaks the language of every stage it stands on.
          </p>
        </motion.div>

        {/* Right Column — Themes */}
        <div className="flex flex-col gap-1.5">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ThemeBlock theme={theme} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .about-container {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .about-left {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * ThemeBlock — Individual theme with hover effect
 */
function ThemeBlock({
  theme,
}: {
  theme: { id: string; title: string; description: string };
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="transition-all duration-300"
      style={{
        padding: "20px 24px",
        borderLeft: `2px solid ${isHovered ? `rgba(1, 187, 245, 0.5)` : `rgba(1, 187, 245, 0.1)`}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3
        className="transition-colors duration-300"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 17,
          fontWeight: 700,
          color: isHovered ? CYBER_BLUE : "var(--white)",
          letterSpacing: "-0.2px",
          margin: 0,
        }}
      >
        {theme.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 14.5,
          fontWeight: 300,
          color: "#707070",
          lineHeight: 1.65,
          margin: "4px 0 0",
        }}
      >
        {theme.description}
      </p>
    </div>
  );
}
