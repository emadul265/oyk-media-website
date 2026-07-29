import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import Reveal from '@/components/Reveal';
import { IMAGES } from '@/lib/images';
import { EASE_LUXURY, staggerContainer } from '@/lib/motion';

const CARDS = [
  {
    title: 'Talent & Media Companies',
    desc: 'Creators, performers, publishers, studios, and platforms seeking capital and partnership to scale their reach and convert audience into enduring ownership.',
    cta: 'Present Your Platform',
    image: IMAGES.partnershipTalent,
    href: '#contact',
  },
  {
    title: 'Brands',
    desc: 'Luxury and lifestyle brands looking to align with culture through meaningful media partnerships, talent collaborations, and editorial-scale storytelling.',
    cta: 'Discuss a Media Partnership',
    image: IMAGES.partnershipBrands,
    href: '#contact',
  },
  {
    title: 'Events & Entertainment',
    desc: 'Red-carpet productions, premieres, private gatherings, and entertainment properties seeking coverage, investment, or an OYK Media presence.',
    cta: 'Invite OYK Media',
    image: IMAGES.partnershipEvents,
    href: '#contact',
  },
];

function scrollTo(href: string) {
  const lenis = (
    window as unknown as { __lenis?: { scrollTo: (t: string | HTMLElement, o?: object) => void } }
  ).__lenis;
  if (lenis) lenis.scrollTo(href, { offset: -10, duration: 1.4 });
  else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

function PartnershipCard({
  card,
  index,
}: {
  card: (typeof CARDS)[number];
  index: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setPos({ x, y });
  };

  return (
    <motion.button
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1.1, ease: EASE_LUXURY },
        },
      }}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      onClick={() => scrollTo(card.href)}
      style={{
        transform: `perspective(1200px) rotateY(${pos.x * 0.4}deg) rotateX(${-pos.y * 0.4}deg)`,
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}
      className="group glass-card card-sheen hover-lux relative block overflow-hidden rounded-[1.5rem] border-gold-soft text-left"
    >
      <span className="index-mark absolute right-5 top-5 z-20 text-base">
        0{index + 1}
      </span>

      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="h-full w-full scale-105 object-cover transition-transform duration-[1.6s] ease-luxury group-hover:scale-[1.14]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 transition-colors duration-700 group-hover:from-gold/[0.12] group-hover:to-transparent" />
      </div>

      {/* Content lifts over image on a frosted plate */}
      <div className="relative -mt-24 px-8 pb-9">
        <h3 className="display-3 text-[1.85rem] font-light text-white lg:text-[2.1rem]">
          {card.title}
        </h3>
        <p className="mt-5 text-[0.92rem] font-light leading-[1.75] text-white/55">
          {card.desc}
        </p>
        <span className="mt-8 inline-flex items-center gap-2.5 border-b border-gold/30 pb-1 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-gold transition-all duration-500 group-hover:border-gold group-hover:gap-3.5">
          {card.cta}
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-500 ease-luxury group-hover:translate-x-1 group-hover:-translate-y-1"
            strokeWidth={1.5}
          />
        </span>
      </div>
    </motion.button>
  );
}

export default function Partnerships() {
  return (
    <section
      id="partnerships"
      className="relative bg-ink px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-editorial">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <SectionLabel index="04">Partnerships</SectionLabel>
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <h2 className="display-2 mt-10 max-w-2xl text-balance text-[2.5rem] font-light text-white sm:text-5xl lg:text-[4.25rem]">
                Partnerships and{' '}
                <span className="italic gold-text">Opportunities</span>
              </h2>
            </Reveal>
          </div>
          <Reveal variant="up-small" delay={0.2}>
            <p className="max-w-sm text-sm font-light leading-relaxed text-white/40 lg:text-right">
              Every partnership begins with a conversation. Tell us what you are
              building and where you want it to go.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-20 grid gap-7 md:grid-cols-3"
        >
          {CARDS.map((card, i) => (
            <PartnershipCard key={card.title} card={card} index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
