"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════
// EVENT DATA
// ═══════════════════════════════════════════════════════════════

type ConferenceEvent = {
  type: "conference";
  id: string;
  series: string;
  seriesColor: string;
  isLight?: boolean;
  edition: string;
  title: string;
  date: Date;
  day: number;
  weekday: string;
  location: string;
  venue: string;
  attendees: string;
  href: string;
};

type BoardroomEvent = {
  type: "boardroom";
  id: string;
  title: string;
  date: Date;
  day: number;
  monthAbbr: string;
  location: string;
  host: string;
  href: string;
};

type TimelineEvent = ConferenceEvent | BoardroomEvent;

type MonthData = {
  month: string;
  events: TimelineEvent[];
};

const timelineData: MonthData[] = [
  {
    month: "MARCH",
    events: [
      {
        type: "boardroom",
        id: "clevertap-dubai",
        title: "CleverTap Executive Boardroom",
        date: new Date("2026-03-02"),
        day: 2,
        monthAbbr: "MAR",
        location: "Dubai, UAE",
        host: "CleverTap",
        href: "/networkfirst",
      },
      {
        type: "boardroom",
        id: "clevertap-riyadh",
        title: "CleverTap Executive Boardroom",
        date: new Date("2026-03-03"),
        day: 3,
        monthAbbr: "MAR",
        location: "Riyadh, Saudi Arabia",
        host: "CleverTap",
        href: "/networkfirst",
      },
    ],
  },
  {
    month: "APRIL",
    events: [
      {
        type: "conference",
        id: "cyber-first-kuwait",
        series: "Cyber First",
        seriesColor: "#01BBF5",
        edition: "3RD EDITION",
        title: "Cyber First Kuwait",
        date: new Date("2026-04-21"),
        day: 21,
        weekday: "TUE",
        location: "Kuwait City, Kuwait",
        venue: "Venue TBA",
        attendees: "500+ Attendees",
        href: "/events/cyber-first",
      },
      {
        type: "boardroom",
        id: "outsystems-riyadh",
        title: "OutSystems Executive Boardroom",
        date: new Date("2026-04-29"),
        day: 29,
        monthAbbr: "APR",
        location: "Riyadh, Saudi Arabia",
        host: "OutSystems",
        href: "/networkfirst",
      },
    ],
  },
  {
    month: "MAY",
    events: [
      {
        type: "conference",
        id: "data-first-kuwait",
        series: "Data & AI First",
        seriesColor: "#0F735E",
        edition: "1ST EDITION",
        title: "Data First Kuwait",
        date: new Date("2026-05-18"),
        day: 18,
        weekday: "MON",
        location: "Kuwait City, Kuwait",
        venue: "Venue TBA",
        attendees: "500+ Attendees",
        href: "/events/data-ai-first",
      },
    ],
  },
  {
    month: "JUNE",
    events: [
      {
        type: "conference",
        id: "ot-security-jubail",
        series: "OT Security First",
        seriesColor: "#D34B9A",
        edition: "2ND EDITION",
        title: "OT Security Jubail",
        date: new Date("2026-06-15"),
        day: 15,
        weekday: "TBC",
        location: "Jubail, Saudi Arabia",
        venue: "Venue TBA",
        attendees: "300+ Attendees",
        href: "/events/ot-security-first",
      },
    ],
  },
  {
    month: "SEPTEMBER",
    events: [
      {
        type: "conference",
        id: "digital-first-qatar",
        series: "Data & AI First",
        seriesColor: "#0F735E",
        edition: "2ND EDITION",
        title: "Digital First Qatar",
        date: new Date("2026-09-15"),
        day: 15,
        weekday: "TBC",
        location: "Doha, Qatar",
        venue: "Venue TBA",
        attendees: "500+ Attendees",
        href: "/events/data-ai-first",
      },
      {
        type: "conference",
        id: "cyber-first-qatar",
        series: "Cyber First",
        seriesColor: "#01BBF5",
        edition: "4TH EDITION",
        title: "Cyber First Qatar",
        date: new Date("2026-09-16"),
        day: 16,
        weekday: "TBC",
        location: "Doha, Qatar",
        venue: "Venue TBA",
        attendees: "500+ Attendees",
        href: "/events/cyber-first",
      },
      {
        type: "conference",
        id: "opex-first-saudi",
        series: "Opex First",
        seriesColor: "#7C3AED",
        edition: "3RD EDITION",
        title: "OPEX First Saudi",
        date: new Date("2026-09-20"),
        day: 20,
        weekday: "TBC",
        location: "Riyadh, Saudi Arabia",
        venue: "Venue TBA",
        attendees: "400+ Attendees",
        href: "/events/opex-first",
      },
      {
        type: "conference",
        id: "digital-resilience-ksa",
        series: "Cyber First",
        seriesColor: "#01BBF5",
        edition: "1ST EDITION",
        title: "Digital Resilience KSA",
        date: new Date("2026-09-22"),
        day: 22,
        weekday: "TBC",
        location: "Riyadh, Saudi Arabia",
        venue: "Venue TBA",
        attendees: "400+ Attendees",
        href: "/events/cyber-first",
      },
    ],
  },
  {
    month: "OCTOBER",
    events: [
      {
        type: "conference",
        id: "cyber-first-oman",
        series: "Cyber First",
        seriesColor: "#01BBF5",
        edition: "5TH EDITION",
        title: "Cyber First Oman",
        date: new Date("2026-10-12"),
        day: 12,
        weekday: "TBC",
        location: "Muscat, Oman",
        venue: "Venue TBA",
        attendees: "400+ Attendees",
        href: "/events/cyber-first",
      },
      {
        type: "conference",
        id: "ot-security-oman",
        series: "OT Security First",
        seriesColor: "#D34B9A",
        edition: "3RD EDITION",
        title: "OT Security Oman",
        date: new Date("2026-10-13"),
        day: 13,
        weekday: "TBC",
        location: "Muscat, Oman",
        venue: "Venue TBA",
        attendees: "300+ Attendees",
        href: "/events/ot-security-first",
      },
    ],
  },
];

