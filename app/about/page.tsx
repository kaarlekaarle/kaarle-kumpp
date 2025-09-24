import BottomNav from "@/components/BottomNav";
import { about } from "@/data/site-copy";
import Image from "next/image";

export default function About() {
  return (
    <main className="container min-h-[70vh] grid md:grid-cols-2 gap-24 mt-16">
      <div>
        <h1>{about.name}</h1>
        <p className="mt-1">{about.phone}</p>
        <a href={`mailto:${about.email}`} className="underline">{about.email}</a>
        <div className="mt-6 w-60 h-72 relative">
          <Image
            src="/images/portrait.jpg"
            alt={`Portrait of ${about.name}`}
            fill
            className="object-cover"
          />
        </div>
        <a href={about.cv} className="mt-4 inline-block uppercase font-semibold underline">Download CV</a>
      </div>
      <article className="max-w-prose">
        <h2>{about.tagline}</h2>
        {about.bio.map((paragraph, index) => (
          <p key={index} className="mt-4 text-sm text-neutral-700">{paragraph}</p>
        ))}
      </article>
      <div className="col-span-full"><BottomNav right={{ href: "/works", label: "Works" }} /></div>
    </main>
  );
}
