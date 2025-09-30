"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { measureSpace } from "@/lib/measure";
import { useWorksEdges } from "@/lib/useWorksEdges";
import { slugify } from "@/lib/works-edges";
import { bezierPath, Pt } from "@/lib/curve";

interface LineEdge {
  key: string;
  d: string;
  width: number;
  color: 'black' | 'blue';
}

interface ConnectionsOverlayProps {
  hoveredItem: { kind: 'field' | 'client'; slug: string } | null;
  fieldRefs: Map<string, HTMLElement>;
  clientRefs: Map<string, HTMLElement>;
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function ConnectionsOverlay({ 
  hoveredItem, 
  fieldRefs, 
  clientRefs, 
  containerRef 
}: ConnectionsOverlayProps) {
  const [edges, setEdges] = useState<LineEdge[]>([]);
  const [corridorBounds, setCorridorBounds] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { adj } = useWorksEdges();

  const recomputeEdges = useCallback(() => {
    
    if (!hoveredItem || !containerRef.current || !adj) {
      setEdges([]);
      setCorridorBounds(null);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const newEdges: LineEdge[] = [];
    const startPad = 8, endPad = 8;

    if (hoveredItem.kind === 'field') {
      const fieldEl = fieldRefs.get(hoveredItem.slug);
      if (!fieldEl) return;

      const fieldRect = fieldEl.getBoundingClientRect();
      const fieldStartX = fieldRect.right - containerRect.left + startPad;
      const fieldMidY = fieldRect.top + fieldRect.height / 2 - containerRect.top;
      
      console.log('Field positioning debug:', {
        fieldSlug: hoveredItem.slug,
        fieldRect: { top: fieldRect.top, left: fieldRect.left, right: fieldRect.right, height: fieldRect.height },
        containerRect: { top: containerRect.top, left: containerRect.left, width: containerRect.width, height: containerRect.height },
        calculated: { x: fieldStartX, y: fieldMidY }
      });
      
      // Get related clients from adjacency map
      const relatedClients = adj.byField.get(hoveredItem.slug) || new Set();
      
      // Connect only to related clients
      clientRefs.forEach((clientEl, clientSlug) => {
        if (relatedClients.has(clientSlug)) {
          const clientRect = clientEl.getBoundingClientRect();
          const clientEndX = clientRect.left - containerRect.left - endPad;
          const clientMidY = clientRect.top + clientRect.height / 2 - containerRect.top;
          
          console.log('Client positioning debug:', {
            clientSlug,
            clientRect: { top: clientRect.top, left: clientRect.left, height: clientRect.height },
            calculated: { x: clientEndX, y: clientMidY }
          });
          

          const S = {
            x: fieldStartX,
            y: fieldMidY,
          };
          const E = {
            x: clientEndX,
            y: clientMidY,
          };
          const seedKey = `${hoveredItem.slug}->${clientSlug}`;
          const { d, width } = bezierPath(S, E, seedKey);

          newEdges.push({
            key: seedKey,
            d,
            width,
            color: 'black' // Field to client = black
          });
        }
      });
    } else {
      const clientEl = clientRefs.get(hoveredItem.slug);
      if (!clientEl) return;

      const clientRect = clientEl.getBoundingClientRect();
      const clientStartX = clientRect.left - containerRect.left - endPad;
      const clientMidY = clientRect.top + clientRect.height / 2 - containerRect.top;

      // Get related fields from adjacency map
      const relatedFields = adj.byClient.get(hoveredItem.slug) || new Set();
      console.log(`Client ${hoveredItem.slug} -> related fields:`, Array.from(relatedFields));

      // Connect only to related fields
      fieldRefs.forEach((fieldEl, fieldSlug) => {
        if (relatedFields.has(fieldSlug)) {
          const fieldRect = fieldEl.getBoundingClientRect();
          const fieldEndX = fieldRect.right - containerRect.left + startPad;
          const fieldMidY = fieldRect.top + fieldRect.height / 2 - containerRect.top;

          const S = {
            x: clientStartX,
            y: clientMidY,
          };
          const E = {
            x: fieldEndX,
            y: fieldMidY,
          };
          const seedKey = `${fieldSlug}->${hoveredItem.slug}`;
          const { d, width } = bezierPath(S, E, seedKey);

          newEdges.push({
            key: seedKey,
            d,
            width,
            color: 'blue' // Client to field = blue
          });
        }
      });
    }

    console.log(`Computed ${newEdges.length} edges for ${hoveredItem.kind} ${hoveredItem.slug}`);
    setEdges(newEdges);
    
    // Compute corridor bounds for clipping
    if (newEdges.length > 0) {
      const fieldStarts: number[] = [];
      const clientEnds: number[] = [];
      
      // Collect all start and end X coordinates
      if (hoveredItem.kind === 'field') {
        const fieldEl = fieldRefs.get(hoveredItem.slug);
        if (fieldEl) {
          const fieldRect = fieldEl.getBoundingClientRect();
          fieldStarts.push(fieldRect.right - containerRect.left + startPad);
        }
        clientRefs.forEach((clientEl, clientSlug) => {
          const relatedClients = adj.byField.get(hoveredItem.slug) || new Set();
          if (relatedClients.has(clientSlug)) {
            const clientRect = clientEl.getBoundingClientRect();
            clientEnds.push(clientRect.left - containerRect.left - endPad);
          }
        });
      } else {
        const clientEl = clientRefs.get(hoveredItem.slug);
        if (clientEl) {
          const clientRect = clientEl.getBoundingClientRect();
          clientEnds.push(clientRect.left - containerRect.left - endPad);
        }
        fieldRefs.forEach((fieldEl, fieldSlug) => {
          const relatedFields = adj.byClient.get(hoveredItem.slug) || new Set();
          if (relatedFields.has(fieldSlug)) {
            const fieldRect = fieldEl.getBoundingClientRect();
            fieldStarts.push(fieldRect.right - containerRect.left + startPad);
          }
        });
      }
      
      if (fieldStarts.length > 0 && clientEnds.length > 0) {
        const corridorX = Math.min(...fieldStarts) - 2;
        const corridorW = Math.max(...clientEnds) - corridorX + 4;
        
        // Ensure positive dimensions
        if (corridorW > 0 && corridorX >= 0) {
          setCorridorBounds({
            x: corridorX,
            y: 0,
            width: corridorW,
            height: containerRect.height
          });
        } else {
          setCorridorBounds(null);
        }
      }
    } else {
      setCorridorBounds(null);
    }
    
  }, [hoveredItem, fieldRefs, clientRefs, adj]);

  useEffect(() => {
    recomputeEdges();
  }, [recomputeEdges]);

  useEffect(() => {
    const handleResize = () => recomputeEdges();
    const handleScroll = () => recomputeEdges();

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Recompute after fonts load
    if (document.fonts) {
      document.fonts.ready.then(recomputeEdges);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [recomputeEdges]);

  // ResizeObserver for container changes
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      recomputeEdges();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [recomputeEdges]);

          return (
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden="true"
              style={{ zIndex: 10 }}
            >
              <defs>
                {corridorBounds && (
                  <clipPath id="kk-corridor">
                    <rect 
                      x={corridorBounds.x} 
                      y={corridorBounds.y} 
                      width={corridorBounds.width} 
                      height={corridorBounds.height} 
                    />
                  </clipPath>
                )}
              </defs>
              <g clipPath={corridorBounds ? "url(#kk-corridor)" : undefined}>
                {edges.map((edge) => (
                  <path
                    key={edge.key}
                    d={edge.d}
                    fill="none"
                    stroke={edge.color === 'black' ? '#000000' : '#1F37FF'}
                    strokeWidth={edge.width}
                    strokeOpacity="0.9"
                  />
                ))}
              </g>
            </svg>
          );
}