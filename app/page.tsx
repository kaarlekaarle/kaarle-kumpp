import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* 3 rows enforce equal top/bottom gaps */}
      <div className="min-h-screen grid grid-rows-[var(--kk-gap)_auto_var(--kk-gap)]">
        {/* Center row holds the two columns with fixed tracks */}
        <div className="row-start-2 mx-auto max-w-[1280px] px-6 md:px-8
                        grid grid-cols-[minmax(0,1fr)_420px_80px_520px_minmax(0,1fr)]
                        grid-rows-[auto_minmax(0,1fr)_auto] gap-x-0">

          {/* WORKS — black, 24px, aligned to RIGHT col start */}
          <div className="row-start-1 col-start-4">
            <Link href="/works" className="uppercase tracking-wide font-sans hover:text-accent transition-colors" style={{ fontSize: "var(--kk-right-size)" }}>
              Works
            </Link>
          </div>

          {/* LEFT logo — 36px, horizontally aligned with right text */}
          <div className="row-start-2 col-start-2 self-center">
            <div className="text-center leading-tight">
              <div className="uppercase tracking-wide font-sans" style={{ fontSize: "var(--kk-logo-size)" }}>KAARLE</div>
              <div className="my-2 flex justify-center">
                <span className="text-2xl">⌘</span>
              </div>
              <div className="uppercase tracking-wide font-sans" style={{ fontSize: "var(--kk-logo-size)" }}>KUMPP.</div>
            </div>
          </div>

          {/* RIGHT text block — key items 24px; body blue only */}
          <article className="row-start-2 col-start-4 self-center max-w-[520px]">
            <h1 className="text-accent font-normal font-sans" style={{ fontSize: "var(--kk-right-size)" }}>
              Problem solving and storytelling.
            </h1>
            <div className="mt-4 space-y-3 leading-[1.55] text-[15px] text-accent" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
              <p>Everything starts with a question: <em>What are we doing here?</em> Once we agree on the task, I lay out a plan. You need clarity, the right perspective, and the right people. When we&apos;ve got those, we&apos;re halfway there.</p>
              <p>Too often, projects get tangled in too many hands, wasted time, and money spent. Budgets grow, meetings multiply, and the focus shifts from solving the problem to justifying the invoices.</p>
              <p>I do the work like it&apos;s mine. If I&apos;m not the man for the job, I&apos;ll say so. I don&apos;t drag things out to look busy. I don&apos;t bill by the hour. I charge by the solution.</p>
            </div>
            {/* CTA — same size, normal weight */}
            <p className="mt-4 uppercase text-accent font-normal font-sans" style={{ fontSize: "var(--kk-right-size)" }}>
              What is your problem?
            </p>
          </article>

          {/* Contact — centered under logo; email italic and black */}
          <div className="row-start-3 col-start-2 mt-[var(--kk-gap)] flex justify-center">
            <p className="text-[13px] tracking-wide text-center">
              <span className="font-semibold font-sans">KAARLE HURTIG</span> &nbsp;|&nbsp; <span style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>+358 440 522 753</span> &nbsp;|&nbsp;
              <a className="italic" href="mailto:kaarle.hurtig@gmail.com" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>kaarle.hurtig@gmail.com</a>
            </p>
          </div>

          {/* ABOUT — black, same size, aligned with RIGHT col start; equal gap to bottom handled by outer grid */}
          <div className="row-start-3 col-start-4 mt-[var(--kk-gap)]">
            <Link href="/about" className="uppercase tracking-wide font-sans hover:text-accent transition-colors" style={{ fontSize: "var(--kk-right-size)" }}>
              About
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}