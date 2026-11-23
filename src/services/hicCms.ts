/**
 * Lapisan pemuat konten terpusat Yayasan Hidayatul Ilmi Cendekia dari RabuxID CMS.
 * Membungkus getCms() (satu fetch per build) dengan fallback aman ke src/data/hic.ts.
 */

import { getCms, type CmsPost, type CmsResponse, type FieldValue, type ListItem, type Section } from './rabuxCms';
import {
  site as defaultSite,
  profile as defaultProfile,
  programsIntro as defaultProgramsIntro,
  rumahQuran as defaultRumahQuran,
  sahabatHic as defaultSahabatHic,
  programs as defaultPrograms,
  synergy as defaultSynergy,
  gallery as defaultGallery,
  sambutan as defaultSambutan,
  articles as defaultArticles,
  achievements as defaultAchievements,
  faq as defaultFaq,
  psb as defaultPsb,
  donation as defaultDonation,
  type Article,
  type NavItem,
  type ProgramSummary,
} from '../data/hic';
import type { GalleryCategory } from '../components/islands/GalleryShowcase';

const PLACEHOLDER_SLUGS = new Set(['boilerplate-example', 'example']);

const LOCAL_RESPONSIVE_IMAGES: Record<
  string,
  { srcset: string; highRes: string; width: number; height: number }
> = {
  'hero-mengaji': {
    srcset: '/images/hero-mengaji-800.jpg 800w, /images/hero-mengaji-1400.jpg 1280w',
    highRes: '/images/hero-mengaji-1400.jpg',
    width: 1280,
    height: 1600,
  },
  'berbagi-santri': {
    srcset: '/images/berbagi-santri-800.jpg 800w, /images/berbagi-santri-1400.jpg 1280w',
    highRes: '/images/berbagi-santri-1400.jpg',
    width: 1280,
    height: 720,
  },
  'berbagi-paket': {
    srcset: '/images/berbagi-paket-800.jpg 800w, /images/berbagi-paket-1400.jpg 1280w',
    highRes: '/images/berbagi-paket-1400.jpg',
    width: 1280,
    height: 960,
  },
  'hero-belajar': {
    srcset: '/images/hero-belajar-800.jpg 800w, /images/hero-belajar-1400.jpg 1280w',
    highRes: '/images/hero-belajar-1400.jpg',
    width: 1280,
    height: 853,
  },
  'tentang-santri': {
    srcset: '/images/tentang-santri-800.jpg 800w, /images/tentang-santri-1400.jpg 1280w',
    highRes: '/images/tentang-santri-1400.jpg',
    width: 1280,
    height: 853,
  },
  'galeri-musholla': {
    srcset: '/images/galeri-musholla-800.jpg 800w, /images/galeri-musholla-1400.jpg 1280w',
    highRes: '/images/galeri-musholla-1400.jpg',
    width: 1280,
    height: 960,
  },
  'galeri-quran': {
    srcset: '/images/galeri-quran-800.jpg 800w, /images/galeri-quran-1400.jpg 1280w',
    highRes: '/images/galeri-quran-1400.jpg',
    width: 1280,
    height: 853,
  },
  'galeri-kelas': {
    srcset: '/images/galeri-kelas-800.jpg 800w, /images/galeri-kelas-1400.jpg 1280w',
    highRes: '/images/galeri-kelas-1400.jpg',
    width: 1280,
    height: 576,
  },
  'galeri-kajian': {
    srcset: '/images/galeri-kajian-800.jpg 800w, /images/galeri-kajian-1400.jpg 1280w',
    highRes: '/images/galeri-kajian-1400.jpg',
    width: 1280,
    height: 854,
  },
  'galeri-pendampingan': {
    srcset: '/images/galeri-pendampingan-800.jpg 800w, /images/galeri-pendampingan-1400.jpg 1280w',
    highRes: '/images/galeri-pendampingan-1400.jpg',
    width: 1280,
    height: 1920,
  },
  'galeri-taklim-01': {
    srcset: '/images/galeri-taklim-01-800.jpg 800w, /images/galeri-taklim-01-1400.jpg 1280w',
    highRes: '/images/galeri-taklim-01-1400.jpg',
    width: 1280,
    height: 853,
  },
  'galeri-malam': {
    srcset: '/images/galeri-malam-800.jpg 800w, /images/galeri-malam-1400.jpg 1280w',
    highRes: '/images/galeri-malam-1400.jpg',
    width: 1280,
    height: 914,
  },
};

const LOCAL_ACHIEVEMENT_DIMS: Record<string, { width: number; height: number }> = {
  '/images/prestasi-santri-1.jpg': { width: 800, height: 859 },
  '/images/prestasi-santri-2.jpg': { width: 686, height: 1220 },
  '/images/prestasi-santri-3.jpg': { width: 600, height: 600 },
  '/images/prestasi-guru-1.jpg': { width: 832, height: 1248 },
};

const DEFAULT_GALLERY_META: Record<
  string,
  { category: GalleryCategory; detail: string; orientation: 'landscape' | 'portrait' | 'square' }
> = {
  '/images/galeri-musholla-800.jpg': {
    category: 'Pembinaan Al-Qur\u2019an',
    detail: 'Santri duduk melingkar di musholla mengikuti halaqah pagi.',
    orientation: 'landscape',
  },
  '/images/galeri-quran-800.jpg': {
    category: 'Pembinaan Al-Qur\u2019an',
    detail: 'Santri membaca mushaf dan menyetorkan hafalan surah bertahap.',
    orientation: 'landscape',
  },
  '/images/galeri-kelas-800.jpg': {
    category: 'Pembinaan Al-Qur\u2019an',
    detail: 'Pembelajaran tahsin sesuai makharijul huruf dan kaidah tajwid.',
    orientation: 'landscape',
  },
  '/images/galeri-kajian-800.jpg': {
    category: 'Kajian & Sahabat HIC',
    detail: 'Pertemuan kajian dan komunikasi pembinaan bersama wali santri.',
    orientation: 'landscape',
  },
  '/images/galeri-pendampingan-800.jpg': {
    category: 'Pembinaan Al-Qur\u2019an',
    detail: 'Pendampingan belajar membaca Al-Qur\u2019an satu per satu bersama pengajar.',
    orientation: 'portrait',
  },
  '/images/galeri-taklim-01-800.jpg': {
    category: 'Kajian & Sahabat HIC',
    detail: 'Kegiatan taklim ba\u2019da maghrib di ruang utama pembinaan yayasan.',
    orientation: 'landscape',
  },
  '/images/galeri-malam-800.jpg': {
    category: 'Pembinaan Al-Qur\u2019an',
    detail: 'Murajaah hafalan malam hari bersama pendamping Rumah Qur\u2019an HIC.',
    orientation: 'landscape',
  },
  '/images/berbagi-paket-800.jpg': {
    category: 'Kajian & Sahabat HIC',
    detail: 'Penyaluran santunan dan paket kebutuhan pokok program Sahabat HIC.',
    orientation: 'landscape',
  },
};

