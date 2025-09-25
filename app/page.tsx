import EMLayout from "@/components/EMLayout";

export default function Page(){
  return (
    <main className="bg-paper text-ink">
      <EMLayout
        topLabel="Works"
        leftMain={
          <div className="text-center leading-tight">
            <div className="uppercase tracking-wide font-normal text-[30px] font-sans">KAARLE</div>
            <div className="my-1 flex justify-center">
              <span className="text-[30px] font-sans">{String.fromCharCode(0xF8FF)}</span>
            </div>
            <div className="uppercase tracking-wide font-normal text-[30px] font-sans">KUMPP.</div>
          </div>
        }
        rightHeading="Problem solving and storytelling."
        rightBody={
          <>
            <br />
            <div className="font-serif leading-[1.4] text-[16px] text-accent font-semibold">
              <p>Everything starts with a question: <em>What are we doing here?</em><br />
              Once we agree on the task, I lay out a plan.<br />
              You need clarity, the right perspective, and the right people.<br />
              When we&apos;ve got those, we&apos;re halfway there.</p>
              <br />
              <p>Too often, projects get tangled<br />
              in too many hands, wasted time,<br />
              and money spent. Budgets grow,<br />
              meetings multiply, and the focus shifts<br />
              from solving the problem to justifying the invoices.</p>
              <br />
              <p>I do the work like it&apos;s mine. If I&apos;m not the man for the job,<br />
              I&apos;ll say so. I don&apos;t drag things out to look busy.<br />
              I don&apos;t bill by the hour. I charge by the solution.</p>
            </div>
            <p className="uppercase font-normal text-[20px] text-accent font-sans">What is your problem?</p>
          </>
        }
        bottomRightLabel="About"
        bottomRightHref="/about"
        leftBottomLine={
          <p className="text-[12px] tracking-wide text-center font-normal">
            <span className="font-sans">KAARLE HURTIG</span> &nbsp;|&nbsp;
            <span className="font-serif font-semibold">+358 440 522 753</span> &nbsp;|&nbsp;
            <a className="underline [font-style:oblique_10deg] font-serif font-semibold" href="mailto:kaarle.hurtig@gmail.com">kaarle.hurtig@gmail.com</a>
          </p>
        }
      />
    </main>
  );
}