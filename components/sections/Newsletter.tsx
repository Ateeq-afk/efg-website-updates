"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Interest categories with their series colors
const interests = [
  { id: "cybersecurity", label: "Cybersecurity", color: "#01BBF5" },
  { id: "ot-security", label: "OT Security", color: "#9B4D96" },
  { id: "data-ai", label: "Data & AI", color: "#EEEEEE", isLight: true },
  { id: "all", label: "All Events", color: "#E8651A" },
];

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(
    new Set(["all"])
  );
  const [isFocused, setIsFocused] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Email:", email);
    console.log("Interests:", Array.from(selectedInterests));
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      style={{
        background:
          "linear-gradient(135deg, #0A0A0A 0%, rgba(232, 101, 26, 0.025) 50%, #0A0A0A 100%)",
        padding: "clamp(80px, 10vw, 120px) 0",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(30px, 4vw, 48px)",
            letterSpacing: "-1px",
            color: "var(--white)",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Stay Ahead of the Curve
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontWeight: 300,
            fontSize: 16,
            color: "#808080",
            lineHeight: 1.6,
            maxWidth: 480,
            margin: "12px auto 36px",
          }}
        >
          Event announcements, speaker reveals, and industry insights. Delivered
          when it matters.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          <div className="flex">
            {/* Email Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={{
                flex: 1,
                padding: "16px 24px",
                background: isFocused
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(255, 255, 255, 0.03)",
                border: isFocused
                  ? "1px solid rgba(232, 101, 26, 0.35)"
                  : "1px solid rgba(255, 255, 255, 0.08)",
                borderRight: "none",
                borderRadius: "60px 0 0 60px",
                color: "white",
                fontFamily: "var(--font-outfit)",
                fontSize: 14.5,
                fontWeight: 400,
                outline: "none",
                transition: "all 0.3s ease",
              }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="newsletter-btn"
              style={{
                padding: "16px 32px",
                background: "#E8651A",
                border: "none",
                borderRadius: "0 60px 60px 0",
                fontFamily: "var(--font-outfit)",
                fontSize: 14.5,
                fontWeight: 600,
                color: "white",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
            >
              Subscribe
            </button>
          </div>

          {/* Interest Pills */}
          <div
            className="flex items-center justify-center flex-wrap gap-2.5"
            style={{ marginTop: 22 }}
          >
            {interests.map((interest) => (
              <InterestPill
                key={interest.id}
                interest={interest}
                isSelected={selectedInterests.has(interest.id)}
                onClick={() => toggleInterest(interest.id)}
              />
            ))}
          </div>
        </form>

        {/* Privacy Note */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 12,
            color: "#353535",
            marginTop: 16,
          }}
        >
          No spam, ever. Unsubscribe anytime.
        </p>
      </motion.div>

      {/* Button hover styles */}
      <style jsx global>{`
        .newsletter-btn:hover {
          background: #ff7a2e !important;
        }
        input::placeholder {
          color: #404040;
        }
      `}</style>
    </section>
  );
}

/**
 * InterestPill — Clickable interest category toggle
 */
function InterestPill({
  interest,
  isSelected,
  onClick,
}: {
  interest: (typeof interests)[0];
  isSelected: boolean;
  onClick: () => void;
}) {
  const isLight = interest.isLight;
  const color = interest.color;

  // Calculate styles based on selection state
  const backgroundColor = isSelected
    ? isLight
      ? "rgba(238, 238, 238, 0.06)"
      : `${color}1A`
    : "transparent";

  const borderColor = isSelected
    ? isLight
      ? "rgba(238, 238, 238, 0.2)"
      : `${color}40`
    : "rgba(255, 255, 255, 0.08)";

  const textColor = isSelected ? color : "#505050";

  return (
    <button
      type="button"
      onClick={onClick}
      className="transition-all duration-300"
      style={{
        padding: "7px 16px",
        borderRadius: 50,
        background: backgroundColor,
        border: `1px solid ${borderColor}`,
        fontFamily: "var(--font-outfit)",
        fontSize: 12,
        fontWeight: 500,
        color: textColor,
        cursor: "pointer",
      }}
    >
      {interest.label}
    </button>
  );
}
