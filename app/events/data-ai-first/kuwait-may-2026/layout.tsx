import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data & AI First Kuwait 2026 | Intelligence Amplified",
  description:
    "Kuwait's premier Data & AI leadership summit. May 18, 2026 in Kuwait City — convening CDOs, AI architects, and enterprise leaders to shape Kuwait's AI-driven future aligned with Vision 2035.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
