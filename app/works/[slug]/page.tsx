import Carousel from "@/components/Carousel";
import { notFound } from "next/navigation";
import { getClients } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export default async function ClientPage({ params }: Props) {
  const { slug } = await params;
  const clients = await getClients();
  const client = clients.find(c => c.slug === slug);
  if (!client) return notFound();

  return (
    <main className="container min-h-[70vh] mt-10">
      <h1 className="text-3xl font-normal uppercase tracking-wide mb-6" style={{fontFamily: "'Kaarle ⌘ Kumppanit', Arial, sans-serif"}}>{client.name.toUpperCase()}</h1>

      <div className="mt-6">
        <Carousel slides={client.slides ?? []} />
      </div>

      <p className="mt-6 max-w-2xl text-base leading-relaxed" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
        {client.summary ?? "Summary coming soon."}
      </p>
    </main>
  );
}
