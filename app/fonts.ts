import localFont from "next/font/local";

export const sans = localFont({
  src: [{ path: "./fonts/kaarle-kumppanit/kk_regular.otf", weight: "400" }],
  variable: "--font-sans",
  preload: true,
  display: "swap",
  fallback: ["system-ui", "Arial"]
});

export const serif = localFont({
  src: [
    { path: "./fonts/garamond-premier/AGaramondPro-Regular.otf", weight: "400" },
    { path: "./fonts/garamond-premier/AGaramondPro-Semibold.otf", weight: "600" },
    { path: "./fonts/garamond-premier/AGaramondPro-Bold.otf", weight: "700" }
  ],
  variable: "--font-serif",
  preload: true,
  display: "swap",
  fallback: ["Times New Roman", "serif"]
});
