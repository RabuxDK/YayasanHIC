/**
 * Satu sumber data resmi untuk situs Yayasan Hidayatul Ilmi Cendekia.
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

export interface ProgramSummary {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  image: string;
  imageAlt: string;
  points: { title: string; text: string }[];
  meta: string;
  action: NavItem;
  secondary: NavItem;
}

export interface Article {
  date: string;
  category: string;
  title: string;
  author: string;
  excerpt: string;
  href: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
}

export interface Achievement {
  title: string;
  category: string;
  detail: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
}

export const site = {
  name: 'Yayasan Hidayatul Ilmi Cendekia',
  short: 'HIC',
  url: 'https://yayasanhic.rabux.id',
  motto: 'Beriman, Berilmu, dan Beramal',
  description:
    'Yayasan Hidayatul Ilmi Cendekia: lembaga sosial dan pendidikan Al-Qur\u2019an melalui Rumah Qur\u2019an HIC dan Sahabat Hidayatul Ilmi Cendekia di Gunung Putri, Bogor.',
  contact: {
    address:
      'Griya Bukit Jaya Blok C8 No.16 RT02 RW024 Desa Tlajung Udik, Kec. Gunung Putri, Kab. Bogor.',
    addressShort: 'Gunung Putri, Kab. Bogor',
    whatsapp: '0812 9048 0320',
    waNumber: '6281290480320',
    phoneHref: 'tel:+6281290480320',
  },
  nav: [
    { label: 'Tentang', href: '/tentang' },
    { label: 'Program', href: '/program' },
    { label: 'Artikel', href: '/artikel' },
    { label: 'Galeri', href: '/galeri' },
    { label: 'Donasi', href: '/donasi' },
    { label: 'Kontak', href: '/kontak' },
  ] as NavItem[],
};

export const profile = {
  paragraphs: [
    'Yayasan Hidayatul Ilmi Cendekia merupakan lembaga sosial dan pendidikan yang hadir sebagai bentuk kepedulian terhadap peningkatan kualitas pendidikan, pembinaan keislaman, serta kesejahteraan masyarakat.',
    'Yayasan Hidayatul Ilmi Cendekia berkomitmen untuk mengambil bagian dalam membangun generasi yang beriman, berilmu, berakhlakul karimah, dan memiliki kepedulian sosial melalui berbagai kegiatan pendidikan Al-Qur\u2019an dan program sosial kemasyarakatan.',
    'Dalam pelaksanaannya, yayasan mengembangkan program-program yang berorientasi pada pembentukan karakter Islami, peningkatan kemampuan membaca dan memahami Al-Qur\u2019an, serta menumbuhkan semangat berbagi dan kepedulian terhadap anak yatim dan kaum dhuafa.',
    'Dengan semangat Beriman, Berilmu, dan Beramal, Yayasan Hidayatul Ilmi Cendekia berupaya menjadi wadah kebaikan yang memberikan manfaat berkelanjutan bagi umat dan masyarakat.',
  ],
  vision:
    'Terwujudnya Generasi Qur\u2019ani yang Beriman, Berilmu, Berakhlakul Karimah, dan Beramal Saleh.',
  missions: [
    'Menanamkan nilai-nilai keimanan dan ketakwaan kepada Allah SWT dalam kehidupan sehari-hari.',
    'Menyelenggarakan pendidikan dan pembelajaran Al-Qur\u2019an yang berkualitas, meliputi tahsin, tahfidz, pemahaman, dan pengamalan Al-Qur\u2019an.',
    'Membentuk generasi yang memiliki akhlakul karimah, adab Islami, kedisiplinan, kemandirian, dan tanggung jawab.',
    'Mendorong pengembangan ilmu pengetahuan serta penerapan nilai-nilai Islam dalam kehidupan.',
    'Menumbuhkan semangat beribadah dan beramal saleh melalui pembiasaan kegiatan positif.',
    'Menyelenggarakan kegiatan sosial dan kemanusiaan sebagai bentuk kepedulian terhadap anak yatim, dhuafa, dan masyarakat yang membutuhkan.',
    'Membangun kerja sama dengan orang tua, masyarakat, dan berbagai pihak dalam mewujudkan pendidikan serta kesejahteraan umat.',
  ],
  pillars: [
    {
      title: 'Beriman',
      text: 'Menanamkan nilai keimanan dan ketakwaan kepada Allah SWT dalam keseharian.',
    },
    {
      title: 'Berilmu',
      text: 'Membina bacaan, hafalan, pemahaman Al-Qur\u2019an, serta ilmu pengetahuan Islami.',
    },
    {
      title: 'Beramal',
      text: 'Menumbuhkan kepedulian sosial terhadap anak yatim, kaum dhuafa, dan sesama.',
    },
  ],
};

export const programsIntro =
  'Yayasan Hidayatul Ilmi Cendekia memiliki dua program utama yang saling melengkapi, yaitu program pendidikan keislaman dan program sosial kemanusiaan.';

export const rumahQuran = {
  slug: 'rumah-quran',
  name: 'Rumah Qur\u2019an Hidayatul Ilmi Cendekia',
  shortName: 'Rumah Qur\u2019an HIC',
  tagline: 'Pendidikan dan pembinaan generasi Qur\u2019ani',
  summary:
    'Program pendidikan dan pembinaan generasi Qur\u2019ani yang berfokus pada kemampuan membaca, menghafal, memahami, serta mengamalkan nilai-nilai Al-Qur\u2019an dalam kehidupan sehari-hari.',
  image: '/images/program-quran-640.png',
  imageAlt: 'Logo program Rumah Qur\u2019an Hidayatul Ilmi Cendekia',
  goals: [
    'Membentuk generasi yang mencintai Al-Qur\u2019an.',
    'Membimbing santri agar mampu membaca Al-Qur\u2019an sesuai kaidah tajwid.',
    'Menanamkan kebiasaan beribadah dan berakhlak Islami.',
    'Mengembangkan potensi santri dalam bidang keagamaan.',
    'Membentuk pribadi yang mandiri, disiplin, dan bertanggung jawab.',
  ],
  materials: [
    {
      title: 'Tahsin Al-Qur\u2019an',
      short: 'Makharijul huruf dan kaidah tajwid.',
      text: 'Pembelajaran membaca Al-Qur\u2019an dengan baik dan benar sesuai makharijul huruf serta kaidah tajwid.',
    },
    {
      title: 'Tahfidz Al-Qur\u2019an',
      short: 'Hafalan surah secara bertahap.',
      text: 'Program menghafal surah-surah Al-Qur\u2019an secara bertahap sesuai kemampuan dan perkembangan santri.',
    },
    {
      title: 'Asmaul Husna',
      short: 'Mengenal, menghafal, dan memahami maknanya.',
      text: 'Mengenal, menghafal, dan memahami nama-nama Allah SWT beserta maknanya.',
    },
    {
      title: 'Hadits Pendek Pilihan',
      short: 'Pedoman perilaku dan akhlak Islami.',
      text: 'Mempelajari hadits-hadits pilihan sebagai pedoman dalam membentuk perilaku dan akhlak Islami.',
    },
    {
      title: 'Praktik Shalat',
      short: 'Gerakan, bacaan, dan pembiasaan shalat.',
      text: 'Pembelajaran tata cara shalat yang benar, mulai dari gerakan, bacaan, hingga pembiasaan pelaksanaannya.',
    },
  ],
};

export const sahabatHic = {
  slug: 'sahabat-hic',
  name: 'Sahabat Hidayatul Ilmi Cendekia',
  shortName: 'Sahabat HIC',
  tagline: 'Berbagi Kebaikan, Meraih Keberkahan',
  summary:
    'Program sosial dan kemanusiaan yang berfokus pada pemberian santunan serta bantuan kepada anak yatim dan kaum dhuafa.',
  image: '/images/program-berbagi-640.png',
  imageAlt: 'Logo program Sahabat Hidayatul Ilmi Cendekia',
  background: [
    'Kepedulian terhadap sesama merupakan salah satu bentuk pengamalan nilai-nilai keimanan dan ajaran Islam. Masih terdapat saudara-saudara kita, khususnya anak yatim dan keluarga dhuafa, yang membutuhkan perhatian, dukungan, serta bantuan untuk memenuhi kebutuhan hidup mereka.',
    'Berangkat dari kepedulian tersebut, Yayasan Hidayatul Ilmi Cendekia menghadirkan program Sahabat Hidayatul Ilmi Cendekia sebagai wadah untuk mengajak masyarakat, donatur, dan para dermawan bersama-sama menebarkan kebaikan melalui kegiatan santunan dan bantuan sosial.',
  ],
  goals: [
    'Membantu meringankan beban kehidupan anak yatim dan keluarga dhuafa.',
    'Memberikan perhatian dan kepedulian terhadap mereka yang membutuhkan.',
    'Menumbuhkan semangat berbagi, empati, dan solidaritas sosial di tengah masyarakat.',
    'Mengajak masyarakat untuk menjadikan sedekah sebagai bagian dari kebiasaan hidup.',
    'Menyalurkan amanah donatur secara bertanggung jawab dan tepat sasaran.',
  ],
  activities: [
    'Santunan anak yatim.',
    'Bantuan sosial bagi keluarga dhuafa.',
    'Penyaluran paket kebutuhan pokok.',
    'Bantuan pendidikan bagi anak-anak yang membutuhkan.',
    'Kegiatan berbagi pada momentum hari besar Islam dan kesempatan sosial lainnya.',
  ],
  beneficiaries:
    'Anak yatim, keluarga dhuafa, serta masyarakat yang berada dalam kondisi membutuhkan bantuan dan perhatian sosial.',
};

export const programs: ProgramSummary[] = [
  {
    slug: rumahQuran.slug,
    name: rumahQuran.name,
    tagline: rumahQuran.tagline,
    summary: 'Membaca, menghafal, memahami, dan mengamalkan Al-Qur\u2019an dalam keseharian.',
    image: rumahQuran.image,
    imageAlt: rumahQuran.imageAlt,
    points: [
      { title: 'Tahsin & Tahfidz Al-Qur\u2019an', text: 'Tajwid dan hafalan surah bertahap.' },
      { title: 'Asmaul Husna & Hadits Pilihan', text: 'Pedoman akhlak Islami.' },
      { title: 'Praktik Shalat', text: 'Gerakan, bacaan, dan pembiasaan.' },
    ],
    meta: 'Membina generasi cinta Al-Qur\u2019an.',
    action: { label: 'Daftar santri', href: '/psb' },
    secondary: { label: 'Detail program', href: '/program#rumah-quran' },
  },
  {
    slug: sahabatHic.slug,
    name: sahabatHic.name,
    tagline: sahabatHic.tagline,
    summary: 'Santunan dan bantuan sosial bagi anak yatim serta kaum dhuafa.',
    image: sahabatHic.image,
    imageAlt: sahabatHic.imageAlt,
    points: [
      { title: 'Santunan anak yatim', text: 'Perhatian dan dukungan langsung.' },
      { title: 'Keluarga dhuafa', text: 'Bantuan sosial dan paket pokok.' },
      { title: 'Bantuan pendidikan', text: 'Dukungan anak membutuhkan.' },
    ],
    meta: 'Amanah disalurkan tepat sasaran.',
    action: { label: 'Salurkan donasi', href: '/donasi' },
    secondary: { label: 'Detail program', href: '/program#sahabat-hic' },
  },
];

export const synergy = [
  'Pendampingan bacaan, hafalan, dan adab santri bersama orang tua.',
  'Penyaluran amanah donatur bagi yatim dan dhuafa secara tepat.',
  'Komunikasi langsung bersama sekretariat Gunung Putri, Bogor.',
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
    alt: 'Penyaluran bantuan program Sahabat Hidayatul Ilmi Cendekia',
    caption: 'Penyaluran Sahabat HIC',
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
    'Assalamu\u2019alaikum warahmatullahi wabarakatuh. Selamat datang di situs resmi Yayasan Hidayatul Ilmi Cendekia.',
    'Melalui Rumah Qur\u2019an dan Sahabat HIC, kami berikhtiar menghadirkan pendidikan Al-Qur\u2019an dan kepedulian sosial dengan semangat Beriman, Berilmu, dan Beramal.',
  ],
};

/**
 * PLACEHOLDER: artikel contoh untuk carousel kabar terbaru di beranda.
 * Ganti dengan artikel asli yayasan.
 */
