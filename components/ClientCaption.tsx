export default function ClientCaption({
  summary,
  links,
}: {
  summary: string;
  links?: { icon?: string; url: string }[];
}) {
  return (
    <div className="h-full flex flex-col items-center justify-between" style={{minHeight: '150px'}}>
      {/* Caption - positioned closer to image (top of cell) */}
      <figcaption className="pt-4">
        <div className="mx-auto max-w-[73ch] text-black text-sm leading-relaxed space-y-1 text-center font-serif mobile:text-xs mobile:max-w-[60ch]">
          {Array.isArray(summary)
            ? summary.map((t, i) => <p key={i}>{t}</p>)
            : <p>{summary}</p>}
        </div>
      </figcaption>

      {/* Spacer to push links down */}
      <div className="flex-1"></div>

      {/* Links row - positioned at bottom of cell */}
      {links?.length ? (
        <div className="flex justify-center gap-4 pb-4">
          {links.map((l, idx) => (
            <a 
              key={idx} 
              href={l.url} 
              target="_blank" 
              rel="noreferrer" 
              aria-label={l.icon ?? "link"} 
              className="opacity-80 hover:opacity-100"
            >
              {l.icon ? (
                <img 
                  src={`/icons/${l.icon}.svg`} 
                  alt={l.icon}
                  className="w-5 h-5"
                />
              ) : (
                <span>{l.icon ?? "link"}</span>
              )}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
