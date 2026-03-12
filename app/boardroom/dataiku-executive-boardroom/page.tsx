"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════════════
// DATAIKU BRAND COLORS
// ═══════════════════════════════════════════════════════════════════════════

const DATAIKU_BLUE = "#2C7BE5";
const DATAIKU_DARK = "#1A1F36";
const DATAIKU_LIGHT = "#F7FAFC";
const ACCENT = "#00D4AA";
const BG = "#0B0F1A";
const CARD_BG = "#141B2D";
const TEXT = "#FFFFFF";
const TEXT_DIM = "#94A3B8";
const BORDER = "rgba(255,255,255,0.08)";

// ═══════════════════════════════════════════════════════════════════════════
// EVENT DATA
// ═══════════════════════════════════════════════════════════════════════════

const EVENT = {
  title: "Executive AI Boardroom",
  subtitle: "Powered by Dataiku",
  date: "March 27, 2026",
  time: "10:00 AM - 12:00 PM GST",
  location: "Virtual • Exclusive Invite-Only",
  description: "An intimate executive roundtable exploring how leading enterprises are moving from AI experimentation to enterprise-scale AI success. Join senior technology leaders for candid discussions on governance, orchestration, and real ROI.",
  topics: [
    {
      icon: "🤖",
      title: "From AI Chaos to AI Success",
      description: "How enterprises are building unified systems for agents, models, and analytics with governance from day one."
    },
    {
      icon: "⚡",
      title: "Agentic AI in Production",
      description: "Building and deploying AI agents grounded in your data and pipelines — not generic prompts."
    },
    {
      icon: "🛡️",
      title: "Enterprise AI Governance",
      description: "Unified visibility, cost controls, and audit-ready oversight across all AI systems."
    },
    {
      icon: "📊",
      title: "Analytics to Trusted Decisions",
      description: "Moving analysts off spreadsheets with AI-assisted, governed pipelines at enterprise scale."
    }
  ],
  speakers: [
    {
      name: "Dr. Sarah Chen",
      title: "VP of AI Strategy",
      company: "Standard Chartered Bank",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
      bio: "Leading enterprise AI transformation across APAC markets. Former ML lead at Google Cloud."
    },
    {
      name: "Marcus Thompson",
      title: "Chief Data Officer",
      company: "Novartis",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      bio: "Driving data-driven decision making in healthcare. 15+ years in enterprise data architecture."
    },
    {
      name: "Elena Rodriguez",
      title: "Head of AI Platforms",
      company: "Dataiku",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
      bio: "Product leader focused on making AI accessible to every enterprise team."
    }
  ],
  agenda: [
    { time: "10:00 AM", item: "Welcome & Introduction", speaker: "Elena Rodriguez" },
    { time: "10:15 AM", item: "Keynote: The AI Success Formula", speaker: "Dr. Sarah Chen" },
    { time: "10:45 AM", item: "Panel: Governance at Scale", speaker: "All Speakers" },
    { time: "11:15 AM", item: "Interactive Discussion & Q&A", speaker: "Attendees" },
    { time: "11:45 AM", item: "Closing Remarks & Next Steps", speaker: "Marcus Thompson" },
  ],
  stats: [
    { value: "15", label: "Executive Seats" },
    { value: "3", label: "Industry Leaders" },
    { value: "2h", label: "Deep Dive" },
    { value: "100%", label: "Interactive" },
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

type ViewState = "landing" | "register" | "confirmation" | "prejoin" | "joining" | "joined" | "left" | "error";

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
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joinToken, setJoinToken] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<any>(null);

  // ─────────────────────────────────────────────────────────────────────────
  // REGISTRATION HANDLER
  // ─────────────────────────────────────────────────────────────────────────

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/boardroom/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName: "dataiku-executive-boardroom",
          ...formData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setJoinToken(data.joinToken);
      setView("confirmation");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // JOIN BOARDROOM
  // ─────────────────────────────────────────────────────────────────────────

  const joinBoardroom = useCallback(async () => {
    setView("joining");
    
    try {
      // Dynamic import of Daily
      const DailyIframe = (await import("@daily-co/daily-js")).default;
      
      // Get token
      const tokenRes = await fetch("/api/boardroom/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName: "dataiku-executive-boardroom",
          userName: formData.fullName,
          isOwner: false,
        }),
      });

      if (!tokenRes.ok) throw new Error("Failed to get meeting token");
      const { token } = await tokenRes.json();

      // Create Daily frame
      if (containerRef.current) {
        callRef.current = DailyIframe.createFrame(containerRef.current, {
          iframeStyle: {
            width: "100%",
            height: "100%",
            border: "0",
            borderRadius: "0",
          },
          showLeaveButton: true,
          showFullscreenButton: true,
        });

        callRef.current.on("joined-meeting", () => setView("joined"));
        callRef.current.on("left-meeting", () => {
          setView("left");
          callRef.current?.destroy();
        });

        await callRef.current.join({
          url: "https://eventsfirstgroup.daily.co/dataiku-executive-boardroom",
          token,
        });
        
        setView("joined");
      }
    } catch (err) {
      console.error("Join error:", err);
      setError("Failed to join the boardroom.");
      setView("error");
    }
  }, [formData.fullName]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (callRef.current) callRef.current.destroy();
    };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: VIDEO CALL
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "joining" || view === "joined") {
    return (
      <div style={{ position: "fixed", inset: 0, background: BG }}>
        {view === "joining" && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.6)",
            zIndex: 10,
            pointerEvents: "none",
          }}>
            <div style={{
              width: 48,
              height: 48,
              border: `3px solid ${TEXT_DIM}`,
              borderTopColor: DATAIKU_BLUE,
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }} />
            <p style={{ color: TEXT, marginTop: 16 }}>Connecting to boardroom...</p>
          </div>
        )}
        <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: LEFT MEETING
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "left") {
    return (
      <div style={styles.centerContainer}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.card}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>👋</div>
          <h1 style={styles.cardTitle}>Thanks for joining!</h1>
          <p style={{ color: TEXT_DIM, marginBottom: 24 }}>
            We hope you found the discussion valuable. A recording and follow-up materials will be sent to your email.
          </p>
          <Link href="/" style={styles.primaryButton}>
            Return Home
          </Link>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: CONFIRMATION
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "confirmation") {
    return (
      <div style={styles.centerContainer}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ ...styles.card, maxWidth: 520 }}
        >
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${ACCENT}, ${DATAIKU_BLUE})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: 32,
          }}>
            ✓
          </div>
          <h1 style={styles.cardTitle}>You're Registered!</h1>
          <p style={{ color: TEXT_DIM, marginBottom: 32 }}>
            A confirmation email has been sent to <strong style={{ color: TEXT }}>{formData.email}</strong>
          </p>
          
          <div style={{
            background: "rgba(44, 123, 229, 0.1)",
            border: `1px solid ${DATAIKU_BLUE}`,
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
            textAlign: "left",
          }}>
            <p style={{ color: TEXT, fontWeight: 600, marginBottom: 8 }}>{EVENT.title}</p>
            <p style={{ color: TEXT_DIM, fontSize: 14 }}>{EVENT.date} • {EVENT.time}</p>
          </div>

          <button
            onClick={() => setView("prejoin")}
            style={styles.primaryButton}
          >
            Join Boardroom Now
          </button>
          
          <p style={{ color: TEXT_DIM, fontSize: 12, marginTop: 16 }}>
            Or use the link in your email to join later
          </p>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: PRE-JOIN
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "prejoin") {
    return (
      <div style={styles.centerContainer}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ ...styles.card, maxWidth: 480 }}
        >
          <img 
            src="https://www.dataiku.com/wp-content/uploads/2021/01/dataiku-logo-color.svg" 
            alt="Dataiku"
            style={{ height: 32, marginBottom: 24 }}
          />
          <h1 style={styles.cardTitle}>Ready to Join?</h1>
          <p style={{ color: TEXT_DIM, marginBottom: 8 }}>
            Joining as <strong style={{ color: TEXT }}>{formData.fullName}</strong>
          </p>
          <p style={{ color: TEXT_DIM, fontSize: 14, marginBottom: 32 }}>
            {formData.company} • {formData.jobTitle}
          </p>

          <div style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            textAlign: "left",
          }}>
            <p style={{ color: TEXT_DIM, fontSize: 13, marginBottom: 8 }}>Before you join:</p>
            <ul style={{ color: TEXT_DIM, fontSize: 13, paddingLeft: 20, margin: 0 }}>
              <li>Ensure your camera and microphone are ready</li>
              <li>Find a quiet space for the discussion</li>
              <li>Have questions ready for the Q&A</li>
            </ul>
          </div>

          <button
            onClick={joinBoardroom}
            style={styles.primaryButton}
          >
            Enter Boardroom
          </button>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: REGISTRATION FORM
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "register") {
    return (
      <div style={{ minHeight: "100vh", background: BG, padding: "60px 20px" }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: 520, margin: "0 auto" }}
        >
          <button 
            onClick={() => setView("landing")}
            style={{ color: TEXT_DIM, background: "none", border: "none", cursor: "pointer", marginBottom: 24, fontSize: 14 }}
          >
            ← Back to event details
          </button>

          <div style={styles.card}>
            <h1 style={{ ...styles.cardTitle, marginBottom: 8 }}>Register for the Boardroom</h1>
            <p style={{ color: TEXT_DIM, marginBottom: 32 }}>
              Seats are limited to 15 executives. Please provide your details below.
            </p>

            <form onSubmit={handleRegister}>
              {error && (
                <div style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#ef4444",
                  padding: "12px 16px",
                  borderRadius: 8,
                  marginBottom: 20,
                  fontSize: 14,
                }}>
                  {error}
                </div>
              )}

              {[
                { key: "fullName", label: "Full Name", type: "text", required: true },
                { key: "email", label: "Work Email", type: "email", required: true },
                { key: "company", label: "Company", type: "text", required: true },
                { key: "jobTitle", label: "Job Title", type: "text", required: true },
                { key: "phone", label: "Phone (Optional)", type: "tel", required: false },
              ].map((field) => (
                <div key={field.key} style={{ marginBottom: 16 }}>
                  <label style={styles.label}>{field.label} {field.required && "*"}</label>
                  <input
                    type={field.type}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    style={styles.input}
                    required={field.required}
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.primaryButton,
                  opacity: loading ? 0.7 : 1,
                  marginTop: 8,
                }}
              >
                {loading ? "Registering..." : "Complete Registration"}
              </button>
            </form>

            <p style={{ color: TEXT_DIM, fontSize: 12, marginTop: 20 }}>
              By registering, you agree to our{" "}
              <Link href="/terms" style={{ color: DATAIKU_BLUE }}>Terms</Link> and{" "}
              <Link href="/privacy" style={{ color: DATAIKU_BLUE }}>Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: LANDING PAGE
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: BG }}>
      {/* Hero */}
      <section style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        background: `linear-gradient(180deg, ${BG} 0%, ${CARD_BG} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${DATAIKU_BLUE}15 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }} />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 1 }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(44, 123, 229, 0.1)",
            border: `1px solid ${DATAIKU_BLUE}40`,
            borderRadius: 100,
            padding: "8px 20px",
            marginBottom: 32,
          }}>
            <span style={{ color: DATAIKU_BLUE, fontSize: 14, fontWeight: 500 }}>
              Exclusive Virtual Event
            </span>
            <span style={{ color: TEXT_DIM }}>•</span>
            <span style={{ color: TEXT_DIM, fontSize: 14 }}>{EVENT.date}</span>
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 700,
            color: TEXT,
            lineHeight: 1.1,
            marginBottom: 16,
          }}>
            {EVENT.title}
          </h1>
          
          <p style={{
            fontSize: 20,
            color: DATAIKU_BLUE,
            fontWeight: 500,
            marginBottom: 24,
          }}>
            {EVENT.subtitle}
          </p>

          <p style={{
            fontSize: 18,
            color: TEXT_DIM,
            maxWidth: 700,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}>
            {EVENT.description}
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setView("register")}
              style={{
                ...styles.primaryButton,
                padding: "16px 40px",
                fontSize: 16,
              }}
            >
              Reserve Your Seat
            </button>
            <a
              href="#agenda"
              style={{
                padding: "16px 32px",
                fontSize: 16,
                background: "transparent",
                color: TEXT,
                border: `1px solid ${BORDER}`,
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              View Agenda
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginTop: 60,
            padding: "32px",
            background: CARD_BG,
            borderRadius: 16,
            border: `1px solid ${BORDER}`,
          }}>
            {EVENT.stats.map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: 32, fontWeight: 700, color: DATAIKU_BLUE }}>{stat.value}</div>
                <div style={{ fontSize: 14, color: TEXT_DIM }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Topics */}
      <section style={{ padding: "80px 20px", background: BG }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: TEXT, textAlign: "center", marginBottom: 48 }}>
            What We'll Cover
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
            {EVENT.topics.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: CARD_BG,
                  borderRadius: 16,
                  padding: 28,
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{topic.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: TEXT, marginBottom: 12 }}>{topic.title}</h3>
                <p style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.6 }}>{topic.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section style={{ padding: "80px 20px", background: CARD_BG }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: TEXT, textAlign: "center", marginBottom: 48 }}>
            Featured Speakers
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            {EVENT.speakers.map((speaker, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: BG,
                  borderRadius: 16,
                  padding: 32,
                  border: `1px solid ${BORDER}`,
                  textAlign: "center",
                }}
              >
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: 20,
                    border: `3px solid ${DATAIKU_BLUE}`,
                  }}
                />
                <h3 style={{ fontSize: 20, fontWeight: 600, color: TEXT, marginBottom: 4 }}>{speaker.name}</h3>
                <p style={{ fontSize: 14, color: DATAIKU_BLUE, marginBottom: 4 }}>{speaker.title}</p>
                <p style={{ fontSize: 14, color: TEXT_DIM, marginBottom: 16 }}>{speaker.company}</p>
                <p style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6 }}>{speaker.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" style={{ padding: "80px 20px", background: BG }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: TEXT, textAlign: "center", marginBottom: 48 }}>
            Agenda
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {EVENT.agenda.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: 20,
                  background: CARD_BG,
                  borderRadius: 12,
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div style={{
                  minWidth: 80,
                  fontSize: 14,
                  fontWeight: 600,
                  color: DATAIKU_BLUE,
                }}>
                  {item.time}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 500, color: TEXT }}>{item.item}</div>
                  <div style={{ fontSize: 13, color: TEXT_DIM }}>{item.speaker}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 20px", background: `linear-gradient(135deg, ${DATAIKU_BLUE}20, ${ACCENT}10)` }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: TEXT, marginBottom: 16 }}>
            Ready to Transform Your AI Strategy?
          </h2>
          <p style={{ fontSize: 16, color: TEXT_DIM, marginBottom: 32 }}>
            Join senior technology leaders for this exclusive discussion. Limited to 15 seats.
          </p>
          <button
            onClick={() => setView("register")}
            style={{
              ...styles.primaryButton,
              padding: "18px 48px",
              fontSize: 17,
            }}
          >
            Register Now — It's Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 20px", background: BG, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: TEXT_DIM, fontSize: 14 }}>Hosted by</span>
            <img 
              src="/events-first-group_logo_alt.svg" 
              alt="Events First Group" 
              style={{ height: 24 }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: TEXT_DIM, fontSize: 14 }}>Powered by</span>
            <img 
              src="https://www.dataiku.com/wp-content/uploads/2021/01/dataiku-logo-color.svg" 
              alt="Dataiku" 
              style={{ height: 20 }}
            />
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const styles: Record<string, React.CSSProperties> = {
  centerContainer: {
    minHeight: "100vh",
    background: BG,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    background: CARD_BG,
    borderRadius: 20,
    padding: "48px 40px",
    border: `1px solid ${BORDER}`,
    textAlign: "center",
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: TEXT,
    marginBottom: 12,
  },
  primaryButton: {
    display: "block",
    width: "100%",
    padding: "14px 28px",
    fontSize: 15,
    fontWeight: 600,
    background: `linear-gradient(135deg, ${DATAIKU_BLUE}, ${ACCENT})`,
    color: TEXT,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center" as const,
  },
  label: {
    display: "block",
    color: TEXT_DIM,
    fontSize: 14,
    marginBottom: 6,
    textAlign: "left" as const,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: 15,
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    color: TEXT,
    outline: "none",
  },
};
