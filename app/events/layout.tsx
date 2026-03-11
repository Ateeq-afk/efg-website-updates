import type { Metadata } from "next";

const BASE_URL = "https://eventsfirstgroup.com";
const PAGE_URL = `${BASE_URL}/events`;
const OG_IMAGE = "https://efg-final.s3.eu-north-1.amazonaws.com/Good/4N8A0290.JPG";

export const metadata: Metadata = {
  title: "Events | Executive Summits Across the Region — Events First Group",
  description:
    "Discover our portfolio of executive leadership summits — Cyber First, Data & AI First, Opex First, and OT Security First. CISOs, CDOs, COOs, and industry leaders across Kuwait, India, Kenya, and beyond.",
  keywords: [
    "executive summit",
    "leadership conference",
    "cybersecurity summit",
    "data AI conference",
    "operational excellence summit",
    "Events First Group",
    "CISO conference",
    "CDO summit",
    "technology events",
    "enterprise summit",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Events — Executive Summits Across the Region",
    description:
      "Cyber First, Data & AI First, Opex First, OT Security First. Leadership summits across Kuwait, India, Kenya, and beyond.",
    url: PAGE_URL,
    siteName: "Events First Group",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Events First Group — Executive Summits",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events — Executive Summits Across the Region",
    description:
      "Cyber First, Data & AI First, Opex First, OT Security First. Leadership summits for CISOs, CDOs, and COOs.",
    images: [OG_IMAGE],
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Organization structured data — JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Events First Group",
            url: BASE_URL,
            description:
              "Events First Group organizes executive leadership summits including Cyber First, Data & AI First, Opex First, and OT Security First across the Middle East, Africa, and Asia.",
            logo: `${BASE_URL}/logos/events-first-group.svg`,
            sameAs: [
              "https://www.linkedin.com/company/events-first-group",
            ],
            event: [
              {
                "@type": "EventSeries",
                name: "Cyber First Series",
                url: `${BASE_URL}/events/cyber-first`,
              },
              {
                "@type": "EventSeries",
                name: "Data & AI First Series",
                url: `${BASE_URL}/events/data-ai-first`,
              },
              {
                "@type": "EventSeries",
                name: "Opex First Series",
                url: `${BASE_URL}/events/opex-first`,
              },
              {
                "@type": "EventSeries",
                name: "OT Security First Series",
                url: `${BASE_URL}/events/ot-security-first`,
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
