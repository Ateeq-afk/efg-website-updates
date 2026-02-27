"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const S3 = "https://efg-final.s3.eu-north-1.amazonaws.com";
const CFK = `${S3}/events/Cyber%20First%20Kuwait%202025/filemail_photos`;
const GOOD = `${S3}/Good`;

interface GalleryImage {
  src: string;
  caption: string;
}

interface Category {
  id: string;
  label: string;
  subtitle: string;
  heroImage: string;
  images: GalleryImage[];
}

const categories: Category[] = [
  {
    id: "sessions",
    label: "The Sessions",
    subtitle: "Panels & Keynotes",
    heroImage: `${CFK}/cyber21-04-230.jpg`,
    images: [
      { src: `${CFK}/cyber21-04-230.jpg`, caption: "Grand ballroom — full summit audience" },
      { src: `${CFK}/cyber21-04-330.jpg`, caption: "Panel lineup — 7 speakers on stage" },
      { src: `${GOOD}/4N8A0001.JPG`, caption: "Keynote stage — full LED backdrop" },
      { src: `${CFK}/cyber21-04-570.jpg`, caption: "Post-session panel — Cyber First Kuwait" },
    ],
  },
  {
    id: "government",
    label: "Government Backing",
    subtitle: "Institutional & Official Presence",
    heroImage: `${CFK}/cyber21-04-430.jpg`,
    images: [
      { src: `${CFK}/cyber21-04-430.jpg`, caption: "Official ribbon-cutting — Kuwaiti police & dignitaries" },
      { src: `${CFK}/cyber21-04-110.jpg`, caption: "Military officers — venue arrival" },
      { src: `${CFK}/cyber21-04-250.jpg`, caption: "VIP front row — uniformed officials" },
      { src: `${CFK}/cyber21-04-210.jpg`, caption: "International delegation — US & Kuwaiti military" },
    ],
  },
  {
    id: "speakers",
    label: "The Voices",
    subtitle: "C-Suite & CISO Speakers",
    heroImage: `${CFK}/cyber21-04-550.jpg`,
    images: [
      { src: `${CFK}/cyber21-04-550.jpg`, caption: "Faisal Al Roumi — Burgan Bank" },
      { src: `${CFK}/cyber21-04-270.jpg`, caption: "Dr. Fatemah Alsewaidi — panel discussion" },
      { src: `${CFK}/cyber21-04-310.jpg`, caption: "Keynote address from main stage" },
      { src: `${CFK}/cyber21-04-530.jpg`, caption: "Shaheela B. Abdul Majeed — compliance panel" },
    ],
  },
  {
    id: "expo",
    label: "The Exhibition",
    subtitle: "Global Technology Partners",
    heroImage: `${CFK}/cyber21-04-410.jpg`,
    images: [
      { src: `${CFK}/cyber21-04-410.jpg`, caption: "Exhibition floor — ThreatLocker & Group-IB" },
      { src: `${CFK}/cyber21-04-390.jpg`, caption: "Acronis & Bitdefender — active engagement" },
      { src: `${CFK}/cyber21-04-510.jpg`, caption: "Exhibition hall under grand chandeliers" },
      { src: `${CFK}/cyber21-04-150.jpg`, caption: "Google Cloud Security — live demos" },
    ],
  },
  {
    id: "audience",
    label: "The Room",
    subtitle: "5,000+ Senior Delegates",
    heroImage: `${CFK}/cyber21-04-400.jpg`,
    images: [
      { src: `${CFK}/cyber21-04-400.jpg`, caption: "Plenary audience — cinematic lighting" },
      { src: `${GOOD}/4N8A0065.JPG`, caption: "Engaged audience — depth of field" },
      { src: `${CFK}/cyber21-04-50.jpg`, caption: "Registration — red carpet arrival" },
      { src: `${CFK}/cyber21-04-170.jpg`, caption: "Delegate in attendance — Kuwaiti national" },
    ],
  },
  {
    id: "awards",
    label: "Recognition",
    subtitle: "Honouring Regional Excellence",
    heroImage: `${GOOD}/4N8A0200.JPG`,
    images: [
      { src: `${GOOD}/4N8A0200.JPG`, caption: "Cybersecurity Leader of the Year — UAE & MENA" },
      { src: `${GOOD}/4N8A0330.JPG`, caption: "Trophy presentation — award ceremony" },
      { src: `${CFK}/cyber21-04-350.jpg`, caption: "Cross-sector networking — expo floor" },
    ],
  },
];

// Split into two rows of 3
const rows = [categories.slice(0, 3), categories.slice(3, 6)];

