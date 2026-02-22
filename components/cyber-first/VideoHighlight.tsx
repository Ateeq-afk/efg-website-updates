"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CYBER_BLUE = "#01BBF5";

// Video data
const mainVideo = {
  id: "XHOmBV4js_E",
  title: "Cyber First Series Highlights",
  thumbnail: "https://img.youtube.com/vi/XHOmBV4js_E/maxresdefault.jpg",
};

// Additional video placeholders
const additionalVideos = [
  { id: "kuwait-2025", title: "Kuwait 2025 Highlights", comingSoon: true },
  { id: "qatar-edition", title: "Qatar Edition", comingSoon: true },
  { id: "uae-2024", title: "UAE 2024", comingSoon: true },
];

export default function VideoHighlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(mainVideo.id);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--black)",
        padding: "clamp(60px, 8vw, 100px) 0",
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
          style={{ textAlign: "center", marginBottom: 40 }}
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
              Series Highlights
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
            See It in Action
          </h2>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "16 / 9",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 80px rgba(1, 187, 245, 0.05)",
            }}
          >
            {!isPlaying ? (
              <VideoThumbnail
                thumbnail={mainVideo.thumbnail}
                onPlay={handlePlay}
              />
            ) : (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                title="Cyber First Highlights"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0 }}
              />
            )}
          </div>
        </motion.div>

        {/* Additional Videos */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
          style={{ marginTop: 24 }}
        >
          {additionalVideos.map((video) => (
            <VideoThumbnailSmall key={video.id} video={video} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * VideoThumbnail — Main video thumbnail with play button
 */
function VideoThumbnail({
  thumbnail,
  onPlay,
}: {
  thumbnail: string;
  onPlay: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute inset-0 cursor-pointer"
      onClick={onPlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnail}
        alt="Video thumbnail"
        className="w-full h-full object-cover transition-all"
        style={{
          filter: isHovered
            ? "brightness(0.6) saturate(0.9)"
            : "brightness(0.5) saturate(0.8)",
          transform: isHovered ? "scale(1.02)" : "scale(1)",
          transitionDuration: "0.5s",
        }}
      />

      {/* Play Button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="flex items-center justify-center transition-all"
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: isHovered ? CYBER_BLUE : "rgba(1, 187, 245, 0.9)",
            boxShadow: isHovered
              ? "0 0 30px rgba(1, 187, 245, 0.4)"
              : "0 0 20px rgba(1, 187, 245, 0.2)",
            transform: isHovered ? "scale(1.08)" : "scale(1)",
            transitionDuration: "0.3s",
          }}
        >
          {/* Play Triangle */}
          <svg
            width="24"
            height="28"
            viewBox="0 0 24 28"
            fill="none"
            style={{ marginLeft: 4 }}
          >
            <path
              d="M22 14L2 26V2L22 14Z"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p
          className="transition-opacity"
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 14,
            fontWeight: 500,
            color: "white",
            marginTop: 12,
            opacity: isHovered ? 1 : 0.8,
          }}
        >
          Watch the Highlights
        </p>
      </div>
    </div>
  );
}

/**
 * VideoThumbnailSmall — Small video card placeholder
 */
function VideoThumbnailSmall({
  video,
}: {
  video: { id: string; title: string; comingSoon?: boolean };
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center transition-all"
      style={{
        width: 160,
        height: 90,
        borderRadius: 10,
        background: "#1A1A1A",
        border: isHovered
          ? "1px solid rgba(1, 187, 245, 0.2)"
          : "1px solid rgba(255, 255, 255, 0.06)",
        overflow: "hidden",
        cursor: video.comingSoon ? "default" : "pointer",
        opacity: isHovered ? 0.9 : 0.6,
        transitionDuration: "0.3s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center justify-center text-center p-3">
        {video.comingSoon ? (
          <>
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#404040",
              }}
            >
              Coming Soon
            </span>
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 11,
                fontWeight: 500,
                color: "#606060",
                marginTop: 4,
              }}
            >
              {video.title}
            </span>
          </>
        ) : (
          <>
            {/* Mini play icon */}
            <div
              className="flex items-center justify-center"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(1, 187, 245, 0.2)",
              }}
            >
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path d="M9 6L1 11V1L9 6Z" fill={CYBER_BLUE} />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 11,
                fontWeight: 500,
                color: "#808080",
                marginTop: 6,
              }}
            >
              {video.title}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