export const articles: Article[] = [
  {
    date: '2026-11-10',
    category: 'Rumah Qur\u2019an',
    title: 'Munaqasyah Juz 30',
    author: 'Pengurus',
    excerpt: 'Ujian hafalan bertahap bersama pengajar.',
    href: '/program#rumah-quran',
    ctaLabel: 'Rumah Qur\u2019an',
    image: '/images/galeri-quran-800.jpg',
    imageAlt: 'Santri membaca Al-Qur\u2019an saat evaluasi hafalan',
  },
  {
    date: '2026-10-28',
    category: 'Sahabat HIC',
    title: 'Penyaluran Santunan',
    author: 'Pengurus',
    excerpt: 'Santunan anak yatim dan paket pokok.',
    href: '/program#sahabat-hic',
    ctaLabel: 'Sahabat HIC',
    image: '/images/berbagi-paket-800.jpg',
    imageAlt: 'Penyaluran paket bantuan program Sahabat Hidayatul Ilmi Cendekia',
  },
  {
    date: '2026-10-14',
    category: 'Pembinaan',
    title: 'Pembiasaan Tartil',
    author: 'Pengajar',
    excerpt: 'Membiasakan tahsin dan adab santri.',
    href: '/program#rumah-quran',
    ctaLabel: 'Materi belajar',
    image: '/images/galeri-kelas-800.jpg',
    imageAlt: 'Kelas tahsin Al-Qur\u2019an bersama pengajar',
  },
  {
    date: '2026-09-30',
    category: 'Kemitraan',
    title: 'Sinergi Wali Santri',
    author: 'Pengurus',
    excerpt: 'Kerja sama untuk pendidikan umat.',
    href: '/tentang#misi',
    ctaLabel: 'Visi misi',
    image: '/images/galeri-taklim-01-800.jpg',
    imageAlt: 'Taklim dan sinergi bersama wali santri di ruang utama',
  },
];

