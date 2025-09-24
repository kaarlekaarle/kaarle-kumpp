import BottomNav from "@/components/BottomNav";
export default function About() {
  return (
    <main className="container min-h-[70vh] grid md:grid-cols-2 gap-24 mt-16">
      <div>
        <h1>Kaarle Hurtig</h1>
        <p className="mt-1">+358 440 522 753</p>
        <a href="mailto:kaarle.hurtig@gmail.com" className="underline">kaarle.hurtig@gmail.com</a>
        <div className="mt-6 w-60 h-72 bg-white border" />
        <a className="mt-4 inline-block uppercase font-semibold underline">Download CV</a>
      </div>
      <article className="max-w-prose"><h2>About</h2><p className="mt-4 text-sm text-neutral-700">Bio placeholder.</p></article>
      <div className="col-span-full"><BottomNav right={{ href: "/works", label: "Works" }} /></div>
    </main>
  );
}
