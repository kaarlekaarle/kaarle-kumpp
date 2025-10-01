export type FieldId = string;

export type Slide = { src: string; alt?: string; blurDataURL?: string };

export type Link = { url: string; icon?: string }; // label optional, icon string key

export type Person = { name: string; role?: string };

export type Client = {
  slug: string;
  name: string;
  fields: FieldId[];     // many-to-many to fields
  summary: string | string[];
  slides: Slide[];
  links?: Link[];
  team?: Person[];
  logo?: string;        // new
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
