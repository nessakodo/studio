import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
  threshold?: number;
  id?: string;
  mainRef?: React.RefObject<HTMLElement | null>;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
  threshold = 0.1,
  id,
  mainRef
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mainRef || ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, threshold, 1 - threshold, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`relative ${className}`}
      id={id}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection; 