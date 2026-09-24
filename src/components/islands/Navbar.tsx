/**
 * Folder: src/components/islands/
 * Description: Interactive responsive navigation bar island with keyboard accessibility.
 * This file: Navbar.tsx
 */

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { buildWhatsAppUrl } from '../../services/cms';

interface NavbarProps {
  siteName: string;
  whatsapp?: string;
  phone?: string;
}

export function Navbar({ siteName, whatsapp, phone }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for subtle elevation change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility: Close mobile drawer on Escape key (Antislop R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Tentang Kami', href: '#tentang' },
    { label: 'Keunggulan', href: '#keunggulan' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Katalog Produk', href: '#produk' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Kontak', href: '#kontak' },
  ];

  const waHref = whatsapp
    ? buildWhatsAppUrl(whatsapp, `Halo ${siteName}, saya ingin bertanya tentang produk dan layanan Anda.`)
    : '#kontak';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/90 backdrop-blur-md shadow-md border-b border-slate-800'
          : 'bg-slate-950/80 backdrop-blur-xs border-b border-slate-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand Name */}
          <a
            href="#"
            className="flex items-center gap-2 text-white font-bold text-lg sm:text-xl tracking-tight focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
          >
            <span className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-sm">
              {siteName.charAt(0)}
            </span>
            <span>{siteName}</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-2 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-300 min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hubungi Kami</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button (Min tap target 44px) */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800/60 focus-visible:ring-2 focus-visible:ring-emerald-500 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Antislop R-03) */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 md:hidden flex flex-col justify-between p-6 overflow-y-auto"
        >
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 pb-1">
              Menu Navigasi
            </p>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-800 space-y-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm shadow-md min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat WhatsApp Resmi</span>
            </a>
            {phone && (
              <a
                href={`tel:${phone}`}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-700 text-slate-300 text-sm min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span>Telepon: {phone}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
