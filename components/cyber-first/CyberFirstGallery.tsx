"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const CYBER_BLUE = "#01BBF5";

// Gallery images from actual event
const galleryImages = [
  {
    id: 1,
    src: "https://uae.cyberfirstseries.com/wp-content/uploads/2025/10/ARU00511.jpg",
    alt: "Cyber First UAE keynote",
    gridClass: "col-span-2 row-span-2",
  },
  {
    id: 2,
    src: "https://uae.cyberfirstseries.com/wp-content/uploads/2025/10/ARU00500.jpg",
    alt: "Panel discussion",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://uae.cyberfirstseries.com/wp-content/uploads/2025/10/ARU01167.jpg",
    alt: "Networking session",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://uae.cyberfirstseries.com/wp-content/uploads/2025/10/ARU00574.jpg",
    alt: "Speaker presenting",
    gridClass: "col-span-1 row-span-2",
  },
  {
    id: 5,
    src: "https://uae.cyberfirstseries.com/wp-content/uploads/2025/10/ARU00722.jpg",
    alt: "Exhibition area",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: 6,
    src: "https://uae.cyberfirstseries.com/wp-content/uploads/2025/10/ARU00738.jpg",
    alt: "Audience",
    gridClass: "col-span-2 row-span-1",
  },
  {
    id: 7,
    src: "https://uae.cyberfirstseries.com/wp-content/uploads/2025/10/ARU00418.jpg",
    alt: "Awards ceremony",
    gridClass: "col-span-1 row-span-1",
    hideOnMobile: true,
  },
  {
    id: 8,
    src: "https://uae.cyberfirstseries.com/wp-content/uploads/2025/10/ARU01180.jpg",
    alt: "Closing remarks",
    gridClass: "col-span-1 row-span-1",
    hideOnMobile: true,
  },
];

export default function CyberFirstGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--black)",
        padding: "clamp(80px, 10vw, 120px) 0 clamp(60px, 8vw, 100px)",
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
          style={{ marginBottom: 48 }}
        >
          {/* Label */}
          <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
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
              From Past Editions
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-1.5px",
              color: "var(--white)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            The Cyber First Experience
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
            Moments captured from our conferences across the GCC.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="cf-gallery-grid"
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
          style={{ marginTop: 28 }}
        >
          <GalleryCTA />
        </motion.div>
      </div>

      {/* Grid CSS */}
      <style jsx global>{`
        .cf-gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .cf-gallery-grid .col-span-1 {
          grid-column: span 1;
        }
        .cf-gallery-grid .col-span-2 {
          grid-column: span 2;
        }
        .cf-gallery-grid .row-span-1 {
          grid-row: span 1;
        }
        .cf-gallery-grid .row-span-2 {
          grid-row: span 2;
        }

        @media (max-width: 1024px) {
          .cf-gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 640px) {
          .cf-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cf-gallery-grid .row-span-2 {
            grid-row: span 1;
          }
          .cf-gallery-grid .hidden-mobile {
            display: none;
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
  const shouldDim = isAnyHovered && !isHovered;

  return (
    <motion.div
      className={`${image.gridClass} ${image.hideOnMobile ? "hidden-mobile" : ""}`}
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

      {/* Blue tint on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity"
        style={{
          background: `rgba(1, 187, 245, 0.05)`,
          opacity: isHovered ? 1 : 0,
          transitionDuration: "0.4s",
        }}
      />
    </motion.div>
  );
}

/**
 * GalleryCTA — Link to full gallery
 */
function GalleryCTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/events/cyber-first/gallery"
      className="inline-flex items-center gap-1.5 transition-colors"
      style={{
        fontFamily: "var(--font-outfit)",
        fontSize: 13,
        fontWeight: 500,
        color: CYBER_BLUE,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>View full gallery</span>
      <span
        className="transition-transform"
        style={{
          transform: isHovered ? "translateX(4px)" : "translateX(0)",
          transitionDuration: "0.3s",
        }}
      >
        →
      </span>
    </Link>
  );
}
