export default function EMLayout({
  left,
  leftTop,
  leftMiddle,
  rightTop,
  rightMiddle,
  rightBottom,
  mobileBottomBar,
  mobileAdditionalContent,
}: {
  left?: React.ReactNode;
  leftTop?: React.ReactNode;
  leftMiddle?: React.ReactNode;
  rightTop: React.ReactNode;
  rightMiddle: React.ReactNode;
  rightBottom: React.ReactNode;
  mobileBottomBar?: React.ReactNode;
  mobileAdditionalContent?: React.ReactNode;
}) {
  return (
    <main className="em kk-pr-M">
      {/* Desktop Layout */}
      <aside className="row-start-4 col-start-2 desktop-only">
        {leftTop && <div data-id="left-top">{leftTop}</div>}
        {leftMiddle && <div data-id="left-middle">{leftMiddle}</div>}
      </aside>
      
      <article
        data-id="right-block"
        className="row-start-4 col-start-4 desktop-only"
      >
        <nav className="site" data-id="right-top">{rightTop}</nav>
        <div data-id="right-middle">{rightMiddle}</div>
        <nav className="site" data-id="right-bottom">{rightBottom}</nav>
      </article>

      {/* Mobile Layout */}
      <div className="mobile-stack mobile-only">
        <aside className="left-cell">
          {left || (
            <>
              {leftTop && <div data-id="left-top">{leftTop}</div>}
              {leftMiddle && <div data-id="left-middle">{leftMiddle}</div>}
            </>
          )}
        </aside>
        <article data-id="right-block">
          <nav className="site" data-id="right-top">{rightTop}</nav>
          <div data-id="right-middle">{rightMiddle}</div>
          <nav className="site" data-id="right-bottom">{rightBottom}</nav>
        </article>
        {mobileAdditionalContent}
      </div>

      {mobileBottomBar || (
        <div className="mobile-bottom mobile-only" role="contentinfo">
          <nav className="mobile-nav" aria-label="Primary">
            <a className="mobile-nav__link" href="/works">WORKS</a>
            <a className="mobile-nav__link" href="/about">ABOUT</a>
          </nav>
          <div className="contact contact--mobile">
            <span className="contact__name">KAARLE HURTIG</span><span className="contact__sep"> | </span>
            <span className="contact__phone">+358 440 522 753</span><span className="contact__sep"> | </span>
            <a className="contact__email" href="mailto:kaarle.hurtig@gmail.com">kaarle.hurtig@gmail.com</a>
          </div>
        </div>
      )}
    </main>
  );
}