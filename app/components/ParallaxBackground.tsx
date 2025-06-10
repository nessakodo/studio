import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxBackgroundProps {
  scrollY: number;
  isScrolling: boolean;
}

export default function ParallaxBackground({ scrollY, isScrolling }: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform values for different layers
  const starsY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const particlesY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const lightTrailsY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base starfield */}
      <motion.div
        className="absolute inset-0"
        style={{ y: starsY }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Animated particles */}
      <motion.div
        className="absolute inset-0"
        style={{ y: particlesY }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-mint-400/20 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Light trails */}
      <motion.div
        className="absolute inset-0"
        style={{ y: lightTrailsY }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`trail-${i}`}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-mint-400/20 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 100}px`,
              opacity: isScrolling ? 0.3 : 0,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              opacity: isScrolling ? [0.3, 0.1, 0.3] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
} 