"use client";
import { useEffect } from "react";

export default function FontDebug() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const debugFonts = async () => {
      console.log("=== FONT DEBUG ===");
      
      // Check CSS variables
      const root = document.documentElement;
      const rootStyles = window.getComputedStyle(root);
      console.log("--font-sans CSS variable:", rootStyles.getPropertyValue('--font-sans'));
      console.log("--font-serif CSS variable:", rootStyles.getPropertyValue('--font-serif'));
      
      // Check if fonts are loaded
      const fonts = [
        "400 16px Kaarle Kumppanit",
        "400 16px var(--font-sans)",
        "400 16px EB Garamond",
        "400 16px var(--font-serif)"
      ];
      
      for (const font of fonts) {
        try {
          const isLoaded = document.fonts.check(font);
          console.log(`Font check "${font}":`, isLoaded);
        } catch (error) {
          console.log(`Font check "${font}" failed:`, error);
        }
      }
      
      // Check actual elements
      const worksLink = document.querySelector('[data-debug="nav-right"]') as HTMLElement;
      const logoText = document.querySelector('.logo .sans') as HTMLElement;
      const proseText = document.querySelector('.about-prose p') as HTMLElement;
      
      if (worksLink) {
        const styles = window.getComputedStyle(worksLink);
        console.log("WORKS link font-family:", styles.fontFamily);
        console.log("WORKS link font-size:", styles.fontSize);
        console.log("WORKS link font-weight:", styles.fontWeight);
      }
      
      if (logoText) {
        const styles = window.getComputedStyle(logoText);
        console.log("Logo text font-family:", styles.fontFamily);
        console.log("Logo text font-size:", styles.fontSize);
      }
      
      if (proseText) {
        const styles = window.getComputedStyle(proseText);
        console.log("Prose text font-family:", styles.fontFamily);
        console.log("Prose text font-size:", styles.fontSize);
      }
      
      // Try to load the font explicitly
      try {
        await document.fonts.load("400 16px Kaarle Kumppanit");
        console.log("Explicitly loaded Kaarle Kumppanit font");
      } catch (error) {
        console.error("Error loading Kaarle Kumppanit font:", error);
      }
      
      console.log("=== END FONT DEBUG ===");
    };

    // Run after fonts have time to load
    setTimeout(debugFonts, 2000);
  }, []);

  return null;
}
