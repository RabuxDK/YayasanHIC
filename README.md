# RabuxID Client Astro Boilerplate

Template landing page modern, ultra-cepat, dan SEO-ready berbasis **Astro + Tailwind CSS v4 + React 19** yang terintegrasi langsung dengan **RabuxID Headless CMS** serta mendukung orkestrasi otomatis via **Model Context Protocol (MCP)**.

---

## ✨ Fitur Utama

- 🚀 **Astro 7+ Architecture**: Static Site Generation (SSG) dengan performa maksimal dan *Zero JavaScript by default*.
- 🏝️ **React 19 Islands**: Interaktivitas dinamis pada komponen kritis (Navbar, Formulir Kontak, Accordion FAQ, Katalog Produk, Filter Kategori) dengan pemuatan terisolasi (`client:load`, `client:visible`).
- 🎨 **Tailwind CSS v4**: Desain modern menggunakan mesin styling `@tailwindcss/vite` terbaru.
- 📦 **RabuxID Headless CMS Ready**: Mengonsumsi data website dan katalog produk secara langsung dari REST API RabuxID (`/api/cms/v1/websites/:slug`).
- 🛡️ **Offline Resilient & Safe Build**: Dilengkapi data cadangan (`src/constants/fallbackData.ts`) sehingga proses kompilasi (`npm run build`) **tidak akan pernah gagal** meskipun backend sedang offline atau dalam tahap inisialisasi.
- 🧩 **Arbitrary Dynamic Sections**: Fleksibilitas penuh untuk menampilkan seksi standar (`hero`, `about`, `services`, `benefits`, `pricing`, `faq`, `contact`) maupun seksi kustom bebas kolom (`testimonials`, `gallery`, `team`, dll).
- 🤖 **Model Context Protocol (MCP) Integration**: Kompatibel dengan AI Coding Agent (Claude Desktop, Antigravity, Cursor, Cline) untuk manajemen konten, produk, dan inspeksi otomatis.
- ♿ **Aksesibilitas & Standar Craftsmanship**: Memenuhi standar kontras WCAG AA, navigasi keyboard (Esc, Tab), dan ukuran target ketukan mobile minimal 44x44px.

---

## 📁 Struktur Direktori

```
Projects/boilerplate-astro/
├── public/                     # Aset statis publik (favicon, robots.txt, sitemap)
├── src/
│   ├── components/             # Komponen statis Astro (.astro)
│   │   ├── SectionHeader.astro # Heading seksi berstandar seragam
│   │   ├── MaintenanceView.astro # Tampilan pemeliharaan otomatis saat status === 'maintenance'
│   │   └── Footer.astro        # Footer lengkap dengan kontak & tautan navigasi
│   ├── components/islands/     # React 19 Interactive Islands (.tsx)
│   │   ├── Navbar.tsx          # Navigasi responsif + mobile drawer + keyboard Esc
│   │   ├── HeroCta.tsx         # Tombol aksi hero + integrasi WhatsApp direct
│   │   ├── ContactForm.tsx     # Formulir pesan kontak dengan validasi & state lengkap
│   │   ├── FaqAccordion.tsx    # Accordion FAQ ramah aksesibilitas
│   │   ├── PricingCards.tsx    # Kartu paket harga dengan trigger WhatsApp otomatis
│   │   └── ProductsCatalog.tsx # Katalog produk dengan filter kategori & pemesanan instan
│   ├── constants/
│   │   └── fallbackData.ts     # Data cadangan aman bebas brand spesifik (zero client data)
│   ├── layouts/
│   │   └── Layout.astro        # Layout HTML induk: SEO Meta, OpenGraph, JSON-LD Schema
│   ├── pages/
│   │   ├── index.astro         # Halaman utama landing page konsumsi CMS
│   │   └── 404.astro           # Halaman 404 Not Found ramah pengguna
│   ├── services/
│   │   └── cms.ts              # Fetcher CMS, format mata uang IDR, & utilitas WhatsApp
│   ├── styles/
│   │   └── global.css          # Entry point styling Tailwind v4
│   └── types/
│       └── index.ts            # Antarmuka TypeScript untuk skema data CMS
├── .env.example                # Contoh konfigurasi variabel lingkungan
├── .env                        # Konfigurasi aktif lokal
├── AGENTS.md                   # Panduan teknis lengkap & instruksi agen AI
├── astro.config.mjs            # Konfigurasi Astro, React 19 dedupe, & Tailwind v4
├── package.json                # Skrip dan dependensi proyek
└── tsconfig.json               # Konfigurasi kompilasi TypeScript
```

