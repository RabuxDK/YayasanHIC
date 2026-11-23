import { useEffect, useId, useRef, useState } from 'react';

export type GalleryCategory =
  | 'Pembinaan Al-Qur\u2019an'
  | 'Kajian & Sahabat HIC'
  | 'Prestasi';

export type FilterOption = 'Semua' | GalleryCategory;

export interface ShowcaseItem {
  id: string;
  src: string;
  highResSrc: string;
  srcset?: string;
  alt: string;
  title: string;
  category: GalleryCategory;
  sublabel: string;
  detail: string;
  width: number;
  height: number;
  isPlaceholder?: boolean;
  orientation?: 'landscape' | 'portrait' | 'square';
}

interface Props {
  items: ShowcaseItem[];
}

const CATEGORIES: FilterOption[] = [
  'Semua',
  'Pembinaan Al-Qur\u2019an',
  'Kajian & Sahabat HIC',
  'Prestasi',
];

export function GalleryShowcase({ items }: Props) {
  const [activeCategory, setActiveCategory] = useState<FilterOption>('Semua');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);

  const titleId = useId();
  const descId = useId();

  const filtered =
    activeCategory === 'Semua'
      ? items
      : items.filter((item) => item.category === activeCategory);

  const activeItem =
    activeIndex !== null && activeIndex >= 0 && activeIndex < filtered.length
      ? filtered[activeIndex]
      : null;

  const openLightbox = (index: number, button: HTMLButtonElement) => {
    triggerRef.current = button;
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const goPrev = () => {
    setActiveIndex((current) => {
      if (current === null || filtered.length === 0) return null;
      return (current - 1 + filtered.length) % filtered.length;
    });
  };

  const goNext = () => {
    setActiveIndex((current) => {
      if (current === null || filtered.length === 0) return null;
      return (current + 1) % filtered.length;
    });
  };

  const handleCategoryChange = (category: FilterOption) => {
    setActiveIndex(null);
    setActiveCategory(category);
  };

  useEffect(() => {
    if (activeIndex !== null) {
      const openingNow = !wasOpenRef.current;
      wasOpenRef.current = true;
      document.body.style.overflow = 'hidden';

      if (openingNow) {
        closeBtnRef.current?.focus();
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          setActiveIndex(null);
          return;
        }
        if (event.key === 'ArrowLeft' && filtered.length > 1) {
          event.preventDefault();
          setActiveIndex((current) =>
            current === null ? null : (current - 1 + filtered.length) % filtered.length,
          );
          return;
        }
        if (event.key === 'ArrowRight' && filtered.length > 1) {
          event.preventDefault();
          setActiveIndex((current) =>
            current === null ? null : (current + 1) % filtered.length,
          );
          return;
        }
        if (event.key === 'Tab' && dialogRef.current) {
          const focusables = Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
              'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
            ),
          );
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          const activeEl = document.activeElement as HTMLElement | null;

          if (event.shiftKey) {
            if (activeEl === first || !dialogRef.current.contains(activeEl)) {
              event.preventDefault();
              last.focus();
            }
          } else if (activeEl === last || !dialogRef.current.contains(activeEl)) {
            event.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      triggerRef.current?.focus();
    }
    return undefined;
  }, [activeIndex, filtered.length]);

  return (
    <div className="galeri-showcase">
      <div className="galeri-toolbar">
        <div className="galeri-filters" role="group" aria-label="Filter kategori galeri">
          {CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                className="galeri-pill"
                aria-pressed={isSelected}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p className="galeri-status" aria-live="polite" role="status">
          Menampilkan {filtered.length} dari {items.length} foto, kategori {activeCategory}.
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="galeri-empty" role="status">
          <h3>Belum ada dokumentasi pada kategori ini</h3>
          <p>Pilih kategori lain atau tampilkan seluruh dokumentasi kegiatan Yayasan HIC.</p>
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => handleCategoryChange('Semua')}
          >
            Tampilkan semua foto
          </button>
        </div>
      ) : (
        <div className="galeri-grid" data-count={filtered.length}>
          {filtered.map((item, idx) => {
            const isLead = idx === 0;
            const showDetail =
              isLead ||
              (filtered.length === 12 && idx === 7) ||
              (filtered.length === 3 && idx === 2) ||
              (filtered.length === 4 && idx === 3);

            return (
              <figure
                key={item.id}
                className={`galeri-item${isLead ? ' galeri-item--lead' : ''}`}
              >
                <button
                  type="button"
                  className="galeri-trigger"
                  data-orientation={item.orientation ?? 'landscape'}
                  aria-label={`Perbesar foto ${item.title}, kategori ${item.sublabel}`}
                  onClick={(event) => openLightbox(idx, event.currentTarget)}
                >
                  <img
                    src={item.src}
                    srcSet={item.srcset}
                    sizes={
                      isLead
                        ? '(max-width: 60rem) 100vw, 52vw'
                        : '(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 33vw'
                    }
                    width={item.width}
                    height={item.height}
                    alt={item.alt}
                    loading={idx < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <span className="galeri-zoom-cue" aria-hidden="true">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M12.5 3.5h4v4M7.5 16.5h-4v-4M16.5 3.5l-4.5 4.5M3.5 16.5l4.5-4.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <figcaption className="galeri-caption">
                  <h3 className="galeri-item-title">{item.title}</h3>
                  <p className="galeri-item-sub">{item.sublabel}</p>
                  {showDetail && <p className="galeri-item-detail">{item.detail}</p>}
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}

      {activeItem && activeIndex !== null && (
        <div
          className="galeri-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div className="galeri-lightbox-panel" ref={dialogRef}>
            <div className="galeri-lightbox-bar">
              <p className="galeri-lightbox-count" aria-live="polite">
                {activeIndex + 1} dari {filtered.length}
              </p>
              <button
                ref={closeBtnRef}
                type="button"
                className="galeri-lightbox-close"
                aria-label="Tutup pratinjau foto"
                onClick={closeLightbox}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M5 5l10 10M15 5 5 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Tutup</span>
              </button>
            </div>

            <div className="galeri-lightbox-stage">
              <img
                src={activeItem.highResSrc}
                width={activeItem.width}
                height={activeItem.height}
                alt={activeItem.alt}
                decoding="async"
              />
            </div>

            <div className="galeri-lightbox-foot">
              <div className="galeri-lightbox-meta">
                <h3 id={titleId} className="galeri-lightbox-title">
                  {activeItem.title}
                </h3>
                <p className="galeri-lightbox-cat">{activeItem.sublabel}</p>
                <p id={descId} className="galeri-lightbox-desc">
                  {activeItem.detail}
                </p>
              </div>

              <div className="galeri-lightbox-nav" role="group" aria-label="Navigasi foto">
                <button
                  type="button"
                  className="galeri-lightbox-btn"
                  aria-label="Foto sebelumnya"
                  disabled={filtered.length <= 1}
                  onClick={goPrev}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M12.5 4.5 7 10l5.5 5.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Sebelumnya</span>
                </button>

                <button
                  type="button"
                  className="galeri-lightbox-btn"
                  aria-label="Foto berikutnya"
                  disabled={filtered.length <= 1}
                  onClick={goNext}
                >
                  <span>Berikutnya</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M7.5 4.5 13 10l-5.5 5.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
