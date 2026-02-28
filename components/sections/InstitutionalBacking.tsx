"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const S3 = "https://efg-final.s3.eu-north-1.amazonaws.com";
const LOGOS_PATH = `${S3}/logos%20-%20govt%20-%20homepage`;

// Government and institutional partners
const institutions = [
  {
    name: "UAE Cyber Security Council",
    logo: `${LOGOS_PATH}/CYBER-SECURITY-COUNCIL-LOGO-1-1-1024x274.png`,
    width: 140,
  },
  {
    name: "Kuwait NCSC",
    logo: `${LOGOS_PATH}/ncsc-kuwait.png`,
    width: 100,
  },
  {
    name: "Central Agency Kuwait",
    logo: `${LOGOS_PATH}/central-agency-kuwait.png`,
    width: 90,
  },
  {
    name: "Ministry of National Guard",
    logo: `${LOGOS_PATH}/ministry%20of%20national%20guard.png`,
    width: 80,
  },
  {
    name: "Cyber 71",
    logo: `${LOGOS_PATH}/cyber-71-logo.png`,
    width: 70,
  },
  {
    name: "CAFA",
    logo: `${LOGOS_PATH}/cafa.png`,
    width: 70,
  },
  {
    name: "Women in Cybersecurity",
    logo: `${LOGOS_PATH}/woman-cybersecurity.png`,
    width: 90,
  },
  {
    name: "ICP",
    logo: `${LOGOS_PATH}/icp.jpeg`,
    width: 60,
  },
];

export default function InstitutionalBacking() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(to bottom, var(--black) 0%, #0a0a0a 100%)",
        padding: "clamp(40px, 5vw, 60px) 0",
        borderTop: "1px solid rgba(255, 255, 255, 0.03)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: "center",
            marginBottom: "clamp(24px, 3vw, 36px)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.35)",
            }}
          >
            Trusted by Government & Industry Leaders
          </span>
        </motion.div>

        {/* Logo Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(24px, 4vw, 48px)",
          }}
        >
          {institutions.map((institution, index) => (
            <motion.div
              key={institution.name}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={institution.logo}
                alt={institution.name}
                title={institution.name}
                style={{
                  width: institution.width,
                  height: "auto",
                  maxHeight: 50,
                  objectFit: "contain",
                  filter: "brightness(0.7) grayscale(0.3)",
                  opacity: 0.7,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "brightness(1) grayscale(0)";
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "brightness(0.7) grayscale(0.3)";
                  e.currentTarget.style.opacity = "0.7";
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
