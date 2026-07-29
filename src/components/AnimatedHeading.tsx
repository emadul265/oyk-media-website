import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Reveals a heading word-by-word with a staggered upward motion,
 * wrapped in an overflow-hidden mask so each word slides into place.
 */
export default function AnimatedHeading({
  text,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.3 });
  const words = text.split(' ');

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-flex overflow-hidden align-bottom"
          aria-hidden={false}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '115%', opacity: 0 },
              visible: {
                y: '0%',
                opacity: 1,
                transition: {
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: delay + i * 0.05,
                },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
