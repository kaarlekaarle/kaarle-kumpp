import EMLayout from "@/components/EMLayout";
import Image from "next/image";
import LogoMark from "@/components/LogoMark";
import Appleify from "@/components/Appleify";
import LogLeftCol from "@/components/dev/LogLeftCol";
import CompareFonts from "@/components/dev/CompareFonts";
import FontAnalysis from "@/components/dev/FontAnalysis";

export default function About(){
  const contactBlock = (
    <div className="text-right leading-tight">
      <div className="uppercase tracking-wide font-normal sans">KAARLE HURTIG</div>
      <div className="mt-1 serif font-medium">+358 440 522 753</div>
      <div>
        <a className="italic serif" href="mailto:kaarle.hurtig@gmail.com">kaarle.hurtig@gmail.com</a>
      </div>
    </div>
  );

  const photoBlock = (
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
  );

  const linksBlock = (
    <>
      <div className="pt-3 text-right">
        <a href="/CV_Kaarle_Hurtig_2024_b.png" target="_blank" rel="noopener noreferrer" className="uppercase sans font-medium hover:underline">
          Download CV
        </a>
      </div>
      <div className="text-right">
        <a href="https://www.linkedin.com/in/kaarle-hurtig/" target="_blank" rel="noopener noreferrer" className="uppercase sans font-medium hover:underline">
          LINKEDIN
        </a>
      </div>
    </>
  );

  const aboutProse = (
    <div>
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
  );

  const singleLineLogo = (
    <div className="logo">
      <div className="text-center leading-tight">
        <a href="/" className="sans fs-right uppercase font-normal" style={{letterSpacing: '.04em', lineHeight: '1.1', textDecoration: 'none', color: 'inherit'}}>
          KAARLE <LogoMark /> KUMPP.
        </a>
      </div>
    </div>
  );

  const mobileLogo = (
    <div className="left-cell flex items-center justify-center logo">
      <a href="/" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
        <div className="text-center leading-tight">
          <div className="sans fs-logo uppercase tracking-wide font-normal">KAARLE</div>
          <div className="my-1 flex justify-center fs-logo">
            <LogoMark />
          </div>
          <div className="sans fs-logo uppercase tracking-wide font-normal">KUMPP.</div>
        </div>
      </a>
    </div>
  );

  const mobileStack = (
    <>
      {/* About prose content */}
      <div data-id="right-middle">
        <div className="about-prose">{aboutProse}</div>
      </div>

      {/* Contacts, Image, and Links Container */}
      <div className="about-contact-section" style={{ marginTop: '2rem' }}>
        {/* Contacts */}
        <div className="about-contact">
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '400', display: 'block' }}>KAARLE HURTIG</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontWeight: '400', display: 'block' }}>+358 440 522 753</span>
          <a href="mailto:kaarle.hurtig@gmail.com" style={{ fontFamily: 'var(--font-serif)', fontWeight: '400', fontStyle: 'italic', display: 'block', color: 'inherit' }}>kaarle.hurtig@gmail.com</a>
        </div>

        {/* Image */}
        <figure className="about-photo" style={{ paddingTop: '0.25rem', paddingBottom: '0.25rem' }}>
          <Image 
            src="/images/portr2.png" 
            alt="Kaarle Hurtig portrait" 
            width={100} 
            height={120} 
            className="h-auto"
            priority
          />
        </figure>

        {/* Links */}
        <div className="about-links">
          <a href="/CV_Kaarle_Hurtig_2024_b.png" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-sans)', fontWeight: '400', textTransform: 'uppercase', fontSize: 'var(--text-sm)', color: 'inherit', textDecoration: 'none', display: 'block' }}>
            DOWNLOAD CV
          </a>
          <a href="https://www.linkedin.com/in/kaarle-hurtig/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-sans)', fontWeight: '400', textTransform: 'uppercase', fontSize: 'var(--text-sm)', color: 'inherit', textDecoration: 'none', display: 'block' }}>
            LINKEDIN
          </a>
        </div>
      </div>

      {/* WORKS link at bottom */}
      <div data-id="mobile-nav" className="mobile-nav">
        <a href="/works" className="nav-right">WORKS</a>
      </div>
    </>
  );

  return (
    <div className="route-about">
      <main className="bg-paper text-ink about-page">
      <EMLayout
        leftTop={null}
        leftMiddle={<>{contactBlock}{photoBlock}{linksBlock}</>}
        leftBottom={null}
        rightTop={singleLineLogo}
        rightMiddle={<div className="about-prose">{aboutProse}</div>}
        rightBottom={<a href="/works" className="nav-right" data-debug="nav-right">WORKS</a>}
        left={mobileLogo}
        mobileAdditionalContent={mobileStack}
      />
      {process.env.NODE_ENV === "development" ? <LogLeftCol /> : null}
      {process.env.NODE_ENV === "development" ? <CompareFonts /> : null}
      {process.env.NODE_ENV === "development" ? <FontAnalysis /> : null}
      </main>
    </div>
  );
}