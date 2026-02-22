import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opex First | The GCC's Premier Operational Excellence Summit Series",
  description:
    "Opex First brings together COOs, excellence leaders, and transformation architects across the GCC. Where efficiency meets excellence — redefining operational brilliance.",
};

export default function OpexFirstLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
