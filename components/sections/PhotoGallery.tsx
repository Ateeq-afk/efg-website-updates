"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Gallery images data
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    alt: "Conference keynote stage",
    gridClass: "col-span-2 row-span-2", // Hero image
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
    alt: "Networking conversation",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
    alt: "Speaker presenting",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
    alt: "Professional attendee",
    gridClass: "col-span-1 row-span-2", // Tall portrait
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1591115765373-5f9cf1da241c?w=600&q=80",
    alt: "Exhibition area",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80",
    alt: "Venue panoramic",
    gridClass: "col-span-2 row-span-1", // Wide landscape
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&q=80",
    alt: "Boardroom setting",
    gridClass: "col-span-1 row-span-1",
    hideOnMobile: true,
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
    alt: "Production setup",
    gridClass: "col-span-1 row-span-1",
    hideOnMobile: true,
  },
];

export default function PhotoGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--black)",
        padding: "clamp(48px, 5vw, 72px) 0 clamp(40px, 4vw, 60px)",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════
            SECTION HEADER — Left-aligned editorial style
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 48 }}
        >
          {/* Label */}
          <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
            <span
              style={{
                width: 30,
                height: 1,
                background: "var(--orange)",
              }}
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
              From Our Events
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px, 4.5vw, 54px)",
              letterSpacing: "-1.5px",
              color: "var(--white)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Moments That Matter
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              fontSize: 16,
              color: "#808080",
              lineHeight: 1.6,
              maxWidth: 460,
              margin: "12px 0 0",
            }}
          >
            What happens when the region's most influential technology leaders
            gather under one roof.
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            THE GALLERY GRID
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          className="gallery-grid"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
        >
          {galleryImages.map((image) => (
            <GalleryImage
              key={image.id}
              image={image}
              isHovered={hoveredId === image.id}
              isAnyHovered={hoveredId !== null}
              onHover={() => setHoveredId(image.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            CTA LINK
            ═══════════════════════════════════════════════════════════════ */}
      </div>

      {/* Grid CSS */}
      <style jsx global>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}

/**
 * GalleryImage — Individual gallery cell with spotlight effect
 */
function GalleryImage({
  image,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave,
}: {
  image: (typeof galleryImages)[0];
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  // Determine if this image should dim (another is hovered)
  const shouldDim = isAnyHovered && !isHovered;

  return (
    <motion.div
      className={`gallery-image ${image.gridClass} ${image.hideOnMobile ? "hidden-mobile" : ""}`}
      variants={{
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        minHeight: image.gridClass.includes("row-span-2") ? 280 : 140,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* The Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-all"
        style={{
          filter: isHovered
            ? "brightness(0.9) saturate(1.05)"
            : shouldDim
              ? "brightness(0.5) saturate(0.9)"
              : "brightness(0.75) saturate(0.9)",
          transform: isHovered ? "scale(1.04)" : "scale(1)",
          transitionDuration: "0.6s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 50%)",
          opacity: isHovered ? 1 : 0,
          transitionDuration: "0.4s",
        }}
      />

      {/* Grid span styles */}
      <style jsx>{`
        .col-span-1 {
          grid-column: span 1;
        }
        .col-span-2 {
          grid-column: span 2;
        }
        .row-span-1 {
          grid-row: span 1;
        }
        .row-span-2 {
          grid-row: span 2;
        }

        @media (max-width: 1024px) {
          .col-span-2.row-span-2 {
            grid-column: span 2;
            grid-row: span 2;
          }
          .row-span-2:not(.col-span-2) {
            grid-row: span 2;
          }
        }

        @media (max-width: 640px) {
          .col-span-2 {
            grid-column: span 2;
          }
          .row-span-2 {
            grid-row: span 1;
          }
          .hidden-mobile {
            display: none;
          }
        }
      `}</style>
    </motion.div>
  );
}

