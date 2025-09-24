import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="container px-6 md:px-8 py-12 md:py-16">
        {/* 12-col, 3-rows layout */}
        <div
          className="
            grid grid-cols-12 gap-x-8 md:gap-x-10
            grid-rows-[auto_minmax(0,1fr)_auto]
          "
        >
          {/* Row 1: top label aligned to LEFT of right content */}
          <div className="row-start-1 col-start-8 col-span-5">
            <Link href="/works" className="text-sm md:text-base uppercase tracking-wide font-normal font-sans hover:text-accent transition-colors">
              WORKS
            </Link>
          </div>

          {/* Row 2: left logo block */}
          <div className="row-start-2 col-start-2 col-span-5 self-center">
            <div className="text-center leading-tight">
              <div className="text-3xl md:text-4xl font-normal uppercase tracking-wide font-sans">KAARLE</div>
              <div className="my-3 md:my-4 flex justify-center">
                <div className="w-12 h-12 border-2 border-gray-900 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-gray-900 rounded-full"></div>
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-normal uppercase tracking-wide font-sans">KUMPP.</div>
            </div>
          </div>

          {/* Row 2: right content block — shares row with logo */}
          <article className="row-start-2 col-start-8 col-span-5 self-center max-w-prose">
            <h1 className="text-xl md:text-2xl uppercase tracking-wide font-normal text-accent font-sans">
              PROBLEM SOLVING AND STORYTELLING.
            </h1>
            <div className="mt-4 md:mt-6 space-y-4 md:space-y-5 leading-relaxed md:leading-loose text-[15px] md:text-base text-accent" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
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
            <div className="text-lg md:text-xl font-normal uppercase tracking-wide text-accent mt-6 md:mt-8 font-sans">
              WHAT IS YOUR PROBLEM?
            </div>
          </article>

          {/* Row 3: contact centered under logo */}
          <div className="row-start-3 col-start-2 col-span-5 flex justify-center mt-8">
            <p className="text-xs md:text-sm tracking-wide">
              <span className="font-semibold font-sans">KAARLE HURTIG</span> &nbsp;|&nbsp; <span style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>+358 440 522 753</span> &nbsp;|&nbsp; <a className="underline" href="mailto:kaarle.hurtig@gmail.com" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>kaarle.hurtig@gmail.com</a>
            </p>
          </div>

          {/* Row 3: ABOUT aligned to LEFT of right content (same as WORKS) */}
          <div className="row-start-3 col-start-8 col-span-5 mt-8 flex">
            <Link href="/about" className="uppercase font-semibold text-sm md:text-base font-sans hover:text-accent transition-colors">
              ABOUT
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

