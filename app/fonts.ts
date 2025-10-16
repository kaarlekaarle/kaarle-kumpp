import localFont from "next/font/local";
import { EB_Garamond } from "next/font/google";

export const sans = localFont({
  src: "../public/fonts/kaarle-kumppanit/kk_regular.otf",
  variable: "--font-sans",
  preload: true,
  display: "swap",
  // Prefer serif as the fallback to ensure full glyph coverage
  fallback: ["Times New Roman", "Georgia", "serif"]
});

export const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Times New Roman", "serif"]
});
