"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const OT_CRIMSON = "#D34B9A";
const OT_FIREBRICK = "#E86BB8";
const EASE = [0.16, 1, 0.3, 1] as const;

// Trust points
const trustPoints = [
  "34 expert speakers confirmed",
  "150+ security leaders attended",
  "Expanding to 4 GCC cities",
];

// Industry options
const industries = [
  "Oil & Gas",
  "Power & Utilities",
  "Manufacturing",
  "Petrochemicals",
  "Water & Wastewater",
  "Transportation",
  "Mining",
  "Other",
];

export default function OTUpcomingEditionCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section
      id="register"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "var(--black)",
        padding: "clamp(48px, 6vw, 80px) 0",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, ${OT_CRIMSON} 25%, transparent 25%),
            linear-gradient(-45deg, ${OT_CRIMSON} 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, ${OT_CRIMSON} 75%),
            linear-gradient(-45deg, transparent 75%, ${OT_CRIMSON} 75%)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
        }}
      />

      <div
        className="relative z-10"
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
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div className="flex items-center justify-center gap-3">
            <span style={{ width: 30, height: 2, background: OT_CRIMSON }} />
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: OT_FIREBRICK,
              }}
            >
              Next Edition
            </span>
            <span style={{ width: 30, height: 2, background: OT_CRIMSON }} />
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 56px)",
              letterSpacing: "-2px",
              color: "var(--white)",
              lineHeight: 1.1,
              margin: "20px 0 0",
            }}
          >
            Abu Dhabi{" "}
            <span style={{ color: OT_FIREBRICK }}>2026</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 16,
              fontWeight: 300,
              color: "#808080",
              marginTop: 12,
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            The second edition of OT Security First is coming to the UAE capital.
            Date and venue to be announced.
          </p>
        </motion.div>

        {/* Two-column layout: Info + Form */}
        <div
          className="ot-cta-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* LEFT — Edition info + trust points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            {/* Info cards */}
            <div className="flex flex-wrap gap-3" style={{ marginBottom: 28 }}>
              <InfoCard label="Location" value="Abu Dhabi, UAE" />
              <InfoCard label="Date" value="Coming Soon" />
              <InfoCard label="Format" value="In-Person" />
            </div>

            {/* Trust points */}
            <div className="flex flex-col gap-3" style={{ marginBottom: 28 }}>
              {trustPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                  }
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: EASE }}
                  className="flex items-center gap-3"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={OT_CRIMSON}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span
                    style={{
                      fontFamily: "var(--font-outfit)",
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#808080",
                    }}
                  >
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Sponsor CTA */}
            <SponsorButton />
          </motion.div>

          {/* RIGHT — Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  style={{
                    background: "var(--black-card)",
                    border: "1px solid rgba(255, 255, 255, 0.04)",
                    borderRadius: 10,
                    padding: "32px 28px",
                  }}
                >
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: "1fr 1fr" }}
                  >
                    <FormInput label="First Name" type="text" required />
                    <FormInput label="Last Name" type="text" required />
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <FormInput label="Job Title" type="text" required />
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <FormInput label="Organization" type="text" required />
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <FormInput label="Work Email" type="email" required />
                  </div>

                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns: "1fr 1fr",
                      marginTop: 14,
                    }}
                  >
                    <FormInput label="Phone" type="tel" />
                    <FormSelect
                      label="Industry"
                      options={industries}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full transition-all"
                    style={{
                      marginTop: 24,
                      padding: "16px 32px",
                      borderRadius: 6,
                      background: isLoading ? `${OT_CRIMSON}80` : OT_CRIMSON,
                      border: "none",
                      fontFamily: "var(--font-outfit)",
                      fontSize: 15,
                      fontWeight: 500,
                      color: "var(--white)",
                      cursor: isLoading ? "wait" : "pointer",
                      transitionDuration: "0.3s",
                    }}
                  >
                    {isLoading ? "Submitting..." : "Register Interest"}
                  </button>

                  <p
                    style={{
                      fontFamily: "var(--font-outfit)",
                      fontSize: 11,
                      color: "#505050",
                      textAlign: "center",
                      marginTop: 14,
                    }}
                  >
                    By registering, you agree to receive updates about OT
                    Security First.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{
                    background: "var(--black-card)",
                    border: `1px solid ${OT_CRIMSON}30`,
                    borderRadius: 10,
                    padding: "60px 32px",
                    textAlign: "center",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 8,
                      background: `${OT_CRIMSON}20`,
                      border: `1px solid ${OT_CRIMSON}40`,
                      margin: "0 auto 24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={OT_FIREBRICK}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 24,
                      fontWeight: 800,
                      color: "var(--white)",
                      margin: 0,
                    }}
                  >
                    You&rsquo;re on the List
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-outfit)",
                      fontSize: 14,
                      fontWeight: 300,
                      color: "#808080",
                      marginTop: 12,
                      maxWidth: 320,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    We&rsquo;ll notify you as soon as registration opens and share
                    event updates.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .ot-cta-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * InfoCard — Small info card
 */
function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "var(--black-card)",
        border: "1px solid rgba(255, 255, 255, 0.04)",
        borderRadius: 8,
        padding: "16px 24px",
        minWidth: 120,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "#505050",
          margin: 0,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 16,
          fontWeight: 700,
          color: "var(--white)",
          margin: "6px 0 0",
        }}
      >
        {value}
      </p>
    </div>
  );
}

