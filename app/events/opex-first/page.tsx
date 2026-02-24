"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Footer } from "@/components/sections";
import SeriesTickerBar from "@/components/ui/SeriesTickerBar";

// Brand Colors
const VIOLET = "#7C3AED";
const VIOLET_BRIGHT = "#9F67FF";

// Easing
const EASE = [0.16, 1, 0.3, 1] as const;

// Layout widths
const MAX_WIDTH = 1200;
const LEFT_WIDE = "65%";
const RIGHT_NARROW = "35%";

// =============================================================================
// MODULE 0: HERO (Full bleed)
// =============================================================================

function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://opexfirst.com/wp-content/uploads/2025/10/DSC08180.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.15) saturate(0.4)",
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(124,58,237,0.04) 40%, rgba(10,10,10,0.95) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center"
        style={{
          minHeight: "100vh",
          padding: "0 24px 100px",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center"
          style={{ marginTop: "18vh" }}
        >
          <div className="flex items-center gap-3">
            <span style={{ width: 40, height: 1, background: VIOLET }} />
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: VIOLET,
              }}
            >
              Opex First Series
            </span>
            <span style={{ width: 40, height: 1, background: VIOLET }} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 9,
              color: "#404040",
              marginTop: 8,
            }}
          >
            AN EVENTS FIRST GROUP SERIES
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(56px, 8vw, 100px)",
            letterSpacing: "-2px",
            lineHeight: 1,
            color: "var(--white)",
            marginTop: 20,
          }}
        >
          Opex First
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: "clamp(18px, 2.2vw, 24px)",
            fontWeight: 300,
            color: `${VIOLET}B3`,
            marginTop: 12,
          }}
        >
          Where Efficiency Meets Excellence
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 17,
            fontWeight: 300,
            color: "#909090",
            lineHeight: 1.7,
            maxWidth: 600,
            marginTop: 24,
          }}
        >
          The GCC's dedicated summit series for operational excellence, business
          transformation, and process innovation. Bringing together COOs,
          excellence leaders, and transformation architects across the region.
        </motion.p>

        {/* Focus Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          className="flex flex-wrap justify-center gap-2"
          style={{ marginTop: 24 }}
        >
          {["PROCESS EXCELLENCE", "DIGITAL TRANSFORMATION", "SUSTAINABILITY"].map(
            (badge) => (
              <span
                key={badge}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: VIOLET,
                  fontFamily: "var(--font-outfit)",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  color: "var(--white)",
                }}
              >
                {badge}
              </span>
            )
          )}
          <span
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "var(--font-outfit)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "1.5px",
              color: "#404040",
            }}
          >
            SUPPLY CHAIN
          </span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
          className="flex flex-wrap justify-center gap-3"
          style={{ marginTop: 28 }}
        >
          <HeroButton primary href="#editions">
            View Upcoming Edition →
          </HeroButton>
          <HeroButton href="/sponsors-and-partners">Become a Sponsor →</HeroButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
          className="flex flex-wrap justify-center gap-8"
          style={{ marginTop: 40 }}
        >
          <HeroStat value="2" label="EDITIONS COMPLETED" />
          <HeroStat value="4" label="CITIES PLANNED" />
          <HeroStat value="300+" label="DELEGATES TO DATE" />
          <HeroStat value="30+" label="SPEAKERS FEATURED" />
        </motion.div>
      </div>

      {/* Ticker Bar */}
      <SeriesTickerBar
        accentColor={VIOLET}
        eventName="Opex First Abu Dhabi"
        location="St. Regis, Abu Dhabi"
        targetDate={new Date("2026-02-10T09:00:00")}
        ctaText="View Highlights"
        ctaHref="/events/opex-first/abu-dhabi-2026"
        angularRadius={false}
      />
    </section>
  );
}

function HeroButton({
  children,
  primary = false,
  href,
}: {
  children: React.ReactNode;
  primary?: boolean;
  href: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="inline-flex items-center transition-all"
      style={{
        padding: "14px 28px",
        borderRadius: 10,
        background: primary
          ? isHovered
            ? VIOLET_BRIGHT
            : VIOLET
          : isHovered
            ? `${VIOLET}15`
            : "transparent",
        border: primary ? "none" : `1px solid ${VIOLET}`,
        fontFamily: "var(--font-outfit)",
        fontSize: 14,
        fontWeight: 500,
        color: primary ? "var(--white)" : VIOLET,
        transitionDuration: "0.3s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 800,
          color: "var(--white)",
          margin: 0,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: "2px",
          color: "#505050",
          marginTop: 4,
        }}
      >
        {label}
      </p>
    </div>
  );
}

