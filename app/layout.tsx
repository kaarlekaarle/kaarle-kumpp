import type { Metadata } from "next";
import "./globals.css";
import { sans, serif } from "./fonts";

export const metadata: Metadata = {
  title: "Kaarle & Kumpp.",
  description: "Problem solving and storytelling.",
};

export default function Root({children}:{children:React.ReactNode}){
  return <html lang="en"><body className={`${sans.variable} ${serif.variable} font-sans`}>{children}</body></html>;
}