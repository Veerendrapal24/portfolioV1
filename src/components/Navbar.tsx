import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Eye, Download, Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Navbar() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const resumeRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Tech', href: '#technologies', id: 'technologies' },
    { name: 'Edu', href: '#education', id: 'education' },
    { name: 'Work', href: '#works', id: 'works' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['hero', 'about', 'technologies', 'education', 'certifications', 'works', 'contact'];
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (resumeRef.current && !resumeRef.current.contains(event.target as Node)) {
        setIsResumeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      observer.disconnect();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl mx-auto">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="clay-card bg-white/70 backdrop-blur-xl px-4 md:px-6 py-3 flex justify-between items-center relative border border-white/40"
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 clay-button clay-white text-slate-600"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          
          <motion.a 
            href="#hero"
            className="font-extrabold text-lg md:text-xl tracking-tighter text-slate-800 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveSection('hero')}
          >
            V<span className="text-clay-blue">P</span>
          </motion.a>
        </div>

        <div className="hidden md:flex gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id || (link.id === 'about' && activeSection === 'hero');
            return (
              <Magnetic key={link.name}>
                <motion.a
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`font-bold text-[10px] lg:text-xs uppercase tracking-widest relative px-4 py-2 transition-colors rounded-full ${
                    isActive ? 'text-blue-700' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white shadow-sm clay-inset rounded-full -z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              </Magnetic>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={resumeRef}>
            <Magnetic>
              <motion.button 
                onClick={() => setIsResumeOpen(!isResumeOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="clay-button clay-blue text-blue-800 text-[10px] md:text-xs py-2 px-4 md:px-5 flex items-center gap-2"
              >
                Resume
                <motion.div
                  animate={{ rotate: isResumeOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={12} />
                </motion.div>
              </motion.button>
            </Magnetic>

            <AnimatePresence>
              {isResumeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-4 w-44 clay-card bg-white/95 backdrop-blur-lg p-2 overflow-hidden shadow-2xl"
                >
                  <div className="flex flex-col gap-1">
                    <motion.a
                      href="/cv.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-slate-700 font-bold text-[10px] uppercase tracking-wider transition-colors"
                    >
                      <Eye size={14} className="text-clay-blue" />
                      View
                    </motion.a>
                    <motion.a
                      href="/cv.pdf"
                      download="Veerendra_Pal_Resume.pdf"
                      whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-slate-700 font-bold text-[10px] uppercase tracking-wider transition-colors"
                    >
                      <Download size={14} className="text-clay-blue" />
                      Get CV
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-4 clay-card bg-white/95 backdrop-blur-lg p-6 md:hidden shadow-2xl border border-white/50"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveSection(link.id);
                    }}
                    whileHover={{ x: 10 }}
                    className={`font-bold text-xs uppercase tracking-widest transition-colors ${
                      activeSection === link.id ? 'text-clay-blue' : 'text-slate-600'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
