"use client";
import { useEffect } from "react";

export default function EqualMarginEngine() {
  useEffect(() => {
    const qs = (s:string)=>document.querySelector(s) as HTMLElement|null;
    const rectH = (el:HTMLElement|null)=> el? el.getBoundingClientRect().height : 0;

    const compute = () => {
      const L = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--kk-left-col"));
      const R = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--kk-right-col"));
      const Mh = (window.innerWidth - (L + R)) / 3;

      const hTop = rectH(qs('[data-id="works"]'));
      const hLeft = rectH(qs('[data-id="logo-col"]'));
      const hRight= rectH(qs('[data-id="right-block"]'));
      const hBot = rectH(qs('[data-id="about"]'));
      const content = Math.max(hLeft, hRight);

      const Mv = (window.innerHeight - (hTop + content + hBot)) / 4;
      const M = Math.max(0, Math.min(Mv, Mh));
      document.documentElement.style.setProperty("--kk-M", `${M}px`);
    };

    const ro = new ResizeObserver(compute);
    ['[data-id="works"]','[data-id="logo-col"]','[data-id="right-block"]','[data-id="about"]']
      .map(qs).forEach(el=> el && ro.observe(el));
    window.addEventListener("resize", compute);
    // fonts
    // @ts-ignore
    document.fonts?.ready?.then(compute);

    compute();
    return () => { ro.disconnect(); window.removeEventListener("resize", compute); };
  }, []);
  return null;
}