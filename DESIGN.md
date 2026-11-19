# Design System & Layout Specification — KidHope (Non-Profit Charity)

Dokumen ini mendefinisikan sistem desain (warna, tipografi, komponen, dan tata letak) untuk landing page **KidHope** dengan gaya visual *warm editorial*, humanis, bersih, dan berorientasi pada konversi donasi[cite: 1].

---

## 1. Color Palette

| Role | Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Forest Green | `#11523E` | Navbar CTA, Stats bar, Impact section, Quote card, Footer background[cite: 1] |
| **Accent 1 (CTA)** | Coral Orange | `#F25C2A` | Tombol utama `DONATE NOW`, progress bar kampanye[cite: 1] |
| **Accent 2 (Highlight)** | Warm Yellow | `#F7D748` | Top utility bar, garis bawah dekoratif hero, angka statistik, rating bintang, tombol subscribe[cite: 1] |
| **Background Light** | Pure White | `#FFFFFF` | Latar belakang utama halaman & navbar[cite: 1] |
| **Surface Soft** | Mint Off-White | `#F4F7F5` | Latar kartu testimoni, kartu Mission/Vision, border halus[cite: 1] |
| **Text Primary** | Charcoal Black | `#1A1A1A` | Heading utama (H1–H3) di atas background terang[cite: 1] |
| **Text Secondary** | Muted Gray | `#5F6368` | Paragraf body, deskripsi kartu, label eyebrow[cite: 1] |
| **Text On Dark** | White / Soft White | `#FFFFFF` / `#D1E0DA` | Teks di atas background Forest Green & foto hero[cite: 1] |

---

## 2. Typography

Menggunakan kombinasi **Serif** untuk kesan hangat, empatik, dan terpercaya pada judul, dipadukan dengan **Sans-Serif** yang bersih untuk keterbacaan UI dan angka[cite: 1].

* **Heading Font:** `Playfair Display` atau `Lora` (Serif)
* **Body & UI Font:** `Plus Jakarta Sans` atau `Inter` (Sans-Serif)

| Element | Font Family | Size (Desktop) | Weight | Line Height | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero)** | Serif | `56px – 64px` | 600 / 700 | `1.15` | Aksen garis bawah kuning *hand-drawn* pada kata kunci[cite: 1] |
| **H2 (Section)** | Serif | `36px – 42px` | 600 | `1.2` | Judul tiap section utama[cite: 1] |
| **H3 (Card Title)** | Serif / Sans | `18px – 20px` | 600 | `1.3` | Judul kampanye, fitur, dan testimoni[cite: 1] |
| **Eyebrow / Label** | Sans-Serif | `12px` | 600 | `1.4` | Uppercase, `letter-spacing: 0.08em`, warna Muted Gray[cite: 1] |
| **Body Text** | Sans-Serif | `15px – 16px` | 400 | `1.6` | Deskripsi konten dan FAQ[cite: 1] |
| **Button Text** | Sans-Serif | `13px – 14px` | 600 | `1` | Uppercase untuk CTA utama (`DONATE NOW`)[cite: 1] |

---

## 3. Layout Grid, Spacing & Radius

* **Max Container Width:** `1200px – 1280px` (centered, padding horizontal `24px` di mobile, `48px` di desktop).
* **Section Vertical Padding:** `80px – 100px` antar section.
* **Border Radius:**
  * **Section Container (Dark Green):** `24px – 32px` (khususnya sudut atas transisi Hero ke Section 1, Impact Section, dan Footer)[cite: 1].
  * **Cards & Photos:** `16px – 20px`[cite: 1].
  * **Buttons & Inputs:** `9999px` (full pill)[cite: 1].
* **Visual Motifs:**
  * *Overlapping elements* (Stats bar menimpa bagian bawah banner Volunteer; badge persentase menimpa batas foto kartu kampanye)[cite: 1].
  * *Stacked/tilted photo* pada section Gift of $36 untuk kesan album foto organik[cite: 1].

---

## 4. Core UI Components

