"use client";
import { useEffect } from "react";

export default function FontTest() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    // Test if fonts are loaded
    const testFonts = async () => {
      try {
        // Check if the custom fonts are available
        const sansLoaded = document.fonts.check("400 16px var(--font-sans)");
        const serifLoaded = document.fonts.check("400 16px var(--font-serif)");
        
        console.log("Font Test Results:");
        console.log("Sans font loaded:", sansLoaded);
        console.log("Serif font loaded:", serifLoaded);
        
        // Get computed styles from actual elements
        const worksLink = document.querySelector('[data-debug="nav-right"]') as HTMLElement;
        const proseElement = document.querySelector('.about-prose p') as HTMLElement;
        
        if (worksLink) {
          const worksStyles = window.getComputedStyle(worksLink);
          console.log("WORKS link font-family:", worksStyles.fontFamily);
          console.log("WORKS link font-size:", worksStyles.fontSize);
        }
        
        if (proseElement) {
          const proseStyles = window.getComputedStyle(proseElement);
          console.log("Prose font-family:", proseStyles.fontFamily);
          console.log("Prose font-size:", proseStyles.fontSize);
        }
        
        // Check CSS variables
        const rootStyles = window.getComputedStyle(document.documentElement);
        console.log("--font-sans CSS variable:", rootStyles.getPropertyValue('--font-sans'));
        console.log("--font-serif CSS variable:", rootStyles.getPropertyValue('--font-serif'));
        
      } catch (error) {
        console.error("Font test error:", error);
      }
    };

    // Run test after a short delay to ensure fonts have time to load
    setTimeout(testFonts, 1000);
  }, []);

  return null;
}
