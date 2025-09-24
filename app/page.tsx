import BottomNav from "@/components/BottomNav";
import { landing } from "@/data/site-copy";

export default function Page() {
  return (
    <main className="container min-h-[70vh] grid md:grid-cols-2 gap-10 md:gap-24 mt-12 md:mt-16">
      <div className="flex items-center justify-center text-3xl font-semibold text-center uppercase" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>LOGO / NAME</div>
      <section className="max-w-prose">
        <h2 className="text-2xl font-bold uppercase mb-6" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>{landing.title}</h2>
        <div className="text-base leading-relaxed" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
          {landing.intro.split('\n').map((paragraph, index) => (
            <p key={index} className={index === 0 ? "mb-4" : "mb-4"}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>
      <div className="col-span-full"><BottomNav right={{ href: "/about", label: "About" }} /></div>
    </main>
  );
}
