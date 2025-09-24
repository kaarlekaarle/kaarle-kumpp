import BottomNav from "@/components/BottomNav";
import { about } from "@/data/site-copy";
import Image from "next/image";

export default function About() {
  return (
    <main className="container min-h-[70vh] grid md:grid-cols-2 gap-10 md:gap-24 mt-12 md:mt-16">
      <div>
        <h1 className="text-2xl font-bold uppercase mb-2" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>{about.name}</h1>
        <p className="text-lg mb-1 uppercase" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>{about.phone}</p>
        <a href={`mailto:${about.email}`} className="text-lg underline italic uppercase" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>{about.email}</a>
        <div className="mt-6 w-60 h-72 relative">
          <Image
            src="/images/portrait.svg"
            alt={`Portrait of ${about.name}`}
            fill
            className="object-cover"
          />
        </div>
        <a href={about.cv} className="mt-4 inline-block uppercase font-semibold underline text-lg" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>Download CV</a>
      </div>
      <article className="max-w-prose">
        <h2 className="text-xl font-bold uppercase mb-6" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>{about.tagline}</h2>
        {about.bio.map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed mb-4" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>{paragraph}</p>
        ))}
      </article>
      <div className="col-span-full"><BottomNav right={{ href: "/works", label: "Works" }} /></div>
    </main>
  );
}
