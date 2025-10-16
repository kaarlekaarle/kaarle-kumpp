import { z } from "zod";
import XLSX from "xlsx";
import fs from "node:fs/promises";
import path from "node:path";
import type { Field, Client } from "@/types/site";

// Helper function to slugify strings
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to parse links
function parseLinks(linksStr: string | undefined): { url: string; icon?: string }[] {
  if (!linksStr || linksStr.trim() === '') return [];
  
  const links = linksStr.split(',').map(link => link.trim());
  return links.map(link => {
    // Check if it's a URL
    if (link.startsWith('http')) {
      return {
        url: link,
        icon: 'homepage'
      };
    }
    // Otherwise it's a platform name
    return {
      url: `https://${link.toLowerCase()}.com`,
      icon: link.toLowerCase()
    };
  });
}

// Helper function to parse team members
function parseTeam(teamStr: string | undefined): { name: string; role?: string }[] {
  if (!teamStr || teamStr.trim() === '') return [];
  
  return teamStr.split(',').map(member => ({
    name: member.trim(),
    role: 'Team Member'
  }));
}

// Schema for Excel data validation
const ExcelFieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  blurb: z.string().optional(),
});

const ExcelClientSchema = z.object({
  slug: z.string(),
  name: z.string(),
  fields: z.array(z.string()),
  summary: z.union([z.string(), z.array(z.string())]),
  slides: z.array(z.object({
    src: z.string(),
    alt: z.string().optional(),
  })),
  links: z.array(z.object({
    url: z.string(),
    icon: z.string().optional(),
  })).optional(),
  team: z.array(z.object({
    name: z.string(),
    role: z.string().optional(),
  })).optional(),
});

const ExcelSiteDataSchema = z.object({
  fields: z.array(ExcelFieldSchema),
  clients: z.array(ExcelClientSchema),
});

export type ExcelSiteData = z.infer<typeof ExcelSiteDataSchema>;

let cache: ExcelSiteData | null = null;

export async function loadExcelData(): Promise<ExcelSiteData> {
  if (cache) return cache;

  const filePath = path.join(process.cwd(), 'content', 'works_content.xlsx');
  
  // Check if Excel file exists
  try {
    await fs.access(filePath);
  } catch {
    throw new Error(`Excel file not found at ${filePath}`);
  }

  // Read Excel file
  const workbook = XLSX.readFile(filePath);
  
  // Get data from each sheet
  const categoriesSheet = workbook.Sheets['CATEGORIES'];
  const descriptionSheet = workbook.Sheets['DESCRIPTION'];
  const materialsSheet = workbook.Sheets['MATERIALS'];
  const linksSheet = workbook.Sheets['LINKS'];
  const teamSheet = workbook.Sheets['TEAM'];

  if (!categoriesSheet || !descriptionSheet) {
    throw new Error('Required sheets not found in Excel file');
  }

  // Convert to JSON
  const categoriesData = XLSX.utils.sheet_to_json(categoriesSheet, { header: 1 });
  const descriptionData = XLSX.utils.sheet_to_json(descriptionSheet, { header: 1 });
  const materialsData = XLSX.utils.sheet_to_json(materialsSheet, { header: 1 });
  const linksData = XLSX.utils.sheet_to_json(linksSheet, { header: 1 });
  const teamData = XLSX.utils.sheet_to_json(teamSheet, { header: 1 });

  // Get field names from first row (skip the first column which is "Client")
  const fieldNames = (categoriesData[0] as string[]).slice(1);

  // Create fields array
  const fields: Field[] = fieldNames.map(name => ({
    id: slugify(name),
    name: name,
    blurb: `Description for ${name}`
  }));

  // Create clients array
  const clients: Client[] = [];

  // Process each client (skip header row)
  for (let i = 1; i < categoriesData.length; i++) {
    const row = categoriesData[i] as any[];
    const clientName = row[0];
    
    if (!clientName || clientName.trim() === '') continue;
    
    // Get client's fields (X marks indicate which fields apply)
    const clientFields: string[] = [];
    for (let j = 1; j < row.length; j++) {
      if (row[j] === 'X') {
        clientFields.push(slugify(fieldNames[j - 1]));
      }
    }
    
    // Get description
    const descriptionRow = descriptionData.find((row: any) => row[0] === clientName);
    const description = descriptionRow ? (descriptionRow as any[])[1] : '';
    
    // Get materials
    const materialsRow = materialsData.find((row: any) => row[0] === clientName);
    const materials = materialsRow ? (materialsRow as any[])[1] : '';
    
    // Get links
    const linksRow = linksData.find((row: any) => row[0] === clientName);
    const links = linksRow ? parseLinks((linksRow as any[])[1]) : [];
    
    // Get team
    const teamRow = teamData.find((row: any) => row[0] === clientName);
    const team = teamRow ? parseTeam((teamRow as any[])[1]) : [];
    
    // Create client object
    const client: Client = {
      slug: slugify(clientName),
      name: clientName.toUpperCase(),
      fields: clientFields,
      summary: Array.isArray(description) ? description.join(' ') : description,
      slides: [
        {
          src: `/images/portrait.jpg`,
          alt: `${clientName} work example`
        }
      ],
      links: links,
      team: team
    };
    
    clients.push(client);
  }

  const siteData: ExcelSiteData = {
    fields,
    clients
  };

  // Validate the data
  const parsed = ExcelSiteDataSchema.parse(siteData);
  cache = parsed;
  return parsed;
}

export async function getExcelFields(): Promise<Field[]> {
  const data = await loadExcelData();
  return data.fields;
}

export async function getExcelClients(): Promise<Client[]> {
  const data = await loadExcelData();
  return data.clients;
}
