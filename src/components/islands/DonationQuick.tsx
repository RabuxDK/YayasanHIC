import { useState } from 'react';

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

interface Props {
  amounts: number[];
}

export function DonationQuick({ amounts }: Props) {
  const [selected, setSelected] = useState<number | null>(amounts[1] ?? amounts[0] ?? null);
  const [custom, setCustom] = useState('');

  const customValue = Number(custom.replace(/\D/g, ''));
  const value = customValue > 0 ? customValue : selected ?? 0;
  const href = value > 0 ? `/donasi?nominal=${value}` : '/donasi';

  return (
    <div className="quick-panel">
      <p className="quick-label" id="nominal-label">
        Nominal donasi
      </p>
      <div className="amount-row" role="group" aria-labelledby="nominal-label">
        {amounts.map((amount) => (
          <button
            key={amount}
            type="button"
            className="amount-btn"
            aria-pressed={customValue === 0 && selected === amount}
            onClick={() => {
              setSelected(amount);
              setCustom('');
            }}
          >
            {rupiah.format(amount)}
          </button>
        ))}
      </div>

      <div className="quick-row">
        <label className="field">
          <span className="field-label">Nominal lain (rupiah)</span>
          <input
            className="input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Contoh: 150000"
            value={custom}
            onChange={(event) => setCustom(event.target.value.replace(/[^\d]/g, ''))}
          />
        </label>
        <a className="btn btn-solid" href={href}>
          Donasi sekarang
        </a>
      </div>

      <p className="quick-note" aria-live="polite">
        {value > 0
          ? `Donasi ${rupiah.format(value)} untuk HIC Berbagi.`
          : 'Masukkan nominal donasi.'}
      </p>
    </div>
  );
}
