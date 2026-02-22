"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const CYBER_BLUE = "#01BBF5";

// Speaker data
const speakers = [
  {
    id: 1,
    name: "H.E. Dr. Mohamed Al Kuwaiti",
    title: "Head of Cybersecurity",
    organization: "UAE Government",
    initials: "MA",
  },
  {
    id: 2,
    name: "Sara Al Hosani",
    title: "Director Cyber Threat Intelligence",
    organization: "Department of Government Enablement",
    initials: "SA",
  },
  {
    id: 3,
    name: "Hussain Al Khalsan",
    title: "CISO",
    organization: "Zand Bank",
    initials: "HA",
  },
  {
    id: 4,
    name: "Bernard Assaf",
    title: "Regional CISO",
    organization: "Airbus",
    initials: "BA",
  },
  {
    id: 5,
    name: "James Wiles",
    title: "Head of Cyber Security MEA",
    organization: "Cigna Healthcare",
    initials: "JW",
  },
  {
    id: 6,
    name: "Prof. Khalid Al-Begain",
    title: "President",
    organization: "Kuwait College of Science & Technology",
    initials: "KA",
  },
  {
    id: 7,
    name: "Mohamed Rushdhi",
    title: "Head of Information Security",
    organization: "Industrial Bank of Kuwait",
    initials: "MR",
  },
  {
    id: 8,
    name: "Abdulwahab Algamhi",
    title: "Senior Director Information Security",
    organization: "Miral",
    initials: "AA",
  },
];

export default function FeaturedSpeakers() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--black-light)",
        padding: "clamp(80px, 10vw, 130px) 0",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3">
            <span style={{ width: 30, height: 1, background: CYBER_BLUE }} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: CYBER_BLUE,
                fontFamily: "var(--font-outfit)",
              }}
            >
              Speakers & Advisors
            </span>
            <span style={{ width: 30, height: 1, background: CYBER_BLUE }} />
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(30px, 3.5vw, 48px)",
              letterSpacing: "-1.5px",
              color: "var(--white)",
              lineHeight: 1.1,
              margin: "16px 0 0",
            }}
          >
            Voices That Shape Cybersecurity
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 16,
              color: "#808080",
              lineHeight: 1.6,
              maxWidth: 480,
              margin: "14px auto 0",
            }}
          >
            CISOs, government cyber leaders, and security innovators from
            across the GCC and beyond.
          </p>
        </motion.div>

        {/* Speakers Grid */}
        <div
          className="speakers-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <SpeakerCard speaker={speaker} />
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
          style={{ marginTop: 32 }}
        >
          <ViewAllLink />
        </motion.div>
      </div>

      <style jsx global>{`
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
      `}</style>
    </section>
  );
}

/**
 * SpeakerCard — Individual speaker card
 */
function SpeakerCard({
  speaker,
}: {
  speaker: (typeof speakers)[0];
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="transition-all duration-400"
      style={{
        background: "#141414",
        border: `1px solid ${isHovered ? "rgba(1, 187, 245, 0.1)" : "rgba(255, 255, 255, 0.05)"}`,
        borderRadius: 16,
        overflow: "hidden",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered ? "0 12px 40px rgba(0, 0, 0, 0.2)" : "none",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo Placeholder */}
      <div
        className="relative flex items-center justify-center"
        style={{
          aspectRatio: "1 / 1",
          background: "#1A1A1A",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 800,
            color: `rgba(1, 187, 245, 0.15)`,
          }}
        >
          {speaker.initials}
        </span>

        {/* Blue overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `rgba(1, 187, 245, 0.05)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: 20 }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--white)",
            letterSpacing: "-0.2px",
            margin: 0,
          }}
        >
          {speaker.name}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 13.5,
            fontWeight: 400,
            color: "#707070",
            lineHeight: 1.4,
            marginTop: 4,
          }}
        >
          {speaker.title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 13.5,
            fontWeight: 500,
            color: `rgba(1, 187, 245, 0.7)`,
            marginTop: 4,
          }}
        >
          {speaker.organization}
        </p>
      </div>
    </div>
  );
}

/**
 * ViewAllLink — Link to full speakers page
 */
function ViewAllLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/events/cyber-first/speakers"
      className="inline-flex items-center gap-1.5 transition-colors"
      style={{
        fontFamily: "var(--font-outfit)",
        fontSize: 14,
        fontWeight: 500,
        color: CYBER_BLUE,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>View All Speakers</span>
      <span
        className="transition-transform duration-300"
        style={{
          transform: isHovered ? "translateX(4px)" : "translateX(0)",
        }}
      >
        →
      </span>
    </Link>
  );
}
