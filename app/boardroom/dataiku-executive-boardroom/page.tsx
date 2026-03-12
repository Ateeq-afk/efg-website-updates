"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Footer } from "@/components/sections";

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM — Premium EFG Aesthetic
// ═══════════════════════════════════════════════════════════════════════════

const GOLD = "#C9935A";
const GOLD_50 = "rgba(201, 147, 90, 0.5)";
const GOLD_30 = "rgba(201, 147, 90, 0.3)";
const GOLD_15 = "rgba(201, 147, 90, 0.15)";
const BG = "#000000";
const BG_CARD = "#0A0A0A";
const TEXT = "#ffffff";
const TEXT_70 = "rgba(255, 255, 255, 0.7)";
const TEXT_50 = "rgba(255, 255, 255, 0.5)";
const TEXT_30 = "rgba(255, 255, 255, 0.3)";
const BORDER = "rgba(201, 147, 90, 0.15)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const S3 = "https://efg-final.s3.eu-north-1.amazonaws.com";

// ═══════════════════════════════════════════════════════════════════════════
// EVENT DATA
// ═══════════════════════════════════════════════════════════════════════════

const EVENT = {
  sponsor: {
    name: "Dataiku",
    logo: "https://images.ctfassets.net/5nvgvgqbpp73/6f63ePFTcBtQIWJiVIbKVV/708831f68f139c954afadead4486d894/White_Dataiku_Lockup_Logo.svg",
    tagline: "Platform for AI Success",
  },
  title: "Executive AI Boardroom",
  date: {
    full: "March 27th, 2026",
    day: "27",
    month: "MAR",
    year: "2026",
  },
  time: "10:00 AM – 12:00 PM GST",
  venue: "Virtual Roundtable",
  seats: 15,
  description: "An intimate executive roundtable exploring how leading enterprises move from AI experimentation to enterprise-scale success. Candid discussions on governance, orchestration, and measurable ROI.",
  topics: [
    { title: "From AI Chaos to AI Success", detail: "Building unified systems for agents, models, and analytics" },
    { title: "Agentic AI in Production", detail: "Deploying AI agents grounded in enterprise data" },
    { title: "Enterprise AI Governance", detail: "Visibility, cost controls, and audit-ready oversight" },
    { title: "Analytics to Trusted Decisions", detail: "AI-assisted pipelines at enterprise scale" },
  ],
  speakers: [
    {
      name: "Dr. Sarah Chen",
      title: "VP of AI Strategy",
      company: "Standard Chartered Bank",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face&q=80",
    },
    {
      name: "Marcus Thompson",
      title: "Chief Data Officer",
      company: "Novartis",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&q=80",
    },
    {
      name: "Elena Rodriguez",
      title: "Head of AI Platforms",
      company: "Dataiku",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face&q=80",
    },
  ],
  agenda: [
    { time: "10:00", label: "AM", title: "Welcome & Introductions" },
    { time: "10:15", label: "AM", title: "Keynote: The AI Success Formula" },
    { time: "10:45", label: "AM", title: "Panel: Governance at Scale" },
    { time: "11:15", label: "AM", title: "Interactive Roundtable Discussion" },
    { time: "11:45", label: "AM", title: "Key Takeaways & Close" },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

type ViewState = "landing" | "register" | "confirmation" | "prejoin" | "joining" | "joined" | "left";

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function DataikuBoardroomPage() {
  const [view, setView] = useState<ViewState>("landing");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    jobTitle: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<any>(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  // ─────────────────────────────────────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────────────────────────────────────

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/boardroom/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName: "dataiku-executive-boardroom", ...formData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setView("confirmation");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const joinBoardroom = useCallback(async () => {
    setView("joining");
    try {
      const DailyIframe = (await import("@daily-co/daily-js")).default;
      const tokenRes = await fetch("/api/boardroom/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName: "dataiku-executive-boardroom", userName: formData.fullName, isOwner: false }),
      });
      if (!tokenRes.ok) throw new Error("Failed to get token");
      const { token } = await tokenRes.json();

      if (containerRef.current) {
        callRef.current = DailyIframe.createFrame(containerRef.current, {
          iframeStyle: { width: "100%", height: "100%", border: "0" },
          showLeaveButton: true,
          showFullscreenButton: true,
        });
        callRef.current.on("left-meeting", () => { setView("left"); callRef.current?.destroy(); });
        await callRef.current.join({ url: "https://eventsfirstgroup.daily.co/dataiku-executive-boardroom", token });
        setView("joined");
      }
    } catch (err) {
      console.error(err);
      setView("landing");
    }
  }, [formData.fullName]);

  useEffect(() => { return () => { callRef.current?.destroy(); }; }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // VIDEO STATES
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "joining" || view === "joined") {
    return (
      <div className="fixed inset-0 bg-black">
        {view === "joining" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 pointer-events-none">
            <div className="w-12 h-12 border-2 border-white/20 border-t-[#C9935A] rounded-full animate-spin" />
            <p className="text-white/60 mt-4 text-sm tracking-wide">Connecting...</p>
          </div>
        )}
        <div ref={containerRef} className="w-full h-full" />
      </div>
    );
  }

  if (view === "left") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full border border-[#C9935A]/30 flex items-center justify-center mx-auto mb-8">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="text-2xl font-light text-white mb-4">Thank you for joining</h1>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            A recording and summary will be sent to your email within 24 hours.
          </p>
          <Link href="/" className="inline-block px-8 py-3 border border-[#C9935A]/30 text-[#C9935A] text-sm tracking-wide hover:bg-[#C9935A]/10 transition-colors">
            Return Home
          </Link>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CONFIRMATION
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "confirmation") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C9935A]/20 to-transparent border border-[#C9935A]/30 flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl text-[#C9935A]">✓</span>
          </div>
          <h1 className="text-3xl font-light text-white mb-3">You're confirmed</h1>
          <p className="text-white/50 text-sm mb-8">
            Check your inbox for details. Join link sent to <span className="text-white">{formData.email}</span>
          </p>
          
          <div className="border border-[#C9935A]/20 rounded-lg p-6 mb-8 text-left bg-[#C9935A]/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-light text-[#C9935A]">{EVENT.date.day}</div>
                <div className="text-xs text-white/40 tracking-wider">{EVENT.date.month}</div>
              </div>
              <div className="h-12 w-px bg-[#C9935A]/20" />
              <div>
                <div className="text-white font-medium">{EVENT.title}</div>
                <div className="text-white/40 text-sm">{EVENT.time}</div>
              </div>
            </div>
          </div>

          <button onClick={() => setView("prejoin")} className="w-full py-4 bg-[#C9935A] text-black font-medium tracking-wide hover:bg-[#B8844A] transition-colors">
            Join Boardroom Now
          </button>
          <p className="text-white/30 text-xs mt-4">Or use the link in your email</p>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PRE-JOIN
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "prejoin") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <img src={EVENT.sponsor.logo} alt={EVENT.sponsor.name} className="h-8 mx-auto mb-8 opacity-80" />
          <h1 className="text-2xl font-light text-white mb-2">Ready to join?</h1>
          <p className="text-white/50 text-sm mb-2">Entering as</p>
          <p className="text-white text-lg mb-1">{formData.fullName}</p>
          <p className="text-white/40 text-sm mb-8">{formData.company}</p>

          <div className="border border-white/10 rounded-lg p-5 mb-8 text-left text-sm text-white/50">
            <p className="mb-3">Before you enter:</p>
            <ul className="space-y-2 text-white/40">
              <li className="flex items-start gap-2"><span className="text-[#C9935A]">•</span> Camera and microphone ready</li>
              <li className="flex items-start gap-2"><span className="text-[#C9935A]">•</span> Quiet environment preferred</li>
              <li className="flex items-start gap-2"><span className="text-[#C9935A]">•</span> Questions prepared for discussion</li>
            </ul>
          </div>

          <button onClick={joinBoardroom} className="w-full py-4 bg-[#C9935A] text-black font-medium tracking-wide hover:bg-[#B8844A] transition-colors">
            Enter Boardroom
          </button>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // REGISTRATION
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "register") {
    return (
      <div className="min-h-screen bg-black py-20 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
          <button onClick={() => setView("landing")} className="text-white/40 text-sm mb-8 hover:text-white/60 transition-colors">
            ← Back
          </button>

          <div className="mb-8">
            <img src={EVENT.sponsor.logo} alt={EVENT.sponsor.name} className="h-6 mb-6 opacity-70" />
            <h1 className="text-2xl font-light text-white mb-2">Request your seat</h1>
            <p className="text-white/40 text-sm">Limited to {EVENT.seats} executives</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm rounded">
                {error}
              </div>
            )}

            {[
              { key: "fullName", label: "Full Name", type: "text" },
              { key: "email", label: "Work Email", type: "email" },
              { key: "company", label: "Company", type: "text" },
              { key: "jobTitle", label: "Title", type: "text" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-white/40 text-xs tracking-wider mb-2 uppercase">{field.label}</label>
                <input
                  type={field.type}
                  required
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm rounded-none focus:outline-none focus:border-[#C9935A]/50 transition-colors"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#C9935A] text-black font-medium tracking-wide hover:bg-[#B8844A] transition-colors disabled:opacity-50 mt-4"
            >
              {loading ? "Submitting..." : "Confirm Registration"}
            </button>
          </form>

          <p className="text-white/20 text-xs mt-6 text-center">
            By registering, you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LANDING PAGE
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center items-center px-6 py-20 relative overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        
        {/* Gradient orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#C9935A]/5 to-transparent blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={stagger}
          className="relative z-10 max-w-4xl text-center"
        >
          {/* Sponsor */}
          <motion.div variants={fadeUp} className="mb-12">
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4 block">Hosted by</span>
            <img src={EVENT.sponsor.logo} alt={EVENT.sponsor.name} className="h-8 mx-auto opacity-80" />
          </motion.div>

          {/* Date badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-4 border border-[#C9935A]/20 px-6 py-3 mb-10">
            <div className="text-center">
              <div className="text-xl font-light text-[#C9935A]">{EVENT.date.day}</div>
              <div className="text-[10px] text-white/40 tracking-widest">{EVENT.date.month}</div>
            </div>
            <div className="h-8 w-px bg-[#C9935A]/20" />
            <div className="text-left">
              <div className="text-xs text-white/60">{EVENT.time}</div>
              <div className="text-xs text-white/30">{EVENT.venue}</div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight mb-6">
            {EVENT.title}
          </motion.h1>

          {/* Description */}
          <motion.p variants={fadeUp} className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
            {EVENT.description}
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setView("register")}
              className="px-10 py-4 bg-[#C9935A] text-black font-medium tracking-wide hover:bg-[#B8844A] transition-all"
            >
              Reserve Your Seat
            </button>
            <a href="#speakers" className="px-8 py-4 border border-white/10 text-white/60 text-sm tracking-wide hover:border-white/30 hover:text-white transition-all">
              View Speakers
            </a>
          </motion.div>

          {/* Seats */}
          <motion.p variants={fadeUp} className="text-white/30 text-xs tracking-wider mt-8">
            Limited to {EVENT.seats} executives
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C9935A]/30 to-transparent" />
        </motion.div>
      </section>

      {/* Topics */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[#C9935A] text-xs tracking-[0.3em] uppercase">Agenda</span>
            <h2 className="text-3xl md:text-4xl font-extralight mt-4">Discussion Topics</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {EVENT.topics.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-white/5 hover:border-[#C9935A]/20 transition-colors group"
              >
                <div className="text-[#C9935A]/40 text-xs tracking-widest mb-4">0{i + 1}</div>
                <h3 className="text-xl font-light text-white mb-3 group-hover:text-[#C9935A] transition-colors">{topic.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{topic.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section id="speakers" className="py-24 px-6 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[#C9935A] text-xs tracking-[0.3em] uppercase">Featured</span>
            <h2 className="text-3xl md:text-4xl font-extralight mt-4">Speakers</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {EVENT.speakers.map((speaker, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border border-[#C9935A]/20 group-hover:border-[#C9935A]/40 transition-colors" />
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">{speaker.name}</h3>
                <p className="text-[#C9935A] text-sm mb-1">{speaker.title}</p>
                <p className="text-white/40 text-sm">{speaker.company}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[#C9935A] text-xs tracking-[0.3em] uppercase">Schedule</span>
            <h2 className="text-3xl md:text-4xl font-extralight mt-4">Timeline</h2>
          </motion.div>

          <div className="space-y-0">
            {EVENT.agenda.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 py-5 border-b border-white/5 group"
              >
                <div className="flex items-baseline gap-1 w-20">
                  <span className="text-xl font-light text-[#C9935A]">{item.time}</span>
                  <span className="text-xs text-white/30">{item.label}</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#C9935A]/30 group-hover:bg-[#C9935A] transition-colors" />
                <span className="text-white/70 group-hover:text-white transition-colors">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9935A]/5 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extralight mb-6">Ready to join the conversation?</h2>
          <p className="text-white/40 text-lg mb-10">
            Secure your seat at this exclusive executive roundtable.
          </p>
          <button
            onClick={() => setView("register")}
            className="px-12 py-5 bg-[#C9935A] text-black font-medium tracking-wide hover:bg-[#B8844A] transition-all"
          >
            Register Now
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="text-white/30 text-xs tracking-wider">Hosted by</span>
            <img src="/events-first-group_logo_alt.svg" alt="Events First Group" className="h-5 opacity-60" />
          </div>
          <div className="flex items-center gap-6">
            <span className="text-white/30 text-xs tracking-wider">Powered by</span>
            <img src={EVENT.sponsor.logo} alt={EVENT.sponsor.name} className="h-5 opacity-60" />
          </div>
        </div>
      </footer>
    </div>
  );
}
