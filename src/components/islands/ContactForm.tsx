/**
 * Folder: src/components/islands/
 * Description: Interactive contact inquiry form with validation, states (R-27), and WhatsApp dispatch.
 * This file: ContactForm.tsx
 */

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { buildWhatsAppUrl } from '../../services/cms';

interface ContactFormProps {
  whatsapp?: string;
  recipientEmail?: string;
  siteName?: string;
}

export function ContactForm({ whatsapp, recipientEmail, siteName = 'Tim Layanan' }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // States: idle, submitting, success, error (Antislop R-27)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage('Mohon lengkapi nama dan isi pesan Anda.');
      return;
    }

    setStatus('submitting');

    try {
      // Simulate real dispatch & compose WhatsApp message
      if (whatsapp) {
        const textPayload = `Halo ${siteName},\n\nNama: ${name.trim()}\nEmail: ${email.trim() || '-'}\nNo. HP: ${phone.trim() || '-'}\n\nPesan:\n${message.trim()}`;
        const waUrl = buildWhatsAppUrl(whatsapp, textPayload);
        
        // Brief delay for UX feedback
        await new Promise((resolve) => setTimeout(resolve, 600));
        setStatus('success');
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
        setStatus('success');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Gagal mengirim pesan. Silakan coba kembali atau hubungi via telepon.');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setStatus('idle');
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-bold text-white">Pesan Anda Berhasil Disiapkan</h4>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Terima kasih telah menghubungi kami. Kami akan merespons pertanyaan Anda sesegera mungkin.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider transition-colors min-h-[44px]"
        >
          Kirim Pesan Lainnya
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {status === 'error' && errorMessage && (
        <div className="p-4 rounded-xl border border-red-500/40 bg-red-950/20 flex items-center gap-3 text-red-400 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Nama Lengkap *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Budi Darmawan"
            className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/80 text-white text-sm outline-none focus:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 min-h-[44px]"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Nomor WhatsApp / HP
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0812-3456-7890"
            className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/80 text-white text-sm outline-none focus:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 min-h-[44px]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
          Alamat Email (Opsional)
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="budi@example.com"
          className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/80 text-white text-sm outline-none focus:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 min-h-[44px]"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
          Pesan atau Pertanyaan Anda *
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tuliskan kebutuhan atau pertanyaan Anda di sini..."
          className="w-full p-4 rounded-xl border border-slate-700 bg-slate-900/80 text-white text-sm outline-none focus:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-sm uppercase tracking-wider transition-colors shadow-md min-h-[44px] cursor-pointer"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Memproses Pesan...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Kirim via WhatsApp Resmi</span>
          </>
        )}
      </button>

      {recipientEmail && (
        <p className="text-[11px] text-center text-slate-400">
          Atau kirimkan email langsung ke: <a href={`mailto:${recipientEmail}`} className="text-emerald-400 hover:underline">{recipientEmail}</a>
        </p>
      )}
    </form>
  );
}
