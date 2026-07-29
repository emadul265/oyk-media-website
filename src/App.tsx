import { motion, useScroll, useSpring } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import WhatWeBack from '@/components/sections/WhatWeBack';
import WhatWeBring from '@/components/sections/WhatWeBring';
import Partnerships from '@/components/sections/Partnerships';
import Capabilities from '@/components/sections/Capabilities';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold/40 via-gold to-gold/40"
      aria-hidden
    />
  );
}

export default function App() {
  return (
    <SmoothScroll>
      <a
        href="#contact"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-ink-900"
      >
        Skip to contact
      </a>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatWeBack />
        <WhatWeBring />
        <Partnerships />
        <Capabilities />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