// =============================================================================
// ZIGZAG MODULE WRAPPER
// =============================================================================

function ZigzagModule({
  children,
  contentLeft = true,
  id,
}: {
  children: React.ReactNode;
  contentLeft?: boolean;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id={id}
      style={{
        background: contentLeft ? "#0A0A0A" : "#0E0E0E",
        padding: "clamp(80px, 10vw, 130px) 24px",
        position: "relative",
      }}
    >
      {/* Vertical connector line */}
      <div
        className="connector-line"
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 1,
          background: "rgba(124,58,237,0.1)",
          transform: "translateX(-50%)",
        }}
      />
      {/* Connector dot at top */}
      <div
        className="connector-dot"
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(124,58,237,0.15)",
          transform: "translateX(-50%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: contentLeft ? -20 : 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="zigzag-grid"
        style={{
          maxWidth: MAX_WIDTH,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: contentLeft
            ? `${LEFT_WIDE} ${RIGHT_NARROW}`
            : `${RIGHT_NARROW} ${LEFT_WIDE}`,
          gap: 60,
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </motion.div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .zigzag-grid {
            grid-template-columns: 1fr !important;
          }
          .connector-line,
          .connector-dot {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
      <span style={{ width: 20, height: 2, background: VIOLET }} />
      <span
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: VIOLET,
        }}
      >
        {children}
      </span>
    </div>
  );
}

// =============================================================================
// MODULE 1: THE MISSION
// =============================================================================

function Mission() {
  return (
    <ZigzagModule contentLeft={true}>
      {/* LEFT - Content */}
      <div>
        <SectionLabel>About Opex First</SectionLabel>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 36,
            fontWeight: 800,
            color: "var(--white)",
            letterSpacing: "-1px",
            margin: "0 0 24px",
          }}
        >
          Redefining Operational Brilliance
        </h2>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 17,
            fontWeight: 300,
            color: "#808080",
            lineHeight: 1.8,
            marginBottom: 20,
          }}
        >
          The GCC is in the middle of the most ambitious economic transformation
          in history. Saudi Arabia's Vision 2030, the UAE's Operation 300bn,
          Kuwait's New Kuwait 2035 — trillions of dollars in mega-projects,
          industrial diversification, and digital transformation. But vision
          without execution is just a plan. Opex First is where execution gets
          engineered.
        </p>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 17,
            fontWeight: 300,
            color: "#808080",
            lineHeight: 1.8,
          }}
        >
          This is the region's only dedicated platform for operational
          excellence — uniting government authorities, business leaders, and
          global technology innovators to share strategies, address evolving
          challenges, and set new benchmarks for efficiency, sustainability, and
          performance.
        </p>
      </div>

      {/* RIGHT - Image */}
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://opexfirst.com/wp-content/uploads/2025/07/about-bg1.jpg"
          alt="Opex First Summit"
          style={{
            width: "100%",
            height: "100%",
            minHeight: 400,
            objectFit: "cover",
            borderRadius: 14,
            boxShadow: "0 20px 40px rgba(124,58,237,0.08)",
          }}
        />
      </div>
    </ZigzagModule>
  );
}

// =============================================================================
// MODULE 2: EDITIONS MAP
// =============================================================================

function Editions() {
  const editions = [
    {
      num: "01",
      city: "Riyadh, KSA",
      details: "1st Edition · Sep 9, 2025 · Marriott Hotel",
      status: "COMPLETED",
    },
    {
      num: "02",
      city: "Abu Dhabi, UAE",
      details: "2nd Edition · Feb 10, 2026 · St. Regis Hotel",
      status: "COMPLETED",
    },
    {
      num: "03",
      city: "Kuwait City, Kuwait",
      details: "Edition TBA · Date TBA",
      status: "ANNOUNCING SOON",
      dimmed: true,
    },
    {
      num: "04",
      city: "Doha, Qatar",
      details: "Edition TBA · Date TBA",
      status: "ANNOUNCING SOON",
      dimmed: true,
    },
  ];

  return (
    <ZigzagModule contentLeft={false} id="editions">
      {/* LEFT - Images */}
      <div className="flex flex-col gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=500&q=80"
          alt="Riyadh"
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 14,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80"
          alt="Abu Dhabi"
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 14,
          }}
        />
        <div className="grid grid-cols-2 gap-3">
          <div
            style={{
              height: 100,
              border: "1px dashed rgba(124,58,237,0.15)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 11,
                color: "#404040",
              }}
            >
              Kuwait 2027
            </span>
          </div>
          <div
            style={{
              height: 100,
              border: "1px dashed rgba(124,58,237,0.15)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 11,
                color: "#404040",
              }}
            >
              Doha 2027
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT - Content */}
      <div>
        <SectionLabel>Editions</SectionLabel>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 800,
            color: "var(--white)",
            letterSpacing: "-1px",
            margin: "0 0 32px",
          }}
        >
          Growing Across the GCC
        </h2>

        <div>
          {editions.map((edition) => (
            <EditionRow key={edition.num} edition={edition} />
          ))}
        </div>
      </div>
    </ZigzagModule>
  );
}

