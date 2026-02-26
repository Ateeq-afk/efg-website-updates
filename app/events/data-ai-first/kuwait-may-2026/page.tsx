"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { Footer } from "@/components/sections";
import { NeuralConstellation, DotMatrixGrid } from "@/components/effects";

// ─── Constants ───────────────────────────────────────────────────────────────
const E = "#0F735E";
const E_BRIGHT = "#14A882";
const EFG_ORANGE = "#E8651A";
const EASE = [0.16, 1, 0.3, 1] as const;
const EVENT_DATE = new Date("2026-05-18T08:00:00+03:00");

// ─── Countdown Hook ─────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return setT({ d: 0, h: 0, m: 0, s: 0 });
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({
  to,
  suffix = "",
  duration = 1800,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ─── 3D Tilt Wrapper ─────────────────────────────────────────────────────────
function Tilt({
  children,
  max = 10,
  style,
}: {
  children: React.ReactNode;
  max?: number;
  style?: React.CSSProperties;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 250, damping: 22 });
  const sry = useSpring(ry, { stiffness: 250, damping: 22 });

  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max);
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 900,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const EVENT_STATS = [
  { n: 250, suffix: "+", label: "Attendees" },
  { n: 25, suffix: "+", label: "Industry Experts" },
  { n: 15, suffix: "+", label: "Sponsors" },
  { n: 8, suffix: "", label: "Awards" },
  { n: 4, suffix: "", label: "Panel Discussions" },
];

// TODO: Add speaker photos when available
const SPEAKERS: {
  name: string;
  title: string;
  org: string;
  photo: string | null;
}[] = [
  { name: "Dr Khalid Al Begain", title: "President", org: "KCST", photo: null },
  { name: "Mai AlOwaish", title: "CEO", org: "CINET", photo: null },
  { name: "Sudhakar Nibhanupudi", title: "Group Chief Data Officer", org: "National Bank of Kuwait", photo: null },
  { name: "Iyad Atieh", title: "CISO", org: "Alghanim Industries", photo: null },
  { name: "Abdullah AlNusef", title: "Chief Data Officer", org: "Bank Boubyan", photo: null },
  { name: "Abdulmohsen Alsulaimi", title: "Group CTO", org: "Towell International Holding", photo: null },
  { name: "Amr Wageeh", title: "General Counsel & FDI Policy Advisor", org: "KDIPA", photo: null },
];

const FOCUS_AREAS: { title: string; desc: string; icon: string }[] = [
  { title: "Vision 2035 Roadmap", desc: "Aligning Kuwait's national AI strategy with Vision 2035 milestones to build a knowledge-based, innovation-driven economy less reliant on oil revenues.", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
  { title: "National Data Sovereignty", desc: "Establishing frameworks for sovereign data governance, localized storage, and resilient national data infrastructure to protect Kuwait's digital assets.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { title: "Digital Identity & e-Government", desc: "Advancing secure digital identity systems incorporating biometrics and evolving e-Government services for citizen-centric authentication and engagement.", icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" },
  { title: "AI & Data Driven Transformation", desc: "Strategies for enterprise-wide AI adoption, turning data and AI into regulated, profitable, and scalable business solutions across sectors.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { title: "Economic & Social Impact", desc: "Measuring AI's contribution to economic diversification, job creation, and social advancement — targeting 50,000+ new tech jobs by 2030.", icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { title: "Ethical Governance & Mitigation", desc: "Frameworks for transparency, fairness, and accountability in AI systems — mitigating bias in hiring, ensuring equitable outcomes in Kuwait's multicultural society.", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" },
  { title: "Data Ecosystem & Privacy", desc: "Addressing efficient data collection, storage, and management — sovereign AI-enabled data centres, resilient cloud infrastructure, and expanded data-exchange projects.", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" },
  { title: "Women in Technology", desc: "Championing diversity in data science and AI leadership — showcasing women leaders, building inclusive teams, and closing the gender gap in technology.", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { title: "Public Sector AI Modernization", desc: "Transforming government services through AI — improving administrative efficiency, citizen engagement, and budget allocation for digital infrastructure.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { title: "Digital Trust & Threat Detection", desc: "Building digital trust amid global partnerships — strategies for ensuring respect for local traditions while adhering to global cybersecurity and data protection standards.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { title: "AI Risk & Compliance", desc: "Navigating Kuwait's AI regulatory landscape — risk compliance frameworks, ethical biases, and building organisational readiness for AI governance mandates.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
  { title: "Resilient Cloud Infrastructure", desc: "Establishing scalable data centres and cloud platforms for disaster recovery, AI integration, and supporting Kuwait's projected $43.36B ICT market growth by 2030.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
];

const MARKET_STATS: {
  value: number;
  suffix: string;
  unit: string;
  label: string;
  note: string;
}[] = [
  { value: 43, suffix: "B", unit: "USD", label: "Kuwait ICT Market by 2030", note: "Growing from $27.12B current valuation" },
  { value: 9, suffix: "B", unit: "USD", label: "AI & Digital Investment", note: "$3B AI + $6B digital transformation" },
  { value: 800, suffix: "M", unit: "USD", label: "KOC Digital Transformation", note: "11 sub-projects across oil sector" },
  { value: 50, suffix: "K+", unit: "JOBS", label: "New Tech Jobs by 2030", note: "KD 1B annual revenues projected" },
];

const HIGHLIGHTS: { title: string; desc: string; icon: string }[] = [
  { title: "Insightful Discussions", desc: "Expert-led panels on Kuwait's AI strategy, Vision 2035 alignment, and enterprise transformation.", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { title: "Real-Time Case Studies", desc: "Live demonstrations of AI deployments with measurable outcomes from Kuwait and GCC enterprises.", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { title: "100% Big Data & AI Focus", desc: "Every session is purpose-built for data and AI practitioners — no diluted content.", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" },
  { title: "Workshops & Learning", desc: "Interactive deep-dive sessions on critical AI challenges facing Kuwaiti businesses and government.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { title: "Networking Opportunities", desc: "Curated connections with 250+ senior leaders — CDOs, CTOs, government officials, and innovators.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { title: "Award Ceremony", desc: "Celebrating 8 categories of excellence in AI transformation, data innovation, and governance leadership.", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  { title: "Startup Pitch Session", desc: "Showcasing Kuwait's most promising AI and data startups to investors, corporates, and government buyers.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  { title: "Investment Opportunities", desc: "Direct access to AI investment pipelines, $9B+ in planned digital sector spending, and partnership frameworks.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Regulatory Sandbox", desc: "Explore AI governance models and regulatory frameworks in a structured environment with policymakers.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { title: "Technology Showcase", desc: "Hands-on demonstrations of Edge AI, IoT integration, generative AI platforms, and cloud-native solutions.", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
];

const AGENDA: {
  time: string;
  title: string;
  type: "registration" | "ceremony" | "panel" | "keynote" | "presentation" | "break" | "awards";
  brief?: string;
}[] = [
  { time: "8:00 – 9:00", title: "Registration, Networking & Refreshments", type: "registration" },
  { time: "9:00 – 9:15", title: "Welcome Remarks & Opening Ceremony", type: "ceremony" },
  { time: "9:15 – 9:30", title: "Kuwait's Transformative Journey & Catalyzing Vision", type: "keynote", brief: "Kuwait's roadmap to becoming a regional AI leader" },
  { time: "9:30 – 10:15", title: "Shaping Kuwait's AI & Data Ecosystem — Vision 2035 to Execution", type: "panel", brief: "Strategic integration, public-private partnerships, GenAI applications" },
  { time: "10:15 – 10:30", title: "Enterprise AI Transformation", type: "keynote", brief: "Turning Data & AI into regulated, profitable solutions" },
  { time: "10:30 – 11:00", title: "VIP Exhibition Tour & Networking Break", type: "break" },
  { time: "11:00 – 11:40", title: "Building a Robust Data Ecosystem — Privacy & Data Centres", type: "panel", brief: "National data sovereignty, resilient cloud infrastructure" },
  { time: "11:45 – 12:00", title: "Edge AI & IoT for Real-Time Applications", type: "presentation" },
  { time: "12:00 – 12:15", title: "AI for Sustainability, Energy & Oil and Gas", type: "presentation" },
  { time: "12:15 – 13:00", title: "AI-Driven Transformation — Mitigating Threats", type: "panel", brief: "Bias mitigation, ethical compliance, digital trust" },
  { time: "13:00 – 13:30", title: "Prayer & Networking Break", type: "break" },
  { time: "13:30 – 13:45", title: "AI for Energy Efficiency & Oil and Gas", type: "presentation" },
  { time: "13:45 – 14:30", title: "Advancing e-Government & Digital Identity", type: "panel", brief: "Biometrics, citizen services, national security" },
  { time: "14:30 – 14:45", title: "AI Impact in Organisations", type: "presentation", brief: "Operational risks, decision making, customer service" },
  { time: "14:45 – 15:00", title: "Awards Ceremony & Close of Conference", type: "awards" },
];

const AWARDS: { title: string; desc: string }[] = [
  { title: "AI Transformation Leader", desc: "Recognising leaders driving enterprise-wide AI adoption and measurable business outcomes." },
  { title: "Data-Driven Innovation", desc: "Celebrating organisations leveraging data to create breakthrough products and services." },
  { title: "Public Sector AI & Data Impact", desc: "Honouring government entities advancing citizen services through AI and data analytics." },
  { title: "AI Ethics & Governance Champion", desc: "Recognising commitment to responsible AI — transparency, fairness, and accountability." },
  { title: "Data & AI Ecosystem Contributor", desc: "Celebrating contributions to building Kuwait's national data and AI infrastructure." },
  { title: "AI & Data Visionary Award", desc: "Honouring individuals whose vision is shaping the future of AI in Kuwait and the GCC." },
  { title: "Emerging AI & Data Talent", desc: "Spotlighting rising professionals making exceptional early-career contributions." },
  { title: "AI & Data Educator / Mentor", desc: "Celebrating those advancing AI literacy and mentoring the next generation of talent." },
];

const WHY_ATTEND: { title: string; desc: string; icon: string }[] = [
  { title: "Shape Kuwait's Digital Horizon", desc: "Directly contribute to the national discourse on Data and AI — influencing policy, investment, and strategic direction.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Curated Connections", desc: "Move beyond generic networking — connect with 250+ handpicked senior leaders, CDOs, government strategists, and AI architects.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { title: "Practical, Localized Strategies", desc: "Laser-focused on actionable strategies for deploying Data and AI solutions specifically within the Kuwaiti context.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { title: "Deep-Dive Workshops", desc: "Interactive sessions on critical Data and AI challenges facing Kuwaiti businesses and government — bring your toughest problems.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { title: "Co-Create Kuwait's AI Roadmap", desc: "A dedicated session to outline Kuwait's National Data & AI roadmap — contribute to strategic priorities and investment areas.", icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" },
  { title: "Overcome AI Challenges", desc: "Discuss your challenges with data and AI solution providers, get expert answers, and create strategic alliances.", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const WHO_SHOULD_ATTEND = {
  roles: [
    "Government Officials",
    "Senior Advisors",
    "CIO",
    "CTO",
    "CDO",
    "Chief AI Officer",
    "Chief Digital Officer",
    "Chief Innovation Officer",
    "Chief Strategy Officer",
    "Head of Data Science",
    "Head of ML / AI",
    "Data Architect",
    "AI Architect",
    "Director of Data Engineering",
    "Head of BI",
    "Head of Digital Transformation",
    "Innovation Leads",
    "Business Unit Leaders",
    "Academics & Researchers",
  ],
  industries: [
    { name: "Government & Public Sector", pct: 20 },
    { name: "Technology", pct: 15 },
    { name: "BFSI", pct: 15 },
    { name: "Energy", pct: 10 },
    { name: "Transportation", pct: 10 },
    { name: "Education", pct: 10 },
    { name: "Healthcare", pct: 10 },
    { name: "Manufacturing & Retail", pct: 10 },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
//  PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function DataAIFirstKuwait2026() {
  return (
    <div style={{ background: "#0A0A0A" }}>
      <HeroSection />
      <StatsBar />
      <MarketContext />
      <FocusAreas />
      <HighlightsGrid />
      <AgendaTimeline />
      <AtmosphereDivider />
      <Speakers />
      <AwardsSection />
      <WhoShouldAttend />
      <WhyAttend />
      <SplitCTA />
      <Venue />
      <Footer />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  1. HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function HeroSection() {
  const cd = useCountdown(EVENT_DATE);

  return (
    <section
      className="daik-hero-section relative w-full overflow-hidden"
      style={{ minHeight: "100vh", background: "#060D0B" }}
    >
      {/* ── AI Face image — full-bleed, anchored right ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ai-photo.jpeg"
          alt=""
          aria-hidden="true"
          className="daik-hero-img absolute"
          style={{
            top: 0,
            right: 0,
            width: "65%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
          }}
        />

        {/* Left dissolve — wide gradient so image melts into dark bg seamlessly */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, #060D0B 30%, rgba(6,13,11,0.85) 42%, rgba(6,13,11,0.4) 55%, transparent 72%)`,
          }}
        />

        {/* Top fade */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, #060D0B 0%, transparent 18%)`,
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, #060D0B 0%, transparent 22%)`,
          }}
        />

        {/* Emerald color wash — unifies the teal image with the emerald theme */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 70% 45%, rgba(15,115,94,0.06) 0%, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* ── Atmospheric layers (on top of image) ── */}

      {/* Emerald radial glow — left side, behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 70% at 20% 50%, rgba(15,115,94,0.08) 0%, transparent 70%)`,
          zIndex: 2,
        }}
      />

      {/* Emerald glow — bottom anchor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 35% at 50% 100%, rgba(15,115,94,0.06) 0%, transparent 60%)`,
          zIndex: 2,
        }}
      />

      {/* Effects */}
      <NeuralConstellation color={E} dotCount={20} connectionDistance={140} speed={0.25} opacity={0.10} />
      <DotMatrixGrid color={E} opacity={0.02} spacing={30} />

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.02,
          zIndex: 3,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* ── Text content — left-aligned, on top of everything ── */}
      <div
        className="relative z-10 flex flex-col justify-center"
        style={{
          minHeight: "100vh",
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 60px)",
          paddingBottom: 60,
        }}
      >
        <div style={{ maxWidth: 560 }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span style={{ width: 32, height: 2, background: E }} />
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: E_BRIGHT,
              }}
            >
              Data & AI First Series &middot; Kuwait
            </span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            style={{ marginTop: 20, display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "6px 18px",
                borderRadius: 50,
                background: `${E}15`,
                border: `1px solid ${E}30`,
                fontFamily: "var(--font-outfit)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: E_BRIGHT,
              }}
            >
              Inaugural Edition &middot; 18 May 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="daik-shimmer"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(48px, 7vw, 100px)",
              letterSpacing: "-3px",
              lineHeight: 0.95,
              marginTop: 24,
              background: `linear-gradient(90deg, #ffffff 0%, ${E_BRIGHT} 50%, #ffffff 100%)`,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Intelligence
            <br />
            Amplified
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "clamp(16px, 1.8vw, 19px)",
              fontWeight: 300,
              color: "#909090",
              maxWidth: 460,
              marginTop: 28,
              lineHeight: 1.6,
            }}
          >
            Kuwait&rsquo;s Journey to an AI-Driven Era — turning data & AI into
            regulated, profitable, and scalable solutions.
          </motion.p>

          {/* Date + Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center gap-5"
            style={{ marginTop: 28 }}
          >
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={E_BRIGHT} strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 400, color: "#909090" }}>
                May 18, 2026
              </span>
            </span>
            <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)" }} />
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={E_BRIGHT} strokeWidth="2" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 400, color: "#909090" }}>
                Kuwait City, Kuwait
              </span>
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
            className="flex flex-wrap gap-4"
            style={{ marginTop: 36 }}
          >
            <HeroCTA primary href="#register">Reserve Your Seat</HeroCTA>
            <HeroCTA href="#sponsors">Become a Sponsor</HeroCTA>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="daik-bottom-bar absolute bottom-0 left-0 right-0 z-20"
        style={{
          padding: "14px clamp(20px, 4vw, 60px)",
          background: "rgba(6,13,11,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: `1px solid ${E}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Left: Inaugural badge */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
              style={{ background: E_BRIGHT, animationDuration: "2s" }}
            />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: E_BRIGHT }} />
          </span>
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: E_BRIGHT,
            }}
          >
            Inaugural Edition
          </span>
        </div>

        {/* Center: Countdown */}
        <div className="daik-bar-countdown flex items-center gap-3">
          {[
            { v: cd.d, l: "Days" },
            { v: cd.h, l: "Hrs" },
            { v: cd.m, l: "Min" },
            { v: cd.s, l: "Sec" },
          ].map((u) => (
            <div key={u.l} className="text-center">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 800,
                  color: E_BRIGHT,
                }}
              >
                {u.v.toString().padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 8,
                  fontWeight: 500,
                  color: "#505050",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  display: "block",
                  marginTop: 2,
                }}
              >
                {u.l}
              </span>
            </div>
          ))}
        </div>

        {/* Right: CTA */}
        <Link
          href="#register"
          className="daik-bar-cta transition-all"
          style={{
            padding: "8px 22px",
            borderRadius: 50,
            background: E,
            fontFamily: "var(--font-outfit)",
            fontSize: 12,
            fontWeight: 600,
            color: "white",
          }}
        >
          Register →
        </Link>
      </div>

      {/* Shimmer + responsive */}
      <style jsx global>{`
        @keyframes daikShimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: -100% 50%; }
        }
        .daik-shimmer {
          animation: daikShimmer 4s ease-in-out infinite;
        }
        @media (max-width: 900px) {
          .daik-hero-img {
            width: 100% !important;
            opacity: 0.3 !important;
          }
        }
        @media (max-width: 768px) {
          .daik-bottom-bar {
            flex-direction: column !important;
            gap: 12px !important;
            padding: 16px 20px !important;
            text-align: center;
          }
          .daik-bar-cta { width: 100%; text-align: center; }
        }
        @media (max-width: 600px) {
          .daik-hero-image-wrap {
            height: 40vh !important;
          }
        }
      `}</style>
    </section>
  );
}

function HeroCTA({
  children,
  primary = false,
  href,
}: {
  children: React.ReactNode;
  primary?: boolean;
  href: string;
}) {
  const [h, setH] = useState(false);
  return (
    <Link
      href={href}
      className="inline-flex items-center transition-all"
      style={{
        padding: "14px 32px",
        borderRadius: 50,
        background: primary ? (h ? E_BRIGHT : E) : h ? `${E}15` : "transparent",
        border: primary ? "none" : `1px solid ${E}50`,
        fontFamily: "var(--font-outfit)",
        fontSize: 15,
        fontWeight: 500,
        color: primary ? "white" : E_BRIGHT,
        transitionDuration: "0.3s",
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {children}
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  2. STATS BAR
// ═══════════════════════════════════════════════════════════════════════════════

function StatsBar() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      style={{
        background: "#080808",
        borderTop: `1px solid ${E}15`,
        borderBottom: `1px solid ${E}15`,
        padding: "40px 0",
      }}
    >
      <div
        className="daik-stats-grid"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          display: "grid",
          gridTemplateColumns: `repeat(${EVENT_STATS.length}, 1fr)`,
          gap: 24,
        }}
      >
        {EVENT_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            className="text-center"
            style={{
              borderRight: i < EVENT_STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              paddingRight: 16,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                color: E_BRIGHT,
              }}
            >
              <Counter to={s.n} suffix={s.suffix} />
            </span>
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 11,
                fontWeight: 500,
                color: "#505050",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginTop: 6,
              }}
            >
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .daik-stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 20px 16px !important;
          }
          .daik-stats-grid > div { border-right: none !important; padding-right: 0 !important; }
        }
        @media (max-width: 480px) {
          .daik-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  3. MARKET CONTEXT
// ═══════════════════════════════════════════════════════════════════════════════

function MarketContext() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0A0A0A", padding: "clamp(60px, 8vw, 100px) 0" }}
    >
      <DotMatrixGrid color={E} opacity={0.02} spacing={28} />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: 12 }}>
            <span style={{ width: 30, height: 1, background: E }} />
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: E }}>
              The Opportunity
            </span>
            <span style={{ width: 30, height: 1, background: E }} />
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
            Kuwait&rsquo;s AI & Data Market
            <br />
            Is <span style={{ color: E_BRIGHT }}>Accelerating</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 16,
              fontWeight: 300,
              color: "#606060",
              maxWidth: 560,
              margin: "16px auto 0",
              lineHeight: 1.7,
            }}
          >
            Aligned with Kuwait Vision 2035, the nation is building a knowledge-based
            economy powered by AI, big data, and digital infrastructure.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          className="daik-market-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {MARKET_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: EASE }}
            >
              <MarketCard stat={s} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) { .daik-market-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .daik-market-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function MarketCard({ stat }: { stat: (typeof MARKET_STATS)[0] }) {
  const [h, setH] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <Tilt max={6}>
      <div
        className="relative overflow-hidden transition-all"
        style={{
          borderRadius: 16,
          padding: "28px 24px",
          background: h ? `${E}08` : "rgba(255,255,255,0.02)",
          border: `1px solid ${h ? `${E}30` : "rgba(255,255,255,0.06)"}`,
          transitionDuration: "0.4s",
        }}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        onMouseMove={(ev) => {
          const r = ev.currentTarget.getBoundingClientRect();
          setMouse({ x: ev.clientX - r.left, y: ev.clientY - r.top });
        }}
      >
        {/* Spotlight */}
        <div
          className="absolute pointer-events-none transition-opacity"
          style={{
            width: 200,
            height: 200,
            left: mouse.x - 100,
            top: mouse.y - 100,
            background: `radial-gradient(circle, ${E}15 0%, transparent 70%)`,
            opacity: h ? 1 : 0,
            transitionDuration: "0.3s",
          }}
        />

        {/* Unit label */}
        <span
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#404040",
            position: "relative",
          }}
        >
          {stat.unit}
        </span>

        {/* Value */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 4vw, 48px)",
            fontWeight: 800,
            color: E_BRIGHT,
            margin: "8px 0 0",
            lineHeight: 1,
            position: "relative",
          }}
        >
          <Counter to={stat.value} suffix={stat.suffix} />
        </p>

        {/* Label */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 14,
            fontWeight: 500,
            color: "var(--white)",
            margin: "10px 0 0",
            position: "relative",
          }}
        >
          {stat.label}
        </p>

        {/* Note */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 12,
            fontWeight: 300,
            color: "#505050",
            margin: "6px 0 0",
            lineHeight: 1.5,
            position: "relative",
          }}
        >
          {stat.note}
        </p>
      </div>
    </Tilt>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  4. FOCUS AREAS
