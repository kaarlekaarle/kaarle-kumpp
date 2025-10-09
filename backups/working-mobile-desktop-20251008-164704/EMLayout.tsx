type EMLayoutProps = {
  leftTop?: React.ReactNode | null;
  leftMiddle?: React.ReactNode | null;
  leftBottom?: React.ReactNode | null;
  rightTop?: React.ReactNode | null;
  rightMiddle?: React.ReactNode | null;
  rightBottom?: React.ReactNode | null;
  left?: React.ReactNode | null;
  mobileBottomBar?: React.ReactNode | null;
  mobileAdditionalContent?: React.ReactNode | null;
};

export default function EMLayout({
  left,
  leftTop,
  leftMiddle,
  leftBottom,
  rightTop,
  rightMiddle,
  rightBottom,
  mobileBottomBar,
  mobileAdditionalContent,
}: EMLayoutProps) {
  return (
    <main className="em">
      {/* Desktop Layout - Explicit grid slots */}
      <aside className="desktop-only">
        {leftTop && <div data-id="left-top">{leftTop}</div>}
        {leftMiddle && <div data-id="left-middle">{leftMiddle}</div>}
        {leftBottom && <div data-id="left-bottom">{leftBottom}</div>}
      </aside>

      <article className="desktop-only">
        {rightTop && <div data-id="right-top">{rightTop}</div>}
        {rightMiddle && <div data-id="right-middle">{rightMiddle}</div>}
        {rightBottom && <div data-id="right-bottom">{rightBottom}</div>}
      </article>

      {/* Mobile Layout */}
      {left && <div data-id="left-middle" className="mobile-only">{left}</div>}
      {mobileAdditionalContent && (
        <div className="mobile-only">{mobileAdditionalContent}</div>
      )}
      {mobileBottomBar && <div data-id="mobile-contact" className="mobile-only">{mobileBottomBar}</div>}
    </main>
  );
}