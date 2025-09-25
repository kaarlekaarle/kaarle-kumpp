import Image from "next/image";
import Link from "next/link";
import EqualMarginEngine from "@/components/EqualMarginEngine";

export default function AboutPage() {
  const portraitSrc = "/images/portrait.jpg";

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* rows: M | works | M | right | M | about/contact | M */}
      {/* cols: left (centered) | M | right | M */}
      <div className="min-h-screen grid
        grid-rows-[var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)]
        grid-cols-[1fr_var(--kk-M)_var(--kk-right-col)_var(--kk-M)]">

        {/* KAARLE & KUMPP. (black, 20px) - aligned with right text block */}
        <div className="row-start-2 col-start-3 self-start">
          <p data-id="works" className="uppercase tracking-wide font-normal text-[20px] font-sans">Kaarle & Kumpp.</p>
        </div>

        {/* LEFT: contact card centered in flexible space */}
        <div data-id="logo-col" className="row-start-4 col-start-1 self-center flex justify-center">
          <div className="text-center leading-tight">
            <div className="uppercase tracking-wide font-normal text-[18px] font-sans">KAARLE HURTIG</div>
            <div className="text-[12px] mt-1 font-semibold" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>+358 440 522 753</div>
            <div className="text-[12px]">
              <a className="underline [font-style:oblique_10deg] font-semibold" href="mailto:kaarle.hurtig@gmail.com" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>kaarle.hurtig@gmail.com</a>
            </div>

            <div className="mt-4">
              <div className="w-[280px] h-[340px] bg-[#e5e5e5] flex items-center justify-center">
                <div className="text-[#999] text-sm">Portrait placeholder</div>
              </div>
            </div>

            <div className="pt-3">
              <span className="uppercase text-[12px] font-semibold" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
                Download CV
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT BLOCK (about text only) */}
        <article
          data-id="right-block"
          className="
            row-start-4 col-start-3 self-start max-w-[var(--kk-right-col)]
            grid gap-[10px]
            [&>*]:m-0
          "
        >
          <div className="space-y-3 leading-[1.4] text-[16px] text-accent font-semibold" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
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

        {/* BOTTOM ROW: contact and WORKS centered vertically, same row */}
        <div className="row-start-6 col-start-1 flex items-center justify-center">
          <p className="text-[12px] tracking-wide text-center font-normal">
            <span className="font-normal font-sans">KAARLE HURTIG</span> &nbsp;|&nbsp; <span className="font-semibold" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>+358 440 522 753</span> &nbsp;|&nbsp;
            <a className="underline [font-style:oblique_10deg] font-semibold" href="mailto:kaarle.hurtig@gmail.com" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>kaarle.hurtig@gmail.com</a>
          </p>
        </div>
        <div className="row-start-6 col-start-3 flex items-center">
          <Link data-id="about" href="/works" className="uppercase tracking-wide font-normal text-[20px] font-sans">Works</Link>
        </div>
      </div>

      <EqualMarginEngine />
    </main>
  );
}