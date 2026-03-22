import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[200] bg-clay-bg flex flex-col items-center justify-center p-6"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo/Name Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 uppercase tracking-tighter flex gap-2">
                {"AVP".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2, 
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Progress Bar Container (Clay style) */}
            <div className="w-64 h-12 clay-card bg-white p-2 flex items-center mb-4">
              <motion.div 
                className="h-full clay-blue rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-bold uppercase tracking-widest text-slate-400"
            >
              {progress}% - Initializing Systems
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ 
              opacity: [0.4, 1, 0.4],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300"
          >
            Annoula Veerendra Pal
          </motion.div>
          
          {/* Background Decorative Spheres */}
          <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[20%] w-64 h-64 bg-clay-blue opacity-10 blur-3xl rounded-full" />
            <div className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-clay-pink opacity-10 blur-3xl rounded-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