function EditionRow({
  edition,
}: {
  edition: {
    num: string;
    city: string;
    details: string;
    status: string;
    dimmed?: boolean;
  };
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-4 transition-all"
      style={{
        padding: "20px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        opacity: edition.dimmed ? 0.5 : 1,
        background: isHovered ? `${VIOLET}05` : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 14,
          fontWeight: 700,
          color: VIOLET,
          minWidth: 28,
        }}
      >
        {edition.num}
      </span>
      <div className="flex-1">
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 700,
            color: "var(--white)",
            margin: 0,
          }}
        >
          {edition.city}
        </p>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 13,
            color: "#606060",
            margin: "4px 0 0",
          }}
        >
          {edition.details}
        </p>
      </div>
      <span
        style={{
          padding: "6px 12px",
          borderRadius: 6,
          border: edition.dimmed
            ? "1px solid rgba(255,255,255,0.06)"
            : `1px solid ${VIOLET}40`,
          fontFamily: "var(--font-outfit)",
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "1px",
          color: edition.dimmed ? "#404040" : VIOLET,
        }}
      >
        {edition.status}
      </span>
    </div>
  );
}

// =============================================================================
// MODULE 3: KEY THEMES
// =============================================================================

function Themes() {
  const topics = [
    {
      num: "01",
      title: "Digital Transformation & AI",
      desc: "Integrating AI, IoT, and automation into operations for next-generation productivity and process intelligence.",
    },
    {
      num: "02",
      title: "Agentic AI & Automation",
      desc: "Autonomous AI agents executing complex business processes, from procurement to supply chain orchestration.",
    },
    {
      num: "03",
      title: "Process Excellence & Optimization",
      desc: "Lean, Six Sigma, BPM, and continuous improvement methodologies for measurable operational gains.",
    },
    {
      num: "04",
      title: "Supply Chain Resilience",
      desc: "Building agile, transparent, and disruption-proof supply chains across global and regional networks.",
    },
    {
      num: "05",
      title: "Sustainability & ESG",
      desc: "Embedding environmentally responsible practices into operations with measurable outcomes.",
    },
    {
      num: "06",
      title: "Giga-Project Operations",
      desc: "Operational strategies for the region's megaprojects — NEOM, Qiddiya, The Red Sea, Masdar.",
    },
    {
      num: "07",
      title: "Public-Private Synergies",
      desc: "Bridging government vision and private sector execution for national transformation programmes.",
    },
    {
      num: "08",
      title: "Workforce Transformation",
      desc: "Upskilling, culture change, and building high-performance operational teams.",
    },
    {
      num: "09",
      title: "Finance & Procurement Excellence",
      desc: "Streamlining financial processes, e-invoicing, and strategic procurement for cost efficiency.",
    },
    {
      num: "10",
      title: "Operational Agility",
      desc: "Building organizations that adapt, pivot, and thrive in volatile economic environments.",
    },
  ];

  const stats = [
    { value: "$27B", label: "Saudi digital economy investment" },
    { value: "AED 300B", label: "UAE industrial GDP target by 2031" },
    { value: "$3.3T", label: "GCC investment pipeline" },
    { value: "19%", label: "Digital economy's target GDP contribution" },
  ];

  return (
    <ZigzagModule contentLeft={true}>
      {/* LEFT - Content */}
      <div>
        <SectionLabel>Key Themes</SectionLabel>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 800,
            color: "var(--white)",
            letterSpacing: "-1px",
            margin: "0 0 32px",
          }}
        >
          What Opex First Covers
        </h2>

        <div>
          {topics.map((topic) => (
            <TopicRow key={topic.num} topic={topic} />
          ))}
        </div>
      </div>

      {/* RIGHT - Stats Column */}
      <div>
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: "24px 0",
              borderBottom:
                i < stats.length - 1
                  ? "1px solid rgba(255,255,255,0.04)"
                  : "none",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 36,
                fontWeight: 800,
                color: VIOLET,
                margin: 0,
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 13,
                color: "#606060",
                marginTop: 8,
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </ZigzagModule>
  );
}