// ═══════════════════════════════════════════════════════════════════════════════

function FocusAreas() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIdx, setActiveIdx] = useState(0);
  const active = FOCUS_AREAS[activeIdx];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#111111", padding: "clamp(60px, 8vw, 100px) 0" }}
    >
      <DotMatrixGrid color={E} opacity={0.015} spacing={24} />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: 12 }}>
            <span style={{ width: 30, height: 1, background: E }} />
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: E }}>
              What We Cover
            </span>
            <span style={{ width: 30, height: 1, background: E }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(30px, 3.5vw, 48px)",
              letterSpacing: "-1.5px",
              color: "var(--white)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            12 Strategic Focus Areas
          </h2>
        </motion.div>

        {/* Console layout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="daik-focus-console"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 20,
            alignItems: "start",
          }}
        >
          {/* Left: Card grid */}
          <div
            className="daik-focus-cards"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
            }}
          >
            {FOCUS_AREAS.map((fa, i) => (
              <FocusCard
                key={i}
                idx={i}
                title={fa.title}
                isActive={i === activeIdx}
                onClick={() => setActiveIdx(i)}
              />
            ))}
          </div>

          {/* Right: Detail panel */}
          <div
            className="daik-focus-detail relative overflow-hidden"
            style={{
              borderRadius: 16,
              background: `${E}06`,
              border: `1px solid ${E}15`,
              padding: "clamp(24px, 3vw, 40px)",
              minHeight: 340,
            }}
          >
            {/* Watermark number */}
            <span
              style={{
                position: "absolute",
                top: -10,
                right: 10,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(100px, 12vw, 160px)",
                fontWeight: 900,
                color: `${E}08`,
                lineHeight: 1,
                pointerEvents: "none",
              }}
            >
              {(activeIdx + 1).toString().padStart(2, "0")}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ position: "relative" }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${E}12`,
                    border: `1px solid ${E}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={E_BRIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={active.icon} />
                  </svg>
                </div>

                {/* Label */}
                <span
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: E,
                  }}
                >
                  Focus Area {(activeIdx + 1).toString().padStart(2, "0")}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(22px, 2.5vw, 30px)",
                    fontWeight: 800,
                    color: "var(--white)",
                    letterSpacing: "-0.5px",
                    margin: "10px 0 0",
                    lineHeight: 1.2,
                  }}
                >
                  {active.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: 15,
                    fontWeight: 300,
                    color: "#808080",
                    lineHeight: 1.8,
                    margin: "14px 0 0",
                    maxWidth: 420,
                  }}
                >
                  {active.desc}
                </p>

                {/* Accent bar */}
                <div style={{ width: 40, height: 3, background: E_BRIGHT, borderRadius: 2, marginTop: 24 }} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .daik-focus-console { grid-template-columns: 1fr !important; }
          .daik-focus-cards { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .daik-focus-cards { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

function FocusCard({
  idx,
  title,
  isActive,
  onClick,
}: {
  idx: number;
  title: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [h, setH] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="text-left transition-all"
      style={{
        padding: "14px 12px",
        borderRadius: 12,
        background: isActive ? `${E}12` : h ? `${E}06` : "rgba(255,255,255,0.02)",
        borderTop: `1px solid ${isActive ? `${E}30` : h ? `${E}15` : "rgba(255,255,255,0.04)"}`,
        borderRight: `1px solid ${isActive ? `${E}30` : h ? `${E}15` : "rgba(255,255,255,0.04)"}`,
        borderBottom: `1px solid ${isActive ? `${E}30` : h ? `${E}15` : "rgba(255,255,255,0.04)"}`,
        borderLeft: isActive ? `3px solid ${E_BRIGHT}` : "3px solid transparent",
        cursor: "pointer",
        transitionDuration: "0.25s",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 11,
          fontWeight: 700,
          color: isActive ? E_BRIGHT : `${E}50`,
          display: "block",
        }}
      >
        {(idx + 1).toString().padStart(2, "0")}
      </span>
      <span
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 11,
          fontWeight: isActive ? 500 : 400,
          color: isActive ? "var(--white)" : h ? "#909090" : "#606060",
          lineHeight: 1.3,
          display: "block",
          marginTop: 4,
        }}
      >
        {title}
      </span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  5. HIGHLIGHTS GRID
// ═══════════════════════════════════════════════════════════════════════════════

function HighlightsGrid() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0A0A0A", padding: "clamp(60px, 8vw, 100px) 0" }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: 12 }}>
            <span style={{ width: 30, height: 1, background: E }} />
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: E }}>
              What Makes This Different
            </span>
            <span style={{ width: 30, height: 1, background: E }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px, 3.5vw, 48px)", letterSpacing: "-1.5px", color: "var(--white)", lineHeight: 1.1, margin: 0 }}>
            10 Reasons to Be There
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          className="daik-highlights-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}
        >
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: EASE }}
            >
              <HighlightCard item={h} idx={i} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) { .daik-highlights-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function HighlightCard({ item, idx }: { item: (typeof HIGHLIGHTS)[0]; idx: number }) {
  const [h, setH] = useState(false);

  return (
    <div
      className="relative overflow-hidden transition-all"
      style={{
        borderRadius: 14,
        padding: "24px 22px",
        background: h ? `${E}06` : "rgba(255,255,255,0.02)",
        border: `1px solid ${h ? `${E}25` : "rgba(255,255,255,0.04)"}`,
        transitionDuration: "0.35s",
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: `${E}10`,
            border: `1px solid ${E}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={E_BRIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={item.icon} />
          </svg>
        </div>

        <div>
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 700,
              color: "var(--white)",
              margin: 0,
            }}
          >
            {item.title}
          </h4>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 13,
              fontWeight: 300,
              color: "#707070",
              lineHeight: 1.6,
              margin: "6px 0 0",
            }}
          >
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  6. AGENDA TIMELINE
// ═══════════════════════════════════════════════════════════════════════════════

function AgendaTimeline() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const typeColor: Record<string, string> = {
    panel: E_BRIGHT,
    keynote: "#C4A34A",
    presentation: "#808080",
    ceremony: E_BRIGHT,
    registration: "#505050",
    break: "#383838",
    awards: "#C4A34A",
  };

  const typeLabel: Record<string, string> = {
    panel: "Panel Discussion",
    keynote: "Keynote",
    presentation: "Presentation",
    ceremony: "Ceremony",
    registration: "Registration",
    break: "Break",
    awards: "Awards",
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#111111", padding: "clamp(60px, 8vw, 100px) 0" }}
    >
      <DotMatrixGrid color={E} opacity={0.015} spacing={26} />

      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: 12 }}>
            <span style={{ width: 30, height: 1, background: E }} />
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: E }}>
              Full Day Agenda
            </span>
            <span style={{ width: 30, height: 1, background: E }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px, 3.5vw, 48px)", letterSpacing: "-1.5px", color: "var(--white)", lineHeight: 1.1, margin: 0 }}>
            One Day. Every Dimension of AI.
          </h2>
          <p style={{ fontFamily: "var(--font-outfit)", fontSize: 12, fontWeight: 400, color: "#505050", marginTop: 12, letterSpacing: "1px" }}>
            Draft agenda — subject to change
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative" style={{ paddingLeft: 40 }}>
          {/* Vertical line */}
          <div
            className="absolute"
            style={{
              left: 14,
              top: 0,
              bottom: 0,
              width: 2,
              background: `linear-gradient(to bottom, ${E}40, ${E}15)`,
            }}
          />

          {AGENDA.map((item, i) => {
            const color = typeColor[item.type] || "#505050";
            const isHighlight = item.type === "panel" || item.type === "keynote" || item.type === "awards";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.04, ease: EASE }}
                className="relative"
                style={{ marginBottom: 12 }}
              >
                {/* Node */}
                <div
                  className="absolute"
                  style={{
                    left: -33,
                    top: 18,
                    width: isHighlight ? 12 : 8,
                    height: isHighlight ? 12 : 8,
                    borderRadius: "50%",
                    background: isHighlight ? color : "transparent",
                    border: isHighlight ? "none" : `2px solid ${color}50`,
                    boxShadow: isHighlight ? `0 0 10px ${color}40` : "none",
                  }}
                />

                {/* Card */}
                <div
                  style={{
                    padding: isHighlight ? "18px 20px" : "12px 20px",
                    borderRadius: 12,
                    background: isHighlight ? `${E}06` : "rgba(255,255,255,0.015)",
                    border: `1px solid ${isHighlight ? `${E}18` : "rgba(255,255,255,0.04)"}`,
                  }}
                >
                  <div className="flex items-center gap-3" style={{ marginBottom: 4 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color }}>
                      {item.time}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-outfit)",
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color,
                        opacity: 0.7,
                        padding: "2px 8px",
                        borderRadius: 50,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      {typeLabel[item.type]}
                    </span>
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: isHighlight ? 16 : 14,
                      fontWeight: isHighlight ? 700 : 500,
                      color: isHighlight ? "var(--white)" : "#c0c0c0",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h4>
                  {item.brief && (
                    <p style={{ fontFamily: "var(--font-outfit)", fontSize: 12, fontWeight: 300, color: "#606060", margin: "6px 0 0", lineHeight: 1.5 }}>
                      {item.brief}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  7. ATMOSPHERE DIVIDER
// ═══════════════════════════════════════════════════════════════════════════════

function AtmosphereDivider() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: "55vh", minHeight: 350 }}>
      <motion.div className="absolute inset-0" style={{ y }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.2) saturate(0.6)", transform: "scale(1.2)" }}
        />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #0A0A0A 0%, transparent 30%, transparent 70%, #111111 100%)" }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${E}08 0%, transparent 60%)` }} />

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full" style={{ padding: "0 24px" }}>
        <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", color: E_BRIGHT }}>
          Kuwait &middot; May 2026
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(24px, 3vw, 40px)",
            letterSpacing: "-1px",
            color: "rgba(255,255,255,0.85)",
            maxWidth: 600,
            lineHeight: 1.2,
            marginTop: 16,
          }}
        >
          Where Kuwait&rsquo;s data and AI leaders shape the future of intelligent governance.
        </h2>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  8. SPEAKERS
// ═══════════════════════════════════════════════════════════════════════════════

function SpeakersSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0A0A0A", padding: "clamp(60px, 8vw, 100px) 0" }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-wrap items-end justify-between gap-4"
          style={{ marginBottom: 40 }}
        >
          <div>
            <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
              <span style={{ width: 30, height: 1, background: E }} />
              <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: E }}>
                The Faculty
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px, 3.5vw, 48px)", letterSpacing: "-1.5px", color: "var(--white)", lineHeight: 1.1, margin: 0 }}>
              Who&rsquo;s Speaking
            </h2>
          </div>
          <span style={{ fontFamily: "var(--font-outfit)", fontSize: 12, fontWeight: 500, color: "#505050", padding: "6px 14px", borderRadius: 50, border: "1px solid rgba(255,255,255,0.06)" }}>
            {SPEAKERS.length}+ Confirmed
          </span>
        </motion.div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {SPEAKERS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: EASE }}
            >
              <SpeakerCard speaker={s} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Speakers() {
  return <SpeakersSection />;
}

