import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Grid uses the single margin M for all gutters and inter-block gaps */}
      <div
        className="
          min-h-screen
          grid
          grid-rows-[var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)]
          grid-cols-[var(--kk-M)_var(--kk-left-col)_var(--kk-M)_var(--kk-right-col)_var(--kk-M)]
        "
      >
        {/* TOP LABEL — aligns to right column left edge, 24px, black */}
        <div className="row-start-2 col-start-4 self-start">
          <p className="uppercase tracking-wide font-normal text-[24px]">
            Kaarle & Kumpp.
          </p>
        </div>

        {/* LEFT COLUMN — contact card centered */}
        <section className="row-start-4 col-start-2 self-center">
          <div className="text-left leading-tight space-y-3">
            <div className="uppercase tracking-wide font-normal text-[18px]">KAARLE HURTIG</div>
            <div className="text-[15px]">+358 440 522 753</div>
            <div className="text-[15px]">
              <a className="underline [font-style:oblique_10deg]" href="mailto:kaarle.hurtig@gmail.com">
                kaarle.hurtig@gmail.com
              </a>
            </div>

            {/* Portrait */}
            <div className="mt-4">
              <Image
                src="/images/portrait.jpg" // replace with real asset
                alt="Portrait"
                width={280}
                height={340}
                className="object-cover bg-[#e5e5e5]"
                priority
              />
            </div>

            {/* CV link */}
            <div className="pt-3">
              <a href="/files/Kaarle_Hurtig_CV.pdf" className="uppercase underline text-[15px]">
                Download CV
              </a>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN — body copy; heading at 24px, paragraphs 15px accent */}
        <article className="row-start-4 col-start-4 self-start max-w-[var(--kk-right-col)]">
          <h1 className="uppercase tracking-wide font-normal text-[24px] text-ink">
            About
          </h1>

          <div className="mt-5 space-y-4 leading-[1.55] text-[15px] text-accent">
            <p>
              After working with projects and companies big and small, I&apos;ve gotten good at figuring
              out the problem and solving it. Setting the direction and finding the right people.
              What the modern creative business loves – workshops, cheap talk, fetishising the
              processes – is what I steer away from. I design solutions that outlast me.
            </p>
            <p>
              Drawn to simple things that last, both in work and in life. Inspired by photography,
              internet&apos;s early and future days, crafty people, unorthodox thinking and big trees.
            </p>
            <p><em>Lives and works from Helsinki, Finland.</em></p>
          </div>
        </article>

        {/* BOTTOM NAV — aligns to right column left edge, 24px, black, no underline */}
        <div className="row-start-6 col-start-4 flex items-center">
          <Link href="/works" className="uppercase tracking-wide font-normal text-[24px]">
            Works
          </Link>
        </div>
      </div>
    </main>
  );
}
