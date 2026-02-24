"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/sections";
import SectionTransition from "@/components/effects/SectionTransition";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;
const MAX_W = 1320;
const PAD = "0 clamp(20px, 4vw, 60px)";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const founders = [
  {
    name: "Yasir",
    role: "Co-Founder",
    quote:
      "Every event we run is a promise — that the people in that room will leave with something they couldn't have found anywhere else.",
    initials: "Y",
    photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/yasir.jpeg",
  },
  {
    name: "Shyam",
    role: "Co-Founder",
    quote:
      "We obsess over the details because in this business, the details are everything. From the first invitation to the last handshake.",
    initials: "S",
    photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/shyam.jpg",
  },
];

const stats = [
  { value: 7,    suffix: "+", label: "Years Running", comma: false },
  { value: 5000, suffix: "+", label: "Attendees",     comma: true  },
  { value: 200,  suffix: "+", label: "Speakers",      comma: false },
  { value: 12,   suffix: "",  label: "Cities",        comma: false },
  { value: 50,   suffix: "+", label: "Partners",      comma: false },
];

const cities = [
  "Dubai", "Riyadh", "Kuwait City", "Doha",
  "Abu Dhabi", "Muscat", "Bahrain", "Jeddah",
];

const values = [
  {
    title: "Precision Over Volume",
    description:
      "We don't fill rooms. We build them. Every attendee is senior. Every speaker is vetted. Every agenda is engineered for genuine, lasting impact.",
  },
  {
    title: "Trust as Infrastructure",
    description:
      "The GCC's technology leaders return to our events year after year because trust is not a feature of what we do — it is the foundation.",
  },
  {
    title: "Regional by Design",
    description:
      "We are not a global brand that entered the GCC. We were built here, for here — with a deep understanding of the region's nuances and ambitions.",
  },
  {
    title: "Always Forward",
    description:
      "Each series, each summit — we are looking at what is coming next and building the room for that conversation before anyone else does.",
  },
];

type Member = { name: string; initials: string; linkedin?: string; photo?: string };

