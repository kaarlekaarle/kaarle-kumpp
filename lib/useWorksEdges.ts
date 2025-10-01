import { useEffect, useState } from "react";
import { loadEdges, buildAdjacency, Edge } from "@/lib/works-edges";

export function useWorksEdges() {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [adj, setAdj] = useState<ReturnType<typeof buildAdjacency>>();

  useEffect(() => {
    loadEdges()
      .then(e => {
        setEdges(e);
        setAdj(buildAdjacency(e));
      })
      .catch(error => {
        console.error('Failed to load edges:', error);
        // Set empty state on error
        setEdges([]);
        setAdj(buildAdjacency([]));
      });
  }, []);

  return { edges, adj };
}
