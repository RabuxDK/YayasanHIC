/**
 * Folder: src/constants/
 * Description: Generic boilerplate fallback data and examples for RabuxID Headless CMS.
 * Contains ZERO real-world client data. Used during offline development, testing, and CI/CD builds.
 * This file: fallbackData.ts
 */

import type { CmsWebsiteResponse } from '../types';

/**
 * Standard Fallback Data for Astro Boilerplate
 * All text, contact details, and products are clean, neutral boilerplate placeholders.
 */
export const FALLBACK_CMS_DATA: CmsWebsiteResponse = {
  id: 'site-boilerplate-01',
  name: 'Brand Boilerplate',
  slug: 'boilerplate-example',
  domain: 'example.com',
  status: 'active',
  environment: 'production',
  thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
  sections: {
    // 1. Hero Section Example
    hero: {
      headline: 'Solusi Modern & Terpercaya untuk Pertumbuhan Bisnis Anda',
      subheadline: 'Hadirkan produk dan layanan berkualitas prima dengan standar profesional untuk mengakselerasi kepuasan pelanggan dan efisiensi operasional.',
      ctaText: 'Jelajahi Produk',
      ctaLink: '#produk',
      badge: 'Layanan Profesional Unggulan',
      heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    },

    // 2. About Us Section Example
    about: {
      title: 'Membangun Kualitas dengan Integritas dan Pengalaman',
      story: 'Kami berdedikasi untuk memberikan layanan dan produk dengan standar kualitas terbaik kepada seluruh mitra dan pelanggan. Melalui komitmen transparansi, inovasi berkelanjutan, dan kepuasan pelanggan, kami siap menjadi mitra andal dalam mencapai tujuan bersama Anda.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      mission: 'Menghadirkan dampak positif berkelanjutan melalui solusi produk berkualitas unggul, keandalan operasional, dan kemitraan jangka panjang.',
      foundedYear: '2024',
    },

    // 3. Benefits / Highlights Section Example
    benefits: [
      {
        id: 'b-01',
        title: 'Kualitas Teruji & Terpercaya',
        description: 'Setiap produk dan layanan melalui standar kurasi ketat untuk memastikan hasil optimal dan kepuasan pelanggan.',
        icon: 'ShieldCheck',
      },
      {
        id: 'b-02',
        title: 'Respon Cepat & Andal',
        description: 'Dukungan komunikasi yang tanggap, jelas, dan solutif untuk mendampingi setiap kebutuhan Anda kapan pun.',
        icon: 'Zap',
      },
      {
        id: 'b-03',
        title: 'Transparansi Penuh',
        description: 'Alur kerja, pelaporan, dan penetapan harga yang jelas tanpa biaya tersembunyi demi menjaga integritas kemitraan.',
        icon: 'CheckCircle',
      },
      {
        id: 'b-04',
        title: 'Dukungan Berkelanjutan',
        description: 'Komitmen pendampingan jangka panjang untuk memastikan seluruh sistem dan produk Anda berjalan tanpa hambatan.',
        icon: 'Award',
      },
    ],

    // 4. Services Section Example
    services: [
      {
        id: 's-01',
        name: 'Paket Solusi Strategis',
        description: 'Pendampingan komprehensif mulai dari analisis kebutuhan dasar, perancangan solusi terpadu, hingga eksekusi tepat sasaran.',
        price: 'Mulai Rp 1.500.000',
        featured: true,
      },
      {
        id: 's-02',
        name: 'Layanan Kustom Spesifik',
        description: 'Penyesuaian spesifikasi produk dan fitur secara mendalam agar selaras dengan target unik dan kapasitas organisasi Anda.',
        price: 'Konsultasi Gratis',
        featured: false,
      },
      {
        id: 's-03',
        name: 'Pemeliharaan & Pendampingan',
        description: 'Pemantauan performa berkala dan penanganan cepat untuk menjaga kontinuitas aktivitas harian Anda tetap stabil.',
        price: 'Sesuai Kebutuhan',
        featured: false,
      },
    ],

    // 5. Contact Information Example
    contact: {
      email: 'kontak@example.com',
      phone: '+62 21 5550 1234',
      whatsapp: '6281200000000',
      address: 'Gedung Graha Niaga Lt. 8, Jl. Jenderal Sudirman Kav. 25, Jakarta Selatan 12920',
      workingHours: 'Senin - Jumat: 09.00 - 17.00 WIB',
    },

    // 6. Frequently Asked Questions (FAQ) Example
    faq: {
      title: 'Pertanyaan yang Sering Diajukan',
      subtitle: 'Informasi lengkap seputar pemesanan produk, mekanisme kerja sama, dan layanan purnajual kami.',
      items: [
        {
          question: 'Bagaimana cara melakukan pemesanan atau konsultasi?',
          answer: 'Anda dapat memilih opsi produk pada katalog dan langsung terhubung dengan tim kami via WhatsApp, atau mengisi formulir kontak yang tersedia.',
        },
        {
          question: 'Apakah layanan dapat disesuaikan dengan kebutuhan khusus?',
          answer: 'Tentu. Kami menyediakan opsi kustomisasi fleksibel sesuai dengan anggaran, spesifikasi teknis, dan target operasional bisnis Anda.',
        },
        {
          question: 'Berapa lama estimasi proses penyelesaian pesanan?',
          answer: 'Estimasi waktu disesuaikan dengan lingkup layanan yang dipilih, umumnya berkisar antara 3 hingga 10 hari kerja.',
        },
        {
          question: 'Apakah ada garansi atau pendampingan setelah transaksi?',
          answer: 'Ya, seluruh produk dan layanan kami dilengkapi dengan garansi mutu dan dukungan konsultasi teknis berkelanjutan.',
        },
      ],
    },

    // 7. Pricing Plans Example
    pricing: {
      title: 'Pilihan Paket Layanan Fleksibel',
      subtitle: 'Paket berlangganan transparan yang dapat ditingkatkan seiring berkembangnya skala kebutuhan Anda.',
      items: [
        {
          name: 'Paket Starter',
          price: 'Rp 450.000',
          period: '/ bulan',
          description: 'Solusi esensial untuk tim kecil atau rintisan yang membutuhkan implementasi praktis dan cepat.',
          features: [
            'Akses modul fitur utama',
            'Dukungan via email & pesan kerja',
            'Pembaruan sistem berkala',
            'Panduan implementasi dasar',
          ],
          isPopular: false,
          ctaText: 'Pilih Paket Starter',
        },
        {
          name: 'Paket Profesional',
          price: 'Rp 1.250.000',
          period: '/ bulan',
          description: 'Pilihan terpopuler untuk bisnis aktif yang memprioritaskan performa tinggi dan dukungan responsif.',
          features: [
            'Seluruh fitur Paket Starter',
            'Dukungan prioritas WhatsApp',
            'Kustomisasi konfigurasi lanjutan',
            'Laporan analitik performa bulanan',
          ],
          isPopular: true,
          ctaText: 'Pilih Paket Profesional',
        },
      ],
    },

    /**
     * CONTOH ARBITRARY CUSTOM SECTION:
     * Klien dapat menambahkan seksi bebas kolom (misal: testimonials, gallery, milestones, team).
     * Contoh definisi data:
     */
    testimonials: [
      {
        id: 't-01',
        quote: 'Pelayanan sangat profesional dan produk yang diberikan melampaui ekspektasi kami. Sangat direkomendasikan.',
        author: 'Budi Santoso',
        role: 'Direktur Operasional',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
      },
      {
        id: 't-02',
        quote: 'Proses komunikasi cepat dan solutif. Kebutuhan tim kami terselesaikan dengan rapi dalam hitungan hari.',
        author: 'Siti Rahma',
        role: 'Manajer Pengadaan',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      },
    ],
  },

  // Products / Catalog Example
  products: [
    {
      id: 'prod-01',
      name: 'Produk Solusi Esensial A1',
      description: 'Pilihan produk standar dengan keandalan tinggi dan kemudahan penggunaan untuk kebutuhan operasional harian.',
      price: 150000,
      category: 'Kategori Utama',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      isAvailable: true,
      stock: 45,
    },
    {
      id: 'prod-02',
      name: 'Produk Solusi Lanjutan B2',
      description: 'Solusi komprehensif dengan spesifikasi performa lebih tinggi untuk mendukung produktivitas skala menengah.',
      price: 320000,
      category: 'Kategori Utama',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      isAvailable: true,
      stock: 28,
    },
    {
      id: 'prod-03',
      name: 'Paket Aksesoris Pelengkap',
      description: 'Perlengkapan pendukung resmi yang dirancang presisi untuk memaksimalkan fungsi dan efisiensi produk utama.',
      price: 85000,
      category: 'Aksesoris',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80',
      isAvailable: true,
      stock: 60,
    },
    {
      id: 'prod-04',
      name: 'Modul Layanan Tambahan',
      description: 'Layanan pendampingan khusus dan proteksi ekstra untuk memastikan kelancaran aktivitas tanpa kendala.',
      price: 210000,
      category: 'Layanan Tambahan',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
      isAvailable: true,
      stock: 20,
    },
  ],
};
