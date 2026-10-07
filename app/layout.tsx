import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import RevealObserver from "./components/reveal-observer";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});
const body = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "IronDäck — Däckverkstad i Göteborg", template: "%s · IronDäck" },
  description: "Däckbyte på 30 minuter, klimatsäkrat däckhotell, oljebyte, hjulinställning och bromskontroll i Göteborg. Boka online.",
  openGraph: {
    title: "IronDäck — Däckverkstad i Göteborg",
    description: "Däckbyte, däckhotell och service. Boka tid online på under en minut.",
    images: ["/images/hero.webp"],
    locale: "sv_SE",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0a0a0b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${display.variable} ${body.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
