import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

const NUM_PARTICLES = 100;
const CONTAINER_HEIGHT = 600; // Adjust based on your section height

const generateParticles = (): Particle[] => {
  const particles: Particle[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100, // Initial X position (percentage)
      y: Math.random() * CONTAINER_HEIGHT, // Initial Y position (pixels)
      size: 2 + Math.random() * 4, // Particle size between 2px and 6px
      opacity: 0.2 + Math.random() * 0.4, // Opacity between 0.2 and 0.6
      duration: 20 + Math.random() * 30, // Animation duration between 20s and 50s
      delay: Math.random() * 20, // Animation delay up to 20s
    });
  }
  return particles;
};

export default function AstralStreamBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setParticles(generateParticles());
  }, []);

  // Animation variants for particles
  const particleVariants = {
    animate: (particle: Particle) => ({
      x: [particle.x, particle.x - 50], // Move horizontally (e.g., drift left by 50%)
      opacity: [particle.opacity, particle.opacity * 0.8, particle.opacity],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: particle.duration,
          ease: "linear",
          delay: particle.delay,
        },
        opacity: {
             repeat: Infinity,
             repeatType: "mirror",
             duration: particle.duration / 5,
             ease: "easeInOut",
             delay: particle.delay,
        }
      },
    }),
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ height: CONTAINER_HEIGHT }}> {/* Position absolutely behind content */}
      {isClient && particles.map(particle => (
        <motion.div
          key={particle.id}
          className="rounded-full bg-mint-400/50 blur-sm"
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}px`,
            width: particle.size,
            height: particle.size,
          }}
          variants={particleVariants}
          animate="animate"
          custom={particle}
        />
      ))}
    </div>
  );
} 