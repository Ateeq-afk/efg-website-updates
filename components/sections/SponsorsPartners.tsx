"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────────────────────────────────────
// SPONSOR LOGOS — 80 logos from S3
// ─────────────────────────────────────────────────────────────────────────────

const LOGOS: { src: string; name: string }[] = [
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/abu-dhabi-university.png", name: "Abu Dhabi University" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Acronis.png", name: "Acronis" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/adgm-academy.png", name: "ADGM Academy" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/advenica.png", name: "Advenica" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/agile.png", name: "Agile" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/AIQS.png", name: "AIQS" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Akamai.png", name: "Akamai" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/AmiViz.png", name: "AmiViz" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Anomali.png", name: "Anomali" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/appknox.png", name: "Appknox" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/aris.png", name: "ARIS" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/beacon-red.png", name: "Beacon Red" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/bitdefender.png", name: "Bitdefender" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/BOT-teq.png", name: "BOT-teq" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/bureau-veritas.png", name: "Bureau Veritas" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Celonis.png", name: "Celonis" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/CEREBRA.png", name: "Cerebra" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Claroty.png", name: "Claroty" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/corelight.png", name: "Corelight" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/cortelion.png", name: "Cortelion" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/CPX.png", name: "CPX" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/cyber-shield.png", name: "Cyber Shield" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/cyber-talents.png", name: "CyberTalents" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Cybere71.png", name: "Cyber E71" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/cyberknight.png", name: "CyberKnight" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/cyberwise.png", name: "Cyberwise" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Cyborg-automation-hub.png", name: "Cyborg Automation Hub" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Deepinfo.png", name: "Deepinfo" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Dragos.png", name: "Dragos" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/DREAM.png", name: "DREAM" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/DTS-solutions.png", name: "DTS Solutions" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/edge-group.png", name: "Edge Group" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/EY.png", name: "EY" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/filigran.png", name: "Filigran" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/fortinet.png", name: "Fortinet" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/GBM.png", name: "GBM" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Gen-x-systems.png", name: "Gen-X Systems" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Gorilla.png", name: "Gorilla" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Group-IB.png", name: "Group-IB" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/gtb-technologies.png", name: "GTB Technologies" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/hackmanac.png", name: "Hackmanac" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/hwg-here-we-go.png", name: "HWG" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/isaca-uae-chapter.png", name: "ISACA UAE Chapter" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/ISRAR.png", name: "ISRAR" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/KAfaa.png", name: "KAfaa" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/kaspersky.png", name: "Kaspersky" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/keysight-technologies.png", name: "Keysight Technologies" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/kron-technologies.png", name: "Kron Technologies" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/ManageEngine.png", name: "ManageEngine" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/MCS.png", name: "MCS" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/microsec.png", name: "Microsec" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/minds-advisory.png", name: "Minds Advisory" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/moxo.png", name: "Moxo" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/nozomi-networks.png", name: "Nozomi Networks" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/OPSWAT-logo.png", name: "OPSWAT" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/ot-security-professionals.png", name: "OT Security Professionals" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/paloalto.png", name: "Palo Alto Networks" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Paramount.png", name: "Paramount" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/PENTERA.png", name: "Pentera" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/profit.co.png", name: "Profit.co" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/redsand.png", name: "Red Sand" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/RICS.png", name: "RICS" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/sahara-net.png", name: "Sahara Net" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/sap-signavio.png", name: "SAP Signavio" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/sechard.png", name: "Sechard" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/seclab.png", name: "SecLab" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/secureb4.png", name: "SecureB4" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/secureworks.png", name: "Secureworks" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/securonix-logo.png", name: "Securonix" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/sentinelone.png", name: "SentinelOne" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/sis.png", name: "SIS" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Sonicwall.png", name: "SonicWall" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/SS%26C.png", name: "SS&C" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Tenable-logo.png", name: "Tenable" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/threatlocker.png", name: "ThreatLocker" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/VDITS.png", name: "VDITS" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Wallix.png", name: "Wallix" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Xage.png", name: "Xage" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/XONA.png", name: "XONA" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/YOKOGAWA.png", name: "Yokogawa" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/EC-Council.png", name: "EC-Council" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/GAFAI.png", name: "GAFAI" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Google-Cloud-Security.png", name: "Google Cloud Security" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/IPC.png", name: "IPC" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/UAE-Cyber-Security-Council.png", name: "UAE Cyber Security Council" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Control-Engineering.png", name: "Control Engineering" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Women-in-Cybersecurity.png", name: "Women in Cybersecurity" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Zanda.png", name: "Zanda" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/CSO-Online.png", name: "CSO Online" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Cyber-Defense-Magazi.png", name: "Cyber Defense Magazine" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Cybersecurity-Insiders.png", name: "Cybersecurity Insiders" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Dark-Reading.png", name: "Dark Reading" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Help-Net-Security.png", name: "Help Net Security" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Industrial-Cyber.png", name: "Industrial Cyber" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Industry-Events.png", name: "Industry Events" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Infosecurity-Magazine.png", name: "Infosecurity Magazine" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/SC-Media.png", name: "SC Media" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/Security-Middle-East.png", name: "Security Middle East" },
  { src: "https://efg-final.s3.eu-north-1.amazonaws.com/sponsors-logo/The-Hacker-News.jpg", name: "The Hacker News" },
];

