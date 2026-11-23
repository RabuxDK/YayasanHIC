import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

export interface MaterialItem {
  title: string;
  short: string;
  text: string;
  image?: string;
  imageSrcset?: string;
  imageAlt?: string;
}

export interface RumahQuranData {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  image: string;
  imageAlt: string;
  goals: string[];
  materials: MaterialItem[];
}

export interface SahabatHicData {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  image: string;
  imageAlt: string;
  background: string[];
  goals: string[];
  activities: string[];
  beneficiaries: string;
}

interface MediaAsset {
  src: string;
  srcset: string;
  width: number;
  height: number;
  alt: string;
}

const MATERIAL_MEDIA: MediaAsset[] = [
  {
    src: '/images/galeri-kelas-800.jpg',
    srcset: '/images/galeri-kelas-800.jpg 800w, /images/galeri-kelas-1400.jpg 1280w',
    width: 1280,
    height: 576,
    alt: 'Suasana kelas pembinaan tahsin Al-Qur\u2019an',
  },
  {
    src: '/images/galeri-quran-800.jpg',
    srcset: '/images/galeri-quran-800.jpg 800w, /images/galeri-quran-1400.jpg 1280w',
    width: 1280,
    height: 853,
    alt: 'Santri membaca mushaf Al-Qur\u2019an untuk setoran hafalan',
  },
  {
    src: '/images/hero-belajar-800.jpg',
    srcset: '/images/hero-belajar-800.jpg 800w, /images/hero-belajar-1400.jpg 1280w',
    width: 1280,
    height: 853,
    alt: 'Pembelajaran keislaman santri bersama guru pembimbing',
  },
  {
    src: '/images/galeri-kajian-800.jpg',
    srcset: '/images/galeri-kajian-800.jpg 800w, /images/galeri-kajian-1400.jpg 1280w',
    width: 1280,
    height: 854,
    alt: 'Kajian dan pembinaan akhlak bersama keluarga santri',
  },
  {
    src: '/images/galeri-malam-800.jpg',
    srcset: '/images/galeri-malam-800.jpg 800w, /images/galeri-malam-1400.jpg 1280w',
    width: 1280,
    height: 914,
    alt: 'Pembiasaan ibadah dan pendampingan santri di Rumah Qur\u2019an',
  },
];

interface Props {
  mode?: 'all' | 'rumah-quran' | 'sahabat';
  rumahQuran: RumahQuranData;
  sahabatHic: SahabatHicData;
  waNumber: string;
}

const padTwo = (n: number) => String(n).padStart(2, '0');

