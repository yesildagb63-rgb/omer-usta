import type { Metadata } from "next";
import LocationSection from "@/components/LocationSection";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Ömer Usta adres, telefon, çalışma saatleri ve harita. Siverek / Şanlıurfa.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return <LocationSection id="iletisim" headingLevel={1} />;
}
