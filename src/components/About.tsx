import { motion } from 'motion/react';
import TextReveal from './TextReveal';

const skills = [
  'C', 'C++', 'Java', 'Python', 'HTML', 'CSS', 
  'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib', 
  'MySQL', 'DSA', 'Operating Systems', 'DBMS', 'Computer Networks'
];

export default function About() {
  return (
    <section className="py-24 px-6 md:px-20 bg-clay-bg text-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 max-w-7xl mx-auto">
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="clay-card clay-pink p-10 md:p-12 sticky top-32 overflow-hidden"
          >
            <div className="relative mb-8 aspect-square rounded-[40px] overflow-hidden clay-inset bg-white/50 p-2">
              <img 
                src="/palpic.jpeg" 
                alt="Annoula Veerendra Pal" 
                className="w-full h-full object-cover rounded-[35px] grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
            </div>
            <motion.span 
              initial={{ scale: 3, y: -20, opacity: 0 }}
              whileInView={{ scale: 1, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
              className="text-6xl font-extrabold text-red-800 block"
            >
              01
            </motion.span>
            <TextReveal 
              text="Profile" 
              className="text-4xl font-extrabold uppercase mt-4 text-red-800"
            />
            <div className="w-12 h-2 bg-red-800/20 rounded-full mt-4" />
          </motion.div>
        </div>

        <div className="md:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="clay-card p-10 md:p-16 mb-16"
          >
            <p className="text-3xl md:text-5xl font-extrabold leading-tight uppercase text-slate-800 flex flex-wrap gap-x-[0.3em] gap-y-2">
              {"Systems-focused developer with a passion for building efficient, high-performance applications. My approach combines rigorous computer science with a soft aesthetic.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.5 }}
                  className={word === "efficient," ? "text-clay-blue" : word === "soft" ? "text-clay-pink" : ""}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </motion.div>
        </div>

        {/* Technologies Section */}
        <div id="technologies" className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="clay-card clay-blue p-12"
          >
            <motion.span 
              initial={{ scale: 3, y: -20, opacity: 0 }}
              whileInView={{ scale: 1, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
              className="text-6xl font-extrabold text-blue-800 block"
            >
              02
            </motion.span>
            <TextReveal 
              text="Technologies" 
              className="text-4xl font-extrabold uppercase mt-4 text-blue-800"
            />
            <div className="w-12 h-2 bg-blue-800/20 rounded-full mt-4" />
          </motion.div>
        </div>

        <div className="md:col-span-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -5, 0],
                  transition: {
                    y: {
                      repeat: Infinity,
                      duration: 3 + (i % 3),
                      ease: "easeInOut",
                      delay: i * 0.1
                    },
                    opacity: { delay: i * 0.05 },
                    scale: { delay: i * 0.05, type: "spring", stiffness: 400, damping: 10 }
                  }
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: i % 2 === 0 ? 5 : -5,
                  backgroundColor: 'rgba(147, 197, 253, 0.4)',
                  color: '#1e3a8a',
                  zIndex: 10
                }}
                whileTap={{ scale: 0.95, borderRadius: '40px' }}
                viewport={{ once: true }}
                className="clay-card p-6 font-bold uppercase text-center transition-colors cursor-pointer text-sm"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
