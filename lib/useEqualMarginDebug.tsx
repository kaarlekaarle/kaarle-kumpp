"use client";

import { useEffect } from "react";

type Q = (s: string) => HTMLElement | null;
const getH = (el: HTMLElement | null) => (el ? Math.round(el.getBoundingClientRect().height) : -1);

export function useEqualMarginDebug(root: HTMLElement | null) {
  useEffect(() => {
    if (!root) return;
    const q: Q = (s) => root.querySelector<HTMLElement>(s);

    const top = q('[data-id="works"]');          // top label
    const left = q('[data-id="logo-col"]');      // left column
    const right = q('[data-id="right-block"]');  // right column
    const bottom = q('[data-id="about"]');       // bottom label

    const cs = getComputedStyle(document.documentElement);
    const Mvar = cs.getPropertyValue('--kk-M').trim();

    const Htop = getH(top);
    const Hleft = getH(left);
    const Hright = getH(right);
    const Hbottom = getH(bottom);

    // margins/padding under TOP (likely culprit)
    const mTop = top ? parseFloat(getComputedStyle(top).marginBottom) : NaN;
    const pBotTop = top ? parseFloat(getComputedStyle(top).paddingBottom) : NaN;

    console.table({
      M_css_var: Mvar,
      H_top: Htop,
      H_left: Hleft,
      H_right: Hright,
      H_bottom: Hbottom,
      marginBottom_TOP: mTop,
      paddingBottom_TOP: pBotTop,
      contentHeight_max: Math.max(Hleft, Hright),
    });
  }, [root]);
}
