"use client";

type Pt = { x: number; y: number };
type Edge = { a: Pt; b: Pt };

export default function ConnectionsOverlay({ edges }: { edges: Edge[] }) {
  if (!edges.length) return null;
  return (
    <svg className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.a.x}
          y1={e.a.y}
          x2={e.b.x}
          y2={e.b.y}
          stroke="currentColor"
          strokeWidth="1"
          className="text-accent/70"
        />
      ))}
    </svg>
  );
}
