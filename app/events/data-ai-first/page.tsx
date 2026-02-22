"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Footer } from "@/components/sections";
import SeriesTickerBar from "@/components/ui/SeriesTickerBar";

// Brand
const EMERALD = "#0F735E";
const EMERALD_BRIGHT = "#14A882";

// Easing
const EASE = [0.16, 1, 0.3, 1] as const;

// Column widths
const NARROW = 680;
const WIDE = 1100;

// =============================================================================
// CHAPTER 1: THE OPENING (Hero)
// =============================================================================

function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
      }}
    >
      {/* Subtle violet glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 40%, rgba(15,115,94,0.04) 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center"
        style={{
          minHeight: "100vh",
          padding: "0 24px",
        }}
      >
        {/* Series label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: EMERALD,
            marginTop: "20vh",
          }}
        >
          Data & AI First Series
        </motion.span>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(64px, 10vw, 120px)",
            letterSpacing: "-3px",
            lineHeight: 0.95,
            color: "var(--white)",
            marginTop: 24,
          }}
        >
          Intelligence
          <br />
          <span style={{ color: EMERALD }}>Amplified</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 18,
            fontWeight: 300,
            color: "#707070",
            maxWidth: 480,
            marginTop: 32,
            lineHeight: 1.6,
          }}
        >
          A new summit series for the leaders building AI-driven organizations
          across the Gulf.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
          className="flex flex-wrap justify-center gap-4"
          style={{ marginTop: 40 }}
        >
          <HeroButton href="#content">Explore the Series ↓</HeroButton>
          <HeroButton primary href="/events/data-ai-first/kuwait#register">
            Register for Kuwait →
          </HeroButton>
        </motion.div>
      </div>

      {/* Ticker Bar */}
      <SeriesTickerBar
        accentColor={EMERALD}
        eventName="Data & AI First Kuwait"
        location="Kuwait City, Kuwait"
        targetDate={new Date("2026-04-20T09:00:00")}
        ctaText="Register"
        ctaHref="/events/data-ai-first/kuwait#register"
        angularRadius={false}
      />
    </section>
  );
}

function HeroButton({
  children,
  primary = false,
  href,
}: {
  children: React.ReactNode;
  primary?: boolean;
  href: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="inline-flex items-center transition-all"
      style={{
        padding: "14px 32px",
        borderRadius: 50,
        background: primary
          ? isHovered
            ? EMERALD_BRIGHT
            : EMERALD
          : isHovered
            ? `${EMERALD}15`
            : "transparent",
        border: primary ? "none" : `1px solid ${EMERALD}50`,
        fontFamily: "var(--font-outfit)",
        fontSize: 15,
        fontWeight: 500,
        color: primary ? "var(--white)" : EMERALD,
        transitionDuration: "0.3s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
}

// =============================================================================
// CHAPTER 2: THE THESIS
// =============================================================================

function Thesis() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="content"
      ref={ref}
      className="relative"
      style={{
        background: "#0A0A0A",
        padding: "120px 24px 80px",
      }}
    >
      <div
        style={{
          maxWidth: NARROW,
          margin: "0 auto",
          position: "relative",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 20,
            fontWeight: 300,
            color: "#909090",
            lineHeight: 1.85,
            marginBottom: 32,
          }}
        >
          The Gulf Cooperation Council is making the largest bet on artificial
          intelligence of any region in the world. Kuwait's Vision 2035 names AI
          as its primary economic diversifier. The UAE has appointed the world's
          first Minister of AI. Saudi Arabia is building NEOM — an entire city
          run on data. The question is no longer whether AI will transform the
          region. It's who will lead that transformation.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 20,
            fontWeight: 300,
            color: "#909090",
            lineHeight: 1.85,
          }}
        >
          Data & AI First is the summit series built for the people answering
          that question. Not another tech conference with vendor pitches and
          recycled keynotes. A working platform where Chief Data Officers, AI
          architects, government strategists, and enterprise leaders come
          together to share what's actually working — and what isn't.
        </motion.p>

        {/* Side annotation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="side-annotation"
          style={{
            position: "absolute",
            right: -200,
            top: 0,
            width: 160,
            paddingLeft: 16,
            borderLeft: `2px solid ${EMERALD}30`,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 12,
              fontWeight: 400,
              color: "#404040",
              lineHeight: 1.6,
            }}
          >
            Launching 2026 · Kuwait City · Expanding to Abu Dhabi, Riyadh, Doha
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 1100px) {
          .side-annotation {
            position: relative !important;
            right: auto !important;
            top: auto !important;
            width: 100% !important;
            margin-top: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}

// =============================================================================
// CHAPTER 3: THE DATA
// =============================================================================

function DataWall() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "$39.8B", label: "Kuwait ICT market by 2028" },
    { value: "$500B+", label: "AI contribution to MENA GDP" },
    { value: "73%", label: "CEOs ranking AI top priority" },
    { value: "3X", label: "Growth in GCC AI talent demand" },
    { value: "2028", label: "Kuwait's AI hub target year" },
    { value: "45%", label: "Enterprises accelerating AI spend" },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: `rgba(15,115,94,0.015)`,
        padding: "100px 24px",
        borderTop: "1px solid rgba(15,115,94,0.06)",
        borderBottom: "1px solid rgba(15,115,94,0.06)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Thin violet line above label */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            width: 32,
            height: 1,
            background: "rgba(15,115,94,0.1)",
            margin: "0 auto 20px",
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 11,
            fontWeight: 500,
            color: "#505050",
            textTransform: "uppercase",
            letterSpacing: "3px",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          The numbers behind the ambition
        </motion.p>

        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "48px 40px",
          }}
        >
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} delay={i * 0.1} isInView={isInView} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 600px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

