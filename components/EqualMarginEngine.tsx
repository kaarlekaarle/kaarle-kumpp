"use client";
import { useEffect } from "react";

export default function EqualMarginEngine() {
  useEffect(() => {
    const root = document.documentElement;

    const getPxVar = (name: string) =>
      parseFloat(getComputedStyle(root).getPropertyValue(name));

    const computeM = () => {
      const works   = document.querySelector('[data-id="works"]') as HTMLElement | null;
      const right   = document.querySelector('[data-id="right-block"]') as HTMLElement | null;
      const about   = document.querySelector('[data-id="about"]') as HTMLElement | null;

      if (!works || !right || !about) return null;

      // Intrinsic content heights (no gaps included because rows use auto for content)
      const H_works = works.offsetHeight;
      const H_right = right.offsetHeight;
      const H_about = Math.max(
        about.offsetHeight,
        (document.querySelector('[data-id="contact"]') as HTMLElement | null)?.offsetHeight || 0
      );

      const vh = window.innerHeight;
      // vertical M from remaining space: (vh - sum(content heights)) / 4
      const Mv = (vh - (H_works + H_right + H_about)) / 4;

      // horizontal M from remaining width: (vw - (left + right)) / 3
      const vw = window.innerWidth;
      const L  = getPxVar("--kk-left-col");
      const R  = getPxVar("--kk-right-col");
      const Mh = (vw - (L + R)) / 3;

      // Choose non-negative minimum so both axes fit
      return Math.max(0, Math.min(Mv, Mh));
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