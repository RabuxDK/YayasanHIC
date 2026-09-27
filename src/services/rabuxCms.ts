/**
 * Generic RabuxID CMS helper for Astro builds.
 * Reads `${PUBLIC_API_URL}/api/cms/v1/websites/${PUBLIC_WEBSITE_SLUG}` once per build process.
 * This file is copied as-is into every Astro project (boilerplate-astro, gigglebox, scaffolded sites).
 */

export type FieldType = 'text' | 'textarea' | 'image' | 'url' | 'number' | 'boolean' | 'list';
export type FieldValue = string | number | boolean;
export interface ScalarField {
  key: string;
  title: string;
  type: Exclude<FieldType, 'list'>;
  content: FieldValue;
}
export type ListItem = ScalarField[];
export interface Field {
  key: string;
  title: string;
  type: FieldType;
  content: FieldValue | ListItem[];
}
export interface Section {
  key: string;
  title: string;
  order: number;
  fields: Field[];
}
export interface CmsProduct {
  id: string;
  name: string;
  sku: string | null;
  price: number | null;
  stock: number;
  category: string;
  subcategory: string | null;
  tags: string[];
  sortOrder: number;
  isFeatured: boolean;
  description: string | null;
  image: string | null;
  status: string;
}
export interface CmsResponse {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  status: string;
  sections: Record<string, Section>;
  products: CmsProduct[];
}

let cache: Promise<CmsResponse> | undefined;

/** Fetches the CMS payload once; every later call (including parallel ones) reuses the same promise. */
export function getCms(): Promise<CmsResponse> {
  return (cache ??= load());
}

async function load(): Promise<CmsResponse> {
  const base: string | undefined = import.meta.env.PUBLIC_API_URL;
  const slug: string | undefined = import.meta.env.PUBLIC_WEBSITE_SLUG;
  const missing = [!base && 'PUBLIC_API_URL', !slug && 'PUBLIC_WEBSITE_SLUG'].filter(Boolean);
  if (!base || !slug) throw new Error(`[rabuxCms] environment variable wajib belum diset: ${missing.join(', ')}`);

  const apiBase = base.replace(/\/$/, '');
  const url = `${apiBase}/api/cms/v1/websites/${encodeURIComponent(slug)}`;
  let res: Response;
  try {
    res = await fetch(url, { headers: { Accept: 'application/json' } });
  } catch (err) {
    throw new Error(`[rabuxCms] ${url} -> request gagal: ${err instanceof Error ? err.message : String(err)}`, { cause: err });
  }
  if (!res.ok) throw new Error(`[rabuxCms] ${url} -> HTTP ${res.status}`);

  const data = (await res.json()) as CmsResponse;
  data.sections ??= {};
  data.products ??= [];
  // Media_Library uploads live on the API host; prefix them so sites hosted elsewhere can load them.
  const fixImage = (f: ScalarField | Field) => {
    if (f.type === 'image' && typeof f.content === 'string' && f.content.startsWith('/uploads/')) {
      f.content = `${apiBase}${f.content}`;
    }
  };
  for (const section of Object.values(data.sections)) {
    for (const field of section.fields) {
      fixImage(field);
      if (field.type === 'list' && Array.isArray(field.content)) field.content.forEach((item) => item.forEach(fixImage));
    }
  }
  return data;
}

export async function getSection(key: string): Promise<Section | undefined> {
  return (await getCms()).sections[key];
}

/** All sections sorted by `order`, then `key`. */
export async function getSections(): Promise<Section[]> {
  return Object.values((await getCms()).sections).sort((a, b) => a.order - b.order || a.key.localeCompare(b.key));
}

export async function getField<T = FieldValue | ListItem[]>(sectionKey: string, fieldKey: string): Promise<T | undefined> {
  const field = (await getSection(sectionKey))?.fields.find((f) => f.key === fieldKey);
  return field?.content as T | undefined;
}

/** List_Item of a `list` field as plain objects `{ [subFieldKey]: content }`; `[]` if missing or not a list. */
export async function getItems(sectionKey: string, fieldKey: string): Promise<Record<string, FieldValue>[]> {
  const content = await getField(sectionKey, fieldKey);
  if (!Array.isArray(content)) return [];
  return content.map((item) => Object.fromEntries(item.map((f) => [f.key, f.content])));
}
