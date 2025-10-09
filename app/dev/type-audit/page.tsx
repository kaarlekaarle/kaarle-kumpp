/* app/dev/type-audit/page.tsx */
"use client";
import React from "react";

const Row = ({label, el}:{label:string; el:Element|null})=>{
  const cs = el ? getComputedStyle(el as Element) : null;
  return {
    label,
    family: cs?.fontFamily, size: cs?.fontSize, weight: cs?.fontWeight,
    lh: cs?.lineHeight, trans: cs?.textTransform, ls: cs?.letterSpacing
  };
};

export default function Page(){
  const refLogo1 = React.useRef<HTMLDivElement>(null);
  const refLogo2 = React.useRef<HTMLDivElement>(null);
  const refLogo3 = React.useRef<HTMLDivElement>(null);

  const refWorks = React.useRef<HTMLAnchorElement>(null);
  const refH2    = React.useRef<HTMLHeadingElement>(null);
  const refAbout = React.useRef<HTMLAnchorElement>(null);
  const refBody  = React.useRef<HTMLParagraphElement>(null);

  const refContactName  = React.useRef<HTMLSpanElement>(null);
  const refContactPhone = React.useRef<HTMLSpanElement>(null);
  const refContactMail  = React.useRef<HTMLAnchorElement>(null);

  const [rows,setRows]=React.useState<any[]>([]);

  React.useEffect(()=>{
    const data = [
      Row({label:"LOGO line1 (sans fs-logo)", el: refLogo1.current}),
      Row({label:"LOGO line2 (mark)",         el: refLogo2.current}),
      Row({label:"LOGO line3 (sans fs-logo)", el: refLogo3.current}),

      Row({label:"RIGHT link WORKS (sans fs-right)", el: refWorks.current}),
      Row({label:"RIGHT H2 (sans fs-right)",         el: refH2.current}),
      Row({label:"RIGHT link ABOUT (sans fs-right)", el: refAbout.current}),
      Row({label:"RIGHT body P (serif parity fs-right)", el: refBody.current}),

      Row({label:"CONTACT name (sans fs-contact)", el: refContactName.current}),
      Row({label:"CONTACT phone (serif fs-contact)", el: refContactPhone.current}),
      Row({label:"CONTACT email (serif italic fs-contact)", el: refContactMail.current}),
    ];
    console.table(data);
    setRows(data);
  },[]);

  return (
    <main style={{padding:24}}>
      <h1>Typography Runtime Audit</h1>

      {/* Logo block */}
      <section style={{marginTop:24}}>
        <div className="fs-logo sans" style={{lineHeight:1.05,textAlign:"center"}}>
          <div ref={refLogo1}>KAARLE</div>
          <div ref={refLogo2} style={{margin:"6px 0"}}>⚡</div>
          <div ref={refLogo3}>KUMPP.</div>
        </div>
      </section>

      {/* Right column sample */}
      <section style={{marginTop:24, border:"1px dashed #8cf", padding:24, maxWidth:600}}>
        <a ref={refWorks} className="fs-right sans">WORKS</a>
        <h2 ref={refH2} className="fs-right sans" style={{margin:"24px 0"}}>PROBLEM SOLVING AND STORYTELLING.</h2>
        <a ref={refAbout} className="fs-right sans">ABOUT</a>
        <div className="about-prose" style={{marginTop:24}}>
          <p ref={refBody} className="serif fs-right">Everything starts with a question…</p>
        </div>
      </section>

      {/* Contact line */}
      <section style={{marginTop:24}}>
        <p className="contact-line">
          <span ref={refContactName} className="sans fs-contact">KAARLE HURTIG</span>
          <span ref={refContactPhone} className="serif fs-contact">+358 440 522 753</span>
          <a ref={refContactMail} className="serif fs-contact" href="mailto:kaarle.hurtig@gmail.com"><em>kaarle.hurtig@gmail.com</em></a>
        </p>
      </section>

      {/* Table */}
      <table style={{marginTop:24, borderCollapse:"collapse", width:"100%"}}>
        <thead><tr>
          {["Label","Family","Weight","Size","LineHeight","Transform","LetterSpacing"].map(h=>
            <th key={h} style={{border:"1px solid #ccc", padding:6, textAlign:"left"}}>{h}</th>
          )}
        </tr></thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              <td style={{border:"1px solid #eee", padding:6}}>{r.label}</td>
              <td style={{border:"1px solid #eee", padding:6}}>{r.family}</td>
              <td style={{border:"1px solid #eee", padding:6}}>{r.weight}</td>
              <td style={{border:"1px solid #eee", padding:6}}>{r.size}</td>
              <td style={{border:"1px solid #eee", padding:6}}>{r.lh}</td>
              <td style={{border:"1px solid #eee", padding:6}}>{r.trans}</td>
              <td style={{border:"1px solid #eee", padding:6}}>{r.ls}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{marginTop:12}}>
        Expected: LOGO (sans fs-logo, 400), RIGHT (links+H2 sans fs-right, 400), CONTACT (sans/serif fs-contact, serif equals sans size). No font-weight 700 anywhere, sizes in 1: 36→24→18 ratio.
      </p>
    </main>
  );
}
