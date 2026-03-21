import { useEffect } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Background from './components/Background';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import Magnetic from './components/Magnetic';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Global smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        
        if (anchor.hash === '#') {
          lenis.scrollTo(0);
          return;
        }

        const targetElement = document.querySelector(anchor.hash) as HTMLElement;
        if (targetElement) {
          lenis.scrollTo(targetElement);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-clay-bg overflow-x-hidden cursor-none selection:bg-clay-blue selection:text-blue-900">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-clay-blue z-[100] origin-left"
        style={{ scaleX }}
      />
      <CustomCursor />
      <Background />
      <Navbar />
      
      <main>
        <div id="hero">
          <Hero />
        </div>
        
        <div id="about">
          <About />
        </div>
        
        <div id="education">
          <Education />
        </div>
        
        <div id="certifications">
          <Certifications />
        </div>
        
        <div id="works">
          <Projects />
        </div>
        
        <div id="contact">
          <Contact />
        </div>
      </main>

      <footer className="py-12 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
          © 2026 Annoula Veerendra Pal
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Built with Clay & React
        </div>
        <div className="flex gap-6">
          {[
            { name: 'LinkedIn', href: 'https://www.linkedin.com/in/veerendrapal' },
            { name: 'GitHub', href: 'https://github.com/Veerendrapal24' },
            { name: 'Email', href: 'mailto:veerendra2475@gmail.com' }
          ].map((item) => (
            <Magnetic key={item.name}>
              <a 
                href={item.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-clay-blue transition-colors"
              >
                {item.name}
              </a>
            </Magnetic>
          ))}
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
