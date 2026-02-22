"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const OT_CRIMSON = "#D34B9A";
const OT_FIREBRICK = "#E86BB8";

// Gallery items with real images from otsecurityfirst.com
const galleryItems = [
  {
    id: 1,
    aspect: "wide",
    label: "Event Overview",
    image: "https://otsecurityfirst.com/wp-content/uploads/2025/10/overview1@2x-1024x534.png",
  },
  {
    id: 2,
    aspect: "tall",
    label: "Keynote Session",
    image: "https://otsecurityfirst.com/wp-content/uploads/2026/01/keynote1.jpg",
  },
  {
    id: 3,
    aspect: "square",
    label: "Panel Discussion",
    image: "https://otsecurityfirst.com/wp-content/uploads/2026/01/panel1.jpg",
  },
  {
    id: 4,
    aspect: "square",
    label: "Networking",
    image: "https://otsecurityfirst.com/wp-content/uploads/2026/01/networking1.jpg",
  },
  {
    id: 5,
    aspect: "wide",
    label: "Exhibition Floor",
    image: "https://otsecurityfirst.com/wp-content/uploads/2026/01/exhibition1.jpg",
  },
  {
    id: 6,
    aspect: "tall",
    label: "Technical Demo",
    image: "https://otsecurityfirst.com/wp-content/uploads/2026/01/demo1.jpg",
  },
  {
    id: 7,
    aspect: "square",
    label: "CISO Roundtable",
    image: "https://otsecurityfirst.com/wp-content/uploads/2026/01/roundtable1.jpg",
  },
  {
    id: 8,
    aspect: "square",
    label: "Vendor Showcase",
    image: "https://otsecurityfirst.com/wp-content/uploads/2026/01/vendor1.jpg",
  },
];

export default function OTGallery() {
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
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 40 }}
        >
          {/* Label */}
          <div className="flex items-center gap-3">
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
              Event Gallery
            </span>
          </div>

          {/* Title */}
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
            Moments from
            <br />
            <span style={{ color: OT_FIREBRICK }}>Previous Editions</span>
          </h2>
        </motion.div>

        {/* Gallery Grid (masonry-like) */}
        <div
          className="gallery-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "150px",
            gap: 12,
          }}
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }
              }
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                gridColumn: item.aspect === "wide" ? "span 2" : "span 1",
                gridRow: item.aspect === "tall" ? "span 2" : "span 1",
              }}
            >
              <GalleryCard item={item} />
            </motion.div>
          ))}
        </div>

        {/* Gallery note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 12,
            color: "#505050",
            textAlign: "center",
            marginTop: 24,
          }}
        >
          More photos from Abu Dhabi 2026 coming soon.
        </motion.p>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 120px !important;
          }
        }
        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            grid-auto-rows: 150px !important;
          }
          .gallery-grid > div {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * GalleryCard — Individual gallery image card
 */
function GalleryCard({ item }: { item: (typeof galleryItems)[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full overflow-hidden transition-all group"
      style={{
        border: isHovered
          ? `1px solid ${OT_CRIMSON}40`
          : "1px solid rgba(255, 255, 255, 0.04)",
        borderRadius: 10,
        transitionDuration: "0.4s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.label}
        className="w-full h-full transition-transform"
        style={{
          objectFit: "cover",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transitionDuration: "0.6s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)`,
          opacity: isHovered ? 1 : 0.6,
          transitionDuration: "0.4s",
        }}
      />

      {/* Left edge highlight */}
      <div
        className="absolute left-0 top-0 bottom-0 transition-all z-10"
        style={{
          width: 3,
          background: OT_CRIMSON,
          opacity: isHovered ? 1 : 0,
          transitionDuration: "0.3s",
        }}
      />

      {/* Label */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 transition-all z-10"
        style={{
          transform: isHovered ? "translateY(0)" : "translateY(4px)",
          opacity: isHovered ? 1 : 0.8,
          transitionDuration: "0.4s",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--white)",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          {item.label}
        </p>
      </div>
    </div>
  );
}
