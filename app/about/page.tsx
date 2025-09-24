import Image from "next/image";
import EqualMarginEngine from "@/components/EqualMarginEngine";

export default function AboutPage() {
  // choose the existing file: change to .svg if that's what we have
  const portraitSrc = "/images/portrait.jpg";

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* rows: M | top | M | right | M | bottom | M
          cols: left | M | right | M */}
      <div className="
        min-h-screen grid
        grid-rows-[var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)]
        grid-cols-[var(--kk-left-col)_var(--kk-M)_var(--kk-right-col)_var(--kk-M)]
      ">

        {/* TOP LABEL — 24px black aligned to right col */}
        <div className="row-start-2 col-start-3 self-start">
          <p data-id="top" className="uppercase tracking-wide font-normal text-[24px] font-sans">
            Kaarle & Kumpp.
          </p>
        </div>

        {/* LEFT CARD — centered within LEFT column */}
        <section className="row-start-4 col-start-1 self-center" data-id="left-card">
          <div className="leading-tight">
            <div className="uppercase tracking-wide font-normal text-[18px] font-sans">KAARLE HURTIG</div>
            <div className="text-[15px]">+358 440 522 753</div>
            <div className="text-[15px]">
              <a className="underline [font-style:oblique_10deg]" href="mailto:kaarle.hurtig@gmail.com">
                kaarle.hurtig@gmail.com
              </a>
            </div>

            <div className="mt-4">
              <Image
                src={portraitSrc}
                alt="Portrait"
                width={280}
                height={340}
                className="object-cover bg-[#e5e5e5]"
                priority
              />
            </div>

            <div className="pt-3">
              <a href="/files/Kaarle_Hurtig_CV.pdf" className="uppercase underline text-[15px]">
                Download CV
              </a>
            </div>
          </div>
        </section>

        {/* RIGHT TEXT BLOCK — 24px heading black; body 15px accent */}
        <article className="row-start-4 col-start-3 self-start max-w-[var(--kk-right-col)]" data-id="right-block">
          <h1 className="uppercase tracking-wide font-normal text-[24px] text-ink font-sans">About</h1>
          <div className="mt-5 space-y-4 leading-[1.55] text-[15px] text-accent">
            <p>After working with projects and companies big and small, I&apos;ve gotten good at figuring out the problem and solving it. Setting the direction and finding the right people. What the modern creative business loves – workshops, cheap talk, fetishising the processes – is what I steer away from. I design solutions that outlast me.</p>
            <p>Drawn to simple things that last, both in work and in life. Inspired by photography, internet&apos;s early and future days, crafty people, unorthodox thinking and big trees.</p>
            <p><em>Lives and works from Helsinki, Finland.</em></p>
          </div>
        </article>

        {/* BOTTOM NAV — 24px black, aligned with right col, centered vertically with left row */}
        <div className="row-start-6 col-start-3 flex items-center">
          <a data-id="bottom" href="/works" className="uppercase tracking-wide font-normal text-[24px] font-sans">
            Works
          </a>
        </div>
      </div>

      <EqualMarginEngine />
    </main>
  );
}