function matchLocalImage(src: string) {
  const match = src.match(/^\/images\/([a-z0-9-]+)-(?:800|1400)\.jpg$/i);
  if (!match) return undefined;
  return LOCAL_RESPONSIVE_IMAGES[match[1]];
}

export function localSrcset(src: string): string | undefined {
  return matchLocalImage(src)?.srcset;
}

export function localHighRes(src: string): string {
  return matchLocalImage(src)?.highRes ?? src;
}

function isValidHttpUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function isCmsConfigured(): boolean {
  const apiUrl: string | undefined = import.meta.env.PUBLIC_API_URL;
  const slug: string | undefined = import.meta.env.PUBLIC_WEBSITE_SLUG;
  if (!isValidHttpUrl(apiUrl) || !slug) return false;
  const normalizedSlug = slug.trim();
  return normalizedSlug.length > 0 && !PLACEHOLDER_SLUGS.has(normalizedSlug);
}

function getRawField(
  sections: Record<string, Section>,
  sectionKey: string,
  fieldKey: string,
): FieldValue | ListItem[] | undefined {
  return sections[sectionKey]?.fields.find((f) => f.key === fieldKey)?.content;
}

function getStr(
  sections: Record<string, Section>,
  sectionKey: string,
  fieldKey: string,
  fallback: string,
): string {
  const value = getRawField(sections, sectionKey, fieldKey);
  if (typeof value === 'string' && value.trim().length > 0) return value.trim();
  return fallback;
}

function getList(
  sections: Record<string, Section>,
  sectionKey: string,
  fieldKey: string,
): Record<string, FieldValue>[] {
  const content = getRawField(sections, sectionKey, fieldKey);
  if (!Array.isArray(content)) return [];
  return content.map((item) =>
    Object.fromEntries(item.map((sub) => [sub.key, sub.content])),
  );
}

function itemStr(item: Record<string, FieldValue>, key: string, fallback = ''): string {
  const v = item[key];
  if (typeof v === 'string' && v.trim().length > 0) return v.trim();
  return fallback;
}

function itemBool(item: Record<string, FieldValue>, key: string, fallback = false): boolean {
  const v = item[key];
  if (typeof v === 'boolean') return v;
  return fallback;
}

function itemNum(item: Record<string, FieldValue>, key: string): number | undefined {
  const v = item[key];
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string') {
    const parsed = Number(v);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function normalizeWaNumber(raw: string, fallback: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return fallback;
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  return digits;
}

function normalizeGalleryCategory(raw: string): GalleryCategory {
  const lower = raw.toLowerCase();
  if (lower.includes('prestasi')) return 'Prestasi';
  if (lower.includes('kajian') || lower.includes('sahabat')) return 'Kajian & Sahabat HIC';
  return 'Pembinaan Al-Qur\u2019an';
}

function normalizeOrientation(raw: string): 'landscape' | 'portrait' | 'square' {
  const lower = raw.toLowerCase();
  if (lower === 'portrait' || lower === 'square') return lower;
  return 'landscape';
}

export interface CmsSiteData {
  name: string;
  short: string;
  url: string;
  motto: string;
  description: string;
  logo: string;
  ogImage: string;
  footerSummary: string;
  contact: {
    address: string;
    addressShort: string;
    whatsapp: string;
    waNumber: string;
    phoneHref: string;
  };
  nav: NavItem[];
}

export interface CmsGalleryEntry {
  src: string;
  highResSrc: string;
  srcset?: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  detail: string;
  orientation: 'landscape' | 'portrait' | 'square';
  width: number;
  height: number;
  span?: 'wide' | 'tall';
}

export interface CmsAchievementEntry {
  title: string;
  category: string;
  detail: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  isPlaceholder: boolean;
}

export interface CmsMaterialEntry {
  title: string;
  short: string;
  text: string;
  image?: string;
  imageSrcset?: string;
  imageAlt?: string;
}

export interface HicCmsData {
  source: 'cms' | 'offline';
  status: string;
  site: CmsSiteData;
  hero: {
    headlinePrefix: string;
    headlineHighlight: string;
    headlineSuffix: string;
    subheadline: string;
    primaryCta: NavItem;
    secondaryCta: NavItem;
    image: string;
    imageSrcset?: string;
    imageAlt: string;
  };
  profile: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    heroImageSrcset?: string;
    heroImageAlt: string;
    paragraphs: string[];
    vision: string;
    pillars: { title: string; text: string }[];
    missions: string[];
    homePhotoMain: string;
    homePhotoMainSrcset?: string;
    homePhotoMainAlt: string;
    homePhotoSecond: string;
    homePhotoSecondSrcset?: string;
    homePhotoSecondAlt: string;
    aboutPhoto1: string;
    aboutPhoto1Srcset?: string;
    aboutPhoto1Alt: string;
    aboutPhoto2: string;
    aboutPhoto2Srcset?: string;
    aboutPhoto2Alt: string;
    missionPhoto: string;
    missionPhotoSrcset?: string;
    missionPhotoAlt: string;
  };
  sambutan: {
    title: string;
    photo: string;
    photoAlt: string;
    photoWidth: number;
    photoHeight: number;
    name: string;
    role: string;
    paragraphs: string[];
  };
  programsIntro: string;
  programPage: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    heroImageSrcset?: string;
    heroImageAlt: string;
  };
  rumahQuran: {
    slug: string;
    name: string;
    shortName: string;
    tagline: string;
    summary: string;
    image: string;
    imageAlt: string;
    goalsSubtitle: string;
    goalsImage: string;
    goalsImageSrcset?: string;
    goalsImageAlt: string;
    goals: string[];
    materials: CmsMaterialEntry[];
  };
  sahabatHic: {
    slug: string;
    name: string;
    shortName: string;
    tagline: string;
    summary: string;
    image: string;
    imageAlt: string;
    backgroundImage: string;
    backgroundImageSrcset?: string;
    backgroundImageAlt: string;
    background: string[];
    goals: string[];
    activities: string[];
    beneficiaries: string;
  };
  programs: ProgramSummary[];
  synergy: {
    title: string;
    subtitle: string;
    image: string;
    imageSrcset?: string;
    imageAlt: string;
    imageCaption: string;
    points: string[];
  };
  galleryPage: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    heroImageSrcset?: string;
    heroImageAlt: string;
  };
  gallery: CmsGalleryEntry[];
  homeGalleryStrip: CmsGalleryEntry[];
  achievementsSection: {
    title: string;
    subtitle: string;
  };
  achievements: CmsAchievementEntry[];
  artikelPage: {
    homeTitle: string;
    homeSubtitle: string;
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    heroImageSrcset?: string;
    heroImageAlt: string;
    rubrics: { title: string; text: string; ctaLabel: string; ctaUrl: string }[];
  };
  articles: Article[];
  psb: {
    title: string;
    heroSubtitle: string;
    heroImage: string;
    heroImageSrcset?: string;
    heroImageAlt: string;
    homeTitle: string;
    homeSubtitle: string;
    homeSteps: { title: string; text: string }[];
    formTitle: string;
    formSubtitle: string;
    intro: string;
    steps: string[];
    levels: string[];
    schedules: string[];
    relations: string[];
    checklist: { title: string; text: string }[];
  };
  donation: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    heroImageSrcset?: string;
    heroImageAlt: string;
    trustTitle: string;
    trustSubtitle: string;
    trustImage: string;
    trustImageSrcset?: string;
    trustImageAlt: string;
    trustCaption: string;
    homeTitle: string;
    homeSubtitle: string;
    programs: { id: string; label: string; note: string }[];
    amounts: number[];
    methods: { id: string; label: string; note: string }[];
    waFlow: { title: string; text: string }[];
  };
  kontak: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    heroImageSrcset?: string;
    heroImageAlt: string;
    intents: { title: string; summary: string; cta: string; waMessage: string }[];
    visitTitle: string;
    visitWaMessage: string;
  };
  faqSection: {
    title: string;
    image: string;
    imageSrcset?: string;
    imageAlt: string;
  };
  faq: { q: string; a: string }[];
  posts: CmsPost[];
}

