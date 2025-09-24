import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";

const Slide = z.object({ src: z.string(), alt: z.string().optional() });
const Link = z.object({ label: z.string(), href: z.string().url() });
const Person = z.object({ name: z.string(), role: z.string().optional() });

export const FieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  blurb: z.string().optional(),
});

export const ClientSchema = z.object({
  slug: z.string(),
  name: z.string(),
  fields: z.array(z.string()),
  summary: z.string(),
  slides: z.array(Slide),
  links: z.array(Link).optional(),
  team: z.array(Person).optional(),
});

export const SiteDataSchema = z.object({
  fields: z.array(FieldSchema),
  clients: z.array(ClientSchema),
});

let cache: any | null = null;

export async function loadSiteData() {
  if (cache) return cache;
  const dataDir = path.join(process.cwd(), "data");
  const [fieldsRaw, clientsRaw] = await Promise.all([
    fs.readFile(path.join(dataDir, "fields.json"), "utf8"),
    fs.readFile(path.join(dataDir, "clients.json"), "utf8"),
  ]);
  const json = {
    fields: JSON.parse(fieldsRaw),
    clients: JSON.parse(clientsRaw),
  };
  const parsed = SiteDataSchema.parse(json);
  cache = parsed;
  return parsed;
}

export type { Slide as _Slide, Link as _Link, Person as _Person };
