import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React from 'react';
import Magnetic from './Magnetic';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const springConfig = { damping: 20, stiffness: 150 };
  const floatX = useSpring(useTransform(mouseX, [0, window.innerWidth], [-20, 20]), springConfig);
  const floatY = useSpring(useTransform(mouseY, [0, window.innerHeight], [-20, 20]), springConfig);

  const floatingSpheres = [
    { color: 'clay-blue', size: 'w-12 h-12', top: '20%', left: '15%', delay: 0 },
    { color: 'clay-pink', size: 'w-8 h-8', top: '60%', left: '80%', delay: 0.2 },
    { color: 'clay-purple', size: 'w-16 h-16', top: '15%', left: '70%', delay: 0.4 },
    { color: 'clay-yellow', size: 'w-10 h-10', top: '80%', left: '20%', delay: 0.6 },
  ];

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Magnetic Floating Spheres */}
      {floatingSpheres.map((sphere, i) => (
        <motion.div
          key={i}
          style={{ x: floatX, y: floatY, top: sphere.top, left: sphere.left }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 1 + sphere.delay, duration: 1, type: 'spring' }}
          className={`absolute ${sphere.size} rounded-full clay-card ${sphere.color} blur-[2px] z-0`}
        />
      ))}

      <div className="relative z-10 px-6 md:px-20 grid lg:grid-cols-12 items-center gap-16">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <span className="clay-card clay-yellow inline-block px-4 py-1 text-amber-700 font-bold text-xs uppercase tracking-widest mb-6 border-2 border-amber-200/20">
              Developer Profile / 2026
            </span>
            <motion.h1 
              initial={{ scale: 4, y: -200, opacity: 0, skewX: -20, filter: 'blur(20px)' }}
              animate={{ scale: 1, y: 0, opacity: 1, skewX: 0, filter: 'blur(0px)' }}
              transition={{ 
                duration: 1, 
                type: "spring", 
                stiffness: 300, 
                damping: 12,
                delay: 0.2
              }}
              className="text-6xl md:text-8xl xl:text-9xl font-extrabold text-slate-800 leading-tight mb-8"
            >
              Annoula <br />
              <span className="text-clay-blue">Veerendra</span> <br />
              <span className="text-clay-pink">Pal</span>
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-xl mt-8"
          >
            <p className="text-xl md:text-2xl font-medium text-slate-500 leading-relaxed">
              Machine Learning Engineer & AI Specialist. 
              Building <span className="text-slate-800">data-driven systems</span> that learn, adapt, and scale efficiently.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-10">
              <Magnetic>
                <motion.a 
                  href="#works" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="clay-button clay-blue text-blue-800 inline-block shadow-lg shadow-blue-200/50"
                >
                  View Projects
                </motion.a>
              </Magnetic>
              <Magnetic>
                <motion.a 
                  href="#contact" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="clay-button bg-white text-slate-600 inline-block border-2 border-slate-100"
                >
                  Contact Me
                </motion.a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", delay: 0.6 }}
          className="lg:col-span-5 hidden lg:block"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-clay-blue via-clay-pink to-clay-yellow opacity-40 blur-2xl group-hover:opacity-60 transition duration-1000 -z-10 animate-pulse" />
            <div className="clay-card p-6 md:p-8 rotate-3 group-hover:rotate-0 transition-transform duration-700 bg-white/70 backdrop-blur-md border border-white">
              <div className="aspect-[4/5] rounded-[30px] overflow-hidden clay-inset">
                <img 
                  src="/palpic.jpeg" 
                  alt="Annoula Veerendra Pal" 
                  className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
