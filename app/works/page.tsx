"use client";

import { useState, useMemo, useCallback } from "react";
import BottomNav from "@/components/BottomNav";
import { cn } from "@/lib/cn";
import { getFields, getClients } from "@/lib/data";
import type { Field, Client } from "@/types/site";

export default function Works() {
  return <WorksServerWrapper />;
}

// server wrapper fetches data, passes to client interactor
async function WorksServerWrapper() {
  const [fields, clients] = await Promise.all([getFields(), getClients()]);
  return <WorksClient fields={fields} clients={clients} />;
}

function WorksClient({ fields, clients }: { fields: Field[]; clients: Client[] }) {
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  const fieldById = useMemo(() => new Map(fields.map(f => [f.id, f])), [fields]);
  const clientById = useMemo(() => new Map(clients.map(c => [c.slug, c])), [clients]);

  const clientsForField = useCallback((fid: string) => {
    return clients.filter(c => c.fields?.includes(fid)).map(c => c.slug);
  }, [clients]);

  const fieldsForClient = useCallback((cid: string) => {
    const c = clients.find(x => x.slug === cid);
    return (c?.fields ?? []);
  }, [clients]);

  // highlighting rules
  const activeClientIds = useMemo(() => {
    if (hoveredField) return new Set(clientsForField(hoveredField));
    return null;
  }, [hoveredField, clientsForField]);

  const activeFieldIds = useMemo(() => {
    if (hoveredClient) return new Set(fieldsForClient(hoveredClient));
    return null;
  }, [hoveredClient, fieldsForClient]);

  return (
    <main className="container min-h-[70vh] grid md:grid-cols-2 gap-24 mt-16">
      {/* Fields (left) */}
      <ul className="space-y-3 uppercase">
        {fields.map(f => {
          const isActive = hoveredClient ? activeFieldIds?.has(f.id) : hoveredField === f.id;
          const isDimmed =
            (hoveredField && hoveredField !== f.id) ||
            (hoveredClient && !activeFieldIds?.has(f.id));

        return (
          <li
            key={f.id}
            tabIndex={0}
            role="button"
            onMouseEnter={() => { setHoveredField(f.id); setHoveredClient(null); }}
            onMouseLeave={() => setHoveredField(null)}
            onFocus={() => { setHoveredField(f.id); setHoveredClient(null); }}
            onBlur={() => setHoveredField(null)}
            className={cn(
              "cursor-pointer transition-colors",
              isActive && "text-accent font-semibold",
              isDimmed && "opacity-40"
            )}
          >
            {f.name}
          </li>
        );})}
      </ul>

      {/* Clients (right) */}
      <ul className="space-y-2 font-semibold uppercase">
        {clients.map(c => {
          const cid = c.slug;
          const isActive = hoveredField ? activeClientIds?.has(cid) : hoveredClient === cid;
          const isDimmed =
            (hoveredClient && hoveredClient !== cid) ||
            (hoveredField && !activeClientIds?.has(cid));

          return (
            <li
              key={cid}
              tabIndex={0}
              role="button"
              onMouseEnter={() => { setHoveredClient(cid); setHoveredField(null); }}
              onMouseLeave={() => setHoveredClient(null)}
              onFocus={() => { setHoveredClient(cid); setHoveredField(null); }}
              onBlur={() => setHoveredClient(null)}
              className={cn(
                "cursor-pointer transition-colors",
                isActive && "text-accent",
                isDimmed && "opacity-40"
              )}
            >
              <a href={`/works/${c.slug}`}>{c.name}</a>
            </li>
          );
        })}
      </ul>

      <div className="col-span-full">
        <BottomNav right={{ href: "/about", label: "About" }} />
      </div>
    </main>
  );
}
