import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin", "cyrillic"], weight: ["400", "500"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "700"], variable: "--font-mono", display: "swap" });

export const metadata = {
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  title: "БОГMODE — Data, AI agents & automation",
  description: "Bogdan Tkachuk builds data systems, AI agents, and automations to solve messy business problems. Based in Winnipeg.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}<GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} /></body>
    </html>
  );
}
