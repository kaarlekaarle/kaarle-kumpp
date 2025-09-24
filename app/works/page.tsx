import BottomNav from "@/components/BottomNav";
import { loadSiteData } from "@/lib/data";

export default async function Works() {
  const { fields, clients } = await loadSiteData();
  return (
    <main className="container min-h-[70vh] grid md:grid-cols-2 gap-24 mt-16">
      <ul className="space-y-3 uppercase opacity-70">
        {fields.map(f => (<li key={f.id}>{f.name}</li>))}
      </ul>
      <ul className="space-y-2 font-semibold uppercase">
        {clients.map(c => (<li key={c.slug}>{c.name}</li>))}
      </ul>
      <div className="col-span-full"><BottomNav right={{ href: "/about", label: "About" }} /></div>
    </main>
  );
}