const departments: { label: string; members: Member[] }[] = [
  {
    label: "Partnership Manager",
    members: [
      { name: "Mohammed Hassan", initials: "MH" },
      { name: "Mohammed Sahil",  initials: "MS", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/sahil.jpeg" },
      { name: "Mohammed Danish", initials: "MD", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Danish.jpg" },
      { name: "Mayur Methi",     initials: "MM", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Mayur-Methi.png" },
      { name: "Kausar Noor",     initials: "KN", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Kausar-Noor.jpg" },
    ],
  },
  {
    label: "Delegate Acquisition",
    members: [
      { name: "Mary",                 initials: "M", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Mary.jpg" },
      { name: "Rajan",                initials: "R", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Rajan.jpg" },
      { name: "Afra Sait",            initials: "AS", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Afra-Sait.jpeg" },
      { name: "Mriggashi Mohini",     initials: "MM", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Mriggashi-Mohini.jpeg" },
      { name: "Stephen D'Souza",      initials: "SD" },
      { name: "Jacqueline Fernandez", initials: "JF", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Jacqueline-Fernandez.jpg" },
      { name: "Nadim Pirani",         initials: "NP", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Nadim-Pirani.jpg" },
      { name: "Neha Gokarn",          initials: "NG", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Neha-Gokarn.jpg" },
    ],
  },
  {
    label: "Operations",
    members: [
      { name: "Mini", initials: "M", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Mini.jpg" },
    ],
  },
  {
    label: "Producer",
    members: [
      { name: "Sanjana Venugopal", initials: "SV", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Sanjana-Venugopal.jpg" },
      { name: "Harini",            initials: "H", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Harini.jpg" },
    ],
  },
  {
    label: "Marketing & Tech",
    members: [
      { name: "Syed Asad",      initials: "SA", photo: "https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/Syed-Asad.jpg" },
      { name: "Mannan Akhtar",  initials: "MA", linkedin: "https://www.linkedin.com/in/mannaan-akhtar/", photo: "/team/mannaan.PNG" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────────────────────────────────────

const easeOutExpo = (t: number) =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

function SectionLabel({ text, centered }: { text: string; centered?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      style={{ marginBottom: 16 }}
    >
      <span style={{ width: 30, height: 1, background: "var(--orange)", flexShrink: 0 }} />
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "var(--orange)",
          fontFamily: "var(--font-outfit)",
        }}
      >
        {text}
      </span>
      {centered && (
        <span style={{ width: 30, height: 1, background: "var(--orange)", flexShrink: 0 }} />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ─────────────────────────────────────────────────────────────────────────────

function AboutHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "var(--black)", minHeight: "100vh" }}
    >
      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(232,101,26,0.09) 0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 90% 10%, rgba(124,58,237,0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Large ghost "ABOUT" behind content */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -52%)",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(120px, 20vw, 260px)",
          letterSpacing: "-8px",
          color: "rgba(255,255,255,0.025)",
          whiteSpace: "nowrap",
          zIndex: 0,
          userSelect: "none",
        }}
      >
        ABOUT
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: MAX_W,
          margin: "0 auto",
          padding: PAD,
          paddingTop: "clamp(120px, 14vw, 170px)",
          paddingBottom: "clamp(56px, 7vw, 80px)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Top row: label + EST */}
        <div className="flex items-center justify-between" style={{ marginBottom: 32 }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            <SectionLabel text="About Events First Group" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--white-muted)",
            }}
          >
            Est. 2023 · Dubai
          </motion.span>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(48px, 7vw, 96px)",
            letterSpacing: "-3px",
            color: "var(--white)",
            lineHeight: 1.02,
            margin: "0 0 clamp(48px, 6vw, 80px)",
            maxWidth: 800,
          }}
        >
          The Story Behind
          <br />
          the{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #FFFFFF 0%, #E8651A 40%, #FF7A2E 70%, #FFFFFF 100%)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "heroShimmer 6s ease-in-out infinite alternate",
            }}
          >
            Summits.
          </span>
        </motion.h1>

        {/* Founder Cards */}
        <div
          className="hero-founders-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            maxWidth: 860,
          }}
        >
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: EASE }}
              style={{
                borderRadius: 20,
                border: "1px solid var(--gray-border-hover)",
                background: "var(--black-card)",
                overflow: "hidden",
              }}
            >
              {/* Photo area */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  background: f.photo
                    ? "var(--black-card)"
                    : `linear-gradient(160deg, rgba(232,101,26,0.08) 0%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,0.95) 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  borderBottom: "1px solid var(--gray-border)",
                  overflow: "hidden",
                }}
              >
                {f.photo ? (
                  <img
                    src={f.photo}
                    alt={f.name}
                    className="founder-photo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      filter: "grayscale(1)",
                      transition: "filter 0.5s ease",
                    }}
                  />
                ) : (
                  <>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(48px, 8vw, 80px)",
                        color: "rgba(232,101,26,0.15)",
                        userSelect: "none",
                      }}
                    >
                      {f.initials}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        bottom: 12,
                        right: 14,
                        fontFamily: "var(--font-outfit)",
                        fontSize: 10,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.15)",
                      }}
                    >
                      Photo coming soon
                    </span>
                  </>
                )}
              </div>

              {/* Card content */}
              <div style={{ padding: "clamp(20px, 2.5vw, 28px)" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(18px, 2vw, 22px)",
                    letterSpacing: "-0.5px",
                    color: "var(--white)",
                    margin: 0,
                  }}
                >
                  {f.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontWeight: 500,
                    fontSize: 12,
                    color: "var(--orange)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    margin: "5px 0 16px",
                  }}
                >
                  {f.role}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(13px, 1.2vw, 15px)",
                    lineHeight: 1.6,
                    color: "var(--white-muted)",
                    margin: 0,
                    borderLeft: "2px solid rgba(232,101,26,0.3)",
                    paddingLeft: 14,
                  }}
                >
                  &ldquo;{f.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 120,
          background: "linear-gradient(to bottom, transparent, var(--black))",
        }}
      />

      <style jsx global>{`
        @keyframes heroShimmer {
          0%   { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hero-founders-grid > div:hover .founder-photo {
          filter: grayscale(0) !important;
        }
        @media (max-width: 640px) {
          .hero-founders-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — IMPACT NUMBERS
// ─────────────────────────────────────────────────────────────────────────────

function CountStat({
  value, suffix, label, comma, delay, isInView,
}: {
  value: number; suffix: string; label: string;
  comma: boolean; delay: number; isInView: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now() + delay;
    const duration = 1800;
    const frame = () => {
      const elapsed = Date.now() - start;
      if (elapsed < 0) { requestAnimationFrame(frame); return; }
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.floor(easeOutExpo(progress) * value));
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setDisplay(value);
        if (suffix) setTimeout(() => setShowSuffix(true), 50);
      }
    };
    requestAnimationFrame(frame);
  }, [isInView, value, delay, suffix]);

  return (
    <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(36px, 4vw, 52px)",
          letterSpacing: "-1.5px",
          color: "var(--white)",
          lineHeight: 1,
        }}
      >
        {comma ? display.toLocaleString() : display}
        {suffix && (
          <span
            style={{
              color: "var(--orange)",
              opacity: showSuffix ? 1 : 0,
              transform: showSuffix ? "scale(1)" : "scale(1.4)",
              display: "inline-block",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          >
            {suffix}
          </span>
        )}
      </div>
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "var(--white-muted)",
          margin: "7px 0 0",
        }}
      >
        {label}
      </p>
    </div>
  );
}

function AboutImpact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        background: "var(--black-light)",
        padding: "44px 0 48px",
        borderTop: "1px solid var(--gray-border)",
        borderBottom: "1px solid var(--gray-border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* City names watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 0, overflow: "hidden" }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px 48px",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 40px",
            opacity: 0.04,
          }}
        >
          {[...cities, ...cities, ...cities].map((city, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(22px, 3vw, 40px)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "white",
                whiteSpace: "nowrap",
              }}
            >
              {city}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: PAD }}>
        <div className="about-stats-row">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {i > 0 && (
                <div
                  className="about-stat-divider"
                  style={{
                    width: 1,
                    height: 44,
                    background: "var(--gray-border)",
                    margin: "0 clamp(24px, 4vw, 56px)",
                    flexShrink: 0,
                  }}
                />
              )}
              <CountStat {...stat} delay={i * 120} isInView={isInView} />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .about-stats-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .about-stats-row {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            gap: 40px !important;
            justify-items: center;
          }
          .about-stats-row > div:last-child { grid-column: span 2; }
          .about-stat-divider { display: none !important; }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — OUR STORY
// ─────────────────────────────────────────────────────────────────────────────

function AboutStory() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        background: "var(--black)",
        padding: "clamp(56px, 7vw, 90px) 0",
      }}
    >
      <div
        className="about-story-grid"
        style={{
          maxWidth: MAX_W,
          margin: "0 auto",
          padding: PAD,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(48px, 8vw, 100px)",
          alignItems: "center",
        }}
      >
        {/* Left: narrative */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <SectionLabel text="Our Story" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(30px, 3.5vw, 46px)",
              letterSpacing: "-1.5px",
              color: "var(--white)",
              lineHeight: 1.12,
              margin: 0,
            }}
          >
            Built for the Leaders
            <br />
            Who Build the Region
          </h2>
          {[
            "Events First Group was founded in 2023 with a clear conviction: the GCC's senior technology leaders deserved events built specifically for their world — their region, their challenges, their ambitions.",
            "We didn't import a global conference brand and rebrand it for the Gulf. We built EFG from the ground up — from the relationships forged in boardrooms across Dubai, Riyadh, and Kuwait City, to the agenda curation philosophy that puts practitioner insight above promotional noise.",
            "Today, EFG runs four distinct event series across eight annual editions, serving a community of over 5,000 technology decision-makers. But the measure we hold ourselves to hasn't changed: does every person who walks into an EFG event walk out sharper, better connected, and more ready to lead?",
          ].map((text, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-outfit)",
                fontWeight: 300,
                fontSize: "clamp(14px, 1.2vw, 16px)",
                lineHeight: 1.8,
                color: "var(--white-dim)",
                margin: i === 0 ? "24px 0 0" : "16px 0 0",
              }}
            >
              {text}
            </p>
          ))}
        </motion.div>

        {/* Right: team photo placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          style={{
            width: "100%",
            minHeight: 440,
            borderRadius: 24,
            border: "1px solid var(--gray-border-hover)",
            background: "var(--black-card)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src="https://efg-final.s3.eu-north-1.amazonaws.com/about-us-photos/team-photo.png"
            alt="Events First Group Team"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .about-story-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — VALUES (plain, no cards)
// ─────────────────────────────────────────────────────────────────────────────

function AboutValues() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: "var(--black)", padding: "clamp(56px,7vw,90px) 0" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: PAD }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 44 }}
        >
          <SectionLabel text="Our Values" centered />
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "-1.5px", color: "var(--white)", lineHeight: 1.12, margin: 0 }}>
            How We Think. How We Build.
          </h2>
        </motion.div>
        <div className="about-values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "clamp(36px, 4vw, 56px) clamp(48px, 6vw, 80px)" }}>
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EASE }}
              style={{
                borderLeft: "2px solid rgba(232,101,26,0.4)",
                paddingLeft: "clamp(20px, 2.5vw, 28px)",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(16px,1.4vw,19px)", letterSpacing: "-0.3px", color: "var(--white)", margin: "0 0 10px" }}>
                {v.title}
              </h3>
              <p style={{ fontFamily: "var(--font-outfit)", fontWeight: 300, fontSize: "clamp(13px,1.1vw,14.5px)", lineHeight: 1.65, color: "var(--white-muted)", margin: 0 }}>
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 640px) {
          .about-values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 — TEAM (flat grid)
// ─────────────────────────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function PhotoCard({
  name,
  initials,
  department,
  linkedin,
  photo,
}: {
  name: string;
  initials: string;
  department: string;
  linkedin?: string;
  photo?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        width: 172,
        borderRadius: 14,
        border: hovered
          ? "1px solid rgba(232,101,26,0.18)"
          : "1px solid var(--gray-border-hover)",
        background: "var(--black-card)",
        overflow: "hidden",
        flexShrink: 0,
        transition: "border-color 0.3s ease, transform 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo area */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4/5",
          background: photo
            ? "var(--black-card)"
            : hovered
              ? "linear-gradient(160deg, rgba(232,101,26,0.10) 0%, rgba(10,10,10,0.85) 100%)"
              : "linear-gradient(160deg, rgba(232,101,26,0.05) 0%, rgba(10,10,10,0.90) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--gray-border)",
          position: "relative",
          transition: "background 0.3s ease",
          overflow: "hidden",
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              filter: hovered ? "grayscale(0)" : "grayscale(1)",
              transition: "filter 0.5s ease",
            }}
          />
        ) : (
          <>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 32,
                color: "rgba(232,101,26,0.14)",
                userSelect: "none",
              }}
            >
              {initials}
            </span>
            <span
              style={{
                position: "absolute",
                bottom: 8,
                right: 10,
                fontFamily: "var(--font-outfit)",
                fontSize: 8,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.1)",
              }}
            >
              Photo soon
            </span>
          </>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "12px 14px 16px" }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "-0.2px",
            color: "var(--white)",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 400,
              fontSize: 10,
              color: "var(--orange)",
              letterSpacing: "1px",
              textTransform: "uppercase",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {department}
          </p>
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#0A66C2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
              onClick={(e) => e.stopPropagation()}
            >
              <LinkedInIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function AboutTeam() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const allMembers = departments.flatMap((dept) =>
    dept.members.map((m) => ({ ...m, department: dept.label }))
  );

  return (
    <section
      ref={ref}
      style={{ background: "var(--black-light)", padding: "clamp(56px,7vw,90px) 0" }}
    >
      <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: PAD }}>

        {/* ── Section header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 44 }}
        >
          <SectionLabel text="The People" centered />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(30px,3.5vw,46px)",
              letterSpacing: "-1.5px",
              color: "var(--white)",
              lineHeight: 1.12,
              margin: 0,
            }}
          >
            Meet the Team
          </h2>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 15,
              color: "var(--white-muted)",
              lineHeight: 1.65,
              margin: "14px auto 0",
              maxWidth: 460,
            }}
          >
            The people who make it happen — from strategy to stage,
            from the first call to the last session.
          </p>
        </motion.div>

        {/* ── Flat grid — ~5-6 per row ─────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "center",
          }}
        >
          {allMembers.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.04, ease: EASE }}
            >
              <PhotoCard
                name={m.name}
                initials={m.initials}
                department={m.department}
                linkedin={m.linkedin}
                photo={m.photo}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 — CTA
// ─────────────────────────────────────────────────────────────────────────────

function CareersSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFile = (file: File | undefined) => {
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    color: "#fff",
    fontFamily: "var(--font-outfit)",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-outfit)",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    color: "#606060",
    margin: "0 0 8px",
    display: "block",
  };

  return (
    <section ref={ref} id="careers" style={{ background: "var(--black)", padding: "clamp(56px,7vw,90px) 0" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: PAD }}>
        <div
          className="careers-split"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "clamp(40px,5vw,80px)", alignItems: "start" }}
        >
          {/* LEFT — Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "var(--orange)", margin: "0 0 16px" }}>
              Join Our Team
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-1.5px", color: "#fff", lineHeight: 1.1, margin: "0 0 20px" }}>
              Careers at EFG
            </h2>
            <p style={{ fontFamily: "var(--font-outfit)", fontWeight: 300, fontSize: "clamp(14px,1.2vw,16px)", color: "#888", lineHeight: 1.75, margin: "0 0 28px" }}>
              We&apos;re always looking for sharp, driven people who want to shape the future of technology events in the GCC. If you thrive in fast-paced environments and care about creating experiences that matter — we&apos;d love to hear from you.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "◆", text: "Work with the region's top technology leaders" },
                { icon: "◆", text: "Fast-growing team with real ownership" },
                { icon: "◆", text: "Based in Dubai, operating across the GCC" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span style={{ color: "#E8651A", fontSize: 8, marginTop: 6, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontFamily: "var(--font-outfit)", fontSize: 14, color: "#707070", lineHeight: 1.6 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            style={{
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              padding: "clamp(24px,3vw,36px)",
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{ textAlign: "center", padding: "40px 20px" }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(232,101,26,0.1)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 24 }}>✓</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "#fff", margin: "0 0 8px" }}>
                    Application Received
                  </h3>
                  <p style={{ fontFamily: "var(--font-outfit)", fontSize: 14, color: "#707070", lineHeight: 1.6, maxWidth: 320, margin: "0 auto" }}>
                    Thank you for your interest in joining EFG. We&apos;ll review your application and get back to you shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFileName(""); }}
                    style={{ fontFamily: "var(--font-outfit)", fontSize: 13, color: "#E8651A", background: "none", border: "none", cursor: "pointer", marginTop: 20, padding: 0 }}
                  >
                    Submit another application →
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <form onSubmit={handleSubmit}>
                    <div
                      className="careers-form-grid"
                      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}
                    >
                      <div>
                        <label style={labelStyle}>Full Name</label>
                        <input type="text" placeholder="Your full name" required style={inputStyle} onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(232,101,26,0.4)")} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")} />
                      </div>
                      <div>
                        <label style={labelStyle}>Email</label>
                        <input type="email" placeholder="you@company.com" required style={inputStyle} onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(232,101,26,0.4)")} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")} />
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Role you&apos;re interested in</label>
                      <input type="text" placeholder="e.g. Event Manager, Marketing, Sales..." required style={inputStyle} onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(232,101,26,0.4)")} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")} />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Cover Message</label>
                      <textarea
                        placeholder="Tell us a bit about yourself — your experience, what excites you about EFG, and why you'd be a great fit..."
                        rows={4}
                        required
                        style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(232,101,26,0.4)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                      />
                    </div>

                    {/* PDF Upload */}
                    <div style={{ marginBottom: 24 }}>
                      <label style={labelStyle}>Resume / CV (PDF)</label>
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                        style={{ display: "none" }}
                      />
                      <div
                        onClick={() => fileRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOver(false);
                          handleFile(e.dataTransfer.files?.[0]);
                        }}
                        style={{
                          border: `1px dashed ${dragOver ? "rgba(232,101,26,0.6)" : "rgba(255,255,255,0.1)"}`,
                          borderRadius: 12,
                          padding: "24px 20px",
                          textAlign: "center",
                          cursor: "pointer",
                          background: dragOver ? "rgba(232,101,26,0.04)" : "rgba(255,255,255,0.015)",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {fileName ? (
                          <div className="flex items-center justify-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8651A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 13, color: "#E8651A" }}>{fileName}</span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setFileName(""); if (fileRef.current) fileRef.current.value = ""; }}
                              style={{ background: "none", border: "none", color: "#606060", cursor: "pointer", fontSize: 16, padding: "0 0 0 4px", lineHeight: 1 }}
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#505050" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 8px", display: "block" }}>
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <p style={{ fontFamily: "var(--font-outfit)", fontSize: 13, color: "#505050", margin: 0 }}>
                              Click to upload or drag &amp; drop your PDF
                            </p>
                            <p style={{ fontFamily: "var(--font-outfit)", fontSize: 11, color: "#353535", margin: "4px 0 0" }}>
                              PDF only, max 5MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: "100%",
                        padding: "14px 32px",
                        borderRadius: 12,
                        background: "#E8651A",
                        color: "#fff",
                        fontFamily: "var(--font-outfit)",
                        fontSize: 15,
                        fontWeight: 600,
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#FF7A2E";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 12px 40px rgba(232,101,26,0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#E8651A";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      Submit Application <span>→</span>
                    </button>
                  </form>

                  <p style={{ fontFamily: "var(--font-outfit)", fontSize: 12, color: "#353535", lineHeight: 1.5, textAlign: "center", margin: "14px 0 0" }}>
                    Your information is kept confidential. We only use it to evaluate your application.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 860px) {
          .careers-split {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .careers-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <AboutImpact />
      <SectionTransition variant="sweep" />
      <AboutStory />
      <SectionTransition variant="expand" />
      <AboutValues />
      <SectionTransition variant="sweep" />
      <AboutTeam />
      <SectionTransition variant="pulse" />
      <CareersSection />
      <SectionTransition variant="sweep" />
      <Footer />
    </div>
  );
}
