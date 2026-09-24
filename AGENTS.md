# AGENTS.md — RabuxID Client Astro Boilerplate

Dokumen ini menyediakan panduan, konvensi teknis, arsitektur data, dan integrasi **Model Context Protocol (MCP)** bagi AI Coding Agents saat mengembangkan, memodifikasi, atau memelihara website klien berbasis **Astro + Tailwind CSS v4 + React 19** yang terhubung ke **RabuxID Headless CMS**.

---

## 1. Arsitektur & Tech Stack

- **Framework**: Astro 7+ (Static Site Generator & Hybrid Island Architecture)
- **UI Islands**: React 19 (`react`, `react-dom`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite` engine)
- **Icons**: Lucide React (`lucide-react`)
- **Animations**: Modern Motion (`motion/react`, v13+)
- **Bahasa**: TypeScript (Strict mode)
- **Integrasi CMS**: RabuxID REST API (`GET /api/cms/v1/websites/:slug`)
- **Protokol Agen**: Model Context Protocol (MCP) untuk automasi konten, produk, dan inspeksi CMS oleh AI

---

## 2. Struktur Direktori

```
Projects/boilerplate-astro/
├── public/
│   ├── favicon.svg             # Favicon SVG modern
│   └── robots.txt              # Konfigurasi crawler & sitemap
├── src/
│   ├── components/             # Komponen statis Astro (.astro)
│   │   ├── SectionHeader.astro # Heading seksi berstandar seragam
│   │   ├── MaintenanceView.astro # Layar pemeliharaan otomatis jika status === 'maintenance'
│   │   └── Footer.astro        # Footer lengkap dengan data kontak & jam buka
│   ├── components/islands/     # React 19 Interactive Islands (.tsx)
│   │   ├── Navbar.tsx          # Navigasi responsif + drawer + aksesibilitas keyboard (Esc)
│   │   ├── HeroCta.tsx         # Tombol aksi hero + integrasi WhatsApp direct
│   │   ├── ContactForm.tsx     # Form pesan kontak dengan state validasi & feedback lengkap
│   │   ├── FaqAccordion.tsx    # Accordion FAQ dengan semantik ARIA ramah keyboard
│   │   ├── PricingCards.tsx    # Kartu paket harga dengan pemesanan otomatis via WhatsApp
│   │   └── ProductsCatalog.tsx # Katalog produk dengan filter kategori & pemesanan instan
│   ├── constants/
│   │   └── fallbackData.ts     # Data contoh & cadangan aman bebas brand spesifik
│   ├── layouts/
│   │   └── Layout.astro        # Layout HTML induk: SEO Meta, OpenGraph, JSON-LD Schema
│   ├── pages/
│   │   ├── index.astro         # Halaman utama landing page konsumsi CMS
│   │   └── 404.astro           # Halaman 404 Not Found yang ramah pengguna
│   ├── services/
│   │   └── cms.ts              # Data fetcher & utility generator tautan WhatsApp
│   ├── styles/
│   │   └── global.css          # Entry point Tailwind v4 (@import "tailwindcss";)
│   └── types/
│       └── index.ts            # Definisi antarmuka TypeScript untuk seluruh struktur CMS
├── .env.example                # Dokumentasi variabel lingkungan (boilerplate generic)
├── .gitignore                  # Aturan pengabaian berkas git
├── astro.config.mjs            # Konfigurasi Astro, React 19 dedupe, Tailwind v4
├── package.json                # Dependensi dan skrip proyek
├── tsconfig.json               # Konfigurasi kompilasi TypeScript
└── AGENTS.md                   # Dokumen panduan agen ini
```

---

## 3. Integrasi dengan RabuxID Headless CMS

### Endpoint REST API Publik
Website membaca data terpublikasi dari endpoint:
```http
GET /api/cms/v1/websites/:slug
```
Query parameter opsional untuk pratinjau draf belum tayang:
```http
GET /api/cms/v1/websites/:slug?preview=true
```

### Variabel Lingkungan (`.env`)
Pastikan selalu menggunakan data konfigurasi umum untuk boilerplate:
```bash
PUBLIC_API_URL=http://localhost:3000
PUBLIC_WEBSITE_SLUG=boilerplate-example
PUBLIC_SITE_URL=https://example.com
```

### Prinsip Resiliensi & Fallback
Fungsi `fetchCmsData()` pada `src/services/cms.ts` dilengkapi dengan `AbortController` timeout (4 detik) dan penangkap error otomatis:
1. Jika backend aktif, data database terbaru yang telah di-publish akan diambil.
2. Jika backend sedang offline, restart, atau slug belum dibuat, fungsi mengembalikan `FALLBACK_CMS_DATA` dari `src/constants/fallbackData.ts`.
3. Proses kompilasi build (`npm run build`) **dijamin tidak akan pernah crash** akibat kegagalan jaringan atau server mati.

---

## 4. Pola Dynamic Arbitrary Sections & Contoh Penggunaan

CMS RabuxID mendukung seksi dinamis bebas kolom kaku. Semua seksi tersimpan di objek `data.sections`.

### A. Mengambil Seksi Standar
```ts
const hero = cms.sections.hero || {};
const about = cms.sections.about || {};
const benefits = cms.sections.benefits || [];
const services = cms.sections.services || [];
const contact = cms.sections.contact || {};
const faq = cms.sections.faq || {};
const pricing = cms.sections.pricing || {};
```

### B. Menambahkan & Menangani Seksi Kustom (Arbitrary Custom Sections)
Klien atau agen dapat menambahkan seksi bebas kolom (misalnya `testimonials`, `gallery`, `team`, `milestones`, atau `custom_cta`).

#### Contoh 1: Seksi Testimoni (`testimonials`)
```astro
---
// src/pages/index.astro
const testimonials = cms.sections.testimonials || [];
---

{testimonials.length > 0 && (
  <section class="py-20 bg-slate-900/40 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4">
      <SectionHeader
        badge="Testimoni"
        title="Apa Kata Klien Kami"
        subtitle="Kepuasan pelanggan adalah prioritas utama kami."
      />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((item: any) => (
          <div class="p-6 rounded-2xl bg-slate-950 border border-slate-800">
            <p class="text-slate-300 italic">"{item.quote}"</p>
            <div class="mt-4 flex items-center gap-3">
              {item.avatar && (
                <img src={item.avatar} alt={item.author} class="w-10 h-10 rounded-full" />
              )}
              <div>
                <h4 class="font-bold text-white text-sm">{item.author}</h4>
                <p class="text-xs text-slate-400">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}
```

#### Contoh 2: Seksi Galeri Portofolio (`gallery`)
```astro
---
const gallery = cms.sections.gallery || [];
---

{gallery.length > 0 && (
  <section class="py-20 bg-slate-950 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4">
      <SectionHeader badge="Galeri" title="Dokumentasi & Portofolio" />
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((img: any) => (
          <div class="rounded-xl overflow-hidden aspect-square border border-slate-800">
            <img src={img.url} alt={img.caption || 'Foto'} class="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  </section>
)}
```

---

## 5. Konvensi Astro Islands (React 19)

Astro mengadopsi arsitektur *Zero JavaScript by default*. Gunakan direktif klien secara bijak:

1. **`client:load`**:
   - Gunakan hanya untuk komponen interaktif kritis di bagian atas viewport (above the fold) yang harus segera aktif, contohnya: `<Navbar />`, `<HeroCta />`.
2. **`client:visible`**:
   - Gunakan untuk komponen interaktif di bawah viewport (below the fold) agar bundle JS hanya dimuat saat komponen terlihat di layar, contohnya: `<ProductsCatalog />`, `<FaqAccordion />`, `<ContactForm />`, `<PricingCards />`.
3. **Komponen Statis Astro (`.astro`)**:
   - Semua elemen yang tidak memerlukan event listener klien (state, onClick, form handling) wajib ditulis sebagai komponen Astro murni (`.astro`) demi performa optimal, contohnya: `SectionHeader.astro`, `MaintenanceView.astro`, `Footer.astro`.

### Catatan Penting React 19 di Astro
Pastikan `astro.config.mjs` selalu mempertahankan konfigurasi deduplikasi Vite:
```js
vite: {
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      '@astrojs/react/client.js',
    ],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
}
```

---

## 6. Aturan Desain & Antislop (Craftsmanship Standard)

Setiap agen yang memodifikasi UI pada template ini wajib mematuhi standar kualitas berikut:

1. **Copywriting & Tanda Baca (R-02)**:
   - Dilarang keras menggunakan em dash (`—`) pada teks antarmuka atau salinan konten. Gunakan koma, titik, titik dua, atau kurung.
   - Hindari kata klise AI marketing buzzword seperti "AI-Powered", "Revolutionary", "Next-Gen", "Seamless".
   - Gunakan data generik berkualitas tinggi, jangan menyisipkan nama merek atau data kontak riil tanpa izin eksplisit.
2. **Responsivitas Mobile (R-03)**:
   - Seluruh tombol dan target ketukan wajib memiliki ukuran minimal 44 x 44 piksel (`min-h-[44px]`).
   - Tidak boleh ada overflow horizontal pada resolusi apapun (320px sampai desktop 4K).
3. **Aksesibilitas & Keyboard (R-25, R-32)**:
   - Kontras warna teks memenuhi standar WCAG AA (minimal 4.5:1 untuk teks normal).
   - Seluruh elemen interaktif dapat dijangkau dan dioperasikan menggunakan keyboard (Tab, Enter, Space).
   - Modal dan menu mobile wajib bisa ditutup dengan tombol Escape.
   - Jangan pernah menghapus outline fokus tanpa menyediakan indikator visual pengganti (`focus-visible:ring-2`).
4. **Kelengkapan State UI (R-27)**:
   - Setiap komponen data interaktif wajib memiliki penanganan untuk state kosong (*empty state*), proses memuat (*loading state*), dan kegagalan (*error state*).
5. **Kejujuran Data (R-17, R-18, R-36)**:
   - Jangan menyisipkan statistik palsu (misal "10K+ Pengguna", "99.9% Uptime") atau testimoni palsu tanpa sumber data riil dari CMS.

---

## 7. Skrip Pengembangan & Verifikasi

Sebelum menyelesaikan tugas atau membuat commit:

1. Jalankan development server lokal:
   ```bash
   npm run dev
   ```
2. Jalankan kompilasi produksi untuk memastikan tidak ada kesalahan tipe atau sintaks:
   ```bash
   npm run build
   ```
3. Lakukan pratinjau hasil kompilasi:
   ```bash
   npm run preview
   ```

---

## 8. Panduan Integrasi Model Context Protocol (MCP) untuk AI Agents

RabuxID menyediakan **Model Context Protocol (MCP) Server** resmi yang memungkinkan AI Coding Agents (Antigravity, Claude Desktop, Cursor, Cline) berinteraksi langsung dengan backend CMS RabuxID. Agen dapat menginspeksi struktur website klien, membaca atau memodifikasi draf konten, mengelola katalog produk, mengunggah media, dan mempublikasikan perubahan secara terprogram tanpa intervensi manual.

### A. Arsitektur & Keamanan Kunci MCP
- **Single Active Key**: Setiap akun Super Admin hanya dapat memiliki **1 API Key aktif** (`rbx_admin_mcp_...`). Membuat key baru akan otomatis membatalkan key sebelumnya.
- **Dua Opsi Transport**:
  1. **Stdio Transport** (Lokal / CLI): Menjalankan script TypeScript mandiri `mcp/index.ts`.
  2. **SSE Transport** (HTTP Streaming): Menghubungkan langsung ke endpoint backend `/api/mcp/v1/sse`.

### B. Konfigurasi MCP Host untuk AI Agents

#### 1. Claude Desktop (`claude_desktop_config.json`)
```json
{
  "mcpServers": {
    "rabux-cms": {
      "command": "bun",
      "args": ["run", "D:/RabuxID/mcp/index.ts"],
      "env": {
        "RABUX_MCP_API_KEY": "rbx_admin_mcp_YOUR_ACTIVE_KEY_HERE",
        "RABUX_API_BASE_URL": "http://localhost:3000"
      }
    }
  }
}
```

#### 2. Antigravity CLI / Cursor
Tambahkan ke konfigurasi MCP Antigravity (`~/.gemini/antigravity-cli/mcp.json` atau via menu Settings):
```json
{
  "mcpServers": {
    "rabux-cms": {
      "url": "http://localhost:3000/api/mcp/v1/sse",
      "headers": {
        "Authorization": "Bearer rbx_admin_mcp_YOUR_ACTIVE_KEY_HERE"
      }
    }
  }
}
```

### C. Daftar Tool MCP Esensial untuk Agen Website Klien

Berikut adalah tool-tool MCP yang sering digunakan saat mengembangkan dan menyinkronkan website Astro dengan RabuxID:

| Nama Tool MCP | Kategori | Fungsi Utama untuk Agen |
|---|---|---|
| `get_website` | Website | Membaca konfigurasi website, slug, status maintenance, dan custom domain. |
| `get_website_content` | Konten | Mengambil seluruh konten terpublikasi atau draf (`draft: true`) dalam format JSON. |
| `update_website_content` | Konten | Memperbarui atau menambahkan seksi kustom ke dalam draf website (`hero`, `about`, `testimonials`, dll). |
| `publish_website_changes` | Website | Mempublikasikan draf konten agar langsung aktif di website live klien. |
| `list_products` | Produk | Membaca daftar produk aktif, kategori, harga, dan gambar. |
| `create_product` | Produk | Menambahkan produk baru ke katalog website klien. |
| `list_media_assets` | Media | Melihat daftar URL gambar yang telah diunggah ke Galeri Media CMS. |
| `get_storage_usage` | Media | Memeriksa kapasitas sisa penyimpanan media klien. |
| `table_schema` | Database | Menginspeksi skema tabel Prisma secara dinamis untuk memahami struktur data. |

### D. Alur Kerja (Workflow) Agen Menggunakan MCP

Jika seorang AI Agent diminta memperbarui atau menyesuaikan website klien:

1. **Langkah 1: Cek Konten Website Klien Saat Ini**
   Panggil tool `get_website_content` dengan parameter `websiteId` atau `slug`:
   ```json
   {
     "slug": "boilerplate-example",
     "draft": false
   }
   ```
   Agen akan menerima seluruh JSON sections (`hero`, `about`, `benefits`, `services`, `faq`, dsb).

2. **Langkah 2: Perbarui Konten Draf**
   Panggil tool `update_website_content` untuk memperbarui teks atau menambahkan seksi baru:
   ```json
   {
     "slug": "boilerplate-example",
     "sections": {
       "hero": {
         "headline": "Solusi Digital Terpadu",
         "subheadline": "Meningkatkan daya saing bisnis Anda dengan teknologi mutakhir.",
         "ctaText": "Hubungi Kami",
         "ctaLink": "#kontak"
       },
       "testimonials": [
         {
           "quote": "Layanan luar biasa dan sangat profesional!",
           "author": "Ahmad Dani",
           "role": "CEO Tech Corp"
         }
       ]
     }
   }
   ```

3. **Langkah 3: Publikasikan Perubahan**
   Setelah verifikasi, panggil tool `publish_website_changes`:
   ```json
   {
     "slug": "boilerplate-example"
   }
   ```
   Konten draf akan disalin ke status terpublikasi (`published`) dan langsung terbaca oleh Astro saat di-build atau di-fetch.

4. **Langkah 4: Jalankan Build Verifikasi**
   Pastikan Astro mengompilasi dengan sukses:
   ```bash
   npm --prefix Projects/boilerplate-astro run build
   ```
   Website klien siap digunakan dengan data terbaru.

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, load the antislop skill for the task:
- Core filter, always on: `antislop`
- UI / visual: `antislop-ui`
- Copy & text: `antislop-copywriting`
- People: `antislop-human`
- Mobile / responsive: `antislop-layoutmobile`
- Code comments: `antislop-code`
Before starting, ask the user when antislop applies: during the work, or after it is done.
<!-- antislop:end -->
