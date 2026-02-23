"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { SponsorWithEvents } from "@/lib/supabase";
import { Footer } from "@/components/sections";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;
const MAX_W = 1320;
const PAD = "0 clamp(20px, 4vw, 60px)";

function tierToLabel(tier: string): string {
  const lower = tier.toLowerCase();
  if (lower === "media" || lower === "media-partner") return "Media Partner";
  if (lower.includes("partner")) {
    return tier
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return `${tier.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Sponsor`;
}

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
          background: "var(--orange)",
          flexShrink: 0,
        }}
      />
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
        width: 172,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Logo area skeleton */}
      <div
        className="skeleton-pulse"
        style={{
          width: "100%",
          aspectRatio: "4/3",
          background: "rgba(255,255,255,0.04)",
        }}
      />
      {/* Info skeleton */}
      <div style={{ padding: "12px 14px 16px" }}>
        <div
          className="skeleton-pulse"
          style={{
            width: "75%",
            height: 13,
            borderRadius: 6,
            background: "rgba(255,255,255,0.04)",
            marginBottom: 8,
          }}
        />
        <div
          className="skeleton-pulse"
          style={{
            width: "55%",
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
// SPONSOR CARD
// ─────────────────────────────────────────────────────────────────────────────

function SponsorCard({
  sponsor,
  index,
}: {
  sponsor: SponsorWithEvents;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  const initials = sponsor.name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const tierText = sponsor.tier ? tierToLabel(sponsor.tier) : "Partner";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.04, ease: EASE }}
    >
      <Link
        href={`/sponsors-and-partners/${sponsor.slug}`}
        style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            width: 172,
            borderRadius: 14,
            border: hovered
              ? "1px solid rgba(232,101,26,0.18)"
              : "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            overflow: "hidden",
            flexShrink: 0,
            transition: "border-color 0.3s ease, transform 0.3s ease",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
          }}
        >
          {/* Logo area */}
          <div
            style={{
              width: "100%",
              aspectRatio: "4/3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 14,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              position: "relative",
              overflow: "hidden",
              background: sponsor.logo_url
                ? "rgba(255,255,255,0.95)"
                : hovered
                  ? "linear-gradient(160deg, rgba(232,101,26,0.10) 0%, rgba(10,10,10,0.85) 100%)"
                  : "linear-gradient(160deg, rgba(232,101,26,0.05) 0%, rgba(10,10,10,0.90) 100%)",
              transition: "background 0.3s ease",
            }}
          >
            {sponsor.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={sponsor.logo_url}
                alt={sponsor.name}
                style={{
                  maxWidth: "90%",
                  maxHeight: "85%",
                  objectFit: "contain",
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
                  Logo soon
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
                color: "#FFFFFF",
                margin: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {sponsor.name}
            </p>
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontWeight: 400,
                fontSize: 10,
                color: "#E8651A",
                letterSpacing: "1px",
                textTransform: "uppercase",
                margin: "4px 0 0",
              }}
            >
              {tierText}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SponsorsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  const [sponsors, setSponsors] = useState<SponsorWithEvents[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("All");

  // Fetch sponsors on mount
  useEffect(() => {
    async function fetchSponsors() {
      const { data } = await supabase
        .from("sponsors")
        .select("*, sponsor_events(*)")
        .order("name");

      if (data) setSponsors(data as SponsorWithEvents[]);
      setLoading(false);
    }
    fetchSponsors();
  }, []);

  // Filter logic
  const filtered = useMemo(() => {
    return sponsors.filter((s) => {
      // Search filter
      if (search) {
        const q = search.toLowerCase();
        const nameMatch = s.name.toLowerCase().includes(q);
        const descMatch = s.short_description?.toLowerCase().includes(q);
        if (!nameMatch && !descMatch) return false;
      }
      // Event filter
      if (eventFilter !== "All") {
        const hasEvent = s.sponsor_events?.some(
          (e) => e.event_name === eventFilter
        );
        if (!hasEvent) return false;
      }
      return true;
    });
  }, [sponsors, search, eventFilter]);

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
          PARTNERS
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
            <SectionLabel text="Our Network" />
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
            Sponsors &amp; Partners
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
            The organizations powering EFG events across cybersecurity, OT
            security, and operational excellence — from global technology leaders
            to regional innovators.
          </motion.p>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div
        className="sponsors-filter-bar"
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
              placeholder="Search sponsors..."
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
              Showing {filtered.length} of {sponsors.length} partners
            </span>
          )}
        </div>
      </div>

      {/* ── SPONSOR GRID ── */}
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
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                justifyContent: "center",
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
                No sponsors found
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
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                justifyContent: "center",
              }}
            >
              {filtered.map((sponsor, i) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── BECOME A SPONSOR CTA ── */}
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
            maxWidth: 640,
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
            Partner With Us
          </h2>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: "clamp(14px, 1.2vw, 16px)",
              color: "#A0A0A0",
              lineHeight: 1.65,
              margin: "0 0 32px",
            }}
          >
            Position your brand alongside the GCC&apos;s most influential
            technology decision-makers. Sponsorship opportunities are available
            across all EFG event series.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a
              href="mailto:partnerships@eventsfirstgroup.com?subject=Sponsorship%20Inquiry"
              className="sponsor-cta-btn"
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
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              Become a Sponsor
            </a>
            <Link
              href="/events"
              className="sponsor-events-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 50,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#A0A0A0",
                fontFamily: "var(--font-outfit)",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── STYLES ── */}
      <style jsx global>{`
        .sponsor-cta-btn:hover {
          background: #ff7a2e !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(232, 101, 26, 0.25);
        }
        .sponsor-events-link:hover {
          border-color: rgba(232, 101, 26, 0.3) !important;
          color: #ffffff !important;
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
      `}</style>
    </div>
  );
}
