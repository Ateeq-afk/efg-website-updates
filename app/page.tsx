import {
  HeroSection,
  EventSeriesShowcase,
  ImpactBar,
  AnnualTimeline,
  NetworkFirst,
  PhotoGallery,
  WhyEFG,
  Testimonials,
  SponsorsPartners,
  Newsletter,
  Footer,
} from "@/components/sections";
import SectionTransition from "@/components/effects/SectionTransition";

export default function Home() {
  return (
    <div>
      {/* The Hero — The Promise */}
      <HeroSection />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" />

      {/* The Event Series — Four Worlds */}
      <EventSeriesShowcase />

      {/* The Impact Bar — Numbers That Matter (flows from Event Series via gradient) */}
      <ImpactBar />

      {/* Annual Timeline — The Year Ahead (flows directly from ImpactBar) */}
      <AnnualTimeline />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" />

      {/* NetworkFirst Boardrooms — Independent Brand */}
      <NetworkFirst />

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

      {/* Sponsors & Partners — The Credibility */}
      <SponsorsPartners />

      {/* Section Transition - Pulse */}
      <SectionTransition variant="pulse" />

      {/* Newsletter — The Connection */}
      <Newsletter />

      {/* Section Transition - Sweep */}
      <SectionTransition variant="sweep" />

      {/* Footer — The Credits */}
      <Footer />
    </div>
  );
}
