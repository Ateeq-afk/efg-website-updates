"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const OT_CRIMSON = "#D34B9A";
const OT_FIREBRICK = "#E86BB8";

// 8 real speakers with photos from otsecurityfirst.com
const speakers = [
  {
    id: 1,
    name: "Ali Al Kaf Alhashmi",
    title: "VP Cyber Security & Technology",
    company: "Mubadala",
    photo: "https://otsecurityfirst.com/wp-content/uploads/2026/01/Ali-Al-Kaf-Alhashmi.jpg",
  },
  {
    id: 2,
    name: "Shaytel Patel",
    title: "Group SVP Technology Audit",
    company: "DP World",
    photo: "https://otsecurityfirst.com/wp-content/uploads/2026/01/Shaytel-Patel.jpg",
  },
  {
    id: 3,
    name: "Ali AlQallaf",
    title: "Head of Cybersecurity Operations",
    company: "KNPC",
    photo: "https://otsecurityfirst.com/wp-content/uploads/2026/01/Ali-AlQallaf.jpg",
  },
  {
    id: 4,
    name: "Abdulhakeem Al Alawi",
    title: "Information Security Officer",
    company: "Oman LNG",
    photo: "https://otsecurityfirst.com/wp-content/uploads/2026/01/PHOTO-2026-01-25-11-24-22.jpg",
  },
  {
    id: 5,
    name: "Khaled Al Teneiji",
    title: "Cyber Security Head",
    company: "ENOC",
    photo: "https://otsecurityfirst.com/wp-content/uploads/2026/01/Khaled-Al-Teneiji-Image.jpg",
  },
  {
    id: 6,
    name: "Wissam Al-Nasairi",
    title: "OT Security EMEA Lead",
    company: "IBM Consulting",
    photo: "https://otsecurityfirst.com/wp-content/uploads/2026/01/Wissam-Al-Nasairi.jpg",
  },
  {
    id: 7,
    name: "Payal Sampat",
    title: "Cyber Security Officer",
    company: "Petrofac",
    photo: "https://otsecurityfirst.com/wp-content/uploads/2025/12/Payal-Sampat.jpg",
  },
  {
    id: 8,
    name: "Mohammed Shoukat Ali",
    title: "GM & Head Global Cybersecurity CoE",
    company: "Yokogawa",
    photo: "https://otsecurityfirst.com/wp-content/uploads/2026/01/Mohammed-Shoukat-Ali.jpg",
  },
];

export default function OTFeaturedSpeakers() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#0A0A0A",
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
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 48 }}
        >
          {/* Label */}
          <div className="flex items-center gap-3">
            <span style={{ width: 30, height: 1, background: OT_CRIMSON }} />
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: OT_CRIMSON,
              }}
            >
              Speakers & Advisors
            </span>
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
              margin: "20px 0 0",
            }}
          >
            The People Protecting Infrastructure
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 16,
              fontWeight: 300,
              color: "#808080",
              marginTop: 14,
              maxWidth: 500,
            }}
          >
            OT security leaders from the region's most critical energy and
            utilities organizations.
          </p>
        </motion.div>

        {/* Speakers Grid - 4 columns */}
        <div
          className="speakers-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
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
        @media (max-width: 480px) {
          .speakers-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * SpeakerCard — Individual speaker card with photo
 */
function SpeakerCard({ speaker }: { speaker: (typeof speakers)[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative transition-all"
      style={{
        background: "#141414",
        border: isHovered
          ? `1px solid ${OT_CRIMSON}40`
          : "1px solid rgba(255, 255, 255, 0.04)",
        borderRadius: 10,
        padding: 20,
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        transitionDuration: "0.4s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left edge bar on hover */}
      <div
        className="absolute left-0 top-3 bottom-3 transition-all"
        style={{
          width: 3,
          background: OT_CRIMSON,
          opacity: isHovered ? 1 : 0,
          borderRadius: 2,
          transitionDuration: "0.3s",
        }}
      />

      {/* Photo */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          overflow: "hidden",
          border: isHovered
            ? `2px solid ${OT_CRIMSON}80`
            : `2px solid ${OT_CRIMSON}25`,
          boxShadow: isHovered ? `0 0 20px ${OT_CRIMSON}25` : "none",
          marginBottom: 16,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={speaker.photo}
          alt={speaker.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 15,
          fontWeight: 700,
          color: "var(--white)",
          margin: 0,
        }}
      >
        {speaker.name}
      </h3>

      {/* Title */}
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 12,
          fontWeight: 400,
          color: "#707070",
          margin: "6px 0 0",
          lineHeight: 1.4,
        }}
      >
        {speaker.title}
      </p>

      {/* Company */}
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 11,
          fontWeight: 500,
          color: `${OT_CRIMSON}B3`,
          margin: "4px 0 0",
        }}
      >
        {speaker.company}
      </p>
    </div>
  );
}

/**
 * ViewAllLink — View all speakers link
 */
function ViewAllLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/events/ot-security-first/speakers"
      className="inline-flex items-center gap-2 transition-all"
      style={{
        fontFamily: "var(--font-outfit)",
        fontSize: 14,
        fontWeight: 500,
        color: isHovered ? OT_FIREBRICK : OT_CRIMSON,
        transitionDuration: "0.3s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>View All Speakers</span>
      <span
        style={{
          transform: isHovered ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.3s",
        }}
      >
        →
      </span>
    </Link>
  );
}