// Split into 3 rows
const ROW_1 = LOGOS.slice(0, 33);
const ROW_2 = LOGOS.slice(33, 66);
const ROW_3 = LOGOS.slice(66);

// ─────────────────────────────────────────────────────────────────────────────
// MARQUEE ROW
// ─────────────────────────────────────────────────────────────────────────────

function MarqueeRow({
  logos,
  direction = "left",
  duration = 60,
}: {
  logos: { src: string; name: string }[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const animClass =
    direction === "left" ? "marquee-scroll-left" : "marquee-scroll-right";

  return (
    <div
      className="marquee-row"
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      {/* Fade edges */}
      <div className="marquee-fade-left" />
      <div className="marquee-fade-right" />

      <div
        className={animClass}
        style={{
          display: "flex",
          gap: 16,
          width: "max-content",
          animationDuration: `${duration}s`,
        }}
      >
        {/* Original + duplicate for seamless loop */}
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="sponsor-logo-card"
            style={{
              flexShrink: 0,
              width: 160,
              height: 80,
              borderRadius: 12,
              border: "none",
              background: "rgba(255,255,255,0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 14px",
              transition: "all 0.3s ease",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              loading="lazy"
              style={{
                maxWidth: "90%",
                maxHeight: "85%",
                objectFit: "contain",
                transition: "transform 0.3s ease",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function SponsorsPartners() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--black-light)",
        padding: "clamp(80px, 10vw, 140px) 0 clamp(60px, 8vw, 100px)",
        overflow: "hidden",
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div
            className="flex items-center justify-center gap-3"
            style={{ marginBottom: 16 }}
          >
            <span
              style={{ width: 30, height: 1, background: "var(--orange)" }}
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
              Partners & Sponsors
            </span>
            <span
              style={{ width: 30, height: 1, background: "var(--orange)" }}
            />
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-1.5px",
              color: "var(--white)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            The Companies Powering Our Events
          </h2>

          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 16,
              color: "#808080",
              lineHeight: 1.6,
              maxWidth: 580,
              margin: "14px auto 0",
            }}
          >
            From global cybersecurity leaders to regional technology pioneers —
            the organizations that partner with EFG reach the GCC&apos;s most
            influential decision-makers.
          </p>
        </motion.div>
      </div>

      {/* ── MARQUEE ROWS — full-bleed ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <MarqueeRow logos={ROW_1} direction="left" duration={55} />
        <MarqueeRow logos={ROW_2} direction="right" duration={65} />
        <MarqueeRow logos={ROW_3} direction="left" duration={50} />
      </motion.div>

      {/* ── CTA ── */}
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          style={{ marginTop: 48, textAlign: "center" }}
        >
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 16,
              fontWeight: 400,
              color: "#606060",
              marginBottom: 20,
            }}
          >
            Your brand belongs here.
          </p>
          <Link
            href="/sponsors-and-partners"
            className="sponsor-cta-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 32px",
              borderRadius: 50,
              border: "1px solid rgba(255, 255, 255, 0.15)",
              background: "transparent",
              fontFamily: "var(--font-outfit)",
              fontSize: 14.5,
              fontWeight: 500,
              color: "white",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
          >
            Become a Partner
            <span style={{ transition: "transform 0.3s ease" }}>→</span>
          </Link>
        </motion.div>
      </div>

      {/* ── STYLES ── */}
      <style jsx global>{`
        /* Marquee scroll animations */
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .marquee-scroll-left {
          animation: marqueeLeft linear infinite;
        }
        .marquee-scroll-right {
          animation: marqueeRight linear infinite;
        }

        /* Pause on hover */
        .marquee-row:hover .marquee-scroll-left,
        .marquee-row:hover .marquee-scroll-right {
          animation-play-state: paused;
        }

        /* Logo card hover */
        .sponsor-logo-card:hover {
          box-shadow: 0 4px 20px rgba(232, 101, 26, 0.2);
          transform: scale(1.05);
        }
        .sponsor-logo-card:hover img {
          transform: scale(1.05);
        }

        /* Fade edges */
        .marquee-row {
          position: relative;
        }
        .marquee-fade-left,
        .marquee-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: clamp(40px, 6vw, 80px);
          z-index: 2;
          pointer-events: none;
        }
        .marquee-fade-left {
          left: 0;
          background: linear-gradient(
            to right,
            var(--black-light),
            transparent
          );
        }
        .marquee-fade-right {
          right: 0;
          background: linear-gradient(
            to left,
            var(--black-light),
            transparent
          );
        }

        /* CTA hover */
        .sponsor-cta-link:hover {
          border-color: #e8651a !important;
          background: rgba(232, 101, 26, 0.08) !important;
        }
        .sponsor-cta-link:hover span {
          transform: translateX(4px);
        }

        /* Responsive logo cards */
        @media (max-width: 768px) {
          .sponsor-logo-card {
            width: 130px !important;
            height: 65px !important;
            padding: 10px 16px !important;
          }
        }
        @media (max-width: 480px) {
          .sponsor-logo-card {
            width: 110px !important;
            height: 56px !important;
            padding: 8px 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
