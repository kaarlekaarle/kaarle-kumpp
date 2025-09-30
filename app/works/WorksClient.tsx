"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import EMLayout from "@/components/EMLayout";
import ConnectionsOverlay from "@/components/ConnectionsOverlay";
import { cn } from "@/lib/cn";
import { useWorksEdges } from "@/lib/useWorksEdges";
import { slugify } from "@/lib/works-edges";
import ClientList from "@/components/ClientList";
import type { Field, Client } from "@/types/site";

type HoveredState = { kind: 'field' | 'client'; slug: string } | null;

export default function WorksClient({ fields, clients }: { fields: Field[]; clients: Client[] }) {
  const router = useRouter();
  const [hovered, setHovered] = useState<HoveredState>(null);
  const { adj } = useWorksEdges();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<Map<string, HTMLElement>>(new Map());
  const clientRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Get related items using the edge system
  const getRelatedClients = useCallback((fieldSlug: string) => {
    if (!adj) return [];
    return Array.from(adj.byField.get(fieldSlug) || []);
  }, [adj]);
  
  const getRelatedFields = useCallback((clientSlug: string) => {
    if (!adj) return [];
    return Array.from(adj.byClient.get(clientSlug) || []);
  }, [adj]);

  // Compute highlighted and dimmed items
  const highlightedSlugs = hovered ? (
    hovered.kind === 'field' 
      ? [hovered.slug, ...getRelatedClients(hovered.slug)]
      : [hovered.slug, ...getRelatedFields(hovered.slug)]
  ) : [];

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFieldHover = (fieldId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHovered({ kind: 'field', slug: fieldId });
  };

  const handleClientHover = (clientSlug: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHovered({ kind: 'client', slug: clientSlug });
  };

  const handleFieldLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHovered(null);
    }, 100);
  };

  const handleClientLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHovered(null);
    }, 100);
  };

  const handleClientClick = (clientSlug: string) => {
    router.push(`/works/${clientSlug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent, clientSlug?: string) => {
    if (e.key === 'Enter' && clientSlug) {
      handleClientClick(clientSlug);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <main className="bg-paper text-ink relative works-page" ref={containerRef}>
      <EMLayout
        left={
          <div className="left-cell flex flex-col justify-between h-full">
            {/* Fields vertically centered to align with right middle, right-aligned */}
            <div className="flex-1 flex items-center justify-end">
              <div className="text-right leading-tight">
                <div 
                  role="listbox" 
                  aria-label="Fields"
                  className="relative"
                >
                  {fields.map(field => {
                    const fieldSlug = slugify(field.name);
                    const isHighlighted = highlightedSlugs.includes(fieldSlug);
                    const isDimmed = hovered && !isHighlighted;
                    
                    return (
                      <button
                        key={field.id}
                        ref={el => { 
                          if (el && el.offsetParent !== null) {
                            fieldRefs.current.set(fieldSlug, el);
                          }
                        }}
                        data-kind="field"
                        data-slug={fieldSlug}
                        role="option"
                        aria-selected={isHighlighted}
                        tabIndex={0}
                        onMouseEnter={() => handleFieldHover(fieldSlug)}
                        onMouseLeave={handleFieldLeave}
                        onFocus={() => handleFieldHover(fieldSlug)}
                        onBlur={handleFieldLeave}
                        className={cn(
                          "block w-full text-right uppercase tracking-wide font-medium text-[18px] font-serif mb-6 transition-colors cursor-default",
                          isHighlighted && "text-ink",
                          isDimmed && "opacity-90"
                        )}
                      >
                        {field.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Empty bottom space to align with ABOUT */}
            <div className="flex-shrink-0">
              {/* This creates the same spacing as the main page */}
            </div>
          </div>
        }
        rightTop={<a href="/about" className="uppercase tracking-wide font-normal text-[20px] font-sans">ABOUT</a>}
        rightMiddle={
          <div 
            role="listbox" 
            aria-label="Clients"
            className="font-serif leading-[1.4] text-[16px] text-accent font-medium"
          >
            {clients.map(client => {
              const isHighlighted = highlightedSlugs.includes(client.slug);
              const isDimmed = hovered && !isHighlighted;
              
              return (
                <button
                  key={client.slug}
                  ref={el => { 
                    if (el && el.offsetParent !== null) {
                      clientRefs.current.set(client.slug, el);
                    }
                  }}
                  data-kind="client"
                  data-slug={client.slug}
                  role="option"
                  aria-selected={isHighlighted}
                  tabIndex={0}
                  onMouseEnter={() => handleClientHover(client.slug)}
                  onMouseLeave={handleClientLeave}
                  onFocus={() => handleClientHover(client.slug)}
                  onBlur={handleClientLeave}
                  onClick={() => handleClientClick(client.slug)}
                  onKeyDown={(e) => handleKeyDown(e, client.slug)}
                  className={cn(
                    "block w-full text-left uppercase tracking-wide font-normal text-[16px] font-sans text-accent mb-2 transition-colors",
                    isHighlighted && "text-accent",
                    isDimmed && "opacity-90"
                  )}
                >
                  {client.name}
                </button>
              );
            })}
          </div>
        }
        rightBottom={<a href="/" className="uppercase tracking-wide font-normal text-[20px] font-sans leading-none">KAARLE {String.fromCharCode(0xF8FF)} KUMPP.</a>}
      />
      <ConnectionsOverlay 
        hoveredItem={hovered}
        fieldRefs={fieldRefs.current}
        clientRefs={clientRefs.current}
        containerRef={containerRef}
      />
    </main>
  );
}