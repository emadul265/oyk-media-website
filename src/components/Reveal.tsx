import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import {
  fadeUp,
  fadeUpSmall,
  fadeIn,
  staggerContainer,
  staggerFast,
  clipReveal,
  EASE_LUXURY,
} from '@/lib/motion';

type Direction =
  | 'up'
  | 'up-small'
  | 'in'
  | 'stagger'
  | 'stagger-fast'
  | 'clip';

const variantMap = {
  up: fadeUp,
  'up-small': fadeUpSmall,
  in: fadeIn,
  stagger: staggerContainer,
  'stagger-fast': staggerFast,
  clip: clipReveal,
};

/**
 * Scroll-triggered reveal wrapper.
 * `variant` controls which motion variant drives the animation.
 */
export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className,
  once = true,
  amount = 0.25,
}: {
  children: ReactNode;
  variant?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={
        delay
          ? { delay, duration: 1, ease: EASE_LUXURY }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
