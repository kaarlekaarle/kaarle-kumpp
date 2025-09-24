import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-6 md:px-8 pt-20 md:pt-24 pb-20 md:pb-28">
        {/* 12-col, 3-rows grid. All align to these lines. */}
        <div className="grid grid-cols-12 gap-x-10 grid-rows-[auto_minmax(0,1fr)_auto]">
          
          {/* Row 1: section label — small, left edge = right column start */}
          <div className="row-start-1 col-start-8 col-span-5">
            <Link href="/works" className="uppercase tracking-wide text-sm md:text-[15px] font-normal font-sans hover:text-accent transition-colors">
              Works
            </Link>
          </div>

          {/* Row 2: left logo block — aligned horizontally with text row */}
          <div className="row-start-2 col-start-2 col-span-5 self-center">
            <div className="text-center leading-tight">
              <div className="uppercase tracking-wide text-[40px] md:text-[48px] font-sans">KAARLE</div>
              <div className="my-3 md:my-4 flex justify-center">
                <div className="w-12 h-12 border-2 border-gray-900 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-gray-900 rounded-full"></div>
                </div>
              </div>
              <div className="uppercase tracking-wide text-[40px] md:text-[48px] font-sans">KUMPP.</div>
            </div>
          </div>

          {/* Row 2: right content block — same left edge as WORKS/ABOUT */}
          <article className="row-start-2 col-start-8 col-span-5 self-center max-w-prose">
            <h1 className="uppercase tracking-wide text-accent text-[22px] md:text-[24px] font-normal font-sans">
              Problem solving and storytelling.
            </h1>
            <div className="mt-5 space-y-4 leading-[1.6] md:leading-[1.75] text-[15px] text-accent" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
              <p>Everything starts with a question: <em>What are we doing here?</em> Once we agree on the task, I lay out a plan. You need clarity, the right perspective, and the right people. When we&apos;ve got those, we&apos;re halfway there.</p>
              <p>Too often, projects get tangled in too many hands, wasted time, and money spent. Budgets grow, meetings multiply, and the focus shifts from solving the problem to justifying the invoices.</p>
              <p>I do the work like it&apos;s mine. If I&apos;m not the man for the job, I&apos;ll say so. I don&apos;t drag things out to look busy. I don&apos;t bill by the hour. I charge by the solution.</p>
              <p className="uppercase font-semibold">What is your problem?</p>
            </div>
          </article>

          {/* Row 3: contact — centered under logo */}
          <div className="row-start-3 col-start-2 col-span-5 mt-12 flex justify-center">
            <p className="text-[13px] md:text-sm tracking-wide text-center">
              <span className="font-semibold font-sans">KAARLE HURTIG</span> &nbsp;|&nbsp; <span style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>+358 440 522 753</span> &nbsp;|&nbsp;
              <a className="underline" href="mailto:kaarle.hurtig@gmail.com" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>kaarle.hurtig@gmail.com</a>
            </p>
          </div>

          {/* Row 3: ABOUT — same left edge and size as body */}
          <div className="row-start-3 col-start-8 col-span-5 mt-12">
            <Link href="/about" className="uppercase tracking-wide text-[15px] font-normal font-sans hover:text-accent transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}