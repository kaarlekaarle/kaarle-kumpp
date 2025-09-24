"use client";
import { useEffect } from "react";

export default function EqualMarginEngine() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;

    const computeM = () => {
      // Now both pages use the same data-ids: works, logo-col, right-block, about
      const styles = getComputedStyle(document.documentElement);
      const L = parseFloat(styles.getPropertyValue("--kk-left-col"));
      const R = parseFloat(styles.getPropertyValue("--kk-right-col"));
      const vw = window.innerWidth;

      // horizontal M - both pages use same formula now
      const Mh = (vw - (L + R)) / 3;

      // vertical M - use unified data-ids
      const vh = window.innerHeight;
      const hTop = (document.querySelector('[data-id="works"]') as HTMLElement)?.offsetHeight ?? 0;
      const hMid = (document.querySelector('[data-id="right-block"]') as HTMLElement)?.offsetHeight ?? 0;
      const hBot = (document.querySelector('[data-id="about"]') as HTMLElement)?.offsetHeight ?? 0;

      const Mv = (vh - (hTop + hMid + hBot)) / 4;
      const M = Math.max(0, Math.min(Mv, Mh));

      // Debug logging
      console.log("EM", {M, Htop: hTop, contentHeight: hMid, Hbottom: hBot, Mv, Mh});

      // Runtime assertion to catch margin leakage
      const rb = document.querySelector('[data-id="right-block"]');
      if (rb) {
        const fc = rb.firstElementChild as HTMLElement | null;
        const mt = fc ? parseFloat(getComputedStyle(fc).marginTop) : 0;
        if (mt !== 0) console.warn('[M] right-block first-child marginTop leaking:', mt);
      }

      // Fail the build if TOP has margins
      const topEl = document.querySelector('[data-id="works"]') as HTMLElement;
      if (topEl) {
        const mb = parseFloat(getComputedStyle(topEl).marginBottom || "0");
        if (mb !== 0) {
          console.warn("[EqualMargin] TOP has margin-bottom", mb);
        }
      }

      // Log grid track sizes and margin analysis
      const grid = document.querySelector('.grid') || document.querySelector('[class*="grid"]');
      if (grid) {
        console.log('rows:', getComputedStyle(grid).gridTemplateRows);
      }

      const f = (sel: string) => {
        const e = document.querySelector(sel);
        return e ? getComputedStyle(e).marginTop : 'n/a';
      };
      console.table({
        about_firstChild_mt: f('[data-id="right-block"] > :first-child'),
        works_p_mb: getComputedStyle(document.querySelector('[data-id="works"] p') || document.createElement('div')).marginBottom
      });

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