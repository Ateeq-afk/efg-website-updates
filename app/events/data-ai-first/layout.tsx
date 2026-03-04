import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data & AI First | The GCC's Premier Data & AI Leadership Summit",
  description:
    "Data & AI First brings together CDOs, AI architects, and enterprise leaders across the GCC. Intelligence amplified — shaping the region's AI-driven future.",
};

export default function DataAIFirstLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
