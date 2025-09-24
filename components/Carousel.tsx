"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

export type Slide = { src: string; alt?: string; width?: number; height?: number };

type Props = {
  slides: Slide[];
  className?: string;
  initial?: number;
};

export default function Carousel({ slides, className, initial = 0 }: Props) {
  const [i, setI] = useState(Math.min(initial, Math.max(0, slides.length - 1)));
  const n = slides.length;
  const wrapRef = useRef<HTMLDivElement>(null);

  const go = useCallback((d: number) => {
    setI(prev => (prev + d + n) % n);
  }, [n]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go]);

  if (!n) return null;

  return (
    <div ref={wrapRef} className={["relative", className].filter(Boolean).join(" ")} aria-roledescription="carousel">
      <div className="relative w-full max-w-3xl aspect-[4/2.5] bg-black">
        <Image
          src={slides[i].src}
          alt={slides[i].alt ?? ""}
          fill
          className="object-contain"
          sizes="(min-width: 1024px) 768px, 90vw"
          priority
        />
      </div>

      {/* Prev */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-[-40px] top-1/2 -translate-y-1/2 select-none focus:outline-none underline"
      >
        ←
      </button>

      {/* Next */}
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-[-40px] top-1/2 -translate-y-1/2 select-none focus:outline-none underline"
      >
        →
      </button>

      {/* Dots */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2" role="tablist" aria-label="Slides">
        {slides.map((_, j) => (
          <button
            key={j}
            role="tab"
            aria-selected={j === i}
            aria-label={`Go to slide ${j + 1}`}
            onClick={() => setI(j)}
            className={`h-2 w-2 rounded-full ${j === i ? "bg-neutral-900" : "bg-neutral-400/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
