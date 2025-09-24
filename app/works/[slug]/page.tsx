import { loadSiteData } from "@/lib/data";

type Props = { params: { slug: string } };

export default async function Client({ params }: Props) {
  const { clients } = await loadSiteData();
  const c = clients.find(x => x.slug === params.slug);
  if (!c) {
    return <main className="container min-h-[70vh] mt-10"><h1 className="text-2xl">Not found</h1></main>;
  }
  return (
    <main className="container min-h-[70vh] mt-10">
      <h1 className="text-2xl">{c.name}</h1>
      <div className="mt-6 h-[420px] w-full max-w-3xl bg-black" />
      <p className="mt-4 max-w-2xl text-sm text-neutral-700">{c.summary}</p>
    </main>
  );
}
