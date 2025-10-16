// components/caption/BalancedCaption.tsx
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { balanceCaption } from "./balanceCaption";

type Props = {
  text: string;
  /** A ref to the media element (img/video) used to compute width */
  mediaRef: React.RefObject<HTMLElement | HTMLImageElement>;
  /** optional max caption width inside media bounds, px (default = mediaW - 48) */
  insetPx?: number;
  className?: string;
};

export default function BalancedCaption({ text, mediaRef, insetPx = 120, className }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const roRef = useRef<ResizeObserver | null>(null);

  const compute = () => {
    const el = mediaRef.current;
    if (!el) {
      // Fallback: use a default width if mediaRef is not available
      const targetWidthPx = 400; // reasonable default
      const fontSize = getComputedStyle(document.documentElement).getPropertyValue("--caption-font-size") || "18px";
      const fontFamily = getComputedStyle(document.documentElement).getPropertyValue("--caption-font-family") || "Georgia, serif";
      const font = `${fontSize.trim()} ${fontFamily.trim()}`;
      const next = balanceCaption(text, { targetWidthPx, font });
      setLines(next);
      return;
    }
    
    const mediaW = el.getBoundingClientRect().width;
    if (mediaW <= 0) {
      // Fallback: use a default width if media width is not available
      const targetWidthPx = 400;
      const fontSize = getComputedStyle(document.documentElement).getPropertyValue("--caption-font-size") || "18px";
      const fontFamily = getComputedStyle(document.documentElement).getPropertyValue("--caption-font-family") || "Georgia, serif";
      const font = `${fontSize.trim()} ${fontFamily.trim()}`;
      const next = balanceCaption(text, { targetWidthPx, font });
      setLines(next);
      return;
    }
    
    const targetWidthPx = Math.max(280, mediaW - insetPx); // keep some side padding
    const fontSize = getComputedStyle(document.documentElement).getPropertyValue("--caption-font-size") || "18px";
    const fontFamily = getComputedStyle(document.documentElement).getPropertyValue("--caption-font-family") || "Georgia, serif";
    const font = `${fontSize.trim()} ${fontFamily.trim()}`;
    const next = balanceCaption(text, { targetWidthPx, font });
    setLines(next);
    // expose width to CSS for centering
    (containerRef.current as HTMLElement)?.style.setProperty("--caption-w", `${Math.min(targetWidthPx, mediaW)}px`);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    compute();
    const el = mediaRef.current;
    if (!el) return;

    roRef.current?.disconnect();
    roRef.current = new ResizeObserver(compute);
    roRef.current.observe(el);

    // recalc after fonts load
    (document as any).fonts?.ready?.then(compute);

    window.addEventListener("resize", compute, { passive: true });
    return () => {
      window.removeEventListener("resize", compute);
      roRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, mediaRef.current]);

  const content = useMemo(
    () => {
      if (lines.length === 0) {
        // Fallback: show the text as-is if balanceCaption fails
        return <span>{text}</span>;
      }
      return lines.map((ln, i) => <span key={i}>{ln}{i < lines.length - 1 ? <br /> : null}</span>);
    },
    [lines, text]
  );

  return (
    <div
      ref={containerRef}
      className={["kk-caption serif mx-auto text-center", className].filter(Boolean).join(" ")}
      aria-live="polite"
      style={{ 
        minHeight: '20px', 
        backgroundColor: 'rgba(255,0,0,0.1)', // temporary debug background
        border: '1px solid red' // temporary debug border
      }}
    >
      {content}
    </div>
  );
}