/**
 * PLACEHOLDER: foto dan capaian contoh untuk Galeri Santri dan Guru
 * Berprestasi. Ganti dengan poster dan data prestasi asli sebelum publikasi.
 */
export const achievements: Achievement[] = [
  {
    title: 'Lulus Munaqasyah Tahfidz Juz 30',
    category: 'Santri Berprestasi',
    detail: 'Kelulusan evaluasi hafalan Juz 30.',
    image: '/images/prestasi-santri-1.jpg',
    imageAlt: 'Santri memeluk mushaf sambil tersenyum (foto placeholder)',
    width: 800,
    height: 859,
  },
  {
    title: 'Tahsin Terbaik Semester Ini',
    category: 'Santri Berprestasi',
    detail: 'Bacaan lancar sesuai kaidah tajwid.',
    image: '/images/prestasi-santri-2.jpg',
    imageAlt: 'Santriwati memegang mushaf di dekat jendela (foto placeholder)',
    width: 686,
    height: 1220,
  },
  {
    title: 'Hafalan Terbanyak Satu Semester',
    category: 'Santri Berprestasi',
    detail: 'Capaian hafalan bertahap yang konsisten.',
    image: '/images/prestasi-santri-3.jpg',
    imageAlt: 'Santri memegang mushaf dengan latar masjid (foto placeholder)',
    width: 600,
    height: 600,
  },
  {
    title: 'Guru Pembimbing Berprestasi',
    category: 'Guru Berprestasi',
    detail: 'Pendampingan sabar dan telaten bagi santri.',
    image: '/images/prestasi-guru-1.jpg',
    imageAlt: 'Guru pembimbing Rumah Qur\u2019an (foto placeholder)',
    width: 832,
    height: 1248,
  },
];

