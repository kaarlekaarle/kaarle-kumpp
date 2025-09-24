"use client";
import { useEffect } from "react";

export default function EqualMarginEngine() {
  useEffect(() => {
    const root = document.documentElement;


    const computeM = () => {
      const styles = getComputedStyle(root);
      const L  = parseFloat(styles.getPropertyValue("--kk-left-col"));
      const R  = parseFloat(styles.getPropertyValue("--kk-right-col"));
      const vw = window.innerWidth;

      // Detect if we're on About page
      const isAbout = !!document.querySelector('[data-id="right-block"]') && !!document.querySelector('[data-id="top"]');

      // HORIZONTAL M
      // Landing: three M gutters (left, middle, right) → (vw - (L + R)) / 3
      // About:   two M gutters (middle, right)         → (vw - (L + R)) / 2
      const Mh = (vw - (L + R)) / (isAbout ? 2 : 3);

      // VERTICAL M (both pages): M – top – M – content – M – bottom – M
      // Measure intrinsic heights present on the page:
      const works   = document.querySelector('[data-id="works"]') as HTMLElement | null;   // landing
      const heading = document.querySelector('[data-id="heading"]') as HTMLElement | null; // landing
      const aboutTop = document.querySelector('[data-id="top"]') as HTMLElement | null;    // about
      const rightBlk = document.querySelector('[data-id="right-block"]') as HTMLElement | null;
      const bottom  = document.querySelector('[data-id="about"]') as HTMLElement | null // landing
                    || document.querySelector('[data-id="bottom"]') as HTMLElement | null; // about

      const vh = window.innerHeight;
      const H_top   = (aboutTop?.offsetHeight ?? works?.offsetHeight ?? 0);
      const H_mid   = (rightBlk?.offsetHeight ?? heading?.offsetHeight ?? 0);
      const H_bot   = (bottom?.offsetHeight ?? 0);

      // 4 vertical M gaps
      const Mv = (vh - (H_top + H_mid + H_bot)) / 4;

      const M = Math.max(0, Math.min(Mv, Mh));
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