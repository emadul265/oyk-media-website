import { motion } from 'framer-motion';
import {
  Award,
  Mic,
  Camera,
  Sparkles,
  Newspaper,
  Headphones,
  Megaphone,
  BookOpen,
  Star,
  Clapperboard,
  PenTool,
  LayoutGrid,
} from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import Reveal from '@/components/Reveal';
import { IMAGES } from '@/lib/images';
import { EASE_LUXURY } from '@/lib/motion';

const CAPABILITIES = [
  { icon: Award, label: 'Red-Carpet Coverage' },
  { icon: Mic, label: 'Celebrity Interviews' },
  { icon: Sparkles, label: 'Brand Activations' },
  { icon: Camera, label: 'Luxury Event Coverage' },
  { icon: Newspaper, label: 'Editorial Features' },
  { icon: Headphones, label: 'Podcast Partnerships' },
  { icon: Megaphone, label: 'Sponsored Content' },
  { icon: BookOpen, label: 'Magazine Collaborations' },
  { icon: Star, label: 'Talent Campaigns' },
  { icon: Clapperboard, label: 'Behind-the-Scenes Content' },
  { icon: PenTool, label: 'Executive Storytelling' },
  { icon: LayoutGrid, label: 'Custom Media Campaigns' },
];

export default function Capabilities() {
  return (
    <section className="grain relative overflow-hidden bg-ink-850 px-6 py-28 lg:px-10 lg:py-40">
      {/* faint backdrop image */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden>
        <img
          src={IMAGES.podcast}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink-850 via-ink-850/95 to-ink-850"
        aria-hidden
      />

      <div className="relative mx-auto max-w-editorial">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <SectionLabel index="05">Featured Capabilities</SectionLabel>
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <h2 className="display-2 mt-10 max-w-2xl text-balance text-[2.5rem] font-light text-white sm:text-5xl lg:text-[4rem]">
                What we produce,{' '}
                <span className="italic gold-text">platform</span>, and partner
                on.
              </h2>
            </Reveal>
          </div>
          <Reveal variant="up-small" delay={0.2}>
            <p className="max-w-sm text-sm font-light leading-relaxed text-white/40 lg:text-right">
              A full spectrum of media capabilities — executed with editorial
              standard and commercial intent.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.75,
                  delay: (i % 4) * 0.08,
                  ease: EASE_LUXURY,
                }}
                className="group glass-card-solid card-sheen hover-lux relative flex flex-col justify-between rounded-[1.5rem] border-gold-soft px-7 py-12"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 transition-all duration-500 group-hover:border-gold/60 group-hover:bg-gold/10 group-hover:shadow-[0_0_22px_-4px_rgba(198,170,114,0.45)]">
                    <Icon
                      className="h-5 w-5 text-gold/70 transition-all duration-500 group-hover:scale-110 group-hover:text-gold"
                      strokeWidth={1.25}
                    />
                  </span>
                  <span className="index-mark text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-10 text-[0.95rem] font-light leading-snug text-white/70 transition-colors duration-500 group-hover:text-white">
                  {cap.label}
                </p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 ease-luxury group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
