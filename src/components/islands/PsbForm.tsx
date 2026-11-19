import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

const STORAGE_KEY = 'hic-psb-draft-v1';

type Gender = '' | 'Laki-laki' | 'Perempuan';

interface Draft {
  nama: string;
  panggilan: string;
  gender: Gender;
  lahir: string;
  sekolah: string;
  kelas: string;
  waliNama: string;
  hubungan: string;
  wa: string;
  email: string;
  alamat: string;
  jenjang: string;
  jadwal: string;
  catatan: string;
  setuju: boolean;
}

const EMPTY: Draft = {
  nama: '',
  panggilan: '',
  gender: '',
  lahir: '',
  sekolah: '',
  kelas: '',
  waliNama: '',
  hubungan: '',
  wa: '',
  email: '',
  alamat: '',
  jenjang: '',
  jadwal: '',
  catatan: '',
  setuju: false,
};

interface Props {
  waNumber: string;
  steps: string[];
  levels: string[];
  schedules: string[];
  relations: string[];
}

type Errors = Partial<Record<keyof Draft, string>>;

const digits = (value: string) => value.replace(/\D/g, '');

function formatDate(value: string) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
}

export function PsbForm({ waNumber, steps, levels, schedules, relations }: Props) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);
  const [restored, setRestored] = useState(false);
  const [sent, setSent] = useState<{ id: string; href: string } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...EMPTY, ...(JSON.parse(raw) as Partial<Draft>) };
        setDraft(parsed);
        setRestored(Object.values(parsed).some((value) => value !== '' && value !== false));
      }
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
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = (index: number): Errors => {
    const next: Errors = {};
    if (index === 0) {
      if (draft.nama.trim().length < 3) next.nama = 'Tulis nama lengkap santri.';
      if (!draft.gender) next.gender = 'Pilih jenis kelamin.';
      if (!draft.lahir) next.lahir = 'Isi tanggal lahir.';
    }
    if (index === 1) {
      if (draft.waliNama.trim().length < 3) next.waliNama = 'Tulis nama wali.';
      if (!draft.hubungan) next.hubungan = 'Pilih hubungan dengan santri.';
      const phone = digits(draft.wa);
      if (phone.length < 9 || phone.length > 15) next.wa = 'Nomor WhatsApp belum benar.';
      if (draft.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) next.email = 'Format email belum benar.';
      if (draft.alamat.trim().length < 8) next.alamat = 'Tulis alamat lengkap.';
    }
    if (index === 2) {
      if (!draft.jenjang) next.jenjang = 'Pilih jenjang.';
      if (!draft.jadwal) next.jadwal = 'Pilih jadwal halaqah.';
    }
    if (index === 3 && !draft.setuju) next.setuju = 'Centang persetujuan sebelum mengirim.';
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
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  };

  const buildHref = (registration: string) => {
    const lines = [
      `Pendaftaran santri baru ${registration}`,
      '',
      `Nama: ${draft.nama}`,
      draft.panggilan ? `Panggilan: ${draft.panggilan}` : '',
      `Jenis kelamin: ${draft.gender}`,
      `Tanggal lahir: ${formatDate(draft.lahir)}`,
      draft.sekolah ? `Asal sekolah: ${draft.sekolah}` : '',
      draft.kelas ? `Kelas: ${draft.kelas}` : '',
      '',
      `Wali: ${draft.waliNama} (${draft.hubungan})`,
      `WhatsApp: ${draft.wa}`,
      draft.email ? `Email: ${draft.email}` : '',
      `Alamat: ${draft.alamat}`,
      '',
      `Jenjang: ${draft.jenjang}`,
      `Jadwal: ${draft.jadwal}`,
      draft.catatan ? `Catatan: ${draft.catatan}` : '',
    ];
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(3);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      focusFirstError(next);
      return;
    }
    const now = new Date();
    const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const tail = String(Math.floor(Math.random() * 9000) + 1000);
    const id = `PSB-${stamp}-${tail}`;
    const href = buildHref(id);
    window.open(href, '_blank', 'noopener,noreferrer');
    setSent({ id, href });
  };

  const fieldError = (key: keyof Draft) =>
    errors[key] ? (
      <span className="field-error" id={`${key}-error`}>
        {errors[key]}
      </span>
    ) : null;

  const describedBy = (key: keyof Draft) => (errors[key] ? `${key}-error` : undefined);

  return (
    <div className="form-card" ref={cardRef}>
      <ol className="stepper">
        {steps.map((label, index) => (
          <li key={label} data-state={index === step ? 'current' : index < step ? 'done' : 'todo'}>
            <span className="step-num">{index + 1}</span>
            <span>{label}</span>
          </li>
        ))}
      </ol>

      {restored && (
        <p className="form-status" data-tone="note">
          Draf sebelumnya dimuat dari perangkat ini.
        </p>
      )}

      <form onSubmit={submit} noValidate>
        {step === 0 && (
          <fieldset className="fieldset">
            <legend>Data santri</legend>
            <div className="field">
              <label htmlFor="nama">Nama lengkap</label>
              <input
                id="nama"
                name="nama"
                className="input"
                value={draft.nama}
                onChange={(event) => update('nama', event.target.value)}
                autoComplete="name"
                aria-invalid={Boolean(errors.nama)}
                aria-describedby={describedBy('nama')}
              />
              {fieldError('nama')}
            </div>
            <div className="field">
              <label htmlFor="panggilan">Nama panggilan</label>
              <input
                id="panggilan"
                name="panggilan"
                className="input"
                value={draft.panggilan}
                onChange={(event) => update('panggilan', event.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="field">
              <span className="field-label" id="gender-label">
                Jenis kelamin
              </span>
              <div className="choice-row" role="radiogroup" aria-labelledby="gender-label" aria-describedby={describedBy('gender')}>
                {(['Laki-laki', 'Perempuan'] as Gender[]).map((option) => (
                  <label className="choice" key={option}>
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={draft.gender === option}
                      onChange={() => update('gender', option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {fieldError('gender')}
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="lahir">Tanggal lahir</label>
                <input
                  id="lahir"
                  name="lahir"
                  type="date"
                  className="input"
                  value={draft.lahir}
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={(event) => update('lahir', event.target.value)}
                  aria-invalid={Boolean(errors.lahir)}
                  aria-describedby={describedBy('lahir')}
                />
                {fieldError('lahir')}
              </div>
              <div className="field">
                <label htmlFor="kelas">Kelas</label>
                <input
                  id="kelas"
                  name="kelas"
                  className="input"
                  value={draft.kelas}
                  onChange={(event) => update('kelas', event.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="sekolah">Asal sekolah</label>
              <input
                id="sekolah"
                name="sekolah"
                className="input"
                value={draft.sekolah}
                onChange={(event) => update('sekolah', event.target.value)}
                autoComplete="off"
              />
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="fieldset">
            <legend>Data wali</legend>
            <div className="field">
              <label htmlFor="waliNama">Nama wali</label>
              <input
                id="waliNama"
                name="waliNama"
                className="input"
                value={draft.waliNama}
                onChange={(event) => update('waliNama', event.target.value)}
                autoComplete="name"
                aria-invalid={Boolean(errors.waliNama)}
                aria-describedby={describedBy('waliNama')}
              />
              {fieldError('waliNama')}
            </div>
            <div className="field">
              <span className="field-label" id="hubungan-label">
                Hubungan dengan santri
              </span>
              <div className="choice-row" role="radiogroup" aria-labelledby="hubungan-label" aria-describedby={describedBy('hubungan')}>
                {relations.map((option) => (
                  <label className="choice" key={option}>
                    <input
                      type="radio"
                      name="hubungan"
                      value={option}
                      checked={draft.hubungan === option}
                      onChange={() => update('hubungan', option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {fieldError('hubungan')}
            </div>
            <div className="field-row">
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
                  aria-describedby={describedBy('wa')}
                />
                {fieldError('wa')}
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
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describedBy('email')}
                />
                {fieldError('email')}
              </div>
            </div>
            <div className="field">
              <label htmlFor="alamat">Alamat</label>
              <textarea
                id="alamat"
                name="alamat"
                className="input"
                value={draft.alamat}
                onChange={(event) => update('alamat', event.target.value)}
                autoComplete="street-address"
                aria-invalid={Boolean(errors.alamat)}
                aria-describedby={describedBy('alamat')}
              />
              {fieldError('alamat')}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="fieldset">
            <legend>Pilihan program</legend>
            <div className="field">
              <span className="field-label" id="jenjang-label">
                Jenjang
              </span>
              <div className="choice-row" role="radiogroup" aria-labelledby="jenjang-label" aria-describedby={describedBy('jenjang')}>
                {levels.map((option) => (
                  <label className="choice" key={option}>
                    <input
                      type="radio"
                      name="jenjang"
                      value={option}
                      checked={draft.jenjang === option}
                      onChange={() => update('jenjang', option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {fieldError('jenjang')}
            </div>
            <div className="field">
              <span className="field-label" id="jadwal-label">
                Jadwal halaqah
              </span>
              <div className="choice-row" role="radiogroup" aria-labelledby="jadwal-label" aria-describedby={describedBy('jadwal')}>
                {schedules.map((option) => (
                  <label className="choice" key={option}>
                    <input
                      type="radio"
                      name="jadwal"
                      value={option}
                      checked={draft.jadwal === option}
                      onChange={() => update('jadwal', option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {fieldError('jadwal')}
            </div>
            <div className="field">
              <label htmlFor="catatan">Catatan untuk pengurus (opsional)</label>
              <textarea
                id="catatan"
                name="catatan"
                className="input"
                value={draft.catatan}
                onChange={(event) => update('catatan', event.target.value)}
              />
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="fieldset">
            <legend>Tinjau dan kirim</legend>
            <dl className="summary">
              <div className="summary-row">
                <dt>Nama santri</dt>
                <dd>{draft.nama}</dd>
              </div>
              <div className="summary-row">
                <dt>Tanggal lahir</dt>
                <dd>{formatDate(draft.lahir)}</dd>
              </div>
              <div className="summary-row">
                <dt>Wali</dt>
                <dd>
                  {draft.waliNama} ({draft.hubungan})
                </dd>
              </div>
              <div className="summary-row">
                <dt>WhatsApp</dt>
                <dd>{draft.wa}</dd>
              </div>
              <div className="summary-row">
                <dt>Jenjang</dt>
                <dd>{draft.jenjang}</dd>
              </div>
              <div className="summary-row">
                <dt>Jadwal</dt>
                <dd>{draft.jadwal}</dd>
              </div>
            </dl>

            <label className="check">
              <input
                type="checkbox"
                name="setuju"
                checked={draft.setuju}
                onChange={(event) => update('setuju', event.target.checked)}
                aria-invalid={Boolean(errors.setuju)}
                aria-describedby={describedBy('setuju')}
              />
              <span>Data yang saya isi benar dan boleh digunakan untuk proses penerimaan.</span>
            </label>
            {fieldError('setuju')}

            {sent && (
              <p className="form-status" data-tone="ok" role="status">
                Formulir {sent.id} siap dikirim. WhatsApp terbuka di tab baru. Pendaftaran tercatat
                setelah admin membalas.
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
          {step < steps.length - 1 ? (
            <button type="button" className="btn btn-solid" onClick={goNext}>
              Lanjut
            </button>
          ) : (
            <button type="submit" className="btn btn-solid">
              {sent ? 'Kirim ulang' : 'Kirim lewat WhatsApp'}
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
