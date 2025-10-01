import EMLayout from "@/components/EMLayout";
import Image from "next/image";

export default function About(){
  return (
    <div className="route-about">
      <main className="bg-paper text-ink about-page">
      <EMLayout
        /* Desktop props - keep current desktop layout exactly as is */
        leftTop={null}
        leftMiddle={
          <div className="flex flex-col justify-between h-full">
            {/* Contact info at top, right-aligned */}
            <div className="flex-1 flex items-center justify-end">
              <div className="text-right leading-tight">
                <div className="uppercase tracking-wide font-normal text-lg sans">KAARLE HURTIG</div>
                <div className="text-sm mt-1 serif font-medium">+358 440 522 753</div>
                <div className="text-sm">
                  <a className="italic serif" href="mailto:kaarle.hurtig@gmail.com">kaarle.hurtig@gmail.com</a>
                </div>

                <div className="mt-4 flex justify-end">
                  <Image 
                    src="/images/portr2.png" 
                    alt="Portrait" 
                    width={158} 
                    height={191} 
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="pt-3 text-right">
                  <a href="/CV_Kaarle_Hurtig_2024_b.png" target="_blank" rel="noopener noreferrer" className="uppercase text-sm sans font-medium hover:underline">
                    Download CV
                  </a>
                </div>

                <div className="text-right">
                  <a href="https://www.linkedin.com/in/kaarle-hurtig/" target="_blank" rel="noopener noreferrer" className="uppercase text-sm sans font-medium hover:underline">
                    LINKEDIN
                  </a>
                </div>
              </div>
            </div>
            {/* Empty bottom space */}
            <div className="flex-shrink-0">
              {/* This creates the same spacing as the main page */}
            </div>
          </div>
        }
        rightTop={<a href="/works" className="uppercase tracking-wide font-normal text-xl sans leading-none">WORKS</a>}
        rightMiddle={
          <div className="intro about-prose body text-accent space-y-sm">
            <p>After working with projects and companies big and small,<br />
            I&apos;ve gotten good at figuring out the problem and solving it.<br />
            Setting the direction and finding the right people.<br />
            What the modern creative business loves<br />
            – workshops, cheap talk, fetishising the processes –<br />
            is what I steer away from. I design solutions that outlast me.</p>
            <p>Drawn to simple things that last, both in work and in life.<br />
            Inspired by photography, internet&apos;s early and future days,<br />
            crafty people, unorthodox thinking and big trees.</p>
            <p className="signoff"><em>Lives and works from Helsinki, Finland.</em></p>
          </div>
        }
        rightBottom={null}

        /* Mobile-only: use the same stack container the home page uses */
        left={
          /* reuse the same logo block we already use on the home mobile */
          <div className="left-cell flex items-center justify-center logo">
            <div className="text-center leading-tight" data-apple={String.fromCharCode(0xF8FF)}>
              <div className="uppercase tracking-wide font-normal text-4xl sans">KAARLE</div>
              <div className="my-1"><span className="uppercase tracking-wide font-normal text-4xl sans apple-logo"></span></div>
              <div className="uppercase tracking-wide font-normal text-4xl sans">KUMPP.</div>
            </div>
          </div>
        }

        mobileAdditionalContent={
          <section className="about-mobile">
            <div className="about-contact">
              <div className="contact">
                <span className="contact__name">KAARLE HURTIG</span>
                <span className="contact__phone">+358 440 522 753</span>
                <a className="contact__email" href="mailto:kaarle.hurtig@gmail.com">kaarle.hurtig@gmail.com</a>
              </div>
            </div>

            <figure className="about-photo">
              <Image 
                src="/images/portr2.png" 
                alt="Kaarle Hurtig portrait" 
                width={158} 
                height={191} 
                className="object-cover"
                priority
              />
            </figure>

            <div className="about-cv">
              <a href="/CV_Kaarle_Hurtig_2024_b.png" download>DOWNLOAD CV</a>
            </div>
          </section>
        }
      />
      </main>
    </div>
  );
}