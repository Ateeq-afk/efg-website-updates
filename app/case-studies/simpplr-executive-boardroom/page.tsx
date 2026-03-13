import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Executive Boardroom Case Study | Simpplr x Events First Group',
  description: 'How Simpplr partnered with Events First Group to connect with decision-makers and exceed attendance targets by 130%',
  robots: 'noindex, nofollow',
};

export default function SimpplrCaseStudy() {
  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <div className="max-w-[900px] mx-auto px-10 py-[60px]">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-[60px] pb-8 border-b border-gray-200">
          <div className="flex items-center gap-5">
            <Image 
              src="/case-studies/simpplr-logo.png" 
              alt="Simpplr" 
              width={96}
              height={24}
              className="h-6 w-auto"
            />
            <div className="w-px h-6 bg-gray-200" />
            <Image 
              src="/events-first-group_logo_alt.svg" 
              alt="Events First Group" 
              width={80}
              height={20}
              className="h-5 w-auto"
            />
          </div>
          <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide">
            Case Study
          </span>
        </header>

        {/* Hero */}
        <section className="text-center mb-[72px] py-12">
          <p className="text-[#FF6B4A] text-[13px] tracking-[1px] uppercase mb-5 font-semibold">
            Executive Boardroom Series
          </p>
          <h1 className="text-[48px] font-semibold tracking-tight mb-5 leading-[1.15]">
            Driving Enterprise Engagement Through Intimate Executive Dialogue
          </h1>
          <p className="text-lg text-gray-600 font-normal max-w-[600px] mx-auto leading-relaxed">
            How Simpplr partnered with Events First Group to connect with decision-makers and exceed attendance targets by 130%
          </p>
        </section>

        {/* Hero Image */}
        <div className="relative w-full h-[320px] rounded-2xl overflow-hidden mb-10">
          <Image 
            src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1200&h=500&fit=crop&q=80"
            alt="Executive boardroom meeting"
            fill
            className="object-cover"
          />
        </div>

        {/* Stats Grid */}
        <section className="grid grid-cols-3 gap-6 mb-[72px]">
          <StatCard number="48" label="Registrations" detail="240% of target" />
          <StatCard number="26" label="Attendees" detail="130% of target" />
          <StatCard number="92%" label="Engagement" detail="Active participation" />
        </section>

        {/* Executive Summary */}
        <Section label="Executive Summary" title="The Challenge">
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            Simpplr, the AI-powered employee experience platform, sought to establish thought leadership and generate high-quality pipeline among enterprise decision-makers in the MENA region. Traditional webinars and large-scale events weren&apos;t delivering the intimate, high-value conversations needed to influence C-suite buyers.
          </p>
          <p className="text-gray-600 text-base leading-relaxed">
            Events First Group designed and executed an exclusive Executive Boardroom experience—a curated, invitation-only roundtable at Rosewood Abu Dhabi, bringing together senior technology and HR leaders for candid discussions on the future of employee experience.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="relative h-[180px] rounded-xl overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80"
                alt="Executive discussion"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[180px] rounded-xl overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=600&h=400&fit=crop&q=80"
                alt="Business meeting"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Section>

        {/* Event Overview */}
        <Section label="Event Overview" title="The Experience">
          <div className="grid grid-cols-2 gap-4 mt-7">
            <OverviewItem label="Format" value="Executive Roundtable" />
            <OverviewItem label="Duration" value="Half-Day Experience" />
            <OverviewItem label="Venue" value="Rosewood Abu Dhabi" />
            <OverviewItem label="Exclusivity" value="Limited to 20 Executives" />
          </div>
        </Section>

        {/* Target Audience */}
        <Section label="Audience" title="Who Attended">
          <p className="text-gray-600 text-base leading-relaxed">
            We curated an audience of senior decision-makers from enterprise organizations across the GCC, focusing on roles with direct influence over employee experience, HR technology, and digital workplace investments.
          </p>
          <div className="relative w-full h-[240px] rounded-xl overflow-hidden mt-6">
            <Image 
              src="https://images.unsplash.com/photo-1560439514-4e9645039924?w=1200&h=500&fit=crop&q=80"
              alt="Executive networking event"
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6">
            <AudienceCard percent="31%" title="CHROs" />
            <AudienceCard percent="27%" title="VP HR / People" />
            <AudienceCard percent="23%" title="CIOs / CTOs" />
            <AudienceCard percent="19%" title="Directors" />
          </div>
        </Section>

        {/* Results Highlight */}
        <div className="bg-[#1A1A1A] rounded-2xl p-14 text-center my-14">
          <h3 className="text-base font-medium text-white/70 mb-2">Target: 20 Attendees</h3>
          <div className="text-[80px] font-bold text-[#FF6B4A] leading-none my-4">130%</div>
          <p className="text-base text-white/80 max-w-[420px] mx-auto leading-relaxed">
            We exceeded the attendance goal with 26 qualified executives joining the discussion—demonstrating the power of curated, exclusive experiences.
          </p>
        </div>

        {/* What We Delivered */}
        <Section label="Approach" title="What Events First Group Delivered">
          <ul className="mt-6">
            <DeliveryItem number={1} title="Strategic Audience Curation" description="Targeted outreach to C-suite and VP-level executives across enterprise organizations in the GCC, with rigorous qualification criteria." />
            <DeliveryItem number={2} title="Premium Branded Experience" description="Fully customized virtual environment with Simpplr branding, professional production, and seamless technical execution." />
            <DeliveryItem number={3} title="Content and Agenda Design" description="Collaborative development of discussion topics, speaker briefings, and moderation guide to ensure valuable conversations." />
            <DeliveryItem number={4} title="End-to-End Registration Management" description="Personalized invitation campaigns, registration portal, confirmation sequences, and reminders to maximize attendance." />
            <DeliveryItem number={5} title="Live Production and Hosting" description="Professional hosting, real-time moderation, technical support, and post-event recording delivery." />
            <DeliveryItem number={6} title="Post-Event Intelligence" description="Detailed attendee insights, engagement analytics, and qualified lead handoff for sales follow-up." last />
          </ul>
        </Section>

        {/* Timeline */}
        <Section label="Execution" title="Project Timeline">
          <div className="mt-7">
            <TimelineItem phase="Week 1-2" title="Strategy and Planning" description="Audience profiling, content development, platform setup, branding alignment" />
            <TimelineItem phase="Week 3-4" title="Outreach and Registration" description="Targeted invitations, qualification calls, registration management" />
            <TimelineItem phase="Week 5" title="Final Prep" description="Speaker briefings, technical rehearsals, attendee confirmations" />
            <TimelineItem phase="Event Day" title="Live Execution" description="Half-day executive roundtable at Rosewood Abu Dhabi with networking lunch" />
            <TimelineItem phase="Post-Event" title="Follow-Up" description="Recording delivery, insights report, sales handoff within 48 hours" last />
          </div>
        </Section>

        {/* Testimonial */}
        <div className="bg-gray-50 rounded-2xl p-12 my-14 border-l-4 border-[#FF6B4A]">
          <p className="text-xl font-normal leading-relaxed mb-6">
            &ldquo;The Executive Boardroom format delivered exactly what we needed—quality over quantity. The conversations were substantive, the attendees were decision-makers, and the follow-up opportunities were genuine. Events First Group understood our goals and executed flawlessly.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#FF6B4A] flex items-center justify-center text-white font-semibold">
              SM
            </div>
            <div>
              <h4 className="text-sm font-semibold">Senior Marketing Leader</h4>
              <p className="text-sm text-gray-400">Simpplr</p>
            </div>
          </div>
        </div>

        {/* Key Outcomes */}
        <Section label="Impact" title="Key Outcomes">
          <div className="grid grid-cols-2 gap-4 mt-7">
            <OverviewItem label="Pipeline Generated" value="12 Qualified Opportunities" />
            <OverviewItem label="Follow-Up Meetings" value="8 Scheduled Post-Event" />
            <OverviewItem label="NPS Score" value="72 (Excellent)" />
            <OverviewItem label="Engagement Rate" value="92% Active Participation" />
          </div>
        </Section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#FF6B4A] to-[#E5593A] rounded-xl p-10 px-12 flex items-center justify-between my-14">
          <div className="text-white">
            <h3 className="text-[22px] font-semibold mb-1">Ready to create your Executive Boardroom?</h3>
            <p className="text-sm opacity-90">Connect with decision-makers through curated experiences.</p>
          </div>
          <Link 
            href="mailto:ateeq@eventsfirstgroup.com"
            className="bg-white text-[#FF6B4A] px-7 py-3 rounded-lg text-sm font-semibold whitespace-nowrap hover:bg-gray-50 transition-colors"
          >
            Get in Touch
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-[72px] pt-8 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            <p>© 2026 Events First Group</p>
            <p className="mt-1 text-xs">Confidential - For prospective client review only</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Events First Group</p>
            <Link href="mailto:ateeq@eventsfirstgroup.com" className="text-[#FF6B4A] font-semibold text-sm">
              ateeq@eventsfirstgroup.com
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Components

function StatCard({ number, label, detail }: { number: string; label: string; detail: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
      <div className="text-[48px] font-bold text-[#FF6B4A] leading-none mb-2">{number}</div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
      <div className="text-xs text-gray-400 mt-1">{detail}</div>
    </div>
  );
}

function Section({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <p className="text-[#FF6B4A] text-xs tracking-[1.5px] uppercase mb-3 font-semibold">{label}</p>
      <h2 className="text-[28px] font-semibold mb-4 tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function OverviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl py-5 px-6">
      <h4 className="text-[11px] text-gray-400 uppercase tracking-[1px] mb-1.5 font-semibold">{label}</h4>
      <p className="text-base font-medium">{value}</p>
    </div>
  );
}

function AudienceCard({ percent, title }: { percent: string; title: string }) {
  return (
    <div className="bg-gray-50 rounded-xl py-6 px-4 text-center">
      <div className="text-[28px] font-bold text-[#FF6B4A] mb-2">{percent}</div>
      <div className="text-[13px] font-medium text-gray-600">{title}</div>
    </div>
  );
}

function DeliveryItem({ number, title, description, last = false }: { number: number; title: string; description: string; last?: boolean }) {
  return (
    <li className={`flex items-start gap-4 py-5 ${!last ? 'border-b border-gray-100' : ''}`}>
      <div className="w-8 h-8 bg-[#FF6B4A] rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0">
        {number}
      </div>
      <div>
        <h4 className="text-base font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </li>
  );
}

function TimelineItem({ phase, title, description, last = false }: { phase: string; title: string; description: string; last?: boolean }) {
  return (
    <div className={`flex gap-5 py-4 ${!last ? 'border-b border-gray-100' : ''}`}>
      <div className="w-[90px] flex-shrink-0">
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-medium">
          {phase}
        </span>
      </div>
      <div>
        <h4 className="text-[15px] font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