function StatItem({
  stat,
  delay,
  isInView,
}: {
  stat: { value: string; label: string };
  delay: number;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(stat.value);

  useEffect(() => {
    if (!isInView) return;

    const numMatch = stat.value.match(/[\d.]+/);
    if (!numMatch) return;

    const targetNum = parseFloat(numMatch[0]);
    const prefix = stat.value.substring(0, stat.value.indexOf(numMatch[0]));
    const suffix = stat.value.substring(
      stat.value.indexOf(numMatch[0]) + numMatch[0].length
    );

    let current = 0;
    const duration = 1500;
    const steps = 40;
    const increment = targetNum / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setDisplayValue(stat.value);
        clearInterval(timer);
      } else {
        const formatted =
          targetNum >= 100 ? Math.floor(current) : current.toFixed(1);
        setDisplayValue(`${prefix}${formatted}${suffix}`);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{ textAlign: "center" }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 44,
          fontWeight: 800,
          color: EMERALD,
          margin: 0,
          lineHeight: 1,
        }}
      >
        {displayValue}
      </p>
      <div
        style={{
          width: 32,
          height: 2,
          background: "rgba(15,115,94,0.2)",
          margin: "12px auto",
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 13,
          fontWeight: 400,
          color: "#606060",
          lineHeight: 1.5,
          maxWidth: 180,
          margin: "0 auto",
        }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

// =============================================================================
// CHAPTER 4: PULL QUOTE
// =============================================================================

function PullQuote({ children }: { children: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#0A0A0A",
        padding: "80px 24px 80px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          maxWidth: 600,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Large quotation mark */}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 80,
            fontWeight: 800,
            color: EMERALD,
            opacity: 0.15,
            lineHeight: 1,
            display: "block",
            marginBottom: 24,
          }}
        >
          "
        </span>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#808080",
            lineHeight: 1.55,
            textShadow: "0 0 80px rgba(15,115,94,0.05)",
          }}
        >
          {children}
        </p>
      </motion.div>
    </section>
  );
}

// =============================================================================
// CHAPTER 5: WHAT WE COVER
// =============================================================================