function TopicRow({ topic }: { topic: { num: string; title: string; desc: string } }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-start gap-4 transition-all"
      style={{
        padding: "16px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: isHovered ? `${VIOLET}05` : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 12,
          fontWeight: 700,
          color: VIOLET,
          minWidth: 24,
        }}
      >
        {topic.num}
      </span>
      <div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--white)",
            margin: 0,
          }}
        >
          {topic.title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 14,
            fontWeight: 300,
            color: "#606060",
            marginTop: 4,
            lineHeight: 1.5,
          }}
        >
          {topic.desc}
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// MODULE 4: FEATURED SPEAKERS
// =============================================================================

function Speakers() {
  const speakers = [
    {
      name: "Eng. AbdulRazzag AlAujan",
      role: "H.E. Advisor",
      org: "Ministry of Finance, Saudi Arabia",
    },
    {
      name: "Suvo Chatterjee",
      role: "Director Business Excellence & Transformation",
      org: "RAK Economic Zone",
    },
    {
      name: "Dr. Alia Alkaabi",
      role: "Director Supply Chain / EVP",
      org: "TAQA Transmission",
    },
    {
      name: "Mohammed Alamri",
      role: "GM Organizational Excellence",
      org: "Roads General Authority",
    },
    {
      name: "Oday Almajed",
      role: "AI & Data Analytics GM",
      org: "EXPRO",
    },
    {
      name: "Naresh Ranganathan",
      role: "VP of Cargo",
      org: "Velora",
    },
  ];

  return (
    <ZigzagModule contentLeft={false}>
      {/* LEFT - Speaker Photos Grid */}
      <div
        className="grid grid-cols-2 gap-2"
        style={{ alignSelf: "start" }}
      >
        {[
          "https://opexfirst.com/wp-content/uploads/2025/08/ENG-ABDULRAZZAG-ALAUJAN-2.png",
          "https://opexfirst.com/wp-content/uploads/2025/08/Untitled-1-04-1.png",
          "https://opexfirst.com/wp-content/uploads/2025/08/Untitled-1-06-1.png",
          "https://opexfirst.com/wp-content/uploads/2025/08/Mr_Oday_Amajid.png",
        ].map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt="Speaker"
            style={{
              width: "100%",
              aspectRatio: "1",
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
        ))}
      </div>

      {/* RIGHT - Content */}
      <div>
        <SectionLabel>Speakers & Advisors</SectionLabel>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 800,
            color: "var(--white)",
            letterSpacing: "-1px",
            margin: "0 0 12px",
          }}
        >
          The Leaders Driving Excellence
        </h2>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 16,
            color: "#808080",
            marginBottom: 28,
          }}
        >
          Opex First brings together government excellence advisors, corporate
          transformation leaders, and global technology pioneers.
        </p>

        <div>
          {speakers.map((speaker) => (
            <SpeakerRow key={speaker.name} speaker={speaker} />
          ))}
        </div>

        <Link
          href="/events/opex-first/speakers"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 24,
            fontFamily: "var(--font-outfit)",
            fontSize: 14,
            fontWeight: 500,
            color: VIOLET,
          }}
        >
          View All Speakers →
        </Link>
      </div>
    </ZigzagModule>
  );
}

function SpeakerRow({
  speaker,
}: {
  speaker: { name: string; role: string; org: string };
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="transition-all"
      style={{
        padding: "16px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: isHovered ? `${VIOLET}05` : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 15,
          fontWeight: 700,
          color: "var(--white)",
          margin: 0,
        }}
      >
        {speaker.name}
      </p>
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 13,
          color: "#707070",
          margin: "4px 0 0",
        }}
      >
        {speaker.role}{" "}
        <span style={{ color: VIOLET, fontWeight: 500 }}>{speaker.org}</span>
      </p>
    </div>
  );
}

// =============================================================================
// MODULE 5: THE EXPERIENCE
// =============================================================================

