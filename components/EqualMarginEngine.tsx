"use client";
import { useEffect } from "react";

export default function EqualMarginEngine() {
  useEffect(() => {
    const root = document.documentElement;

    const compute = () => {
      const works   = document.querySelector('[data-id="works"]')   as HTMLElement | null;
      const heading = document.querySelector('[data-id="heading"]') as HTMLElement | null;
      const cta     = document.querySelector('[data-id="cta"]')     as HTMLElement | null;
      const about   = document.querySelector('[data-id="about"]')   as HTMLElement | null;
      const logoCol = document.querySelector('[data-id="logo-col"]')as HTMLElement | null;

      if (!works || !heading || !cta || !about || !logoCol) return;

      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // Vertical content block from top of WORKS to bottom of ABOUT
      const topY = works.getBoundingClientRect().top;
      const bottomY = about.getBoundingClientRect().bottom;
      const contentH = bottomY - topY;

      // Vertical M: (viewport - content)/4
      const Mv = (vh - contentH) / 4;

      // Horizontal content width = leftCol + rightCol, gaps = 3M
      const styles = getComputedStyle(root);
      const leftCol  = parseFloat(styles.getPropertyValue("--kk-left-col"));
      
      // Get actual right column width from the rendered element
      const rightColElement = document.querySelector('article[data-id="heading"]') as HTMLElement;
      const rightCol = rightColElement ? rightColElement.getBoundingClientRect().width : 520; // fallback
      
      const Mh = (vw - (leftCol + rightCol)) / 3;

      // Use the limiting value so both axes fit
      const M = Math.max(0, Math.min(Mv, Mh));

      root.style.setProperty("--kk-M", `${M}px`);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(document.body);
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, []);

  return null;
}
