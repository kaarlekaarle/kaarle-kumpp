import BottomNav from "@/components/BottomNav";
export default function Works() {
  return (
    <main className="container min-h-[70vh] grid md:grid-cols-2 gap-24 mt-16">
      <ul className="space-y-3 uppercase opacity-70">
        <li>Field A</li><li>Field B</li><li>Field C</li>
      </ul>
      <ul className="space-y-2 font-semibold uppercase">
        <li>Client 1</li><li>Client 2</li><li>Client 3</li>
      </ul>
      <div className="col-span-full"><BottomNav right={{ href: "/about", label: "About" }} /></div>
    </main>
  );
}
