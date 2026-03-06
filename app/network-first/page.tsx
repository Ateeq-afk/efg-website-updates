"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Footer } from "@/components/sections";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

const GOLD = "#C9935A";
const GOLD_LIGHT = "#DBA96A";
const GOLD_DIM = "rgba(201, 147, 90, 0.5)";
const BG = "#050505";
const BG_ALT = "#080808";
const BG_CARD = "#0C0C0C";
const TEXT = "#F5F5F7";
const TEXT_DIM = "#A1A1A6";
const TEXT_MUTED = "#6E6E73";
const BORDER = "rgba(255,255,255,0.08)";
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// NetworkFirst WordPress uploads base
const NF = "https://networkfirstme.com/wp-content/uploads";

// S3 for boardroom photos & sponsor logos
const S3 = "https://efg-final.s3.eu-north-1.amazonaws.com";
const BOARDROOM = `${S3}/networkfirst/boardrooms`;
const S3_LOGOS = `${S3}/sponsors-logo`;
const EVENTS_S3 = `${S3}/events`;

// ─────────────────────────────────────────────────────────────────────────────
// REAL DATA
// ─────────────────────────────────────────────────────────────────────────────

const UPCOMING_EVENTS = [
  {
    date: "March 3rd, 2026",
    time: "9:30 PM – 2:00 AM",
    title: "Majlis Al-Suhoor",
    subtitle: "مجلس سحور كليڤر تاب",
    sponsor: "CleverTap",
    location: "JW Marriott, Riyadh",
    link: "https://clevertap.networkfirstme.com/",
    color: "#FF6B35",
    image: `${NF}/2026/02/Suhoor-photo1.jpg`,
  },
  {
    date: "March 5th, 2026",
    time: "5:30 PM – 9:30 PM",
    title: "The CleverTap Iftar",
    subtitle: "A Celebration of Flavor, Fellowship, and Future",
    sponsor: "CleverTap",
    location: "Madinat Jumeirah, Dubai",
    link: "https://clevertapdxb.networkfirstme.com/",
    color: "#FF6B35",
    image: `${NF}/2026/02/iftar-photo1.jpg`,
  },
  {
    date: "April 29th, 2026",
    time: "09:00 – 16:00",
    title: "ONE Executive Day KSA",
    subtitle: "Explore the Power of Agentic Enterprise and Low-Code",
    sponsor: "OutSystems",
    location: "JW Marriott Hotel Riyadh",
    link: "https://events.outsystems.com/",
    color: "#E31937",
    image: `${NF}/2026/02/outsystems-one.jpg`,
  },
];

const PAST_EVENTS_2025 = [
  { sponsor: "ONE Executive Day UAE", date: "10 Dec", venue: "Dubai", image: `${NF}/2025/10/Outsystem-01.jpg` },
  { sponsor: "Confluent | AWS", date: "25 Nov", venue: "Ritz Carlton DIFC", image: `${NF}/2025/11/Upcoming-events-05.jpg` },
  { sponsor: "Strategy", date: "19 Nov", venue: "Crowne Plaza, Riyadh", image: `${NF}/2025/11/Strategy-01-1.jpg` },
  { sponsor: "OutSystems", date: "18 Nov", venue: "Dana Rayhaan, Dammam", image: `${NF}/2025/11/Outsysyem-18-nov-01-Thumb.png` },
  { sponsor: "Commvault | GBM", date: "18 Nov", venue: "Ritz Carlton DIFC", image: `${NF}/2025/11/GBM-Comm-vault-01-1-1024x662.jpg` },
  { sponsor: "Finastra", date: "29 Oct", venue: "Voco Riyadh", image: `${NF}/2025/10/Finestra-Thumb-01-1.jpg` },
  { sponsor: "CleverTap", date: "29 Oct", venue: "Jumeirah Messilah, Kuwait", image: `${NF}/2025/10/clevertap-1024x662.jpeg` },
  { sponsor: "Crayon | AWS", date: "29 Oct", venue: "Crowne Plaza Riyadh", image: `${NF}/2025/09/Crayon-AWS-01-1024x662.jpg` },
  { sponsor: "SecurityScorecard", date: "29 Oct", venue: "Grand Hyatt, Abu Dhabi", image: `${NF}/2025/09/ss-01-1024x662.jpg` },
  { sponsor: "Akamai | Cyberia", date: "29 Oct", venue: "Riyadh", image: `${NF}/2025/10/cyberia.jpeg` },
  { sponsor: "Jedox Elevate", date: "29 Oct", venue: "Ritz Carlton JBR", image: `${NF}/2025/09/jedox-roadshow1.jpg` },
  { sponsor: "Confluent", date: "28 Oct", venue: "Voco Hotel, Riyadh", image: `${NF}/2025/10/Confluent-28-oct-01.jpg` },
  { sponsor: "SplashBI", date: "28 Oct", venue: "Hilton Riyadh", image: `${NF}/2025/10/splashbi-photos.jpg` },
  { sponsor: "GBM | Cisco", date: "23 Oct", venue: "St. Regis Downtown Dubai", image: `${NF}/2025/10/GBM-Cisco-1024x662.jpeg` },
  { sponsor: "Boomi", date: "22 Oct", venue: "Riyadh", image: `${NF}/2025/09/events-aa-01-1-1-1024x662.jpg` },
  { sponsor: "GBM | Fortinet", date: "09 Oct", venue: "One&Only One Za'abeel", image: `${NF}/2025/09/GBM-Fortinet-01-1024x662.jpg` },
];

