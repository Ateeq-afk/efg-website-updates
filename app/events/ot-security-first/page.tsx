import { Metadata } from "next";
import {
  OTSeriesHero,
  OTEditionsMap,
  OTChairQuote,
  OTAboutSeries,
  OTMarketInsights,
  OTFeaturedSpeakers,
  OTExperience,
  OTWhoShouldAttend,
  OTSponsors,
  OTGallery,
  OTNextEditionCTA,
  OTRegistrationForm,
  OTExploreOtherSeries,
} from "@/components/ot-security-first";
import { Footer } from "@/components/sections";
import SectionTransition from "@/components/effects/SectionTransition";

// Page Metadata
export const metadata: Metadata = {
  title: "OT Security First | The Region's Only Critical Infrastructure Security Summit",
  description:
    "OT Security First brings together OT security leaders, industrial cybersecurity experts, and critical infrastructure defenders. Protecting what runs the world.",
};

// OT Security First accent color for transitions
const OT_CRIMSON = "#D34B9A";

export default function OTSecurityFirstPage() {
  return (
    <div>
      {/* 1. Series Hero — Industrial introduction */}
      <OTSeriesHero />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" color={OT_CRIMSON} />

      {/* 2. Editions Map — 4 GCC cities */}
      <OTEditionsMap />

      {/* Section Transition - Expand */}
      <SectionTransition variant="expand" color={OT_CRIMSON} />

      {/* 3. Conference Chair Quote */}
      <OTChairQuote />

      {/* Section Transition - Pulse */}
      <SectionTransition variant="pulse" color={OT_CRIMSON} />

      {/* 4. About the Series + 10 Themes */}
      <OTAboutSeries />

      {/* Section Transition - Pulse */}
      <SectionTransition variant="pulse" color={OT_CRIMSON} />

      {/* 4. Market Insights — OT threat statistics */}
      <OTMarketInsights />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" color={OT_CRIMSON} />

      {/* 5. Featured Speakers — 8 real speakers */}
      <OTFeaturedSpeakers />

      {/* Section Transition - Expand */}
      <SectionTransition variant="expand" color={OT_CRIMSON} />

      {/* 6. The Experience — The Full Arsenal */}
      <OTExperience />

      {/* Section Transition - Pulse */}
      <SectionTransition variant="pulse" color={OT_CRIMSON} />

      {/* 7. Who Should Attend — Self-qualification */}
      <OTWhoShouldAttend />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" color={OT_CRIMSON} />

      {/* 8. Sponsors + Media Partners */}
      <OTSponsors />

      {/* Section Transition - Expand */}
      <SectionTransition variant="expand" color={OT_CRIMSON} />

      {/* 9. Photo Gallery — Masonry placeholders */}
      <OTGallery />

      {/* Section Transition - Pulse */}
      <SectionTransition variant="pulse" color={OT_CRIMSON} />

      {/* 10. Upcoming Edition CTA */}
      <OTNextEditionCTA />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" color={OT_CRIMSON} />

      {/* 11. Registration Form */}
      <OTRegistrationForm />

      {/* Section Transition - Expand */}
      <SectionTransition variant="expand" color={OT_CRIMSON} />

      {/* 12. Explore Other Series — Cross-sell */}
      <OTExploreOtherSeries />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" color={OT_CRIMSON} />

      {/* 13. Footer */}
      <Footer />
    </div>
  );
}