* **Primary Button (Orange):** Background `#F25C2A`, teks `#FFFFFF`, pill-shaped, padding `12px 28px`[cite: 1].
* **Secondary Button (Dark Green):** Background `#11523E`, teks `#FFFFFF`, pill-shaped (dipakai di Navbar)[cite: 1].
* **Ghost/Video Button:** Background transparan/gelap transparan (`rgba(0,0,0,0.4)`), border tipis putih, ikon `▶` di kiri[cite: 1].
* **Feature Card:** Background putih, border tipis `#E5EAE7`, radius `16px`, ikon solid hijau di kiri atas, judul, dan deskripsi 2 baris[cite: 1].

---

## 5. Section-by-Section Layout Breakdown

### 1. Top Utility Bar
* **Layout:** Full-width strip, background Warm Yellow (`#F7D748`), tinggi `36px–40px`[cite: 1].
* **Kiri:** Alamat dengan ikon pin + Nomor telepon dengan ikon telepon[cite: 1].
* **Kanan:** Email kontak + Dropdown bahasa (`ENG v`)[cite: 1].

### 2. Main Navigation Bar
* **Layout:** Sticky/static header, background putih, tinggi `72px–80px`, Flexbox `justify-between`[cite: 1].
* **Kiri:** Logo ikon hijau + teks `KidHope`[cite: 1].
* **Tengah:** Link navigasi horizontal (`Home`, `Campaigns`, `About Us`, `Pages`, `Blog`, `Contacts`)[cite: 1].
* **Kanan:** Ikon Search, ikon User/Account, dan tombol pill hijau `DONATE NOW`[cite: 1].

### 3. Hero Section
* **Layout:** Full-width background image (foto anak-anak tersenyum) dengan dark gradient overlay dari kiri ke kanan agar teks terbaca jelas[cite: 1]. Bagian bawah memiliki lengkungan/overlap putih dari section berikutnya[cite: 1].
* **Konten (Rata Kiri, Max-width `550px`):**
  * Eyebrow: `NON-PROFIT CHARITY`[cite: 1]
  * H1: `Together, We Can Change A Child's World` (garis bawah kuning di kata *Together,*)[cite: 1]
  * Action Row: Tombol `DONATE NOW` (Orange) + Tombol `▶ VIDEO PLAYING THEME` (Translucent/Outline)[cite: 1]

### 4. Section: How We Help ("Safe Water Protects")
* **Layout:** Grid asimetris 12 kolom (Kiri 8 kolom, Kanan 4 kolom)[cite: 1].
* **Kolom Kiri:**
  * Header: Eyebrow `HOW WE HELP` + H2 `Safe Water Protects`[cite: 1].
  * Sub-grid 3 kolom di bawahnya: 3 Feature Cards (`Clean Water & Energy`, `Global Health`, `Social Ventures`)[cite: 1].
* **Kolom Kanan:** 1 foto potret anak dengan `border-radius: 20px`[cite: 1].

### 5. Section: Equal Opportunity ("Gift of $36")
* **Layout:** 2 kolom sejajar (`50% / 50%`), vertically centered[cite: 1].
* **Kolom Kiri:** Efek tumpukan foto (*stacked & slightly rotated cards*) menampilkan foto anak di keran air[cite: 1].
* **Kolom Kanan:** Eyebrow `GIFT OF $36`, H2 `All Children Deserve An Equal Opportunity`, 2 paragraf penjelasan singkat, dan tombol pill Orange `DONATE NOW`[cite: 1].

### 6. Section: Volunteer Banner + Overlapping Stats Bar
* **Banner Utama:** Full-width background photo relawan dengan dark overlay[cite: 1]. Konten rata tengah: H2 `Volunteer Opportunities Now Open for You` + tombol pill putih `▶ WATCHING OUR VOLUNTEER`[cite: 1].
* **Stats Bar (Overlapping):** Container melayang di bagian bawah banner (margin negatif ke atas), background Forest Green (`#11523E`), `border-radius: 20px`[cite: 1].
  * **Grid 4 Kolom** dengan garis pemisah vertikal tipis:
    1. `999k` — Staff and volunteers across 16 countries[cite: 1]
    2. `4.9` — Of our staff in these countries are local[cite: 1]
    3. `65+` — Invested in all our programs last year 2024[cite: 1]
    4. `120K` — Natural in all our programs last[cite: 1]

