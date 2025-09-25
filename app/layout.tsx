import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaarle & Kumpp.",
  description: "Problem solving and storytelling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-route="main">
      <body>{children}</body>
    </html>
  );
}