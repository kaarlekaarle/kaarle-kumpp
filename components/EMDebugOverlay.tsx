"use client";

import React, { useEffect, useRef } from "react";
import { useEqualMarginDebug } from "@/lib/useEqualMarginDebug";

export default function EMDebugOverlay() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    useEqualMarginDebug(document.body);

    const r = document.documentElement;
    const M = parseFloat(getComputedStyle(r).getPropertyValue('--kk-M')) || 0;
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.inset = '0';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    // visualize M bands
    el.style.background = `repeating-linear-gradient(
      to bottom,
      rgba(0,0,255,0.08) 0,
      rgba(0,0,255,0.08) ${M}px,
      transparent ${M}px,
      transparent ${M*2}px
    )`;
    document.body.appendChild(el);
    ref.current = el;
    return () => { el.remove(); };
  }, []);

  return null;
}
