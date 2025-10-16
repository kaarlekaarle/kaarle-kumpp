/* ============================================
   MAIN PAGE (Desktop + Mobile)
   ============================================ */

import EMLayout from "@/components/EMLayout";
import LogoMark from "@/components/LogoMark";
import Appleify from "@/components/Appleify";
import LogLeftCol from "@/components/dev/LogLeftCol";
import CompareFonts from "@/components/dev/CompareFonts";
import FontTest from "@/components/dev/FontTest";
import FontDebug from "@/components/dev/FontDebug";
import SpacingDiagnostic from "@/components/dev/SpacingDiagnostic";
import FontDiagnostic from "@/components/dev/FontDiagnostic";

export default function Page(){
  // ========== DESKTOP CONTENT ==========
  const logoBlock = (
    <div className="logo">
      <div className="text-center leading-tight">
        <div className="sans fs-logo uppercase tracking-wide font-normal">KAARLE</div>
        <div className="my-1 flex justify-center fs-logo">
          <LogoMark />
        </div>
        <div className="sans fs-logo uppercase tracking-wide font-normal">KUMPP.</div>
      </div>
    </div>
  );

  const contactInline = (
    <div className="contact text-center">
      <span className="contact__name">KAARLE HURTIG</span>
      <span className="contact__phone">+358 440 522 753</span>
      <a className="contact__email" href="mailto:kaarle.hurtig@gmail.com">kaarle.hurtig@gmail.com</a>
    </div>
  );

  // ========== MOBILE CONTENT ==========
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

  const homeProse = (
    <div className="intro about-prose">
      <h1 className="kicker">Problem solving and storytelling.</h1>
      <p>Everything starts with a question: <em>What are we doing here?</em><br />
      Once we agree on the task, I lay out a plan.<br />
      You need clarity, the right perspective, and the right people.<br />
      When we&apos;ve got those, we&apos;re halfway there.</p>
      <p>Too often, projects get tangled<br />
      in too many hands, wasted time<br />
      and money spent. Budgets grow,<br />
      meetings multiply, and the focus shifts<br />
      from solving the problem to justifying the invoices.</p>
      <p>I do the work like it&apos;s mine. If I&apos;m not the man for the job,<br />
      I&apos;ll say so. I don&apos;t drag things out to look busy.<br />
      I don&apos;t bill by the hour. I charge by the solution.</p>
      <p className="kicker">What is your problem?</p>
    </div>
  );

  const mobileContent = (
    <div className="mobile-content">
      <div data-id="right-middle" style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
        <div className="about-prose">{homeProse}</div>
      </div>
      <div data-id="mobile-nav" className="mobile-nav" style={{ marginBottom: '2.5rem' }}>
        <a href="/works" className="nav-right">WORKS</a>
        <a href="/about" className="nav-right">ABOUT</a>
      </div>
      <div data-id="mobile-contact" className="mobile-contact-section">
        <div className="contact text-center">
          <span className="contact__name">KAARLE HURTIG</span>
          <span className="contact__phone">+358 440 522 753</span>
          <a className="contact__email" href="mailto:kaarle.hurtig@gmail.com">kaarle.hurtig@gmail.com</a>
        </div>
      </div>
    </div>
  );

  // ========== RENDER (Desktop + Mobile) ==========
  return (
    <main className="bg-paper text-ink">
      <div id="root">
        <EMLayout
          leftTop={null}
          leftMiddle={logoBlock}
          leftBottom={<div className="contact-line">{contactInline}</div>}
          rightTop={<a href="/works" className="nav-right" data-debug="nav-right">WORKS</a>}
          rightMiddle={<div className="about-prose">{homeProse}</div>}
          rightBottom={<a href="/about" className="nav-right">ABOUT</a>}
          left={mobileLogo}
          mobileAdditionalContent={mobileContent}
        />
        {process.env.NODE_ENV === "development" ? <LogLeftCol /> : null}
        {process.env.NODE_ENV === "development" ? <SpacingDiagnostic /> : null}
        {process.env.NODE_ENV === "development" ? <FontDiagnostic /> : null}
      </div>
    </main>
  );
}