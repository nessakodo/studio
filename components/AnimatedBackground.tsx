import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedBackgroundProps {
  className?: string;
  mainRef?: React.RefObject<HTMLElement | null>;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = '', mainRef }) => {
  const { scrollYProgress } = useScroll({ target: mainRef, offset: ["start end", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);
  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const y5 = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const y6 = useTransform(scrollYProgress, [0, 1], ['0%', '-70%']);
  const y7 = useTransform(scrollYProgress, [0, 1], ['0%', '90%']);
  const y8 = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);
  const y9 = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradient Blobs */}
      <motion.div
        className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-sage-600 via-mist-500 to-mint-400 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-mist-500 via-sage-500 to-mint-500 opacity-15 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute right-1/3 bottom-1/4 h-[250px] w-[250px] rounded-full bg-gradient-to-br from-mint-400 via-mist-400 to-sage-400 opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: y3 }}
      />
      <motion.div
        className="absolute left-1/4 top-[120vh] h-[350px] w-[350px] rounded-full bg-gradient-to-br from-mint-500 via-mist-500 to-blue-500 opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: y4 }}
      />
      <motion.div
        className="absolute right-0 top-[150vh] h-[350px] w-[350px] rounded-full bg-gradient-to-br from-sage-600 via-violet-500 to-mist-500 opacity-15 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: y5 }}
      />
      <motion.div
        className="absolute left-1/3 top-[180vh] h-[320px] w-[320px] rounded-full bg-gradient-to-br from-mist-500 via-sage-500 to-mint-500 opacity-12 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: y6 }}
      />
      <motion.div
        className="absolute right-1/3 top-[220vh] h-[280px] w-[280px] rounded-full bg-gradient-to-br from-mint-500 via-mist-500 to-sage-500 opacity-15 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: y7 }}
      />
      <motion.div
        className="absolute left-1/4 top-[280vh] h-[400px] w-[400px] rounded-full bg-gradient-to-br from-blue-600 via-sage-500 to-mist-400 opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: y8 }}
      />
      <motion.div
        className="absolute right-1/2 top-[330vh] h-[350px] w-[350px] rounded-full bg-gradient-to-br from-mist-500 via-blue-500 to-mint-500 opacity-12 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: y9 }}
      />
    </div>
  );
};

export default AnimatedBackground; 