import EqualMarginEngine from "@/components/EqualMarginEngine";

export default function Page() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Rows:   M | WORKS | M | RIGHT | M | ABOUT/CONTACT | M */}
      {/* Columns: M | LEFT  | M | RIGHT | M */}
      <div
        className="
          min-h-screen
          grid
          grid-rows-[var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)]
          grid-cols-[var(--kk-M)_var(--kk-left-col)_var(--kk-M)_var(--kk-right-col)_var(--kk-M)]
        "
      >
        {/* WORKS (black, 24) */}
        <div className="row-start-2 col-start-4 self-start">
          <p data-id="works" className="uppercase tracking-wide font-normal text-[24px] font-sans">Works</p>
        </div>

        {/* LEFT column: logo centered */}
        <div data-id="logo-col" className="row-start-4 col-start-2 self-center">
          <div className="text-center leading-tight">
            <div className="uppercase tracking-wide font-normal text-[36px] font-sans">KAARLE</div>
            <div className="my-3 flex justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                <circle cx="14" cy="14" r="13" fill="none" stroke="#111111" strokeWidth="2" />
                <circle cx="14" cy="14" r="7"  fill="none" stroke="#111111" strokeWidth="2" />
              </svg>
            </div>
            <div className="uppercase tracking-wide font-normal text-[36px] font-sans">KUMPP.</div>
          </div>
        </div>

        {/* RIGHT text block: heading/body/cta; key labels 24; body blue only */}
        <article className="row-start-4 col-start-4 self-start max-w-[var(--kk-right-col)]">
          <h1 data-id="heading" className="uppercase tracking-wide font-normal text-[24px] text-accent font-sans">
            Problem solving and storytelling.
          </h1>
          <div className="mt-4 space-y-3 leading-[1.55] text-[15px] text-accent" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
            <p>Everything starts with a question: <em>What are we doing here?</em> Once we agree on the task, I lay out a plan. You need clarity, the right perspective, and the right people. When we&apos;ve got those, we&apos;re halfway there.</p>
            <p>Too often, projects get tangled in too many hands, wasted time, and money spent. Budgets grow, meetings multiply, and the focus shifts from solving the problem to justifying the invoices.</p>
            <p>I do the work like it&apos;s mine. If I&apos;m not the man for the job, I&apos;ll say so. I don&apos;t drag things out to look busy. I don&apos;t bill by the hour. I charge by the solution.</p>
          </div>
          <p data-id="cta" className="mt-4 uppercase font-normal text-[24px] text-accent font-sans">
            What is your problem?
          </p>
        </article>

        {/* CONTACT and ABOUT share the same row; center-aligned vertically */}
        <div data-id="contact" className="row-start-6 col-start-2 flex items-center justify-center">
          <p className="text-[13px] tracking-wide text-center font-normal">
            <span className="font-normal font-sans">KAARLE HURTIG</span> &nbsp;|&nbsp; <span style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>+358 440 522 753</span> &nbsp;|&nbsp;
            <a className="underline [font-style:oblique_10deg]" href="mailto:kaarle.hurtig@gmail.com" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>kaarle.hurtig@gmail.com</a>
          </p>
        </div>

        <div className="row-start-6 col-start-4 flex items-center">
          <a data-id="about" href="/about" className="uppercase tracking-wide font-normal text-[24px] font-sans">About</a>
        </div>
      </div>

      {/* Compute and enforce M */}
      <EqualMarginEngine />
    </main>
  );
}