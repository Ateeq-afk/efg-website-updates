import type { Metadata } from "next";

const BASE_URL = "https://eventsfirstgroup.com";
const PAGE_URL = `${BASE_URL}/events/opex-first`;
const OG_IMAGE = "https://efg-final.s3.eu-north-1.amazonaws.com/Good/4N8A0290.JPG";

export const metadata: Metadata = {
  title: "Opex First Series | The Premier Operational Excellence Summit",
  description:
    "Opex First brings together COOs, excellence leaders, and transformation architects. Where efficiency meets excellence — redefining operational brilliance across industries.",
  keywords: [
    "operational excellence summit",
    "OPEX conference",
    "COO summit",
    "business transformation conference",
    "process excellence event",
    "Opex First",
    "continuous improvement summit",
    "lean six sigma conference",
    "operational efficiency event",
    "enterprise transformation",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Opex First Series — The Premier Operational Excellence Summit",
    description:
      "COOs, excellence leaders, and transformation architects. Where efficiency meets excellence.",
    url: PAGE_URL,
    siteName: "Events First Group",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Opex First Series — Operational Excellence Summit",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Opex First Series — The Premier Operational Excellence Summit",
    description:
      "COOs and excellence leaders redefining operational brilliance.",
    images: [OG_IMAGE],
  },
};

export default function OpexFirstLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* EventSeries structured data — JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EventSeries",
            name: "Opex First Series",
            description:
              "The premier operational excellence summit series bringing together COOs, excellence leaders, and transformation architects.",
            url: PAGE_URL,
            image: [OG_IMAGE],
            organizer: {
              "@type": "Organization",
              name: "Events First Group",
              url: BASE_URL,
            },
            keywords:
              "operational excellence, OPEX, COO, business transformation, process excellence, continuous improvement, lean six sigma",
          }),
        }}
      />
      {children}
    </>
  );
}
