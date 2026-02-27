"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const VIOLET = "#7C3AED";
const VIOLET_BRIGHT = "#9F67FF";
const EASE = [0.16, 1, 0.3, 1] as const;

const nextEdition = {
  name: "Opex First Kuwait",
  edition: "3rd Edition",
  date: new Date("2027-03-15T09:00:00"),
  dateString: "Date TBA",
  city: "Kuwait City",
  venue: "Venue TBA",
};

const trustPoints = [
  "Complimentary for qualified end-users",
  "Vendor/sponsor passes available",
  "Limited to 300 delegates per edition",
];

export default function OpexUpcomingEditionCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [daysUntil, setDaysUntil] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    organization: "",
    email: "",
  });

  useEffect(() => {
    const calculateDays = () => {
      const now = new Date();
      const diff = nextEdition.date.getTime() - now.getTime();
      setDaysUntil(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    };
    calculateDays();
    const timer = setInterval(calculateDays, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration submitted:", formData);
    setIsSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="register"
      style={{
        background: `linear-gradient(135deg, #0A0A0A 0%, rgba(124, 58, 237, 0.03) 50%, #0A0A0A 100%)`,
        padding: "clamp(36px, 4vw, 56px) 0",
        borderTop: "1px solid rgba(124, 58, 237, 0.06)",
      }}
    >
      <div
        className="opex-cta-container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
      >
        {/* Left Column — CTA Pitch */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Label */}
          <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
            <span style={{ width: 20, height: 2, background: VIOLET }} />
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: VIOLET,
              }}
            >
              Next Edition
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-2px",
              color: "var(--white)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Opex First is Expanding
          </h2>

          {/* Details */}
          <div
            className="flex flex-wrap items-center gap-2"
            style={{ marginTop: 12 }}
          >
            {[nextEdition.edition, nextEdition.dateString, nextEdition.city].map(
              (item, index, arr) => (
                <span key={item} className="flex items-center gap-2">
                  <span
                    style={{
                      fontFamily: "var(--font-outfit)",
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#707070",
                    }}
                  >
                    {item}
                  </span>
                  {index < arr.length - 1 && (
                    <span style={{ color: "#404040" }}>&middot;</span>
                  )}
                </span>
              )
            )}
          </div>

          {/* Countdown */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: 16,
              fontWeight: 300,
              color: "#707070",
              marginTop: 16,
              lineHeight: 1.7,
            }}
          >
            After successful editions in Riyadh and Abu Dhabi, Opex First is
            expanding to Kuwait and Doha. Be part of the next chapter.
          </motion.p>

          {/* Trust Points */}
          <div style={{ marginTop: 24 }}>
            {trustPoints.map((point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -10 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                }
                transition={{
                  duration: 0.4,
                  delay: 0.4 + index * 0.1,
                  ease: EASE,
                }}
                className="flex items-center gap-2"
                style={{ marginTop: index > 0 ? 8 : 0 }}
              >
                <span style={{ color: VIOLET, fontSize: 14 }}>&#10003;</span>
                <span
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#606060",
                  }}
                >
                  {point}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
            style={{ marginTop: 28 }}
          >
            <Link
              href="/sponsors-and-partners"
              className="inline-flex items-center gap-2 transition-all duration-300"
              style={{
                padding: "12px 24px",
                borderRadius: 50,
                border: "1px solid rgba(124, 58, 237, 0.25)",
                background: "transparent",
                fontFamily: "var(--font-outfit)",
                fontSize: 14,
                fontWeight: 500,
                color: VIOLET,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(124, 58, 237, 0.08)";
                e.currentTarget.style.borderColor = VIOLET;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.25)";
              }}
            >
              Sponsor This Edition
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column — Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(124, 58, 237, 0.08)",
            borderRadius: 20,
            padding: "36px 32px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 20,
              color: "var(--white)",
              margin: "0 0 20px",
            }}
          >
            Register Your Interest
          </h3>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex gap-3.5" style={{ marginBottom: 14 }}>
                  <FormInput
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <FormInput
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex gap-3.5" style={{ marginBottom: 14 }}>
                  <FormInput
                    name="jobTitle"
                    placeholder="Job Title"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                  />
                  <FormInput
                    name="organization"
                    placeholder="Organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <FormInput
                    name="email"
                    type="email"
                    placeholder="Work Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <SubmitButton />
                <p
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: 11,
                    color: "#353535",
                    marginTop: 12,
                  }}
                >
                  By registering, you agree to receive event communications from
                  Events First Group.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center"
                style={{ minHeight: 260 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="flex items-center justify-center"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "rgba(124, 58, 237, 0.1)",
                    border: "2px solid rgba(124, 58, 237, 0.3)",
                  }}
                >
                  <motion.svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={VIOLET}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                </motion.div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 24,
                    color: "var(--white)",
                    marginTop: 20,
                  }}
                >
                  Thank you!
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: 15,
                    fontWeight: 300,
                    color: "#808080",
                    marginTop: 8,
                    maxWidth: 280,
                  }}
                >
                  We&rsquo;ll be in touch with event details.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .opex-cta-container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}

function FormInput({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="transition-all duration-300"
      style={{
        width: "100%",
        padding: "14px 18px",
        background: isFocused
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(255, 255, 255, 0.03)",
        border: isFocused
          ? "1px solid rgba(124, 58, 237, 0.35)"
          : "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 10,
        color: "white",
        fontFamily: "var(--font-outfit)",
        fontSize: 14,
        fontWeight: 400,
        outline: "none",
      }}
    />
  );
}

function SubmitButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="submit"
      className="w-full transition-all duration-300"
      style={{
        padding: 16,
        background: isHovered ? VIOLET_BRIGHT : VIOLET,
        border: "none",
        borderRadius: 12,
        fontFamily: "var(--font-outfit)",
        fontSize: 15,
        fontWeight: 600,
        color: "var(--white)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Register Interest &rarr;
    </button>
  );
}
