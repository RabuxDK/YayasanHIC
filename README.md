# Yayasan Hidayatul Ilmi Cendekia (HIC)

Situs resmi Yayasan Hidayatul Ilmi Cendekia: Rumah Qur'an HIC dan HIC Berbagi.
Dibangun dengan Astro (static site generation), Tailwind CSS v4, dan React 19 islands.

- Produksi: https://hic.rabux.id
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
  data/hic.ts            # profil yayasan, program, galeri, FAQ, PSB, donasi
  layouts/Layout.astro   # SEO meta, OpenGraph, JSON-LD
  pages/                 # index, galeri, psb, donasi, kontak, 404
  components/hic/        # Header dan Footer
  components/islands/    # DonationQuick, PsbForm, DonationForm
  styles/                # tokens.css, base.css, global.css
public/images/           # foto dan poster program
```

## Catatan

Nomor telepon, alamat, dan email di `src/data/hic.ts` masih placeholder. Ganti
dengan data resmi yayasan sebelum situs dipakai untuk menerima pendaftaran atau donasi.