function Experience() {
  const formats = [
    {
      num: "01",
      title: "Keynotes & Leadership Panels",
      desc: "Strategic sessions with government excellence leaders, COOs, and transformation heads from NEOM, ADNOC, DP World, and Saudi ministries.",
    },
    {
      num: "02",
      title: "Hands-On Workshops",
      desc: "Applied sessions: Business Process Improvement with BPMN 2.0, Lean Six Sigma simulations, AI-powered process mining labs.",
    },
    {
      num: "03",
      title: "Opex Awards Ceremony",
      desc: "Celebrating excellence across 8 categories: Operational Excellence Leader, Business Transformation, Sustainability & ESG, Agentic AI Innovation, and more.",
    },
    {
      num: "04",
      title: "Curated 1-on-1 Meetings",
      desc: "Pre-matched meetings between enterprise excellence leaders and technology solution providers.",
    },
    {
      num: "05",
      title: "Live Case Studies",
      desc: "Real implementations from Saudi and UAE organizations — what worked, what failed, what they learned.",
    },
    {
      num: "06",
      title: "Networking & Gala Dinner",
      desc: "Structured networking sessions and an evening gala connecting the region's operational excellence community.",
    },
  ];

  return (
    <ZigzagModule contentLeft={true}>
      {/* LEFT - Content */}
      <div>
        <SectionLabel>The Experience</SectionLabel>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 800,
            color: "var(--white)",
            letterSpacing: "-1px",
            margin: "0 0 32px",
          }}
        >
          More Than a Conference
        </h2>

        <div className="flex flex-col gap-6">
          {formats.map((format) => (
            <ExperienceItem key={format.num} format={format} />
          ))}
        </div>
      </div>

      {/* RIGHT - Image */}
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://opexfirst.com/wp-content/uploads/2025/10/DSC08553.jpg"
          alt="Opex First Experience"
          style={{
            width: "100%",
            height: "100%",
            minHeight: 500,
            objectFit: "cover",
            borderRadius: 14,
          }}
        />
      </div>
    </ZigzagModule>
  );
}

function ExperienceItem({
  format,
}: {
  format: { num: string; title: string; desc: string };
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid rgba(124,58,237,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 12,
            fontWeight: 600,
            color: VIOLET,
          }}
        >
          {format.num}
        </span>
      </div>
      <div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--white)",
            margin: 0,
          }}
        >
          {format.title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 14,
            fontWeight: 300,
            color: "#707070",
            marginTop: 6,
            lineHeight: 1.6,
          }}
        >
          {format.desc}
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// MODULE 6: WHO SHOULD ATTEND
// =============================================================================

function Audience() {
  const roles = [
    "Chief Operating Officer",
    "VP/Director Operations",
    "Head of Business Excellence",
    "Head of Transformation",
    "Head of Process Improvement",
    "Head of Supply Chain",
    "Head of Procurement",
    "Director of Sustainability",
    "Head of Digital Transformation",
    "Quality & Compliance Director",
  ];

  const industries = [
    "Government & Public Sector",
    "Energy & Utilities",
    "Manufacturing",
    "Construction & Mega-Projects",
    "Banking & Financial Services",
    "Healthcare",
    "Tourism & Hospitality",
    "Retail & E-Commerce",
    "Transportation & Logistics",
    "Education",
  ];

  return (
    <ZigzagModule contentLeft={false}>
      {/* LEFT - Image with CTA */}
      <div style={{ position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://opexfirst.com/wp-content/uploads/2025/10/DSC08142.jpg"
          alt="Opex First Audience"
          style={{
            width: "100%",
            height: "100%",
            minHeight: 500,
            objectFit: "cover",
            borderRadius: 14,
          }}
        />
        <Link
          href="#register"
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            padding: "14px 0",
            borderRadius: 10,
            background: VIOLET,
            textAlign: "center",
            fontFamily: "var(--font-outfit)",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--white)",
          }}
        >
          Register for Next Edition →
        </Link>
      </div>

      {/* RIGHT - Content */}
      <div>
        <SectionLabel>Who Should Attend</SectionLabel>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 800,
            color: "var(--white)",
            letterSpacing: "-1px",
            margin: "0 0 12px",
          }}
        >
          Built for Excellence Leaders
        </h2>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 16,
            color: "#808080",
            marginBottom: 28,
          }}
        >
          Opex First is designed for the people responsible for making
          organizations work better — from process improvement to digital
          transformation to supply chain optimization.
        </p>

        <div
          className="audience-lists"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 10,
                fontWeight: 600,
                color: VIOLET,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Roles
            </span>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
              {roles.map((role) => (
                <li
                  key={role}
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: 14,
                    color: "#909090",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: VIOLET,
                      opacity: 0.5,
                    }}
                  />
                  {role}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 10,
                fontWeight: 600,
                color: VIOLET,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Industries
            </span>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
              {industries.map((ind) => (
                <li
                  key={ind}
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: 14,
                    color: "#909090",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: VIOLET,
                      opacity: 0.5,
                    }}
                  />
                  {ind}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 600px) {
            .audience-lists {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </ZigzagModule>
  );
}

// =============================================================================
// MODULE 7: SPONSORS
// =============================================================================

function Sponsors() {
  const tiers = [
    { name: "LEAD PARTNERS", sponsors: ["Celonis", "Bridge", "EY"] },
    { name: "GOLD", sponsors: ["Profit.co", "Botteq", "Cyborg", "Red Sand"] },
    { name: "ASSOCIATE", sponsors: ["ARIS", "SAP", "Blue Prism", "Moxo"] },
    { name: "CONSULTING", sponsors: ["Kafaa", "Minds Advisory", "Agile MENA"] },
    {
      name: "KNOWLEDGE",
      sponsors: ["Abu Dhabi University", "King Saud University", "ISRAR"],
    },
  ];

  const mediaPartners = [
    "Gulf Business",
    "Trade Arabia",
    "Tahawul Tech",
    "GEC News",
    "Industry Events",
    "Economy Middle East",
  ];

  return (
    <ZigzagModule contentLeft={true}>
      {/* LEFT - Content */}
      <div>
        <SectionLabel>Series Sponsors & Partners</SectionLabel>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 800,
            color: "var(--white)",
            letterSpacing: "-1px",
            margin: "0 0 32px",
          }}
        >
          Trusted by Industry Leaders
        </h2>

        {tiers.map((tier) => (
          <div key={tier.name} style={{ marginBottom: 24 }}>
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: VIOLET,
                marginBottom: 12,
              }}
            >
              {tier.name}
            </p>
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 14,
                color: "#606060",
              }}
            >
              {tier.sponsors.join(" · ")}
            </p>
          </div>
        ))}

        <Link
          href="/sponsors-and-partners"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 16,
            padding: "12px 24px",
            borderRadius: 10,
            border: `1px solid ${VIOLET}`,
            fontFamily: "var(--font-outfit)",
            fontSize: 14,
            fontWeight: 500,
            color: VIOLET,
          }}
        >
          Sponsor the Next Edition →
        </Link>
      </div>

      {/* RIGHT - Media Partners */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#505050",
            marginBottom: 20,
          }}
        >
          Media Partners
        </p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {mediaPartners.map((partner) => (
            <li
              key={partner}
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 13,
                color: "#404040",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.03)",
              }}
            >
              {partner}
            </li>
          ))}
        </ul>
      </div>
    </ZigzagModule>
  );
}