function Topics() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const topics = [
    { num: "01", title: "Enterprise AI Strategy", desc: "Building AI-first organizations from boardroom buy-in to production deployment." },
    { num: "02", title: "Generative AI at Scale", desc: "Enterprise LLM deployment, responsible GenAI, and measuring ROI on generative investments." },
    { num: "03", title: "Data Governance & Privacy", desc: "Regulatory frameworks, cross-border data flows, and sovereign data infrastructure." },
    { num: "04", title: "AI for National Transformation", desc: "Government AI strategies driving economic diversification and smart city development." },
    { num: "05", title: "The CDO Agenda", desc: "The evolution of the Chief Data Officer from data custodian to strategic business leader." },
    { num: "06", title: "AI in Financial Services", desc: "Algorithmic finance, fraud detection, credit intelligence, and Sharia-compliant AI." },
    { num: "07", title: "AI Ethics & Responsible AI", desc: "Bias mitigation, algorithmic auditing, transparency, and trustworthy AI systems." },
    { num: "08", title: "AI Talent & Workforce", desc: "Closing the skills gap through university partnerships and regional talent development." },
    { num: "09", title: "Predictive Analytics", desc: "From business intelligence dashboards to autonomous decision systems." },
    { num: "10", title: "Women in Data & AI", desc: "Advancing diversity in data science, ML engineering, and AI leadership." },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "#0A0A0A",
        padding: "80px 24px",
      }}
    >
      {/* Intro - Narrow */}
      <div style={{ maxWidth: NARROW, margin: "0 auto 48px" }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14,
            fontWeight: 700,
            color: EMERALD,
            textTransform: "uppercase",
            letterSpacing: "3px",
          }}
        >
          What We Cover
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 17,
            fontWeight: 300,
            color: "#808080",
            lineHeight: 1.7,
            marginTop: 16,
          }}
        >
          Data & AI First spans the full landscape of enterprise AI and data
          strategy — from governance to generative AI, from national policy to
          production deployment.
        </motion.p>
      </div>

      {/* Topics - Wide */}
      <div style={{ maxWidth: WIDE, margin: "0 auto" }}>
        <div
          className="topics-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {topics.map((topic, i) => (
            <TopicRow key={topic.num} topic={topic} delay={i * 0.05} isInView={isInView} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .topics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function TopicRow({
  topic,
  delay,
  isInView,
}: {
  topic: { num: string; title: string; desc: string };
  delay: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="flex items-start gap-4 transition-all"
      style={{
        padding: "24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        borderLeft: isHovered ? `3px solid ${EMERALD}` : "3px solid transparent",
        background: isHovered ? `${EMERALD}05` : "transparent",
        cursor: "default",
        transitionDuration: "0.3s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 14,
          fontWeight: 700,
          color: `${EMERALD}50`,
          minWidth: 28,
        }}
      >
        {topic.num}
      </span>
      <div>
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 17,
            fontWeight: 700,
            color: isHovered ? "var(--white)" : "#D0D0D0",
            margin: 0,
            transition: "color 0.2s",
          }}
        >
          {topic.title}
        </h4>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 14,
            fontWeight: 300,
            color: "#606060",
            marginTop: 6,
            lineHeight: 1.5,
          }}
        >
          {topic.desc}
        </p>
      </div>
    </motion.div>
  );
}

// =============================================================================
// CHAPTER 6: THE FORMAT
// =============================================================================

function Format() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const formats = [
    { num: "01", title: "Keynotes & Leadership Panels", desc: "Strategic sessions with CDOs, CTOs, and government AI leaders. No vendor pitches — pure practitioner insight." },
    { num: "02", title: "Workshops & Deep Dives", desc: "Hands-on sessions: model deployment, data pipelines, prompt engineering, AI governance. Bring your laptop." },
    { num: "03", title: "Data & AI Awards", desc: "Recognizing excellence in AI Transformation, Data Innovation, Ethics, Emerging Talent, and Public Sector Impact." },
    { num: "04", title: "Startup Pitch Stage", desc: "The GCC's most promising AI-native companies pitch to investors, enterprise leaders, and government funds." },
    { num: "05", title: "Live Case Studies", desc: "Real deployments, real numbers. Organizations share what worked, what failed, and what they'd do differently." },
    { num: "06", title: "Curated Meetings", desc: "Pre-scheduled 1-on-1 meetings between enterprise leaders and solution providers. Quality over quantity." },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "#0A0A0A",
        padding: "80px 24px",
      }}
    >
      {/* Intro - Narrow */}
      <div style={{ maxWidth: NARROW, margin: "0 auto 48px" }}>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 800,
            color: "var(--white)",
            margin: 0,
          }}
        >
          More Than a Conference
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 17,
            fontWeight: 300,
            color: "#808080",
            lineHeight: 1.7,
            marginTop: 16,
          }}
        >
          Each edition of Data & AI First is designed as a working summit. No
          filler panels. No death-by-PowerPoint. Every format is built for
          actionable outcomes.
        </motion.p>
      </div>

      {/* Cards - Wide */}
      <div
        className="format-grid"
        style={{
          maxWidth: WIDE,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {formats.map((f, i) => (
          <FormatCard key={f.title} format={f} delay={i * 0.08} isInView={isInView} />
        ))}
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .format-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .format-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function FormatCard({
  format,
  delay,
  isInView,
}: {
  format: { num: string; title: string; desc: string };
  delay: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="transition-all"
      style={{
        background: "#111111",
        borderRadius: 14,
        padding: 36,
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: isHovered ? `0 8px 30px ${EMERALD}15` : "none",
        transitionDuration: "0.4s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Numbered circle - editorial style */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: `1px solid rgba(15,115,94,0.2)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 11,
            fontWeight: 600,
            color: `${EMERALD}80`,
          }}
        >
          {format.num}
        </span>
      </div>
      <h4
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 700,
          color: "var(--white)",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        {format.title}
      </h4>
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 14.5,
          fontWeight: 300,
          color: "#707070",
          lineHeight: 1.7,
        }}
      >
        {format.desc}
      </p>
    </motion.div>
  );
}

