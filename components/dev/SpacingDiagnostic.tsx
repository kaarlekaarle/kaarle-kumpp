"use client";
import { useEffect } from "react";

export default function SpacingDiagnostic() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const measureSpacing = () => {
      const rb = document.querySelector('.em [data-id="right-block"]');
      const topLink = rb?.querySelector('a[href="/works"]') || document.querySelector('[data-id="right-top"] a');
      const prose = rb?.querySelector('.about-prose');
      const botLink = rb?.querySelector('a[href="/about"]') || document.querySelector('[data-id="right-bottom"] a');
      const site = document.querySelector('.site-frame') || document.body;

      const cs = (el: Element | null) => el ? window.getComputedStyle(el) : null;
      const rect = (el: Element | null) => el?.getBoundingClientRect();

      const sv = (name: string) => window.getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      const edgeFluid = sv('--edge-fluid');
      const measure = sv('--measure');

      const rbCS = cs(rb);
      const rbRect = rect(rb);
      const siteRect = rect(site);
      const padTop = parseFloat(rbCS?.paddingTop || '0');
      const padBot = parseFloat(rbCS?.paddingBottom || '0');
      const padRight = parseFloat(rbCS?.paddingRight || '0');
      const gap = parseFloat(rbCS?.rowGap || rbCS?.gap || '0');

      const topRect = rect(topLink);
      const proseRect = prose ? rect(prose) : null;
      const botRect = rect(botLink);

      const gapAbove = proseRect && topRect ? (proseRect.top - topRect.bottom) : NaN;
      const gapBelow = botRect && proseRect ? (botRect.top - proseRect.bottom) : NaN;
      const distanceRightToBrowser = rbRect && siteRect ? (siteRect.right - rbRect.right) : NaN;

      console.table([
        { key: '--edge-fluid', value: edgeFluid },
        { key: '--measure', value: measure },
        { key: 'padding-top', value: padTop },
        { key: 'gap (row-gap)', value: gap },
        { key: 'gapAbove (WORKS→prose)', value: gapAbove },
        { key: 'gapBelow (prose→ABOUT)', value: gapBelow },
        { key: 'padding-bottom', value: padBot },
        { key: 'padding-right', value: padRight },
        { key: 'site right padding (browser→right-block edge)', value: distanceRightToBrowser }
      ]);
    };

    // Run after a short delay to ensure layout is complete
    setTimeout(measureSpacing, 100);
  }, []);

  return null;
}
