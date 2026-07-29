import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star, Building2, Film, Gem } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import Reveal from '@/components/Reveal';
import { IMAGES } from '@/lib/images';
import { EASE_LUXURY } from '@/lib/motion';

const CARDS = [
  {
    icon: Star,
    title: 'Talent',
    image: IMAGES.talent,
    body: 'We back creators, performers, and public figures whose influence can be converted into lasting ownership — building brands, ventures, and media properties that outlive a single moment.',
  },
  {
    icon: Building2,
    title: 'Media Companies',
    image: IMAGES.mediaCompanies,
    body: 'We invest in publishers, production houses, studios, and platforms with strong IP and the ambition to scale, bringing capital and operational strategy to accelerate growth.',
  },
  {
    icon: Film,
    title: 'Premium Content',
    image: IMAGES.premiumContent,
    body: 'We finance and develop editorial, film, television, audio, and branded content with the production value and storytelling required to hold attention and build equity.',
  },
  {
    icon: Gem,
    title: 'Brand Partnerships',
    image: IMAGES.brandPartnerships,
    body: 'We structure partnerships between talent, media, and luxury brands — aligning audiences, narratives, and commercial opportunities into durable, mutually valuable relationships.',
  },
];

function GlassCard({
  card,
  index,
}: {
  card: (typeof CARDS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // asymmetric parallax — alternate direction per card for editorial rhythm
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0 ? [60, -60] : [30, -30]
  );
  const Icon = card.icon;

  return (
    <motion.article
      ref={ref}
      style={{ y }}
      className="group glass-card card-sheen hover-lux relative flex flex-col overflow-hidden rounded-[1.5rem] border-gold-soft"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="h-full w-full scale-[1.02] object-cover grayscale-[0.35] transition-all duration-[1.6s] ease-luxury group-hover:grayscale-0 group-hover:scale-[1.12]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 transition-colors duration-700 group-hover:from-gold/[0.1] group-hover:to-transparent" />
        {/* Icon medallion */}
        <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-ink/60 backdrop-blur-md transition-all duration-500 group-hover:border-gold/70 group-hover:bg-gold/15 group-hover:shadow-[0_0_24px_-4px_rgba(198,170,114,0.5)]">
          <Icon
            className="h-4 w-4 text-gold transition-transform duration-500 group-hover:scale-110"
            strokeWidth={1.5}
          />
        </div>
        {/* Index mark */}
        <span className="index-mark absolute right-5 top-4 text-base">
          0{index + 1}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-7 py-8">
        <h3 className="display-3 text-[1.7rem] font-light text-white">
          {card.title}
        </h3>
        <p className="mt-4 text-[0.92rem] font-light leading-[1.75] text-white/55">
          {card.body}
        </p>
        {/* Gold underline that grows on hover */}
        <div className="mt-7 h-px w-8 bg-gold/50 transition-all duration-500 ease-luxury group-hover:w-24" />
      </div>
    </motion.article>
  );
}

export default function WhatWeBack() {
  return (
    <section
      id="what-we-back"
      className="relative bg-ink px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-editorial">
        <Reveal>
          <SectionLabel index="02">What We Back</SectionLabel>
        </Reveal>

        <div className="mt-12 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <Reveal variant="up">
            <h2 className="display-2 max-w-3xl text-balance text-[2.5rem] font-light text-white sm:text-5xl lg:text-[4.25rem]">
              We Take Talent and Media Companies to the{' '}
              <span className="italic gold-text">Next Level</span>.
            </h2>
          </Reveal>
          <Reveal variant="up-small" delay={0.2}>
            <p className="max-w-xs text-sm font-light leading-relaxed text-white/40 lg:text-right">
              Four categories of investment — each backed by capital, strategy,
              and the full weight of our network.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {CARDS.map((card, i) => (
            <GlassCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
