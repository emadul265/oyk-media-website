import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '@/components/SectionLabel';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/sections/ContactForm';
import { IMAGES } from '@/lib/images';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);

  return (
    <section
      id="contact"
      className="grain relative overflow-hidden bg-ink px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-editorial">
        <div className="grid gap-20 lg:grid-cols-[1fr_1fr] lg:gap-28">
          {/* Left: headline + image */}
          <div ref={ref}>
            <Reveal>
              <SectionLabel index="06">Contact</SectionLabel>
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <h2 className="display-2 mt-10 text-balance text-[2.5rem] font-light text-white sm:text-5xl lg:text-[4rem]">
                Bring us the opportunity.
                <br />
                We will help build what it can{' '}
                <span className="italic gold-text">become</span>.
              </h2>
            </Reveal>

            <Reveal variant="up-small" delay={0.2}>
              <p className="mt-10 max-w-md text-base font-light leading-[1.8] text-white/55">
                If you are building something with the potential to shape
                culture, we want to hear about it. Share the opportunity below
                and our team will be in touch.
              </p>
            </Reveal>

            <div className="group relative mt-14 hidden aspect-[4/3] overflow-hidden rounded-[1.5rem] border-gold-soft hover-lux lg:block">
              <motion.img
                style={{ y }}
                src={IMAGES.contact}
                alt="City lights at night"
                className="h-[125%] w-full object-cover transition-transform duration-[1.6s] ease-luxury group-hover:scale-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="eyebrow text-white/50">New York</p>
                <p className="display-3 mt-1 text-xl text-white/80">
                  Where culture converges
                </p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <Reveal variant="up" delay={0.15}>
            <div className="glass-card-solid card-sheen hover-lux rounded-[1.5rem] border-gold-soft p-8 lg:p-12">
              <p className="eyebrow mb-8 text-white/40">The Opportunity</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
