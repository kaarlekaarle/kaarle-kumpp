import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* fixed container width for consistent alignment */}
      <div className="mx-auto max-w-6xl px-6 md:px-8 pt-16 md:pt-20 pb-16 md:pb-24">
        {/* 12-col grid with 3 logical rows */}
        <div className="grid grid-cols-12 gap-x-8 md:gap-x-10 grid-rows-[auto_minmax(0,1fr)_auto]">
          {/* Row 1: section label — left edge = right column start */}
          <div className="row-start-1 col-start-8 col-span-5">
            <Link href="/works" className="uppercase tracking-wide text-lg font-sans hover:text-accent transition-colors">
              Works
            </Link>
          </div>

          {/* Row 2: left logo block — vertically centered on same row as text */}
          <div className="row-start-2 col-start-2 col-span-5 self-center">
            <div className="text-center leading-tight">
              <div className="uppercase tracking-wide text-4xl md:text-5xl font-sans">KAARLE</div>
              <div className="my-3 md:my-4 flex justify-center">
                <div className="w-12 h-12 border-2 border-gray-900 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-gray-900 rounded-full"></div>
                </div>
              </div>
              <div className="uppercase tracking-wide text-4xl md:text-5xl font-sans">KUMPP.</div>
            </div>
          </div>

          {/* Row 2: right text block — shares left edge with WORKS/ABOUT */}
          <article className="row-start-2 col-start-8 col-span-5 self-center">
            <h1 className="uppercase tracking-wide text-accent text-3xl md:text-4xl font-sans">
              Problem solving and storytelling.
            </h1>
            <div className="mt-6 space-y-5 leading-relaxed md:leading-loose text-lg" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
              <p>
                Everything starts with a question: <em>What are we doing here?</em> Once we agree on the task, I lay out a plan. You need clarity, the right perspective, and the right people. When we&apos;ve got those, we&apos;re halfway there.
              </p>
              <p>
                Too often, projects get tangled in too many hands, wasted time, and money spent. Budgets grow, meetings multiply, and the focus shifts from solving the problem to justifying the invoices.
              </p>
              <p>
                I do the work like it&apos;s mine. If I&apos;m not the man for the job, I&apos;ll say so. I don&apos;t drag things out to look busy. I don&apos;t bill by the hour. I charge by the solution.
              </p>
            </div>
            <p className="mt-6 uppercase font-semibold text-accent text-xl md:text-2xl font-sans">What is your problem?</p>
          </article>

          {/* Row 3: contact — centered under logo */}
          <div className="row-start-3 col-start-2 col-span-5 mt-10 flex justify-center">
            <p className="text-sm tracking-wide text-center">
              <span className="font-semibold font-sans">KAARLE HURTIG</span> &nbsp;|&nbsp; <span style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>+358 440 522 753</span> &nbsp;|&nbsp;
              <a className="underline" href="mailto:kaarle.hurtig@gmail.com" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>kaarle.hurtig@gmail.com</a>
            </p>
          </div>

          {/* Row 3: ABOUT — same left edge as right text/WORKS */}
          <div className="row-start-3 col-start-8 col-span-5 mt-10">
            <Link href="/about" className="uppercase tracking-wide text-lg font-sans hover:text-accent transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

