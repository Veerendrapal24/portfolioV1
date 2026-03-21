import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Eye, Download, Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Navbar() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Tech', href: '#technologies' },
    { name: 'Education', href: '#education' },
    { name: 'Certs', href: '#certifications' },
    { name: 'Projects', href: '#works' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resumeRef.current && !resumeRef.current.contains(event.target as Node)) {
        setIsResumeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="clay-card bg-white/80 backdrop-blur-md px-6 md:px-8 py-4 flex justify-between items-center relative"
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 clay-button clay-white text-slate-600"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <motion.a 
            href="#hero"
            className="font-extrabold text-xl md:text-2xl tracking-tighter text-slate-800 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Veerendra<span className="text-clay-blue">Pal</span>
          </motion.a>
        </div>

        <div className="hidden md:flex gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <motion.a
                href={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-bold text-[10px] lg:text-xs uppercase tracking-widest text-slate-500 hover:text-clay-blue transition-colors relative group px-2 py-1"
              >
                {link.name}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-clay-blue transition-all group-hover:w-full"
                  layoutId="nav-underline"
                />
              </motion.a>
            </Magnetic>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={resumeRef}>
            <Magnetic>
              <motion.button 
                onClick={() => setIsResumeOpen(!isResumeOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="clay-button clay-blue text-blue-800 text-[10px] md:text-xs py-2 px-4 md:px-6 flex items-center gap-2"
              >
                Resume
                <motion.div
                  animate={{ rotate: isResumeOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={14} />
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
                  className="absolute right-0 mt-4 w-48 clay-card bg-white/95 backdrop-blur-lg p-2 overflow-hidden shadow-2xl"
                >
                  <div className="flex flex-col gap-1">
                    <motion.a
                      href="/cv.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      <Eye size={16} className="text-clay-blue" />
                      View CV
                    </motion.a>
                    <motion.a
                      href="/cv.pdf"
                      download="Veerendra_Pal_Resume.pdf"
                      whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      <Download size={16} className="text-clay-blue" />
                      Download CV
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-4 clay-card bg-white/95 backdrop-blur-lg p-6 md:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ x: 10 }}
                    className="font-bold text-sm uppercase tracking-widest text-slate-600 hover:text-clay-blue transition-colors"
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
