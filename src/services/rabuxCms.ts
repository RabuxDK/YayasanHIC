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
export interface CmsPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  category: string | null;
  tags: string[];
  publishedAt: string | null;
  authorName: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
  readingTime: number;
}

export interface CmsResponse {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  status: string;
  sections: Record<string, Section>;
  products: CmsProduct[];
  posts: CmsPost[];
}

let cache: Promise<CmsResponse> | undefined;

/** Fetches the CMS payload once; every later call (including parallel ones) reuses the same promise. */
export function getCms(): Promise<CmsResponse> {
  return (cache ??= load());
}

async function load(): Promise<CmsResponse> {
  const base: string | undefined = import.meta.env.PUBLIC_API_URL;
  const slug: string | undefined = import.meta.env.PUBLIC_WEBSITE_SLUG;
  const apiKey: string | undefined = import.meta.env.PUBLIC_WEBSITE_API_KEY || import.meta.env.PUBLIC_CMS_API_KEY;
  const missing = [!base && 'PUBLIC_API_URL', !slug && 'PUBLIC_WEBSITE_SLUG'].filter(Boolean);
  if (!base || !slug) throw new Error(`[rabuxCms] environment variable wajib belum diset: ${missing.join(', ')}`);

  const apiBase = base.replace(/\/$/, '');
  const url = `${apiBase}/api/cms/v1/websites/${encodeURIComponent(slug)}`;
  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        ...(apiKey ? { 'x-api-key': apiKey } : {}),
      },
    });
  } catch (err) {
    throw new Error(`[rabuxCms] ${url} -> request gagal: ${err instanceof Error ? err.message : String(err)}`, { cause: err });
  }
  if (!res.ok) throw new Error(`[rabuxCms] ${url} -> HTTP ${res.status}`);

  const data = (await res.json()) as CmsResponse;
  data.sections ??= {};
  data.products ??= [];
  data.posts ??= [];
  // Media_Library uploads live on the API host; prefix them so sites hosted elsewhere can load them.
  const fixImage = (f: ScalarField | Field) => {
    if (f.type === 'image' && typeof f.content === 'string' && f.content.startsWith('/uploads/')) {
      f.content = `${apiBase}${f.content}`;
    }
  };
  const fixUrl = (url: string | null): string | null =>
    url && url.startsWith('/uploads/') ? `${apiBase}${url}` : url;

  for (const section of Object.values(data.sections)) {
    for (const field of section.fields) {
      fixImage(field);
      if (field.type === 'list' && Array.isArray(field.content)) field.content.forEach((item) => item.forEach(fixImage));
    }
  }

  // Post bodies are HTML written in the panel; their <img src="/uploads/..."> need the same host prefix.
  for (const post of data.posts) {
    post.coverImage = fixUrl(post.coverImage);
    post.ogImage = fixUrl(post.ogImage);
    post.content = post.content.replace(
      /(<img[^>]+src=["'])(\/uploads\/[^"']+)(["'])/g,
      (_match, before: string, src: string, after: string) => `${before}${apiBase}${src}${after}`
    );
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

/** Published posts, newest first. */
export async function getPosts(): Promise<CmsPost[]> {
  return (await getCms()).posts;
}

export async function getPost(slug: string): Promise<CmsPost | undefined> {
  return (await getCms()).posts.find((post) => post.slug === slug);
}
