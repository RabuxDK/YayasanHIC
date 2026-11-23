import { useMemo, useRef, useState } from 'react';

export interface ArchiveArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readingTime: number;
  href: string;
  ctaLabel: string;
  image: string | null;
  imageAlt: string;
  tags?: string[];
  isPlaceholder?: boolean;
}

interface Props {
  articles: ArchiveArticle[];
  source: 'cms' | 'offline';
  hasCmsPosts: boolean;
}

function formatDateLabel(raw: string): string {
  if (!raw) return '';
  const iso = raw.includes('T') ? raw : `${raw}T00:00:00`;
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function ArticleArchive({ articles, source, hasCmsPosts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.map((item) => item.category).filter(Boolean)));
    return ['Semua', ...unique];
  }, [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((item) => {
      const categoryOk = selectedCategory === 'Semua' || item.category === selectedCategory;
      if (!categoryOk) return false;
      if (!q) return true;
      const haystack = [item.title, item.excerpt, item.category, item.author, ...(item.tags ?? [])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [articles, selectedCategory, query]);

  const clearQuery = () => {
    setQuery('');
    searchRef.current?.focus();
  };

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('Semua');
    searchRef.current?.focus();
  };

  const statusText =
    source === 'offline'
      ? 'Arsip artikel terhubung ke CMS RabuxID saat build produksi. Saat ini ditampilkan catatan kegiatan awal dari profil resmi yayasan.'
      : 'Belum ada pos yang dipublikasikan dari panel RabuxID. Saat ini ditampilkan catatan kegiatan awal dari profil resmi yayasan.';

  return (
    <div className="archive-shell">
      {!hasCmsPosts && (
        <div className="cms-status-note" role="status">
          <h3 className="cms-status-title">Belum ada pos terpublikasi dari CMS RabuxID</h3>
          <p>{statusText}</p>
        </div>
      )}

      {articles.length === 0 ? (
        <div className="archive-empty">
          <h3>Belum ada artikel tersedia</h3>
          <p>Artikel yang dipublikasikan melalui panel RabuxID akan muncul di halaman ini.</p>
          <a className="btn btn-solid" href="/">
            Kembali ke beranda
          </a>
        </div>
      ) : (
        <>
          <div className="archive-toolbar">
            <div className="archive-search-row">
              <div className="archive-search-field">
                <label className="archive-search-label" htmlFor="arsip-cari">
                  Cari tulisan
                </label>
                <input
                  ref={searchRef}
                  id="arsip-cari"
                  className="archive-search-input"
                  type="text"
                  autoComplete="off"
                  placeholder={'Cari judul, topik, atau penulis\u2026'}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <button
                type="button"
                className="archive-clear"
                onClick={clearQuery}
                disabled={query.length === 0}
              >
                Bersihkan
              </button>
            </div>

            <div className="archive-filter-bar">
              <div className="archive-filters" role="group" aria-label="Filter kategori artikel">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className="filter-pill"
                    aria-pressed={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <p className="archive-count" aria-live="polite">
                {filtered.length === 0
                  ? '0 tulisan ditemukan.'
                  : `Menampilkan ${filtered.length} dari ${articles.length} ${hasCmsPosts ? 'artikel' : 'catatan'}.`}
              </p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="archive-empty" role="status">
              <h3>Tidak ada tulisan yang cocok</h3>
              <p>
                Kata kunci atau kategori yang dipilih belum menemukan tulisan. Atur ulang filter untuk
                melihat seluruh daftar.
              </p>
              <button type="button" className="btn btn-solid" onClick={resetFilters}>
                Reset filter
              </button>
            </div>
          ) : (
            <div className="archive-grid">
              {filtered.map((item, index) => {
                const dateLabel = formatDateLabel(item.date);
                return (
                  <article className="archive-entry" key={item.id}>
                    <a className="archive-entry-media" href={item.href} tabIndex={-1} aria-hidden="true">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          width={800}
                          height={500}
                          loading={index < 2 ? 'eager' : 'lazy'}
                          decoding="async"
                        />
                      ) : (
                        <div className="archive-entry-fallback">{item.title.charAt(0)}</div>
                      )}
                    </a>

                    <div className="archive-entry-body">
                      <h3 className="archive-entry-title">{item.title}</h3>
                      {item.excerpt && <p className="archive-entry-excerpt">{item.excerpt}</p>}

                      <div className="editorial-meta">
                        <span className="editorial-cat">{item.category}</span>
                        {dateLabel && <time dateTime={item.date}>{dateLabel}</time>}
                        {item.author && <span>{item.author}</span>}
                        {item.readingTime > 0 && <span>{item.readingTime} menit baca</span>}
                        {item.isPlaceholder && <span>Catatan awal</span>}
                      </div>

                      <div className="archive-entry-foot">
                        <a
                          className="editorial-action-link"
                          href={item.href}
                          aria-label={`${item.ctaLabel}: ${item.title}`}
                        >
                          <span>{item.ctaLabel}</span>
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
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
