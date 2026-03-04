import { Metadata } from "next";
import {
  SeriesHero,
  EditionsMap,
  SeriesTimeline,
  PastEditionsTimeline,
  AboutSeries,
  MarketInsights,
  FeaturedSpeakers,
  ConferenceElements,
  SponsorsWall,
  CyberFirstGallery,
  VideoHighlight,
  YouTubeShorts,
  UpcomingEditionCTA,
  ExploreOtherSeries,
} from "@/components/cyber-first";
import { Footer } from "@/components/sections";
import SectionTransition from "@/components/effects/SectionTransition";

// Page Metadata
export const metadata: Metadata = {
  title: "Cyber First Series | The GCC's Definitive Cybersecurity Summit",
  description:
    "Cyber First brings together CISOs, government cyber leaders, and security innovators across Abu Dhabi, Kuwait, Riyadh, and Doha. Register for the next edition.",
};

// Cyber First accent color for transitions
const CYBER_BLUE = "#01BBF5";

export default function CyberFirstPage() {
  return (
    <div>
      {/* 1. Hero — Dominant tagline, 4 edition badges, stats, CTA, ticker */}
      <SeriesHero />

      <SectionTransition variant="sweep" color={CYBER_BLUE} />

      {/* 2. Editions Map — Four nation city cards */}
      <EditionsMap />

      <SectionTransition variant="expand" color={CYBER_BLUE} />

      {/* 3. Series Timeline — Past history + future commitment */}
      <SeriesTimeline />

      <SectionTransition variant="pulse" color={CYBER_BLUE} />

      {/* 4. The Room — Peer group social proof & role breakdown */}
      <PastEditionsTimeline />

      <SectionTransition variant="sweep" color={CYBER_BLUE} />

      {/* 5. Outcomes — What attendees walk away with */}
      <AboutSeries />

      <SectionTransition variant="expand" color={CYBER_BLUE} />

      {/* 6. Market Insights — The urgency engine with stats */}
      <MarketInsights />

      <SectionTransition variant="pulse" color={CYBER_BLUE} />

      {/* 7. Speakers — Premium cards with grayscale-to-color photos */}
      <FeaturedSpeakers />

      <SectionTransition variant="sweep" color={CYBER_BLUE} />

      {/* 8. The Experience — Photo-backed conference elements */}
      <ConferenceElements />

      <SectionTransition variant="expand" color={CYBER_BLUE} />

      {/* 9. Sponsors — S3 logos with grayscale hover */}
      <SponsorsWall />

      <SectionTransition variant="pulse" color={CYBER_BLUE} />

      {/* 10. Gallery — Photo grid */}
      <CyberFirstGallery />

      <SectionTransition variant="sweep" color={CYBER_BLUE} />

      {/* 11. Video — Series highlights */}
      <VideoHighlight />

      {/* 12. YouTube Shorts — Quick clips & reels */}
      <YouTubeShorts />

      <SectionTransition variant="expand" color={CYBER_BLUE} />

      {/* 13. Register — Unified closer with countdown + form */}
      <UpcomingEditionCTA />

      <SectionTransition variant="sweep" color={CYBER_BLUE} />

      {/* 14. Explore Other Series — Cross-sell */}
      <ExploreOtherSeries />

      <SectionTransition variant="sweep" color={CYBER_BLUE} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
