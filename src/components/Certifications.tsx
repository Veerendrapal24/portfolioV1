import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink } from 'lucide-react';
import TextReveal from './TextReveal';

const certifications = [
  {
    title: 'Summer Term Training',
    issuer: 'LPU (Centre of Professional Enhancement)',
    period: "Jul 2025",
    color: 'clay-blue',
    details: [
      'Completed a structured training program on Data Structures, Algorithms, and Computational Problem Solving.',
      'Designed and Implemented a Hotel Management System using C++ and STL containers.',
      'Optimized execution performance and memory utilization by 30%.'
    ]
  },
  {
    title: 'AI Foundations Associate',
    issuer: 'Oracle',
    period: "2024",
    color: 'clay-purple',
    details: [
      'Certified Oracle Cloud Infrastructure AI Foundations Associate.',
      'Understanding of core AI concepts and machine learning fundamentals.',
      'Knowledge of generative AI and large language models.'
    ]
  }
];

export default function Certifications() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="certifications" className="py-24 px-6 md:px-20 bg-clay-bg text-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 max-w-7xl mx-auto">
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="clay-card clay-purple p-12 sticky top-32"
          >
            <motion.span 
              initial={{ scale: 3, y: -20, opacity: 0 }}
              whileInView={{ scale: 1, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
              className="text-6xl font-extrabold text-purple-800 block"
            >
              04
            </motion.span>
            <TextReveal 
              text="Certifications" 
              className="text-4xl font-extrabold uppercase mt-4 text-purple-800"
            />
            <div className="w-12 h-2 bg-purple-800/20 rounded-full mt-4" />
          </motion.div>
        </div>

        <motion.div 
          layout
          className="md:col-span-8 space-y-6"
        >
          {certifications.map((item, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01, x: 5 }}
              whileTap={{ scale: 0.99 }}
              viewport={{ once: true }}
              transition={{ 
                layout: { duration: 0.5, type: "spring", stiffness: 100, damping: 20 },
                opacity: { delay: index * 0.1 },
                y: { delay: index * 0.1 }
              }}
              className={`clay-card p-8 cursor-pointer transition-all ${expanded === index ? 'clay-inset bg-white/50' : 'bg-white'}`}
              onClick={() => setExpanded(expanded === index ? null : index)}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${item.color} text-slate-700 mb-2`}>
                    {item.period}
                  </span>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-extrabold text-slate-800 uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <Award className={`text-clay-blue ${item.color === 'clay-purple' ? 'text-purple-500' : ''}`} size={20} />
                  </div>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">
                    {item.issuer}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color} shadow-inner shrink-0 ml-4`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path
                      d="M12 5v14"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <motion.path
                      d="M5 12h14"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: expanded === index ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </svg>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {expanded === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, y: -10 }}
                    animate={{ height: 'auto', opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -10 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.23, 1, 0.32, 1],
                      opacity: { duration: 0.2 },
                      y: { duration: 0.3 }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <ul className="space-y-4">
                        {item.details.map((detail, i) => (
                          <motion.li 
                            key={i} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            className="text-slate-500 font-medium leading-relaxed flex gap-3"
                          >
                            <span className="text-clay-blue font-bold">•</span>
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