// Calculate days until event
function getDaysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

type ViewMode = "list" | "grid";

export default function AnnualTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        background: "var(--black-light)",
        padding: "clamp(48px, 5vw, 72px) 0 clamp(48px, 5vw, 72px)",
      }}
    >
      {/* Gradient fade to next section — seamless scene transition */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 140,
          background: "linear-gradient(to bottom, transparent 0%, var(--black) 100%)",
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
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          style={{ marginBottom: 56 }}
        >
          <div>
            {/* Label */}
            <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
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
          </div>

          {/* View Toggle */}
          <div
            className="flex items-center gap-1"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 8,
              padding: 4,
            }}
          >
            <button
              onClick={() => setViewMode("list")}
              className="flex items-center gap-2 transition-all"
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                background: viewMode === "list" ? "rgba(232, 101, 26, 0.15)" : "transparent",
                border: viewMode === "list" ? "1px solid rgba(232, 101, 26, 0.3)" : "1px solid transparent",
                color: viewMode === "list" ? "#E8651A" : "#606060",
                fontFamily: "var(--font-outfit)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <ListIcon />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className="flex items-center gap-2 transition-all"
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                background: viewMode === "grid" ? "rgba(232, 101, 26, 0.15)" : "transparent",
                border: viewMode === "grid" ? "1px solid rgba(232, 101, 26, 0.3)" : "1px solid transparent",
                color: viewMode === "grid" ? "#E8651A" : "#606060",
                fontFamily: "var(--font-outfit)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <GridIcon />
              <span>Grid</span>
            </button>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            TIMELINE — List or Grid View
            ═══════════════════════════════════════════════════════════════ */}
        {viewMode === "list" ? (
          <div className="flex flex-col" style={{ gap: 40 }}>
            {timelineData.map((monthData, monthIndex) => (
              <MonthBlock
                key={monthData.month}
                monthData={monthData}
                monthIndex={monthIndex}
                isInView={isInView}
              />
            ))}

            {/* Coming Soon */}
            <ComingSoon isInView={isInView} />
          </div>
        ) : (
          <GridView timelineData={timelineData} isInView={isInView} />
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// MONTH BLOCK
// ═══════════════════════════════════════════════════════════════

function MonthBlock({
  monthData,
  monthIndex,
  isInView,
}: {
  monthData: MonthData;
  monthIndex: number;
  isInView: boolean;
}) {
  const baseDelay = monthIndex * 0.2;

  return (
    <div>
      {/* Month Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: baseDelay }}
        className="flex items-center gap-4"
        style={{ marginBottom: 20 }}
      >
        <span
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "5px",
            color: "#303030",
            flexShrink: 0,
          }}
        >
          {monthData.month}
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: "rgba(255,255,255,0.04)",
          }}
        />
      </motion.div>

      {/* Events */}
      <div className="flex flex-col" style={{ gap: 12 }}>
        {monthData.events.map((event, eventIndex) => {
          const isConference = event.type === "conference";
          const delay = baseDelay + 0.1 + eventIndex * (isConference ? 0.15 : 0.08);

          // Back to back connector disabled (no consecutive day events currently)
          const needsConnector = false;

          return (
            <div key={event.id}>
              {isConference ? (
                <ConferenceRow
                  event={event as ConferenceEvent}
                  delay={delay}
                  isInView={isInView}
                />
              ) : (
                <BoardroomRow
                  event={event as BoardroomEvent}
                  delay={delay}
                  isInView={isInView}
                />
              )}

              {/* Back to Back Connector */}
              {needsConnector && (
                <BackToBackConnector delay={delay + 0.3} isInView={isInView} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONFERENCE ROW
// ═══════════════════════════════════════════════════════════════

function ConferenceRow({
  event,
  delay,
  isInView,
}: {
  event: ConferenceEvent;
  delay: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayDay, setDisplayDay] = useState(1);
  const rowRef = useRef<HTMLAnchorElement>(null);
  const rowInView = useInView(rowRef, { once: true, margin: "-50px" });
  const daysUntil = getDaysUntil(event.date);

  // Counting animation for day number
  useEffect(() => {
    if (!rowInView) return;

    const duration = 400;
    const steps = 15;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayDay(Math.round(1 + (event.day - 1) * eased));

      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplayDay(event.day);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [rowInView, event.day]);

  const accentColor = event.seriesColor;
  const isLight = event.isLight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        ref={rowRef}
        href={event.href}
        className="conference-row block relative overflow-hidden transition-all"
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr auto",
          gap: 32,
          alignItems: "center",
          padding: "28px 32px",
          background: "var(--black-card)",
          border: `1px solid ${isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
          borderRadius: 16,
          cursor: "pointer",
          transform: isHovered ? "translateY(-3px)" : "translateY(0)",
          boxShadow: isHovered ? "0 12px 40px rgba(0,0,0,0.25)" : "none",
          transitionDuration: "0.5s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Colored edge indicator */}
        <div
          className="absolute left-0 top-0 bottom-0 transition-all duration-500"
          style={{
            width: isHovered ? 6 : 4,
            background: accentColor,
            opacity: 1, // Always visible for anchor
          }}
        />

        {/* DATE COLUMN */}
        <div
          className="flex flex-col items-center justify-center rounded-lg"
          style={{
            width: 80,
            height: 80,
            background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 100%)`,
            border: `1px solid ${accentColor}20`,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            {displayDay.toString().padStart(2, "0")}
          </div>
          <div
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 9,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: accentColor,
              marginTop: 4,
            }}
          >
            {event.weekday}
          </div>
        </div>

        {/* INFO COLUMN */}
        <div>
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Series badge */}
            <div
              className="inline-flex items-center gap-2"
              style={{
                background: isLight ? "rgba(238,238,238,0.06)" : `${accentColor}14`,
                border: `1px solid ${isLight ? "rgba(238,238,238,0.1)" : accentColor + "26"}`,
                borderRadius: 50,
                padding: "4px 12px",
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
              <span
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: accentColor,
                }}
              >
                {event.series}
              </span>
            </div>

            {/* Edition badge */}
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 9.5,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "#484848",
                background: "rgba(255,255,255,0.04)",
                padding: "3px 10px",
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
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.3px",
              color: "white",
              margin: "10px 0 0",
            }}
          >
            {event.title}
          </h3>

          {/* Details */}
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
            style={{ marginTop: 8 }}
          >
            <DetailItem icon={<MapPinIcon />} text={event.location} />
            <DetailItem icon={<BuildingIcon />} text={event.venue} />
            <DetailItem icon={<UsersIcon />} text={event.attendees} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col items-end gap-3">
          {/* Countdown */}
          <div className="flex items-center gap-2">
            <PulsingDot color={accentColor} />
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: accentColor,
              }}
            >
              IN {daysUntil} DAYS
            </span>
          </div>

          {/* Register button */}
          <div
            className="transition-all"
            style={{
              padding: "12px 28px",
              border: `1px solid ${isHovered ? accentColor : "rgba(255,255,255,0.1)"}`,
              borderRadius: 50,
              background: isHovered
                ? isLight
                  ? "rgba(238,238,238,0.12)"
                  : accentColor
                : "transparent",
              color: isHovered && !isLight ? "#0A0A0A" : isHovered && isLight ? "#EEEEEE" : "white",
              fontFamily: "var(--font-outfit)",
              fontSize: 13,
              fontWeight: 500,
              transitionDuration: "0.4s",
            }}
          >
            Register →
          </div>
        </div>

        {/* Mobile styles */}
        <style jsx>{`
          @media (max-width: 768px) {
            .conference-row {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
          }
        `}</style>
      </Link>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BOARDROOM ROW — Premium amber-accented invitation-only design
// ═══════════════════════════════════════════════════════════════

const AMBER = "#C9935A";

function BoardroomRow({
  event,
  delay,
  isInView,
}: {
  event: BoardroomEvent;
  delay: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={event.href}
        className="boardroom-row relative flex flex-wrap items-center gap-4 md:gap-6 overflow-hidden transition-all"
        style={{
          padding: "20px 28px 20px 32px",
          background: isHovered ? "rgba(201,147,90,0.05)" : "rgba(201,147,90,0.02)",
          border: `1px solid ${isHovered ? "rgba(201,147,90,0.15)" : "rgba(201,147,90,0.06)"}`,
          borderRadius: 14,
          cursor: "pointer",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
          boxShadow: isHovered ? "0 8px 30px rgba(201,147,90,0.06)" : "none",
          transitionDuration: "0.4s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left amber accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 transition-all duration-500"
          style={{
            width: 3,
            background: AMBER,
            opacity: isHovered ? 1 : 0.4,
          }}
        />

        {/* Date */}
        <div
          className="flex items-center gap-2"
          style={{ minWidth: 64 }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            {event.day}
          </span>
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 10,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: AMBER,
            }}
          >
            {event.monthAbbr}
          </span>
        </div>

        {/* Invitation-only badge */}
        <div
          className="inline-flex items-center gap-1.5"
          style={{
            background: "rgba(201,147,90,0.06)",
            border: "1px solid rgba(201,147,90,0.12)",
            borderRadius: 50,
            padding: "3px 10px",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2" style={{ opacity: 0.7 }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 8.5,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: AMBER,
            }}
          >
            Invite Only
          </span>
        </div>

        {/* Title */}
        <span
          className="flex-1"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 15,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.2px",
            minWidth: 200,
          }}
        >
          {event.title}
        </span>

        {/* Host */}
        <div className="flex items-center gap-1.5">
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 400,
              color: "rgba(201,147,90,0.5)",
            }}
          >
            Hosted by{" "}
            <span style={{ color: "rgba(201,147,90,0.7)", fontWeight: 500 }}>
              {event.host}
            </span>
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5">
          <span style={{ opacity: 0.25 }}>
            <MapPinIconSmall />
          </span>
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 12,
              fontWeight: 300,
              color: "#505050",
            }}
          >
            {event.location}
          </span>
        </div>

        {/* Capacity */}
        <div className="flex items-center gap-1.5">
          <span style={{ opacity: 0.2 }}>
            <UsersIconSmall />
          </span>
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 400,
              color: "#404040",
            }}
          >
            15 Seats
          </span>
        </div>

        {/* Request Invite button */}
        <div
          className="transition-all ml-auto"
          style={{
            padding: "8px 20px",
            border: `1px solid ${isHovered ? "rgba(201,147,90,0.3)" : "rgba(201,147,90,0.12)"}`,
            borderRadius: 50,
            background: isHovered ? "rgba(201,147,90,0.1)" : "transparent",
            fontFamily: "var(--font-outfit)",
            fontSize: 11.5,
            fontWeight: 500,
            color: AMBER,
            transitionDuration: "0.3s",
          }}
        >
          Request Invite
        </div>
      </Link>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BACK TO BACK CONNECTOR
