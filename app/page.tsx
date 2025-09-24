import LogoMark from "@/components/LogoMark";
import MarginInspector from "@/components/MarginInspector";

export default function Page() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Outer grid sets equal margins top/bottom/left/right = G */}
      <div
        className="
          min-h-screen
          grid
          grid-rows-[var(--kk-g)_auto_var(--kk-g)]
          grid-cols-[var(--kk-g)_var(--kk-left)_var(--kk-gap)_var(--kk-right)_var(--kk-g)]
        "
      >
        {/* Row 1: WORKS (black), aligned to right column start */}
        <div className="row-start-1 col-start-4 self-end" data-id="works">
          <p className="uppercase tracking-wide font-normal font-sans" style={{ fontSize: "var(--kk-size-right)" }}>
            Works
          </p>
        </div>

        {/* Row 2: Left logo block; horizontally aligned with right text */}
        <div className="row-start-2 col-start-2 self-center" data-id="logo-col">
          <div className="text-center leading-tight">
            <div className="uppercase tracking-wide font-normal font-sans" style={{ fontSize: "var(--kk-size-logo)" }}>
              KAARLE
            </div>
            <div className="my-3 flex justify-center">
              <LogoMark size={28} />
            </div>
            <div className="uppercase tracking-wide font-normal font-sans" style={{ fontSize: "var(--kk-size-logo)" }}>
              KUMPP.
            </div>
          </div>
        </div>

        {/* Row 2: Right text block; body copy blue only */}
        <article className="row-start-2 col-start-4 self-center max-w-[var(--kk-right)]">
          <h1 className="uppercase tracking-wide font-normal text-accent font-sans" style={{ fontSize: "var(--kk-size-right)" }} data-id="heading">
            Problem solving and storytelling.
          </h1>
          <div className="mt-4 space-y-3 leading-[1.55] text-[15px] text-accent" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
            <p>Everything starts with a question: <em>What are we doing here?</em> Once we agree on the task, I lay out a plan. You need clarity, the right perspective, and the right people. When we&apos;ve got those, we&apos;re halfway there.</p>
            <p>Too often, projects get tangled in too many hands, wasted time, and money spent. Budgets grow, meetings multiply, and the focus shifts from solving the problem to justifying the invoices.</p>
            <p>I do the work like it&apos;s mine. If I&apos;m not the man for the job, I&apos;ll say so. I don&apos;t drag things out to look busy. I don&apos;t bill by the hour. I charge by the solution.</p>
          </div>
          <p className="mt-4 uppercase font-normal text-accent font-sans" style={{ fontSize: "var(--kk-size-right)" }} data-id="cta">
            What is your problem?
          </p>
        </article>

        {/* Row 3: Contact centered under logo; ABOUT centered on row; both same baseline center */}
        <div className="row-start-3 col-start-2 self-start flex justify-center items-center" data-id="contact">
          <p className="text-[13px] tracking-wide text-center font-normal">
            <span className="font-normal font-sans">KAARLE HURTIG</span> &nbsp;|&nbsp; <span style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>+358 440 522 753</span> &nbsp;|&nbsp;
            <a className="[font-style:oblique_10deg]" href="mailto:kaarle.hurtig@gmail.com" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>kaarle.hurtig@gmail.com</a>
          </p>
        </div>

        <div className="row-start-3 col-start-4 self-start flex items-center" data-id="about">
          <a href="/about" className="uppercase tracking-wide font-normal font-sans" style={{ fontSize: "var(--kk-size-right)" }}>
            About
          </a>
        </div>
      </div>
      
      <MarginInspector />
    </main>
  );
}