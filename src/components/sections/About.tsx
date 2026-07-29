import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import Reveal from '@/components/Reveal';
import { EASE_LUXURY } from '@/lib/motion';

export default function About() {
  return (
    <section
      id="about"
      className="grain relative bg-ink px-6 pb-32 pt-32 lg:px-10 lg:pb-44 lg:pt-48"
    >
      <div className="mx-auto max-w-editorial">
        <Reveal>
          <SectionLabel index="01">Who We Are</SectionLabel>
        </Reveal>

        <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-28">
          {/* Editorial pull-quote */}
          <Reveal variant="up">
            <h2 className="display-2 text-balance text-[2.5rem] font-light text-white sm:text-5xl lg:text-[4.25rem]">
              A media investment and partnership company building the next
              generation of{' '}
              <span className="italic gold-text">cultural brands</span>.
            </h2>
          </Reveal>

          {/* Body with vertical rule */}
          <Reveal variant="up" delay={0.15}>
            <div className="relative space-y-7 border-l border-white/10 pl-8 lg:pt-2 lg:pl-10">
              <span className="absolute -left-px top-0 h-16 w-px bg-gradient-to-b from-gold/60 to-transparent" />
              <p className="text-lg font-light leading-[1.8] text-white/65">
                OYK Media is not an agency. We are investors and partners —
                backing talent, media companies, intellectual property, and
                premium content with the conviction that great work deserves
                serious capital behind it.
              </p>
              <p className="text-base font-light leading-[1.8] text-white/40">
                We move where culture is forming: celebrity ventures,
                production companies, magazines, podcasts, entertainment
                platforms, and culturally relevant businesses with the
                potential to become enduring brands.
              </p>
              <div className="flex items-center gap-3 pt-4">
                <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <span className="text-[0.72rem] font-light tracking-[0.18em] uppercase text-white/55">
                  Capital. Strategy. Access. Production. Partnerships.
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE_LUXURY }}
          className="gold-line mt-24 origin-left lg:mt-32"
          aria-hidden
        />
      </div>
    </section>
  );
}
