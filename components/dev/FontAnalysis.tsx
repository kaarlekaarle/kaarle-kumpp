"use client";
import { useEffect } from "react";

export default function FontAnalysis() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const analyzeFonts = () => {
      console.group("🔍 FONT ANALYSIS - Right Column Sans Elements");
      
      // A) Query elements
      const elWorks = document.querySelector('[data-id="right-block"] a[href="/works"]') ||
                     document.querySelector('[data-id="right-top"] a');
      const elAbout = document.querySelector('[data-id="right-block"] a[href="/about"]') ||
                      document.querySelector('[data-id="right-bottom"] a');
      const elH2 = document.querySelector('[data-id="right-block"] h1, .about-prose h1, .about-prose .kicker');
      const elBody = document.querySelector('[data-id="right-block"] .about-prose p');

      console.log("Elements found:", {
        elWorks: !!elWorks,
        elAbout: !!elAbout, 
        elH2: !!elH2,
        elBody: !!elBody
      });

      // A) Computed styles analysis
      const propsToCheck = [
        "font-family", "font-size", "font-weight", "font-stretch", "font-style",
        "letter-spacing", "line-height", "text-transform", "font-feature-settings",
        "font-variation-settings", "font-optical-sizing", "font-kerning",
        "text-rendering", "-webkit-font-smoothing", "color"
      ];

      const getComputedProps = (node: Element, label: string) => {
        if (!node) return null;
        const computed = window.getComputedStyle(node);
        const obj: { [key: string]: string } = {};
        for (const prop of propsToCheck) {
          obj[prop] = computed.getPropertyValue(prop);
        }
        console.table({ [label]: obj });
        return { node, computed, styles: obj };
      };

      const worksData = elWorks ? getComputedProps(elWorks, "WORKS Link") : null;
      const aboutData = elAbout ? getComputedProps(elAbout, "ABOUT Link") : null;
      const h2Data = elH2 ? getComputedProps(elH2, "H2 Heading") : null;
      const bodyData = elBody ? getComputedProps(elBody, "Body Text") : null;

      // A) Synthetic bold detection
      console.group("🔍 SYNTHETIC BOLD DETECTION");
      [worksData, aboutData, h2Data].forEach((data, i) => {
        if (!data) return;
        const { node, computed } = data;
        const fam = computed.fontFamily;
        const w = computed.fontWeight;
        const weight = parseInt(w, 10);
        
        console.log(`Element ${i + 1}:`, {
          node: node.tagName + (node.className ? '.' + node.className.split(' ').join('.') : ''),
          fontFamily: fam,
          fontWeight: w,
          fontsCheck: document.fonts.check(`${w} 16px ${fam}`),
          syntheticBold: !document.fonts.check(`${w} 16px ${fam}`) ? "LIKELY" : "No"
        });
      });
      console.groupEnd();

      // B) CSS variable inspection
      console.group("🔍 CSS VARIABLES");
      const root = document.documentElement;
      const rootStyles = window.getComputedStyle(root);
      console.log("CSS Variables:", {
        "--font-sans": rootStyles.getPropertyValue('--font-sans'),
        "--font-serif": rootStyles.getPropertyValue('--font-serif'),
        "--fs-right": rootStyles.getPropertyValue('--fs-right'),
        "--fs-logo": rootStyles.getPropertyValue('--fs-logo')
      });
      console.groupEnd();

      // C) Font loading status
      console.group("🔍 FONT LOADING STATUS");
      const fontSans = rootStyles.getPropertyValue('--font-sans').trim();
      const fontSerif = rootStyles.getPropertyValue('--font-serif').trim();
      
      if (fontSans && fontSerif) {
        const fontChecks = [
          `400 16px ${fontSans}`,
          `700 16px ${fontSans}`, 
          `400 16px ${fontSerif}`,
          `700 16px ${fontSerif}`
        ];
        
        fontChecks.forEach(fontString => {
          try {
            console.log(`Font check "${fontString}":`, document.fonts.check(fontString));
          } catch (error) {
            console.warn(`Font check failed for "${fontString}":`, error);
          }
        });
      } else {
        console.warn("CSS font variables not found:", { fontSans, fontSerif });
      }
      console.groupEnd();

      // D) DOM path analysis
      console.group("🔍 DOM PATHS");
      [worksData, aboutData, h2Data].forEach((data, i) => {
        if (!data) {
          console.log(`Element ${i + 1}: Not found`);
          return;
        }
        const path = [];
        let current = data.node;
        while (current && current !== document.body) {
          const tag = current.tagName.toLowerCase();
          const classes = current.className ? '.' + current.className.split(' ').join('.') : '';
          const id = current.id ? '#' + current.id : '';
          const dataId = current.getAttribute('data-id') ? `[data-id="${current.getAttribute('data-id')}"]` : '';
          path.unshift(tag + classes + id + dataId);
          const parent = current.parentElement;
          if (!parent) break;
          current = parent;
        }
        console.log(`Element ${i + 1} path:`, path.join(' > '));
      });
      console.groupEnd();

      console.groupEnd();
    };

    // Run after fonts load
    if (document.fonts.ready instanceof Promise) {
      document.fonts.ready.then(analyzeFonts);
    } else {
      analyzeFonts();
    }
  }, []);

  return null;
}
