import React from "react";

export default function EMPage({
  topLabel, left, rightHeading, rightBody, bottomLabel, bottomHref
}: {
  topLabel: string; left: React.ReactNode;
  rightHeading: string; rightBody: React.ReactNode;
  bottomLabel: string; bottomHref: string;
}) {
  return (
    <div className="min-h-screen grid kk-grid
      grid-rows-[var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)_auto_var(--kk-M)]
      grid-cols-[1fr_var(--kk-M)_var(--kk-right-col)_var(--kk-M)]">

      <div className="row-start-2 col-start-3 self-start">
        <p data-id="works" className="uppercase tracking-wide font-normal text-[20px] font-sans leading-none"> {topLabel} </p>
      </div>

      <div data-id="logo-col" className="row-start-4 col-start-1 self-center flex justify-center">{left}</div>

      <article data-id="right-block" className="row-start-4 col-start-3 self-start max-w-[var(--kk-right-col)] grid gap-[10px]">
        <h1 data-id="heading" className="uppercase tracking-wide font-normal text-[20px] font-sans leading-none">
          {rightHeading}
        </h1>
        {rightBody}
      </article>

      <div className="row-start-6 col-start-1 flex items-center justify-center">
        <p className="text-[12px] tracking-wide text-center font-normal">
          <span className="font-sans">KAARLE HURTIG</span> &nbsp;|&nbsp;
          <span className="font-serif font-semibold">+358 440 522 753</span> &nbsp;|&nbsp;
          <a className="underline [font-style:oblique_10deg] font-serif font-semibold" href="mailto:kaarle.hurtig@gmail.com">kaarle.hurtig@gmail.com</a>
        </p>
      </div>
      <div className="row-start-6 col-start-3 flex items-center">
        <a data-id="about" href={bottomHref} className="uppercase tracking-wide font-normal text-[20px] font-sans">{bottomLabel}</a>
      </div>
    </div>
  );
}