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
      
      {/* Slide 1: Hero */}
      <section className="min-h-screen flex flex-col">
        <header className="flex justify-between items-center px-16 py-8">
          <div className="flex items-center gap-6">
            <Image 
              src="/case-studies/simpplr-logo.png" 
              alt="Simpplr" 
              width={120}
              height={30}
              className="h-7 w-auto"
            />
            <div className="w-px h-8 bg-gray-200" />
            <Image 
              src="/events-first-group_logo_alt.svg" 
              alt="Events First Group" 
              width={100}
              height={25}
              className="h-6 w-auto"
            />
          </div>
          <span className="text-[#FF6B4A] text-sm font-semibold tracking-wide">
            CASE STUDY
          </span>
        </header>
        
        <div className="flex-1 flex items-center justify-center px-16 pb-20">
          <div className="max-w-4xl text-center">
            <p className="text-[#FF6B4A] text-sm tracking-[2px] uppercase mb-6 font-semibold">
              Executive Boardroom Series
            </p>
            <h1 className="text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
              The Future of Employee Experience
            </h1>
            <p className="text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              An exclusive executive roundtable bringing together C-suite leaders to shape the future of workplace engagement
            </p>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
              <span>Rosewood Abu Dhabi</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>Half-Day Executive Experience</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>Invitation Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 2: The Challenge */}
      <section className="min-h-screen bg-gray-50 flex items-center px-16 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[#FF6B4A] text-xs tracking-[2px] uppercase mb-4 font-semibold">01 / The Challenge</p>
            <h2 className="text-5xl font-bold tracking-tight mb-8 leading-tight">
              Reaching Decision-Makers Who Matter
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              Simpplr, the AI-powered employee experience platform, sought to establish thought leadership among enterprise decision-makers in the MENA region.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              Traditional webinars weren&apos;t delivering the intimate, high-value conversations needed to influence C-suite buyers.
            </p>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&h=1000&fit=crop&q=80"
              alt="Executive boardroom"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Slide 3: The Solution */}
      <section className="min-h-screen flex items-center px-16 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-20 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&h=1000&fit=crop&q=80"
              alt="Executive networking"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[#FF6B4A] text-xs tracking-[2px] uppercase mb-4 font-semibold">02 / The Solution</p>
            <h2 className="text-5xl font-bold tracking-tight mb-8 leading-tight">
              An Exclusive Executive Boardroom
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Events First Group designed a curated, invitation-only roundtable at Rosewood Abu Dhabi—bringing together senior technology and HR leaders for candid discussions.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-[#FF6B4A] mb-1">20</div>
                <div className="text-sm text-gray-500">Target Executives</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-[#FF6B4A] mb-1">5hr</div>
                <div className="text-sm text-gray-500">Premium Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: Agenda */}
      <section className="min-h-screen bg-[#1A1A1A] text-white flex items-center px-16 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <p className="text-[#FF6B4A] text-xs tracking-[2px] uppercase mb-4 font-semibold">03 / The Experience</p>
            <h2 className="text-5xl font-bold tracking-tight">Boardroom Agenda</h2>
          </div>
          
          <div className="space-y-0">
            <AgendaItem 
              time="10:30 – 11:00" 
              title="Welcome & Introductions" 
              description="Setting the stage for meaningful dialogue"
              icon="👋"
            />
            <AgendaItem 
              time="11:00 – 11:30" 
              title="Keynote Presentation" 
              description="The evolution of employee experience in the AI era"
              icon="🎯"
            />
            <AgendaItem 
              time="11:30 – 11:50" 
              title="Industry Insights" 
              description="Regional trends and transformation stories"
              icon="💡"
            />
            <AgendaItem 
              time="11:50 – 12:20" 
              title="Coffee & Prayer Break" 
              description="Networking and refreshments"
              icon="☕"
            />
            <AgendaItem 
              time="12:20 – 1:00" 
              title="Executive Roundtable" 
              description="Facilitated discussion on challenges and opportunities"
              icon="🗣️"
            />
            <AgendaItem 
              time="1:00 – 1:10" 
              title="Q&A & Group Discussion" 
              description="Interactive session with key takeaways"
              icon="❓"
            />
            <AgendaItem 
              time="1:10 onwards" 
              title="Networking Lunch" 
              description="Premium dining experience"
              icon="🍽️"
              last
            />
          </div>
        </div>
      </section>

      {/* Slide 5: Audience */}
      <section className="min-h-screen flex items-center px-16 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <p className="text-[#FF6B4A] text-xs tracking-[2px] uppercase mb-4 font-semibold">04 / The Audience</p>
            <h2 className="text-5xl font-bold tracking-tight mb-6">Who Attended</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Senior decision-makers with direct influence over employee experience, HR technology, and digital workplace investments
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-8">
            <AudienceCard percent="31%" title="CHROs" subtitle="Chief HR Officers" />
            <AudienceCard percent="27%" title="VP HR" subtitle="VP People & Culture" />
            <AudienceCard percent="23%" title="CIOs/CTOs" subtitle="Technology Leaders" />
            <AudienceCard percent="19%" title="Directors" subtitle="HR & IT Directors" />
          </div>
        </div>
      </section>

      {/* Slide 6: Results - Big Number */}
      <section className="min-h-screen bg-gradient-to-br from-[#FF6B4A] to-[#E5593A] text-white flex items-center px-16 py-20">
        <div className="max-w-6xl mx-auto w-full text-center">
          <p className="text-white/70 text-xs tracking-[2px] uppercase mb-4 font-semibold">05 / The Results</p>
          <h2 className="text-2xl font-medium mb-4 opacity-80">Target: 20 Attendees</h2>
          <div className="text-[180px] font-bold leading-none mb-8">130%</div>
          <p className="text-2xl opacity-90 max-w-xl mx-auto leading-relaxed">
            We exceeded the attendance goal with 26 qualified executives joining the discussion
          </p>
        </div>
      </section>

      {/* Slide 7: Key Metrics */}
      <section className="min-h-screen flex items-center px-16 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <p className="text-[#FF6B4A] text-xs tracking-[2px] uppercase mb-4 font-semibold">06 / Key Metrics</p>
            <h2 className="text-5xl font-bold tracking-tight">By The Numbers</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            <MetricCard number="48" label="Registrations" detail="240% of target" />
            <MetricCard number="26" label="Attendees" detail="130% of target" />
            <MetricCard number="92%" label="Engagement" detail="Active participation" />
          </div>
          
          <div className="grid grid-cols-4 gap-6 mt-8">
            <SmallMetric number="12" label="Qualified Opportunities" />
            <SmallMetric number="8" label="Follow-up Meetings" />
            <SmallMetric number="72" label="NPS Score" />
            <SmallMetric number="48hr" label="Sales Handoff" />
          </div>
        </div>
      </section>

      {/* Slide 8: What We Delivered */}
      <section className="min-h-screen bg-gray-50 flex items-center px-16 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <p className="text-[#FF6B4A] text-xs tracking-[2px] uppercase mb-4 font-semibold">07 / Our Approach</p>
            <h2 className="text-5xl font-bold tracking-tight">What We Delivered</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            <DeliveryCard 
              number="01" 
              title="Strategic Audience Curation" 
              description="Targeted outreach to C-suite and VP-level executives with rigorous qualification criteria"
            />
            <DeliveryCard 
              number="02" 
              title="Premium Branded Experience" 
              description="Fully customized environment with Simpplr branding and seamless execution"
            />
            <DeliveryCard 
              number="03" 
              title="Content & Agenda Design" 
              description="Collaborative development of discussion topics and moderation guide"
            />
            <DeliveryCard 
              number="04" 
              title="Registration Management" 
              description="Personalized invitations, confirmation sequences, and attendance optimization"
            />
            <DeliveryCard 
              number="05" 
              title="Live Production" 
              description="Professional hosting, real-time moderation, and technical support"
            />
            <DeliveryCard 
              number="06" 
              title="Post-Event Intelligence" 
              description="Detailed insights, engagement analytics, and qualified lead handoff"
            />
          </div>
        </div>
      </section>

      {/* Slide 9: Testimonial */}
      <section className="min-h-screen bg-[#1A1A1A] text-white flex items-center px-16 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-12 opacity-20">&ldquo;</div>
          <p className="text-3xl font-light leading-relaxed mb-12">
            The Executive Boardroom format delivered exactly what we needed—quality over quantity. The conversations were substantive, the attendees were decision-makers, and the follow-up opportunities were genuine.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FF6B4A] flex items-center justify-center text-xl font-semibold">
              SM
            </div>
            <div className="text-left">
              <div className="font-semibold text-lg">Senior Marketing Leader</div>
              <div className="text-white/60">Simpplr</div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 10: CTA */}
      <section className="min-h-screen flex items-center px-16 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#FF6B4A] text-xs tracking-[2px] uppercase mb-6 font-semibold">Let&apos;s Talk</p>
          <h2 className="text-6xl font-bold tracking-tight mb-8">
            Ready to Create Your Executive Boardroom?
          </h2>
          <p className="text-2xl text-gray-500 mb-12 max-w-2xl mx-auto">
            Connect with decision-makers through curated, high-impact experiences designed for your audience.
          </p>
          <Link 
            href="mailto:ateeq@eventsfirstgroup.com"
            className="inline-flex items-center gap-3 bg-[#FF6B4A] text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-[#E5593A] transition-colors"
          >
            Get in Touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          <div className="mt-20 pt-12 border-t border-gray-200 flex justify-between items-center text-sm text-gray-400">
            <div>
              <p>© 2026 Events First Group</p>
              <p className="text-xs mt-1">Confidential - For prospective client review only</p>
            </div>
            <div className="flex items-center gap-6">
              <Image 
                src="/events-first-group_logo_alt.svg" 
                alt="Events First Group" 
                width={80}
                height={20}
                className="h-5 w-auto opacity-50"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Components

function AgendaItem({ time, title, description, icon, last = false }: { 
  time: string; 
  title: string; 
  description: string; 
  icon: string;
  last?: boolean;
}) {
  return (
    <div className={`flex items-center gap-8 py-6 ${!last ? 'border-b border-white/10' : ''}`}>
      <div className="w-40 text-white/50 font-mono text-lg flex-shrink-0">{time}</div>
      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-xl font-semibold mb-1">{title}</div>
        <div className="text-white/60">{description}</div>
      </div>
    </div>
  );
}

function AudienceCard({ percent, title, subtitle }: { percent: string; title: string; subtitle: string }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 text-center">
      <div className="text-5xl font-bold text-[#FF6B4A] mb-3">{percent}</div>
      <div className="text-xl font-semibold mb-1">{title}</div>
      <div className="text-sm text-gray-400">{subtitle}</div>
    </div>
  );
}

function MetricCard({ number, label, detail }: { number: string; label: string; detail: string }) {
  return (
    <div className="bg-white border-2 border-gray-100 rounded-2xl p-10 text-center">
      <div className="text-6xl font-bold text-[#FF6B4A] mb-3">{number}</div>
      <div className="text-xl font-semibold mb-1">{label}</div>
      <div className="text-sm text-gray-400">{detail}</div>
    </div>
  );
}

function SmallMetric({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 text-center">
      <div className="text-3xl font-bold text-[#1A1A1A] mb-1">{number}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function DeliveryCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="text-[#FF6B4A] font-mono text-sm font-semibold mb-4">{number}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}
