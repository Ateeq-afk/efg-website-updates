"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════
// EVENT DATA
// ═══════════════════════════════════════════════════════════════

type EventItem = {
  id: string;
  series: string;
  seriesColor: string;
  edition: string;
  title: string;
  date: Date;
  dateDisplay: string;
  monthAbbr: string;
  monthIndex: number; // 0=Jan, 1=Feb, etc.
  location: string;
  venue: string;
  attendees: string;
  href: string;
  status: "open" | "soon";
};

const allEvents: EventItem[] = [
  {
    id: "cyber-first-kuwait",
    series: "Cyber First",
    seriesColor: "#01BBF5",
    edition: "3RD EDITION",
    title: "Cyber First Kuwait",
    date: new Date("2026-04-21"),
    dateDisplay: "April 21, 2026",
    monthAbbr: "APR",
    monthIndex: 3,
    location: "Kuwait City, Kuwait",
    venue: "Jumeirah Messilah Beach Hotel",
    attendees: "350+ Delegates",
    href: "/events/cyber-first/kuwait-april",
    status: "open",
  },
  {
    id: "data-first-kuwait",
    series: "Data & AI First",
    seriesColor: "#0F735E",
    edition: "1ST EDITION",
    title: "Data & AI First Kuwait",
    date: new Date("2026-05-18"),
    dateDisplay: "May 18, 2026",
    monthAbbr: "MAY",
    monthIndex: 4,
    location: "Kuwait City, Kuwait",
    venue: "Venue TBA",
    attendees: "500+ Delegates",
    href: "/events/data-ai-first/kuwait-may-2026",
    status: "soon",
  },
  {
    id: "ot-security-jubail",
    series: "OT Security First",
    seriesColor: "#D34B9A",
    edition: "2ND EDITION",
    title: "OT Security Jubail",
    date: new Date("2026-06-15"),
    dateDisplay: "June 15, 2026",
    monthAbbr: "JUN",
    monthIndex: 5,
    location: "Jubail, Saudi Arabia",
    venue: "Venue TBA",
    attendees: "300+ Delegates",
    href: "/events/ot-security-first",
    status: "soon",
  },
  {
    id: "digital-first-qatar",
    series: "Data & AI First",
    seriesColor: "#0F735E",
    edition: "2ND EDITION",
    title: "Digital First Qatar",
    date: new Date("2026-09-15"),
    dateDisplay: "September 15, 2026",
    monthAbbr: "SEP",
    monthIndex: 8,
    location: "Doha, Qatar",
    venue: "Venue TBA",
    attendees: "500+ Delegates",
    href: "/events/data-ai-first",
    status: "soon",
  },
  {
    id: "cyber-first-qatar",
    series: "Cyber First",
    seriesColor: "#01BBF5",
    edition: "4TH EDITION",
    title: "Cyber First Qatar",
    date: new Date("2026-09-16"),
    dateDisplay: "September 16, 2026",
    monthAbbr: "SEP",
    monthIndex: 8,
    location: "Doha, Qatar",
    venue: "Venue TBA",
    attendees: "500+ Delegates",
    href: "/events/cyber-first",
    status: "soon",
  },
  {
    id: "opex-first-saudi",
    series: "Opex First",
    seriesColor: "#7C3AED",
    edition: "3RD EDITION",
    title: "OPEX First Saudi",
    date: new Date("2026-09-20"),
    dateDisplay: "September 20, 2026",
    monthAbbr: "SEP",
    monthIndex: 8,
    location: "Riyadh, Saudi Arabia",
    venue: "Venue TBA",
    attendees: "400+ Delegates",
    href: "/events/opex-first",
    status: "soon",
  },
  {
    id: "digital-resilience-ksa",
    series: "Cyber First",
    seriesColor: "#01BBF5",
    edition: "1ST EDITION",
    title: "Digital Resilience KSA",
    date: new Date("2026-09-22"),
    dateDisplay: "September 22, 2026",
    monthAbbr: "SEP",
    monthIndex: 8,
    location: "Riyadh, Saudi Arabia",
    venue: "Venue TBA",
    attendees: "400+ Delegates",
    href: "/events/cyber-first",
    status: "soon",
  },
  {
    id: "cyber-first-oman",
    series: "Cyber First",
    seriesColor: "#01BBF5",
    edition: "5TH EDITION",
    title: "Cyber First Oman",
    date: new Date("2026-10-12"),
    dateDisplay: "October 12, 2026",
    monthAbbr: "OCT",
    monthIndex: 9,
    location: "Muscat, Oman",
    venue: "Venue TBA",
    attendees: "400+ Delegates",
    href: "/events/cyber-first",
    status: "soon",
  },
  {
    id: "ot-security-oman",
    series: "OT Security First",
    seriesColor: "#D34B9A",
    edition: "3RD EDITION",
    title: "OT Security Oman",
    date: new Date("2026-10-13"),
    dateDisplay: "October 13, 2026",
    monthAbbr: "OCT",
    monthIndex: 9,
    location: "Muscat, Oman",
    venue: "Venue TBA",
    attendees: "300+ Delegates",
    href: "/events/ot-security-first",
    status: "soon",
  },
];

