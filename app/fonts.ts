import localFont from "next/font/local";

export const sans = localFont({
  src: [{ path: "./fonts/Inter-Regular.woff2", weight: "400" }],
  display: "swap",
  fallback: ["system-ui","-apple-system","Segoe UI","Arial"],
  adjustFontFallback: "Arial",
  preload: true,
  variable: "--font-sans"
});

export const serif = localFont({
  src: [{ path: "./fonts/GaramondPremiere-Regular.woff2", weight: "400" }],
  display: "swap",
  fallback: ["Times New Roman","Times","serif"],
  adjustFontFallback: "Times New Roman",
  preload: true,
  variable: "--font-serif"
});
