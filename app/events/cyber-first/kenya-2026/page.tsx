"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { Footer } from "@/components/sections";
import { NeuralConstellation, DotMatrixGrid } from "@/components/effects";
import EventNavigation from "@/components/ui/EventNavigation";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const C = "#01BBF5";
const C_BRIGHT = "#4DD4FF";
const C_DIM = "#0199C7";
const EASE = [0.16, 1, 0.3, 1] as const;

// Kenya-specific accent (warm terracotta/savannah)
const KENYA_ACCENT = "#E07A3D";
const KENYA_GOLD = "#D4A84B";

const S3 = "https://efg-final.s3.eu-north-1.amazonaws.com";
const S3_LOGOS = `${S3}/sponsors-logo`;

// Event date - June 2026
const EVENT_DATE = new Date("2026-06-18T08:00:00+03:00");

// ─── Countdown Hook ──────────────────────────────────────────────────────────
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
function Counter({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
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
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const MARKET_STATS = [
  { value: "29.9", prefix: "KES ", suffix: "B", label: "Cybercrime Losses", note: "Economic impact in 2025", highlight: true },
  { value: "247", suffix: "%", label: "Annual Threat Increase", note: "Cybersecurity incidents in 2025" },
  { value: "96", suffix: "%", label: "Talent Shortage", note: "Only 1,700 of 40,000 experts needed" },
  { value: "842", suffix: "M", label: "Threats Detected", note: "Q3 2025 alone" },
];

const FOCUS_AREAS = [
  {
    title: "Critical Infrastructure Security",
    desc: "Safeguarding national critical infrastructure and neutralizing advanced persistent threats targeting Kenya's digital backbone.",
    icon: "M2 20h20M4 20V10l8-6 8 6v10M9 20v-4a3 3 0 016 0v4",
    wide: true,
  },
  {
    title: "AI & Next-Gen Threat Intelligence",
    desc: "Integrating artificial intelligence and next-generation threat intelligence to combat the rise of 'Algorithmic Warfare' and AI-driven attacks.",
    icon: "M12 2a4 4 0 014 4v1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2V6a4 4 0 014-4zM9 18h6M10 22h4",
  },
  {
    title: "Regulatory Governance & Compliance",
    desc: "Navigating the Computer Misuse and Cybercrimes (Amendment) Act 2025, CSOC operationalization, and evolving data privacy frameworks.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 14l2 2 4-4",
  },
  {
    title: "Financial Sector Cyber Resilience",
    desc: "Protecting Kenya's mobile money ecosystem, digital banking infrastructure, and fintech innovations from sophisticated cyber threats.",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    wide: true,
  },
  {
    title: "Cloud & Digital Transformation",
    desc: "Securing Kenya's position as a strategic gateway for regional cloud infrastructure and protecting the Silicon Savannah's digital economy.",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  {
    title: "Public-Private Collaboration",
    desc: "Building intelligence synergy between government, regulators, and industry to protect national sovereignty and ensure sustained economic growth.",
    icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  },
];

const AGENDA = [
  { time: "08:00 – 09:00", title: "Registration & Networking Breakfast", type: "break" as const },
  { time: "09:00 – 09:20", title: "Opening Keynote", subtitle: "The State of Kenya's Cyber Economy: Navigating the KSh 30 Billion Crisis and Strategic Resilience", type: "keynote" as const },
  { time: "09:20 – 10:10", title: "Panel 1: Critical Infrastructure Security", subtitle: "Safeguarding National Critical Infrastructure & Neutralizing Advanced Threats", type: "panel" as const },
  { time: "10:10 – 10:30", title: "Fireside Chat", subtitle: "Regulatory Governance, Data Privacy & Policy Synchronization", type: "fireside" as const },
  { time: "10:30 – 10:50", title: "Coffee & Networking Break", type: "break" as const },
  { time: "10:50 – 11:35", title: "Panel 2: AI & Threat Intelligence", subtitle: "Integrating AI & Next-Generation Threat Intelligence for Proactive Defense", type: "panel" as const },
  { time: "11:35 – 12:00", title: "Customer Success Story", subtitle: "Enterprise Case Study: From Breach to Resilience", type: "fireside" as const },
  { time: "12:00 – 12:15", title: "Sponsor Presentation", type: "sponsor" as const },
  { time: "12:15 – 12:30", title: "Cyber First Awards Kenya", type: "awards" as const },
  { time: "12:30", title: "Closing Remarks & Networking Lunch", type: "closing" as const },
];

const AWARDS_DATA = [
  { title: "Cybersecurity Visionary of the Year", desc: "Recognizing exceptional strategic vision in advancing Kenya's cybersecurity posture.", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" },
  { title: "Critical Infrastructure Defender", desc: "Outstanding efforts in protecting Kenya's critical national infrastructure from cyber threats.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { title: "AI & Innovation Leadership", desc: "Pioneering the secure adoption of AI and emerging technologies across enterprise Kenya.", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
];

const WHO_ATTEND_INDUSTRIES = [
  { name: "Banking & Financial Services", pct: 28 },
  { name: "Government & Public Sector", pct: 22 },
  { name: "Telecom & Digital Infrastructure", pct: 18 },
  { name: "Energy & Utilities", pct: 12 },
  { name: "Healthcare", pct: 10 },
  { name: "Manufacturing & Industrial", pct: 10 },
];

const KEY_THREATS = [
  { threat: "DDoS Attacks", stat: "46,786+", note: "Highest in East Africa, 3rd on continent" },
  { threat: "Ransomware (Healthcare)", stat: "95%", note: "Escalation in attacks" },
  { threat: "Ransomware (Manufacturing)", stat: "26%", note: "Of all incidents" },
  { threat: "System Misconfigurations", stat: "70.9M", note: "Malware attacks enabled" },
  { threat: "Security Advisories", stat: "19.95M", note: "Issued in Q3 2025 (+15.5%)" },
];

// ─── PAGE COMPONENT ──────────────────────────────────────────────────────────
export default function CyberFirstKenya2026() {
  return (
    <div style={{ background: "#050810" }}>
      <style jsx global>{`
        @media (max-width: 768px) {
          .cfk-hero h1 { font-size: clamp(28px, 9vw, 42px) !important; }
          .cfk-hero-content { padding: 0 20px !important; }
          .cfk-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cfk-focus-grid { grid-template-columns: 1fr !important; }
          .cfk-focus-grid > div { grid-column: span 1 !important; }
          .cfk-market-grid { grid-template-columns: 1fr !important; }
          .cfk-attend-grid { grid-template-columns: 1fr !important; }
          .cfk-threats-grid { grid-template-columns: 1fr !important; }
          .cfk-awards-grid { grid-template-columns: 1fr !important; }
          .cfk-bottom-bar { flex-direction: column !important; gap: 16px !important; text-align: center; }
        }
        @media (max-width: 480px) {
          .cfk-stats-grid > div { padding: 16px 12px !important; }
        }
      `}</style>
      
      <EventNavigation />
      <HeroSection />
      <StatsBar />
      <SiliconSavannahContext />
      <ThreatLandscape />
      <FocusAreas />
      <WhoShouldAttend />
      <AgendaTimeline />
      <AwardsSection />
      <RegistrationSection />
      <Footer />
    </div>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────
function HeroSection() {
  const cd = useCountdown(EVENT_DATE);

  return (
    <section className="cfk-hero" style={{ position: "relative", height: "100vh", minHeight: 700, overflow: "hidden", background: "#050810" }}>
      {/* Nairobi Skyline Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1600&q=80"
          alt="Nairobi Skyline"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.35) saturate(0.9)" }}
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(90deg, rgba(5,8,16,0.95) 0%, rgba(5,8,16,0.7) 40%, rgba(5,8,16,0.4) 70%, rgba(5,8,16,0.3) 100%)`, zIndex: 1 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, rgba(5,8,16,0.5) 0%, transparent 30%, transparent 70%, rgba(5,8,16,0.95) 100%)`, zIndex: 1 }} />

      {/* Subtle Kenya accent glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 50% at 80% 70%, ${KENYA_ACCENT}15, transparent 70%)`, zIndex: 2 }} />

      {/* Cyber effects */}
      <NeuralConstellation color={C} dotCount={25} connectionDistance={120} speed={0.15} opacity={0.05} />
      <DotMatrixGrid color={C} opacity={0.01} spacing={40} />

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${C}03 1px, transparent 1px), linear-gradient(90deg, ${C}03 1px, transparent 1px)`, backgroundSize: "50px 50px", opacity: 0.5, zIndex: 2 }} />

      {/* Content */}
      <div className="cfk-hero-content" style={{ position: "relative", zIndex: 10, height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        
        {/* Silicon Savannah Badge */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2, ease: EASE }} style={{ display: "inline-flex", alignItems: "center", alignSelf: "flex-start", gap: 10, padding: "8px 16px", borderRadius: 30, background: `linear-gradient(135deg, ${C}15, ${KENYA_ACCENT}10)`, border: `1px solid ${C}30`, marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C_BRIGHT }} />
          <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: C_BRIGHT }}>
            1st Edition · June 2026 · The Silicon Savannah
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(36px, 5.5vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#F0F2F5", margin: "0 0 12px", maxWidth: 750 }}>
          Beyond Firewalls
        </motion.h1>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: EASE }} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(20px, 2.5vw, 32px)", lineHeight: 1.2, color: C_BRIGHT, margin: "0 0 28px", maxWidth: 600 }}>
          Strategic Cyber Defense for Kenya's Digital Age
        </motion.h2>

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease: EASE }} style={{ fontFamily: "var(--font-outfit)", fontWeight: 400, fontSize: "clamp(15px, 1.3vw, 17px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 520, marginBottom: 32 }}>
          East Africa's premier cybersecurity summit. Where C-level executives, technology leaders, and policymakers synchronize efforts against escalating digital warfare in the Silicon Savannah.
        </motion.p>

        {/* Location */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6, ease: EASE }} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={KENYA_ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
          </svg>
          <span style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
            Nairobi, Kenya
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8, ease: EASE }} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 34px", borderRadius: 50, background: C, color: "#050810", fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: `0 4px 24px ${C}35` }}>
            Reserve Your Seat <span>→</span>
          </Link>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 50, background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 500, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)" }}>
            Become a Sponsor
          </Link>
        </motion.div>
      </div>

      {/* Bottom Countdown Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.2, ease: EASE }} className="absolute bottom-0 left-0 right-0" style={{ zIndex: 20, background: "rgba(5,8,16,0.92)", backdropFilter: "blur(16px)", borderTop: `1px solid ${C}20`, padding: "18px 0" }}>
        <div className="cfk-bottom-bar flex items-center justify-between flex-wrap gap-4" style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ background: KENYA_ACCENT, opacity: 0.75 }} />
              <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: KENYA_ACCENT }} />
            </span>
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: KENYA_ACCENT }}>1st Edition</span>
            <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 4px" }}>|</span>
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>Cyber First Kenya</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {[{ v: cd.d, l: "Days" }, { v: cd.h, l: "Hrs" }, { v: cd.m, l: "Min" }, { v: cd.s, l: "Sec" }].map((u, i) => (
              <div key={u.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div className="text-center">
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: C_BRIGHT, letterSpacing: "-1px", lineHeight: 1 }}>{String(u.v).padStart(2, "0")}</span>
                  <span style={{ fontFamily: "var(--font-outfit)", fontSize: 9, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", color: "#505050", display: "block", marginTop: 2 }}>{u.l}</span>
                </div>
                {i < 3 && <span style={{ color: `${C}30`, fontSize: 20, fontWeight: 300, marginLeft: 4 }}>:</span>}
              </div>
            ))}
          </div>

          <Link href="#register" style={{ padding: "12px 28px", borderRadius: 50, background: C, fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 600, color: "white", textDecoration: "none", boxShadow: `0 4px 16px ${C}35` }}>
            Register Now →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// ─── STATS BAR ───────────────────────────────────────────────────────────────
function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const items = [
    { n: 300, suffix: "+", label: "Delegates", desc: "C-Suite & Directors", highlight: true },
    { n: 25, suffix: "+", label: "Speakers", desc: "Industry Leaders" },
    { n: 20, suffix: "+", label: "Sponsors", desc: "Technology Partners" },
    { n: 1, suffix: "", label: "Day", desc: "Intensive Summit" },
  ];

  return (
    <section ref={ref} style={{ position: "relative", padding: "clamp(60px, 8vw, 100px) 0", overflow: "hidden" }}>
      {/* African tech aesthetic background */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80" alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.15) saturate(0.6) sepia(0.1)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(180deg, rgba(5,8,16,0.9) 0%, rgba(5,8,16,0.6) 50%, rgba(5,8,16,0.95) 100%)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 50% at 50% 50%, ${C}08, transparent 70%)` }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE }} style={{ marginBottom: 40 }}>
          <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: KENYA_ACCENT }}>Summit Overview</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px, 4.5vw, 48px)", letterSpacing: "-2px", color: "white", lineHeight: 1.1, margin: "14px 0 0", maxWidth: 500 }}>
            Securing the<br /><span style={{ color: C_BRIGHT }}>Silicon Savannah.</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} className="cfk-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {items.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }} style={{ padding: s.highlight ? "28px 20px" : "24px 16px", borderRadius: 18, background: s.highlight ? `linear-gradient(145deg, ${C}18 0%, ${KENYA_ACCENT}08 100%)` : "rgba(255,255,255,0.03)", border: `1px solid ${s.highlight ? `${C}35` : "rgba(255,255,255,0.06)"}` }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: s.highlight ? "clamp(38px,5vw,48px)" : "clamp(30px,4vw,38px)", fontWeight: 900, color: "white", letterSpacing: "-2px", lineHeight: 1 }}>
                {inView ? <Counter to={s.n} suffix={s.suffix} /> : "0"}
              </div>
              <div style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 8 }}>{s.label}</div>
              <div style={{ fontFamily: "var(--font-outfit)", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{s.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── SILICON SAVANNAH CONTEXT ────────────────────────────────────────────────
function SiliconSavannahContext() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} style={{ background: "#080A0F", padding: "clamp(80px, 10vw, 120px) 0", position: "relative" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 40% 50% at 20% 50%, ${KENYA_ACCENT}08, transparent 70%)` }} />

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(20px, 4vw, 60px)", position: "relative" }}>
        <div className="cfk-market-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          
          {/* Left: Narrative */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: EASE }}>
            <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
              <span style={{ width: 30, height: 1, background: KENYA_ACCENT }} />
              <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: KENYA_ACCENT }}>Why Now</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-1.5px", color: "white", lineHeight: 1.1, margin: "0 0 20px" }}>
              Africa's Digital Powerhouse<br />Under Siege
            </h2>
            <p style={{ fontFamily: "var(--font-outfit)", fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 20 }}>
              Kenya has solidified its position as a digital powerhouse in Africa, with rapid innovations driving unprecedented economic inclusion. However, this growth has expanded the national attack surface, leading to a surge in sophisticated threats.
            </p>
            <p style={{ fontFamily: "var(--font-outfit)", fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 24 }}>
              The rise of <strong style={{ color: C_BRIGHT }}>Agentic AI and Deepfakes</strong> has introduced a new era of 'Algorithmic Warfare' that legacy systems are ill-equipped to handle. 2026 is the pivotal year where cybersecurity transitions from a side project to <strong style={{ color: KENYA_ACCENT }}>core infrastructure</strong> for Africa's digital economy.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Cybercrimes Act 2025", "CSOC Operations", "Mobile Money Security", "Regional Cloud Hub"].map((tag) => (
                <span key={tag} style={{ padding: "6px 14px", borderRadius: 20, background: `${KENYA_ACCENT}12`, border: `1px solid ${KENYA_ACCENT}25`, fontFamily: "var(--font-outfit)", fontSize: 12, fontWeight: 500, color: KENYA_ACCENT }}>{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {MARKET_STATS.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }} style={{ padding: 22, borderRadius: 14, background: stat.highlight ? `linear-gradient(145deg, ${C}12 0%, ${KENYA_ACCENT}06 100%)` : "rgba(255,255,255,0.025)", border: `1px solid ${stat.highlight ? `${C}25` : "rgba(255,255,255,0.05)"}` }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: stat.highlight ? 30 : 26, fontWeight: 800, color: stat.highlight ? C_BRIGHT : "white", letterSpacing: "-1px" }}>
                  {stat.prefix}{stat.value}<span style={{ fontSize: "0.7em" }}>{stat.suffix}</span>
                </div>
                <div style={{ fontFamily: "var(--font-outfit)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.75)", marginTop: 6 }}>{stat.label}</div>
                <div style={{ fontFamily: "var(--font-outfit)", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>{stat.note}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── THREAT LANDSCAPE ────────────────────────────────────────────────────────
function ThreatLandscape() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#050810", padding: "clamp(60px, 8vw, 100px) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px, 4vw, 60px)" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: 12 }}>
            <span style={{ width: 30, height: 1, background: "#EF4444" }} />
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "#EF4444" }}>Threat Intelligence</span>
            <span style={{ width: 30, height: 1, background: "#EF4444" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-1px", color: "white", lineHeight: 1.1, margin: 0 }}>
            Kenya's Cyber Threat Landscape
          </h2>
        </motion.div>

        <div className="cfk-threats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {KEY_THREATS.map((item, i) => (
            <motion.div key={item.threat} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }} style={{ padding: 20, borderRadius: 12, background: "rgba(239, 68, 68, 0.04)", border: "1px solid rgba(239, 68, 68, 0.12)", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, color: "#EF4444", letterSpacing: "-0.5px" }}>{item.stat}</div>
              <div style={{ fontFamily: "var(--font-outfit)", fontSize: 12, fontWeight: 600, color: "white", marginTop: 8 }}>{item.threat}</div>
              <div style={{ fontFamily: "var(--font-outfit)", fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{item.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOCUS AREAS ─────────────────────────────────────────────────────────────
function FocusAreas() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#080A0F", padding: "clamp(80px, 10vw, 120px) 0" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(20px, 4vw, 60px)" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: 12 }}>
            <span style={{ width: 30, height: 1, background: C }} />
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: C }}>Conference Tracks</span>
            <span style={{ width: 30, height: 1, background: C }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-1.5px", color: "white", lineHeight: 1.1, margin: 0 }}>
            Strategic Focus Areas
          </h2>
        </motion.div>

        <div className="cfk-focus-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {FOCUS_AREAS.map((area, i) => (
            <motion.div key={area.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }} style={{ gridColumn: area.wide ? "span 2" : "span 1", padding: 28, borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.4s ease" }} className="cfk-focus-card" onMouseEnter={(e) => { e.currentTarget.style.background = `${C}08`; e.currentTarget.style.borderColor = `${C}20`; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${C}12`, border: `1px solid ${C}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={area.icon} /></svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "white", margin: "0 0 8px" }}>{area.title}</h3>
              <p style={{ fontFamily: "var(--font-outfit)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>{area.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHO SHOULD ATTEND ───────────────────────────────────────────────────────
function WhoShouldAttend() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#050810", padding: "clamp(80px, 10vw, 120px) 0" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(20px, 4vw, 60px)" }}>
        <div className="cfk-attend-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: EASE }}>
            <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
              <span style={{ width: 30, height: 1, background: C }} />
              <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: C }}>The Room</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-1.5px", color: "white", lineHeight: 1.1, margin: "0 0 20px" }}>Who Should Attend</h2>
            <p style={{ fontFamily: "var(--font-outfit)", fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 32 }}>
              Cyber First Kenya brings together decision-makers shaping East Africa's cybersecurity landscape — from government leaders to enterprise CISOs and technology innovators.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {["CISO / CSO", "CIO / CTO", "Head of IT Security", "Risk & Compliance", "Government Officials", "Security Architects", "SOC Managers", "Policy Makers"].map((role) => (
                <div key={role} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: KENYA_ACCENT }} />
                  <span style={{ fontFamily: "var(--font-outfit)", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{role}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 32 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "white", margin: "0 0 24px" }}>Industry Breakdown</h3>
              {WHO_ATTEND_INDUSTRIES.map((ind, i) => (
                <motion.div key={ind.name} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontFamily: "var(--font-outfit)", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{ind.name}</span>
                    <span style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 600, color: KENYA_ACCENT }}>{ind.pct}%</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <motion.div initial={{ width: 0 }} animate={inView ? { width: `${ind.pct}%` } : {}} transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: EASE }} style={{ height: "100%", background: `linear-gradient(90deg, ${C}, ${KENYA_ACCENT})`, borderRadius: 2 }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── AGENDA TIMELINE ─────────────────────────────────────────────────────────
function AgendaTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const typeColors: Record<string, string> = { keynote: C, panel: "#9D4EDD", fireside: "#F97316", sponsor: "#10B981", break: "#6B7280", awards: KENYA_GOLD, closing: "#06B6D4" };

  return (
    <section ref={ref} style={{ background: "#080A0F", padding: "clamp(80px, 10vw, 120px) 0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(20px, 4vw, 60px)" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: 12 }}>
            <span style={{ width: 30, height: 1, background: C }} />
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: C }}>Agenda</span>
            <span style={{ width: 30, height: 1, background: C }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-1.5px", color: "white", lineHeight: 1.1, margin: 0 }}>
            The Day's Programme
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, transparent, ${C}30, ${KENYA_ACCENT}30, transparent)` }} />
          {AGENDA.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }} style={{ display: "flex", gap: 24, marginBottom: 20, paddingLeft: 24, position: "relative" }}>
              <div style={{ position: "absolute", left: -4, top: 8, width: 10, height: 10, borderRadius: "50%", background: typeColors[item.type] || C, boxShadow: `0 0 10px ${typeColors[item.type] || C}40` }} />
              <div style={{ minWidth: 90, fontFamily: "var(--font-outfit)", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>{item.time}</div>
              <div style={{ flex: 1, padding: 18, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: item.subtitle ? 6 : 0 }}>
                  <span style={{ padding: "3px 8px", borderRadius: 4, background: `${typeColors[item.type]}18`, fontFamily: "var(--font-outfit)", fontSize: 9, fontWeight: 600, color: typeColors[item.type], textTransform: "uppercase" }}>{item.type}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "white" }}>{item.title}</span>
                </div>
                {item.subtitle && <p style={{ fontFamily: "var(--font-outfit)", fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0 }}>{item.subtitle}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AWARDS SECTION ──────────────────────────────────────────────────────────
function AwardsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#050810", padding: "clamp(80px, 10vw, 120px) 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 4vw, 60px)" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: 12 }}>
            <span style={{ width: 30, height: 1, background: KENYA_GOLD }} />
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: KENYA_GOLD }}>Recognition</span>
            <span style={{ width: 30, height: 1, background: KENYA_GOLD }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-1.5px", color: "white", lineHeight: 1.1, margin: 0 }}>
            Cyber First Awards Kenya
          </h2>
        </motion.div>

        <div className="cfk-awards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {AWARDS_DATA.map((award, i) => (
            <motion.div key={award.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }} style={{ padding: 28, borderRadius: 16, background: `linear-gradient(145deg, ${KENYA_GOLD}08, transparent)`, border: `1px solid ${KENYA_GOLD}20` }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${KENYA_GOLD}15`, border: `1px solid ${KENYA_GOLD}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={KENYA_GOLD} strokeWidth="1.5"><path d={award.icon} /></svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "white", margin: "0 0 8px" }}>{award.title}</h3>
              <p style={{ fontFamily: "var(--font-outfit)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>{award.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── REGISTRATION SECTION ────────────────────────────────────────────────────
function RegistrationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="register" ref={ref} style={{ background: "#080A0F", padding: "clamp(100px, 12vw, 140px) 0", position: "relative" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${C}12, transparent 70%)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 40% 40% at 30% 80%, ${KENYA_ACCENT}08, transparent 60%)` }} />

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(20px, 4vw, 60px)", textAlign: "center", position: "relative" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-2px", color: "white", lineHeight: 1.1, margin: "0 0 16px" }}>
            Join Us in<br /><span style={{ color: KENYA_ACCENT }}>Nairobi</span>
          </h2>
          <p style={{ fontFamily: "var(--font-outfit)", fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>
            Be part of the Cyber First Movement and lead the charge toward a strategic, resilient, and innovative economy in the Silicon Savannah.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "18px 40px", borderRadius: 50, background: `linear-gradient(135deg, ${C}, ${C_DIM})`, color: "white", fontFamily: "var(--font-outfit)", fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: `0 8px 32px ${C}35` }}>
              Register Now <span>→</span>
            </Link>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "18px 40px", borderRadius: 50, background: "transparent", color: "white", fontFamily: "var(--font-outfit)", fontSize: 16, fontWeight: 500, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}>
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
