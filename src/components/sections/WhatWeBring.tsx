import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '@/components/SectionLabel';
import Reveal from '@/components/Reveal';
import { IMAGES } from '@/lib/images';
import { EASE_LUXURY, fadeUp, staggerContainer } from '@/lib/motion';

const PILLARS = [
  {
    title: 'More access.',
    desc: 'A network across entertainment, fashion, media, and luxury.',
  },
  {
    title: 'Better positioning.',
    desc: 'Strategic framing that elevates every brand we touch.',
  },
  {
    title: 'Bigger opportunities.',
    desc: 'The scale and relationships to open doors that stay open.',
  },
];

export default function WhatWeBring() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ['-10%', '14%']);
  const yImgAlt = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);
  const yStat = useTransform(scrollYProgress, [0, 1], ['40%', '-40%']);

  return (
    <section className="grain relative overflow-hidden bg-ink-850 px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-editorial">
        <Reveal>
          <SectionLabel index="03">What OYK Brings</SectionLabel>
        </Reveal>

        <div className="mt-14 grid gap-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-28">
          {/* Text column */}
          <div>
            <Reveal variant="up">
              <h2 className="display-2 text-balance text-[2.5rem] font-light text-white sm:text-5xl lg:text-[4rem]">
                We bring more than capital.
                <br />
                We bring the{' '}
                <span className="italic gold-text">infrastructure</span> to
                build what lasts.
              </h2>
            </Reveal>

            <div className="mt-12 max-w-prose space-y-7 text-lg font-light leading-[1.85] text-white/55">
              <Reveal variant="up-small" delay={0.1}>
                <p>
                  OYK Media operates at the intersection of investment and
                  culture. We do not simply write checks — we bring strategy,
                  production capability, industry access, and a network built
                  across entertainment, fashion, media, and luxury to every
                  partnership we form.
                </p>
              </Reveal>
              <Reveal variant="up-small" delay={0.2}>
                <p>
                  Whether backing a creator turning influence into ownership, a
                  media company ready to scale, or a brand seeking to align with
                  culture meaningfully, we assemble the resources required to
                  move from momentum to permanence.
                </p>
              </Reveal>
              <Reveal variant="up-small" delay={0.3}>
                <p className="text-white/72">
                  We partner early, stay involved, and build alongside the
                  people and companies we believe in.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Visual composition column */}
          <div ref={ref} className="relative hidden lg:block">
            <motion.div
              style={{ y: yImg }}
              className="group relative z-10 aspect-[4/5] w-[80%] overflow-hidden rounded-[1.5rem] border-gold-soft hover-lux shadow-luxury"
            >
              <img
                src={IMAGES.whatWeBring}
                alt="Senior executives in a modern boardroom"
                className="h-full w-full object-cover transition-transform duration-[1.6s] ease-luxury group-hover:scale-[1.06]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </motion.div>

            <motion.div
              style={{ y: yImgAlt }}
              className="group absolute bottom-[-4rem] right-0 z-20 aspect-[3/4] w-[48%] overflow-hidden rounded-[1.5rem] border-gold-soft hover-lux shadow-luxury"
            >
              <img
                src={IMAGES.whatWeBringAlt}
                alt="Professional in a sophisticated boardroom"
                className="h-full w-full object-cover transition-transform duration-[1.6s] ease-luxury group-hover:scale-[1.06]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </motion.div>

            {/* Floating stat card — frosted glass with gold ring */}
            <motion.div
              style={{ y: yStat }}
              className="glass-card card-sheen hover-lux absolute -right-6 top-8 z-30 rounded-[1.25rem] border-gold-soft px-6 py-5 shadow-glow-gold"
            >
              <p className="display-1 text-4xl gold-text">5</p>
              <p className="mt-1 text-[0.62rem] font-medium tracking-[0.2em] uppercase text-white/50">
                Capital · Strategy
                <br />
                Production · Access
                <br />
                Partnerships
              </p>
            </motion.div>

            {/* Gold accent frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.3 }}
              className="absolute left-[-2rem] top-[-2rem] z-0 h-28 w-28 border-l border-t border-gold/35"
              aria-hidden
            />
          </div>
        </div>

        {/* Pillars — handcrafted cells with lift + gold underline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-32 grid gap-5 lg:mt-44 lg:grid-cols-3"
        >
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="group glass-card-solid card-sheen hover-lux relative rounded-[1.5rem] border-gold-soft px-8 py-14 text-center lg:py-16"
            >
              <span className="index-mark absolute left-6 top-5 text-sm">
                0{i + 1}
              </span>
              <p className="display-3 text-[1.75rem] font-light text-white lg:text-[2.1rem]">
                {p.title}
              </p>
              <p className="mx-auto mt-4 max-w-[14rem] text-sm font-light leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/60">
                {p.desc}
              </p>
              <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gold transition-all duration-500 ease-luxury group-hover:w-16" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
