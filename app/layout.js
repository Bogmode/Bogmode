import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin", "cyrillic"], weight: ["400", "500"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "700"], variable: "--font-mono", display: "swap" });

const DESCRIPTION = "БОГMODE is Bogdan Tkachuk's studio in Winnipeg: drone simulation (SWARM), games and 3D worlds, interactive science, data tools and product experiments. Vision through the build.";

export const metadata = {
  metadataBase: new URL("https://bogmode.ca"),
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || "zT3WEs0CmnA5zPx7wuHpFaxDqGlPm0pPnIcOcyntrb8" },
  title: "БОГMODE — vision through the build",
  description: DESCRIPTION,
  applicationName: "БОГMODE",
  authors: [{ name: "Bogdan Tkachuk", url: "https://bogmode.ca" }],
  creator: "Bogdan Tkachuk",
  keywords: ["БОГMODE", "bogmode", "Bogdan Tkachuk", "Winnipeg", "drone simulator", "multi-drone mission planning", "three.js", "Godot", "interactive science", "data tools", "portfolio"],
  openGraph: {
    type: "website",
    url: "https://bogmode.ca",
    siteName: "БОГMODE",
    title: "БОГMODE — vision through the build",
    description: DESCRIPTION,
    locale: "en_CA",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "БОГMODE — Vision through the build." }],
  },
  twitter: { card: "summary_large_image", title: "БОГMODE — vision through the build", description: DESCRIPTION, images: ["/opengraph-image.png"] },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ECEBE5" },
    { media: "(prefers-color-scheme: dark)", color: "#131317" },
  ],
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": "https://bogmode.ca/#site", url: "https://bogmode.ca", name: "БОГMODE", inLanguage: "en-CA", publisher: { "@id": "https://bogmode.ca/#bogdan" } },
    {
      "@type": "Person", "@id": "https://bogmode.ca/#bogdan", name: "Bogdan Tkachuk", alternateName: "БОГMODE", url: "https://bogmode.ca",
      image: "https://bogmode.ca/icon-512.png",
      address: { "@type": "PostalAddress", addressLocality: "Winnipeg", addressRegion: "MB", addressCountry: "CA" },
      knowsLanguage: ["en", "uk", "ru"],
      sameAs: ["https://www.linkedin.com/in/bogmode/", "https://github.com/Bogmode", "https://www.instagram.com/bogmoder"],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />{children}<GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-WQKRQ7MEFG"} /></body>
    </html>
  );
}
