export type Edge = { client: string; field: string };

// fetch JSON
export async function loadEdges(): Promise<Edge[]> {
  try {
    const r = await fetch("/data/works-content-edges.json");
    if (!r.ok) {
      throw new Error(`Failed to fetch edges: ${r.status}`);
    }
    return (await r.json()) as Edge[];
  } catch (error) {
    console.error('Error loading edges:', error);
    return [];
  }
}

// adjacency maps
export function buildAdjacency(edges: Edge[]) {
  const byField = new Map<string, Set<string>>();
  const byClient = new Map<string, Set<string>>();
  for (const e of edges) {
    if (!byField.has(e.field)) byField.set(e.field, new Set());
    if (!byClient.has(e.client)) byClient.set(e.client, new Set());
    byField.get(e.field)!.add(e.client);
    byClient.get(e.client)!.add(e.field);
  }
  return { byField, byClient };
}

// slugify helper: maps pretty labels to ids in JSON
export function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}