const PAST_EVENTS_2024 = [
  { sponsor: "Freshworks", date: "Dec", venue: "Ritz-Carlton Abu Dhabi", image: `${NF}/2024/11/Upcoming-Events-01-scaled-1-1024x682.jpg` },
  { sponsor: "Trimble", date: "Nov", venue: "Ritz Carlton DIFC", image: `${NF}/2024/11/Events-01-1-1024x682.jpg` },
  { sponsor: "Confluent", date: "Nov", venue: "Hilton Riyadh", image: `${NF}/2024/11/Events-01-1024x682.jpg` },
  { sponsor: "Celonis", date: "Nov", venue: "Dubai", image: `${NF}/2024/10/WhatsApp-Image-2024-10-16-at-4.36.00-PM-1024x669.jpeg` },
  { sponsor: "Coursera", date: "Oct", venue: "Voco Hotel Riyadh", image: `${NF}/2024/09/coursera-img.jpg` },
  { sponsor: "Orbit", date: "Oct", venue: "Ritz Carlton JBR", image: `${NF}/2024/10/WhatsApp-Image-2024-10-09-at-9.55.36-PM-1024x660.jpeg` },
  { sponsor: "Kissflow", date: "Sep", venue: "JW Marriott Marina", image: `${NF}/2024/09/Kissflow-1-1024x660.jpg` },
  { sponsor: "Freshworks", date: "Sep", venue: "Abu Dhabi", image: `${NF}/2024/08/freshworks-auh-1024x682.jpg` },
];

const CANDID_MOMENTS = [
  { src: `${BOARDROOM}/boardroom-01.jpg`, caption: "Executive networking" },
  { src: `${BOARDROOM}/boardroom-05.jpg`, caption: "Panel discussion" },
  { src: `${BOARDROOM}/boardroom-09.jpg`, caption: "Private dialogue" },
  { src: `${BOARDROOM}/boardroom-12.jpg`, caption: "Roundtable session" },
  { src: `${BOARDROOM}/boardroom-15.jpg`, caption: "C-Suite gathering" },
  { src: `${BOARDROOM}/boardroom-18.jpg`, caption: "Strategic conversations" },
  { src: `${BOARDROOM}/boardroom-21.jpg`, caption: "Leadership exchange" },
  { src: `${BOARDROOM}/boardroom-24.jpg`, caption: "Private dining" },
];

const STATS = [
  { value: "100+", label: "Boardrooms", sub: "Delivered since 2023" },
  { value: "1,500+", label: "Executives", sub: "C-Level hosted" },
  { value: "80+", label: "Sponsors", sub: "Trusted partners" },
  { value: "5", label: "GCC Markets", sub: "UAE · KSA · Kuwait · Qatar · Bahrain" },
];

const TESTIMONIALS = [
  { quote: "The executive boardroom was transformative for us — our brand got exposure with the right connections.", name: "Srikanth Rayaprolu", title: "CEO & Co-Founder", company: "Ad Scholars" },
  { quote: "Unforgettable experience with tangible results. Everything was professionally managed.", name: "Deep Vyas", title: "Partner", company: "Worker Ants Media" },
  { quote: "An invaluable experience that exceeded our expectations in every way.", name: "Sheryan Gandhi", title: "COO", company: "Tap1ce" },
];

