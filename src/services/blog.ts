import { getPosts, type CmsPost } from './rabuxCms';

export type { CmsPost };

export interface BlogPostsResult {
  posts: CmsPost[];
  source: 'cms' | 'offline';
  configured: boolean;
}

const PLACEHOLDER_SLUGS = new Set(['boilerplate-example', 'example']);

let cachedResult: Promise<BlogPostsResult> | undefined;

function isValidHttpUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function isConfigured(): boolean {
  const apiUrl: string | undefined = import.meta.env.PUBLIC_API_URL;
  const slug: string | undefined = import.meta.env.PUBLIC_WEBSITE_SLUG;
  if (!isValidHttpUrl(apiUrl) || !slug) return false;
  const normalizedSlug = slug.trim();
  return normalizedSlug.length > 0 && !PLACEHOLDER_SLUGS.has(normalizedSlug);
}

async function loadBlogPosts(): Promise<BlogPostsResult> {
  const configured = isConfigured();
  if (!configured) {
    return { posts: [], source: 'offline', configured: false };
  }

  try {
    const rawPosts = await getPosts();
    const posts = Array.isArray(rawPosts) ? rawPosts : [];
    return { posts, source: 'cms', configured: true };
  } catch {
    return { posts: [], source: 'offline', configured: true };
  }
}

/**
 * Fetches published CMS posts once per build, falling back safely when
 * environment variables are unconfigured or the CMS API is unreachable.
 */
export function getBlogPosts(): Promise<BlogPostsResult> {
  return (cachedResult ??= loadBlogPosts());
}