// Series filter options
const SERIES_FILTERS = [
  { label: "All", value: "all" },
  { label: "Cyber First", value: "Cyber First", color: "#01BBF5" },
  { label: "Data & AI First", value: "Data & AI First", color: "#0F735E" },
  { label: "OT Security First", value: "OT Security First", color: "#D34B9A" },
  { label: "Opex First", value: "Opex First", color: "#7C3AED" },
];

// Month filter options (derived from actual event months)
const MONTH_FILTERS: { label: string; value: number | "all" }[] = [
  { label: "ALL", value: "all" },
  { label: "APR", value: 3 },
  { label: "MAY", value: 4 },
  { label: "JUN", value: 5 },
  { label: "SEP", value: 8 },
  { label: "OCT", value: 9 },
];

// Find next upcoming event
function getNextEvent(): EventItem {
  const now = new Date();
  const upcoming = allEvents
    .filter((e) => e.date.getTime() > now.getTime())
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  return upcoming[0] || allEvents[0];
}

// Calculate days until event
function getDaysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function AnnualTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeSeries, setActiveSeries] = useState("all");
  const [activeMonth, setActiveMonth] = useState<number | "all">("all");

  const nextEvent = useMemo(() => getNextEvent(), []);

  // Filter events (excluding next event from list)
  const filteredEvents = useMemo(() => {
    return allEvents
      .filter((e) => e.id !== nextEvent.id)
      .filter((e) => activeSeries === "all" || e.series === activeSeries)
      .filter((e) => activeMonth === "all" || e.monthIndex === activeMonth);
  }, [activeSeries, activeMonth, nextEvent.id]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        background: "var(--black-light)",
        padding: "clamp(96px, 8vw, 120px) 0 clamp(48px, 5vw, 72px)",
      }}
    >
      {/* Gradient fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 140,
          background:
            "linear-gradient(to bottom, transparent 0%, var(--black) 100%)",
        }}
      />

      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════
            SECTION HEADER
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 48 }}
        >
          {/* Label */}
          <div
            className="flex items-center gap-3"
            style={{ marginBottom: 12 }}
          >
            <span
              style={{
                width: 30,
                height: 1,
                background: "var(--orange)",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "var(--orange)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              2026 Calendar
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(34px, 4.5vw, 56px)",
              letterSpacing: "-1.5px",
              color: "var(--white)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            The Year Ahead
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 16,
              color: "#707070",
              lineHeight: 1.6,
              maxWidth: 520,
              margin: "12px 0 0",
            }}
          >
            Conferences, boardrooms, and executive gatherings across the GCC —
            every event EFG is bringing to life this year.
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            FEATURED NEXT EVENT CARD
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ marginBottom: 48 }}
        >
          <NextEventCard event={nextEvent} />
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            FILTER BAR
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          style={{
            padding: "20px 24px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: 14,
            marginBottom: 32,
          }}
        >
          {/* Series Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#505050",
                flexShrink: 0,
              }}
            >
              Series
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {SERIES_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveSeries(filter.value)}
                  className="transition-all duration-300"
                  style={{
                    padding: "6px 14px",
                    borderRadius: 50,
                    border: `1px solid ${
                      activeSeries === filter.value
                        ? filter.color || "var(--orange)"
                        : "rgba(255, 255, 255, 0.06)"
                    }`,
                    background:
                      activeSeries === filter.value
                        ? filter.color
                          ? `${filter.color}18`
                          : "rgba(232, 101, 26, 0.12)"
                        : "transparent",
                    color:
                      activeSeries === filter.value
                        ? filter.color || "var(--orange)"
                        : "#606060",
                    fontFamily: "var(--font-outfit)",
                    fontSize: 11,
                    fontWeight: 500,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {filter.color && activeSeries === filter.value && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: filter.color,
                        marginRight: 6,
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            className="hidden sm:block"
            style={{
              width: 1,
              height: 28,
              background: "rgba(255, 255, 255, 0.06)",
              flexShrink: 0,
            }}
          />

          {/* Month Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#505050",
                flexShrink: 0,
              }}
            >
              Month
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {MONTH_FILTERS.map((filter) => (
                <button
                  key={filter.label}
                  onClick={() => setActiveMonth(filter.value)}
                  className="transition-all duration-300"
                  style={{
                    padding: "6px 12px",
                    borderRadius: 50,
                    border: `1px solid ${
                      activeMonth === filter.value
                        ? "var(--orange)"
                        : "rgba(255, 255, 255, 0.06)"
                    }`,
                    background:
                      activeMonth === filter.value
                        ? "rgba(232, 101, 26, 0.12)"
                        : "transparent",
                    color:
                      activeMonth === filter.value ? "var(--orange)" : "#606060",
                    fontFamily: "var(--font-outfit)",
                    fontSize: 11,
                    fontWeight: 500,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            FILTERED EVENT GRID
            ═══════════════════════════════════════════════════════════════ */}
        <div
          className="flex flex-wrap gap-4"
          style={{
            justifyContent: "center",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                layout
                style={{ flex: "0 1 380px", minWidth: "300px" }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center"
            style={{ padding: "60px 0" }}
          >
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 14,
                fontWeight: 400,
                color: "#404040",
                textAlign: "center",
              }}
            >
              No events match the selected filters.
            </p>
            <button
              onClick={() => {
                setActiveSeries("all");
                setActiveMonth("all");
              }}
              className="transition-all duration-300"
              style={{
                marginTop: 16,
                padding: "8px 20px",
                borderRadius: 50,
                border: "1px solid rgba(232, 101, 26, 0.3)",
                background: "rgba(232, 101, 26, 0.08)",
                color: "var(--orange)",
                fontFamily: "var(--font-outfit)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center"
          style={{ marginTop: 48 }}
        >
          <div
            style={{
              width: 200,
              borderTop: "1px dashed rgba(255,255,255,0.06)",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 13,
              fontWeight: 400,
              color: "#353535",
              textAlign: "center",
              marginTop: 16,
            }}
          >
            More events and dates to be confirmed soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// NEXT EVENT CARD — Featured hero card with countdown
// ═══════════════════════════════════════════════════════════════

function NextEventCard({ event }: { event: EventItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const target = event.date.getTime();
      const diff = Math.max(0, target - now);

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [event.date]);

  const daysUntil = getDaysUntil(event.date);
  const accentColor = event.seriesColor;

  return (
    <Link
      href={event.href}
      className="next-event-card block relative overflow-hidden transition-all duration-500"
      style={{
        background: "var(--black-card)",
        borderTop: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.06)"}`,
        borderLeft: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.06)"}`,
        borderRight: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.06)"}`,
        borderBottom: `3px solid ${accentColor}`,
        borderRadius: 20,
        cursor: "pointer",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered
          ? `0 20px 60px rgba(0, 0, 0, 0.3), 0 0 30px ${accentColor}10`
          : "none",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle accent glow */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: 300,
          height: 300,
          background: `radial-gradient(circle at top right, ${accentColor}0A, transparent 70%)`,
        }}
      />

      <div
        style={{
          padding: "clamp(24px, 3vw, 36px) clamp(24px, 3vw, 40px)",
        }}
      >
        {/* Top Row: Badges + Days pill */}
        <div
          className="flex flex-wrap items-center justify-between gap-3"
          style={{ marginBottom: 20 }}
        >
          {/* Left badges */}
          <div className="flex flex-wrap items-center gap-2">
            {/* NEXT EVENT badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 14px",
                background: "rgba(232, 101, 26, 0.12)",
                border: "1px solid rgba(232, 101, 26, 0.25)",
                borderRadius: 50,
                fontFamily: "var(--font-outfit)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#E8651A",
              }}
            >
              <PulsingDot color="#E8651A" />
              Next Event
            </span>

            {/* Series badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 14px",
                background: `${accentColor}14`,
                border: `1px solid ${accentColor}26`,
                borderRadius: 50,
                fontFamily: "var(--font-outfit)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: accentColor,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: accentColor,
                }}
              />
              {event.series}
            </span>

            {/* Edition badge */}
            <span
              style={{
                padding: "5px 12px",
                background: "rgba(255, 255, 255, 0.04)",
                borderRadius: 50,
                fontFamily: "var(--font-outfit)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#505050",
              }}
            >
              {event.edition}
            </span>
          </div>

          {/* Days until pill */}
          <span
            style={{
              padding: "5px 16px",
              background: `${accentColor}12`,
              border: `1px solid ${accentColor}22`,
              borderRadius: 50,
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "1px",
              color: accentColor,
            }}
          >
            In {daysUntil} days
          </span>
        </div>

        {/* Event Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: 800,
            letterSpacing: "-1px",
            color: "var(--white)",
            lineHeight: 1.15,
            margin: "0 0 16px",
          }}
        >
          {event.title}
        </h3>

        {/* Details Row */}
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
          style={{ marginBottom: 24 }}
        >
          <DetailItem icon={<CalendarIcon />} text={event.dateDisplay} />
          <DetailItem icon={<MapPinIcon />} text={event.location} />
          <DetailItem icon={<UsersIcon />} text={event.attendees} />
        </div>

        {/* Bottom Row: CTA + Countdown */}
        <div className="next-event-bottom flex flex-wrap items-center justify-between gap-4">
          {/* Register CTA */}
          <div
            className="inline-flex items-center gap-2 transition-all duration-400"
            style={{
              padding: "13px 32px",
              background: isHovered ? accentColor : "transparent",
              border: `1px solid ${
                isHovered ? accentColor : "rgba(255, 255, 255, 0.12)"
              }`,
              borderRadius: 50,
              color: isHovered ? "#0A0A0A" : "white",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Register Now
            </span>
            <span>→</span>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-3">
            <CountdownUnit
              value={countdown.days}
              label="Days"
              color={accentColor}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.15)",
              }}
            >
              :
            </span>
            <CountdownUnit
              value={countdown.hours}
              label="Hrs"
              color={accentColor}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.15)",
              }}
            >
              :
            </span>
            <CountdownUnit
              value={countdown.minutes}
              label="Min"
              color={accentColor}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.15)",
              }}
            >
              :
            </span>
            <CountdownUnit
              value={countdown.seconds}
              label="Sec"
              color={accentColor}
            />
          </div>
        </div>
      </div>

      {/* Mobile styles */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .next-event-bottom {
            flex-direction: column;
            align-items: stretch !important;
          }
          .next-event-bottom > div:first-child {
            justify-content: center;
          }
          .next-event-bottom > div:last-child {
            justify-content: center;
          }
        }
      `}</style>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════
// COUNTDOWN UNIT
// ═══════════════════════════════════════════════════════════════

function CountdownUnit({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 700,
            color: "var(--white)",
            letterSpacing: "-0.5px",
          }}
        >
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 9,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: color,
          marginTop: 4,
          opacity: 0.7,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EVENT CARD — Grid card for filtered events
// ═══════════════════════════════════════════════════════════════

function EventCard({ event }: { event: EventItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const accentColor = event.seriesColor;
  const daysUntil = getDaysUntil(event.date);
  const dayNum = event.date.getDate();
  const monthShort = event.date
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();

  return (
    <Link
      href={event.href}
      className="block relative overflow-hidden transition-all"
      style={{
        background: "var(--black-card)",
        border: `1px solid ${
          isHovered ? `${accentColor}40` : "rgba(255,255,255,0.06)"
        }`,
        borderRadius: 16,
        padding: 24,
        cursor: "pointer",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered
          ? `0 12px 40px rgba(0,0,0,0.3), 0 0 20px ${accentColor}10`
          : "none",
        transitionDuration: "0.4s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Colored top border */}
      <div
        className="absolute top-0 left-0 right-0 transition-all"
        style={{
          height: isHovered ? 4 : 3,
          background: accentColor,
        }}
      />

      {/* Top: Date + Countdown */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 16 }}
      >
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            {dayNum}
          </span>
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: accentColor,
            }}
          >
            {monthShort}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <PulsingDot color={accentColor} />
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: accentColor,
            }}
          >
            {daysUntil}d
          </span>
        </div>
      </div>

      {/* Series + Edition badges */}
      <div
        className="flex flex-wrap items-center gap-2"
        style={{ marginBottom: 12 }}
      >
        <div
          className="inline-flex items-center gap-1.5"
          style={{
            background: `${accentColor}14`,
            border: `1px solid ${accentColor}26`,
            borderRadius: 50,
            padding: "3px 10px",
          }}
        >
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: accentColor,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 9,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: accentColor,
            }}
          >
            {event.series}
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 9,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#484848",
            background: "rgba(255,255,255,0.04)",
            padding: "3px 8px",
            borderRadius: 4,
          }}
        >
          {event.edition}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.3px",
          margin: "0 0 10px",
        }}
      >
        {event.title}
      </h3>

      {/* Location */}
      <div
        className="flex items-center gap-1.5"
        style={{ marginBottom: 6 }}
      >
        <span style={{ opacity: 0.25 }}>
          <MapPinIcon />
        </span>
        <span
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 12,
            fontWeight: 300,
            color: "#606060",
          }}
        >
          {event.location}
        </span>
      </div>

      {/* Delegates */}
      <div
        className="flex items-center gap-1.5"
        style={{ marginBottom: 16 }}
      >
        <span style={{ opacity: 0.25 }}>
          <UsersIcon />
        </span>
        <span
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 12,
            fontWeight: 300,
            color: "#606060",
          }}
        >
          {event.attendees}
        </span>
      </div>

      {/* Register link */}
      <div
        className="transition-all duration-300"
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 12,
          fontWeight: 500,
          color: isHovered ? accentColor : "#707070",
        }}
      >
        Register →
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════

function DetailItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span style={{ opacity: 0.3 }}>{icon}</span>
      <span
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 13,
          fontWeight: 300,
          color: "#606060",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function PulsingDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span
        className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
        style={{ background: color, animationDuration: "2s" }}
      />
      <span
        className="relative inline-flex rounded-full h-1.5 w-1.5"
        style={{ background: color }}
      />
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════

function CalendarIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "white" }}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "white" }}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "white" }}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="2" />
      <line x1="15" y1="22" x2="15" y2="2" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "white" }}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
