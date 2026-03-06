import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyber First India 2026 | New Delhi Cybersecurity Summit",
  description:
    "India's premier cybersecurity summit bringing together CISOs, government cyber leaders, and enterprise security executives. September 2026, New Delhi.",
  openGraph: {
    title: "Cyber First India 2026 | New Delhi",
    description:
      "Join 350+ security leaders at India's definitive cybersecurity summit. September 2026.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
