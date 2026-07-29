import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollState } from '@/hooks/useScrollState';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'What We Back', href: '#what-we-back' },
  { label: 'Partnerships', href: '#partnerships' },
  { label: 'Contact', href: '#contact' },
];

function scrollTo(href: string) {
  const lenis = (
    window as unknown as { __lenis?: { scrollTo: (t: string | HTMLElement, o?: object) => void } }
  ).__lenis;
  if (lenis) lenis.scrollTo(href, { offset: -10, duration: 1.4 });
  else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar() {
  const { scrolled } = useScrollState(70);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollTo(href), open ? 300 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-700 ease-luxury ${
            scrolled
              ? 'border-b border-white/[0.06] bg-ink/80 py-0 backdrop-blur-2xl'
              : 'border-b border-transparent bg-transparent py-1'
          }`}
        >
          <nav className="mx-auto flex max-w-editorial items-center justify-between px-6 py-4 lg:px-10">
            {/* Logo */}
            <button
              onClick={() => handleNav('#top')}
              className="group flex items-center gap-3"
              aria-label="OYK Media home"
            >
              <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden>
                <rect
                  width="32"
                  height="32"
                  rx="7"
                  className="fill-ink-800 transition-colors duration-500 group-hover:fill-ink-700"
                />
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
            </button>

            {/* Center links */}
            <ul className="hidden items-center gap-12 lg:flex">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="group relative text-[0.78rem] font-body font-light tracking-[0.2em] uppercase text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 ease-luxury group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden lg:block">
              <button
                onClick={() => handleNav('#contact')}
                className="group relative overflow-hidden border border-gold/30 px-6 py-3 text-[0.66rem] font-body font-medium tracking-[0.24em] uppercase text-gold transition-colors duration-500 hover:text-ink-900"
              >
                <span className="relative z-10">Present an Opportunity</span>
                <span className="absolute inset-0 -translate-y-full bg-gold transition-transform duration-500 ease-luxury group-hover:translate-y-0" />
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-white lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="block"
                  >
                    <X className="h-6 w-6" strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.3 }}
                    className="block"
                  >
                    <Menu className="h-6 w-6" strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-ink-950 lg:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-2 px-8">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="eyebrow mb-8 text-white/30"
              >
                Menu
              </motion.p>
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.08,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => handleNav(link.href)}
                  className="display-2 py-2 text-4xl text-white/80 transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                onClick={() => handleNav('#contact')}
                className="mt-8 bg-gold px-10 py-4 text-[0.7rem] font-medium tracking-[0.24em] uppercase text-ink-900"
              >
                Present an Opportunity
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
