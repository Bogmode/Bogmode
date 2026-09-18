import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin", "cyrillic"], weight: ["400", "500"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "700"], variable: "--font-mono", display: "swap" });

export const metadata = {
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || "zT3WEs0CmnA5zPx7wuHpFaxDqGlPm0pPnIcOcyntrb8" },
  title: "БОГMODE — GTM systems, RevOps & automation",
  description: "Bogdan Tkachuk builds CRM architecture, lifecycle automation, commercial data systems, and AI-assisted internal tools. Based in Winnipeg and open to remote roles across Canada.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}<GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-WQKRQ7MEFG"} /></body>
    </html>
  );
}
