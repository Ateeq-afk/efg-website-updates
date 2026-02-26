"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DotMatrixGrid } from "@/components/effects";
import { EMERALD, EMERALD_BRIGHT, EASE, WIDE } from "./constants";

// Placeholder speakers — replace with real data when confirmed
const speakers = [
  {
    id: 1,
    name: "Dr. Mohamed Al-Kuwaiti",
    title: "Head of Cyber Security",
    company: "UAE Government",
    photo:
      "https://efg-final.s3.eu-north-1.amazonaws.com/Speakers-photos/OT-Security-First/dr-mohamed-hamad-al-kuwaiti.jpg",
  },
  {
    id: 2,
    name: "Sara Al Hosani",
    title: "Cybersecurity Expert",
    company: "ADNOC",
    photo:
      "https://efg-final.s3.eu-north-1.amazonaws.com/Speakers-photos/Cyber-First-uae/Sara-Al-Hosani.jpg",
  },
  {
    id: 3,
    name: "Ali Al Kaf Alhashmi",
    title: "VP Cyber Security & Technology",
    company: "Mubadala",
    photo:
      "https://efg-final.s3.eu-north-1.amazonaws.com/Speakers-photos/OT-Security-First/Ali-Al-Kaf-Alhashmi.png",
  },
  {
    id: 4,
    name: "Bernard Assaf",
    title: "Security Leader",
    company: "Enterprise",
    photo:
      "https://efg-final.s3.eu-north-1.amazonaws.com/Speakers-photos/Cyber-First-uae/Bernard-Assaf.png",
  },
  {
    id: 5,
    name: "Hussain Al Khalsan",
    title: "Cybersecurity Director",
    company: "Government",
    photo:
      "https://efg-final.s3.eu-north-1.amazonaws.com/Speakers-photos/Cyber-First-uae/Hussain-Al-Khalsan.jpg",
  },
  {
    id: 6,
    name: "Shaytel Patel",
    title: "Group SVP Technology Audit",
    company: "DP World",
    photo:
      "https://efg-final.s3.eu-north-1.amazonaws.com/Speakers-photos/OT-Security-First/Shaytel-Patel.jpg",
  },
  {
    id: 7,
    name: "James Wiles",
    title: "Security Strategist",
    company: "Enterprise",
    photo:
      "https://efg-final.s3.eu-north-1.amazonaws.com/Speakers-photos/Cyber-First-uae/James-Wiles.jpg",
  },
  {
    id: 8,
    name: "Toufeeq Ahmed",
    title: "Security Architecture Lead",
    company: "Enterprise",
    photo:
      "https://efg-final.s3.eu-north-1.amazonaws.com/Speakers-photos/Cyber-First-uae/Toufeeq-Ahmed.jpg",
  },
];

export default function DASpeakers() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "#0A0A0A",
        padding: "clamp(36px, 5vw, 56px) 0",
      }}
    >
      {/* Atmospheric gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 50% at 50% 30%, rgba(15,115,94,0.035) 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 40% at 80% 70%, rgba(20,168,130,0.02) 0%, transparent 70%)`,
        }}
      />

      <DotMatrixGrid color={EMERALD} opacity={0.015} spacing={30} />

      <div
        style={{
          maxWidth: WIDE + 200,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div className="flex items-center justify-center gap-3">
            <span style={{ width: 30, height: 1, background: EMERALD }} />
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: EMERALD,
              }}
            >
              Speakers
            </span>
            <span style={{ width: 30, height: 1, background: EMERALD }} />
          </div>

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
            Who&rsquo;s Speaking
          </h2>

          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 16,
              color: "#707070",
              lineHeight: 1.6,
              maxWidth: 480,
              margin: "14px auto 0",
            }}
          >
            AI leaders, Chief Data Officers, and enterprise architects from
            across the Gulf region.
          </p>
        </motion.div>

        {/* Speakers Grid */}
        <div
          className="da-speakers-grid"
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
                ease: EASE,
              }}
            >
              <SpeakerCard speaker={speaker} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .da-speakers-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .da-speakers-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

function SpeakerCard({ speaker }: { speaker: (typeof speakers)[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative transition-all overflow-hidden"
      style={{
        background: "#141414",
        border: `1px solid ${isHovered ? `${EMERALD}25` : "rgba(255, 255, 255, 0.05)"}`,
        borderRadius: 12,
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isHovered
          ? `0 16px 48px rgba(0,0,0,0.3), 0 0 30px ${EMERALD}08`
          : "none",
        transitionDuration: "0.5s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left edge bar on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 transition-all"
        style={{
          width: 3,
          background: EMERALD_BRIGHT,
          opacity: isHovered ? 1 : 0,
          transitionDuration: "0.3s",
        }}
      />

      {/* Portrait Photo */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "1 / 1" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={speaker.photo}
          alt={speaker.name}
          className="w-full h-full object-cover"
          style={{
            filter: isHovered
              ? "brightness(0.9) saturate(1)"
              : "brightness(0.7) saturate(0)",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.4) 40%, transparent 70%)",
          }}
        />

        {/* Emerald accent line at bottom on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-opacity"
          style={{
            height: 2,
            background: EMERALD_BRIGHT,
            opacity: isHovered ? 0.8 : 0,
            transitionDuration: "0.4s",
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: "16px 20px 20px" }}>
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
            fontSize: 13,
            fontWeight: 400,
            color: "#606060",
            lineHeight: 1.4,
            marginTop: 4,
          }}
        >
          {speaker.title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 13,
            fontWeight: 500,
            color: `${EMERALD_BRIGHT}B3`,
            marginTop: 4,
          }}
        >
          {speaker.company}
        </p>
      </div>
    </div>
  );
}
