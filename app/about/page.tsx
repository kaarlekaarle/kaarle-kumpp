import EMLayout from "@/components/EMLayout";
import Image from "next/image";

export default function About(){
  return (
    <main className="bg-paper text-ink about-page">
      <EMLayout
        topLabel={`Kaarle ${String.fromCharCode(0xF8FF)} Kumpp.`}
        leftMain={
          <div className="leading-tight">
            <div className="uppercase tracking-wide font-normal text-[18px] font-sans">KAARLE HURTIG</div>
            <div className="text-[12px] mt-1 font-serif font-semibold">+358 440 522 753</div>
            <div className="text-[12px]">
              <a className="underline [font-style:oblique_10deg] font-serif font-semibold" href="mailto:kaarle.hurtig@gmail.com">kaarle.hurtig@gmail.com</a>
            </div>

            <div className="mt-4 flex justify-end">
              <Image 
                src="/images/portr2.png" 
                alt="Portrait" 
                width={280} 
                height={340} 
                className="object-cover"
                priority
              />
            </div>

            <div className="pt-3">
              <span className="uppercase text-[12px] font-sans font-semibold">
                Download CV
              </span>
            </div>
          </div>
        }
        rightHeading="Problem solving and storytelling."
        rightBody={
          <div className="font-serif leading-[1.4] text-[16px] text-accent font-semibold">
            <p>After working with projects and companies big and small,<br />
            I&apos;ve gotten good at figuring out the problem and solving it.<br />
            Setting the direction and finding the right people.<br />
            What the modern creative business loves<br />
            – workshops, cheap talk, fetishising the processes –<br />
            is what I steer away from. I design solutions that outlast me.</p>
            <br />
            <p>Drawn to simple things that last, both in work and in life.<br />
            Inspired by photography, internet&apos;s early and future days,<br />
            crafty people, unorthodox thinking and big trees.</p>
            <br />
            <p>Lives and works from Helsinki, Finland.</p>
          </div>
        }
        bottomRightLabel="Works"
        bottomRightHref="/works"
      />
    </main>
  );
}