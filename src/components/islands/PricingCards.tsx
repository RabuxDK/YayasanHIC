/**
 * Folder: src/components/islands/
 * Description: Interactive pricing plans island with WhatsApp order triggers.
 * This file: PricingCards.tsx
 */

import { Check, MessageSquare } from 'lucide-react';
import type { CmsPricingPlan } from '../../types';
import { buildWhatsAppUrl } from '../../services/cms';

interface PricingCardsProps {
  plans: CmsPricingPlan[];
  whatsapp?: string;
  siteName?: string;
}

export function PricingCards({ plans = [], whatsapp, siteName = 'Tim Layanan' }: PricingCardsProps) {
  if (!plans || plans.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {plans.map((plan, idx) => {
        const waMessage = `Halo ${siteName}, saya ingin berlangganan ${plan.name} (${plan.price}${plan.period || ''}).`;
        const orderUrl = whatsapp ? buildWhatsAppUrl(whatsapp, waMessage) : '#kontak';

        return (
          <div
            key={idx}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
              plan.isPopular
                ? 'border-2 border-emerald-500 bg-slate-900/90 shadow-xl shadow-emerald-500/10'
                : 'border border-slate-800 bg-slate-900/50 hover:border-slate-700'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider shadow-sm">
                Paling Diminati
              </div>
            )}

            <div>
              <h4 className="text-xl font-bold text-white">{plan.name}</h4>
              {plan.description && (
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {plan.description}
                </p>
              )}

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-xs sm:text-sm text-slate-400 font-medium">
                    {plan.period}
                  </span>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Fasilitas & Layanan:
                </p>
                <ul className="space-y-2.5">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <a
                href={orderUrl}
                target={whatsapp ? '_blank' : '_self'}
                rel={whatsapp ? 'noopener noreferrer' : undefined}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors min-h-[44px] ${
                  plan.isPopular
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                    : 'border border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>{plan.ctaText || 'Pesan Paket Ini'}</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