// =============================================================================
// CHAPTER 8: WHO THIS IS FOR
// =============================================================================

function Audience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const roles = [
    "Chief Data Officer",
    "Chief AI Officer",
    "Chief Information Officer",
    "Chief Technology Officer",
    "Chief Digital Officer",
    "Head of Data Science / Analytics",
    "Head of Machine Learning / AI",
    "Data Architect / AI Architect",
    "Director of Data Engineering",
    "Head of Digital Transformation",
  ];

  const industries = [
    "Government & Public Sector",
    "Banking & Financial Services",
    "Energy & Utilities",
    "Healthcare & Pharmaceuticals",
    "Telecommunications & IT",
    "Retail & E-Commerce",
    "Education & Research",
    "Manufacturing",
    "Transportation & Logistics",
    "Media & Entertainment",
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "#0A0A0A",
        padding: "80px 24px",
      }}
    >
      {/* Intro - Narrow */}
      <div style={{ maxWidth: NARROW, margin: "0 auto 48px" }}>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 800,
            color: "var(--white)",
            margin: 0,
          }}
        >
          Built for Decision-Makers
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 17,
            fontWeight: 300,
            color: "#808080",
            lineHeight: 1.7,
            marginTop: 16,
          }}
        >
          Data & AI First is designed for the people who decide how
          organizations adopt AI. Not observers — operators.
        </motion.p>
      </div>

      {/* Two columns - Wide */}
      <div
        className="audience-grid"
        style={{
          maxWidth: WIDE,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 10,
              fontWeight: 600,
              color: EMERALD,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Roles
          </span>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
            {roles.map((role) => (
              <li
                key={role}
                className="flex items-center gap-3"
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 15,
                  color: "#909090",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: EMERALD,
                    opacity: 0.5,
                  }}
                />
                {role}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 10,
              fontWeight: 600,
              color: EMERALD,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Industries
          </span>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
            {industries.map((ind) => (
              <li
                key={ind}
                className="flex items-center gap-3"
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 15,
                  color: "#909090",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: EMERALD,
                    opacity: 0.5,
                  }}
                />
                {ind}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .audience-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}

// =============================================================================
// CHAPTER 9: THE CITIES
// =============================================================================

function Cities() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cities = [
    {
      name: "Kuwait City",
      status: "INAUGURAL — APR 20, 2026",
      active: true,
      image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&q=80",
    },
    {
      name: "Abu Dhabi",
      status: "2027",
      active: false,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    },
    {
      name: "Riyadh",
      status: "2027",
      active: false,
      image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=600&q=80",
    },
    {
      name: "Doha",
      status: "2027",
      active: false,
      image: "https://images.unsplash.com/photo-1548017395-5b5e6e645dc4?w=600&q=80",
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "#0A0A0A",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: WIDE, margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 800,
            color: "var(--white)",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          Where We're Going
        </motion.h2>

        <div
          className="cities-grid flex justify-center gap-5"
          style={{ flexWrap: "wrap" }}
        >
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              style={{
                flex: city.active ? "0 0 240px" : "0 0 200px",
                opacity: city.active ? 1 : 0.5,
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/5",
                  borderRadius: 14,
                  overflow: "hidden",
                  marginBottom: 16,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={city.image}
                  alt={city.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: city.active ? "brightness(0.7)" : "brightness(0.3)",
                  }}
                />
                {city.active && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: `2px solid ${EMERALD}`,
                      borderRadius: 14,
                      boxShadow: `0 0 30px ${EMERALD}40`,
                    }}
                  />
                )}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: city.active ? 18 : 15,
                  fontWeight: 700,
                  color: "var(--white)",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {city.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 10,
                  fontWeight: 600,
                  color: city.active ? EMERALD : "#505050",
                  textAlign: "center",
                  letterSpacing: "1.5px",
                  marginTop: 6,
                }}
              >
                {city.status}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 15,
            fontStyle: "italic",
            color: "#505050",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Kuwait is just the beginning.
        </motion.p>
      </div>
    </section>
  );
}

