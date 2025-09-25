export default function EMLayout({
  topLabel, leftMain, rightHeading, rightBody, bottomRightLabel, bottomRightHref, leftBottomLine
}:{
  topLabel: string;
  leftMain: React.ReactNode;
  rightHeading: string;
  rightBody: React.ReactNode;
  bottomRightLabel: string;
  bottomRightHref: string;
  leftBottomLine?: React.ReactNode;
}){
  return (
    <div className="em">
      {/* top label centered */}
      <div className="row-start-2 col-start-4 self-center flex justify-center">
        <p data-id="works" className="uppercase tracking-wide font-normal text-[20px] font-sans leading-none">{topLabel}</p>
      </div>

      {/* left content row: out of flow, vertically centered */}
      <div className="row-start-4 col-start-2 left-cell">
        <div className="left-abs">{leftMain}</div>
      </div>

      {/* right content row: defines row height */}
      <article data-id="right-block" className="row-start-4 col-start-4 self-center max-w-[var(--right)] grid gap-[10px] text-center">
        <h1 className="uppercase tracking-wide font-normal text-[20px] text-accent font-sans leading-none">{rightHeading}</h1>
        <div className="text-left">{rightBody}</div>
      </article>

      {/* bottom row - just space */}
      <div className="row-start-6 col-start-2 left-cell">
        <div className="left-bottom">&nbsp;</div>
      </div>
      <div className="row-start-6 col-start-4 self-center flex justify-center">
        <a data-id="about" href={bottomRightHref} className="uppercase tracking-wide font-normal text-[20px] font-sans">
          {bottomRightLabel}
        </a>
      </div>
    </div>
  );
}