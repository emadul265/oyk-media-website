import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { EASE_LUXURY } from '@/lib/motion';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'What We Back', href: '#what-we-back' },
  { label: 'Partnerships', href: '#partnerships' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Mail, label: 'Email', href: '#contact' },
];

function scrollTo(href: string) {
  const lenis = (
    window as unknown as { __lenis?: { scrollTo: (t: string | HTMLElement, o?: object) => void } }
  ).__lenis;
  if (lenis) lenis.scrollTo(href, { offset: -10, duration: 1.4 });
  else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer className="grain relative bg-ink-950 px-6 pb-10 pt-24 lg:px-10 lg:pt-32">
      <div className="mx-auto max-w-editorial">
        {/* Oversized wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, ease: EASE_LUXURY }}
          className="overflow-hidden"
        >
          <p className="display-1 select-none text-balance text-center text-[18vw] font-light leading-[0.85] text-white/[0.04] lg:text-[14rem]">
            OYK Media
          </p>
        </motion.div>

        <div className="gold-line mb-20 mt-10" aria-hidden />

        <div className="grid gap-14 md:grid-cols-12">
          {/* Logo + tagline */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden>
                <rect width="32" height="32" rx="7" className="fill-ink-800" />
                <path
                  d="M9 9v14M16 9v14M23 9v14"
                  className="stroke-gold"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="display-3 text-xl tracking-wide text-white">
                OYK <span className="gold-text">Media</span>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm font-light leading-[1.8] text-white/40">
              A media investment and partnership company building the next
              generation of cultural brands.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="eyebrow mb-7">Navigate</p>
            <ul className="space-y-4">
              {NAV.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="group inline-flex items-center gap-2.5 text-sm font-light text-white/55 transition-colors duration-300 hover:text-gold"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-5" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <p className="eyebrow mb-7">Connect</p>
            <div className="flex flex-col gap-4">
              {SOCIAL.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="group inline-flex items-center gap-3 text-sm font-light text-white/55 transition-colors duration-300 hover:text-gold"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:border-gold/60 group-hover:bg-gold/10">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    {s.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Final line */}
        <div className="mt-20 flex flex-col items-center justify-between gap-8 border-t border-white/[0.06] pt-10 md:flex-row">
          <p className="display-3 text-center text-2xl font-light text-white/85 md:text-left md:text-3xl">
            OYK Media.{' '}
            <span className="italic gold-text">Capital behind culture.</span>
          </p>
          <button
            onClick={() => scrollTo('#top')}
            className="group inline-flex items-center gap-3 text-[0.66rem] font-light tracking-[0.24em] uppercase text-white/40 transition-colors duration-300 hover:text-gold"
          >
            Back to top
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:border-gold/60 group-hover:bg-gold/10">
              <ArrowUp
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </span>
          </button>
        </div>

        <p className="mt-10 text-center text-[0.68rem] font-light tracking-wide text-white/20">
          © {new Date().getFullYear()} OYK Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
