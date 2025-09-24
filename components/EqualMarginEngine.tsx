"use client";
import { useEffect } from "react";

export default function EqualMarginEngine() {
  useEffect(() => {
    const root = document.documentElement;


    const computeM = () => {
      // detect About by presence of top+right-block
      const isAbout = !!document.querySelector('[data-id="top"]') && !!document.querySelector('[data-id="right-block"]');

      const styles = getComputedStyle(document.documentElement);
      const L = parseFloat(styles.getPropertyValue("--kk-left-col"));
      const R = parseFloat(styles.getPropertyValue("--kk-right-col"));
      const vw = window.innerWidth;

      // horizontal M
      const Mh = (vw - (L + R)) / (isAbout ? 2 : 3);

      // vertical M uses whichever elements exist
      const vh = window.innerHeight;
      const hTop = (document.querySelector('[data-id="top"]') as HTMLElement)?.offsetHeight
                ?? (document.querySelector('[data-id="works"]') as HTMLElement)?.offsetHeight
                ?? 0;
      const hMid = (document.querySelector('[data-id="right-block"]') as HTMLElement)?.offsetHeight
                ?? (document.querySelector('[data-id="heading"]') as HTMLElement)?.offsetHeight
                ?? 0;
      const hBot = (document.querySelector('[data-id="bottom"]') as HTMLElement)?.offsetHeight
                ?? (document.querySelector('[data-id="about"]') as HTMLElement)?.offsetHeight
                ?? 0;

      const Mv = (vh - (hTop + hMid + hBot)) / 4;
      const M = Math.max(0, Math.min(Mv, Mh));
      
      // Debug logging
      console.log("EM", {M, Htop: hTop, contentHeight: hMid, Hbottom: hBot, Mv, Mh});
      
      // Fail the build if TOP has margins
      const topEl = document.querySelector('[data-id="works"]') as HTMLElement;
      if (topEl) {
        const mb = parseFloat(getComputedStyle(topEl).marginBottom || "0");
        if (mb !== 0) {
          console.warn("[EqualMargin] TOP has margin-bottom", mb);
        }
      }
      
      document.documentElement.style.setProperty("--kk-M", `${M}px`);
      return M;
    };

    // Iterate until --kk-M stabilizes (difference < 0.5px)
    let raf = 0;
    const step = () => {
      const M = computeM();
      if (M == null) return;
      const prev = parseFloat(getComputedStyle(root).getPropertyValue("--kk-M")) || 0;
      if (Math.abs(prev - M) < 0.5) return; // converged
      root.style.setProperty("--kk-M", `${M}px`);
      raf = requestAnimationFrame(step);
    };

    step();
    const onResize = () => { cancelAnimationFrame(raf); step(); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return null;
}