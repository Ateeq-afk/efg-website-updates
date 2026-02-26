"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { DotMatrixGrid, ScanLines } from "@/components/effects";
import { EMERALD, EMERALD_BRIGHT, EASE } from "./constants";

const stats = [
  { value: "$39.8B", label: "Kuwait ICT market by 2028" },
  { value: "$500B+", label: "AI contribution to MENA GDP" },
  { value: "73%", label: "CEOs ranking AI top priority" },
  { value: "3X", label: "Growth in GCC AI talent demand" },
  { value: "2028", label: "Kuwait's AI hub target year" },
  { value: "45%", label: "Enterprises accelerating AI spend" },
];

export default function DADataWall() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: "#111111",
        padding: "clamp(36px, 5vw, 56px) 24px",
      }}
    >
      {/* Multi-layer atmospheric gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 30%, rgba(15,115,94,0.05) 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 40% at 20% 70%, rgba(20,168,130,0.03) 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 35% 40% at 85% 20%, rgba(15,115,94,0.025) 0%, transparent 70%)`,
        }}
      />

      {/* Texture: Dot Matrix */}
      <DotMatrixGrid color={EMERALD} opacity={0.03} spacing={24} />

      {/* Texture: Scan Lines */}
      <ScanLines opacity={0.018} lineHeight={4} />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header with pulsing dot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3"
          style={{ marginBottom: 16 }}
        >
          <div style={{ width: 30, height: 1, background: `${EMERALD}40` }} />
          <div style={{ position: "relative", width: 8, height: 8 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: EMERALD_BRIGHT,
                opacity: 0.75,
                animation: "daPulse 2s ease-out infinite",
              }}
            />
            <div
              style={{
                position: "relative",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: EMERALD_BRIGHT,
              }}
            />
          </div>
          <div style={{ width: 30, height: 1, background: `${EMERALD}40` }} />
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: "block",
            fontFamily: "var(--font-outfit)",
            fontSize: 11,
            fontWeight: 600,
            color: EMERALD,
            textTransform: "uppercase",
            letterSpacing: "2.5px",
            textAlign: "center",
          }}
        >
          Market Landscape
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(30px, 3.5vw, 48px)",
            letterSpacing: "-1.5px",
            color: "var(--white)",
            lineHeight: 1.1,
            textAlign: "center",
            margin: "20px 0 0",
          }}
        >
          The Numbers Behind the Ambition
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontWeight: 300,
            fontSize: 16,
            color: "#707070",
            lineHeight: 1.6,
            textAlign: "center",
            maxWidth: 520,
            margin: "14px auto 48px",
          }}
        >
          The Gulf&rsquo;s AI economy is accelerating faster than any other
          region. These are the benchmarks driving the conversation.
        </motion.p>

        <div
          className="da-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} delay={i * 0.1} isInView={isInView} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 600px) {
          .da-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

function StatCard({
  stat,
  delay,
  isInView,
}: {
  stat: { value: string; label: string };
  delay: number;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(stat.value);
  const [showPulse, setShowPulse] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const numMatch = stat.value.match(/[\d.]+/);
    if (!numMatch) return;

    const targetNum = parseFloat(numMatch[0]);
    const prefix = stat.value.substring(0, stat.value.indexOf(numMatch[0]));
    const suffix = stat.value.substring(
      stat.value.indexOf(numMatch[0]) + numMatch[0].length
    );

    let startTime: number;
    const duration = 1800;

    const easeOutExpo = (t: number) =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = easedProgress * targetNum;

      if (progress >= 1) {
        setDisplayValue(stat.value);
        setShowPulse(true);
        setTimeout(() => setShowPulse(false), 600);
      } else {
        const formatted =
          targetNum >= 100 ? Math.floor(current) : current.toFixed(1);
        setDisplayValue(`${prefix}${formatted}${suffix}`);
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, stat.value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="transition-all"
      style={{
        position: "relative",
        textAlign: "center",
        padding: "32px 20px",
        borderRadius: 16,
        background: isHovered
          ? "rgba(15, 115, 94, 0.08)"
          : "rgba(15, 115, 94, 0.04)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: isHovered
          ? `1px solid ${EMERALD}35`
          : "1px solid rgba(15, 115, 94, 0.08)",
        transform: isHovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: showPulse
          ? `0 0 30px ${EMERALD}40, inset 0 0 15px ${EMERALD}10`
          : isHovered
            ? `0 16px 48px rgba(0,0,0,0.3), 0 0 40px ${EMERALD}15`
            : "none",
        transitionDuration: "0.4s",
        cursor: "default",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glow blur on hover */}
      <div
        className="absolute pointer-events-none transition-opacity"
        style={{
          width: 200,
          height: 200,
          bottom: -40,
          left: "50%",
          transform: "translateX(-50%)",
          background: `radial-gradient(ellipse at center, ${EMERALD}15 0%, transparent 70%)`,
          filter: "blur(40px)",
          opacity: isHovered ? 1 : 0,
          transitionDuration: "0.4s",
        }}
      />

      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 44,
          fontWeight: 800,
          color: isHovered ? EMERALD_BRIGHT : EMERALD,
          margin: 0,
          lineHeight: 1,
          position: "relative",
          transition: "color 0.3s",
        }}
      >
        {displayValue}
      </p>
      <div
        className="transition-all"
        style={{
          width: isHovered ? 48 : 32,
          height: 2,
          background: isHovered ? `${EMERALD}50` : `${EMERALD}20`,
          margin: "14px auto",
          transitionDuration: "0.3s",
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 13,
          fontWeight: 400,
          color: isHovered ? "#808080" : "#606060",
          lineHeight: 1.5,
          maxWidth: 180,
          margin: "0 auto",
          position: "relative",
          transition: "color 0.3s",
        }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}
