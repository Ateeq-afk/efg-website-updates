"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const CYBER_BLUE = "#01BBF5";
const EASE = [0.16, 1, 0.3, 1] as const;

// Speaker data with portrait images
const speakers = [
  {
    id: 1,
    name: "H.E. Dr. Mohamed Al Kuwaiti",
    title: "Head of Cybersecurity",
    organization: "UAE Government",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    id: 2,
    name: "Sara Al Hosani",
    title: "Director Cyber Threat Intelligence",
    organization: "Department of Government Enablement",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    id: 3,
    name: "Hussain Al Khalsan",
    title: "CISO",
    organization: "Zand Bank",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    id: 4,
    name: "Bernard Assaf",
    title: "Regional CISO",
    organization: "Airbus",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    id: 5,
    name: "James Wiles",
    title: "Head of Cyber Security MEA",
    organization: "Cigna Healthcare",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  },
  {
    id: 6,
    name: "Prof. Khalid Al-Begain",
    title: "President",
    organization: "Kuwait College of Science & Technology",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    id: 7,
    name: "Mohamed Rushdhi",
    title: "Head of Information Security",
    organization: "Industrial Bank of Kuwait",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80",
  },
  {
    id: 8,
    name: "Abdulwahab Algamhi",
    title: "Senior Director Information Security",
    organization: "Miral",
    image: "https://images.unsplash.com/photo-1580518337843-f959e992563b?w=400&q=80",
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
        padding: "clamp(48px, 6vw, 80px) 0",
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
          transition={{ duration: 0.7, ease: EASE }}
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
              Speakers
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
            The Leaders Setting the Agenda
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
              margin: "14px auto 0",
            }}
          >
            Government heads, enterprise CISOs, and global security architects
            — the people who don&rsquo;t just attend conferences, they define them.
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
                ease: EASE,
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
          transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
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
 * SpeakerCard — Premium speaker card with photo
 */
function SpeakerCard({
  speaker,
}: {
  speaker: (typeof speakers)[0];
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="transition-all"
      style={{
        background: "#141414",
        border: `1px solid ${isHovered ? "rgba(1, 187, 245, 0.1)" : "rgba(255, 255, 255, 0.05)"}`,
        borderRadius: 16,
        overflow: "hidden",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered ? "0 12px 40px rgba(0, 0, 0, 0.3)" : "none",
        transitionDuration: "0.5s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "1 / 1" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={speaker.image}
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
            background: `linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.4) 40%, transparent 70%)`,
          }}
        />

        {/* Blue accent line at bottom on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-opacity"
          style={{
            height: 2,
            background: CYBER_BLUE,
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
      href="/speakers"
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
