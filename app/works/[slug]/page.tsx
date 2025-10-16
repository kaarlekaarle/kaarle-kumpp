import EMLayout from "@/components/EMLayout";
import ClientGallery from "@/components/ClientGallery";
import ClientCaption from "@/components/ClientCaption";
import ClientHeader from "@/components/ClientHeader";
import ClientList from "@/components/ClientList";
import MobileClientList from "@/components/MobileClientList";
import MobileGallery from "@/components/MobileGallery";
import LogoMark from "@/components/LogoMark";
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

  // Order clients same as works page: pyramid by name length
  const orderedClients = (() => {
    const sortedByLength = [...clients].sort((a, b) => a.name.length - b.name.length);
    const oddRanked = sortedByLength.filter((_, idx) => idx % 2 === 0);
    const evenRankedReversed = sortedByLength.filter((_, idx) => idx % 2 === 1).reverse();
    return [...oddRanked, ...evenRankedReversed];
  })();

  // Mobile content
  const mobileContent = (
    <>
      {/* Client Logo at top */}
      <div className="left-cell flex items-center justify-center logo">
        <div className="text-center leading-tight">
          {client.logo ? (
            <img src={client.logo} alt={client.name} className="h-12 w-auto object-contain mx-auto" />
          ) : (
            <div className="sans fs-logo uppercase tracking-wide font-normal">{client.name}</div>
          )}
        </div>
      </div>
      
      {/* Mobile Gallery - responsive with dots and all images */}
      {client.slides && client.slides.length > 0 && (
        <div data-id="right-middle" style={{ marginTop: '2.5rem', marginBottom: '0.5rem' }}>
          <MobileGallery slides={client.slides} />
        </div>
      )}
      
      {/* Mobile Caption - under the image, closer spacing */}
      <div data-id="right-middle" style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>
        {/* Caption text */}
        <div className="text-black text-xs leading-relaxed space-y-1 text-center font-serif max-w-[60ch] mx-auto">
          {Array.isArray(client.summary)
            ? client.summary.map((t, i) => <p key={i}>{t}</p>)
            : <p>{client.summary}</p>}
        </div>
        
        {/* Links */}
        {client.links?.length ? (
          <div className="flex justify-center gap-4 mt-3">
            {client.links.map((l, idx) => (
              <a 
                key={idx} 
                href={l.url} 
                target="_blank" 
                rel="noreferrer" 
                aria-label={l.icon ?? "link"} 
                className="opacity-80 hover:opacity-100"
              >
                {l.icon ? (
                  <img 
                    src={`/icons/${l.icon}.svg`} 
                    alt={l.icon}
                    className="w-4 h-4"
                  />
                ) : (
                  <span>{l.icon ?? "link"}</span>
                )}
              </a>
            ))}
          </div>
        ) : null}
      </div>
      
      {/* Mobile Client List - same as works page, interactive client component */}
      <MobileClientList 
        clients={orderedClients.map(c => ({ slug: c.slug, name: c.name }))}
        currentClientSlug={client.slug}
      />

      {/* Kaarle logo under the list - same as main/about */}
      <div data-id="mobile-kaarle-logo" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <Link href="/" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
          <div className="text-center leading-tight">
            <div className="sans fs-logo uppercase tracking-wide font-normal">KAARLE</div>
            <div className="my-1 flex justify-center fs-logo">
              <LogoMark />
            </div>
            <div className="sans fs-logo uppercase tracking-wide font-normal">KUMPP.</div>
          </div>
        </Link>
      </div>

      {/* About link pinned to bottom area */}
      <div data-id="mobile-nav" className="mobile-nav" style={{ textAlign: 'center', width: '100%', marginBottom: '2.5rem' }}>
        <Link href="/about" className="nav-right">ABOUT</Link>
      </div>
    </>
  );

  return (
    <main className="bg-paper text-ink client-page">
      <EMLayout
        leftTop={
          <ClientHeader 
            slides={client.slides} 
            logoSrc={client.logo}
            logoAlt={client.name}
            closeLink="/works"
            allClients={orderedClients.map(c => ({ slug: c.slug, name: c.name }))}
            currentClientSlug={client.slug}
          />
        }
        leftMiddle={
          <ClientGallery 
            slides={client.slides} 
          />
        }
        leftBottom={
          <ClientCaption 
            summary={Array.isArray(client.summary) ? client.summary.join(' ') : client.summary} 
            links={client.links}
          />
        }
        rightTop={
          <Link href="/" className="nav-right leading-none">
            KAARLE {String.fromCharCode(0xF8FF)} KUMPP.
          </Link>
        }
        rightMiddle={<ClientList clients={orderedClients} activeSlug={client.slug} />}
        rightBottom={
          <Link href="/about" className="nav-right">
            ABOUT
          </Link>
        }
        mobileAdditionalContent={mobileContent}
      />
    </main>
  );
}