// ═══════════════════════════════════════════════════════════════

function BackToBackConnector({
  delay,
  isInView,
}: {
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center gap-2"
      style={{ margin: "16px 0" }}
    >
      <div
        style={{
          width: 1,
          height: 20,
          background: "rgba(255,255,255,0.06)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 9.5,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "3px",
          color: "#2A2A2A",
          textAlign: "center",
        }}
      >
        Back to Back in Kuwait City
      </span>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// COMING SOON
// ═══════════════════════════════════════════════════════════════

function ComingSoon({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="flex flex-col items-center"
      style={{ marginTop: 40 }}
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
      <Link
        href="#newsletter"
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 12,
          fontWeight: 400,
          color: "rgba(232, 101, 26, 0.6)",
          textAlign: "center",
          marginTop: 8,
        }}
      >
        Want early access? Subscribe to our newsletter.
      </Link>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GRID VIEW
// ═══════════════════════════════════════════════════════════════

function GridView({
  timelineData,
  isInView,
}: {
  timelineData: MonthData[];
  isInView: boolean;
}) {
  // Flatten all events with month info
  const allEvents = timelineData.flatMap((month) =>
    month.events.map((event) => ({ ...event, monthName: month.month }))
  );

  // Separate conferences and boardrooms
  const conferences = allEvents.filter((e) => e.type === "conference") as (ConferenceEvent & { monthName: string })[];
  const boardrooms = allEvents.filter((e) => e.type === "boardroom") as (BoardroomEvent & { monthName: string })[];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Conferences Grid */}
      <div style={{ marginBottom: 48 }}>
        <div
          className="flex items-center gap-3"
          style={{ marginBottom: 20 }}
        >
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "#505050",
            }}
          >
            Conferences
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              background: "rgba(255,255,255,0.04)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 500,
              color: "#404040",
            }}
          >
            {conferences.length} Events
          </span>
        </div>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {conferences.map((event, index) => (
            <GridConferenceCard
              key={event.id}
              event={event}
              delay={index * 0.05}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      {/* Boardrooms Grid */}
      <div>
        <div
          className="flex items-center gap-3"
          style={{ marginBottom: 20 }}
        >
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "#505050",
            }}
          >
            NetworkFirst Boardrooms
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              background: "rgba(255,255,255,0.04)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 500,
              color: "#404040",
            }}
          >
            {boardrooms.length} Sessions
          </span>
        </div>

        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          }}
        >
          {boardrooms.map((event, index) => (
            <GridBoardroomCard
              key={event.id}
              event={event}
              delay={index * 0.05}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      {/* Coming Soon in Grid */}
      <ComingSoon isInView={isInView} />
    </motion.div>
  );
}

function GridConferenceCard({
  event,
  delay,
  isInView,
}: {
  event: ConferenceEvent & { monthName: string };
  delay: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const accentColor = event.seriesColor;
  const daysUntil = getDaysUntil(event.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={event.href}
        className="block relative overflow-hidden transition-all"
        style={{
          background: "var(--black-card)",
          border: `1px solid ${isHovered ? accentColor + "40" : "rgba(255,255,255,0.06)"}`,
          borderRadius: 16,
          padding: 24,
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: isHovered ? `0 12px 40px rgba(0,0,0,0.3), 0 0 20px ${accentColor}10` : "none",
          transitionDuration: "0.4s",
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

        {/* Month & Date */}
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
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
              {event.day}
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
              {event.monthName.slice(0, 3)}
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

        {/* Series Badge */}
        <div
          className="inline-flex items-center gap-1.5"
          style={{
            background: `${accentColor}14`,
            border: `1px solid ${accentColor}26`,
            borderRadius: 50,
            padding: "3px 10px",
            marginBottom: 12,
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

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.3px",
            margin: "0 0 8px",
          }}
        >
          {event.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5">
          <MapPinIconSmall />
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
      </Link>
    </motion.div>
  );
}

function GridBoardroomCard({
  event,
  delay,
  isInView,
}: {
  event: BoardroomEvent & { monthName: string };
  delay: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={event.href}
        className="block relative overflow-hidden transition-all"
        style={{
          background: isHovered ? "rgba(201,147,90,0.05)" : "rgba(201,147,90,0.02)",
          border: `1px solid ${isHovered ? "rgba(201,147,90,0.18)" : "rgba(201,147,90,0.06)"}`,
          borderRadius: 14,
          padding: "20px 22px",
          transform: isHovered ? "translateY(-3px)" : "translateY(0)",
          boxShadow: isHovered ? "0 10px 30px rgba(201,147,90,0.06)" : "none",
          transitionDuration: "0.4s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top amber accent bar */}
        <div
          className="absolute top-0 left-0 right-0 transition-all"
          style={{
            height: isHovered ? 3 : 2,
            background: AMBER,
            opacity: isHovered ? 1 : 0.4,
          }}
        />

        {/* Top row: Date + Invite badge */}
        <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 700,
                color: "white",
                letterSpacing: "-1px",
              }}
            >
              {event.day}
            </span>
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: AMBER,
              }}
            >
              {event.monthAbbr}
            </span>
          </div>

          {/* Invite Only badge */}
          <div
            className="inline-flex items-center gap-1"
            style={{
              background: "rgba(201,147,90,0.06)",
              border: "1px solid rgba(201,147,90,0.12)",
              borderRadius: 50,
              padding: "2px 8px",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2.5" style={{ opacity: 0.6 }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 8,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: AMBER,
              }}
            >
              Invite Only
            </span>
          </div>
        </div>

        {/* Title */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.2px",
            margin: "0 0 6px",
          }}
        >
          {event.title}
        </p>

        {/* Host */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 11,
            fontWeight: 400,
            color: "rgba(201,147,90,0.5)",
            margin: "0 0 10px",
          }}
        >
          Hosted by{" "}
          <span style={{ color: "rgba(201,147,90,0.7)", fontWeight: 500 }}>
            {event.host}
          </span>
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5" style={{ marginBottom: 14 }}>
          <MapPinIconSmall />
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 12,
              fontWeight: 300,
              color: "#505050",
            }}
          >
            {event.location}
          </span>
        </div>

        {/* Request Invite link */}
        <span
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 11.5,
            fontWeight: 500,
            color: AMBER,
          }}
        >
          Request Invite →
        </span>
      </Link>
    </motion.div>
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

function MapPinIconSmall() {
  return (
    <svg
      width="10"
      height="10"
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

function UsersIconSmall() {
  return (
    <svg
      width="10"
      height="10"
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

function ListIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
