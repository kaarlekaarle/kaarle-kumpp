import EMLayout from "@/components/EMLayout";

export default function Page(){
  return (
    <main className="bg-paper text-ink">
      <div id="root">
        <EMLayout
          left={
            <div className="left-cell flex flex-col justify-between h-full">
              {/* Logo centered in the middle */}
              <div className="flex-1 flex items-center justify-center logo">
              <div className="text-center leading-tight" data-apple={String.fromCharCode(0xF8FF)}>
                <div className="uppercase tracking-wide font-normal text-4xl sans">KAARLE</div>
                <div className="my-1">
                  <span className="uppercase tracking-wide font-normal text-4xl sans apple-logo"></span>
                </div>
                <div className="uppercase tracking-wide font-normal text-4xl sans">KUMPP.</div>
              </div>
              </div>
              {/* Contacts at the bottom, aligned with ABOUT */}
              <div className="flex-shrink-0 contact">
                <div className="contact text-center">
                  <span className="contact__name">KAARLE HURTIG</span>
                  <span className="contact__phone">+358 440 522 753</span>
                  <a className="contact__email" href="mailto:kaarle.hurtig@gmail.com">kaarle.hurtig@gmail.com</a>
                </div>
              </div>
            </div>
          }
          rightTop={<a href="/works" className="uppercase tracking-wide font-normal text-xl sans leading-none">WORKS</a>}
          rightMiddle={
            <div className="intro">
              <h1 className="kicker">Problem solving and storytelling.</h1>
              <div className="body text-accent space-y-sm">
                <p>Everything starts with a question: <em>What are we doing here?</em></p>
                <p>Once we agree on the task, I lay out a plan.</p>
                <p>You need clarity, the right perspective, and the right people.</p>
                <p>When we&apos;ve got those, we&apos;re halfway there.</p>
                <p>Too often, projects get tangled</p>
                <p>in too many hands, wasted time</p>
                <p>and money spent. Budgets grow,</p>
                <p>meetings multiply, and the focus shifts</p>
                <p>from solving the problem to justifying the invoices.</p>
                <p>I do the work like it&apos;s mine. If I&apos;m not the man for the job,</p>
                <p>I&apos;ll say so. I don&apos;t drag things out to look busy.</p>
                <p>I don&apos;t bill by the hour. I charge by the solution.</p>
              </div>
              <p className="kicker">What is your problem?</p>
            </div>
          }
          rightBottom={<a href="/about" className="uppercase tracking-wide font-normal text-xl sans">ABOUT</a>}
        />
      </div>
    </main>
  );
}