### 7. Section: Why Choose Us / Mission & Vision
* **Layout:** 3 kolom editorial/bento grid[cite: 1].
* **Kolom Kiri:** Foto vertikal dengan floating badge kuning di pojok kiri bawah[cite: 1].
* **Kolom Tengah:** Eyebrow `WHY CHOOSE US`, H2, dan 2 daftar fitur dengan ikon (`Compassionate Care`, `Comfortable Living`)[cite: 1].
* **Kolom Kanan:** 3 kartu ditumpuk vertikal:
  * Card `Our Mission` (Surface Soft)[cite: 1]
  * Card `Our Vision` (Surface Soft)[cite: 1]
  * Card Quote (Forest Green) dengan teks kutipan, avatar kecil, dan ikon tanda petik[cite: 1]

### 8. Section: Photo Gallery Strip
* **Layout:** 4 kolom sejajar (`gap: 16px`), masing-masing berisi foto persegi dengan sudut membulat (`rounded-2xl`) menampilkan aktivitas komunitas dan anak-anak[cite: 1].

### 9. Section: Featured Campaigns
* **Header:** Rata tengah (Eyebrow `WE NEED YOUR HELP` + H2 `Featured Campaigns`) dengan tombol navigasi carousel (`<` `>`) di pojok kanan atas[cite: 1].
* **Grid:** 3 kolom Campaign Cards[cite: 1].
* **Anatomi Campaign Card:**
  * Thumbnail foto di atas[cite: 1].
  * Badge persentase bulat (misal `75%`) menimpa batas bawah foto[cite: 1].
  * Judul kampanye + deskripsi singkat[cite: 1].
  * Progress bar + info angka (*Raised* vs *Goal*)[cite: 1].
  * Tombol full-width Orange `DONATE NOW`[cite: 1].

### 10. Section: Recurring Donation ("Make An Impact All Year Long")
* **Container:** Blok besar Forest Green (`#11523E`) dengan `border-radius: 28px`[cite: 1].
* **Bagian Atas (Donation Widget):**
  * H2 rata tengah warna putih dengan aksen kilau kuning[cite: 1].
  * Input nominal donasi (`$100.00`) sejajar dengan tombol Orange `Donate Now`[cite: 1].
  * Baris pilihan nominal cepat (pill kecil: `$10`, `$25`, `$50`, `$100`, dll.)[cite: 1].
* **Bagian Bawah:** Grid 4 kolom kartu foto vertikal dengan caption pill kecil berwarna hijau/kuning di bagian atas/bawah foto[cite: 1].

### 11. Section: Feedback & Reviews
* **Header:** Rata tengah, H2 `Feedback & Reviews`[cite: 1].
* **Grid:** 3 kolom Testimonial Cards (background `#F4F7F5`, `border-radius: 16px`)[cite: 1].
  * Isi kartu: 5 bintang kuning, judul singkat, teks ulasan, serta avatar + nama pengulas di kanan atas/bawah[cite: 1].
* **Bawah:** Pagination dots (indikator slider)[cite: 1].

### 12. Section: Frequently Asked Questions (FAQ)
* **Header:** Rata tengah, Eyebrow + H2 `Frequently Asked Questions`[cite: 1].
* **Layout:** 2 kolom (`45% / 55%`)[cite: 1].
  * **Kiri:** Foto besar anak-anak dengan bunga (`border-radius: 20px`)[cite: 1].
  * **Kanan:** Komponen Accordion vertikal (item pertama terbuka secara default dengan indikator hijau, sisanya tertutup dengan garis pemisah tipis)[cite: 1].

### 13. Footer
* **Container:** Full-width Forest Green (`#11523E`), sudut atas membulat (`rounded-t-3xl`)[cite: 1].
* **Top Row (Newsletter):** Kiri = Tagline singkat (`Thanks to our partners we can clean the oceans.`); Kanan = Input email pill putih + tombol kuning `SUBSCRIBE`[cite: 1].
* **Middle Row (Links):** 5 kolom (Logo & deskripsi brand, Contacts, About Us, Support Us, Categories)[cite: 1].
* **Bottom Bar:** Garis pemisah tipis, teks copyright di kiri, dan deretan ikon media sosial di kanan[cite: 1].