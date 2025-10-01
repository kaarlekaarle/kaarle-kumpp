export type Pt = { x:number; y:number };

export function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
export function rng(seed: number) {
  return function () {
    let t = (seed += 0x6D2B79F5) | 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v:number, lo:number, hi:number) => Math.max(lo, Math.min(hi, v));
const len = (p:Pt) => Math.hypot(p.x, p.y);
const sub = (a:Pt,b:Pt):Pt => ({x:a.x-b.x,y:a.y-b.y});
const add = (a:Pt,b:Pt):Pt => ({x:a.x+b.x,y:a.y+b.y});
const mul = (a:Pt,k:number):Pt => ({x:a.x*k,y:a.y*k});
const perp = (p:Pt):Pt => ({x:-p.y,y:p.x});
const norm = (p:Pt):Pt => { const L = len(p) || 1; return {x:p.x/L,y:p.y/L}; };

/** Fluid cubic Bézier with seeded normal-bend */
export function bezierPath(
  S: {x:number;y:number},
  E: {x:number;y:number},
  seedKey: string
): { d: string; width: number } {
  const rnd = rng(hashStr(seedKey));

  const dx = E.x - S.x;
  const dy = E.y - S.y;
  const d  = Math.hypot(dx, dy) || 1;

  // unit normal to the chord
  let nx = -dy / d, ny = dx / d;

  // choose bend direction: +1 = bow up, -1 = bow down (stable per edge)
  const bendSign = rnd() < 0.5 ? 1 : -1;
  nx *= bendSign; ny *= bendSign;

  // curvature with much more pronounced jitter for variety
  const r = Math.max(40, Math.min(500, 0.35 * d * (0.4 + 1.2 * rnd())));

  // enforce monotone X for controls to avoid hook-back, but add some variation
  const c1x = S.x + (0.2 + 0.1 * rnd()) * dx;
  const c2x = E.x - (0.2 + 0.1 * rnd()) * dx;

  // add extremely pronounced seeded "life" near the source so siblings don't stack
  const fanJitter = (rnd() - 0.5) * Math.min(150, 0.3 * d); // ± up to 150px, much more dramatic
  const jitterY   = fanJitter * ny;                          // along normal

  // control points; approach from left, never overshoot
  // Add much more dramatic variation to control point positioning
  const c1y = S.y + 0.25 * dy + (0.3 + 0.8 * rnd()) * r * ny + jitterY;
  const c2y = E.y - 0.25 * dy + (0.5 + 1.0 * rnd()) * r * ny;

  const dStr = `M ${S.x},${S.y} C ${c1x},${c1y} ${c2x},${c2y} ${E.x},${E.y}`;
  const width = 1 + 0.4 * rnd(); // solid stroke only

  return { d: dStr, width };
}
