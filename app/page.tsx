import EMPage from "@/components/EMPage";
import EqualMarginEngine from "@/components/EqualMarginEngine";

export default function Page() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <EMPage
        topLabel="Works"
        leftSlot={
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
        }
        rightHeading="Problem solving and storytelling."
        rightBody={
          <div className="leading-[1.4] text-[16px] text-accent font-semibold" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
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
            <p className="mt-4 uppercase font-normal text-[20px] text-accent font-sans">
              What is your problem?
            </p>
          </div>
        }
        bottomLabel="About"
      />
      <EqualMarginEngine />
    </main>
  );
}