import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Analytics from "@/components/Analytics";
import { landing } from "@/data/site-copy";
import { kk } from "./fonts/kk";

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
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Kaarle & Kumppanit';
              src: url('/fonts/kaarle-kumppanit/kk_regular.otf') format('opentype');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
            
            @font-face {
              font-family: 'Garamond Premier';
              src: url('/fonts/garamond-premier/AGaramondPro-Regular.otf') format('opentype');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
            
            @font-face {
              font-family: 'Garamond Premier';
              src: url('/fonts/garamond-premier/AGaramondPro-Semibold.otf') format('opentype');
              font-weight: 600;
              font-style: normal;
              font-display: swap;
            }
            
            @font-face {
              font-family: 'Garamond Premier';
              src: url('/fonts/garamond-premier/AGaramondPro-Bold.otf') format('opentype');
              font-weight: bold;
              font-style: normal;
              font-display: swap;
            }
            
            body { 
              font-family: 'Garamond Premier', 'Times New Roman', serif;
            }
            
            h1, h2, h3, .font-sans { 
              font-family: 'Kaarle & Kumppanit', 'Arial', sans-serif;
            }
          `
        }} />
      </head>
      <body className={kk.variable}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