/**
 * SponsorButton — Become a sponsor CTA
 */
function SponsorButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="mailto:partnerships@eventsfirstgroup.com"
      className="inline-flex items-center gap-2 transition-all"
      style={{
        padding: "14px 28px",
        borderRadius: 6,
        border: isHovered
          ? `1px solid ${OT_FIREBRICK}`
          : `1px solid ${OT_CRIMSON}50`,
        background: isHovered ? `${OT_CRIMSON}15` : "transparent",
        fontFamily: "var(--font-outfit)",
        fontSize: 14,
        fontWeight: 500,
        color: isHovered ? OT_FIREBRICK : "#808080",
        transitionDuration: "0.4s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Sponsor This Edition
      <span
        className="transition-transform"
        style={{
          transform: isHovered ? "translateX(4px)" : "translateX(0)",
          transitionDuration: "0.3s",
        }}
      >
        &rarr;
      </span>
    </a>
  );
}

/**
 * FormInput — Styled form input
 */
function FormInput({
  label,
  type,
  required,
}: {
  label: string;
  type: string;
  required?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "var(--font-outfit)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "#505050",
          marginBottom: 8,
        }}
      >
        {label}
        {required && <span style={{ color: OT_FIREBRICK }}> *</span>}
      </label>
      <input
        type={type}
        required={required}
        className="w-full transition-all"
        style={{
          background: "#0a0a0a",
          border: isFocused
            ? `1px solid ${OT_CRIMSON}60`
            : "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: 6,
          padding: "12px 14px",
          fontFamily: "var(--font-outfit)",
          fontSize: 14,
          color: "var(--white)",
          outline: "none",
          transitionDuration: "0.3s",
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}

/**
 * FormSelect — Styled select input
 */
function FormSelect({
  label,
  options,
  required,
}: {
  label: string;
  options: string[];
  required?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "var(--font-outfit)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "#505050",
          marginBottom: 8,
        }}
      >
        {label}
        {required && <span style={{ color: OT_FIREBRICK }}> *</span>}
      </label>
      <select
        required={required}
        className="w-full transition-all"
        style={{
          background: "#0a0a0a",
          border: isFocused
            ? `1px solid ${OT_CRIMSON}60`
            : "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: 6,
          padding: "12px 14px",
          fontFamily: "var(--font-outfit)",
          fontSize: 14,
          color: "var(--white)",
          outline: "none",
          transitionDuration: "0.3s",
          cursor: "pointer",
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
