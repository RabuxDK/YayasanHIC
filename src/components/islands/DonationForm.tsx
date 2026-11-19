import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

const STORAGE_KEY = 'hic-donasi-draft-v1';

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

type Frequency = 'sekali' | 'bulanan';

interface ProgramOption {
  id: string;
  label: string;
  note: string;
}

interface MethodOption {
  id: string;
  label: string;
  note: string;
}

interface Draft {
  program: string;
  frequency: Frequency;
  amount: number;
  custom: string;
  name: string;
  wa: string;
  email: string;
  anonymous: boolean;
  method: string;
  note: string;
}

interface Props {
  waNumber: string;
  programs: ProgramOption[];
  amounts: number[];
  methods: MethodOption[];
}

type Errors = Partial<Record<'amount' | 'name' | 'wa' | 'program' | 'method', string>>;

const digits = (value: string) => value.replace(/\D/g, '');

const STEPS = ['Program', 'Nominal', 'Data donatur', 'Konfirmasi'];

export function DonationForm({ waNumber, programs, amounts, methods }: Props) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>({
    program: programs[0]?.id ?? '',
    frequency: 'sekali',
    amount: amounts[1] ?? amounts[0] ?? 0,
    custom: '',
    name: '',
    wa: '',
    email: '',
    anonymous: false,
    method: methods[0]?.id ?? '',
    note: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);
  const [sent, setSent] = useState<{ id: string; href: string } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const nominal = Number(digits(params.get('nominal') ?? ''));
      const program = params.get('program') ?? '';
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as Partial<Draft>) : {};
      setDraft((current) => ({
        ...current,
        ...parsed,
        program: programs.some((item) => item.id === program) ? program : parsed.program ?? current.program,
        amount: nominal > 0 ? nominal : parsed.amount ?? current.amount,
        custom: nominal > 0 ? String(nominal) : parsed.custom ?? current.custom,
      }));
    } catch {
      /* penyimpanan lokal tidak tersedia */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      /* penyimpanan lokal tidak tersedia */
    }
  }, [draft, ready]);

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key as keyof Errors]: undefined }));
  };

  const value = draft.custom ? Number(digits(draft.custom)) : draft.amount;
  const programLabel = programs.find((item) => item.id === draft.program)?.label ?? 'HIC Berbagi';
  const methodLabel = methods.find((item) => item.id === draft.method)?.label ?? 'Transfer bank';

  const validate = (index: number): Errors => {
    const next: Errors = {};
    if (index === 0 && !draft.program) next.program = 'Pilih program donasi.';
    if (index === 1 && value < 1000) next.amount = 'Isi nominal minimal Rp1.000.';
    if (index === 2) {
      if (!draft.anonymous && draft.name.trim().length < 2) next.name = 'Tulis nama donatur.';
      const phone = digits(draft.wa);
      if (phone.length < 9 || phone.length > 15) next.wa = 'Nomor WhatsApp belum benar.';
      if (!draft.method) next.method = 'Pilih metode pembayaran.';
    }
    return next;
  };

  const focusFirstError = (next: Errors) => {
    const first = Object.keys(next)[0];
    if (!first) return;
    const field = cardRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    field?.focus();
  };

  const goNext = () => {
    const next = validate(step);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      focusFirstError(next);
      return;
    }
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  };

  const buildHref = (code: string) => {
    const lines = [
      `Konfirmasi donasi ${code}`,
      '',
      `Program: ${programLabel}`,
      `Frekuensi: ${draft.frequency}`,
      `Nominal: ${rupiah.format(value)}`,
      `Metode: ${methodLabel}`,
      `Donatur: ${draft.anonymous ? 'Anonim' : draft.name}`,
      `WhatsApp: ${draft.wa}`,
      draft.email ? `Email: ${draft.email}` : '',
      draft.note ? `Catatan: ${draft.note}` : '',
    ];
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(2);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      focusFirstError(next);
      return;
    }
    const now = new Date();
    const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const id = `DON-${stamp}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const href = buildHref(id);
    window.open(href, '_blank', 'noopener,noreferrer');
    setSent({ id, href });
  };

  return (
    <div className="form-card" ref={cardRef}>
      <ol className="stepper">
        {STEPS.map((label, index) => (
          <li key={label} data-state={index === step ? 'current' : index < step ? 'done' : 'todo'}>
            <span className="step-num">{index + 1}</span>
            <span>{label}</span>
          </li>
        ))}
      </ol>

      <form onSubmit={submit} noValidate>
        {step === 0 && (
          <fieldset className="fieldset">
            <legend>Pilih program</legend>
            <div className="field">
              <span className="field-label" id="program-label">
                Program donasi
              </span>
              <div className="choice-row" role="radiogroup" aria-labelledby="program-label" aria-describedby={errors.program ? 'program-error' : undefined}>
                {programs.map((item) => (
                  <label className="choice" key={item.id}>
                    <input
                      type="radio"
                      name="program"
                      value={item.id}
                      checked={draft.program === item.id}
                      onChange={() => update('program', item.id)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
              {errors.program && (
                <span className="field-error" id="program-error">
                  {errors.program}
                </span>
              )}
            </div>

            <div className="field">
              <span className="field-label" id="frekuensi-label">
                Frekuensi
              </span>
              <div className="choice-row" role="radiogroup" aria-labelledby="frekuensi-label">
                {(['sekali', 'bulanan'] as Frequency[]).map((option) => (
                  <label className="choice" key={option}>
                    <input
                      type="radio"
                      name="frequency"
                      value={option}
                      checked={draft.frequency === option}
                      onChange={() => update('frequency', option)}
                    />
                    <span>{option === 'sekali' ? 'Sekali' : 'Bulanan'}</span>
                  </label>
                ))}
              </div>
            </div>

            <p className="field-hint">
              {programs.find((item) => item.id === draft.program)?.note ?? 'Donasi disalurkan lewat pengurus.'}
            </p>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="fieldset">
            <legend>Nominal donasi</legend>
            <div className="amount-row" role="group" aria-label="Pilihan nominal">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className="amount-btn"
                  aria-pressed={!draft.custom && draft.amount === amount}
                  onClick={() => {
                    update('amount', amount);
                    update('custom', '');
                  }}
                >
                  {rupiah.format(amount)}
                </button>
              ))}
            </div>

            <div className="field">
              <label htmlFor="custom">Nominal lain (rupiah)</label>
              <input
                id="custom"
                name="amount"
                className="input"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Contoh: 150000"
                value={draft.custom}
                onChange={(event) => update('custom', event.target.value.replace(/[^\d]/g, ''))}
                aria-invalid={Boolean(errors.amount)}
                aria-describedby={errors.amount ? 'amount-error' : undefined}
              />
              {errors.amount && (
                <span className="field-error" id="amount-error">
                  {errors.amount}
                </span>
              )}
            </div>

            <p className="field-hint">
              {value >= 1000
                ? `Donasi ${rupiah.format(value)}${draft.frequency === 'bulanan' ? ' setiap bulan' : ''} untuk ${programLabel}.`
                : 'Masukkan nominal donasi.'}
            </p>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="fieldset">
            <legend>Data donatur</legend>
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">Nama</label>
                <input
                  id="name"
                  name="name"
                  className="input"
                  value={draft.name}
                  onChange={(event) => update('name', event.target.value)}
                  autoComplete="name"
                  disabled={draft.anonymous}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <span className="field-error" id="name-error">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="field">
                <label htmlFor="wa">Nomor WhatsApp</label>
                <input
                  id="wa"
                  name="wa"
                  className="input"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="08xx xxxx xxxx"
                  value={draft.wa}
                  onChange={(event) => update('wa', event.target.value)}
                  aria-invalid={Boolean(errors.wa)}
                  aria-describedby={errors.wa ? 'wa-error' : undefined}
                />
                {errors.wa && (
                  <span className="field-error" id="wa-error">
                    {errors.wa}
                  </span>
                )}
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Email (opsional)</label>
              <input
                id="email"
                name="email"
                className="input"
                type="email"
                autoComplete="email"
                value={draft.email}
                onChange={(event) => update('email', event.target.value)}
              />
            </div>

            <label className="check">
              <input
                type="checkbox"
                checked={draft.anonymous}
                onChange={(event) => update('anonymous', event.target.checked)}
              />
              <span>Tampilkan sebagai donatur anonim.</span>
            </label>

            <div className="field">
              <span className="field-label" id="metode-label">
                Metode pembayaran
              </span>
              <div className="choice-row" role="radiogroup" aria-labelledby="metode-label" aria-describedby={errors.method ? 'method-error' : undefined}>
                {methods.map((item) => (
                  <label className="choice" key={item.id}>
                    <input
                      type="radio"
                      name="method"
                      value={item.id}
                      checked={draft.method === item.id}
                      onChange={() => update('method', item.id)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
              {errors.method && (
                <span className="field-error" id="method-error">
                  {errors.method}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="note">Pesan atau doa (opsional)</label>
              <textarea
                id="note"
                name="note"
                className="input"
                value={draft.note}
                onChange={(event) => update('note', event.target.value)}
              />
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="fieldset">
            <legend>Konfirmasi donasi</legend>
            <dl className="summary">
              <div className="summary-row">
                <dt>Program</dt>
                <dd>{programLabel}</dd>
              </div>
              <div className="summary-row">
                <dt>Frekuensi</dt>
                <dd>{draft.frequency === 'bulanan' ? 'Bulanan' : 'Sekali'}</dd>
              </div>
              <div className="summary-row">
                <dt>Metode</dt>
                <dd>{methodLabel}</dd>
              </div>
              <div className="summary-row">
                <dt>Donatur</dt>
                <dd>{draft.anonymous ? 'Anonim' : draft.name}</dd>
              </div>
              <div className="summary-row">
                <dt>WhatsApp</dt>
                <dd>{draft.wa}</dd>
              </div>
              <div className="summary-row summary-total">
                <dt>Nominal</dt>
                <dd>
                  {rupiah.format(value)}
                  {draft.frequency === 'bulanan' ? ' / bulan' : ''}
                </dd>
              </div>
            </dl>

            <p className="field-hint">
              Instruksi pembayaran dikirim admin lewat WhatsApp setelah konfirmasi diterima.
            </p>

            {sent && (
              <p className="form-status" data-tone="ok" role="status">
                Konfirmasi {sent.id} siap dikirim. WhatsApp terbuka di tab baru.
              </p>
            )}
          </fieldset>
        )}

        <div className="form-actions">
          {step > 0 ? (
            <button type="button" className="btn btn-quiet" onClick={goBack}>
              Kembali
            </button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <button type="button" className="btn btn-solid" onClick={goNext}>
              Lanjut
            </button>
          ) : (
            <button type="submit" className="btn btn-solid">
              {sent ? 'Kirim ulang' : 'Kirim konfirmasi'}
            </button>
          )}
        </div>

        {sent && (
          <p className="quick-note">
            <a className="text-link" href={sent.href} target="_blank" rel="noopener noreferrer">
              Buka WhatsApp lagi
            </a>
          </p>
        )}
      </form>
    </div>
  );
}