// =============================================================================
// MODULE 8: PHOTO GALLERY (Full bleed horizontal scroll)
// =============================================================================

function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const photos = [
    "https://opexfirst.com/wp-content/uploads/2025/10/DSC08180.jpg",
    "https://opexfirst.com/wp-content/uploads/2025/10/DSC08142.jpg",
    "https://opexfirst.com/wp-content/uploads/2025/10/DSC08203.jpg",
    "https://opexfirst.com/wp-content/uploads/2025/10/DSC08170.jpg",
    "https://opexfirst.com/wp-content/uploads/2025/10/DSC08553.jpg",
    "https://opexfirst.com/wp-content/uploads/2025/10/DSC08609.jpg",
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "#0E0E0E",
        padding: "clamp(80px, 10vw, 130px) 0",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ textAlign: "center", marginBottom: 48, padding: "0 24px" }}
      >
        <SectionLabel>From Previous Editions</SectionLabel>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 800,
            color: "var(--white)",
            letterSpacing: "-1px",
            marginTop: 16,
          }}
        >
          The Opex First Experience
        </h2>
      </motion.div>

      {/* Horizontal scroll container */}
      <div
        className="gallery-scroll"
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          padding: "0 24px",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {photos.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            style={{
              flexShrink: 0,
              scrollSnapAlign: "start",
            }}
          >
            <GalleryPhoto src={src} />
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .gallery-scroll::-webkit-scrollbar {
          display: none;
        }
        .gallery-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

function GalleryPhoto({ src }: { src: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        width: 360,
        height: 240,
        borderRadius: 12,
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Opex First Gallery"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: isHovered ? "scale(1.03)" : "scale(1)",
          filter: isHovered ? "brightness(1.1)" : "brightness(1)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}

// =============================================================================
// MODULE 9: AWARDS PREVIEW
// =============================================================================

function Awards() {
  const awards = [
    {
      num: "01",
      title: "Operational Excellence Leader",
      desc: "Outstanding achievements in implementing operational excellence programs.",
    },
    {
      num: "02",
      title: "Business Transformation Leader",
      desc: "Successful execution of transformative initiatives for breakthrough performance.",
    },
    {
      num: "03",
      title: "Sustainability & ESG Excellence",
      desc: "Integration of environmentally responsible practices with measurable outcomes.",
    },
    {
      num: "04",
      title: "Innovation in Process Optimization",
      desc: "Pioneering new methods, tools, or technologies to optimize processes.",
    },
    {
      num: "05",
      title: "Finance & Procurement Excellence",
      desc: "Streamlining financial processes for cost savings and efficiency.",
    },
    {
      num: "06",
      title: "Customer Experience Transformation",
      desc: "Exceptional improvement in customer-facing operations and service delivery.",
    },
    {
      num: "07",
      title: "Intelligent Automation Leader",
      desc: "Leading adoption of AI, RPA, and intelligent automation in operations.",
    },
    {
      num: "08",
      title: "Agentic AI & Transformation",
      desc: "Pioneering autonomous AI agents in business process execution.",
    },
  ];

  return (
    <ZigzagModule contentLeft={false}>
      {/* LEFT - Awards Card */}
      <div
        style={{
          background: `linear-gradient(180deg, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.02) 100%)`,
          border: "1px solid rgba(124,58,237,0.1)",
          borderRadius: 14,
          padding: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: 300,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 48,
            fontWeight: 800,
            color: "var(--white)",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          8 Award
          <br />
          Categories
        </p>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 14,
            color: "#808080",
            marginTop: 16,
          }}
        >
          Celebrating operational excellence across the GCC
        </p>
        <Link
          href="/events/opex-first/awards"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 24,
            padding: "12px 24px",
            borderRadius: 10,
            border: `1px solid ${VIOLET}`,
            fontFamily: "var(--font-outfit)",
            fontSize: 14,
            fontWeight: 500,
            color: VIOLET,
            width: "fit-content",
          }}
        >
          Nominate →
        </Link>
      </div>

      {/* RIGHT - Content */}
      <div>
        <SectionLabel>Opex Awards</SectionLabel>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 800,
            color: "var(--white)",
            letterSpacing: "-1px",
            margin: "0 0 32px",
          }}
        >
          Recognizing Excellence
        </h2>

        <div>
          {awards.map((award) => (
            <AwardRow key={award.num} award={award} />
          ))}
        </div>
      </div>
    </ZigzagModule>
  );
}