// =============================================================================
// CHAPTER 10: INAUGURAL EDITION CTA
// =============================================================================

function InauguralCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-04-20T09:00:00");
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: `linear-gradient(180deg, #0A0A0A 0%, rgba(15,115,94,0.04) 50%, #0A0A0A 100%)`,
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: NARROW, margin: "0 auto", textAlign: "center" }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 10,
            fontWeight: 600,
            color: EMERALD,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Inaugural Edition
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginTop: 20,
          }}
        >
          <span style={{ color: "var(--white)" }}>Data & AI First</span>
          <br />
          <span style={{ color: EMERALD }}>Kuwait</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 16,
            color: "#707070",
            marginTop: 20,
          }}
        >
          April 20, 2026 · Kuwait City · Venue TBA
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-4"
          style={{ marginTop: 40 }}
        >
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Min" />
          <CountdownUnit value={timeLeft.seconds} label="Sec" />
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
          style={{ marginTop: 40 }}
        >
          <Link
            href="/events/data-ai-first/kuwait#register"
            style={{
              padding: "16px 36px",
              borderRadius: 50,
              background: EMERALD,
              fontFamily: "var(--font-outfit)",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--white)",
            }}
          >
            Register Now →
          </Link>
          <Link
            href="/brochure"
            style={{
              padding: "16px 36px",
              borderRadius: 50,
              background: "transparent",
              border: `1px solid ${EMERALD}50`,
              fontFamily: "var(--font-outfit)",
              fontSize: 15,
              fontWeight: 500,
              color: EMERALD,
            }}
          >
            Download Brochure
          </Link>
          <Link
            href="/sponsors"
            style={{
              padding: "16px 36px",
              borderRadius: 50,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              fontFamily: "var(--font-outfit)",
              fontSize: 15,
              fontWeight: 500,
              color: "#808080",
            }}
          >
            Sponsor This Edition
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 32,
          fontWeight: 800,
          color: EMERALD,
          margin: 0,
        }}
      >
        {value.toString().padStart(2, "0")}
      </p>
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 9,
          color: "#404040",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginTop: 4,
        }}
      >
        {label}
      </p>
    </div>
  );
}

// =============================================================================
// CHAPTER 11: REGISTRATION FORM
// =============================================================================

