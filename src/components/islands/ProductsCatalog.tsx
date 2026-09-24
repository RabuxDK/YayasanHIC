/**
 * Folder: src/components/islands/
 * Description: Interactive product catalog island with category filter, empty state, and WhatsApp ordering.
 * This file: ProductsCatalog.tsx
 */

import { useState, useMemo } from 'react';
import { ShoppingBag, MessageSquare, Tag } from 'lucide-react';
import type { CmsProduct } from '../../types';
import { formatCurrency, buildWhatsAppUrl } from '../../services/cms';

interface ProductsCatalogProps {
  products: CmsProduct[];
  whatsapp?: string;
  siteName?: string;
}

export function ProductsCatalog({ products = [], whatsapp, siteName = 'Tim Layanan' }: ProductsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Category Filter Pills (Antislop R-03, min-h 44px) */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors min-h-[44px] cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
          >
            Semua Produk ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors min-h-[44px] cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Empty State (Antislop R-27) */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-white">Tidak Ada Produk</h4>
          <p className="text-xs text-slate-400">
            Belum ada produk untuk kategori yang dipilih saat ini.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className="text-xs text-emerald-400 hover:underline pt-2 font-medium"
          >
            Kembali ke Semua Produk
          </button>
        </div>
      ) : (
        /* Product Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const orderMessage = `Halo ${siteName}, saya ingin memesan "${product.name}" seharga ${formatCurrency(product.price)}.`;
            const orderUrl = whatsapp ? buildWhatsAppUrl(whatsapp, orderMessage) : '#kontak';

            return (
              <div
                key={product.id}
                className="group rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Product Thumbnail */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-800">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <ShoppingBag className="w-12 h-12" />
                      </div>
                    )}

                    {product.category && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-xs text-[10px] font-semibold text-emerald-400 border border-slate-800 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        <span>{product.category}</span>
                      </span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-5 space-y-2">
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    {product.description && (
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="p-5 pt-0">
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        Harga
                      </span>
                      <span className="text-base font-bold text-white">
                        {formatCurrency(product.price)}
                      </span>
                    </div>

                    <a
                      href={orderUrl}
                      target={whatsapp ? '_blank' : '_self'}
                      rel={whatsapp ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors min-h-[44px]"
                      aria-label={`Pesan ${product.name} via WhatsApp`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Pesan</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
