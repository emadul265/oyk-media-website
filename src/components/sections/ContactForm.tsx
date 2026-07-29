import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const PARTNERSHIP_TYPES = [
  'Talent Investment',
  'Media Company Investment',
  'Brand Partnership',
  'Event Coverage',
  'Podcast Partnership',
  'Magazine Partnership',
  'Sponsorship',
  'Press Inquiry',
  'General Opportunity',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMPTY = {
  name: '',
  company: '',
  email: '',
  website: '',
  partnership_type: '',
  description: '',
};

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="mb-3 block text-[0.6rem] font-medium uppercase tracking-[0.24em] text-white/35 transition-colors duration-300 group-focus-within:text-gold"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');

    const payload = {
      name: form.name.trim(),
      company: form.company.trim() || null,
      email: form.email.trim(),
      website: form.website.trim() || null,
      partnership_type: form.partnership_type,
      description: form.description.trim(),
    };

    const { error } = await supabase
      .from('contact_submissions')
      .insert(payload);

    if (error) {
      setStatus('error');
      setErrorMsg(
        'Something went wrong while sending your opportunity. Please try again.'
      );
      return;
    }

    setStatus('success');
    setForm(EMPTY);
  };

  const inputClass =
    'w-full border-b border-white/12 bg-transparent py-3.5 text-sm font-light text-white placeholder-white/25 transition-all duration-300 focus:border-gold focus:outline-none';
  const selectClass = `${inputClass} appearance-none cursor-pointer ${
    form.partnership_type ? 'text-white' : 'text-white/25'
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-10" noValidate>
      <div className="grid gap-10 sm:grid-cols-2">
        <Field id="name" label="Name">
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={update('name')}
            className={inputClass}
            placeholder="Your full name"
          />
        </Field>
        <Field id="company" label="Company or Brand">
          <input
            id="company"
            type="text"
            value={form.company}
            onChange={update('company')}
            className={inputClass}
            placeholder="Company or brand name"
          />
        </Field>
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        <Field id="email" label="Email">
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={update('email')}
            className={inputClass}
            placeholder="you@company.com"
          />
        </Field>
        <Field id="website" label="Website or Social Profile">
          <input
            id="website"
            type="url"
            value={form.website}
            onChange={update('website')}
            className={inputClass}
            placeholder="https://"
          />
        </Field>
      </div>

      <Field id="partnership_type" label="Partnership Type">
        <div className="relative">
          <select
            id="partnership_type"
            required
            value={form.partnership_type}
            onChange={update('partnership_type')}
            className={selectClass}
          >
            <option value="" disabled>
              Select a partnership type
            </option>
            {PARTNERSHIP_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-white/30">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path
                d="M1 1l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </Field>

      <Field id="description" label="Brief Opportunity Description">
        <textarea
          id="description"
          required
          rows={4}
          value={form.description}
          onChange={update('description')}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about the opportunity — what it is, where it stands, and where you want it to go."
        />
      </Field>

      {/* Submit */}
      <div className="pt-3">
        <motion.button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden bg-gold px-8 py-4.5 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-ink-900 transition-colors duration-500 hover:bg-gold-200 disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto sm:min-w-[22rem]"
        >
          {status === 'loading' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
              Sending
            </>
          )}
          {status === 'success' && (
            <>
              <Check className="h-4 w-4" strokeWidth={2} />
              Opportunity Received
            </>
          )}
          {(status === 'idle' || status === 'error') && (
            <>
              Submit Opportunity
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                strokeWidth={1.5}
              />
            </>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 text-sm text-red-300/80"
          >
            <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            {errorMsg}
          </motion.div>
        )}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-l border-gold/40 pl-4 text-sm font-light leading-relaxed text-gold"
          >
            Thank you. Our team will review your opportunity and be in touch
            shortly.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