const SPONSOR_LOGOS = [
  "Google-Cloud-Security.png", "paloalto.png", "fortinet.png", "Akamai.png",
  "EY.png", "Celonis.png", "Claroty.png", "GBM.png", "Confluent.png",
  "OutSystems.png", "Freshworks.png", "CleverTap.png", "Tenable-logo.png",
  "sentinelone.png", "ManageEngine.png", "Dragos.png", "nozomi-networks.png",
  "kaspersky.png", "Group-IB.png", "CPX.png",
];

const VENUES = [
  "Ritz Carlton DIFC", "St. Regis Dubai", "Four Seasons", "JW Marriott",
  "One&Only One Za'abeel", "Atlantis The Royal", "Palazzo Versace",
];

const TITLES = [
  "CISO", "CDO", "CTO", "COO", "CIO", "VP Engineering", "Head of Cybersecurity",
  "Director of IT", "Chief Data Officer", "Group CIO", "Digital Transformation Lead",
];

// ─────────────────────────────────────────────────────────────────────────────
// MOTION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1, ease: EASE_OUT } }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.6, delay: i * 0.05, ease: EASE_OUT } }),
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function NetworkFirstPage() {
  return (
    <main style={{ background: BG, color: TEXT, overflowX: "hidden" }}>
      <Hero />
      <TrustStrip />
      <IntroStatement />
      <TheFormat />
      <CandidMoments />
      <WhySponsor />
      <EditorialBreak src={`${BOARDROOM}/boardroom-26.jpg`} caption="Executive roundtable · Ritz Carlton DIFC" />
      <TheExperience />
      <VenueShowcase />
      <UpcomingSection />
      <UrgencyBanner />
      <EditorialBreak src={`${BOARDROOM}/boardroom-31.jpg`} caption="C-Level dialogue · St. Regis Dubai" />
      <PastBoardroomsShowcase />
      <ByTheNumbers />
      <VideoTestimonials />
      <TestimonialCarousel />
      <SponsorLogos />
      <TitlesMarquee />
      <FinalCTA />
      <Footer />
    </main>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO — With CTA
// ═══════════════════════════════════════════════════════════════════════════════

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} style={{ position: "relative", height: "100vh", minHeight: 700, overflow: "hidden" }}>
      <motion.div style={{ position: "absolute", inset: 0, y, scale }}>
        <img src={`${BOARDROOM}/boardroom-28.jpg`} alt="" style={{ width: "100%", height: "130%", objectFit: "cover", filter: "brightness(0.35) saturate(0.9)" }} />
      </motion.div>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${BG} 0%, transparent 25%, transparent 65%, ${BG} 100%)` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 100% 70% at 50% 110%, ${GOLD}15 0%, transparent 50%)` }} />

      <motion.div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 24px", opacity }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }} style={{ width: 56, height: 56, border: `1.5px solid ${GOLD}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }} style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD, marginBottom: 20 }}>NetworkFirst Boardrooms</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.5, ease: EASE_OUT }} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(64px, 16vw, 180px)", fontWeight: 800, lineHeight: 0.85, letterSpacing: "-0.05em", margin: 0 }}>The Room.</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1 }} style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 300, color: TEXT_DIM, maxWidth: 480, marginTop: 28, lineHeight: 1.7 }}>15 seats. One conversation.<br />Where the GCC&apos;s most senior executives speak freely.</motion.p>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }} style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", background: GOLD, color: BG, borderRadius: 40, fontSize: 15, fontWeight: 600, textDecoration: "none", transition: "transform 0.3s" }}>
            Host a Boardroom
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", background: "transparent", color: TEXT, border: `1px solid ${BORDER}`, borderRadius: 40, fontSize: 15, fontWeight: 500, textDecoration: "none", transition: "all 0.3s" }}>
            Request Invitation
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.5 }} style={{ display: "flex", gap: 48, marginTop: 56 }} className="hero-stats">
          {[{ v: "100+", l: "Boardrooms" }, { v: "1,500+", l: "Executives" }, { v: "80+", l: "Sponsors" }].map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.6 + i * 0.1 }} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: TEXT, margin: 0 }}>{s.v}</p>
              <p style={{ fontSize: 10, color: TEXT_MUTED, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>{s.l}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 1, delay: 2 }} style={{ position: "absolute", bottom: 40 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${GOLD}, transparent)` }} />
        </motion.div>
      </motion.div>
      <style jsx global>{`@media (max-width: 640px) { .hero-stats { flex-direction: column !important; gap: 20px !important; } }`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRUST STRIP — Social proof logos
// ═══════════════════════════════════════════════════════════════════════════════

function TrustStrip() {
  return (
    <section style={{ padding: "32px 24px", background: BG_ALT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
        <p style={{ fontSize: 11, color: TEXT_MUTED, letterSpacing: "0.2em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Hosted by leaders from</p>
        <div style={{ display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          {["Google-Cloud-Security.png", "paloalto.png", "OutSystems.png", "Confluent.png", "Freshworks.png"].map((logo) => (
            <img key={logo} src={`${S3_LOGOS}/${logo}`} alt="" style={{ height: 20, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.5 }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// INTRO STATEMENT
// ═══════════════════════════════════════════════════════════════════════════════

function IntroStatement() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} style={{ padding: "clamp(100px, 15vw, 180px) 24px", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
      <motion.p initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, ease: EASE_OUT }} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4.5vw, 52px)", fontWeight: 500, lineHeight: 1.35, letterSpacing: "-0.02em" }}>
        <span style={{ color: TEXT }}>Not a conference.</span>{" "}
        <span style={{ color: TEXT_MUTED }}>Not a webinar.</span><br />
        <motion.span initial={{ color: TEXT_MUTED }} animate={inView ? { color: GOLD } : {}} transition={{ duration: 0.8, delay: 0.5 }}>A private table</motion.span>{" "}
        <span style={{ color: TEXT_DIM }}>where the region&apos;s most senior executives speak freely.</span>
      </motion.p>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// THE FORMAT
// ═══════════════════════════════════════════════════════════════════════════════

function TheFormat() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const pillars = [
    { num: "01", title: "Curated Attendance", desc: "15–20 hand-selected executives per session. Every seat is earned — no walk-ins, no exceptions.", icon: "👥" },
    { num: "02", title: "Chatham House Rule", desc: "No recordings. No press. No slides shared publicly. The freedom to speak about real challenges.", icon: "🔒" },
    { num: "03", title: "Sponsor-Hosted", desc: "One strategic partner owns the room. Shape the agenda, select the topic, build relationships.", icon: "⭐" },
  ];

  return (
    <section ref={ref} style={{ padding: "clamp(80px, 10vw, 120px) 24px", maxWidth: 1200, margin: "0 auto" }}>
      <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ marginBottom: 64 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>The Format</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0 }}>How we <span style={{ color: GOLD }}>convene.</span></h2>
      </motion.div>
      <motion.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="format-grid">
        {pillars.map((p, i) => (
          <motion.div key={p.num} variants={scaleIn} custom={i} whileHover={{ y: -8, transition: { duration: 0.3 } }} style={{ padding: "48px 36px", background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 24, position: "relative", overflow: "hidden" }} className="format-card">
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${GOLD}, ${GOLD}00)` }} />
            <span style={{ fontSize: 32, marginBottom: 20, display: "block" }}>{p.icon}</span>
            <span style={{ fontSize: 12, color: GOLD_DIM, fontWeight: 500 }}>{p.num}</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: TEXT, margin: "16px 0 12px" }}>{p.title}</h3>
            <p style={{ fontSize: 15, fontWeight: 300, color: TEXT_DIM, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
          </motion.div>
        ))}
      </motion.div>
      <style jsx global>{`.format-card { transition: border-color 0.4s ease; } .format-card:hover { border-color: ${GOLD}30; } @media (max-width: 900px) { .format-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CANDID MOMENTS — Horizontal scroll of networking photos
// ═══════════════════════════════════════════════════════════════════════════════

function CandidMoments() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} style={{ padding: "clamp(60px, 8vw, 100px) 0", overflow: "hidden" }}>
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1 }} style={{ marginBottom: 40, textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>Behind The Scenes</p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1.2 }}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ display: "flex", gap: 16 }}>
          {[...CANDID_MOMENTS, ...CANDID_MOMENTS].map((img, i) => (
            <div key={i} style={{ flex: "0 0 300px", aspectRatio: "4/3", borderRadius: 16, overflow: "hidden", position: "relative" }}>
              <img src={img.src} alt={img.caption} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.8)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 16px 16px", background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                <p style={{ fontSize: 12, color: TEXT_DIM, margin: 0 }}>{img.caption}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// WHY SPONSOR — Value proposition
// ═══════════════════════════════════════════════════════════════════════════════

function WhySponsor() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const benefits = [
    { icon: "🎯", title: "Direct Access", desc: "Meet decision-makers face-to-face. No gatekeepers, no barriers." },
    { icon: "🎤", title: "Thought Leadership", desc: "Position your brand at the center of industry conversations." },
    { icon: "📸", title: "Content & Coverage", desc: "Professional photography, video testimonials, social amplification." },
    { icon: "🤝", title: "Relationship Building", desc: "Forge connections that convert to pipeline and partnerships." },
  ];

  return (
    <section ref={ref} style={{ padding: "clamp(80px, 10vw, 120px) 24px", background: BG_ALT }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>For Sponsors</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, margin: 0 }}>Why brands <span style={{ color: GOLD }}>choose us.</span></h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="benefits-grid">
          {benefits.map((b, i) => (
            <motion.div key={b.title} variants={fadeUp} custom={i} style={{ textAlign: "center", padding: 24 }}>
              <span style={{ fontSize: 40, display: "block", marginBottom: 16 }}>{b.icon}</span>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: TEXT, marginBottom: 8 }}>{b.title}</h3>
              <p style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ textAlign: "center", marginTop: 48 }}>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 40px", background: GOLD, color: BG, borderRadius: 40, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
            Become a Sponsor
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </motion.div>
      </div>
      <style jsx global>{`@media (max-width: 900px) { .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 600px) { .benefits-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EDITORIAL BREAK
// ═══════════════════════════════════════════════════════════════════════════════

function EditorialBreak({ src, caption }: { src: string; caption: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1.5 }} style={{ position: "relative", width: "100%", height: "70vh", minHeight: 400, maxHeight: 700, overflow: "hidden" }}>
      <motion.img src={src} alt="" style={{ width: "100%", height: "120%", objectFit: "cover", filter: "brightness(0.5) saturate(0.85)", scale, y }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${BG} 0%, transparent 20%, transparent 75%, ${BG} 100%)` }} />
      <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 0.6, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }} style={{ position: "absolute", bottom: 32, left: 32, fontSize: 13, color: TEXT, letterSpacing: "0.05em" }}>{caption}</motion.p>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// THE EXPERIENCE
// ═══════════════════════════════════════════════════════════════════════════════

function TheExperience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const features = [
    { icon: "🏨", title: "Five-Star Venues", desc: "Ritz Carlton, Four Seasons, St. Regis — every session at a venue that matches the caliber of your guests." },
    { icon: "📋", title: "Curated Guest List", desc: "We don't fill seats. We select participants by title, organization, and relevance to your agenda." },
    { icon: "🎬", title: "Full Production", desc: "Photography, videography, post-event content. Your brand documented. Your conversations protected." },
    { icon: "🍽️", title: "Private Dining", desc: "The conversation continues over lunch. Breaking bread builds relationships that outlast the session." },
  ];

  return (
    <section ref={ref} style={{ padding: "clamp(100px, 12vw, 140px) 24px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "clamp(48px, 8vw, 100px)", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, ease: EASE_OUT }} style={{ position: "relative" }} className="exp-images">
            <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/5" }}>
              <motion.img whileHover={{ scale: 1.03 }} transition={{ duration: 0.6 }} src={`${BOARDROOM}/boardroom-30.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85)" }} />
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8, x: 40 }} animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }} style={{ position: "absolute", bottom: -32, right: -32, width: "50%", borderRadius: 16, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.6)", border: `1px solid ${BORDER}` }} className="exp-float">
              <img src={`${BOARDROOM}/boardroom-22.jpg`} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} />
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>The Experience</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 40px" }}>What sponsors<br /><span style={{ color: GOLD }}>actually get.</span></h2>
            <motion.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="exp-features">
              {features.map((f, i) => (
                <motion.div key={f.title} variants={fadeUp} custom={i}>
                  <p style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</p>
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: TEXT, margin: "0 0 6px" }}>{f.title}</h4>
                  <p style={{ fontSize: 14, fontWeight: 300, color: TEXT_DIM, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <style jsx global>{`@media (max-width: 900px) { .exp-grid { grid-template-columns: 1fr !important; } .exp-float { display: none !important; } .exp-features { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VENUE SHOWCASE
// ═══════════════════════════════════════════════════════════════════════════════

function VenueShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} style={{ padding: "clamp(60px, 8vw, 80px) 24px", background: BG_ALT }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>Our Venues</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px 32px" }}>
          {VENUES.map((venue, i) => (
            <span key={venue} style={{ fontSize: 15, color: i % 2 === 0 ? TEXT_DIM : TEXT_MUTED, fontWeight: 400 }}>{venue}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// UPCOMING EVENTS — Slider
// ═══════════════════════════════════════════════════════════════════════════════

function UpcomingSection() {
  const ref = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.offsetWidth;
    const newIndex = direction === "left" 
      ? Math.max(0, activeIndex - 1) 
      : Math.min(UPCOMING_EVENTS.length - 1, activeIndex + 1);
    setActiveIndex(newIndex);
    sliderRef.current.scrollTo({ left: newIndex * (cardWidth + 20), behavior: "smooth" });
  };

  return (
    <section ref={ref} style={{ padding: "clamp(100px, 12vw, 140px) 0" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px" }}>
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Coming Up</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, margin: 0 }}>Upcoming <span style={{ color: GOLD }}>sessions.</span></h2>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => scroll("left")} disabled={activeIndex === 0} style={{ width: 48, height: 48, borderRadius: "50%", border: `1px solid ${activeIndex === 0 ? BORDER : GOLD}`, background: "transparent", color: activeIndex === 0 ? TEXT_MUTED : GOLD, cursor: activeIndex === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => scroll("right")} disabled={activeIndex === UPCOMING_EVENTS.length - 1} style={{ width: 48, height: 48, borderRadius: "50%", border: `1px solid ${activeIndex === UPCOMING_EVENTS.length - 1 ? BORDER : GOLD}`, background: "transparent", color: activeIndex === UPCOMING_EVENTS.length - 1 ? TEXT_MUTED : GOLD, cursor: activeIndex === UPCOMING_EVENTS.length - 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div ref={sliderRef} className="upcoming-slider" style={{ display: "flex", gap: 20, overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", paddingLeft: "max(24px, calc((100vw - 1252px) / 2))", paddingRight: 24 }}>
        {UPCOMING_EVENTS.map((e, i) => (
          <motion.a key={e.title} href={e.link} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -8 }} className="upcoming-card" style={{ flex: "0 0 min(400px, 85vw)", scrollSnapAlign: "start", display: "block", borderRadius: 20, overflow: "hidden", background: BG_CARD, border: `1px solid ${BORDER}`, textDecoration: "none" }}>
            <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
              <img src={e.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 16, left: 16, padding: "6px 14px", borderRadius: 20, background: e.color, fontSize: 11, fontWeight: 600, color: "#fff" }}>{e.sponsor}</div>
            </div>
            <div style={{ padding: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: e.color, marginBottom: 8 }}>{e.date} · {e.time}</p>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: TEXT, margin: "0 0 6px", lineHeight: 1.2 }}>{e.title}</h3>
              <p style={{ fontSize: 13, color: TEXT_DIM, margin: "0 0 16px" }}>{e.subtitle}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEXT_MUTED} strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <p style={{ fontSize: 12, color: TEXT_MUTED, margin: 0 }}>{e.location}</p>
              </div>
              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: GOLD }}>Register Now</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      <style jsx global>{`.upcoming-slider::-webkit-scrollbar { display: none; } .upcoming-card { transition: border-color 0.3s; } .upcoming-card:hover { border-color: ${GOLD}40; }`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// URGENCY BANNER
// ═══════════════════════════════════════════════════════════════════════════════

function UrgencyBanner() {
  return (
    <section style={{ padding: "48px 24px", background: `linear-gradient(135deg, ${GOLD}15 0%, ${BG_ALT} 100%)`, borderTop: `1px solid ${GOLD}20`, borderBottom: `1px solid ${GOLD}20` }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: GOLD, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Limited Availability</p>
        <p style={{ fontSize: "clamp(18px, 3vw, 24px)", color: TEXT, fontWeight: 500, margin: "0 0 20px" }}>Only <span style={{ color: GOLD }}>3 sponsorship slots</span> remaining for Q2 2026</p>
        <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: GOLD, color: BG, borderRadius: 30, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
          Secure Your Slot
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAST BOARDROOMS
// ═══════════════════════════════════════════════════════════════════════════════

function PastBoardroomsShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [activeYear, setActiveYear] = useState<"2025" | "2024">("2025");
  const events = activeYear === "2025" ? PAST_EVENTS_2025 : PAST_EVENTS_2024;

  return (
    <section ref={ref} style={{ padding: "clamp(100px, 12vw, 140px) 24px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Past Boardrooms</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, margin: 0 }}>100+ sessions <span style={{ color: TEXT_MUTED }}>delivered.</span></h2>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {(["2025", "2024"] as const).map((year) => (
              <button key={year} onClick={() => setActiveYear(year)} style={{ padding: "10px 24px", borderRadius: 30, border: `1px solid ${activeYear === year ? GOLD : BORDER}`, background: activeYear === year ? GOLD : "transparent", color: activeYear === year ? BG : TEXT_DIM, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.3s" }}>{year}</button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeYear} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="past-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {events.slice(0, 12).map((e, i) => (
              <motion.div key={e.sponsor + i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.03 }} whileHover={{ y: -6 }} className="past-card" style={{ position: "relative", aspectRatio: "4/3", borderRadius: 16, overflow: "hidden", background: BG_CARD }}>
                <img src={e.image} alt={e.sponsor} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${BG} 0%, ${BG}80 30%, transparent 60%)` }} />
                <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                  <p style={{ fontSize: 10, color: GOLD, marginBottom: 4, fontWeight: 500 }}>{e.date} {activeYear}</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: TEXT, margin: "0 0 2px", lineHeight: 1.2 }}>{e.sponsor}</p>
                  <p style={{ fontSize: 11, color: TEXT_DIM, margin: 0 }}>{e.venue}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {events.length > 12 && (
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 0.5 } : {}} transition={{ delay: 0.5 }} style={{ textAlign: "center", marginTop: 32, fontSize: 13, color: TEXT_MUTED }}>+ {events.length - 12} more sessions in {activeYear}</motion.p>
        )}
      </div>
      <style jsx global>{`.past-card { transition: border-color 0.3s; border: 1px solid transparent; } .past-card:hover { border-color: ${GOLD}30; } @media (max-width: 1100px) { .past-grid { grid-template-columns: repeat(3, 1fr) !important; } } @media (max-width: 768px) { .past-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 500px) { .past-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BY THE NUMBERS
// ═══════════════════════════════════════════════════════════════════════════════

function ByTheNumbers() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "clamp(100px, 12vw, 140px) 24px", background: BG_ALT }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Track Record</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, margin: 0 }}>Built on <span style={{ color: GOLD }}>results.</span></h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"} className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label} variants={scaleIn} custom={i} whileHover={{ scale: 1.02 }} style={{ padding: "40px 20px", borderRadius: 20, background: BG_CARD, border: `1px solid ${BORDER}` }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 800, color: GOLD, margin: 0, letterSpacing: "-0.03em" }}>{s.value}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: TEXT, marginTop: 8, marginBottom: 4 }}>{s.label}</p>
              <p style={{ fontSize: 12, color: TEXT_MUTED, margin: 0 }}>{s.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style jsx global>{`@media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 500px) { .stats-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIDEO TESTIMONIALS
// ═══════════════════════════════════════════════════════════════════════════════

function VideoTestimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const videos = [{ id: "SH9Z1U2_rAM" }, { id: "wLgYOHHB6o4" }, { id: "2jpIlqo0HSY" }, { id: "SLkj5gO-LQ8" }];

  return (
    <section ref={ref} style={{ padding: "clamp(80px, 10vw, 120px) 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Voices From The Room</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, margin: 0 }}>Hear it from <span style={{ color: GOLD }}>them.</span></h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="videos-grid">
          {videos.map((v, i) => (
            <motion.a key={v.id} href={`https://youtube.com/shorts/${v.id}`} target="_blank" rel="noopener noreferrer" variants={scaleIn} custom={i} whileHover={{ y: -6, scale: 1.02 }} style={{ position: "relative", aspectRatio: "9/16", borderRadius: 16, overflow: "hidden", background: BG_CARD, border: `1px solid ${BORDER}` }}>
              <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <motion.div whileHover={{ scale: 1.1 }} style={{ width: 56, height: 56, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 24px ${GOLD}50` }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={BG}><polygon points="6 3 20 12 6 21" /></svg>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
      <style jsx global>{`@media (max-width: 900px) { .videos-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 500px) { .videos-grid { grid-template-columns: 1fr !important; max-width: 280px; margin: 0 auto; } }`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TESTIMONIAL CAROUSEL
// ═══════════════════════════════════════════════════════════════════════════════

function TestimonialCarousel() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} style={{ padding: "clamp(100px, 12vw, 140px) 24px", background: BG_ALT }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 48 }}>What They Say</p>
          <div style={{ position: "relative", minHeight: 200 }}>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: EASE_OUT }}>
                <p style={{ fontSize: 48, color: GOLD, marginBottom: 12, lineHeight: 1 }}>&ldquo;</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, lineHeight: 1.5, color: TEXT, margin: "0 0 28px" }}>{TESTIMONIALS[active].quote}</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>{TESTIMONIALS[active].name}</p>
                <p style={{ fontSize: 13, color: TEXT_DIM }}>{TESTIMONIALS[active].title}, {TESTIMONIALS[active].company}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 36 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ width: active === i ? 24 : 8, height: 8, borderRadius: 4, border: "none", background: active === i ? GOLD : BORDER, cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SPONSOR LOGOS
// ═══════════════════════════════════════════════════════════════════════════════

function SponsorLogos() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} style={{ padding: "clamp(80px, 10vw, 100px) 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Trusted By</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, color: TEXT_MUTED, margin: 0 }}>80+ sponsors who&apos;ve hosted with us.</h2>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1.2, delay: 0.3 }} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "24px 40px" }}>
          {SPONSOR_LOGOS.map((logo) => (
            <motion.img key={logo} whileHover={{ opacity: 0.8, scale: 1.05 }} src={`${S3_LOGOS}/${logo}`} alt="" style={{ height: 26, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.4, transition: "opacity 0.3s" }} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TITLES MARQUEE
// ═══════════════════════════════════════════════════════════════════════════════

function TitlesMarquee() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} style={{ padding: "clamp(60px, 8vw, 80px) 0", background: BG_ALT, overflow: "hidden" }}>
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: TEXT_MUTED, textAlign: "center", marginBottom: 28 }}>Who Attends</p>
        <div style={{ position: "relative" }}>
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ display: "flex", gap: 48, whiteSpace: "nowrap" }}>
            {[...TITLES, ...TITLES, ...TITLES, ...TITLES].map((t, i) => (
              <span key={i} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 600, color: i % 2 === 0 ? TEXT_DIM : GOLD_DIM }}>{t}</span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FINAL CTA
// ═══════════════════════════════════════════════════════════════════════════════

function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "clamp(120px, 16vw, 200px) 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}12 0%, transparent 50%)`, filter: "blur(80px)", pointerEvents: "none" }} />
      <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, ease: EASE_OUT }} style={{ position: "relative", textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 8vw, 80px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em", margin: "0 0 20px" }}>Ready to own<br /><span style={{ color: GOLD }}>the room?</span></h2>
        <p style={{ fontSize: "clamp(16px, 2vw, 19px)", fontWeight: 300, color: TEXT_DIM, lineHeight: 1.7, margin: "0 0 40px" }}>Limited sessions available per quarter.<br />Let&apos;s discuss your objectives.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "20px 48px", background: GOLD, color: BG, borderRadius: 50, fontSize: 16, fontWeight: 600, textDecoration: "none", boxShadow: `0 12px 40px ${GOLD}40` }}>
              Request an Invitation
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </motion.div>
        </div>
        <p style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 24 }}>Or email us: <a href="mailto:hello@networkfirstme.com" style={{ color: GOLD, textDecoration: "none" }}>hello@networkfirstme.com</a></p>
      </motion.div>
    </section>
  );
}