function buildHicContent(cms: CmsResponse | null, source: 'cms' | 'offline'): HicCmsData {
  const s = cms?.sections ?? {};

  const envSiteUrl = import.meta.env.PUBLIC_SITE_URL;
  const siteUrl = isValidHttpUrl(envSiteUrl)
    ? envSiteUrl.trim().replace(/\/$/, '')
    : cms?.domain
      ? `https://${cms.domain.replace(/^https?:\/\//, '').replace(/\/$/, '')}`
      : defaultSite.url;

  const waNumber = normalizeWaNumber(
    getStr(s, 'identitas', 'wa_number', defaultSite.contact.waNumber),
    defaultSite.contact.waNumber,
  );
  const whatsapp = getStr(s, 'identitas', 'whatsapp', defaultSite.contact.whatsapp);

  const site: CmsSiteData = {
    name: getStr(s, 'identitas', 'name', defaultSite.name),
    short: getStr(s, 'identitas', 'short', defaultSite.short),
    url: siteUrl,
    motto: getStr(s, 'identitas', 'motto', defaultSite.motto),
    description: getStr(s, 'identitas', 'description', defaultSite.description),
    logo: getStr(s, 'identitas', 'logo', '/images/logo-hic-320.png'),
    ogImage: getStr(s, 'identitas', 'og_image', '/images/og-hic.jpg'),
    footerSummary: getStr(
      s,
      'identitas',
      'footer_summary',
      'Beriman, Berilmu, dan Beramal. Lembaga pendidikan Al-Qur\u2019an dan sosial kemanusiaan.',
    ),
    contact: {
      address: getStr(s, 'identitas', 'address', defaultSite.contact.address),
      addressShort: getStr(s, 'identitas', 'address_short', defaultSite.contact.addressShort),
      whatsapp,
      waNumber,
      phoneHref: `tel:+${waNumber}`,
    },
    nav: defaultSite.nav,
  };

  const heroImage = getStr(s, 'hero', 'hero_image', '/images/hero-mengaji-1400.jpg');
  const hero = {
    headlinePrefix: getStr(s, 'hero', 'headline_prefix', 'Membina generasi'),
    headlineHighlight: getStr(s, 'hero', 'headline_highlight', 'Qur\u2019ani'),
    headlineSuffix: getStr(s, 'hero', 'headline_suffix', 'dan beramal'),
    subheadline: getStr(
      s,
      'hero',
      'subheadline',
      'Pendidikan Al-Qur\u2019an dan program sosial kemanusiaan di Gunung Putri, Bogor.',
    ),
    primaryCta: {
      label: getStr(s, 'hero', 'primary_cta_label', 'Daftar santri baru'),
      href: getStr(s, 'hero', 'primary_cta_url', '/psb'),
    },
    secondaryCta: {
      label: getStr(s, 'hero', 'secondary_cta_label', 'Lihat program'),
      href: getStr(s, 'hero', 'secondary_cta_url', '/program'),
    },
    image: heroImage,
    imageSrcset: localSrcset(heroImage),
    imageAlt: getStr(s, 'hero', 'hero_image_alt', "Santri membaca Al-Qur'an di musholla"),
  };

  const cmsPillars = getList(s, 'profil', 'pillars')
    .map((item) => ({ title: itemStr(item, 'title'), text: itemStr(item, 'text') }))
    .filter((item) => item.title && item.text);

  const cmsMissions = getList(s, 'profil', 'missions')
    .map((item) => itemStr(item, 'text'))
    .filter(Boolean);

  const profilHeroImg = getStr(s, 'profil', 'hero_image', '/images/tentang-santri-1400.jpg');
  const homePhotoMain = getStr(s, 'profil', 'home_photo_main', '/images/berbagi-santri-1400.jpg');
  const homePhotoSecond = getStr(s, 'profil', 'home_photo_second', '/images/hero-belajar-800.jpg');
  const aboutPhoto1 = getStr(s, 'profil', 'about_photo_1', '/images/hero-belajar-1400.jpg');
  const aboutPhoto2 = getStr(s, 'profil', 'about_photo_2', '/images/galeri-malam-1400.jpg');
  const missionPhoto = getStr(s, 'profil', 'mission_photo', '/images/galeri-kajian-1400.jpg');

  const profile = {
    heroTitle: getStr(s, 'profil', 'hero_title', 'Profil Yayasan HIC'),
    heroSubtitle: getStr(
      s,
      'profil',
      'hero_subtitle',
      'Lembaga sosial dan pendidikan untuk membangun generasi Qur\u2019ani dan kepedulian masyarakat.',
    ),
    heroImage: profilHeroImg,
    heroImageSrcset: localSrcset(profilHeroImg),
    heroImageAlt: getStr(s, 'profil', 'hero_image_alt', 'Santri belajar bersama pengajar'),
    paragraphs: [
      getStr(s, 'profil', 'paragraph_1', defaultProfile.paragraphs[0]),
      getStr(s, 'profil', 'paragraph_2', defaultProfile.paragraphs[1]),
      getStr(s, 'profil', 'paragraph_3', defaultProfile.paragraphs[2]),
      getStr(s, 'profil', 'paragraph_4', defaultProfile.paragraphs[3]),
    ],
    vision: getStr(s, 'profil', 'vision', defaultProfile.vision),
    pillars: cmsPillars.length > 0 ? cmsPillars : defaultProfile.pillars,
    missions: cmsMissions.length > 0 ? cmsMissions : defaultProfile.missions,
    homePhotoMain,
    homePhotoMainSrcset: localSrcset(homePhotoMain),
    homePhotoMainAlt: getStr(s, 'profil', 'home_photo_main_alt', 'Santri menerima bantuan pendidikan'),
    homePhotoSecond,
    homePhotoSecondSrcset: localSrcset(homePhotoSecond),
    homePhotoSecondAlt: getStr(s, 'profil', 'home_photo_second_alt', 'Anak belajar membaca bersama pengajar'),
    aboutPhoto1,
    aboutPhoto1Srcset: localSrcset(aboutPhoto1),
    aboutPhoto1Alt: getStr(s, 'profil', 'about_photo_1_alt', "Anak belajar membaca Al-Qur'an bersama guru"),
    aboutPhoto2,
    aboutPhoto2Srcset: localSrcset(aboutPhoto2),
    aboutPhoto2Alt: getStr(s, 'profil', 'about_photo_2_alt', 'Pembinaan karakter Islami bersama pendamping'),
    missionPhoto,
    missionPhotoSrcset: localSrcset(missionPhoto),
    missionPhotoAlt: getStr(s, 'profil', 'mission_photo_alt', 'Kajian dan pembinaan bersama keluarga santri'),
  };

  const cmsSambutanParas = getList(s, 'sambutan', 'paragraphs')
    .map((item) => itemStr(item, 'text'))
    .filter(Boolean);

  const sambutan = {
    title: getStr(s, 'sambutan', 'title', defaultSambutan.title),
    photo: getStr(s, 'sambutan', 'photo', defaultSambutan.photo),
    photoAlt: getStr(s, 'sambutan', 'photo_alt', defaultSambutan.photoAlt),
    photoWidth: defaultSambutan.photoWidth,
    photoHeight: defaultSambutan.photoHeight,
    name: getStr(s, 'sambutan', 'name', defaultSambutan.name),
    role: getStr(s, 'sambutan', 'role', defaultSambutan.role),
    paragraphs: cmsSambutanParas.length > 0 ? cmsSambutanParas : defaultSambutan.paragraphs,
  };

  const progHeroImg = getStr(s, 'program_pengantar', 'hero_image', '/images/galeri-musholla-1400.jpg');
  const programsIntro = getStr(s, 'program_pengantar', 'intro', defaultProgramsIntro);
  const programPage = {
    heroTitle: getStr(s, 'program_pengantar', 'hero_title', 'Program Unggulan Yayasan'),
    heroSubtitle: getStr(
      s,
      'program_pengantar',
      'hero_subtitle',
      'Dua program utama: pendidikan Al-Qur\u2019an dan aksi sosial kemanusiaan.',
    ),
    heroImage: progHeroImg,
    heroImageSrcset: localSrcset(progHeroImg),
    heroImageAlt: getStr(s, 'program_pengantar', 'hero_image_alt', 'Kegiatan belajar santri di musholla'),
  };

  const cmsRqGoals = getList(s, 'rumah_quran', 'goals')
    .map((item) => itemStr(item, 'text'))
    .filter(Boolean);

  const cmsRqMaterials = getList(s, 'rumah_quran', 'materials')
    .map((item): CmsMaterialEntry => {
      const img = itemStr(item, 'image');
      return {
        title: itemStr(item, 'title'),
        short: itemStr(item, 'short'),
        text: itemStr(item, 'text'),
        ...(img ? { image: img, imageSrcset: localSrcset(img), imageAlt: itemStr(item, 'image_alt') } : {}),
      };
    })
    .filter((item) => item.title && item.text);

  const rqGoalsImg = getStr(s, 'rumah_quran', 'goals_image', '/images/tentang-santri-1400.jpg');
  const rumahQuran = {
    slug: defaultRumahQuran.slug,
    name: getStr(s, 'rumah_quran', 'name', defaultRumahQuran.name),
    shortName: getStr(s, 'rumah_quran', 'short_name', defaultRumahQuran.shortName),
    tagline: getStr(s, 'rumah_quran', 'tagline', defaultRumahQuran.tagline),
    summary: getStr(s, 'rumah_quran', 'summary', defaultRumahQuran.summary),
    image: getStr(s, 'rumah_quran', 'image', defaultRumahQuran.image),
    imageAlt: getStr(s, 'rumah_quran', 'image_alt', defaultRumahQuran.imageAlt),
    goalsSubtitle: getStr(
      s,
      'rumah_quran',
      'goals_subtitle',
      'Membentuk kecintaan terhadap Al-Qur\u2019an dan karakter Islami santri.',
    ),
    goalsImage: rqGoalsImg,
    goalsImageSrcset: localSrcset(rqGoalsImg),
    goalsImageAlt: getStr(
      s,
      'rumah_quran',
      'goals_image_alt',
      "Santri belajar bersama pengajar di Rumah Qur'an",
    ),
    goals: cmsRqGoals.length > 0 ? cmsRqGoals : defaultRumahQuran.goals,
    materials: cmsRqMaterials.length > 0 ? cmsRqMaterials : defaultRumahQuran.materials,
  };

  const cmsShBackground = getList(s, 'sahabat_hic', 'background')
    .map((item) => itemStr(item, 'text'))
    .filter(Boolean);
  const cmsShGoals = getList(s, 'sahabat_hic', 'goals')
    .map((item) => itemStr(item, 'text'))
    .filter(Boolean);
  const cmsShActivities = getList(s, 'sahabat_hic', 'activities')
    .map((item) => itemStr(item, 'text'))
    .filter(Boolean);

  const shBgImg = getStr(s, 'sahabat_hic', 'background_image', '/images/berbagi-santri-1400.jpg');
  const sahabatHic = {
    slug: defaultSahabatHic.slug,
    name: getStr(s, 'sahabat_hic', 'name', defaultSahabatHic.name),
    shortName: getStr(s, 'sahabat_hic', 'short_name', defaultSahabatHic.shortName),
    tagline: getStr(s, 'sahabat_hic', 'tagline', defaultSahabatHic.tagline),
    summary: getStr(s, 'sahabat_hic', 'summary', defaultSahabatHic.summary),
    image: getStr(s, 'sahabat_hic', 'image', defaultSahabatHic.image),
    imageAlt: getStr(s, 'sahabat_hic', 'image_alt', defaultSahabatHic.imageAlt),
    backgroundImage: shBgImg,
    backgroundImageSrcset: localSrcset(shBgImg),
    backgroundImageAlt: getStr(
      s,
      'sahabat_hic',
      'background_image_alt',
      'Santri menerima bantuan sosial dan pendidikan',
    ),
    background: cmsShBackground.length > 0 ? cmsShBackground : defaultSahabatHic.background,
    goals: cmsShGoals.length > 0 ? cmsShGoals : defaultSahabatHic.goals,
    activities: cmsShActivities.length > 0 ? cmsShActivities : defaultSahabatHic.activities,
    beneficiaries: getStr(s, 'sahabat_hic', 'beneficiaries', defaultSahabatHic.beneficiaries),
  };

  const cmsRqPoints = getList(s, 'program_pengantar', 'rq_card_points')
    .map((item) => ({ title: itemStr(item, 'title'), text: itemStr(item, 'text') }))
    .filter((item) => item.title && item.text);
  const cmsShPoints = getList(s, 'program_pengantar', 'sh_card_points')
    .map((item) => ({ title: itemStr(item, 'title'), text: itemStr(item, 'text') }))
    .filter((item) => item.title && item.text);

  const programs: ProgramSummary[] = [
    {
      ...defaultPrograms[0],
      name: rumahQuran.name,
      tagline: rumahQuran.tagline,
      summary: getStr(s, 'program_pengantar', 'rq_card_summary', defaultPrograms[0].summary),
      image: rumahQuran.image,
      imageAlt: rumahQuran.imageAlt,
      points: cmsRqPoints.length > 0 ? cmsRqPoints : defaultPrograms[0].points,
      meta: getStr(s, 'program_pengantar', 'rq_card_meta', defaultPrograms[0].meta),
    },
    {
      ...defaultPrograms[1],
      name: sahabatHic.name,
      tagline: sahabatHic.tagline,
      summary: getStr(s, 'program_pengantar', 'sh_card_summary', defaultPrograms[1].summary),
      image: sahabatHic.image,
      imageAlt: sahabatHic.imageAlt,
      points: cmsShPoints.length > 0 ? cmsShPoints : defaultPrograms[1].points,
      meta: getStr(s, 'program_pengantar', 'sh_card_meta', defaultPrograms[1].meta),
    },
  ];

  const cmsSynergyPoints = getList(s, 'sinergi', 'points')
    .map((item) => itemStr(item, 'text'))
    .filter(Boolean);
  const sinergiImg = getStr(s, 'sinergi', 'image', '/images/galeri-taklim-01-1400.jpg');
  const synergy = {
    title: getStr(s, 'sinergi', 'title', 'Sinergi bersama orang tua dan masyarakat'),
    subtitle: getStr(
      s,
      'sinergi',
      'subtitle',
      'Membangun kerja sama dalam mewujudkan pendidikan Al-Qur\u2019an serta kesejahteraan umat.',
    ),
    image: sinergiImg,
    imageSrcset: localSrcset(sinergiImg),
    imageAlt: getStr(s, 'sinergi', 'image_alt', "Taklim ba'da maghrib di ruang utama"),
    imageCaption: getStr(s, 'sinergi', 'image_caption', 'Taklim ba\u2019da maghrib di ruang utama'),
    points: cmsSynergyPoints.length > 0 ? cmsSynergyPoints : defaultSynergy,
  };

  const galeriHeroImg = getStr(s, 'galeri', 'hero_image', '/images/galeri-musholla-1400.jpg');
  const galleryPage = {
    heroTitle: getStr(s, 'galeri', 'hero_title', 'Galeri kegiatan'),
    heroSubtitle: getStr(
      s,
      'galeri',
      'hero_subtitle',
      'Pembinaan Al-Qur\u2019an, kajian wali santri, dan penyaluran amanah Sahabat HIC.',
    ),
    heroImage: galeriHeroImg,
    heroImageSrcset: localSrcset(galeriHeroImg),
    heroImageAlt: getStr(s, 'galeri', 'hero_image_alt', 'Santri duduk melingkar di musholla'),
  };

  const defaultGalleryEntries: CmsGalleryEntry[] = defaultGallery.map((item) => {
    const meta = DEFAULT_GALLERY_META[item.src] ?? {
      category: 'Pembinaan Al-Qur\u2019an' as GalleryCategory,
      detail: item.alt,
      orientation: 'landscape' as const,
    };
    return {
      src: item.src,
      highResSrc: localHighRes(item.src),
      srcset: item.srcset,
      alt: item.alt,
      caption: item.caption,
      category: meta.category,
      detail: meta.detail,
      orientation: meta.orientation,
      width: item.width,
      height: item.height,
      span: item.span,
    };
  });

  const cmsGalleryItems = getList(s, 'galeri', 'items')
    .map((item): CmsGalleryEntry | null => {
      const src = itemStr(item, 'image');
      if (!src) return null;
      const local = matchLocalImage(src);
      const orientation = normalizeOrientation(itemStr(item, 'orientation', 'landscape'));
      const rawSpan = itemStr(item, 'span').toLowerCase();
      const span = rawSpan === 'wide' || rawSpan === 'tall' ? rawSpan : undefined;
      const defaultDims =
        orientation === 'portrait'
          ? { width: 960, height: 1280 }
          : orientation === 'square'
            ? { width: 1000, height: 1000 }
            : { width: 1280, height: 960 };
      const caption = itemStr(item, 'caption', 'Dokumentasi kegiatan');
      const alt = itemStr(item, 'alt', caption);
      return {
        src,
        highResSrc: local?.highRes ?? src,
        srcset: local?.srcset,
        alt,
        caption,
        category: normalizeGalleryCategory(itemStr(item, 'category', 'Pembinaan Al-Qur\u2019an')),
        detail: itemStr(item, 'detail', alt),
        orientation,
        width: local?.width ?? defaultDims.width,
        height: local?.height ?? defaultDims.height,
        span,
      };
    })
    .filter((entry): entry is CmsGalleryEntry => entry !== null);

  const gallery = cmsGalleryItems.length > 0 ? cmsGalleryItems : defaultGalleryEntries;
  const homeGalleryStrip =
    gallery.length >= 8
      ? [gallery[0], gallery[1], gallery[2], gallery[3], gallery[4], gallery[7]]
      : gallery.slice(0, 6);

  const achievementsSection = {
    title: getStr(s, 'prestasi', 'title', 'Galeri Santri dan Guru Berprestasi'),
    subtitle: getStr(s, 'prestasi', 'subtitle', 'Capaian santri dan pengajar Rumah Qur\u2019an HIC.'),
  };

  const cmsAchievements = getList(s, 'prestasi', 'items')
    .map((item): CmsAchievementEntry | null => {
      const title = itemStr(item, 'title');
      const image = itemStr(item, 'image');
      if (!title || !image) return null;
      const dims = LOCAL_ACHIEVEMENT_DIMS[image] ?? { width: 800, height: 1000 };
      return {
        title,
        category: itemStr(item, 'category', 'Santri Berprestasi'),
        detail: itemStr(item, 'detail'),
        image,
        imageAlt: itemStr(item, 'image_alt', title),
        width: dims.width,
        height: dims.height,
        isPlaceholder: itemBool(item, 'is_placeholder', false),
      };
    })
    .filter((entry): entry is CmsAchievementEntry => entry !== null);

  const achievements: CmsAchievementEntry[] =
    cmsAchievements.length > 0
      ? cmsAchievements
      : defaultAchievements.map((item) => ({ ...item, isPlaceholder: true }));

  const defaultRubrics = [
    {
      title: 'Rumah Qur\u2019an HIC',
      text: 'Pembelajaran tahsin, tahfidz bertahap, adab Islami, dan praktik shalat santri.',
      ctaLabel: 'Detail program',
      ctaUrl: '/program#rumah-quran',
    },
    {
      title: 'Sahabat HIC',
      text: 'Penyaluran santunan anak yatim, bantuan keluarga dhuafa, dan paket pokok.',
      ctaLabel: 'Lihat penyaluran',
      ctaUrl: '/program#sahabat-hic',
    },
    {
      title: 'Kemitraan umat',
      text: 'Kerja sama bersama orang tua, masyarakat, dan donatur di Gunung Putri, Bogor.',
      ctaLabel: 'Profil yayasan',
      ctaUrl: '/tentang#misi',
    },
  ];

  const cmsRubrics = getList(s, 'artikel_pengantar', 'rubrics')
    .map((item) => ({
      title: itemStr(item, 'title'),
      text: itemStr(item, 'text'),
      ctaLabel: itemStr(item, 'cta_label', 'Lihat selengkapnya'),
      ctaUrl: itemStr(item, 'cta_url', '/program'),
    }))
    .filter((item) => item.title && item.text);

  const artikelHeroImg = getStr(s, 'artikel_pengantar', 'hero_image', '/images/galeri-quran-1400.jpg');
  const artikelPage = {
    homeTitle: getStr(s, 'artikel_pengantar', 'home_title', 'Kabar dan artikel terbaru'),
    homeSubtitle: getStr(
      s,
      'artikel_pengantar',
      'home_subtitle',
      'Kabar pembinaan santri dan kegiatan sosial yayasan.',
    ),
    heroTitle: getStr(s, 'artikel_pengantar', 'hero_title', 'Artikel dan kabar yayasan'),
    heroSubtitle: getStr(
      s,
      'artikel_pengantar',
      'hero_subtitle',
      'Catatan pembinaan Rumah Qur\u2019an dan kegiatan sosial Sahabat Hidayatul Ilmi Cendekia.',
    ),
    heroImage: artikelHeroImg,
    heroImageSrcset: localSrcset(artikelHeroImg),
    heroImageAlt: getStr(
      s,
      'artikel_pengantar',
      'hero_image_alt',
      "Santri membaca Al-Qur'an bersama pembimbing",
    ),
    rubrics: cmsRubrics.length > 0 ? cmsRubrics : defaultRubrics,
  };

  const defaultPsbHomeSteps = [
    { title: 'Isi formulir', text: 'Lengkapi data santri, data wali, dan pilihan jenjang belajar.' },
    { title: 'Kirim via WhatsApp', text: `Ringkasan pendaftaran diteruskan ke ${site.contact.whatsapp}.` },
    { title: 'Konfirmasi pengurus', text: 'Sekretariat menginformasikan langkah lanjutan kepada wali.' },
  ];

  const defaultPsbChecklist = [
    { title: 'Data santri', text: 'Nama lengkap, tanggal lahir, dan asal sekolah.' },
    { title: 'Nomor WhatsApp aktif', text: 'Untuk konfirmasi dan informasi lanjutan dari pengurus.' },
    { title: 'Pilihan jenjang', text: 'Iqra, Tahsin Al-Qur\u2019an, atau Tahfidz Al-Qur\u2019an.' },
  ];

  const cmsPsbHomeSteps = getList(s, 'psb', 'home_steps')
    .map((item) => ({ title: itemStr(item, 'title'), text: itemStr(item, 'text') }))
    .filter((item) => item.title && item.text);
  const cmsPsbSteps = getList(s, 'psb', 'steps')
    .map((item) => itemStr(item, 'label'))
    .filter(Boolean);
  const cmsPsbLevels = getList(s, 'psb', 'levels')
    .map((item) => itemStr(item, 'label'))
    .filter(Boolean);
  const cmsPsbSchedules = getList(s, 'psb', 'schedules')
    .map((item) => itemStr(item, 'label'))
    .filter(Boolean);
  const cmsPsbRelations = getList(s, 'psb', 'relations')
    .map((item) => itemStr(item, 'label'))
    .filter(Boolean);
  const cmsPsbChecklist = getList(s, 'psb', 'checklist')
    .map((item) => ({ title: itemStr(item, 'title'), text: itemStr(item, 'text') }))
    .filter((item) => item.title && item.text);

  const psbHeroImg = getStr(s, 'psb', 'hero_image', '/images/tentang-santri-1400.jpg');
  const psb = {
    title: getStr(s, 'psb', 'title', defaultPsb.title),
    heroSubtitle: getStr(
      s,
      'psb',
      'hero_subtitle',
      'Pendaftaran Rumah Qur\u2019an Hidayatul Ilmi Cendekia diteruskan ke WhatsApp sekretariat.',
    ),
    heroImage: psbHeroImg,
    heroImageSrcset: localSrcset(psbHeroImg),
    heroImageAlt: getStr(s, 'psb', 'hero_image_alt', 'Santri belajar bersama pendamping'),
    homeTitle: getStr(s, 'psb', 'home_title', 'Penerimaan santri baru'),
    homeSubtitle: getStr(
      s,
      'psb',
      'home_subtitle',
      'Daftarkan putra-putri Anda ke Rumah Qur\u2019an Hidayatul Ilmi Cendekia.',
    ),
    homeSteps: cmsPsbHomeSteps.length > 0 ? cmsPsbHomeSteps : defaultPsbHomeSteps,
    formTitle: getStr(s, 'psb', 'form_title', 'Formulir pendaftaran'),
    formSubtitle: getStr(
      s,
      'psb',
      'form_subtitle',
      'Isi data santri dan wali. Draf tersimpan otomatis di perangkat ini.',
    ),
    intro: getStr(s, 'psb', 'intro', defaultPsb.intro),
    steps: cmsPsbSteps.length === 4 ? cmsPsbSteps : defaultPsb.steps,
    levels: cmsPsbLevels.length > 0 ? cmsPsbLevels : defaultPsb.levels,
    schedules: cmsPsbSchedules.length > 0 ? cmsPsbSchedules : defaultPsb.schedules,
    relations: cmsPsbRelations.length > 0 ? cmsPsbRelations : defaultPsb.relations,
    checklist: cmsPsbChecklist.length > 0 ? cmsPsbChecklist : defaultPsbChecklist,
  };

  const cmsDonationPrograms = getList(s, 'donasi', 'programs')
    .map((item) => ({
      id: itemStr(item, 'id'),
      label: itemStr(item, 'label'),
      note: itemStr(item, 'note'),
    }))
    .filter((item) => item.id && item.label);

  const cmsDonationAmounts = getList(s, 'donasi', 'amounts')
    .map((item) => itemNum(item, 'amount'))
    .filter((val): val is number => typeof val === 'number' && val > 0);

  const cmsDonationMethods = getList(s, 'donasi', 'methods')
    .map((item) => ({
      id: itemStr(item, 'id'),
      label: itemStr(item, 'label'),
      note: itemStr(item, 'note'),
    }))
    .filter((item) => item.id && item.label);

  const defaultWaFlow = [
    { title: 'Isi data', text: 'Program, nominal, metode.' },
    { title: 'Kirim ringkasan', text: `Ke ${site.contact.whatsapp}.` },
    { title: 'Terima instruksi', text: 'Rekening atau QRIS.' },
  ];

  const cmsWaFlow = getList(s, 'donasi', 'wa_flow')
    .map((item) => ({ title: itemStr(item, 'title'), text: itemStr(item, 'text') }))
    .filter((item) => item.title && item.text);

  const donasiHeroImg = getStr(s, 'donasi', 'hero_image', '/images/berbagi-santri-1400.jpg');
  const donasiTrustImg = getStr(s, 'donasi', 'trust_image', '/images/berbagi-paket-1400.jpg');
  const donation = {
    heroTitle: getStr(s, 'donasi', 'hero_title', 'Berbagi bersama Sahabat HIC'),
    heroSubtitle: getStr(
      s,
      'donasi',
      'hero_subtitle',
      `${sahabatHic.tagline} untuk anak yatim dan keluarga dhuafa.`,
    ),
    heroImage: donasiHeroImg,
    heroImageSrcset: localSrcset(donasiHeroImg),
    heroImageAlt: getStr(s, 'donasi', 'hero_image_alt', 'Santri menerima bantuan sosial dan pendidikan'),
    trustTitle: getStr(s, 'donasi', 'trust_title', 'Peruntukan amanah'),
    trustSubtitle: getStr(
      s,
      'donasi',
      'trust_subtitle',
      'Tiga jalur penyaluran resmi melalui Yayasan Hidayatul Ilmi Cendekia.',
    ),
    trustImage: donasiTrustImg,
    trustImageSrcset: localSrcset(donasiTrustImg),
    trustImageAlt: getStr(
      s,
      'donasi',
      'trust_image_alt',
      'Penyaluran bantuan program Sahabat Hidayatul Ilmi Cendekia',
    ),
    trustCaption: getStr(
      s,
      'donasi',
      'trust_caption',
      'Penyaluran bantuan program Sahabat Hidayatul Ilmi Cendekia.',
    ),
    homeTitle: getStr(s, 'donasi', 'home_title', 'Sahabat Hidayatul Ilmi Cendekia'),
    homeSubtitle: getStr(
      s,
      'donasi',
      'home_subtitle',
      'Berbagi Kebaikan, Meraih Keberkahan. Pilih nominal untuk konfirmasi donasi lewat WhatsApp.',
    ),
    programs: cmsDonationPrograms.length > 0 ? cmsDonationPrograms : defaultDonation.programs,
    amounts: cmsDonationAmounts.length > 0 ? cmsDonationAmounts : defaultDonation.amounts,
    methods: cmsDonationMethods.length > 0 ? cmsDonationMethods : defaultDonation.methods,
    waFlow: cmsWaFlow.length > 0 ? cmsWaFlow : defaultWaFlow,
  };

  const defaultIntents = [
    {
      title: 'Pendaftaran santri',
      summary: 'Iqra, Tahsin, Tahfidz Rumah Qur\u2019an HIC.',
      cta: 'Tanya pendaftaran',
      waMessage:
        'Assalamualaikum, saya ingin bertanya tentang pendaftaran santri baru Rumah Qur\u2019an Hidayatul Ilmi Cendekia.',
    },
    {
      title: 'Donasi Sahabat HIC',
      summary: 'Santunan anak yatim, dhuafa, dan pendidikan.',
      cta: 'Konsultasi donasi',
      waMessage:
        'Assalamualaikum, saya ingin berkonsultasi mengenai donasi dan santunan program Sahabat Hidayatul Ilmi Cendekia.',
    },
    {
      title: 'Kunjungan dan umum',
      summary: 'Silaturahmi dan informasi HIC.',
      cta: 'Tanya informasi',
      waMessage:
        'Assalamualaikum, saya ingin berkoordinasi mengenai kunjungan dan informasi Yayasan Hidayatul Ilmi Cendekia.',
    },
  ];

  const cmsIntents = getList(s, 'kontak', 'intents')
    .map((item) => ({
      title: itemStr(item, 'title'),
      summary: itemStr(item, 'summary'),
      cta: itemStr(item, 'cta', 'Hubungi WhatsApp'),
      waMessage: itemStr(
        item,
        'wa_message',
        `Assalamualaikum, saya ingin bertanya tentang ${site.name}.`,
      ),
    }))
    .filter((item) => item.title && item.summary);

  const kontakHeroImg = getStr(s, 'kontak', 'hero_image', '/images/galeri-taklim-01-1400.jpg');
  const kontak = {
    heroTitle: getStr(s, 'kontak', 'hero_title', 'Kontak dan sekretariat'),
    heroSubtitle: getStr(
      s,
      'kontak',
      'hero_subtitle',
      'Hubungi pengurus lewat WhatsApp atau kunjungi sekretariat di Gunung Putri, Bogor.',
    ),
    heroImage: kontakHeroImg,
    heroImageSrcset: localSrcset(kontakHeroImg),
    heroImageAlt: getStr(s, 'kontak', 'hero_image_alt', "Taklim ba'da maghrib di ruang utama"),
    intents: cmsIntents.length > 0 ? cmsIntents : defaultIntents,
    visitTitle: getStr(s, 'kontak', 'visit_title', 'Kunjungan sekretariat'),
    visitWaMessage: getStr(
      s,
      'kontak',
      'visit_wa_message',
      'Assalamualaikum, saya berencana berkunjung ke sekretariat Yayasan Hidayatul Ilmi Cendekia di Gunung Putri.',
    ),
  };

  const faqImg = getStr(s, 'faq', 'image', '/images/galeri-kajian-1400.jpg');
  const faqSection = {
    title: getStr(s, 'faq', 'title', 'Pertanyaan yang sering diajukan'),
    image: faqImg,
    imageSrcset: localSrcset(faqImg),
    imageAlt: getStr(s, 'faq', 'image_alt', 'Kajian bersama wali santri'),
  };

  const cmsFaq = getList(s, 'faq', 'items')
    .map((item) => ({
      q: itemStr(item, 'question'),
      a: itemStr(item, 'answer'),
    }))
    .filter((item) => item.q && item.a);

  return {
    source,
    status: cms?.status || 'active',
    site,
    hero,
    profile,
    sambutan,
    programsIntro,
    programPage,
    rumahQuran,
    sahabatHic,
    programs,
    synergy,
    galleryPage,
    gallery,
    homeGalleryStrip,
    achievementsSection,
    achievements,
    artikelPage,
    articles: defaultArticles,
    psb,
    donation,
    kontak,
    faqSection,
    faq: cmsFaq.length > 0 ? cmsFaq : defaultFaq,
    posts: cms?.posts ?? [],
  };
}

let cachedContent: Promise<HicCmsData> | undefined;

async function loadHicContent(): Promise<HicCmsData> {
  if (!isCmsConfigured()) {
    return buildHicContent(null, 'offline');
  }
  try {
    const cms = await getCms();
    return buildHicContent(cms, 'cms');
  } catch {
    return buildHicContent(null, 'offline');
  }
}

/**
 * Mengambil seluruh data konten situs HIC sekali per build dari RabuxID CMS,
 * dengan fallback aman ke nilai resmi di src/data/hic.ts jika kosong atau offline.
 */
export function getHicContent(): Promise<HicCmsData> {
  return (cachedContent ??= loadHicContent());
}
