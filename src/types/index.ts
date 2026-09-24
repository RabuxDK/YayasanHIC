/**
 * Folder: src/types/
 * Description: TypeScript definitions for RabuxID CMS website data and components.
 * This file: index.ts
 */

export interface CmsHeroContent {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  badge?: string;
  heroImage?: string;
}

export interface CmsAboutContent {
  title?: string;
  story?: string;
  image?: string;
  mission?: string;
  foundedYear?: string;
}

export interface CmsBenefitItem {
  id?: string;
  title: string;
  description: string;
  icon?: string;
}

export interface CmsServiceItem {
  id?: string;
  name: string;
  description: string;
  price?: string;
  featured?: boolean;
}

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

export interface CmsFaqSection {
  title?: string;
  subtitle?: string;
  items?: CmsFaqItem[];
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

export interface CmsPricingSection {
  title?: string;
  subtitle?: string;
  items?: CmsPricingPlan[];
}

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

export interface CmsSections {
  hero?: CmsHeroContent;
  about?: CmsAboutContent;
  benefits?: CmsBenefitItem[];
  services?: CmsServiceItem[];
  contact?: CmsContactContent;
  faq?: CmsFaqSection;
  pricing?: CmsPricingSection;
  [customSectionKey: string]: unknown;
}

export interface CmsWebsiteResponse {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  status: 'active' | 'maintenance' | 'draft';
  environment?: 'production' | 'staging';
  thumbnail?: string;
  sections: CmsSections;
  products: CmsProduct[];
  publishedAt?: string;
  updatedAt?: string;
}
