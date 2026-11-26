# Yayasan Hidayatul Ilmi Cendekia (HIC)

Situs resmi Yayasan Hidayatul Ilmi Cendekia: Rumah Qur'an Hidayatul Ilmi Cendekia dan Sahabat Hidayatul Ilmi Cendekia.
Dibangun dengan Astro (static site generation), Tailwind CSS v4, dan React 19 islands.

- Produksi: https://hicgroup.or.id
- Data konten terpusat di `src/data/hic.ts`

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # hasil di dist/
npm run preview
```

## Struktur

```
src/
  data/hic.ts            # profil, visi, misi, Rumah Qur'an HIC, Sahabat HIC, galeri, FAQ, PSB, donasi
  layouts/Layout.astro   # SEO meta, OpenGraph, JSON-LD
  pages/                 # index, tentang, program, galeri, psb, donasi, kontak, 404
  components/hic/        # Header dan Footer
  components/islands/    # DonationQuick, PsbForm, DonationForm
  styles/                # tokens.css, base.css, global.css
public/images/           # foto dan logo program
```

## Informasi Sekretariat

- Alamat: Griya Bukit Jaya Blok C8 No.16 RT02 RW024 Desa Tlajung Udik, Kec. Gunung Putri, Kab. Bogor.
- WhatsApp: 0812 9048 0320 (`wa.me/6281290480320`)
- Konten bertanda `PLACEHOLDER` di `src/data/hic.ts` (`sambutan`, `articles`, `achievements`) disiapkan untuk diganti saat data pengurus dan arsip resmi tersedia.
