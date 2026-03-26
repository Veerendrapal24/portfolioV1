import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const smoothX = useSpring(mousePosition.x, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mousePosition.y, { damping: 20, stiffness: 100 });

  const blobs = [
    { color: 'bg-blue-300', size: 'w-[600px] h-[600px]', initial: { x: '-10%', y: '10%' }, speed: 0.15 },
    { color: 'bg-rose-300', size: 'w-[500px] h-[500px]', initial: { x: '80%', y: '15%' }, speed: -0.1 },
    { color: 'bg-violet-300', size: 'w-[700px] h-[700px]', initial: { x: '20%', y: '60%' }, speed: 0.2 },
    { color: 'bg-emerald-300', size: 'w-[550px] h-[550px]', initial: { x: '75%', y: '80%' }, speed: -0.2 },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-slate-50">
      {/* Animated Grid */}
      <div 
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(#e2e8f0 1.5px, transparent 1.5px), linear-gradient(90deg, #e2e8f0 1.5px, transparent 1.5px)`,
          backgroundSize: '80px 80px',
        }}
      />
      
      {/* Floating Blobs */}
      {blobs.map((blob, i) => {
        const yOffset = useTransform(scrollYProgress, [0, 1], [0, 600 * blob.speed]);
        
        return (
          <motion.div
            key={i}
            initial={blob.initial}
            style={{
              y: yOffset,
              x: blob.initial.x,
              top: blob.initial.y,
              translateX: smoothX,
              translateY: smoothY,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute rounded-full blur-[140px] opacity-[0.25] ${blob.color} ${blob.size}`}
          />
        );
      })}

      {/* Floating Geometric Clay Shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            rotate: Math.random() * 360,
            scale: 0.4 + Math.random() * 0.4
          }}
          animate={{
            y: [`${Math.random() * 10}%`, `${Math.random() * 90}%`],
            x: [`${Math.random() * 10}%`, `${Math.random() * 90}%`],
            rotate: [0, 360],
          }}
          transition={{
            duration: 40 + Math.random() * 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute w-40 h-40 rounded-[3rem] border-8 border-white opacity-20 shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff]`}
          style={{
            background: i % 2 === 0 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(203, 213, 225, 0.2)',
          }}
        />
      ))}
      
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
