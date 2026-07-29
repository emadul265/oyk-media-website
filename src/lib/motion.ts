import { type Variants } from 'framer-motion';

/** Shared easing curves for the editorial motion language. */
export const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;
export const EASE_SILK = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT = [0.33, 1, 0.68, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE_LUXURY },
  },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_LUXURY },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.3, ease: EASE_LUXURY } },
};

export const fadeInSlow: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 2.2, ease: EASE_LUXURY } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.12 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Line-by-line text reveal — children must be block elements. */
export const lineReveal: Variants = {
  hidden: { opacity: 0, y: '110%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 1.1, ease: EASE_LUXURY },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: EASE_LUXURY },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 1.2, ease: EASE_LUXURY },
  },
};
