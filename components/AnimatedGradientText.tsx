import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  children,
  className = '',
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`animate-gradient-x bg-clip-text text-transparent bg-gradient-to-r from-sage-400 via-mint-400 to-sage-400 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedGradientText; 