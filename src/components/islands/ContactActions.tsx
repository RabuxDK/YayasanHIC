import { useEffect, useRef, useState } from 'react';

interface Props {
  address: string;
  whatsapp: string;
  waNumber: string;
  phoneHref: string;
}

type CopyState = 'idle' | 'copying' | 'copied' | 'error';

function fallbackCopyText(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '0';
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  } finally {
    document.body.removeChild(textarea);
  }
  return copied;
}

export function ContactActions({ address, whatsapp, waNumber, phoneHref }: Props) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    'Assalamualaikum, saya ingin menghubungi sekretariat Yayasan Hidayatul Ilmi Cendekia.',
  )}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleCopy = async () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    setCopyState('copying');

    let succeeded = false;
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(address);
        succeeded = true;
      } catch {
        succeeded = fallbackCopyText(address);
      }
    } else if (typeof document !== 'undefined') {
      succeeded = fallbackCopyText(address);
    }

    if (succeeded) {
      setCopyState('copied');
      setStatusMessage('Alamat sekretariat disalin ke papan klip.');
      timerRef.current = window.setTimeout(() => {
        setCopyState('idle');
      }, 4500);
    } else {
      setCopyState('error');
      setStatusMessage('Penyalinan otomatis gagal. Salin alamat sekretariat di atas secara manual.');
    }
  };

  return (
    <div className="kontak-actions">
      <div className="kontak-actions-row">
        <a className="btn btn-solid" href={waHref} target="_blank" rel="noopener noreferrer">
          WhatsApp {whatsapp}
        </a>
        <a className="btn btn-quiet" href={phoneHref}>
          Telepon {whatsapp}
        </a>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={handleCopy}
          disabled={copyState === 'copying'}
        >
          {copyState === 'copied' ? 'Alamat disalin' : 'Salin alamat'}
        </button>
        <a className="btn btn-quiet" href={mapsHref} target="_blank" rel="noopener noreferrer">
          Buka di Google Maps
        </a>
      </div>

      <p
        className="kontak-copy-status"
        role="status"
        aria-live="polite"
        data-tone={copyState === 'error' ? 'error' : statusMessage ? 'ok' : 'idle'}
      >
        {statusMessage}
      </p>
    </div>
  );
}
