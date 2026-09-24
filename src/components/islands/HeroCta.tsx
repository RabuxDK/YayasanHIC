/**
 * Folder: src/components/islands/
 * Description: Hero CTA action buttons with WhatsApp integration and anchor scrolling.
 * This file: HeroCta.tsx
 */

import { MessageSquare, ArrowDown } from 'lucide-react';
import { buildWhatsAppUrl } from '../../services/cms';

interface HeroCtaProps {
  primaryText?: string;
  primaryLink?: string;
  whatsapp?: string;
  siteName?: string;
}

export function HeroCta({
  primaryText = 'Pesan Sekarang',
  primaryLink = '#produk',
  whatsapp,
  siteName = 'Tim Layanan',
}: HeroCtaProps) {
  const waUrl = whatsapp
    ? buildWhatsAppUrl(whatsapp, `Halo ${siteName}, saya tertarik untuk memesan produk Anda.`)
    : undefined;

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
      {/* Primary Action Button */}
      <a
        href={primaryLink}
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-emerald-500/20 focus-visible:ring-2 focus-visible:ring-emerald-300 min-h-[44px]"
      >
        <span>{primaryText}</span>
        <ArrowDown className="w-4 h-4" />
      </a>

      {/* Secondary WhatsApp Direct Action */}
      {waUrl && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-emerald-500 min-h-[44px]"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Konsultasi WhatsApp</span>
        </a>
      )}
    </div>
  );
}