export default function PhotoGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeCategory = categories.find((c) => c.id === activeId) ?? null;

  const handleTileClick = useCallback(
    (id: string) => {
      if (activeId === id) {
        setActiveId(null);
      } else {
        setActiveId(id);
        setActiveImageIndex(0);
      }
    },
    [activeId]
  );

  const handlePrev = useCallback(() => {
    if (!activeCategory) return;
    setActiveImageIndex((i) =>
      i === 0 ? activeCategory.images.length - 1 : i - 1
    );
  }, [activeCategory]);

  const handleNext = useCallback(() => {
    if (!activeCategory) return;
    setActiveImageIndex((i) =>
      i === activeCategory.images.length - 1 ? 0 : i + 1
    );
  }, [activeCategory]);

  return (
    <section
      style={{
        background: "var(--black)",
        padding: "clamp(96px, 8vw, 120px) 0 clamp(64px, 6vw, 96px)",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
          marginBottom: "clamp(40px, 4vw, 64px)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--orange)",
            marginBottom: "12px",
          }}
        >
          From The Floor
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Inside The Room
        </h2>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(14px, 1.2vw, 16px)",
            color: "rgba(255,255,255,0.45)",
            marginTop: "12px",
            margin: "12px 0 0",
          }}
        >
          Select a category to explore.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
        }}
      >
        {rows.map((row, rowIndex) => {
          const rowActiveCategory = row.find((c) => c.id === activeId) ?? null;

          return (
            <div key={rowIndex}>
              {/* Tiles row */}
              <div
                className="gallery-tile-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "2px",
                  marginBottom: rowActiveCategory ? "0" : "2px",
                }}
              >
                {row.map((cat) => (
                  <Tile
                    key={cat.id}
                    category={cat}
                    isActive={activeId === cat.id}
                    onClick={() => handleTileClick(cat.id)}
                  />
                ))}
              </div>

              {/* Expandable panel — only renders for the row containing the active tile */}
              <AnimatePresence>
                {rowActiveCategory && (
                  <motion.div
                    key={rowActiveCategory.id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ overflow: "hidden", marginBottom: "2px" }}
                  >
                    <Panel
                      category={rowActiveCategory}
                      activeIndex={activeImageIndex}
                      onPrev={handlePrev}
                      onNext={handleNext}
                      onThumb={setActiveImageIndex}
                      onClose={() => setActiveId(null)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .gallery-tile-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .gallery-panel {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .gallery-panel > div:last-child {
            display: none !important;
          }
          .gallery-panel > div:first-child {
            height: 280px;
            position: relative;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── Tile ───────────────────────────────────────────────── */

function Tile({
  category,
  isActive,
  onClick,
}: {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.0 }}
      style={{
        position: "relative",
        height: "clamp(200px, 22vw, 300px)",
        overflow: "hidden",
        cursor: "pointer",
        border: "none",
        padding: 0,
        display: "block",
        width: "100%",
        outline: isActive ? `2px solid var(--orange)` : "none",
        outlineOffset: "-2px",
      }}
    >
      {/* Background image */}
      <Image
        src={category.heroImage}
        alt={category.label}
        fill
        style={{
          objectFit: "cover",
          transition: "transform 0.6s ease, filter 0.4s ease",
          transform: isActive ? "scale(1.04)" : "scale(1)",
          filter: isActive ? "brightness(0.5)" : "brightness(0.65)",
        }}
        unoptimized
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        }}
      />

      {/* Orange top accent — visible when active */}
      <motion.div
        initial={false}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "var(--orange)",
          transformOrigin: "left",
        }}
      />

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "clamp(16px, 2vw, 24px)",
          textAlign: "left",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--orange)",
            margin: "0 0 4px",
          }}
        >
          {category.subtitle}
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(16px, 1.6vw, 22px)",
            fontWeight: 800,
            color: "#fff",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {category.label}
        </p>

        {/* Explore indicator */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "11px",
            color: isActive ? "var(--orange)" : "rgba(255,255,255,0.4)",
            margin: "6px 0 0",
            transition: "color 0.3s",
          }}
        >
          {isActive ? "Close ↑" : `${category.images.length} photos →`}
        </p>
      </div>
    </motion.button>
  );
}

/* ─── Panel ──────────────────────────────────────────────── */

function Panel({
  category,
  activeIndex,
  onPrev,
  onNext,
  onThumb,
  onClose,
}: {
  category: Category;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onThumb: (i: number) => void;
  onClose: () => void;
}) {
  const activeImage = category.images[activeIndex];

  return (
    <div
      className="gallery-panel"
      style={{
        background: "#0d0d0d",
        display: "grid",
        gridTemplateColumns: "1fr 280px",
        gap: "0",
        height: "480px",
      }}
    >
      {/* Main image */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.caption}
              fill
              style={{ objectFit: "cover" }}
              unoptimized
            />
            {/* Caption overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "32px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.85)",
                  margin: 0,
                }}
              >
                {activeImage.caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next arrows */}
        <button
          onClick={onPrev}
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            transition: "background 0.2s",
          }}
        >
          ‹
        </button>
        <button
          onClick={onNext}
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            transition: "background 0.2s",
          }}
        >
          ›
        </button>

        {/* Image counter */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "20px",
            padding: "4px 12px",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "12px",
            color: "rgba(255,255,255,0.7)",
            zIndex: 10,
          }}
        >
          {activeIndex + 1} / {category.images.length}
        </div>
      </div>

      {/* Thumbnail sidebar */}
      <div
        style={{
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 20px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--orange)",
                margin: "0 0 4px",
              }}
            >
              {category.subtitle}
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                fontWeight: 800,
                color: "#fff",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {category.label}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.5)",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginLeft: "8px",
            }}
          >
            ×
          </button>
        </div>

        {/* Thumbnails */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {category.images.map((img, i) => (
            <button
              key={i}
              onClick={() => onThumb(i)}
              style={{
                position: "relative",
                height: "88px",
                overflow: "hidden",
                borderRadius: "4px",
                cursor: "pointer",
                border: i === activeIndex
                  ? "2px solid var(--orange)"
                  : "2px solid transparent",
                padding: 0,
                transition: "border-color 0.2s",
                flexShrink: 0,
              }}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                style={{
                  objectFit: "cover",
                  filter: i === activeIndex ? "brightness(0.9)" : "brightness(0.55)",
                  transition: "filter 0.2s",
                }}
                unoptimized
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "4px 8px",
                  background: "rgba(0,0,0,0.7)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "10px",
                    color: i === activeIndex
                      ? "#fff"
                      : "rgba(255,255,255,0.5)",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    transition: "color 0.2s",
                  }}
                >
                  {img.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
