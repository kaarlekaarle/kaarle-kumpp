export function getComputedFont(el: Element): string {
  const cs = getComputedStyle(el as HTMLElement);
  const style = [
    cs.fontStyle || "normal",
    cs.fontVariant || "normal",
    cs.fontWeight || "400",
    `${cs.fontSize}/${cs.lineHeight}`,
    cs.fontFamily || "sans-serif",
  ].join(" ");
  return style;
}

export function measureSpace(el: Element): number {
  // Canvas is fast and avoids DOM thrash
  const font = getComputedFont(el);
  const ctx = (measureSpace as { _ctx?: CanvasRenderingContext2D })._ctx || 
    ((measureSpace as { _ctx?: CanvasRenderingContext2D })._ctx = document.createElement("canvas").getContext("2d")!);
  ctx.font = font;
  const w = ctx.measureText(" ").width;
  // Fallback if fonts not loaded yet
  return w > 0 ? w : parseFloat(getComputedStyle(el as HTMLElement).fontSize) * 0.25;
}
