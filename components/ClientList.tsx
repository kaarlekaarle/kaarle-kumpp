import Link from "next/link";
import type { Client } from "@/types/site";

interface ClientListProps {
  clients: Client[];
  activeSlug?: string;
}

export default function ClientList({ clients, activeSlug }: ClientListProps) {
  return (
    <div className="font-serif leading-[1.4] text-[16px] text-accent font-medium">
      {clients.map(client => (
        <Link
          key={client.slug}
          href={`/works/${client.slug}`}
          data-slug={client.slug}
          className={`block w-full text-left uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2 transition-opacity ${
            client.slug === activeSlug ? "opacity-100" : "opacity-40"
          }`}
        >
          {client.name}
        </Link>
      ))}
    </div>
  );
}
