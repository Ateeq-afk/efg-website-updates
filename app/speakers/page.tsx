"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { SpeakerWithEvents } from "@/lib/supabase";
import { Footer } from "@/components/sections";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;
const MAX_W = 1320;
const PAD = "0 clamp(20px, 4vw, 60px)";

const EVENT_FILTERS = [
  "All",
  "OPEX First UAE",
  "Cyber First UAE",
  "OT Security First",
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// SECTION LABEL
// ─────────────────────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
      <span
        style={{
          width: 30,
          height: 1,
          background: "#E8651A",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "#E8651A",
          fontFamily: "var(--font-outfit)",
        }}
      >
        {text}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON CARD
// ─────────────────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        overflow: "hidden",
      }}
    >
      {/* Portrait photo skeleton */}
      <div
        className="skeleton-pulse"
        style={{
          aspectRatio: "3 / 4",
          width: "100%",
          background: "rgba(255,255,255,0.04)",
        }}
      />
      {/* Content skeleton */}
      <div style={{ padding: "clamp(14px, 2vw, 20px)" }}>
        {/* Name skeleton */}
        <div
          className="skeleton-pulse"
          style={{
            width: "70%",
            height: 16,
            borderRadius: 8,
            background: "rgba(255,255,255,0.04)",
            marginBottom: 8,
          }}
        />
        {/* Title skeleton */}
        <div
          className="skeleton-pulse"
          style={{
            width: "100%",
            height: 12,
            borderRadius: 6,
            background: "rgba(255,255,255,0.04)",
            marginBottom: 6,
          }}
        />
        {/* Organization skeleton */}
        <div
          className="skeleton-pulse"
          style={{
            width: "60%",
            height: 10,
            borderRadius: 5,
            background: "rgba(255,255,255,0.04)",
          }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPEAKER CARD
// ─────────────────────────────────────────────────────────────────────────────

function SpeakerCard({
  speaker,
  index,
}: {
  speaker: SpeakerWithEvents;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  const initials = speaker.name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const showBadge =
    speaker.role_type === "conference-chair" || speaker.role_type === "advisor";
  const badgeLabel =
    speaker.role_type === "conference-chair" ? "Conference Chair" : "Advisor";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.03, ease: EASE }}
    >
      <Link
        href={`/speakers/${speaker.slug}`}
        style={{ textDecoration: "none", display: "block", height: "100%" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            borderRadius: 16,
            border: hovered
              ? "1px solid rgba(232,101,26,0.3)"
              : "1px solid rgba(255,255,255,0.06)",
            background: hovered
              ? "rgba(232,101,26,0.03)"
              : "rgba(255,255,255,0.02)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: hovered ? "translateY(-4px)" : "none",
            boxShadow: hovered
              ? "0 12px 40px rgba(232,101,26,0.15)"
              : "none",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Portrait photo */}
          <div
            style={{
              aspectRatio: "3 / 4",
              width: "100%",
              background: "rgba(232,101,26,0.06)",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {speaker.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={speaker.image_url}
                alt={speaker.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
                  transition: "filter 0.4s ease",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: hovered
                    ? "rgba(232,101,26,0.1)"
                    : "rgba(232,101,26,0.06)",
                  transition: "background 0.4s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(36px, 4vw, 56px)",
                    fontWeight: 800,
                    color: hovered
                      ? "rgba(232,101,26,0.5)"
                      : "rgba(232,101,26,0.25)",
                    letterSpacing: "-2px",
                    transition: "color 0.4s ease",
                  }}
                >
                  {initials}
                </span>
              </div>
            )}
          </div>

          {/* Content area */}
          <div
            style={{
              padding: "clamp(14px, 2vw, 20px)",
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            {/* Badge */}
            {showBadge && (
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "3px 10px",
                  borderRadius: 40,
                  background: "rgba(232,101,26,0.12)",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#E8651A",
                    letterSpacing: "0.3px",
                    textTransform: "uppercase",
                  }}
                >
                  {badgeLabel}
                </span>
              </div>
            )}

            {/* Name */}
            <h3
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 15,
                fontWeight: 600,
                color: "#FFFFFF",
                letterSpacing: "-0.2px",
                margin: "0 0 4px",
                lineHeight: 1.3,
              }}
            >
              {speaker.name}
            </h3>

            {/* Job title */}
            {speaker.title && (
              <p
                className="speaker-title-clamp"
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 12,
                  fontWeight: 300,
                  color: "#A0A0A0",
                  lineHeight: 1.4,
                  margin: "0 0 3px",
                }}
              >
                {speaker.title}
              </p>
            )}

            {/* Organization */}
            {speaker.organization && (
              <p
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 11,
                  fontWeight: 400,
                  color: "#707070",
                  lineHeight: 1.4,
                  margin: "0 0 auto",
                }}
              >
                {speaker.organization}
              </p>
            )}

            {/* Event context */}
            {speaker.speaker_events && speaker.speaker_events.length > 0 && (
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                  paddingTop: 10,
                  marginTop: 12,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 4,
                }}
              >
                {speaker.speaker_events.slice(0, 2).map((ev) => (
                  <span
                    key={ev.id}
                    style={{
                      padding: "3px 8px",
                      borderRadius: 40,
                      background: "rgba(255,255,255,0.04)",
                      fontFamily: "var(--font-outfit)",
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#606060",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ev.event_name} {ev.event_year}
                  </span>
                ))}
                {speaker.speaker_events.length > 2 && (
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: 40,
                      background: "rgba(232,101,26,0.08)",
                      fontFamily: "var(--font-outfit)",
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#E8651A",
                    }}
                  >
                    +{speaker.speaker_events.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SpeakersPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  const [speakers, setSpeakers] = useState<SpeakerWithEvents[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("All");

  // Fetch speakers on mount
  useEffect(() => {
    async function fetchSpeakers() {
      const { data } = await supabase
        .from("speakers")
        .select("*, speaker_events(*)")
        .order("name");

      if (data) setSpeakers(data as SpeakerWithEvents[]);
      setLoading(false);
    }
    fetchSpeakers();
  }, []);

  // Filter logic
  const filtered = useMemo(() => {
    return speakers.filter((s) => {
      // Search filter
      if (search) {
        const q = search.toLowerCase();
        const nameMatch = s.name.toLowerCase().includes(q);
        const titleMatch = s.title?.toLowerCase().includes(q);
        const orgMatch = s.organization?.toLowerCase().includes(q);
        if (!nameMatch && !titleMatch && !orgMatch) return false;
      }
      // Event filter
      if (eventFilter !== "All") {
        const hasEvent = s.speaker_events?.some(
          (e) => e.event_name === eventFilter
        );
        if (!hasEvent) return false;
      }
      return true;
    });
  }, [speakers, search, eventFilter]);

  return (
    <div>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          background: "#0A0A0A",
          position: "relative",
          overflow: "hidden",
          padding: "clamp(100px, 12vw, 150px) 0 clamp(48px, 6vw, 72px)",
        }}
      >
        {/* Ambient gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 50% 0%, rgba(232,101,26,0.08) 0%, transparent 55%),
              radial-gradient(ellipse 40% 30% at 85% 15%, rgba(232,101,26,0.04) 0%, transparent 50%)
            `,
          }}
        />

        {/* Ghost text */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -52%)",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(120px, 20vw, 280px)",
            letterSpacing: "-8px",
            color: "rgba(255,255,255,0.025)",
            whiteSpace: "nowrap",
            zIndex: 0,
          }}
        >
          SPEAKERS
        </div>

        <div
          style={{
            maxWidth: MAX_W,
            margin: "0 auto",
            padding: PAD,
            position: "relative",
            zIndex: 10,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <SectionLabel text="Our Experts" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(40px, 6vw, 80px)",
              letterSpacing: "-3px",
              color: "#FFFFFF",
              lineHeight: 1.05,
              margin: "0 0 20px",
              maxWidth: 700,
            }}
          >
            Speakers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: "clamp(15px, 1.3vw, 18px)",
              color: "#A0A0A0",
              lineHeight: 1.65,
              maxWidth: 560,
              margin: 0,
            }}
          >
            The industry leaders and experts shaping conversations across
            cybersecurity, OT security, and operational excellence — from
            government advisors to technology pioneers.
          </motion.p>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div
        className="speakers-filter-bar"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(10,10,10,0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: MAX_W,
            margin: "0 auto",
            padding: "14px clamp(20px, 4vw, 60px)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(12px, 2vw, 20px)",
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#707070"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search speakers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 40px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                color: "#FFFFFF",
                fontFamily: "var(--font-outfit)",
                fontSize: 13,
                fontWeight: 400,
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(232,101,26,0.3)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            />
          </div>

          {/* Event filter pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {EVENT_FILTERS.map((ev) => {
              const isActive = eventFilter === ev;
              return (
                <button
                  key={ev}
                  onClick={() => setEventFilter(ev)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 40,
                    fontFamily: "var(--font-outfit)",
                    fontSize: 12,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#FFFFFF" : "#707070",
                    background: isActive
                      ? "#E8651A"
                      : "rgba(255,255,255,0.02)",
                    border: isActive
                      ? "1px solid #E8651A"
                      : "1px solid rgba(255,255,255,0.06)",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    letterSpacing: "0.2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {ev}
                </button>
              );
            })}
          </div>

          {/* Results count */}
          {!loading && (
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 12,
                fontWeight: 400,
                color: "#707070",
                letterSpacing: "0.2px",
                whiteSpace: "nowrap",
                marginLeft: "auto",
              }}
            >
              Showing {filtered.length} of {speakers.length} speakers
            </span>
          )}
        </div>
      </div>

      {/* ── SPEAKER GRID ── */}
      <section
        ref={gridRef}
        style={{
          background: "#0A0A0A",
          padding: "clamp(32px, 4vw, 48px) 0 clamp(48px, 6vw, 72px)",
          minHeight: 400,
        }}
      >
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: PAD }}>
          {loading ? (
            <div
              className="speakers-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "clamp(12px, 2vw, 20px)",
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={gridInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              style={{
                textAlign: "center",
                padding: "clamp(48px, 6vw, 80px) 0",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="1.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  letterSpacing: "-0.5px",
                  color: "#FFFFFF",
                  margin: "0 0 8px",
                }}
              >
                No speakers found
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 300,
                  fontSize: 14,
                  color: "#A0A0A0",
                  margin: 0,
                }}
              >
                Try adjusting your search or filter to find what you&apos;re
                looking for.
              </p>
            </motion.div>
          ) : (
            <div
              className="speakers-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "clamp(12px, 2vw, 20px)",
              }}
            >
              {filtered.map((speaker, i) => (
                <SpeakerCard key={speaker.id} speaker={speaker} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── NOMINATE A SPEAKER CTA ── */}
      <section
        style={{
          background: "#111111",
          position: "relative",
          overflow: "hidden",
          padding: "clamp(48px, 6vw, 72px) 0",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,101,26,0.04) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            padding: PAD,
            position: "relative",
            zIndex: 10,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(24px, 3vw, 36px)",
              letterSpacing: "-1px",
              color: "#FFFFFF",
              lineHeight: 1.1,
              margin: "0 0 14px",
            }}
          >
            Know a Great Speaker?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: "clamp(14px, 1.2vw, 16px)",
              color: "#A0A0A0",
              lineHeight: 1.65,
              margin: "0 0 28px",
            }}
          >
            Help us bring the best voices to our stage. Nominate an industry
            leader or expert you&apos;d like to see at an upcoming EFG event.
          </p>
          <a
            href="mailto:speakers@eventsfirstgroup.com?subject=Speaker%20Nomination"
            className="nominate-speaker-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 32px",
              borderRadius: 50,
              background: "#E8651A",
              color: "#FFFFFF",
              fontFamily: "var(--font-outfit)",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            Nominate a Speaker
          </a>
        </div>
      </section>

      <Footer />

      {/* ── STYLES ── */}
      <style jsx global>{`
        .speaker-title-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .nominate-speaker-btn:hover {
          background: #ff7a2e !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(232, 101, 26, 0.25);
        }

        @keyframes skeletonPulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
        .skeleton-pulse {
          animation: skeletonPulse 1.5s ease-in-out infinite;
        }

        @media (max-width: 1320px) {
          .speakers-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 1024px) {
          .speakers-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .speakers-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .speakers-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
