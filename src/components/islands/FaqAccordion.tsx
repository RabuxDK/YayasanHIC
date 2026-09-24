/**
 * Folder: src/components/islands/
 * Description: Keyboard accessible FAQ accordion island with ARIA semantics.
 * This file: FaqAccordion.tsx
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { CmsFaqItem } from '../../types';

interface FaqAccordionProps {
  items: CmsFaqItem[];
}

export function FaqAccordion({ items = [] }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `faq-btn-${idx}`;
        const panelId = `faq-panel-${idx}`;

        return (
          <div
            key={idx}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors"
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-slate-100 hover:text-emerald-400 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none min-h-[44px]"
            >
              <span className="pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-emerald-400' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
