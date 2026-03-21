import { motion } from 'motion/react';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
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
    prompt: 'A high-quality 3D claymorphism illustration of a modern hotel building with soft rounded edges, pastel blue and white colors, minimalist interface elements floating around it, professional lighting, clean background, soft shadows.',
    size: 'md:col-span-8'
  },
  {
    id: 'memory',
    title: 'Memory Visualizer',
    description: 'OS memory allocation analyzer supporting partitioning and paging.',
    tech: ['C', 'Python', 'NumPy'],
    color: 'clay-pink',
    link: 'https://github.com/Veerendrapal24',
    prompt: 'A high-quality 3D claymorphism illustration representing computer memory blocks, soft colorful cubes arranged in a grid, some cubes highlighted in pastel pink, minimalist data visualization style, clean background, soft shadows.',
    size: 'md:col-span-4'
  },
  {
    id: 'systems',
    title: 'Systems Core',
    description: 'Deep dive into operating systems and database management systems.',
    tech: ['DBMS', 'OS', 'Networks'],
    color: 'clay-yellow',
    link: 'https://github.com/Veerendrapal24',
    prompt: 'A high-quality 3D claymorphism illustration of interconnected gears and circuits, soft rounded mechanical parts, pastel yellow and grey colors, representing systems architecture and core computing, clean background, soft shadows.',
    size: 'md:col-span-12'
  }
];

export default function Projects() {
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [hasKeyError, setHasKeyError] = useState(false);

  const isGenerating = useRef(false);

  const generateProjectImages = async () => {
    if (isGenerating.current) return;
    isGenerating.current = true;
    
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    setHasKeyError(false);
    
    // Process projects sequentially to avoid hitting rate limits
    for (const project of projectsData) {
      // Skip if already loaded (unless we want to force refresh)
      if (images[project.id] && !images[project.id].includes('picsum')) continue;
      
      setLoading(prev => ({ ...prev, [project.id]: true }));
      
      let success = false;
      let retries = 0;
      const maxRetries = 3;
      
      while (!success && retries < maxRetries) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
              parts: [{ text: project.prompt }]
            },
            config: {
              imageConfig: {
                aspectRatio: "1:1"
              }
            }
          });

          const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
          if (imagePart?.inlineData) {
            const base64Data = imagePart.inlineData.data;
            setImages(prev => ({ ...prev, [project.id]: `data:image/png;base64,${base64Data}` }));
            success = true;
          } else {
            throw new Error('No image data in response');
          }
        } catch (error: any) {
          console.error(`Error generating image for ${project.id} (Attempt ${retries + 1}):`, error);
          
          const isQuotaError = error?.message?.includes('429') || error?.status === 'RESOURCE_EXHAUSTED';
          const isPermissionError = error?.message?.includes('403') || error?.message?.includes('PERMISSION_DENIED');

          if (isPermissionError) {
            setHasKeyError(true);
            break; // Don't retry on permission errors
          }

          if (isQuotaError && retries < maxRetries - 1) {
            // Exponential backoff: 2s, 4s, 8s...
            const delay = Math.pow(2, retries + 1) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            retries++;
            continue;
          }

          // If we're here, it's either not a quota error or we've exhausted retries
          setImages(prev => ({ ...prev, [project.id]: `https://picsum.photos/seed/${project.id}/800/600` }));
          break;
        }
      }
      
      setLoading(prev => ({ ...prev, [project.id]: false }));
      
      // Add a small delay between successful generations to be safe
      if (success) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    isGenerating.current = false;
  };

  useEffect(() => {
    generateProjectImages();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      generateProjectImages();
    }
  };

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
            {hasKeyError && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleSelectKey}
                className="clay-button clay-pink text-red-800 text-xs py-2 px-6 font-bold uppercase tracking-widest"
              >
                Enable Image Generation (API Key)
              </motion.button>
            )}
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
                {loading[project.id] ? (
                  <div className="absolute inset-0 bg-slate-100/50 animate-pulse flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full">
                      {/* Abstract clay shapes for skeleton */}
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full ${project.color} opacity-20 blur-xl`} />
                      <div className={`absolute top-1/4 left-1/4 w-16 h-16 rounded-3xl ${project.color} opacity-10 blur-lg rotate-12`} />
                      <div className={`absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full ${project.color} opacity-15 blur-md`} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="animate-spin text-slate-300" size={32} />
                    </div>
                  </div>
                ) : images[project.id] ? (
                  <img 
                    src={images[project.id]} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-100" />
                )}
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
