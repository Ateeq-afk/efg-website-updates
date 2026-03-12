import type { Metadata } from "next";
import {
  HeroSection,
  EventSeriesShowcase,
  ImpactBar,
  AnnualTimeline,
  NetworkFirst,
  PhotoGallery,
  WhyEFG,
  Testimonials,
  EventHighlights,
  SponsorsPartners,
  InquiryForm,
  Footer,
} from "@/components/sections";
import SectionTransition from "@/components/effects/SectionTransition";

const BASE_URL = "https://eventsfirstgroup.com";
const OG_IMAGE = "https://efg-final.s3.eu-north-1.amazonaws.com/Good/4N8A0290.JPG";

export const metadata: Metadata = {
  title: "Events First Group | Executive Technology Summits",
  description:
    "Premium executive summits across the Middle East, Africa, and Asia. Cyber First, Data & AI First, Opex First, OT Security First — bringing together CISOs, CDOs, and enterprise leaders.",
  keywords: [
    "technology conferences",
    "executive summit",
    "cybersecurity events",
    "data AI conference",
    "CISO summit",
    "CDO conference",
    "enterprise technology",
    "Events First Group",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Events First Group — Executive Technology Summits",
    description:
      "Premium executive summits. Cyber First, Data & AI First, Opex First, OT Security First. CISOs, CDOs, and enterprise leaders.",
    url: BASE_URL,
    siteName: "Events First Group",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Events First Group — Executive Technology Summits",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events First Group — Executive Technology Summits",
    description:
      "Premium executive summits for CISOs, CDOs, and enterprise leaders.",
    images: [OG_IMAGE],
  },
};

export default function Home() {
  return (
    <div>
      {/* The Hero — The Promise */}
      <HeroSection />

      {/* The Event Series — Four Worlds */}
      <EventSeriesShowcase />

      {/* NetworkFirst Boardrooms — Most exclusive product, high up */}
      <NetworkFirst />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" />

      {/* The Impact Bar — Numbers That Matter (flows from Event Series via gradient) */}
      <ImpactBar />

      {/* Annual Timeline — The Year Ahead (flows directly from ImpactBar) */}
      <AnnualTimeline />

      {/* Section Transition - Expand */}
      <SectionTransition variant="expand" />

      {/* Photo Gallery — Moments That Matter */}
      <PhotoGallery />

      {/* Section Transition - Pulse */}
      <SectionTransition variant="pulse" />

      {/* Why Events First Group — The Trust */}
      <WhyEFG />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" />

      {/* Testimonials — The Human Voice */}
      <Testimonials />

      {/* Section Transition - Expand */}
      <SectionTransition variant="expand" />

      {/* Event Highlights — From the Stage */}
      <EventHighlights />

      {/* Sponsors & Partners — The Credibility */}
      <SponsorsPartners />

      {/* Section Transition - Pulse */}
      <SectionTransition variant="pulse" />

      {/* Get Involved — Inquiry Form */}
      <InquiryForm />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" />

      {/* Footer — The Credits */}
      <Footer />
    </div>
  );
}
