"use client";

import { forwardRef } from "react";
import type { Client } from "@/types/site";
import { cn } from "@/lib/cn";

interface InteractiveClientListProps {
  clients: Client[];
  highlightedSlugs: string[];
  hovered: { kind: 'field' | 'client'; slug: string } | null;
  onClientHover: (clientSlug: string) => void;
  onClientLeave: () => void;
  onClientClick: (clientSlug: string) => void;
  onKeyDown: (e: React.KeyboardEvent, clientSlug: string) => void;
}

const InteractiveClientList = forwardRef<HTMLDivElement, InteractiveClientListProps>(
  ({ 
    clients, 
    highlightedSlugs, 
    hovered, 
    onClientHover, 
    onClientLeave, 
    onClientClick, 
    onKeyDown 
  }, ref) => {
    return (
      <div 
        ref={ref}
        role="listbox" 
        aria-label="Clients"
        className="about-prose"
      >
        {clients.map(client => {
          const isHighlighted = highlightedSlugs.includes(client.slug);
          const isDimmed = hovered && !isHighlighted;
          
          return (
            <button
              key={client.slug}
              data-kind="client"
              data-slug={client.slug}
              role="option"
              aria-selected={isHighlighted}
              tabIndex={0}
              onMouseEnter={() => onClientHover(client.slug)}
              onMouseLeave={onClientLeave}
              onFocus={() => onClientHover(client.slug)}
              onBlur={onClientLeave}
              onClick={() => onClientClick(client.slug)}
              onKeyDown={(e) => onKeyDown(e, client.slug)}
              className={cn(
                "block w-full text-left uppercase tracking-wide font-normal nav-right mb-2 transition-colors",
                isHighlighted && "text-accent",
                isDimmed && "opacity-90"
              )}
              style={{ lineHeight: '1.5' }}
            >
              {client.name}
            </button>
          );
        })}
      </div>
    );
  }
);

InteractiveClientList.displayName = "InteractiveClientList";

export default InteractiveClientList;