export function ProgramExplorer({
  mode = 'all',
  rumahQuran,
  sahabatHic,
  waNumber,
}: Props) {
  const materials = rumahQuran.materials ?? [];
  const goals = sahabatHic.goals ?? [];
  const activities = sahabatHic.activities ?? [];

  const [activeTab, setActiveTab] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const showRumahQuran = mode === 'all' || mode === 'rumah-quran';
  const showSahabat = mode === 'all' || mode === 'sahabat';

  const selectTab = (index: number, focusTarget = false) => {
    if (materials.length === 0) return;
    const bounded = ((index % materials.length) + materials.length) % materials.length;
    setActiveTab(bounded);
    if (focusTarget) {
      tabRefs.current[bounded]?.focus();
    }
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (materials.length === 0) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      selectTab(index + 1, true);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      selectTab(index - 1, true);
    } else if (event.key === 'Home') {
      event.preventDefault();
      selectTab(0, true);
    } else if (event.key === 'End') {
      event.preventDefault();
      selectTab(materials.length - 1, true);
    }
  };

  const currentActivityText = activities[selectedActivity] ?? '';
  const waMessage = currentActivityText
    ? `Assalamualaikum, saya ingin bertanya atau berpartisipasi pada kegiatan ${sahabatHic.name}: ${currentActivityText}`
    : `Assalamualaikum, saya ingin bertanya tentang program ${sahabatHic.name}.`;
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <>
      {showRumahQuran && (
        <div className="pe-explorer">
          <div className="pe-head">
            <h2 id="kurikulum-title">Materi Pembelajaran</h2>
            <p>
              Lima materi utama pembinaan di {rumahQuran.name}. Pilih salah satu materi untuk melihat
              rincian pembelajaran.
            </p>
          </div>

          {materials.length === 0 ? (
            <p className="pe-empty">Materi pembelajaran belum tersedia saat ini.</p>
          ) : (
            <>
              <div
                className="pe-tablist"
                role="tablist"
                aria-label={`Materi pembelajaran ${rumahQuran.shortName}`}
              >
                {materials.map((item, index) => {
                  const isActive = index === activeTab;
                  return (
                    <button
                      key={item.title}
                      ref={(el) => {
                        tabRefs.current[index] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`rq-tab-${index}`}
                      aria-selected={isActive}
                      aria-controls={`rq-panel-${index}`}
                      tabIndex={isActive ? 0 : -1}
                      className="pe-tab"
                      onClick={() => selectTab(index, false)}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                    >
                      <span className="pe-tab-num" aria-hidden="true">
                        {padTwo(index + 1)}
                      </span>
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pe-panels">
                {materials.map((item, index) => {
                  const isActive = index === activeTab;
                  const media = MATERIAL_MEDIA[index % MATERIAL_MEDIA.length];
                  return (
                    <div
                      key={item.title}
                      role="tabpanel"
                      id={`rq-panel-${index}`}
                      aria-labelledby={`rq-tab-${index}`}
                      hidden={!isActive}
                      tabIndex={0}
                      className="pe-panel"
                    >
                      <div className="pe-panel-copy">
                        <h3>{item.title}</h3>
                        <p className="pe-panel-short">{item.short}</p>
                        <p className="pe-panel-text">{item.text}</p>
                        <div className="pe-panel-foot">
                          <div className="pe-panel-nav">
                            <button
                              type="button"
                              className="pe-pager"
                              onClick={() => selectTab(index - 1, false)}
                              aria-label="Materi sebelumnya"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <path
                                  d="M10 3.5 5.5 8 10 12.5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>Sebelumnya</span>
                            </button>
                            <button
                              type="button"
                              className="pe-pager"
                              onClick={() => selectTab(index + 1, false)}
                              aria-label="Materi berikutnya"
                            >
                              <span>Berikutnya</span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <path
                                  d="M6 3.5 10.5 8 6 12.5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                          <span className="pe-step-count">
                            {padTwo(index + 1)} / {padTwo(materials.length)}
                          </span>
                          <a className="btn btn-quiet" href="/psb">
                            Daftar santri
                          </a>
                        </div>
                      </div>

                      <figure className="pe-panel-media">
                        <img
                          src={item.image || media.src}
                          srcSet={item.image ? item.imageSrcset : media.srcset}
                          sizes="(max-width: 60rem) 100vw, 42vw"
                          width={media.width}
                          height={media.height}
                          alt={item.imageAlt || media.alt}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                        />
                      </figure>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {showSahabat && (
        <div className="sh-explorer">
          <div className="pg-goals-grid">
            <div className="pg-goals-aside">
              <h2 id="sh-tujuan-title">Tujuan Program Sahabat HIC</h2>
              <p>
                Menebarkan solidaritas sosial dan menyalurkan amanah donatur secara tepat sasaran.
              </p>
              <figure className="pg-aside-photo">
                <img
                  src="/images/berbagi-paket-1400.jpg"
                  srcSet="/images/berbagi-paket-800.jpg 800w, /images/berbagi-paket-1400.jpg 1280w"
                  sizes="(max-width: 60rem) 100vw, 38vw"
                  width={1280}
                  height={960}
                  alt="Penyaluran bantuan Sahabat Hidayatul Ilmi Cendekia"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>

            {goals.length === 0 ? (
              <p className="pe-empty">Tujuan program belum tersedia saat ini.</p>
            ) : (
              <ol className="pg-num-list">
                {goals.map((goal) => (
                  <li key={goal}>
                    <p>{goal}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="pg-subblock sh-activity-grid" id="sh-kegiatan">
            <div className="sh-action-aside">
              <h3>Bentuk Kegiatan</h3>
              <p>
                {sahabatHic.tagline}. Penyaluran santunan dan bantuan bagi anak yatim serta dhuafa.
              </p>

              <div className="sh-live-box" aria-live="polite">
                <span className="sh-live-title">Fokus pilihan dukungan</span>
                <p className="sh-live-selected">
                  {currentActivityText || 'Belum ada kegiatan yang dipilih.'}
                </p>
                <div className="sh-live-actions">
                  <a className="btn btn-solid" href="/donasi?program=sahabat-hic">
                    Salurkan donasi
                  </a>
                  <a
                    className="btn btn-quiet"
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tanya WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {activities.length === 0 ? (
              <p className="pe-empty">Daftar bentuk kegiatan belum tersedia saat ini.</p>
            ) : (
              <ol className="sh-activity-list">
                {activities.map((activity, index) => {
                  const isSelected = index === selectedActivity;
                  return (
                    <li
                      key={activity}
                      className="sh-activity-row"
                      data-active={isSelected ? 'true' : undefined}
                    >
                      <p>{activity}</p>
                      <button
                        type="button"
                        className="pe-pick"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedActivity(index)}
                      >
                        {isSelected ? 'Dipilih' : 'Pilih'}
                      </button>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </div>
      )}
    </>
  );
}
