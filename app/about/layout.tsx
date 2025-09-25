import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Kaarle & Kumpp.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-route="about">
      <body>{children}</body>
    </html>
  );
}
