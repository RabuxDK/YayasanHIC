/**
 * Folder: src/services/
 * Description: Client API service for fetching dynamic website content from RabuxID CMS.
 * Supports build-time SSG rendering, client-side hydration, draft preview, and fallback safety.
 * This file: cms.ts
 */

import { FALLBACK_CMS_DATA } from '../constants/fallbackData';
import type { CmsWebsiteResponse, CmsProduct } from '../types';

interface FetchCmsOptions {
  slug?: string;
  isPreview?: boolean;
  timeoutMs?: number;
}

/**
 * Fetch website content and product catalog from the RabuxID Headless CMS.
 * If the API is unreachable, times out, or returns a non-200 status,
 * it returns the local fallback data so builds and page rendering never fail.
 */
export async function fetchCmsData(options: FetchCmsOptions = {}): Promise<CmsWebsiteResponse> {
  const apiBase =
    import.meta.env.PUBLIC_API_URL ||
    import.meta.env.VITE_API_URL ||
    'http://localhost:3000';

  const slug =
    options.slug ||
    import.meta.env.PUBLIC_WEBSITE_SLUG ||
    'boilerplate-example';

  const timeoutMs = options.timeoutMs ?? 4000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const previewQuery = options.isPreview ? '?preview=true' : '';
    const endpoint = `${apiBase.replace(/\/$/, '')}/api/cms/v1/websites/${slug}${previewQuery}`;

    const res = await fetch(endpoint, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timer);

    if (!res.ok) {
      console.warn(`[Rabux CMS] Warning: CMS API returned status ${res.status} for slug "${slug}". Using fallback data.`);
      return FALLBACK_CMS_DATA;
    }

    const data = await res.json();

    // Map and sanitize CMS products
    const products: CmsProduct[] = Array.isArray(data.products)
      ? data.products.map((p: any) => ({
          id: String(p.id),
          name: String(p.name || 'Produk'),
          description: p.description ? String(p.description) : undefined,
          price: Number(p.price) || 0,
          category: p.category ? String(p.category) : 'Umum',
          image: p.image || undefined,
          isAvailable: p.isAvailable !== false,
          stock: typeof p.stock === 'number' ? p.stock : undefined,
        }))
      : FALLBACK_CMS_DATA.products;

    return {
      id: data.id || FALLBACK_CMS_DATA.id,
      name: data.name || FALLBACK_CMS_DATA.name,
      slug: data.slug || slug,
      domain: data.domain || undefined,
      status: data.status || 'active',
      environment: data.environment || 'production',
      thumbnail: data.thumbnail || FALLBACK_CMS_DATA.thumbnail,
      sections: {
        ...FALLBACK_CMS_DATA.sections,
        ...(data.sections || {}),
      },
      products: products.length > 0 ? products : FALLBACK_CMS_DATA.products,
      publishedAt: data.publishedAt || undefined,
      updatedAt: data.updatedAt || undefined,
    };
  } catch (error: any) {
    clearTimeout(timer);
    console.warn(`[Rabux CMS] Notice: Could not connect to CMS endpoint (${error.message || 'Network error'}). Using fallback data.`);
    return FALLBACK_CMS_DATA;
  }
}

/**
 * Format numeric amount into standard Indonesian Rupiah currency string.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Build a sanitized WhatsApp click-to-chat URL with pre-filled message.
 */
export function buildWhatsAppUrl(phone: string = '', message: string = ''): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const normalizedPhone = cleanPhone.startsWith('0')
    ? '62' + cleanPhone.slice(1)
    : cleanPhone;

  const encodedMsg = encodeURIComponent(message.trim());
  return `https://wa.me/${normalizedPhone}${encodedMsg ? `?text=${encodedMsg}` : ''}`;
}
