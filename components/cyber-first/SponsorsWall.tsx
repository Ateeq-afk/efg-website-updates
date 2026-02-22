"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const CYBER_BLUE = "#01BBF5";

// 2026 Sponsors
const sponsors2026 = [
  "GOOGLE",
  "ANOMALI",
  "OPSWAT",
  "PENTERA",
  "HEREWEGO",
  "AMIVIZ",
  "TENABLE",
  "SECURONIX",
  "PARAMOUNT",
  "KRON",
  "APPKNOX",
  "FILIGAN",
  "CORELIGHT",
  "THREATLOCKER",
  "AKAMAI",
  "SONICWALL",
  "GENX",
  "SECUREB4",
  "BUREAU VERITAS",
  "CORTELION",
  "BITDEFENDER",
  "MANAGEENGINE",
  "BEACONRED",
  "DREAM",
];

// Past Series Sponsors
const pastSponsors = [
  "MICROSOFT",
  "PALO ALTO NETWORKS",
  "GOOGLE CLOUD",
  "KASPERSKY",
  "F5",
  "FORTINET",
  "CROWDSTRIKE",
  "CORELIGHT",
  "TRUSTWAVE",
  "GORILLA",
  "IMMERSIVE LABS",
  "INGRAM",
  "SECURITYSCORECARD",
  "CYBERTALENTS",
  "MANAGEENGINE",
  "AMIVIZ",
  "EXTRAHOP",
];

// Media Partners
const mediaPartners = [
  "DARK READING",
  "THE HACKER NEWS",
  "CSO ONLINE",
  "HELP NET SECURITY",
  "INFOSECURITY MAG",
  "SC MEDIA",
  "CYBER DEFENSE MAG",
  "INDUSTRIAL CYBER",
  "SECURITY ME",
  "INDUSTRY EVENTS",
  "CONTROL ENG",
  "CYBERSEC INSIDERS",
];

export default function SponsorsWall() {
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
              Series Sponsors
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
            Backed by the Industry's Best
          </h2>
        </motion.div>

        {/* 2026 Sponsors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#404040",
              marginBottom: 16,
            }}
          >
            2026 Sponsors
          </p>
          <div
            className="sponsors-grid-2026"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
            }}
          >
            {sponsors2026.map((sponsor, index) => (
              <motion.div
                key={sponsor}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + index * 0.02,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <SponsorCard name={sponsor} size="normal" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Past Sponsors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ marginTop: 48 }}
        >
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#353535",
              marginBottom: 16,
            }}
          >
            Past Series Sponsors
          </p>
          <div
            className="sponsors-grid-past"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 10,
            }}
          >
            {pastSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.9 + index * 0.02,
                }}
              >
                <SponsorCard name={sponsor} size="small" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Media Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          style={{ marginTop: 48 }}
        >
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#404040",
              marginBottom: 16,
            }}
          >
            Media Partners
          </p>
          <div
            className="media-partners-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 12,
            }}
          >
            {mediaPartners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 1.2 + index * 0.02,
                }}
              >
                <MediaPartnerCard name={partner} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: 48, textAlign: "center" }}
        >
          <SponsorCTA />
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .sponsors-grid-2026 {
            grid-template-columns: repeat(4, 1fr) !important;
          }
          .sponsors-grid-past {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .sponsors-grid-2026 {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .sponsors-grid-past {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .sponsors-grid-2026 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .sponsors-grid-past {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 1024px) {
          .media-partners-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .media-partners-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .media-partners-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * SponsorCard — Individual sponsor placeholder
 */
function SponsorCard({
  name,
  size,
}: {
  name: string;
  size: "normal" | "small";
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center justify-center transition-all duration-400"
      style={{
        background: "var(--black-card)",
        border: isHovered
          ? "1px solid rgba(1, 187, 245, 0.1)"
          : "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: size === "normal" ? 14 : 10,
        padding: size === "normal" ? "28px 24px" : "16px 20px",
        minHeight: size === "normal" ? 80 : 56,
        opacity: isHovered ? 0.85 : 0.4,
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        cursor: "default",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: size === "normal" ? 13 : 11,
          fontWeight: 700,
          letterSpacing: "1.5px",
          color: "rgba(255, 255, 255, 0.18)",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {name}
      </span>
    </div>
  );
}

/**
 * MediaPartnerCard — Smaller media partner card
 */
function MediaPartnerCard({ name }: { name: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center justify-center transition-all duration-300"
      style={{
        background: "#141414",
        border: "1px solid rgba(255, 255, 255, 0.03)",
        borderRadius: 10,
        padding: "16px 20px",
        minHeight: 48,
        opacity: isHovered ? 0.7 : 0.35,
        cursor: "default",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "1.5px",
          color: "#303030",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {name}
      </span>
    </div>
  );
}

/**
 * SponsorCTA — Become a sponsor button
 */
function SponsorCTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/sponsors"
      className="inline-flex items-center gap-2 transition-all duration-400"
      style={{
        padding: "14px 32px",
        borderRadius: 50,
        border: isHovered
          ? `1px solid ${CYBER_BLUE}`
          : "1px solid rgba(1, 187, 245, 0.25)",
        background: isHovered ? "rgba(1, 187, 245, 0.08)" : "transparent",
        fontFamily: "var(--font-outfit)",
        fontSize: 14,
        fontWeight: 500,
        color: CYBER_BLUE,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>Sponsor the Next Edition</span>
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
