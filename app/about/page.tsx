import EMLayout from "@/components/EMLayout";

export default function About(){
  return (
    <main className="bg-paper text-ink">
      <EMLayout
        top="Kaarle & Kumpp."
        left={
          <div className="text-center leading-tight">
            <div className="uppercase tracking-wide font-normal text-[18px] font-sans">KAARLE HURTIG</div>
            <div className="text-[12px] mt-1 font-serif font-semibold">+358 440 522 753</div>
            <div className="text-[12px]">
              <a className="underline [font-style:oblique_10deg] font-serif font-semibold" href="mailto:kaarle.hurtig@gmail.com">kaarle.hurtig@gmail.com</a>
            </div>

            <div className="mt-4">
              <div className="w-[280px] h-[340px] bg-[#e5e5e5] flex items-center justify-center">
                <div className="text-[#999] text-sm">Portrait placeholder</div>
              </div>
            </div>

            <div className="pt-3">
              <span className="uppercase text-[12px] font-serif font-semibold">
                Download CV
              </span>
            </div>
          </div>
        }
        right={
          <>
            {/* keep heading to normalize internal offset */}
            <h1 className="uppercase tracking-wide font-normal text-[20px] text-accent font-sans leading-none">
              Problem solving and storytelling.
            </h1>
            <div className="leading-[1.4] text-[16px] text-accent font-semibold font-serif">
              <p>After working with projects and companies big and small,<br />
              I&apos;ve gotten good at figuring out the problem and solving it.<br />
              Setting the direction and finding the right people.<br />
              What the modern creative business loves<br />
              – workshops, cheap talk, fetishising the processes –<br />
              is what I steer away from. I design solutions that outlast me.</p>
              <p>Drawn to simple things that last, both in work and in life.<br />
              Inspired by photography, internet&apos;s early and future days,<br />
              crafty people, unorthodox thinking and big trees.</p>
              <p>Lives and works from Helsinki, Finland.</p>
            </div>
          </>
        }
        bottom={<a href="/works">Works</a>}
      />
    </main>
  );
}