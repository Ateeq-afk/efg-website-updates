"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const CYBER_BLUE = "#01BBF5";
const EASE = [0.16, 1, 0.3, 1] as const;

// Who's in the room — role breakdown
const roles = [
  { title: "CISOs & CSOs", percentage: 32, description: "Chief Information Security Officers leading enterprise cyber strategy" },
  { title: "CTO & CIO", percentage: 22, description: "Technology executives driving digital transformation securely" },
  { title: "Government Cyber Leaders", percentage: 18, description: "National cybersecurity authority heads and policy makers" },
  { title: "Security Architects", percentage: 15, description: "Hands-on leaders designing defence frameworks" },
  { title: "Vendor & Solution Leads", percentage: 13, description: "Technology partners showcasing next-gen security solutions" },
];

// Big proof numbers
const proofStats = [
  { value: 1500, suffix: "+", label: "Senior Security Leaders" },
  { value: 4, suffix: "", label: "GCC Nations" },
  { value: 120, suffix: "+", label: "Organisations Represented" },
  { value: 92, suffix: "%", label: "Director-Level & Above" },
];

// Easing function: easeOutExpo
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export default function PastEditionsTimeline() {
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
          style={{ textAlign: "center", marginBottom: 56 }}
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
              The Room
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
            You&rsquo;ll Know the People in This Room
          </h2>

          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 16,
              color: "#707070",
              maxWidth: 600,
              margin: "16px auto 0",
              lineHeight: 1.7,
            }}
          >
            Cyber First doesn&rsquo;t fill seats — it curates a room. Every
            attendee is a decision-maker shaping cybersecurity across the GCC.
          </p>
        </motion.div>

        {/* Proof Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="the-room-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginBottom: 56,
          }}
        >
          {proofStats.map((stat, i) => (
            <ProofStat key={stat.label} stat={stat} delay={i * 120} isInView={isInView} />
          ))}
        </motion.div>

        {/* Role Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="the-room-roles"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 12,
          }}
        >
          {roles.map((role, i) => (
            <RoleCard key={role.title} role={role} index={i} isInView={isInView} />
          ))}
        </motion.div>

        {/* Bottom Statement */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontWeight: 400,
            fontSize: 14,
            color: "#505050",
            textAlign: "center",
            marginTop: 40,
            letterSpacing: "0.3px",
          }}
        >
          This is not a conference audience. This is your peer group.
        </motion.p>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .the-room-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .the-room-roles {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .the-room-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .the-room-roles {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * ProofStat — Animated counting stat
 */
function ProofStat({
  stat,
  delay,
  isInView,
}: {
  stat: { value: number; suffix: string; label: string };
  delay: number;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView || started) return;
    setStarted(true);

    const startTime = Date.now() + delay;
    const duration = 1800;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      setDisplayValue(Math.floor(easedProgress * stat.value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(stat.value);
        if (stat.suffix) setTimeout(() => setShowSuffix(true), 50);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, started, stat.value, stat.suffix, delay]);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "28px 16px",
        background: "#111111",
        border: "1px solid rgba(1, 187, 245, 0.06)",
        borderRadius: 14,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(28px, 3vw, 36px)",
          color: "var(--white)",
          lineHeight: 1,
        }}
      >
        {displayValue.toLocaleString()}
        {stat.suffix && (
          <span
            style={{
              color: CYBER_BLUE,
              display: "inline-block",
              transform: showSuffix ? "scale(1)" : "scale(1.3)",
              opacity: showSuffix ? 1 : 0,
              transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
            }}
          >
            {stat.suffix}
          </span>
        )}
      </div>
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 12,
          fontWeight: 500,
          color: "#505050",
          marginTop: 8,
          letterSpacing: "0.5px",
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}

/**
 * RoleCard — Audience role breakdown with bar
 */
function RoleCard({
  role,
  index,
  isInView,
}: {
  role: { title: string; percentage: number; description: string };
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.35 + index * 0.07, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "24px 20px",
        background: hovered ? "#161616" : "#111111",
        border: `1px solid ${hovered ? "rgba(1, 187, 245, 0.1)" : "rgba(255, 255, 255, 0.04)"}`,
        borderRadius: 14,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "default",
      }}
    >
      {/* Percentage */}
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 28,
          color: CYBER_BLUE,
          margin: 0,
          lineHeight: 1,
        }}
      >
        {role.percentage}%
      </p>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 15,
          color: "var(--white)",
          margin: "12px 0 0",
          lineHeight: 1.3,
        }}
      >
        {role.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontWeight: 300,
          fontSize: 13,
          color: "#606060",
          margin: "8px 0 0",
          lineHeight: 1.6,
        }}
      >
        {role.description}
      </p>

      {/* Percentage Bar */}
      <div
        style={{
          marginTop: 16,
          height: 3,
          background: "rgba(255, 255, 255, 0.04)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${role.percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: EASE }}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${CYBER_BLUE}, rgba(1, 187, 245, 0.4))`,
            borderRadius: 2,
          }}
        />
      </div>
    </motion.div>
  );
}
