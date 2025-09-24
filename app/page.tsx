import BottomNav from "@/components/BottomNav";
import { landing } from "@/data/site-copy";

export default function Page() {
  return (
    <main className="container min-h-[70vh] grid md:grid-cols-2 gap-10 md:gap-24 mt-12 md:mt-16">
      <div className="flex items-center justify-center text-3xl font-semibold text-center">LOGO / NAME</div>
      <section className="max-w-prose">
        <h2>{landing.title}</h2>
        <p className="mt-4 text-sm text-neutral-700">{landing.intro}</p>
      </section>
      <div className="col-span-full"><BottomNav right={{ href: "/about", label: "About" }} /></div>
    </main>
  );
}
