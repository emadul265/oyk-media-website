import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type Variant = 'gold' | 'outline' | 'ghost-dark' | 'ghost-light' | 'editorial';

const styles: Record<Variant, string> = {
  gold:
    'bg-gold text-ink-900 hover:bg-gold-200 shadow-[0_18px_45px_-18px_rgba(198,170,114,0.55)]',
  outline:
    'border border-white/20 text-white hover:border-gold/70 hover:text-gold',
  'ghost-dark':
    'border border-ink/15 text-ink hover:border-gold hover:text-gold',
  'ghost-light':
    'border border-white/20 text-white hover:border-gold/70 hover:text-gold',
  editorial:
    'bg-ink-900 text-white hover:bg-gold hover:text-ink-900',
};

export default function GoldButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'gold',
  className = '',
  fullWidth = false,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: Variant;
  fullWidth?: boolean;
  className?: string;
}) {
  const base = `group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-[0.7rem] font-body font-medium tracking-[0.24em] uppercase transition-colors duration-500 ease-luxury overflow-hidden ${styles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <ArrowRight
        className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 ease-luxury group-hover:translate-x-1.5"
        strokeWidth={1.5}
      />
    </>
  );

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { y: 0, scale: 0.985 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  if (href) {
    return (
      <motion.a href={href} className={base} {...motionProps}>
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button type={type} onClick={onClick} className={base} {...motionProps}>
      {content}
    </motion.button>
  );
}
