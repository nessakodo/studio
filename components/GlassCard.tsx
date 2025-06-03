import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  onClick
}) => {
  return (
    <motion.div
      className={`
        backdrop-blur-md bg-black/20 border border-white/10
        rounded-lg overflow-hidden
        ${hoverEffect ? 'transition-all duration-300 hover:bg-black/30 hover:border-white/20' : ''}
        ${className}
      `}
      whileHover={hoverEffect ? {
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
      onClick={onClick}
    >
      <div className="relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sage-400/5 via-mist-400/5 to-mint-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default GlassCard; 