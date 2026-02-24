"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CYBER_BLUE = "#01BBF5";
const EASE = [0.16, 1, 0.3, 1] as const;

// YouTube Shorts — using real event highlight video IDs
const shorts = [
  {
    id: "short-1",
    videoId: "JA1X4cN2-t0",
    title: "Event Highlights",
    thumbnail: "https://img.youtube.com/vi/JA1X4cN2-t0/hqdefault.jpg",
  },
  {
    id: "short-2",
    videoId: "-a481Lbz55o",
    title: "Event Highlights",
    thumbnail: "https://img.youtube.com/vi/-a481Lbz55o/hqdefault.jpg",
  },
  {
    id: "short-3",
    videoId: "dbL42utoYW4",
    title: "Event Highlights",
    thumbnail: "https://img.youtube.com/vi/dbL42utoYW4/hqdefault.jpg",
  },
  {
    id: "short-4",
    videoId: "gR-IUI7yJLg",
    title: "Event Highlights",
    thumbnail: "https://img.youtube.com/vi/gR-IUI7yJLg/hqdefault.jpg",
  },
];

export default function YouTubeShorts() {
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
          style={{ textAlign: "center", marginBottom: 36 }}
        >
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
              Quick Clips
            </span>
            <span style={{ width: 30, height: 1, background: CYBER_BLUE }} />
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(28px, 3vw, 40px)",
              letterSpacing: "-1px",
              color: "var(--white)",
              lineHeight: 1.15,
              margin: "16px 0 0",
            }}
          >
            Shorts &amp; Reels
          </h2>
        </motion.div>

        {/* Shorts Row */}
        <div
          className="shorts-row"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${shorts.length}, 1fr)`,
            gap: 14,
          }}
        >
          {shorts.map((short, index) => (
            <motion.div
              key={short.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.08,
                ease: EASE,
              }}
            >
              <ShortCard short={short} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .shorts-row {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .shorts-row {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .shorts-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * ShortCard — Vertical video card (9:16 ratio) with play overlay
 */
function ShortCard({
  short,
}: {
  short: (typeof shorts)[0];
}) {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{
        aspectRatio: "9 / 16",
        borderRadius: 16,
        border: `1px solid ${hovered ? "rgba(1, 187, 245, 0.12)" : "rgba(255, 255, 255, 0.05)"}`,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(0, 0, 0, 0.3)" : "none",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setPlaying(true)}
    >
      {!playing ? (
        <>
          {/* Thumbnail */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={short.thumbnail}
            alt={short.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: hovered
                ? "brightness(0.5) saturate(0.9)"
                : "brightness(0.35) saturate(0.7)",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.4) 100%)`,
            }}
          />

          {/* Play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="flex items-center justify-center transition-all"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: hovered ? CYBER_BLUE : "rgba(1, 187, 245, 0.8)",
                boxShadow: hovered
                  ? "0 0 24px rgba(1, 187, 245, 0.4)"
                  : "0 0 12px rgba(1, 187, 245, 0.2)",
                transform: hovered ? "scale(1.08)" : "scale(1)",
                transitionDuration: "0.3s",
              }}
            >
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                style={{ marginLeft: 2 }}
              >
                <path
                  d="M14 9L2 17V1L14 9Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>


          {/* Blue accent line at bottom on hover */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: 2,
              background: CYBER_BLUE,
              opacity: hovered ? 0.8 : 0,
              transition: "opacity 0.3s",
            }}
          />
        </>
      ) : (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${short.videoId}?autoplay=1&rel=0`}
          title={short.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            border: "none",
          }}
        />
      )}
    </div>
  );
}
