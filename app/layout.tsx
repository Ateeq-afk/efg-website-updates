import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/effects/SmoothScrollProvider";
import CursorGlow from "@/components/effects/CursorGlow";
import ConditionalNavigation from "@/components/ui/ConditionalNavigation";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

// Plus Jakarta Sans — The voice that commands the room
// Geometric, clean, commanding — pure precision at display sizes
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  style: "normal",
});

// Outfit — The voice that explains
// Clean, modern, effortlessly legible
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// DM Sans — The quiet voice
// Used sparingly: testimonial quotes and the hidden sign-off
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Events First Group | Premium Technology Conferences Worldwide",
  description:
    "EFG runs premium technology conferences across Dubai, Riyadh, Abu Dhabi, Doha, Riyadh, and beyond — cybersecurity, OT security, digital transformation, and AI events for enterprise technology leaders.",
  keywords: [
    "technology conferences",
    "cybersecurity events",
    "enterprise tech summit",
    "Dubai conferences",
    "Riyadh technology events",
    "CISO summit",
    "digital transformation",
    "AI conferences",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Events First Group",
  url: "https://eventsfirstgroup.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://eventsfirstgroup.com/insights?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Events First Group",
  alternateName: "EFG",
  url: "https://eventsfirstgroup.com",
  logo: "https://eventsfirstgroup.com/logo.png",
  description:
    "Events First Group designs executive-grade technology summits across the Middle East, Africa, and Asia. Cyber First, OT Security First, Opex First, and Data & AI First.",
  foundingDate: "2023",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office M07, The Light Commercial Tower, Arjan",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971-4-883-4877",
    contactType: "customer service",
    email: "info@eventsfirstgroup.com",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.linkedin.com/company/events-first-group/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${outfit.variable} ${dmSans.variable}`}>
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Events First Group" />
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <SmoothScrollProvider>
          <CursorGlow />
          <ConditionalNavigation />
          <main>{children}</main>
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
