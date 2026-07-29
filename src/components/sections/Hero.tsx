import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { EASE_LUXURY } from '@/lib/motion';

const ROTATING = [
  'Talent needs more than exposure.',
  'Great media deserves serious backing.',
  'Influence is valuable. Ownership is better.',
  'We build beyond the moment.',
  'Culture moves fast. We build what lasts.',
];

// Cinematic crossfade sequence — each communicates a facet of "what moves culture."
const SLIDES = [
  { src: IMAGES.hero, alt: 'New York City skyline at night', ken: 'scale-105' },
  { src: IMAGES.heroPortrait, alt: 'Figure in a red gown at an elegant event', ken: 'scale-110' },
  { src: IMAGES.capabilitiesTall, alt: 'Editorial portrait in low light', ken: 'scale-105' },
];

const SLIDE_DURATION = 7000;

/* ----------------------------- Background slideshow ---------------------------- */

function BackgroundSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        {SLIDES.map((slide, i) =>
          i === index ? (
            <motion.div
              key={slide.src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1.12 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 2.4, ease: EASE_LUXURY },
                scale: { duration: 9, ease: 'easeOut' },
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover"
                fetchPriority={i === 0 ? 'high' : 'low'}
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}

/* --------------------------------- Particles --------------------------------- */

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = window.innerWidth;
    let h = window.innerHeight;
    const setSize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    let raf = 0;

    type P = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      tw: number;
    };
    const count = Math.min(90, Math.floor((w * h) / 20000));
    const particles: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.25,
      vx: (Math.random() - 0.5) * 0.09,
      vy: -(Math.random() * 0.12 + 0.02), // drift upward like embers
      a: Math.random() * 0.5 + 0.08,
      tw: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.012;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        const flicker = 0.6 + Math.sin(p.tw) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198,170,114,${p.a * flicker})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', setSize);

    if (prefersReduced) {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198,170,114,${p.a})`;
        ctx.fill();
      }
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-50"
      aria-hidden
    />
  );
}

/* ----------------------------- Floating glow orbs ---------------------------- */

function GlowOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[8%] top-[20%] h-72 w-72 rounded-full bg-gold/10 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[10%] bottom-[15%] h-80 w-80 rounded-full bg-gold/[0.07] blur-[140px]"
      />
    </div>
  );
}

/* ---------------------------- Rotating statements ---------------------------- */

function RotatingStatements() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex h-9 items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
          transition={{ duration: 1, ease: EASE_LUXURY }}
          className="font-body text-sm font-light italic tracking-[0.04em] text-white/55 md:text-[0.95rem]"
        >
          {ROTATING[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* --------------------------------- Buttons ---------------------------------- */

function scrollTo(href: string) {
  const lenis = (
    window as unknown as { __lenis?: { scrollTo: (t: string | HTMLElement, o?: object) => void } }
  ).__lenis;
  if (lenis) lenis.scrollTo(href, { offset: -10, duration: 1.4 });
  else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

function HeroGoldButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <motion.button
      onClick={() => scrollTo(href)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.5, ease: EASE_LUXURY }}
      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-gold px-9 py-4 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-ink-900 shadow-[0_20px_50px_-18px_rgba(198,170,114,0.6)] transition-colors duration-500 hover:bg-gold-200"
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight
        className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 ease-luxury group-hover:translate-x-1.5"
        strokeWidth={1.5}
      />
      {/* sheen sweep */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[900ms] ease-luxury group-hover:translate-x-full" />
    </motion.button>
  );
}

function HeroOutlineButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <motion.button
      onClick={() => scrollTo(href)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.5, ease: EASE_LUXURY }}
      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden border border-white/25 px-9 py-4 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-white transition-colors duration-500 hover:text-ink-900"
    >
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-500 ease-luxury group-hover:translate-x-1.5"
          strokeWidth={1.5}
        />
      </span>
      <span className="absolute inset-0 -translate-y-full bg-gold transition-transform duration-500 ease-luxury group-hover:translate-y-0" />
    </motion.button>
  );
}

/* ----------------------------------- Hero ----------------------------------- */

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const sideRailOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="grain relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink"
    >
      {/* Cinematic crossfading background */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <BackgroundSlideshow />
      </motion.div>

      {/* Layered luxury overlays */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/50"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(8,8,8,0.55)_100%)]"
        aria-hidden
      />
      {/* Top fade so the glass nav reads cleanly */}
      <div
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/80 to-transparent"
        aria-hidden
      />
      {/* Warm gold rim glow from the bottom edge */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(ellipse_at_bottom,rgba(198,170,114,0.12),transparent_70%)]"
        aria-hidden
      />

      <Particles />
      <GlowOrbs />

      {/* Side rails */}
      <motion.div
        style={{ opacity: sideRailOpacity }}
        className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block lg:left-10"
        aria-hidden
      >
        <div className="flex items-center gap-4 [writing-mode:vertical-rl]">
          <span className="text-[0.6rem] font-light tracking-[0.34em] uppercase text-white/30">
            Media Investment — Est. Culture
          </span>
          <span className="h-20 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
        </div>
      </motion.div>
      <motion.div
        style={{ opacity: sideRailOpacity }}
        className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block lg:right-10"
        aria-hidden
      >
        <div className="flex items-center gap-4 [writing-mode:vertical-rl]">
          <span className="h-20 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <span className="text-[0.6rem] font-light tracking-[0.34em] uppercase text-white/30">
            Capital · Strategy · Access
          </span>
        </div>
      </motion.div>

      {/* Slide indicators */}
      <motion.div
        style={{ opacity: sideRailOpacity }}
        className="absolute bottom-10 right-6 z-20 hidden flex-col items-end gap-2 lg:right-10 lg:flex"
        aria-hidden
      >
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`h-px transition-all duration-700 ${
              i === 0 ? 'w-6 bg-gold/60' : 'w-3 bg-white/20'
            }`}
          />
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE_LUXURY }}
          className="eyebrow mb-12 flex items-center gap-3"
        >
          <span className="h-px w-6 bg-gold/60" />
          OYK Media — Capital Behind Culture
          <span className="h-px w-6 bg-gold/60" />
        </motion.div>

        {/* Two-line masked headline reveal with blur */}
        <h1 className="display-1 text-shadow-luxury flex flex-col items-center text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8rem]">
          <span className="inline-flex overflow-hidden pb-[0.08em]">
            <motion.span
              className="inline-block text-white"
              initial={{ y: '115%', opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.3, delay: 0.7, ease: EASE_LUXURY }}
            >
              We Invest in What
            </motion.span>
          </span>
          <span className="inline-flex overflow-hidden pb-[0.08em]">
            <motion.span
              className="inline-block italic gold-text"
              initial={{ y: '115%', opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.3, delay: 0.95, ease: EASE_LUXURY }}
            >
              Moves Culture.
            </motion.span>
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.5, ease: EASE_LUXURY }}
          className="mt-12 max-w-2xl text-pretty text-base font-light leading-[1.85] text-white/65 md:text-[1.05rem]"
        >
          OYK Media invests in talent, media companies, intellectual property,
          and premium content with the potential to grow into powerful brands.
          We bring capital, strategy, production, access, and partnerships to
          the table.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.8, ease: EASE_LUXURY }}
          className="mt-14 flex flex-col items-center gap-4 sm:flex-row"
        >
          <HeroGoldButton href="#partnerships">Partner With OYK</HeroGoldButton>
          <HeroOutlineButton href="#contact">Present an Opportunity</HeroOutlineButton>
        </motion.div>

        {/* Rotating statements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 2.2 }}
          className="mt-16 w-full max-w-xl"
        >
          <div className="mx-auto mb-5 h-px w-full max-w-[120px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <RotatingStatements />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: cueOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[0.56rem] font-light tracking-[0.34em] uppercase text-white/35">
            Scroll
          </span>
          <div className="relative h-14 w-px overflow-hidden bg-white/10">
            <motion.div
              animate={{ y: [-56, 56] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="h-7 w-px bg-gradient-to-b from-transparent via-gold to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
