import localFont from "next/font/local";
import { EB_Garamond } from "next/font/google";

export const sans = localFont({
  src: [{ path: "../public/fonts/kaarle-kumppanit/kk_regular.otf", weight: "400" }],
  variable: "--font-sans",
  preload: true,
  display: "swap",
  fallback: ["system-ui", "Arial"]
});

export const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Times New Roman", "serif"]
});
