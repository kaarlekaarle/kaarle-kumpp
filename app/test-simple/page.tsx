import EMLayoutSimple from "@/components/EMLayoutSimple";

export default function TestSimplePage(){
  return (
    <main className="bg-paper text-ink">
      <div id="root">
        <EMLayoutSimple
          left={
            <div className="logo">
              <div className="text-center leading-tight" data-apple={String.fromCharCode(0xF8FF)}>
                <div className="uppercase tracking-wide font-normal text-[30px] font-sans">KAARLE</div>
                <div className="my-1">
                  <span className="uppercase tracking-wide font-normal text-[30px] font-sans apple-logo"></span>
                </div>
                <div className="uppercase tracking-wide font-normal text-[30px] font-sans">KUMPP.</div>
              </div>
            </div>
          }
          rightTop={<a href="/works" className="uppercase tracking-wide font-normal text-[20px] font-sans leading-none">WORKS</a>}
          rightMiddle={
            <div className="intro space-y-md">
              <h1 className="uppercase tracking-wide font-normal text-[20px] text-accent font-sans leading-none">Problem solving and storytelling.</h1>
              
              <div className="font-serif leading-[1.4] text-[16px] text-accent font-medium space-y-sm">
                <p>Everything starts with a question: <em>What are we doing here?</em> Once we agree on the task, I lay out a plan. You need clarity, the right perspective, and the right people. When we&apos;ve got those, we&apos;re halfway there.</p>
                
                <p>Too often, projects get tangled in too many hands, wasted time, and money spent. Budgets grow, meetings multiply, and the focus shifts from solving the problem to justifying the invoices.</p>
                
                <p>I do the work like it&apos;s mine. If I&apos;m not the man for the job, I&apos;ll say so. I don&apos;t drag things out to look busy. I don&apos;t bill by the hour. I charge by the solution.</p>
              </div>
              
              <p className="uppercase font-normal text-[20px] text-accent font-sans">What is your problem?</p>
            </div>
          }
          rightBottom={<a href="/about" className="uppercase tracking-wide font-normal text-[20px] font-sans">ABOUT</a>}
        />
      </div>
    </main>
  );
}