function SpeakerCard({ speaker }: { speaker: (typeof SPEAKERS)[0] }) {
  const [h, setH] = useState(false);
  const initials = speaker.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <Tilt max={6}>
      <div
        className="relative overflow-hidden transition-all"
        style={{
          borderRadius: 16,
          aspectRatio: "3 / 4",
          background: "#141414",
          border: `1px solid ${h ? `${E}30` : "rgba(255,255,255,0.06)"}`,
          transform: h ? "translateY(-4px)" : "translateY(0)",
          boxShadow: h ? `0 16px 40px rgba(0,0,0,0.3), 0 0 30px ${E}10` : "none",
          transitionDuration: "0.5s",
          transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        }}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
      >
        {/* Photo or initials fallback */}
        {speaker.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={speaker.photo}
            alt={speaker.name}
            className="w-full h-full object-cover transition-all"
            style={{
              filter: h ? "brightness(0.9) saturate(1)" : "brightness(0.7) saturate(0)",
              transitionDuration: "0.6s",
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${E}20 0%, ${E}08 100%)`,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 48,
                fontWeight: 800,
                color: `${E}40`,
              }}
            >
              {initials}
            </span>
          </div>
        )}

        {/* Bottom gradient */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "60%",
            background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 40%, transparent 100%)",
          }}
        />

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0" style={{ padding: "0 16px 18px" }}>
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 700,
              color: "var(--white)",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {speaker.name}
          </h4>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 12,
              fontWeight: 400,
              color: "#808080",
              margin: "4px 0 0",
              lineHeight: 1.3,
            }}
          >
            {speaker.title}
          </p>
          <span
            style={{
              display: "inline-block",
              marginTop: 6,
              padding: "3px 10px",
              borderRadius: 50,
              background: `${E}15`,
              border: `1px solid ${E}25`,
              fontFamily: "var(--font-outfit)",
              fontSize: 10,
              fontWeight: 500,
              color: E_BRIGHT,
            }}
          >
            {speaker.org}
          </span>
        </div>
      </div>
    </Tilt>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  9. AWARDS
// ═══════════════════════════════════════════════════════════════════════════════

function AwardsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, #111111 0%, ${E}06 50%, #0A0A0A 100%)`,
        padding: "clamp(60px, 8vw, 100px) 0",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: 12 }}>
            <span style={{ width: 30, height: 1, background: "#C4A34A" }} />
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "#C4A34A" }}>
              Recognition
            </span>
            <span style={{ width: 30, height: 1, background: "#C4A34A" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px, 3.5vw, 48px)", letterSpacing: "-1.5px", color: "var(--white)", lineHeight: 1.1, margin: 0 }}>
            8 Awards. Celebrating Excellence.
          </h2>
          <p style={{ fontFamily: "var(--font-outfit)", fontSize: 15, fontWeight: 300, color: "#606060", maxWidth: 500, margin: "14px auto 0", lineHeight: 1.7 }}>
            Honouring pioneers and innovators shaping Kuwait&rsquo;s future through
            Data and Artificial Intelligence.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="daik-awards-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}
        >
          {AWARDS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: EASE }}
            >
              <AwardCard award={a} idx={i} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) { .daik-awards-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .daik-awards-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function AwardCard({ award, idx }: { award: (typeof AWARDS)[0]; idx: number }) {
  const [h, setH] = useState(false);

  return (
    <div
      className="relative overflow-hidden transition-all"
      style={{
        borderRadius: 14,
        padding: "24px 20px",
        background: h ? `${E}08` : "rgba(255,255,255,0.02)",
        border: `1px solid ${h ? `${E}30` : "rgba(255,255,255,0.06)"}`,
        borderLeft: h ? `3px solid #C4A34A` : "3px solid transparent",
        transitionDuration: "0.35s",
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {/* Number */}
      <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, color: "#C4A34A", opacity: 0.6 }}>
        {(idx + 1).toString().padStart(2, "0")}
      </span>

      {/* Trophy icon */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "rgba(196, 163, 74, 0.1)",
          border: "1px solid rgba(196, 163, 74, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>

      <h4 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--white)", margin: "14px 0 0", lineHeight: 1.3 }}>
        {award.title}
      </h4>
      <p style={{ fontFamily: "var(--font-outfit)", fontSize: 12, fontWeight: 300, color: "#606060", margin: "6px 0 0", lineHeight: 1.6 }}>
        {award.desc}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  10. WHO SHOULD ATTEND
// ═══════════════════════════════════════════════════════════════════════════════

function WhoShouldAttend() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0A0A0A", padding: "clamp(60px, 8vw, 100px) 0" }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: 12 }}>
            <span style={{ width: 30, height: 1, background: E }} />
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: E }}>
              Your Peers
            </span>
            <span style={{ width: 30, height: 1, background: E }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px, 3.5vw, 48px)", letterSpacing: "-1.5px", color: "var(--white)", lineHeight: 1.1, margin: 0 }}>
            Who Should Attend
          </h2>
        </motion.div>

        {/* Two columns */}
        <div
          className="daik-attend-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}
        >
          {/* Left: Role pills */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--white)", marginBottom: 20 }}>
              Target Roles
            </h3>
            <div className="flex flex-wrap gap-2">
              {WHO_SHOULD_ATTEND.roles.map((role) => (
                <span
                  key={role}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 50,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    fontFamily: "var(--font-outfit)",
                    fontSize: 12,
                    fontWeight: 400,
                    color: "#909090",
                  }}
                >
                  {role}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Industry bars */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--white)", marginBottom: 20 }}>
              Industry Breakdown
            </h3>
            <div className="flex flex-col gap-4">
              {WHO_SHOULD_ATTEND.industries.map((ind, i) => (
                <div key={ind.name}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                    <span style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 400, color: "#909090" }}>
                      {ind.name}
                    </span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: E_BRIGHT }}>
                      {ind.pct}%
                    </span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${ind.pct}%` } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.06, ease: EASE }}
                      style={{ height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${E}, ${E_BRIGHT})` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) { .daik-attend-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  11. WHY ATTEND
// ═══════════════════════════════════════════════════════════════════════════════

function WhyAttend() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#111111", padding: "clamp(60px, 8vw, 100px) 0" }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: 12 }}>
            <span style={{ width: 30, height: 1, background: E }} />
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: E }}>
              Why Attend
            </span>
            <span style={{ width: 30, height: 1, background: E }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px, 3.5vw, 48px)", letterSpacing: "-1.5px", color: "var(--white)", lineHeight: 1.1, margin: 0 }}>
            6 Reasons to Join Us
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          className="daik-why-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}
        >
          {WHY_ATTEND.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
            >
              <WhyCard item={w} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) { .daik-why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function WhyCard({ item }: { item: (typeof WHY_ATTEND)[0] }) {
  const [h, setH] = useState(false);

  return (
    <div
      className="relative overflow-hidden transition-all"
      style={{
        borderRadius: 16,
        padding: "28px 24px",
        background: h ? `${E}08` : "rgba(255,255,255,0.02)",
        border: `1px solid ${h ? `${E}25` : "rgba(255,255,255,0.05)"}`,
        transitionDuration: "0.4s",
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {/* Icon */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `${E}10`,
          border: `1px solid ${E}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={E_BRIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={item.icon} />
        </svg>
      </div>

      <h4 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--white)", margin: 0, lineHeight: 1.3 }}>
        {item.title}
      </h4>
      <p style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 300, color: "#707070", margin: "10px 0 0", lineHeight: 1.7 }}>
        {item.desc}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  12. SPLIT CTA
// ═══════════════════════════════════════════════════════════════════════════════

function SplitCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cd = useCountdown(EVENT_DATE);

  return (
    <section
      ref={ref}
      id="register"
      className="relative overflow-hidden"
      style={{ background: "#0A0A0A", padding: "clamp(60px, 8vw, 100px) 0" }}
    >
      {/* Background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ filter: "brightness(0.08) saturate(0.3)" }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${E}08 0%, transparent 60%)` }} />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px, 3.5vw, 48px)", letterSpacing: "-1.5px", color: "var(--white)", lineHeight: 1.1, margin: 0 }}>
            Be Part of Data & AI First Kuwait
          </h2>
        </motion.div>

        {/* Two cards */}
        <div
          className="daik-cta-grid"
          style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}
        >
          {/* Register card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            style={{
              borderRadius: 18,
              padding: "36px 32px",
              background: "rgba(10,10,10,0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${EFG_ORANGE}30`,
            }}
          >
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 10, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: EFG_ORANGE }}>
              For Delegates
            </span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "var(--white)", margin: "12px 0 0", letterSpacing: "-0.5px" }}>
              Reserve Your Seat
            </h3>
            <p style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 300, color: "#707070", margin: "10px 0 0", lineHeight: 1.7, maxWidth: 380 }}>
              Join 250+ senior leaders for a full-day summit on May 18, 2026 in Kuwait City.
            </p>

            {/* Countdown */}
            <div className="flex gap-3" style={{ marginTop: 24 }}>
              {[
                { v: cd.d, l: "Days" },
                { v: cd.h, l: "Hrs" },
                { v: cd.m, l: "Min" },
                { v: cd.s, l: "Sec" },
              ].map((u) => (
                <div
                  key={u.l}
                  className="text-center"
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "rgba(232, 101, 26, 0.08)",
                    border: "1px solid rgba(232, 101, 26, 0.15)",
                    minWidth: 56,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: EFG_ORANGE, display: "block" }}>
                    {u.v.toString().padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: "var(--font-outfit)", fontSize: 8, fontWeight: 500, color: "#505050", letterSpacing: "1px", textTransform: "uppercase" }}>
                    {u.l}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/events/data-ai-first/kuwait-may-2026#register"
              className="inline-flex items-center gap-2 transition-all"
              style={{
                marginTop: 28,
                padding: "14px 32px",
                borderRadius: 50,
                background: EFG_ORANGE,
                fontFamily: "var(--font-outfit)",
                fontSize: 14,
                fontWeight: 600,
                color: "white",
              }}
            >
              Register Now <span>→</span>
            </Link>
          </motion.div>

          {/* Sponsor card */}
          <motion.div
            id="sponsors"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            style={{
              borderRadius: 18,
              padding: "36px 28px",
              background: "rgba(10,10,10,0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${E}25`,
            }}
          >
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 10, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: E_BRIGHT }}>
              For Brands & Vendors
            </span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 800, color: "var(--white)", margin: "12px 0 0", letterSpacing: "-0.5px" }}>
              Explore Partnerships
            </h3>
            <p style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 300, color: "#707070", margin: "10px 0 0", lineHeight: 1.7 }}>
              Connect with Kuwait&rsquo;s top decision-makers in AI and data.
            </p>

            {/* Stats */}
            <div className="flex flex-col gap-3" style={{ marginTop: 24 }}>
              {[
                { n: "250+", l: "Delegates" },
                { n: "25+", l: "Speakers" },
                { n: "15+", l: "Sponsors" },
              ].map((s) => (
                <div key={s.l} className="flex items-center justify-between" style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontFamily: "var(--font-outfit)", fontSize: 13, color: "#707070" }}>{s.l}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800, color: E_BRIGHT }}>{s.n}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="mailto:shyam@eventsfirstgroup.com"
              className="inline-flex items-center gap-2 transition-all"
              style={{
                marginTop: 24,
                padding: "12px 28px",
                borderRadius: 50,
                border: `1px solid ${E}40`,
                fontFamily: "var(--font-outfit)",
                fontSize: 13,
                fontWeight: 500,
                color: E_BRIGHT,
              }}
            >
              Get Partnership Deck <span>→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) { .daik-cta-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  13. VENUE
// ═══════════════════════════════════════════════════════════════════════════════

function Venue() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref}>
      {/* Cinematic photo */}
      <div className="relative overflow-hidden" style={{ height: "65vh", minHeight: 500 }}>
        <motion.div className="absolute inset-0" style={{ y }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=85"
            alt="Kuwait City venue"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.35) saturate(0.7)", transform: "scale(1.15)" }}
          />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0A0A0A 0%, transparent 25%, transparent 60%, rgba(10,10,10,0.9) 100%)" }} />

        {/* Venue name overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10" style={{ padding: "0 clamp(20px, 4vw, 60px) 120px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={E_BRIGHT} strokeWidth="2" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: E_BRIGHT }}>
                The Venue
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-2px", color: "var(--white)", lineHeight: 1.05, margin: 0 }}>
              Kuwait <span style={{ color: E_BRIGHT }}>City</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Floating info card */}
      <div
        style={{
          maxWidth: 1100,
          margin: "-80px auto 0",
          padding: "0 clamp(20px, 4vw, 60px)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          className="daik-venue-inner"
          style={{
            borderRadius: 20,
            background: "rgba(20, 20, 20, 0.85)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: `1px solid ${E}20`,
            padding: "40px",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--white)", margin: "0 0 12px" }}>
              Venue Details
            </h3>
            <p style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 300, color: "#707070", lineHeight: 1.7, margin: 0 }}>
              Data & AI First Kuwait 2026 will be hosted at a premier venue in Kuwait City.
              Final venue details will be announced shortly.
            </p>
          </div>

          {/* Right: Detail grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { label: "Location", value: "Kuwait City" },
              { label: "Date", value: "May 18, 2026" },
              { label: "Time", value: "8:00 AM – 3:00 PM" },
              { label: "Format", value: "Full-Day Summit" },
            ].map((d) => (
              <div
                key={d.label}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p style={{ fontFamily: "var(--font-outfit)", fontSize: 9, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#404040", margin: 0 }}>
                  {d.label}
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--white)", margin: "6px 0 0" }}>
                  {d.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom padding */}
      <div style={{ height: 80, background: "#0A0A0A" }} />

      <style jsx global>{`
        @media (max-width: 768px) {
          .daik-venue-inner {
            grid-template-columns: 1fr !important;
            padding: 28px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
