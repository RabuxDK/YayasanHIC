/**
 * Satu sumber data untuk situs Yayasan Hidayatul Ilmi Cendekia.
 * Ganti nilai di bagian `contact` dan `site.url` dengan data resmi sebelum publikasi.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface GalleryItem {
  src: string;
  srcset?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  span?: 'wide' | 'tall';
}

export interface Program {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  image: string;
  imageAlt: string;
  audience: string;
  points: { title: string; text: string }[];
  note: string;
  action: NavItem;
  secondary: NavItem;
}

export const site = {
  name: 'Yayasan Hidayatul Ilmi Cendekia',
  short: 'HIC',
  url: 'https://hic.rabux.id',
  description:
    'Rumah Qur\u2019an, pembinaan santri, dan program berbagi Yayasan Hidayatul Ilmi Cendekia.',
  contact: {
    address: 'Jl. Pendidikan Raya No. 1, Kota Anda',
    whatsapp: '+62 812-0000-0000',
    waNumber: '6281200000000',
    phone: '+62 812-0000-0000',
    email: 'sekretariat@hic.example',
    hours: 'Senin sampai Sabtu, 08.00 sampai 16.00',
  },
  nav: [
    { label: 'Tentang', href: '/#tentang' },
    { label: 'Program', href: '/#program' },
    { label: 'Galeri', href: '/galeri' },
    { label: 'Donasi', href: '/donasi' },
    { label: 'Kontak', href: '/kontak' },
  ] as NavItem[],
};

export const programs: Program[] = [
  {
    slug: 'rumah-quran',
    name: 'Rumah Qur\u2019an HIC',
    tagline: 'Pembinaan Al-Qur\u2019an',
    summary: 'Bacaan, hafalan, dan adab dalam halaqah kecil.',
    image: '/images/program-quran-640.png',
    imageAlt: 'Poster program Rumah Qur\u2019an HIC',
    audience: 'anak usia sekolah.',
    points: [
      { title: 'Tahsin bacaan', text: 'Makhraj, tajwid, kelancaran.' },
      { title: 'Tahfizh bertahap', text: 'Halaman demi halaman.' },
      { title: 'Murajaah', text: 'Hafalan lama diulang.' },
      { title: 'Adab', text: 'Sopan santun dengan guru.' },
    ],
    note: 'Jadwal disepakati saat wawancara.',
    action: { label: 'Daftar santri baru', href: '/psb' },
    secondary: { label: 'Tanya jadwal', href: '/kontak' },
  },
  {
    slug: 'hic-berbagi',
    name: 'HIC Berbagi',
    tagline: 'Bantuan untuk santri',
    summary: 'Paket pendidikan dan santunan untuk santri terdata.',
    image: '/images/program-berbagi-640.png',
    imageAlt: 'Poster program HIC Berbagi',
    audience: 'santri terdata.',
    points: [
      { title: 'Paket alat tulis', text: 'Buku, pena, dan tas.' },
      { title: 'Bantuan biaya pendidikan', text: 'Disesuaikan kebutuhan.' },
      { title: 'Santunan harian', text: 'Makan dan transportasi.' },
    ],
    note: 'Penerima diverifikasi pengurus.',
    action: { label: 'Salurkan donasi', href: '/donasi' },
    secondary: { label: 'Tanya pengurus', href: '/kontak' },
  },
];

export const dayRhythm = [
  { title: 'Setoran pagi', text: 'Setoran hafalan baru.' },
  { title: 'Tahsin sore', text: 'Makhraj dan panjang pendek.' },
  { title: 'Murajaah', text: 'Mengulang hafalan lama.' },
  { title: 'Adab', text: 'Sopan santun dengan guru.' },
];

export const ways = [
  {
    title: 'Pembinaan',
    text: 'Halaqah kecil, guru mengenal tiap santri.',
  },
  {
    title: 'Pendampingan',
    text: 'Wali diajak bicara soal perkembangan anak.',
  },
  {
    title: 'Penyaluran',
    text: 'Bantuan dicatat dan disalurkan pengurus.',
  },
];

export const wali = [
  'Kajian wali santri di ruang utama.',
  'Percakapan tentang perkembangan bacaan dan hafalan.',
  'Pintu terbuka untuk bertanya langsung ke guru.',
];

export const gallery: GalleryItem[] = [
  {
    src: '/images/galeri-musholla-800.jpg',
    srcset: '/images/galeri-musholla-800.jpg 800w, /images/galeri-musholla-1400.jpg 1280w',
    alt: 'Santri duduk melingkar di musholla',
    caption: 'Halaqah pagi di musholla',
    width: 1280,
    height: 960,
    span: 'wide',
  },
  {
    src: '/images/galeri-quran-800.jpg',
    srcset: '/images/galeri-quran-800.jpg 800w, /images/galeri-quran-1400.jpg 1280w',
    alt: 'Anak memegang mushaf dan membaca',
    caption: 'Setoran hafalan',
    width: 1280,
    height: 853,
  },
  {
    src: '/images/galeri-kelas-800.jpg',
    srcset: '/images/galeri-kelas-800.jpg 800w, /images/galeri-kelas-1400.jpg 1280w',
    alt: 'Kelas tahsin dengan papan tulis',
    caption: 'Kelas tahsin',
    width: 1280,
    height: 576,
  },
  {
    src: '/images/galeri-kajian-800.jpg',
    srcset: '/images/galeri-kajian-800.jpg 800w, /images/galeri-kajian-1400.jpg 1280w',
    alt: 'Kajian bersama wali santri',
    caption: 'Kajian wali santri',
    width: 1280,
    height: 854,
  },
  {
    src: '/images/galeri-pendampingan-800.jpg',
    srcset: '/images/galeri-pendampingan-800.jpg 800w, /images/galeri-pendampingan-1400.jpg 1280w',
    alt: 'Pendampingan belajar satu per satu',
    caption: 'Pendampingan belajar',
    width: 1280,
    height: 1920,
    span: 'tall',
  },
  {
    src: '/images/galeri-taklim-01-800.jpg',
    srcset: '/images/galeri-taklim-01-800.jpg 800w, /images/galeri-taklim-01-1400.jpg 1280w',
    alt: 'Taklim ba\u2019da maghrib di ruang utama',
    caption: 'Taklim ba\u2019da maghrib',
    width: 1280,
    height: 853,
  },
  {
    src: '/images/galeri-malam-800.jpg',
    srcset: '/images/galeri-malam-800.jpg 800w, /images/galeri-malam-1400.jpg 1280w',
    alt: 'Murajaah malam bersama pendamping',
    caption: 'Murajaah malam',
    width: 1280,
    height: 914,
  },
  {
    src: '/images/berbagi-paket-800.jpg',
    srcset: '/images/berbagi-paket-800.jpg 800w, /images/berbagi-paket-1400.jpg 1280w',
    alt: 'Paket bantuan HIC Berbagi disiapkan',
    caption: 'Paket HIC Berbagi',
    width: 1280,
    height: 960,
  },
];

/**
 * PLACEHOLDER: teks sambutan, nama, jabatan, dan foto pengurus di bawah ini
 * adalah contoh. Ganti dengan sambutan dan foto pengurus asli yayasan
 * sebelum publikasi.
 */
