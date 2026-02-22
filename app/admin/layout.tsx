import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "EFG Admin | Speakers & Sponsors",
  description: "Events First Group Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${plusJakarta.variable} ${outfit.variable}`}
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
        color: "#ffffff",
      }}
    >
      {children}
    </div>
  );
}
