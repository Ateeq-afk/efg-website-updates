import { Metadata } from "next";
import {
  SeriesHero,
  EditionsMap,
  PastEditionsTimeline,
  AboutSeries,
  MarketInsights,
  FeaturedSpeakers,
  ConferenceElements,
  WhoShouldAttend,
  SponsorsWall,
  CyberFirstGallery,
  VideoHighlight,
  UpcomingEditionCTA,
  RegistrationForm,
  ExploreOtherSeries,
} from "@/components/cyber-first";
import { Footer } from "@/components/sections";
import SectionTransition from "@/components/effects/SectionTransition";

// Page Metadata
export const metadata: Metadata = {
  title: "Cyber First Series | The GCC's Premier Cybersecurity Leadership Summit",
  description:
    "Cyber First brings together CISOs, government cyber leaders, and security innovators across Abu Dhabi, Kuwait, Riyadh, and Doha. Register for the next edition.",
};

// Cyber First accent color for transitions
const CYBER_BLUE = "#01BBF5";

export default function CyberFirstPage() {
  return (
    <div>
      {/* 1. Series Hero — 85vh dramatic introduction */}
      <SeriesHero />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" color={CYBER_BLUE} />

      {/* 2. Editions Map — Four city cards */}
      <EditionsMap />

      {/* Section Transition - Expand */}
      <SectionTransition variant="expand" color={CYBER_BLUE} />

      {/* 3. Past Editions Timeline — Series history */}
      <PastEditionsTimeline />

      {/* Section Transition - Pulse */}
      <SectionTransition variant="pulse" color={CYBER_BLUE} />

      {/* 4. About the Series — Two-column with themes */}
      <AboutSeries />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" color={CYBER_BLUE} />

      {/* 5. Market Insights — The urgency engine with stats */}
      <MarketInsights />

      {/* Section Transition - Expand */}
      <SectionTransition variant="expand" color={CYBER_BLUE} />

      {/* 6. Featured Speakers — 8-card grid */}
      <FeaturedSpeakers />

      {/* Section Transition - Pulse */}
      <SectionTransition variant="pulse" color={CYBER_BLUE} />

      {/* 7. Conference Elements — 6 cards */}
      <ConferenceElements />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" color={CYBER_BLUE} />

      {/* 8. Who Should Attend — Self-qualification */}
      <WhoShouldAttend />

      {/* Section Transition - Expand */}
      <SectionTransition variant="expand" color={CYBER_BLUE} />

      {/* 9. Sponsors Wall + Media Partners */}
      <SponsorsWall />

      {/* Section Transition - Pulse */}
      <SectionTransition variant="pulse" color={CYBER_BLUE} />

      {/* 10. Photo Gallery — Masonry grid */}
      <CyberFirstGallery />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" color={CYBER_BLUE} />

      {/* 11. Video Highlight — Emotional proof */}
      <VideoHighlight />

      {/* Section Transition - Expand */}
      <SectionTransition variant="expand" color={CYBER_BLUE} />

      {/* 12. Upcoming Edition CTA */}
      <UpcomingEditionCTA />

      {/* Section Transition - Pulse */}
      <SectionTransition variant="pulse" color={CYBER_BLUE} />

      {/* 13. Registration Form — Short version */}
      <RegistrationForm />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" color={CYBER_BLUE} />

      {/* 14. Explore Other Series — Cross-sell */}
      <ExploreOtherSeries />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" color={CYBER_BLUE} />

      {/* 15. Footer */}
      <Footer />
    </div>
  );
}
