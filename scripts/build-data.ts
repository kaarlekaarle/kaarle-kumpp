import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";
import { z } from "zod";

function slugify(s: string) {
  return s.toLowerCase()
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const ROOT = process.cwd();
const INPUT = process.env.WORKBOOK_PATH || "content/works_content.xlsx";
const OUT = "data";

const Cat = z.object({ id: z.string(), name: z.string(), blurb: z.string().optional() });
const Slide = z.object({ src: z.string(), alt: z.string().optional() });
const Link = z.object({ label: z.string(), href: z.string().url().or(z.string()) });
const Person = z.object({ name: z.string(), role: z.string().optional() });

type CatT = z.infer<typeof Cat>;

function readSheet(book: XLSX.WorkBook, name: string) {
  const ws = book.Sheets[name];
  if (!ws) return [];
  return XLSX.utils.sheet_to_json<Record<string, any>>(ws, { raw: false });
}

function normKey(k: string) {
  return k.trim().toLowerCase().replace(/\s+/g, "_");
}

function getStr(row: any, ...keys: string[]) {
  for (const k of keys) {
    const v = row[k] ?? row[normKey(k)] ?? row[k.toLowerCase()];
    if (v != null && String(v).trim() !== "") return String(v).trim();
  }
  return "";
}

function ensureDir(p: string) { fs.mkdirSync(p, { recursive: true }); }

function main() {
  const wb = XLSX.readFile(path.join(ROOT, INPUT));
  const catsRows = readSheet(wb, "CATEGORIES");
  const catsDescRows = readSheet(wb, "CATEGORIES DESCRIPTION");
  const descRows = readSheet(wb, "DESCRIPTION");
  const matRows = readSheet(wb, "MATERIALS");
  const linkRows = readSheet(wb, "LINKS");
  const teamRows = readSheet(wb, "TEAM");

  // Categories
  const blurbById = new Map<string,string>();
  for (const r of catsDescRows) {
    const id = getStr(r, "id", "category_id") || slugify(getStr(r, "name"));
    const blurb = getStr(r, "blurb", "description");
    if (id) blurbById.set(id, blurb);
  }

  const fields: CatT[] = [];
  const fieldIdByName = new Map<string,string>();
  for (const r of catsRows) {
    const name = getStr(r, "name", "category", "field");
    if (!name) continue;
    const id = getStr(r, "id") || slugify(name);
    const blurb = blurbById.get(id) || undefined;
    fields.push(Cat.parse({ id, name, blurb }));
    fieldIdByName.set(name.toLowerCase(), id);
  }

  // Clients (aggregate)
  type ClientAgg = {
    slug: string; name: string;
    summary?: string;
    fields: Set<string>;
    slides: { src: string; alt?: string }[];
    links: { label: string; href: string }[];
    team: { name: string; role?: string }[];
  };
  const clients = new Map<string, ClientAgg>();

  function upsertClient(nameRaw: string) {
    const name = nameRaw.trim();
    const slug = slugify(name);
    let c = clients.get(slug);
    if (!c) {
      c = { slug, name, fields: new Set(), slides: [], links: [], team: [] };
      clients.set(slug, c);
    }
    return c!;
  }

  // DESCRIPTION → summary (+ optional field hints if present)
  for (const r of descRows) {
    const name = getStr(r, "client", "name", "title");
    if (!name) continue;
    const c = upsertClient(name);
    const summary = getStr(r, "summary", "description", "blurb");
    if (summary) c.summary = summary;
    // optional columns like "fields": "Advertising; Identity Building"
    const fcol = getStr(r, "fields", "categories");
    if (fcol) {
      for (const f of fcol.split(/[;,]/).map(s=>s.trim()).filter(Boolean)) {
        const id = fieldIdByName.get(f.toLowerCase()) || slugify(f);
        c.fields.add(id);
      }
    }
  }

  // MATERIALS → slides
  for (const r of matRows) {
    const name = getStr(r, "client", "name");
    const src = getStr(r, "src", "image", "path", "url");
    if (!name || !src) continue;
    const c = upsertClient(name);
    const alt = getStr(r, "alt", "description", "caption");
    c.slides.push(Slide.parse({ src, alt }));
  }

  // LINKS
  for (const r of linkRows) {
    const name = getStr(r, "client", "name");
    const label = getStr(r, "label", "title");
    const href = getStr(r, "href", "url");
    if (!name || !label || !href) continue;
    const c = upsertClient(name);
    c.links.push(Link.parse({ label, href }));
  }

  // TEAM
  for (const r of teamRows) {
    const name = getStr(r, "client", "name");
    const person = getStr(r, "name", "person");
    if (!name || !person) continue;
    const role = getStr(r, "role", "title");
    const c = upsertClient(name);
    c.team.push(Person.parse({ name: person, role }));
  }

  // Ensure clients have at least one field if MATERIALS encoded field info absent
  // Optional: nothing enforced here.

  // Emit JSON
  ensureDir(path.join(ROOT, OUT));
  fs.writeFileSync(path.join(ROOT, OUT, "fields.json"), JSON.stringify(fields, null, 2));
  const clientsOut = [...clients.values()].map(c => ({
    slug: c.slug,
    name: c.name,
    summary: c.summary || "",
    fields: [...c.fields],
    slides: c.slides,
    links: c.links,
    team: c.team
  }));
  fs.writeFileSync(path.join(ROOT, OUT, "clients.json"), JSON.stringify(clientsOut, null, 2));
  console.log(`Wrote ${fields.length} fields and ${clientsOut.length} clients to /data`);
}

main();
