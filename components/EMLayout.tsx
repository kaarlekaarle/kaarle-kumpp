export default function EMLayout({ top, left, right, bottom }:{
  top: React.ReactNode; left: React.ReactNode; right: React.ReactNode; bottom: React.ReactNode;
}) {
  return (
    <div className="em">
      <div className="row-start-2 col-start-4 self-start">
        <p data-id="works" className="uppercase tracking-wide font-normal text-[20px] font-sans leading-none">{top}</p>
      </div>

      <div data-id="logo-col" className="row-start-4 col-start-2 self-center flex justify-center">{left}</div>

      <article data-id="right-block" className="row-start-4 col-start-4 self-start max-w-[var(--right)] grid gap-[10px]">
        {/* Always render a heading as first child to normalize internal top offset */}
        <h1 className="uppercase tracking-wide font-normal text-[20px] text-accent font-sans leading-none">Problem solving and storytelling.</h1>
        {right}
      </article>

      <div className="row-start-6 col-start-2 flex items-center justify-center">
        <p className="text-[12px] tracking-wide text-center font-normal">
          <span className="font-sans">KAARLE HURTIG</span> &nbsp;|&nbsp;
          <span className="font-serif font-semibold">+358 440 522 753</span> &nbsp;|&nbsp;
          <a className="underline [font-style:oblique_10deg] font-serif font-semibold" href="mailto:kaarle.hurtig@gmail.com">kaarle.hurtig@gmail.com</a>
        </p>
      </div>
      <div className="row-start-6 col-start-4 flex items-center">
        <div data-id="about" className="uppercase tracking-wide font-normal text-[20px] font-sans">{bottom}</div>
      </div>
    </div>
  );
}
