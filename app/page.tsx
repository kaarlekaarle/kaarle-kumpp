import EqualMarginEngine from "@/components/EqualMarginEngine";

export default function Page() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* rows: M | works | M | right | M | about/contact | M */}
      {/* cols: left (centered) | M | right | M */}
      <div className="min-h-screen grid
        grid-rows-[var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)]
        grid-cols-[1fr_var(--kk-M)_var(--kk-right-col)_var(--kk-M)]">

        {/* WORKS (black, 20px) - aligned with right text block */}
        <div className="row-start-2 col-start-3 self-start">
          <p data-id="works" className="uppercase tracking-wide font-normal text-[20px] font-sans">Works</p>
        </div>

        {/* LEFT: logo centered in flexible space */}
        <div data-id="logo-col" className="row-start-4 col-start-1 self-center flex justify-center">
          <div className="text-center leading-tight">
            <div className="uppercase tracking-wide font-normal text-[30px] font-sans">KAARLE</div>
            <div className="my-3 flex justify-center">
              <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
                <circle cx="15" cy="15" r="14" fill="none" stroke="#111111" strokeWidth="2" />
                <circle cx="15" cy="15" r="7"  fill="none" stroke="#111111" strokeWidth="2" />
              </svg>
            </div>
            <div className="uppercase tracking-wide font-normal text-[30px] font-sans">KUMPP.</div>
          </div>
        </div>

        {/* RIGHT BLOCK (heading+body+cta) */}
        <article
          data-id="right-block"
          className="
            row-start-4 col-start-3 self-start max-w-[var(--kk-right-col)]
            grid gap-[10px]               /* prevents margin-collapse, controls spacing */
            [&>*]:m-0                     /* zero direct child margins */
          "
        >
          <h1 data-id="heading" className="uppercase tracking-wide font-normal text-[20px] text-accent font-sans">
            Problem solving and storytelling.
          </h1>
                    <div className="mt-4 space-y-3 leading-[1.4] text-[16px] text-accent font-semibold" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
            <p>Everything starts with a question: <em>What are we doing here?</em><br />
            Once we agree on the task, I lay out a plan.<br />
            You need clarity, the right perspective, and the right people.<br />
            When we&apos;ve got those, we&apos;re halfway there.</p>
            <p>Too often, projects get tangled<br />
            in too many hands, wasted time,<br />
            and money spent. Budgets grow,<br />
            meetings multiply, and the focus shifts<br />
            from solving the problem to justifying the invoices.</p>
            <p>I do the work like it&apos;s mine. If I&apos;m not the man for the job,<br />
            I&apos;ll say so. I don&apos;t drag things out to look busy.<br />
            I don&apos;t bill by the hour. I charge by the solution.</p>
          </div>
          <p data-id="cta" className="mt-4 uppercase font-normal text-[20px] text-accent font-sans">
            What is your problem?
          </p>
        </article>

        {/* BOTTOM ROW: contact and ABOUT centered vertically, same row */}
        <div className="row-start-6 col-start-1 flex items-center justify-center">
          <p className="text-[12px] tracking-wide text-center font-normal">
            <span className="font-normal font-sans">KAARLE HURTIG</span> &nbsp;|&nbsp; <span className="font-semibold" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>+358 440 522 753</span> &nbsp;|&nbsp;
            <a className="underline [font-style:oblique_10deg] font-semibold" href="mailto:kaarle.hurtig@gmail.com" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>kaarle.hurtig@gmail.com</a>
          </p>
        </div>
        <div className="row-start-6 col-start-3 flex items-center">
          <a data-id="about" href="/about" className="uppercase tracking-wide font-normal text-[20px] font-sans">About</a>
        </div>
      </div>

      <EqualMarginEngine />
    </main>
  );
}