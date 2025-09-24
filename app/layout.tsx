import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Analytics from "@/components/Analytics";
import { landing } from "@/data/site-copy";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Kaarle & Kumpp.",
  description: landing.intro,
  keywords: ["portfolio", "creative", "problem solving", "storytelling", "advertising", "strategy"],
  authors: [{ name: "Kaarle Hurtig" }],
  openGraph: {
    title: "Kaarle & Kumpp.",
    description: landing.intro,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaarle & Kumpp.",
    description: landing.intro,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