function AwardRow({
  award,
}: {
  award: { num: string; title: string; desc: string };
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-start gap-4 transition-all"
      style={{
        padding: "12px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: isHovered ? `${VIOLET}05` : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 12,
          fontWeight: 700,
          color: VIOLET,
          minWidth: 24,
        }}
      >
        {award.num}
      </span>
      <div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 15,
            fontWeight: 700,
            color: "var(--white)",
            margin: 0,
          }}
        >
          {award.title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 13,
            fontWeight: 300,
            color: "#606060",
            marginTop: 2,
          }}
        >
          {award.desc}
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// MODULE 10: CTA (Full bleed)
// =============================================================================

function CTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        background:
          "linear-gradient(180deg, #0E0E0E 0%, rgba(124,58,237,0.03) 50%, #0A0A0A 100%)",
        padding: "100px 24px",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <span
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: VIOLET,
          }}
        >
          Next Edition
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(36px, 5vw, 56px)",
            letterSpacing: "-2px",
            color: "var(--white)",
            lineHeight: 1.1,
            marginTop: 16,
          }}
        >
          Opex First is Expanding
        </h2>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 16,
            color: "#707070",
            marginTop: 20,
            lineHeight: 1.7,
          }}
        >
          After successful editions in Riyadh and Abu Dhabi, Opex First is
          expanding to Kuwait and Doha. Be part of the next chapter.
        </p>

        <div
          className="flex flex-wrap justify-center gap-3"
          style={{ marginTop: 36 }}
        >
          <Link
            href="#register"
            style={{
              padding: "14px 28px",
              borderRadius: 10,
              background: VIOLET,
              fontFamily: "var(--font-outfit)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--white)",
            }}
          >
            Get Notified →
          </Link>
          <Link
            href="/reports"
            style={{
              padding: "14px 28px",
              borderRadius: 10,
              border: `1px solid ${VIOLET}`,
              background: "transparent",
              fontFamily: "var(--font-outfit)",
              fontSize: 14,
              fontWeight: 500,
              color: VIOLET,
            }}
          >
            Download Post-Event Report
          </Link>
          <Link
            href="/sponsors-and-partners"
            style={{
              padding: "14px 28px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              fontFamily: "var(--font-outfit)",
              fontSize: 14,
              fontWeight: 500,
              color: "#808080",
            }}
          >
            Contact for Sponsorship
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// =============================================================================
// MODULE 11: REGISTRATION
// =============================================================================