---

## 🚀 Memulai Pengembangan

### 1. Prasyarat
- **Node.js**: Versi 18.x atau lebih baru (direkomendasikan Node.js 20+ atau Bun 1.1+)
- **NPM / PNPM / Bun**

### 2. Instalasi Dependensi
Jalankan perintah berikut di dalam direktori `Projects/boilerplate-astro`:
```bash
npm install
```

### 3. Konfigurasi Variabel Lingkungan (`.env`)
Salin berkas `.env.example` menjadi `.env` jika belum ada:
```bash
cp .env.example .env
```
Sesuaikan variabel lingkungan:
```env
# URL Backend RabuxID CMS
PUBLIC_API_URL=http://localhost:3000

# Slug Website Klien di RabuxID CMS
PUBLIC_WEBSITE_SLUG=boilerplate-example

# Domain Publik Website
PUBLIC_SITE_URL=https://example.com
```

### 4. Menjalankan Server Pengembangan Lokal
```bash
npm run dev
```
Buka browser pada alamat [http://localhost:4321](http://localhost:4321) untuk melihat pratinjau langsung.

---

## 🛠️ Perintah Skrip yang Tersedia

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan lokal dengan fitur hot reload |
| `npm run build` | Mengompilasi website menjadi berkas statis produksi di folder `dist/` |
| `npm run preview` | Menjalankan server pratinjau lokal untuk menguji hasil build `dist/` |
| `npm run astro` | Menjalankan CLI Astro untuk diagnosa atau instalasi integrasi |

---

## 🌐 Integrasi dengan RabuxID Headless CMS

### Endpoint REST API
Website membaca data terpublikasi dari endpoint:
```http
GET /api/cms/v1/websites/:slug
```
Untuk menguji draf konten yang belum dipublikasikan ke publik, tambahkan query parameter `preview=true`:
```http
GET /api/cms/v1/websites/:slug?preview=true
```

### Resiliensi & Mekanisme Cadangan
Layanan pengambilan data (`src/services/cms.ts`) dilengkapi dengan timeout otomatis (4 detik) dan penangkap error. Apabila backend sedang offline, slug belum terdaftar, atau jaringan terputus, sistem secara otomatis beralih menggunakan data cadangan dari [`src/constants/fallbackData.ts`](file:///D:/RabuxID/Projects/boilerplate-astro/src/constants/fallbackData.ts) tanpa menghentikan build.

---

## 🧩 Seksi Bebas Kolom (Arbitrary Dynamic Sections)

Selain seksi baku (`hero`, `about`, `benefits`, `services`, `faq`, `pricing`, `contact`), CMS RabuxID mendukung seksi bebas kolom. Agen atau pengembang dapat menambahkan dan merender seksi baru secara fleksibel:

```astro
---
// src/pages/index.astro
const customSection = cms.sections['nama_seksi_kustom'];
---

{customSection && (
  <section class="py-20 bg-slate-900 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-white">{customSection.title}</h2>
      <p class="text-slate-300 mt-2">{customSection.description}</p>
    </div>
  </section>
)}
```

---

## 🤖 Automasi AI dengan Model Context Protocol (MCP)

RabuxID menyediakan **MCP Server** terintegrasi yang memungkinkan AI Coding Agent (seperti Antigravity, Claude Desktop, Cursor) untuk:
1. Membaca dan menginspeksi konfigurasi website klien (`get_website`, `get_website_content`).
2. Menambah atau mengedit konten draf (`update_website_content`).
3. Mempublikasikan perubahan ke website aktif (`publish_website_changes`).
4. Mengelola katalog produk (`list_products`, `create_product`, `update_product`).
5. Memeriksa aset media yang diunggah (`list_media_assets`, `get_storage_usage`).

### Contoh Konfigurasi MCP (Antigravity / Cursor / SSE)
```json
{
  "mcpServers": {
    "rabux-cms": {
      "url": "http://localhost:3000/api/mcp/v1/sse",
      "headers": {
        "Authorization": "Bearer rbx_admin_mcp_YOUR_ACTIVE_KEY"
      }
    }
  }
}
```

Panduan lengkap mengenai alur kerja dan katalog 30 tool MCP dapat dibaca pada dokumen [**`AGENTS.md`**](file:///D:/RabuxID/Projects/boilerplate-astro/AGENTS.md#L182-L260).

---

## 📄 Lisensi & Hak Cipta
Dikelola oleh platform **RabuxID**. Seluruh hak cipta dilindungi.
