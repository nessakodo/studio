import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface ShowcaseInteractiveBackgroundProps {
  isAnyCardHovered: boolean;
  // Potentially add props for hovered card index or position later
}

export default function ShowcaseInteractiveBackground({
  isAnyCardHovered,
}: ShowcaseInteractiveBackgroundProps) {
  const [isClient, setIsClient] = useState(false);
  const [lineElements, setLineElements] = useState<Array<{id: number, initialX: number, initialY: number, initialRotate: number, duration: number, delay: number}>>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  // Use window scroll for parallax relative to the viewport
  const { scrollYProgress: pageScrollYProgress } = useScroll();

  // Initialize positions and animation properties on mount
  useEffect(() => {
    setIsClient(true);
    const elements = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      initialRotate: Math.random() * 360,
      duration: 20 + Math.random() * 30, // Longer duration for slower, ethereal movement
      delay: Math.random() * 20, // Longer delay for staggered start
    }));
    setLineElements(elements);
  }, []);

  // Parallax transform based on page scroll
  const parallaxY = useTransform(pageScrollYProgress, [0, 1], ['0vh', '100vh']);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" ref={containerRef} style={{ y: parallaxY }}>
      {/* Subtle base texture/dots - Barely visible normally, subtle fade in on hover */}
       <motion.div
        className="absolute inset-0"
        style={{backgroundImage: 'radial-gradient(#365346 0.5px, transparent 0.5px)', backgroundSize: '30px 30px'}}
        initial={{opacity: 0.005}}
        animate={{opacity: isAnyCardHovered ? 0.02 : 0.005}}
        transition={{duration: 1.5}}
      />

      {/* Removed Primary interactive gradient (green orb) */}

      {/* Abstract lines/connections with orbiting animation */}
      {isClient && lineElements.map((el) => (
        <motion.div
          key={`line-${el.id}`}
          className="absolute bg-mint-400 rounded-full"
          initial={{ 
            x: `${el.initialX}vw`, 
            y: `${el.initialY}vh`, 
            width: '0.5px',
            height: '1px',
            opacity: 0,
            rotate: el.initialRotate
          }}
          animate={{
            x: [el.initialX, Math.random() * 100, Math.random() * 100, Math.random() * 100, el.initialX].map(val => `${val}vw`),
            y: [el.initialY, Math.random() * 100, Math.random() * 100, Math.random() * 100, el.initialY].map(val => `${val}vh`),
            opacity: isAnyCardHovered ? [0.7, 1, 0.7, 0.7, 0.7] : [0, 0.15, 0.1, 0.15, 0],
            rotate: el.initialRotate + 720,
            width: isAnyCardHovered ? '4px' : '0.8px',
            height: isAnyCardHovered ? '80px' : '2px',
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: el.delay,
          }}
          style={{
            transformOrigin: "50% 50% 0"
          }}
        />
      ))}

    </div>
  );
} 