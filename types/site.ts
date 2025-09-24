export type FieldId = string;

export type Slide = { src: string; alt?: string };

export type Link = { label: string; href: string };

export type Person = { name: string; role?: string };

export type Client = {
  slug: string;
  name: string;
  fields: FieldId[];     // many-to-many to fields
  summary: string;
  slides: Slide[];
  links?: Link[];
  team?: Person[];
};

export type Field = {
  id: FieldId;
  name: string;
  blurb?: string;
};

export type SiteData = {
  fields: Field[];
  clients: Client[];
};
