"use client";
import { useEffect } from "react";

export default function FontDiagnostic() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const checkFonts = () => {
      console.group("🔍 FONT DIAGNOSTIC");
      
      // Check CSS variables
      const rootStyles = window.getComputedStyle(document.documentElement);
      const fontSans = rootStyles.getPropertyValue('--font-sans');
      const fontSerif = rootStyles.getPropertyValue('--font-serif');
      
      console.log("CSS Variables:", {
        '--font-sans': fontSans,
        '--font-serif': fontSerif
      });

      // Check if fonts are loaded
      const checkFontLoad = async () => {
        try {
          await document.fonts.ready;
          console.log("Fonts ready:", document.fonts.ready);
          
          // Check specific font combinations with error handling
          let sansLoaded = false;
          let serifLoaded = false;
          
          try {
            if (fontSans) {
              sansLoaded = document.fonts.check(`16px ${fontSans}`);
            }
          } catch (error) {
            console.warn("Sans font check failed:", error);
          }
          
          try {
            if (fontSerif) {
              serifLoaded = document.fonts.check(`16px ${fontSerif}`);
            }
          } catch (error) {
            console.warn("Serif font check failed:", error);
          }
          
          console.log("Font loading status:", {
            'Sans font loaded': sansLoaded,
            'Serif font loaded': serifLoaded
          });

          // Check computed styles on elements
          const body = document.querySelector('body');
          const logo = document.querySelector('.logo');
          const prose = document.querySelector('.about-prose');
          
          if (body) {
            const bodyStyles = window.getComputedStyle(body);
            console.log("Body font:", {
              'font-family': bodyStyles.fontFamily,
              'font-size': bodyStyles.fontSize
            });
          }
          
          if (logo) {
            const logoStyles = window.getComputedStyle(logo);
            console.log("Logo font:", {
              'font-family': logoStyles.fontFamily,
              'font-size': logoStyles.fontSize
            });
          }
          
          if (prose) {
            const proseStyles = window.getComputedStyle(prose);
            console.log("Prose font:", {
              'font-family': proseStyles.fontFamily,
              'font-size': proseStyles.fontSize
            });
          }
          
        } catch (error) {
          console.error("Font check error:", error);
        }
      };
      
      checkFontLoad();
      console.groupEnd();
    };

    // Run after a delay to ensure fonts have time to load
    setTimeout(checkFonts, 1000);
  }, []);

  return null;
}
