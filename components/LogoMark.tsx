export default function LogoMark({ size = 28, stroke = "#111111" }: { size?: number; stroke?: string }) {
  const s = size;
  const r = s / 2;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden="true">
      <circle cx={r} cy={r} r={r - 1} fill="none" stroke={stroke} strokeWidth="2" />
      <circle cx={r} cy={r} r={r/4} fill="none" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}
