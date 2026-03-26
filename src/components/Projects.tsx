import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import TextReveal from './TextReveal';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const projectsData = [
  {
    id: 'hotel',
    title: 'Hotel Management',
    description: 'Automated booking, guest tracking, and billing system. Reduced reservation processing time by 40%.',
    tech: ['C++', 'OOP', 'DSA'],
    color: 'clay-blue',
    link: 'https://github.com/Veerendrapal24',
    image: '/hotel.jpg',
    size: 'md:col-span-8'
  },
  {
    id: 'memory',
    title: 'Memory Visualizer',
    description: 'OS memory allocation analyzer supporting partitioning and paging.',
    tech: ['C', 'Python', 'NumPy'],
    color: 'clay-pink',
    link: 'https://github.com/Veerendrapal24',
    image: '/memory allocation.png',
    size: 'md:col-span-4'
  },
  {
    id: 'systems',
    title: 'Systems Core',
    description: 'Deep dive into operating systems and database management systems.',
    tech: ['DBMS', 'OS', 'Networks'],
    color: 'clay-yellow',
    link: 'https://github.com/Veerendrapal24',
    image: '/systemcore.png',
    size: 'md:col-span-12'
  }
];

export default function Projects() {
  return (
    <section className="py-24 px-6 md:px-20 bg-clay-bg text-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
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
              05
            </motion.span>
            <TextReveal 
              text="Selected Works" 
              className="text-4xl font-extrabold uppercase mt-4 text-blue-800"
            />
            <div className="w-12 h-2 bg-blue-800/20 rounded-full mt-4" />
          </motion.div>
          
          <div className="flex flex-col items-end gap-4">
            <p className="text-xl font-bold uppercase max-w-xs text-right text-slate-400">
              A collection of systems and AI focused projects.
            </p>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }
                }
              }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 40px 80px rgba(0,0,0,0.1)"
              }}
              className={`${project.size} clay-card bg-white overflow-hidden group min-h-[400px] flex flex-col`}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 clay-card bg-white/80 backdrop-blur-sm text-slate-700 hover:text-clay-blue transition-colors"
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 clay-card bg-white/80 backdrop-blur-sm text-slate-700 hover:text-clay-blue transition-colors"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-3xl font-extrabold text-slate-800 uppercase tracking-tight mb-4">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-lg mb-8">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.tech.map((t) => (
                    <span key={t} className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest ${project.color} text-slate-700`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
