"use client";
import { useEffect } from "react";

export default function CompareFonts() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const debugFontComparison = async () => {
      // Query elements
      const elWorks = document.querySelector('[data-id="right-block"] [data-debug="nav-right"]') || 
                     document.querySelector('[data-id="right-top"] a, [data-id="right-block"] a[href="/works"]');
      const elHeading = document.querySelector('[data-id="right-block"] h1, [data-id="right-block"] .about-prose h1, [data-id="right-block"] .about-prose .kicker');

      if (!elWorks || !elHeading) {
        console.warn("CompareFonts: Missing elements", { elWorks: !!elWorks, elHeading: !!elHeading });
        return;
      }

      console.log("=== FONT COMPARISON DEBUG ===");
      console.log("WORKS element:", elWorks);
      console.log("HEADING element:", elHeading);

      // Properties to compare
      const fontProps = [
        "font-family", "font-size", "font-weight", "font-stretch", "font-style", 
        "font-variant", "font-variation-settings", "letter-spacing", "line-height", 
        "text-transform", "text-rendering", "-webkit-font-smoothing", 
        "font-feature-settings", "font-optical-sizing", "font-kerning", "color"
      ];

      // Get computed styles
      const stylesWorks = getComputedStyle(elWorks);
      const stylesHeading = getComputedStyle(elHeading);

      // Build comparison objects
      const worksProps: Record<string, string> = {};
      const headingProps: Record<string, string> = {};
      const diffProps: Record<string, { works: string; heading: string }> = {};

      fontProps.forEach(prop => {
        const worksValue = stylesWorks.getPropertyValue(prop);
        const headingValue = stylesHeading.getPropertyValue(prop);
        
        worksProps[prop] = worksValue;
        headingProps[prop] = headingValue;
        
        if (worksValue !== headingValue) {
          diffProps[prop] = { works: worksValue, heading: headingValue };
        }
      });

      // Log results
      console.table(worksProps);
      console.table(headingProps);
      
      if (Object.keys(diffProps).length > 0) {
        console.table(diffProps);
      } else {
        console.log("✅ No font property differences found");
      }

      // Check for synthetic bold
      const checkSyntheticBold = async (node: Element, name: string) => {
        const computed = getComputedStyle(node);
        const requested = parseInt(computed.fontWeight, 10);
        const family = computed.fontFamily;
        
        console.log(`${name} - Requested weight: ${requested}, Family: ${family}`);
        
        try {
          const available = await document.fonts.load(`${requested} 16px ${family}`);
          if (available.length === 0) {
            console.warn(`🚨 SYNTHETIC BOLD LIKELY for ${name}`);
          }
          
          // Check specific weights with error handling
          try {
            const check700 = document.fonts.check(`700 16px ${family}`);
            const check800 = document.fonts.check(`800 16px ${family}`);
            console.log(`${name} - 700 weight available: ${check700}, 800 weight available: ${check800}`);
          } catch (checkError) {
            console.warn(`Font check failed for ${name}:`, checkError);
          }
        } catch (error) {
          console.error(`Error checking fonts for ${name}:`, error);
        }
      };

      await checkSyntheticBold(elWorks, "WORKS");
      await checkSyntheticBold(elHeading, "HEADING");
    };

    // Run after a short delay to ensure DOM is ready
    setTimeout(debugFontComparison, 100);
  }, []);

  return null;
}
