import EMLayout from "@/components/EMLayout";
import ClientGallery from "@/components/ClientGallery";
import ClientList from "@/components/ClientList";
import { getClients } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function ClientPage({ params }: Props) {
  const { slug } = await params;
  const clients = await getClients();
  const client = clients.find(c => c.slug === slug);
  if (!client) return notFound();

  return (
    <main className="bg-paper text-ink client-page">
      <EMLayout
        leftMiddle={
          <ClientGallery 
            slides={client.slides} 
            summary={Array.isArray(client.summary) ? client.summary.join(' ') : client.summary} 
            links={client.links}
            logoSrc={client.logo}
            logoAlt={client.name}
            closeLink="/works"
            allClients={clients.map(c => ({ slug: c.slug, name: c.name }))}
            currentClientSlug={client.slug}
          />
        }
        rightTop={
          <Link href="/" className="uppercase tracking-wide font-normal text-[20px] font-sans leading-none">
            KAARLE {String.fromCharCode(0xF8FF)} KUMPP.
          </Link>
        }
        rightMiddle={<ClientList clients={clients} activeSlug={client.slug} />}
        rightBottom={
          <Link href="/about" className="uppercase tracking-wide font-normal text-[20px] font-sans">
            ABOUT
          </Link>
        }
      />
    </main>
  );
}