import localFont from "next/font/local";

export const sans = localFont({
  src: [{ path: "./fonts/Inter-Regular.woff2", weight: "400" }],
  variable: "--font-sans",
  preload: true,
  display: "swap",
  fallback: ["system-ui","Arial"]
});

export const serif = localFont({
  src: [{ path: "./fonts/GaramondPremiere-Regular.woff2", weight: "400" }],
  variable: "--font-serif",
  preload: true,
  display: "swap",
  fallback: ["Times New Roman","serif"]
});
