import Image from "next/image";
import Link from "next/link";
import EqualMarginEngine from "@/components/EqualMarginEngine";

export default function AboutPage() {
  const portraitSrc = "/images/portrait.jpg";

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* rows: M | top | M | right | M | bottom | M */}
      {/* cols: left (centered) | M | right | M */}
      <div className="min-h-screen grid
        grid-rows-[var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)]
        grid-cols-[1fr_var(--kk-M)_var(--kk-right-col)_var(--kk-M)]">

        {/* TOP LABEL (black, 20px) - aligned with right text block */}
        <div className="row-start-2 col-start-3 self-start">
          <p data-id="top" className="uppercase tracking-wide font-normal text-[20px] font-sans">Kaarle & Kumpp.</p>
        </div>

        {/* LEFT: contact card centered in flexible space */}
        <div data-id="left-card" className="row-start-4 col-start-1 self-center flex justify-center">
          <div className="text-center leading-tight">
            <div className="uppercase tracking-wide font-normal text-[18px] font-sans">KAARLE HURTIG</div>
            <div className="text-[12px] mt-1 font-semibold" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>+358 440 522 753</div>
            <div className="text-[12px]">
              <a className="underline [font-style:oblique_10deg] font-semibold" href="mailto:kaarle.hurtig@gmail.com" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>kaarle.hurtig@gmail.com</a>
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
              <a href="/files/Kaarle_Hurtig_CV.pdf" className="uppercase underline text-[12px] font-semibold" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT BLOCK (body only) */}
        <article data-id="right-block" className="row-start-4 col-start-3 self-start max-w-[var(--kk-right-col)]">
          <div className="mt-4 space-y-3 leading-[1.4] text-[16px] text-accent font-semibold" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
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
        </article>

        {/* BOTTOM NAV — 20px black, aligned with right col, centered vertically with left row */}
        <div className="row-start-6 col-start-3 flex items-center">
          <Link data-id="bottom" href="/works" className="uppercase tracking-wide font-normal text-[20px] font-sans">
            Works
          </Link>
        </div>
      </div>

      <EqualMarginEngine />
    </main>
  );
}
