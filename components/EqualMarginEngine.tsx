"use client";
import { useEffect } from "react";

export default function EqualMarginEngine() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;

    const qs = (sel: string) => document.querySelector(sel) as HTMLElement | null;

    const computeM = () => {
      const styles = getComputedStyle(document.documentElement);
      const L = parseFloat(styles.getPropertyValue("--kk-left-col"));
      const R = parseFloat(styles.getPropertyValue("--kk-right-col"));
      const vw = window.innerWidth;
      const Mh = (vw - (L + R)) / 3;

      const vh = window.innerHeight;
      const hTop = qs('[data-id="works"]')?.getBoundingClientRect().height ?? 0;
      const hRight = qs('[data-id="right-block"]')?.getBoundingClientRect().height ?? 0;
      const hLeft = qs('[data-id="logo-col"]')?.getBoundingClientRect().height ?? 0;
      const hMid = Math.max(hLeft, hRight);
      const hBot = qs('[data-id="about"]')?.getBoundingClientRect().height ?? 0;

      const Mv = (vh - (hTop + hMid + hBot)) / 4;
      const M = Math.max(0, Math.min(Mv, Mh));

      // Debug logging
      console.log("EM", {M, Htop: hTop, Hleft: hLeft, Hright: hRight, Hmid: hMid, Hbottom: hBot, Mv, Mh});

      // Detailed gap diagnostic
      const cs = getComputedStyle;
      const top = document.querySelector('[data-id="works"]');
      const right = document.querySelector('[data-id="right-block"]');
      const grid = document.querySelector('.min-h-screen.grid');
      if (top && right && grid) {
        const rows = cs(grid).gridTemplateRows;
        const gapPix = right.getBoundingClientRect().top - top.getBoundingClientRect().bottom;
        console.table({
          M: cs(document.documentElement).getPropertyValue('--kk-M'),
          grid_rows: rows,
          grid_gap: cs(grid).rowGap,
          top_h: top.getBoundingClientRect().height,
          top_mb: cs(top).marginBottom,
          right_mt: cs(right).marginTop,
          measured_gap: gapPix
        });
      }

      document.documentElement.style.setProperty("--kk-M", `${M}px`);
      
      // After computing M, also compute the right-block heading height if present
      const heading = document.querySelector('[data-id="heading"]') as HTMLElement | null;
      const rightTopOffset = heading ? heading.getBoundingClientRect().height : 0;
      document.documentElement.style.setProperty('--kk-right-top-offset', `${rightTopOffset}px`);
      
      return M;
    };

    // Recompute on resize, font load, and element size changes.
    const run = () => computeM();
    run();

    const onResize = () => run();
    window.addEventListener("resize", onResize);

    // Fonts
    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(run);
    }

    // Observe measured elements
    const ro = new ResizeObserver(run);
    ['[data-id="works"]','[data-id="logo-col"]','[data-id="right-block"]','[data-id="about"]']
      .map(qs)
      .filter(Boolean)
      .forEach(el => ro.observe(el!));

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  return null;
}