export const sambutan = {
  title: 'Sambutan Pengurus',
  photo: '/images/sambutan-pengurus.jpg',
  photoAlt: 'Foto pengurus Yayasan Hidayatul Ilmi Cendekia (placeholder)',
  photoWidth: 768,
  photoHeight: 1408,
  name: 'Nama Pengurus',
  role: 'Ketua Pengurus Yayasan Hidayatul Ilmi Cendekia',
  paragraphs: [
    'Assalamu\u2019alaikum warahmatullahi wabarakatuh. Selamat datang di website Yayasan Hidayatul Ilmi Cendekia, rumah bagi Rumah Qur\u2019an dan program HIC Berbagi.',
    'Kami membina bacaan, hafalan, dan adab santri dalam halaqah kecil, sambil mendampingi keluarga dan menyalurkan bantuan untuk santri yang membutuhkan. Semoga website ini memudahkan Bapak dan Ibu mengenal program kami, mendaftarkan santri baru, dan ikut berbagi kebaikan.',
    'Terima kasih atas kepercayaan dan dukungan yang diberikan. Wassalamu\u2019alaikum warahmatullahi wabarakatuh.',
  ],
};

export interface Article {
  date: string;
  category: string;
  title: string;
  author: string;
  excerpt: string;
  image: string;
  imageAlt: string;
}

/**
 * PLACEHOLDER: artikel contoh untuk section Latest Article di beranda.
 * Ganti dengan artikel asli yayasan. Tautan baca selengkapnya masih
 * mengarah ke section ini sampai halaman artikel tersedia.
 */
export const articles: Article[] = [
  {
    date: '2026-11-10',
    category: 'Kegiatan, Kabar Santri',
    title: 'Munaqasyah Tahfizh Santri Rumah Qur\u2019an',
    author: 'Pengurus',
    excerpt:
      'Santri mengikuti ujian hafalan di hadapan guru dan wali. Kegiatan ini menjadi cara kami menjaga hafalan lama sambil menumbuhkan keberanian santri.',
    image: '/images/galeri-quran-800.jpg',
    imageAlt: 'Anak memegang mushaf dan membaca',
  },
  {
    date: '2026-10-28',
    category: 'Kegiatan, HIC Berbagi',
    title: 'Penyaluran Paket Pendidikan HIC Berbagi',
    author: 'Pengurus',
    excerpt:
      'Paket alat tulis dan bantuan biaya pendidikan disalurkan kepada santri terdata. Penerima diverifikasi pengurus sebelum penyaluran.',
    image: '/images/berbagi-paket-800.jpg',
    imageAlt: 'Paket bantuan HIC Berbagi disiapkan',
  },
  {
    date: '2026-10-14',
    category: 'Artikel, Pembinaan',
    title: 'Menjaga Murajaah di Rumah, Panduan Singkat untuk Wali',
    author: 'Guru Rumah Qur\u2019an',
    excerpt:
      'Hafalan yang dijaga di rumah akan lebih kuat. Berikut cara sederhana mendampingi anak mengulang hafalan tanpa membuatnya tertekan.',
    image: '/images/galeri-kelas-800.jpg',
    imageAlt: 'Kelas tahsin dengan papan tulis',
  },
  {
    date: '2026-09-30',
    category: 'Kegiatan, Kajian Wali',
    title: 'Kajian Wali Santri, Membaca Perkembangan Anak Bersama',
    author: 'Pengurus',
    excerpt:
      'Wali santri berkumpul di ruang utama untuk mendengar perkembangan bacaan dan hafalan anak, lalu berdiskusi langsung dengan guru.',
    image: '/images/galeri-taklim-01-800.jpg',
    imageAlt: 'Taklim ba\u2019da maghrib di ruang utama',
  },
];

