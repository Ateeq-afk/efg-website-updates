"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const OT_CRIMSON = "#D34B9A";
const OT_FIREBRICK = "#E86BB8";

// 10 themes from the spec
const themes = [
  {
    id: 1,
    title: "AI-Powered OT Threat Hunting",
    description:
      "Leveraging artificial intelligence for anomaly detection, predictive maintenance, and alarm triage across industrial control systems.",
  },
  {
    id: 2,
    title: "Secure Renewables",
    description:
      "OT security strategies for solar farms, wind installations, and the expanding renewable energy infrastructure.",
  },
  {
    id: 3,
    title: "Ransomware Defense for Energy Operations",
    description:
      "Protecting operational continuity against targeted ransomware campaigns hitting oil, gas, and utilities.",
  },
  {
    id: 4,
    title: "Supply Chain Security in Oil & Gas",
    description:
      "Securing the extended enterprise from third-party risks, vendor compromises, and pipeline integrity threats.",
  },
  {
    id: 5,
    title: "Legacy-to-Zero-Trust Migration",
    description:
      "Transitioning aging ICS/SCADA infrastructure to zero-trust architecture without disrupting operations.",
  },
  {
    id: 6,
    title: "Incident Response Drills",
    description:
      "Tabletop exercises and live simulations for OT-specific cyber incidents and crisis management.",
  },
  {
    id: 7,
    title: "6G & Edge Computing Risks",
    description:
      "Securing next-generation connectivity at the industrial edge where IT and OT converge.",
  },
  {
    id: 8,
    title: "CISO-Led OT Governance",
    description:
      "Building board-level OT security programmes, budgets, and risk reporting frameworks.",
  },
  {
    id: 9,
    title: "Quantum-Resistant Cryptography",
    description:
      "Preparing industrial control systems for the post-quantum threat landscape.",
  },
  {
    id: 10,
    title: "Women in OT Security",
    description:
      "Advancing diversity and inclusion in the traditionally underrepresented OT security workforce.",
  },
];

export default function OTAboutSeries() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#0A0A0A",
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
        <div
          className="about-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
          }}
        >
          {/* LEFT - Sticky on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="about-left-sticky"
            style={{
              position: "sticky",
              top: 140,
              alignSelf: "start",
            }}
          >
            {/* Label */}
            <div className="flex items-center gap-3">
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
                About OT Security First
              </span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(30px, 3.5vw, 44px)",
                letterSpacing: "-1.5px",
                color: "var(--white)",
                lineHeight: 1.1,
                margin: "20px 0 0",
              }}
            >
              Where IT Meets the Physical World
            </h2>

            {/* Paragraphs */}
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 16.5,
                fontWeight: 300,
                lineHeight: 1.8,
                color: "#808080",
                marginTop: 24,
              }}
            >
              In an era of rapid digital transformation, safeguarding critical
              infrastructure across energy and utilities is paramount to
              economic stability and national security. OT Security First is the
              only platform in the MENA region dedicated exclusively to
              operational technology security — integrating cutting-edge
              technologies, fostering regional expertise, and driving actionable
              strategies to protect ICS, SCADA, and Industrial IoT environments.
            </p>

            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 16.5,
                fontWeight: 300,
                lineHeight: 1.8,
                color: "#606060",
                marginTop: 16,
              }}
            >
              This isn't cybersecurity in the abstract. This is about protecting
              the systems that keep the lights on, the oil flowing, and the
              water clean. When these systems fail, the consequences aren't
              digital — they're physical, immediate, and potentially
              catastrophic.
            </p>
          </motion.div>

          {/* RIGHT - Themes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col gap-3">
              {themes.map((theme, index) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ThemeBlock theme={theme} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .about-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-left-sticky {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * ThemeBlock — Individual theme with left border
 */
function ThemeBlock({ theme }: { theme: (typeof themes)[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="transition-all"
      style={{
        paddingLeft: 20,
        borderLeft: `2px solid rgba(139, 0, 0, ${isHovered ? 0.5 : 0.1})`,
        transitionDuration: "0.4s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 15,
          fontWeight: 700,
          color: isHovered ? "var(--white)" : "#d0d0d0",
          margin: 0,
          transition: "color 0.3s",
        }}
      >
        {theme.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 13.5,
          fontWeight: 300,
          lineHeight: 1.6,
          color: "#606060",
          marginTop: 6,
        }}
      >
        {theme.description}
      </p>
    </div>
  );
}
