export default function EMLayoutSimple({
  left,
  rightTop,
  rightMiddle,
  rightBottom,
}: {
  left?: React.ReactNode;
  rightTop: React.ReactNode;
  rightMiddle: React.ReactNode;
  rightBottom: React.ReactNode;
}) {
  return (
    <div className="em-simple">
      {/* Desktop Layout */}
      <div className="em-desktop">
        <aside className="em-left">
          {left}
        </aside>
        
        <article className="em-right space-y-lg">
          <nav className="site em-nav" data-id="right-top">{rightTop}</nav>
          <div className="em-content space-y-md" data-id="right-middle">{rightMiddle}</div>
          <nav className="site em-nav" data-id="right-bottom">{rightBottom}</nav>
        </article>
      </div>
      
      {/* Mobile Layout */}
      <div className="em-mobile">
        <div className="em-mobile-logo">
          {left}
        </div>
        
        <div className="em-mobile-content space-y-md">
          <div className="em-mobile-intro" data-id="right-middle">{rightMiddle}</div>
        </div>
        
        <div className="em-mobile-nav">
          <nav className="mobile-nav">
            <a className="mobile-nav__link" href="/works">WORKS</a>
            <a className="mobile-nav__link" href="/about">ABOUT</a>
          </nav>
        </div>
        
        <div className="em-mobile-contact">
          <div className="contact contact--mobile">
            <span className="contact__name">KAARLE HURTIG</span>
            <span className="contact__sep"> | </span>
            <span className="contact__phone">+358 440 522 753</span>
            <span className="contact__sep"> | </span>
            <a className="contact__email" href="mailto:kaarle.hurtig@gmail.com">kaarle.hurtig@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
