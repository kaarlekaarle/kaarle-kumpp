"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EMLayout from "@/components/EMLayout";
import ConnectionsOverlay from "@/components/ConnectionsOverlay";
import { cn } from "@/lib/cn";
import { useWorksEdges } from "@/lib/useWorksEdges";
import { slugify } from "@/lib/works-edges";
import InteractiveClientList from "@/components/InteractiveClientList";
import LogoMark from "@/components/LogoMark";
import type { Field, Client } from "@/types/site";

type HoveredState = { kind: 'field' | 'client'; slug: string } | null;

export default function WorksClient({ fields, clients }: { fields: Field[]; clients: Client[] }) {
  // Logo block for mobile
  const logoBlock = (
    <div className="logo">
      <a href="/" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
        <div className="text-center leading-tight">
          <div className="sans fs-logo uppercase tracking-wide font-normal">KAARLE</div>
          <div className="my-1 flex justify-center fs-logo">
            <LogoMark />
          </div>
          <div className="sans fs-logo uppercase tracking-wide font-normal">KUMPP.</div>
        </div>
      </a>
    </div>
  );
  const router = useRouter();
  const [hovered, setHovered] = useState<HoveredState>(null);
  const { adj } = useWorksEdges();
  
  // Mobile field selection state
  const [selectedField, setSelectedField] = useState<string | null>(null);
  
  // Debug: Log state changes
  useEffect(() => {
    console.log('Selected field state changed to:', selectedField);
  }, [selectedField]);
  
  // Custom ordering: pyramid shape - shortest at ends, longest in middle
  const orderedClients = React.useMemo(() => {
    // Don't filter - show all clients, just use for opacity calculation
    const sortedByLength = [...clients].sort((a, b) => a.name.length - b.name.length);
    // Pyramid pattern per spec:
    // positions 0.. take 1st, 3rd, 5th ... shortest (odd-ranked) in order,
    // then append 2nd, 4th, 6th ... shortest (even-ranked) in reverse,
    // yielding shortest at ends and longest in the middle.
    const oddRanked = sortedByLength.filter((_, idx) => idx % 2 === 0); // 1st, 3rd, 5th ...
    const evenRankedReversed = sortedByLength.filter((_, idx) => idx % 2 === 1).reverse(); // ... 4th, 2nd
    return [...oddRanked, ...evenRankedReversed];
  }, [clients, selectedField]);
  
  // Handle field selection
  const handleFieldClick = (fieldSlug: string | null) => {
    console.log('Field clicked:', fieldSlug);
    setSelectedField(fieldSlug);
  };
  
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
        leftTop={null}
        leftMiddle={
          <div className="text-right leading-tight">
            <div 
              role="listbox" 
              aria-label="Fields"
              className="relative"
            >
              {fields.map((field, index) => {
                const fieldSlug = slugify(field.name);
                const isHighlighted = highlightedSlugs.includes(fieldSlug);
                const isDimmed = hovered && !isHighlighted;
                const isLast = index === fields.length - 1;
                
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
                      "block w-full text-right tracking-wide font-medium transition-colors cursor-default",
                      !isLast && "mb-6",
                      isHighlighted && "text-ink",
                      isDimmed && "opacity-90"
                    )}
                    style={{ 
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1em',
                      fontVariant: 'small-caps',
                      fontWeight: '400'
                    }}
                  >
                    {field.name}
                  </button>
                );
              })}
            </div>
          </div>
        }
        leftBottom={null}
        rightTop={<Link href="/" className="nav-right">KAARLE {String.fromCharCode(0xF8FF)} KUMPP.</Link>}
        rightMiddle={
          <InteractiveClientList
            ref={el => {
              if (el) {
                // Set up refs for each client button
                orderedClients.forEach(client => {
                  const clientEl = el.querySelector(`[data-slug="${client.slug}"]`) as HTMLElement;
                  if (clientEl && clientEl.offsetParent !== null) {
                    clientRefs.current.set(client.slug, clientEl);
                  }
                });
              }
            }}
            clients={orderedClients}
            highlightedSlugs={highlightedSlugs}
            hovered={hovered}
            onClientHover={handleClientHover}
            onClientLeave={handleClientLeave}
            onClientClick={handleClientClick}
            onKeyDown={handleKeyDown}
          />
        }
        rightBottom={<Link href="/about" className="nav-right">ABOUT</Link>}
        left={logoBlock}
        mobileAdditionalContent={
          <>
            {/* Fields Container */}
            <div data-id="mobile-fields" className="text-center" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', marginTop: '2.5rem', marginBottom: '2.5rem' }}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.7em',
                fontVariant: 'small-caps',
                fontWeight: '400',
                color: '#000000 !important',
                lineHeight: '1.4'
              }}>
                {/* Line 1 */}
                <div>
                  <span 
                    className="mobile-field-selector"
                    onClick={() => {
                      console.log('ALL CLIENTS clicked');
                      handleFieldClick(null);
                    }}
                    style={{ 
                      textDecoration: selectedField === null ? 'underline' : 'none',
                      cursor: 'pointer',
                      color: 'inherit',
                      borderBottom: selectedField === null ? '1px solid black' : 'none'
                    }}
                  >
                    ALL CLIENTS
                  </span>{", "}
                  <span 
                    className="mobile-field-selector"
                    onClick={() => {
                      console.log('Field clicked:', fields[0].id);
                      handleFieldClick(fields[0].id);
                    }}
                    style={{ 
                      textDecoration: selectedField === fields[0].id ? 'underline' : 'none',
                      cursor: 'pointer',
                      color: 'inherit',
                      borderBottom: selectedField === fields[0].id ? '1px solid black' : 'none'
                    }}
                  >
                    {fields[0].name.toUpperCase()}
                  </span>{", "}
                  <span 
                    className="mobile-field-selector"
                    onClick={() => {
                      console.log('Field clicked:', fields[1].id);
                      handleFieldClick(fields[1].id);
                    }}
                    style={{ 
                      textDecoration: selectedField === fields[1].id ? 'underline' : 'none',
                      cursor: 'pointer',
                      color: 'inherit',
                      borderBottom: selectedField === fields[1].id ? '1px solid black' : 'none'
                    }}
                  >
                    {fields[1].name.toUpperCase()}
                  </span>{", "}
                </div>
                
                {/* Line 2 */}
                <div>
                  <span 
                    className="mobile-field-selector"
                    onClick={() => {
                      console.log('Field clicked:', fields[2].id);
                      handleFieldClick(fields[2].id);
                    }}
                    style={{ 
                      textDecoration: selectedField === fields[2].id ? 'underline' : 'none',
                      cursor: 'pointer',
                      color: 'inherit',
                      borderBottom: selectedField === fields[2].id ? '1px solid black' : 'none'
                    }}
                  >
                    {fields[2].name.toUpperCase()}
                  </span>{", "}
                  <span 
                    className="mobile-field-selector"
                    onClick={() => {
                      console.log('Field clicked:', fields[3].id);
                      handleFieldClick(fields[3].id);
                    }}
                    style={{ 
                      textDecoration: selectedField === fields[3].id ? 'underline' : 'none',
                      cursor: 'pointer',
                      color: 'inherit',
                      borderBottom: selectedField === fields[3].id ? '1px solid black' : 'none'
                    }}
                  >
                    {fields[3].name.toUpperCase()}
                  </span>{", "}
                </div>
                
                {/* Line 3 */}
                <div>
                  <span 
                    className="mobile-field-selector"
                    onClick={() => {
                      console.log('Field clicked:', fields[4].id);
                      handleFieldClick(fields[4].id);
                    }}
                    style={{ 
                      textDecoration: selectedField === fields[4].id ? 'underline' : 'none',
                      cursor: 'pointer',
                      color: 'inherit',
                      borderBottom: selectedField === fields[4].id ? '1px solid black' : 'none'
                    }}
                  >
                    {fields[4].name.toUpperCase()}
                  </span>{", "}
                  <span 
                    className="mobile-field-selector"
                    onClick={() => {
                      console.log('Field clicked:', fields[5].id);
                      handleFieldClick(fields[5].id);
                    }}
                    style={{ 
                      textDecoration: selectedField === fields[5].id ? 'underline' : 'none',
                      cursor: 'pointer',
                      color: 'inherit',
                      borderBottom: selectedField === fields[5].id ? '1px solid black' : 'none'
                    }}
                  >
                    {fields[5].name.toUpperCase()}
                  </span>{", "}
                  <span 
                    className="mobile-field-selector"
                    onClick={() => {
                      console.log('Field clicked:', fields[6].id);
                      handleFieldClick(fields[6].id);
                    }}
                    style={{ 
                      textDecoration: selectedField === fields[6].id ? 'underline' : 'none',
                      cursor: 'pointer',
                      color: 'inherit',
                      borderBottom: selectedField === fields[6].id ? '1px solid black' : 'none'
                    }}
                  >
                    {fields[6].name.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Clients Container */}
            <div data-id="mobile-clients" className="text-center" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', marginBottom: '2.5rem' }}>
              {orderedClients.map((client, index) => {
                // Check if client matches selected field
                const isMatch = !selectedField || (client.fields && client.fields.includes(selectedField));
                const opacity = isMatch ? 1 : 0.25; // 25% opacity = 75% fade
                
                return (
                  <div 
                    key={client.slug} 
                    onClick={() => handleClientClick(client.slug)}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--fs-right)',
                      fontWeight: '400',
                      lineHeight: '1.2',
                      textTransform: 'uppercase',
                      letterSpacing: '.04em',
                      marginBottom: '0.5rem',
                      cursor: 'pointer',
                      opacity: opacity,
                      transition: 'opacity 0.3s ease',
                      color: '#0000EE'
                    }}
                  >
                    {client.name}
                  </div>
                );
              })}
            </div>
            
            {/* Separate container for ABOUT link */}
            <div data-id="mobile-nav" className="mobile-nav" style={{ textAlign: 'center', width: '100%', marginTop: '2.5rem' }}>
              <a href="/about" className="nav-right">ABOUT</a>
            </div>
          </>
        }
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