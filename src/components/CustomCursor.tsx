import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!isMobile) {
      document.body.style.cursor = 'none';
      document.documentElement.style.cursor = 'none';
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // ... rest of the handlers ...
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('clay-card') ||
        target.classList.contains('clay-button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeaveGlobal = () => setIsVisible(false);
    const handleMouseEnterGlobal = () => setIsVisible(true);

    if (!isMobile) {
      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseleave', handleMouseLeaveGlobal);
      document.addEventListener('mouseenter', handleMouseEnterGlobal);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveGlobal);
      document.removeEventListener('mouseenter', handleMouseEnterGlobal);
      document.body.style.cursor = 'default';
      document.documentElement.style.cursor = 'default';
    };
  }, [isVisible, mouseX, mouseY, isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] backdrop-blur-[2px] border border-white/40 shadow-xl"
      style={{
        x: cursorX,
        y: cursorY,
        left: -16,
        top: -16,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isClicking ? 0.8 : isHovering ? 2 : 1,
        backgroundColor: isHovering 
          ? 'rgba(147, 197, 253, 0.4)' 
          : 'rgba(244, 114, 182, 0.3)',
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 20 },
        opacity: { duration: 0.2 }
      }}
    >
      <div className={`absolute inset-0 rounded-full border-2 ${isHovering ? 'border-blue-400/50' : 'border-pink-400/30'} animate-pulse`} />
    </motion.div>
  );
}
