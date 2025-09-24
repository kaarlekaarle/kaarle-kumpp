"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import { cn } from "@/lib/cn";
import ConnectionsOverlay from "@/components/ConnectionsOverlay";
import type { Field, Client } from "@/types/site";

export default function WorksClient({ fields, clients }: { fields: Field[]; clients: Client[] }) {
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const clientRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const clientsForField = useCallback(
    (fid: string) => clients.filter(c => c.fields?.includes(fid)),
    [clients]
  );
  const fieldsForClient = useCallback(
    (cid: string) => {
      const c = clients.find(x => x.slug === cid);
      return fields.filter(f => c?.fields?.includes(f.id));
    },
    [clients, fields]
  );

  const [edges, setEdges] = useState<{ a:{x:number;y:number}; b:{x:number;y:number} }[]>([]);

  const computeCenter = (el: HTMLElement, root: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const rr = root.getBoundingClientRect();
    return { x: r.left - rr.left + r.width / 2, y: r.top - rr.top + r.height / 2 };
  };

  const recompute = useCallback(() => {
    const root = containerRef.current;
    if (!root) return;
    const newEdges: typeof edges = [];

    if (hoveredField) {
      const fEl = fieldRefs.current[hoveredField];
      if (fEl) {
        const a = computeCenter(fEl, root);
        for (const c of clientsForField(hoveredField)) {
          const cid = c.slug;
          const cEl = clientRefs.current[cid];
          if (!cEl) continue;
          const b = computeCenter(cEl, root);
          newEdges.push({ a, b });
        }
      }
    } else if (hoveredClient) {
      const cid = hoveredClient;
      const cEl = clientRefs.current[cid];
      if (cEl) {
        const b = computeCenter(cEl, root);
        for (const f of fieldsForClient(cid)) {
          const fEl = fieldRefs.current[f.id];
          if (!fEl) continue;
          const a = computeCenter(fEl, root);
          newEdges.push({ a, b });
        }
      }
    }
    setEdges(newEdges);
  }, [hoveredField, hoveredClient, clientsForField, fieldsForClient]);

  useEffect(() => {
    recompute();
  }, [recompute]);

  useEffect(() => {
    const onResize = () => recompute();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize);
    };
  }, [recompute]);

  return (
    <main className="container min-h-[70vh] mt-12 md:mt-16">
      <div ref={containerRef} className="relative grid md:grid-cols-2 gap-10 md:gap-24">
        <ConnectionsOverlay edges={edges} />

        {/* Fields (left) */}
        <ul className="space-y-2 md:space-y-3 uppercase">
          {fields.map(f => {
            const activeFromClient = hoveredClient && (fieldsForClient(hoveredClient).some(x => x.id === f.id));
            const isActive = hoveredClient ? activeFromClient : hoveredField === f.id;
            const isDimmed =
              (hoveredField && hoveredField !== f.id) ||
              (hoveredClient && !activeFromClient);

            return (
              <li
                key={f.id}
                ref={el => (fieldRefs.current[f.id] = el)}
                tabIndex={0}
                role="button"
                onMouseEnter={() => { setHoveredField(f.id); setHoveredClient(null); }}
                onMouseLeave={() => setHoveredField(null)}
                onFocus={() => { setHoveredField(f.id); setHoveredClient(null); }}
                onBlur={() => setHoveredField(null)}
                className={cn("cursor-pointer transition-colors", isActive && "text-accent font-semibold", isDimmed && "opacity-40")}
              >
                {f.name}
              </li>
            );
          })}
        </ul>

        {/* Clients (right) */}
        <ul className="space-y-2 md:space-y-3 font-semibold uppercase">
          {clients.map(c => {
            const cid = c.slug;
            const activeFromField = hoveredField && (c.fields?.includes(hoveredField));
            const isActive = hoveredField ? activeFromField : hoveredClient === cid;
            const isDimmed =
              (hoveredClient && hoveredClient !== cid) ||
              (hoveredField && !activeFromField);

            return (
              <li
                key={cid}
                ref={el => (clientRefs.current[cid] = el)}
                tabIndex={0}
                role="button"
                onMouseEnter={() => { setHoveredClient(cid); setHoveredField(null); }}
                onMouseLeave={() => setHoveredClient(null)}
                onFocus={() => { setHoveredClient(cid); setHoveredField(null); }}
                onBlur={() => setHoveredClient(null)}
                className={cn("cursor-pointer transition-colors", isActive && "text-accent", isDimmed && "opacity-40")}
              >
                <a href={`/works/${c.slug}`}>{c.name}</a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6">
        <BottomNav right={{ href: "/about", label: "About" }} />
      </div>
    </main>
  );
}
