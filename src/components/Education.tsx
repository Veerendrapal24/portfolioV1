import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import TextReveal from './TextReveal';

const education = [
  {
    title: 'Bachelor of Technology',
    major: 'Computer Science and Engineering',
    company: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    period: "Aug' 23 – Present",
    color: 'clay-blue',
    details: [
      'Maintaining a CGPA of 8.07.',
      'Focusing on Systems Programming, DSA, and AI Foundations.',
      'Active participation in technical workshops and hackathons.'
    ]
  },
  {
    title: 'Intermediate',
    major: 'MPC',
    company: 'Narayana Junior College',
    location: 'Hyderabad, Telangana',
    period: "May' 21 – Apr' 23",
    color: 'clay-pink',
    details: [
      'Achieved a percentage of 96.4%.',
      'Specialized in Mathematics, Physics, and Chemistry.',
      'Developed strong analytical and problem-solving skills.'
    ]
  },
  {
    title: 'Matriculation',
    major: 'General Science',
    company: "St. Joseph's High School",
    location: 'Hyderabad, Telangana',
    period: "Mar' 20 – Apr' 21",
    color: 'clay-green',
    details: [
      'Achieved a perfect score of 100%.',
      'Consistent academic excellence throughout schooling.',
      'Foundation in core science and mathematics.'
    ]
  }
];

export default function Education() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="education" className="py-24 px-6 md:px-20 bg-clay-bg text-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 max-w-7xl mx-auto">
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="clay-card clay-green p-12 sticky top-32"
          >
            <motion.span 
              initial={{ scale: 3, y: -20, opacity: 0 }}
              whileInView={{ scale: 1, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
              className="text-6xl font-extrabold text-green-800 block"
            >
              03
            </motion.span>
            <TextReveal 
              text="Education" 
              className="text-4xl font-extrabold uppercase mt-4 text-green-800"
            />
            <div className="w-12 h-2 bg-green-800/20 rounded-full mt-4" />
          </motion.div>
        </div>

        <motion.div 
          layout
          className="md:col-span-8 space-y-6"
        >
          {education.map((item, index) => (
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
                  <h3 className="text-2xl font-extrabold text-slate-800 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 font-bold uppercase tracking-wide text-sm">
                    {item.major}
                  </p>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">
                    {item.company} • {item.location}
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
