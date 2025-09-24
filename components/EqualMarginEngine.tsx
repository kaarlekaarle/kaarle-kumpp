"use client";
import { useEffect } from "react";

export default function EqualMarginEngine() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Simple fixed margin system - no complex calculations
    const M = 80; // Fixed margin value
    document.documentElement.style.setProperty("--kk-M", `${M}px`);
  }, []);

  return null;
}