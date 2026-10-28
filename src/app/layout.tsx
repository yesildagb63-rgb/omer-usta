import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

// latin-ext: İ, ı, ş, ğ gibi Türkçe karakterler için gerekli
const display = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: "/images/dukkan/dis-cephe.jpg", alt: "Ömer Usta tabela ve vitrin" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE.fullName,
  url: SITE.url,
  image: `${SITE.url}/images/dukkan/dis-cephe.jpg`,
  telephone: "+905380380087",
  servesCuisine: ["Turkish", "Pizza"],
  hasMenu: `${SITE.url}/menu`,
  sameAs: [SITE.instagramUrl],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Camikebir Mahallesi, Atatürk Bulvarı No: 123/A",
    postalCode: "63600",
    addressLocality: "Siverek",
    addressRegion: "Şanlıurfa",
    addressCountry: "TR",
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.lat, longitude: SITE.lng },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "00:00",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
