import { useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down';

/**
 * Tracks vertical scroll position and direction with a single
 * passive scroll listener. Used by the Navbar to switch between
 * transparent (over hero) and solid (scrolled) states.
 */
export function useScrollState(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  const [direction, setDirection] = useState<ScrollDirection>('up');
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > threshold);
      setDirection(y > lastY.current ? 'down' : 'up');
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { scrolled, direction };
}
