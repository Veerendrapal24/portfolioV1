import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const blobs = [
    { color: 'bg-clay-blue', size: 'w-[500px] h-[500px]', initial: { x: '-10%', y: '10%' }, speed: 0.2 },
    { color: 'bg-clay-pink', size: 'w-[400px] h-[400px]', initial: { x: '80%', y: '20%' }, speed: -0.15 },
    { color: 'bg-clay-purple', size: 'w-[600px] h-[600px]', initial: { x: '20%', y: '70%' }, speed: 0.1 },
    { color: 'bg-clay-green', size: 'w-[450px] h-[450px]', initial: { x: '70%', y: '80%' }, speed: -0.25 },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {blobs.map((blob, i) => {
        const yOffset = useTransform(scrollYProgress, [0, 1], [0, 500 * blob.speed]);
        
        return (
          <motion.div
            key={i}
            initial={blob.initial}
            style={{
              y: yOffset,
              x: blob.initial.x,
              top: blob.initial.y,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute rounded-full blur-[100px] opacity-30 ${blob.color} ${blob.size}`}
          />
        );
      })}
      
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
