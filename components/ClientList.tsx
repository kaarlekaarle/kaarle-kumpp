import Link from "next/link";
import type { Client } from "@/types/site";

interface ClientListProps {
  clients: Client[];
  activeSlug?: string;
}

export default function ClientList({ clients, activeSlug }: ClientListProps) {
  return (
    <div className="about-prose">
      {clients.map(client => (
        <Link
          key={client.slug}
          href={`/works/${client.slug}`}
          data-slug={client.slug}
          className={`block w-full text-left uppercase tracking-wide font-normal nav-right mb-2 transition-opacity ${
            client.slug === activeSlug ? "opacity-100" : "opacity-40"
          }`}
          style={{ lineHeight: '1.5' }}
        >
          {client.name}
        </Link>
      ))}
    </div>
  );
}