function Registration() {
  return (
    <ZigzagModule contentLeft={true} id="register">
      {/* LEFT - Content */}
      <div>
        <SectionLabel>Register Your Interest</SectionLabel>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 800,
            color: "var(--white)",
            letterSpacing: "-1px",
            margin: "0 0 16px",
          }}
        >
          Stay Ahead of the Curve
        </h2>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 16,
            color: "#808080",
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          Be the first to know when the next Opex First edition is announced.
          Receive speaker lineups, early-bird registration, and exclusive
          content.
        </p>

        <div className="flex flex-col gap-3">
          <TrustPoint>Complimentary for qualified end-users</TrustPoint>
          <TrustPoint>Vendor/sponsor passes available</TrustPoint>
          <TrustPoint>Limited to 300 delegates per edition</TrustPoint>
        </div>
      </div>

      {/* RIGHT - Form */}
      <div>
        <RegistrationForm />
      </div>
    </ZigzagModule>
  );
}

function TrustPoint({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span style={{ color: VIOLET }}>✓</span>
      <span
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 14,
          color: "#909090",
        }}
      >
        {children}
      </span>
    </div>
  );
}

function RegistrationForm() {
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <UnderlineInput placeholder="First Name" />
      <UnderlineInput placeholder="Last Name" />
      <UnderlineInput placeholder="Work Email" type="email" />
      <UnderlineInput placeholder="Company" />
      <UnderlineInput placeholder="Job Title" />
      <button
        type="submit"
        style={{
          width: "100%",
          background: VIOLET,
          border: "none",
          borderRadius: 10,
          padding: "14px",
          fontFamily: "var(--font-outfit)",
          fontSize: 14,
          fontWeight: 600,
          color: "var(--white)",
          cursor: "pointer",
          marginTop: 24,
        }}
      >
        Register Interest →
      </button>
    </form>
  );
}

function UnderlineInput({
  placeholder,
  type = "text",
}: {
  placeholder: string;
  type?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${isFocused ? VIOLET : "rgba(255,255,255,0.1)"}`,
        padding: "16px 0",
        marginBottom: 20,
        fontFamily: "var(--font-outfit)",
        fontSize: 15,
        fontWeight: 400,
        color: "var(--white)",
        outline: "none",
        transition: "border-color 0.3s",
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

// =============================================================================
// MODULE 12: EXPLORE OTHER SERIES
// =============================================================================

function OtherSeries() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const series = [
    {
      title: "Cyber First",
      tagline: "Defending the Digital Frontier",
      color: "#01BBF5",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80",
      href: "/events/cyber-first",
    },
    {
      title: "OT Security First",
      tagline: "Protecting What Runs the World",
      color: "#D34B9A",
      image:
        "https://images.unsplash.com/photo-1518709414768-a88981a4515d?w=400&q=80",
      href: "/events/ot-security-first",
    },
    {
      title: "Data & AI First",
      tagline: "Intelligence Amplified",
      color: "#0F735E",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
      href: "/events/data-ai-first",
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "#0A0A0A",
        padding: "clamp(80px, 10vw, 130px) 24px",
      }}
    >
      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#E8651A",
            }}
          >
            From Events First Group
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 800,
              color: "var(--white)",
              marginTop: 12,
            }}
          >
            Explore Our Other Series
          </h2>
        </motion.div>

        <div
          className="other-series-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {series.map((s, i) => (
            <SeriesCard
              key={s.title}
              series={s}
              delay={i * 0.1}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .other-series-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function SeriesCard({
  series,
  delay,
  isInView,
}: {
  series: {
    title: string;
    tagline: string;
    color: string;
    image: string;
    href: string;
  };
  delay: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <Link
        href={series.href}
        style={{ display: "block" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            background: "#111111",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: isHovered ? `0 0 30px ${series.color}20` : "none",
            transition: "box-shadow 0.3s",
          }}
        >
          <div style={{ height: 3, background: series.color }} />
          <div style={{ height: 120, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={series.image}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.3)",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.4s",
              }}
            />
          </div>
          <div style={{ padding: 24 }}>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 700,
                color: "var(--white)",
                margin: 0,
              }}
            >
              {series.title}
            </h4>
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 13,
                color: "#606060",
                marginTop: 6,
              }}
            >
              {series.tagline}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// =============================================================================
// MODULE 13: NEWSLETTER
// =============================================================================
// MAIN PAGE
// =============================================================================

export default function OpexFirstPage() {
  return (
    <div style={{ background: "#0A0A0A" }}>
      <Hero />
      <Mission />
      <Editions />
      <Themes />
      <Speakers />
      <Experience />
      <Audience />
      <Sponsors />
      <Gallery />
      <Awards />
      <CTA />
      <Registration />
      <OtherSeries />
      <Footer />
    </div>
  );
}
