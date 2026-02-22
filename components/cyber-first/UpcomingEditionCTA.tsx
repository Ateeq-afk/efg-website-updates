"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const CYBER_BLUE = "#01BBF5";

// Next edition data
const nextEdition = {
  name: "Cyber First Kuwait",
  edition: "3rd Edition",
  date: new Date("2026-04-21T09:00:00"),
  dateString: "April 21, 2026",
  city: "Kuwait City",
  venue: "Radisson Blu",
};

export default function UpcomingEditionCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [daysUntil, setDaysUntil] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const now = new Date();
      const diff = nextEdition.date.getTime() - now.getTime();
      const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
      setDaysUntil(days);
    };

    calculateDays();
    const timer = setInterval(calculateDays, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: `linear-gradient(135deg, #0A0A0A 0%, rgba(1, 187, 245, 0.03) 50%, #0A0A0A 100%)`,
        padding: "clamp(80px, 12vw, 140px) 0",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        {/* Badge */}
        <span
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: CYBER_BLUE,
          }}
        >
          Next Edition
        </span>

        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(36px, 5vw, 64px)",
            letterSpacing: "-2px",
            color: "var(--white)",
            lineHeight: 1.1,
            margin: "16px 0 0",
          }}
        >
          {nextEdition.name}
        </h2>

        {/* Details Row */}
        <div
          className="flex flex-wrap items-center justify-center gap-2"
          style={{ marginTop: 16 }}
        >
          {[
            nextEdition.edition,
            nextEdition.dateString,
            nextEdition.city,
            nextEdition.venue,
          ].map((item, index, arr) => (
            <span key={item} className="flex items-center gap-2">
              <span
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#707070",
                }}
              >
                {item}
              </span>
              {index < arr.length - 1 && (
                <span style={{ color: "#404040" }}>·</span>
              )}
            </span>
          ))}
        </div>

        {/* Countdown */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 26,
            fontWeight: 800,
            color: CYBER_BLUE,
            marginTop: 20,
          }}
        >
          IN {daysUntil} DAYS
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3"
          style={{ marginTop: 28 }}
        >
          <CTAButton
            href="/events/cyber-first/kuwait/register"
            label="Register Now"
            variant="solid"
          />
          <CTAButton
            href="/events/cyber-first/kuwait/brochure"
            label="Download Brochure"
            variant="ghost-blue"
          />
          <CTAButton
            href="/sponsors/contact"
            label="Contact for Sponsorship"
            variant="ghost-white"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * CTAButton — Various button styles
 */
function CTAButton({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "solid" | "ghost-blue" | "ghost-white";
}) {
  const [isHovered, setIsHovered] = useState(false);

  const getStyles = () => {
    switch (variant) {
      case "solid":
        return {
          background: isHovered ? "#33CCFF" : CYBER_BLUE,
          border: "none",
          color: "#0A0A0A",
        };
      case "ghost-blue":
        return {
          background: isHovered ? "rgba(1, 187, 245, 0.08)" : "transparent",
          border: `1px solid ${isHovered ? CYBER_BLUE : "rgba(1, 187, 245, 0.25)"}`,
          color: CYBER_BLUE,
        };
      case "ghost-white":
        return {
          background: isHovered ? "rgba(255, 255, 255, 0.05)" : "transparent",
          border: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.15)"}`,
          color: "var(--white)",
        };
    }
  };

  const styles = getStyles();

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 transition-all duration-300"
      style={{
        padding: "14px 28px",
        borderRadius: 50,
        fontFamily: "var(--font-outfit)",
        fontSize: 15,
        fontWeight: 600,
        ...styles,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{label}</span>
      {variant === "solid" && <span>→</span>}
    </Link>
  );
}