export const faq = [
  {
    q: 'Apa saja materi di Rumah Qur\u2019an HIC?',
    a: 'Santri mempelajari Tahsin Al-Qur\u2019an, Tahfidz Al-Qur\u2019an, Asmaul Husna, Hadits Pendek Pilihan, dan Praktik Shalat.',
  },
  {
    q: 'Siapa penerima manfaat Sahabat HIC?',
    a: 'Anak yatim, keluarga dhuafa, serta masyarakat yang berada dalam kondisi membutuhkan bantuan dan perhatian sosial.',
  },
  {
    q: 'Bagaimana cara mendaftar santri baru?',
    a: 'Isi formulir di halaman Penerimaan Santri Baru, lalu kirim ringkasan pendaftaran ke WhatsApp sekretariat 0812 9048 0320.',
  },
  {
    q: 'Di mana alamat sekretariat Yayasan HIC?',
    a: 'Griya Bukit Jaya Blok C8 No.16 RT02 RW024 Desa Tlajung Udik, Kec. Gunung Putri, Kab. Bogor.',
  },
];

export const psb = {
  title: 'Penerimaan Santri Baru',
  intro:
    'Isi formulir pendaftaran Rumah Qur\u2019an Hidayatul Ilmi Cendekia dalam empat langkah. Data diteruskan ke sekretariat lewat WhatsApp.',
  steps: ['Data santri', 'Data wali', 'Pilihan program', 'Tinjau dan kirim'],
  levels: ['Iqra', 'Tahsin', 'Tahfidz'],
  schedules: ['Pagi', 'Sore', 'Menyesuaikan'],
  relations: ['Ayah', 'Ibu', 'Wali'],
};

export const donation = {
  programs: [
    {
      id: 'sahabat-hic',
      label: 'Sahabat HIC',
      note: 'Santunan anak yatim, keluarga dhuafa, paket pokok, dan pendidikan.',
    },
    {
      id: 'rumah-quran',
      label: 'Rumah Qur\u2019an HIC',
      note: 'Pembinaan tahsin, tahfidz, dan materi belajar santri.',
    },
    {
      id: 'operasional',
      label: 'Operasional Yayasan',
      note: 'Dukungan kegiatan pendidikan dan sosial yayasan.',
    },
  ],
  amounts: [50000, 100000, 250000, 500000],
  methods: [
    { id: 'transfer', label: 'Transfer bank', note: 'Instruksi rekening disampaikan pengurus lewat WhatsApp.' },
    { id: 'qris', label: 'QRIS', note: 'Kode pembayaran disampaikan pengurus lewat WhatsApp.' },
    { id: 'tunai', label: 'Tunai', note: 'Diserahkan langsung di sekretariat Gunung Putri, Bogor.' },
  ],
};
