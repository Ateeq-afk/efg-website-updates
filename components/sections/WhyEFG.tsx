"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Value propositions data
const features = [
  {
    id: "curated",
    icon: "target",
    title: "Curated Audiences",
    description:
      "Every attendee is a senior decision-maker. No padding, no fillers — just the people who shape budgets, strategy, and direction across the region's largest enterprises.",
  },
  {
    id: "actionable",
    icon: "lightbulb",
    title: "Actionable Intelligence",
    description:
      "Sessions designed to deliver frameworks you implement on Monday, not buzzwords you forget by Friday. Every talk is vetted for practical, real-world value.",
  },
  {
    id: "global",
    icon: "globe",
    title: "Regional Depth, Global Reach",
    description:
      "Deep roots across the GCC with perspectives drawn from the world's leading technology practitioners. Local context meets international expertise.",
  },
  {
    id: "community",
    icon: "chain",
    title: "Year-Round Community",
    description:
      "Our events are milestones in an ongoing conversation. The network you build here stays active between conferences — relationships that compound over time.",
  },
];

export default function WhyEFG() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--black)",
        padding: "clamp(80px, 10vw, 140px) 0",
      }}
    >
      <div
        className="why-efg-container"
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
        {/* LEFT COLUMN — The Pitch (Sticky on desktop) */}
        <motion.div
          className="why-efg-left"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
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
                background: "var(--orange)",
              }}
            />
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#FF7A2E",
                fontFamily: "var(--font-outfit)",
              }}
            >
              Why Events First Group
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(30px, 3.5vw, 44px)",
              letterSpacing: "-1px",
              color: "var(--white)",
              lineHeight: 1.15,
              margin: "16px 0 0",
            }}
          >
            Engineered for Impact
          </h2>

          {/* Paragraphs */}
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 15,
              color: "#707070",
              lineHeight: 1.75,
              margin: "20px 0 0",
            }}
          >
            We don't just organize events. We architect moments where decisions
            are made, partnerships are formed, and industries shift direction.
            Every detail is intentional — from speaker curation to audience
            composition to the conversations that happen between sessions.
          </p>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 15,
              color: "#707070",
              lineHeight: 1.75,
              margin: "16px 0 0",
            }}
          >
            Since our founding, Events First Group has become the GCC's trusted
            platform for senior technology leaders to connect, learn, and shape
            what comes next.
          </p>
        </motion.div>

        {/* RIGHT COLUMN — Four Value Propositions */}
        <div className="flex flex-col gap-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{
                duration: 0.7,
                delay: 0.2 + index * 0.12,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <FeatureBlock feature={feature} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .why-efg-container {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .why-efg-left {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * FeatureBlock — Individual value proposition card
 */
function FeatureBlock({
  feature,
}: {
  feature: (typeof features)[0];
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex gap-5 transition-all duration-400"
      style={{
        padding: 26,
        borderRadius: 14,
        border: isHovered
          ? "1px solid rgba(255, 255, 255, 0.06)"
          : "1px solid transparent",
        background: isHovered ? "rgba(255, 255, 255, 0.015)" : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon Container */}
      <div
        className="flex items-center justify-center flex-shrink-0 transition-all duration-400"
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: isHovered
            ? "rgba(232, 101, 26, 0.1)"
            : "rgba(232, 101, 26, 0.06)",
          border: "1px solid rgba(232, 101, 26, 0.1)",
        }}
      >
        <FeatureIcon
          icon={feature.icon}
          style={{
            opacity: isHovered ? 1 : 0.6,
            transition: "opacity 0.4s ease",
          }}
        />
      </div>

      {/* Content */}
      <div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "-0.2px",
            color: "var(--white)",
            margin: 0,
            marginBottom: 6,
          }}
        >
          {feature.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 13.5,
            fontWeight: 300,
            color: "#686868",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
}

/**
 * FeatureIcon — SVG icons for each feature
 */
function FeatureIcon({
  icon,
  style,
}: {
  icon: string;
  style?: React.CSSProperties;
}) {
  const iconStyle = {
    width: 18,
    height: 18,
    color: "#E8651A",
    ...style,
  };

  switch (icon) {
    case "target":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={iconStyle}
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "lightbulb":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={iconStyle}
        >
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
        </svg>
      );
    case "globe":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={iconStyle}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "chain":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={iconStyle}
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    default:
      return null;
  }
}
