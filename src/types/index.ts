/**
 * Folder: src/types/
 * Description: Component prop types. Raw CMS payload types live in src/services/rabuxCms.ts.
 * This file: index.ts
 */

export interface CmsContactContent {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  workingHours?: string;
}

export interface CmsFaqItem {
  question: string;
  answer: string;
}

export interface CmsPricingPlan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
}

/** Product shape used by ProductsCatalog, mapped from rabuxCms CmsProduct in index.astro. */
export interface CmsProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  isAvailable?: boolean;
  stock?: number;
}