export interface Achievement {
  title: string;
  category: string;
  detail: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
}

/**
 * PLACEHOLDER: foto dan capaian contoh untuk Galeri Santri dan Guru
 * Berprestasi (sumber foto contoh: Pinterest). Ganti dengan poster dan
 * data prestasi asli santri dan guru sebelum publikasi.
 */
export const achievements: Achievement[] = [
  {
    title: 'Lulus Munaqasyah Tahfizh Juz 30',
    category: 'Santri Berprestasi',
    detail: 'Selamat dan sukses atas kelulusan ujian hafalan Juz 30.',
    image: '/images/prestasi-santri-1.jpg',
    imageAlt: 'Santri memeluk mushaf sambil tersenyum (foto placeholder)',
    width: 800,
    height: 859,
  },
  {
    title: 'Tahsin Terbaik Semester Ini',
    category: 'Santri Berprestasi',
    detail: 'Bacaan paling lancar dan rapi pada evaluasi tahsin semester ini.',
    image: '/images/prestasi-santri-2.jpg',
    imageAlt: 'Santriwati memegang mushaf di dekat jendela (foto placeholder)',
    width: 686,
    height: 1220,
  },
  {
    title: 'Hafalan Terbanyak Satu Semester',
    category: 'Santri Berprestasi',
    detail: 'Capaian hafalan terbanyak yang terjaga lewat murajaah rutin.',
    image: '/images/prestasi-santri-3.jpg',
    imageAlt: 'Santri memegang mushaf dengan latar masjid (foto placeholder)',
    width: 600,
    height: 600,
  },
  {
    title: 'Guru Pembimbing Berprestasi',
    category: 'Guru Berprestasi',
    detail: 'Apresiasi untuk guru pembimbing halaqah dengan pendampingan terbaik.',
    image: '/images/prestasi-guru-1.jpg',
    imageAlt: 'Guru pembimbing Rumah Qur\u2019an (foto placeholder)',
    width: 832,
    height: 1248,
  },
];

export const faq = [
  {
    q: 'Siapa yang bisa mendaftar PSB?',
    a: 'Anak usia sekolah yang ingin belajar Al-Qur\u2019an.',
  },
  {
    q: 'Apakah ada biaya pendaftaran?',
    a: 'Biaya disampaikan pengurus saat verifikasi.',
  },
  {
    q: 'Bagaimana alur pendaftaran?',
    a: 'Formulir, verifikasi, lalu wawancara.',
  },
  {
    q: 'Ke mana donasi disalurkan?',
    a: 'Paket pendidikan dan santunan santri terdata.',
  },
];

export const psb = {
  title: 'Penerimaan Santri Baru',
  intro:
    'Isi formulir dalam empat langkah. Data dikirim ke admin lewat WhatsApp untuk diverifikasi.',
  steps: ['Data santri', 'Data wali', 'Pilihan program', 'Tinjau dan kirim'],
  levels: ['Iqra', 'Tahsin', 'Tahfizh'],
  schedules: ['Pagi', 'Sore'],
  relations: ['Ayah', 'Ibu', 'Wali'],
};

export const donation = {
  programs: [
    { id: 'rumah-quran', label: 'Rumah Qur\u2019an', note: 'Kitab, alat belajar, dan pembinaan.' },
    { id: 'hic-berbagi', label: 'HIC Berbagi', note: 'Paket pendidikan dan santunan harian.' },
    { id: 'operasional', label: 'Operasional', note: 'Kegiatan dan kebutuhan sekretariat.' },
  ],
  amounts: [50000, 100000, 250000, 500000],
  methods: [
    { id: 'transfer', label: 'Transfer bank', note: 'Instruksi rekening dikirim admin.' },
    { id: 'qris', label: 'QRIS', note: 'Kode pembayaran dikirim admin.' },
    { id: 'tunai', label: 'Tunai', note: 'Serahkan di sekretariat.' },
  ],
};