function RegistrationForm() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#0A0A0A",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: NARROW, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontWeight: 800,
              color: "var(--white)",
              margin: 0,
            }}
          >
            Register Your Interest
          </h2>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 15,
              color: "#606060",
              marginTop: 12,
            }}
          >
            <span style={{ color: EMERALD }}>·</span> Be first to know when full registration opens.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <UnderlineInput placeholder="First Name" />
          <UnderlineInput placeholder="Last Name" />
          <UnderlineInput placeholder="Work Email" type="email" />
          <UnderlineInput placeholder="Company" />
          <UnderlineInput placeholder="Job Title" />
          <UnderlineSelect />
          <button
            type="submit"
            style={{
              width: "100%",
              background: EMERALD,
              border: "none",
              borderRadius: 8,
              padding: "14px",
              fontFamily: "var(--font-outfit)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "1px",
              color: "var(--white)",
              cursor: "pointer",
              marginTop: 40,
            }}
          >
            Register Interest →
          </button>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 12,
              color: "#404040",
              textAlign: "center",
              marginTop: 16,
            }}
          >
            By registering, you agree to receive updates about Data & AI First.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function UnderlineInput({ placeholder, type = "text" }: { placeholder: string; type?: string }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${isFocused ? EMERALD : "rgba(255,255,255,0.1)"}`,
        padding: "16px 0",
        marginBottom: 28,
        fontFamily: "var(--font-outfit)",
        fontSize: 16,
        fontWeight: 400,
        color: "var(--white)",
        outline: "none",
        transition: "border-color 0.3s",
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

function UnderlineSelect() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ position: "relative", marginBottom: 28 }}>
      <select
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${isFocused ? EMERALD : "rgba(255,255,255,0.1)"}`,
          padding: "16px 0",
          fontFamily: "var(--font-outfit)",
          fontSize: 16,
          fontWeight: 300,
          color: "#404040",
          outline: "none",
          cursor: "pointer",
          appearance: "none",
          transition: "border-color 0.3s",
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <option>Select Industry</option>
        <option>Government</option>
        <option>Finance</option>
        <option>Technology</option>
        <option>Healthcare</option>
        <option>Energy</option>
        <option>Education</option>
        <option>Other</option>
      </select>
      {/* Dropdown chevron */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke={EMERALD}
        strokeWidth="2"
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

// =============================================================================
// CHAPTER 12: EXPLORE OTHER SERIES
// =============================================================================

function OtherSeries() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const series = [
    {
      title: "Cyber First",
      tagline: "Defending the Digital Frontier",
      color: "#01BBF5",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80",
      href: "/events/cyber-first",
    },
    {
      title: "OT Security First",
      tagline: "Protecting What Runs the World",
      color: "#D34B9A",
      image: "https://images.unsplash.com/photo-1518709414768-a88981a4515d?w=400&q=80",
      href: "/events/ot-security-first",
    },
    {
      title: "Opex First",
      tagline: "Operational Excellence for the Modern Enterprise",
      color: "#7C3AED",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
      href: "/events/opex-first",
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "#0A0A0A",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: WIDE, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 10,
              fontWeight: 600,
              color: "#E8651A",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            From Events First Group
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 800,
              color: "var(--white)",
              marginTop: 12,
            }}
          >
            Explore Our Other Series
          </h2>
        </motion.div>

        <div
          className="other-series-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {series.map((s, i) => (
            <SeriesCard key={s.title} series={s} delay={i * 0.1} isInView={isInView} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .other-series-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function SeriesCard({
  series,
  delay,
  isInView,
}: {
  series: { title: string; tagline: string; color: string; image: string; href: string };
  delay: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <Link
        href={series.href}
        style={{ display: "block" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            background: "#111111",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: isHovered ? `0 0 30px ${series.color}20` : "none",
            transition: "box-shadow 0.3s",
          }}
        >
          <div style={{ height: 3, background: series.color }} />
          <div style={{ height: 120, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={series.image}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.3)",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.4s",
              }}
            />
          </div>
          <div style={{ padding: 24 }}>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 700,
                color: "var(--white)",
                margin: 0,
              }}
            >
              {series.title}
            </h4>
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 13,
                color: "#606060",
                marginTop: 6,
              }}
            >
              {series.tagline}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// =============================================================================
// CHAPTER 13: NEWSLETTER
// =============================================================================

function Newsletter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section
      ref={ref}
      style={{
        background: "#0A0A0A",
        padding: "80px 24px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ maxWidth: NARROW, margin: "0 auto", textAlign: "center" }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 700,
            color: "var(--white)",
            margin: 0,
          }}
        >
          Stay in the loop.
        </h3>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 14,
            color: "#606060",
            marginTop: 12,
            marginBottom: 28,
          }}
        >
          Get updates on Data & AI First — editions, speakers, and early-bird
          access.
        </p>
        <form
          className="flex justify-center gap-3"
          style={{ maxWidth: 450, margin: "0 auto" }}
        >
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              background: "#111111",
              border: `1px solid ${isFocused ? `${EMERALD}50` : "rgba(255,255,255,0.06)"}`,
              borderRadius: 50,
              padding: "14px 24px",
              fontFamily: "var(--font-outfit)",
              fontSize: 14,
              color: "var(--white)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button
            type="submit"
            style={{
              background: EMERALD,
              border: "none",
              borderRadius: 50,
              padding: "14px 28px",
              fontFamily: "var(--font-outfit)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--white)",
              cursor: "pointer",
            }}
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </section>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function DataAIFirstPage() {
  return (
    <div style={{ background: "#0A0A0A" }}>
      <Hero />
      <Thesis />
      <DataWall />
      <PullQuote>
        Between ambition and execution, there's a summit series.
      </PullQuote>
      <Topics />
      <Format />
      <PullQuote>
        Not another tech conference with vendor pitches and recycled keynotes.
      </PullQuote>
      <Audience />
      <Cities />
      <InauguralCTA />
      <RegistrationForm />
      <OtherSeries />
      <Newsletter />
      <Footer />
    </div>
  );
}
