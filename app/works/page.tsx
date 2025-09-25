import EMLayout from "@/components/EMLayout";

export default function Works(){
  return (
    <main className="bg-paper text-ink">
      <EMLayout
        topLabel="Works"
        leftMain={
          <div className="text-center leading-tight">
            <div className="uppercase tracking-wide font-normal text-[18px] font-sans mb-4">ADVERTISING</div>
            <div className="uppercase tracking-wide font-normal text-[18px] font-sans mb-4">GUN-FOR-HIRE</div>
            <div className="uppercase tracking-wide font-normal text-[18px] font-sans mb-4">IDENTITY BUILDING</div>
            <div className="uppercase tracking-wide font-normal text-[18px] font-sans mb-4">LEGACY TRANSITION</div>
            <div className="uppercase tracking-wide font-normal text-[18px] font-sans mb-4">MESSAGE & MEDIA</div>
            <div className="uppercase tracking-wide font-normal text-[18px] font-sans mb-4">STRATEGIC VISION</div>
            <div className="uppercase tracking-wide font-normal text-[18px] font-sans">TALK SHOWS</div>
          </div>
        }
        rightHeading="Selected projects and collaborations."
        rightBody={
          <div className="font-serif leading-[1.4] text-[16px] text-accent font-medium">
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">BASSO RADIO</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">ED / HARTWALL</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">EV. LUT. KIRKKO</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">FLOW FESTIVAL</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">HOBO HOTEL</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">HELSINKI UNI</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">JCAD</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">KESKO</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">KESKUSTELUOHJELMA</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">KAARLEN MAAILMA</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">LUBRICAN</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">RADIO HELSINKI</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">R-COLLECTION</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2">SECTO LABS</div>
            <div className="uppercase tracking-wide font-normal text-[16px] font-sans text-accent">SECTO AUTOMOTIVE</div>
          </div>
        }
        bottomRightLabel="Back"
        bottomRightHref="/"
      />
    </main>
  );
}