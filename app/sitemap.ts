import type { MetadataRoute } from "next";
import { getClients } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const now = new Date().toISOString();
  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/works`, lastModified: now },
    { url: `${base}/about`, lastModified: now },
  ];
  const clients = await getClients();
  for (const c of clients) {
    urls.push({ url: `${base}/works/${c.slug}`, lastModified: now });
  }
  return urls;
}
