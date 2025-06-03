import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MicroExperience from './MicroExperience';
import AnimatedGradientText from './AnimatedGradientText';

interface ExpertiseShardProps {
  title: string;
  initialCopy: string;
  detailedCopy: string;
  microExperience: 'software' | 'security' | 'transform';
  haiku: string;
  delay?: number;
  variantClass?: string;
}

const ExpertiseShard: React.FC<ExpertiseShardProps> = ({
  title,
  initialCopy,
  detailedCopy,
  microExperience,
  haiku,
  delay = 0,
  variantClass = 'expertise-card-variant'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const cardVariants = {
    initial: { scale: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', borderColor: 'rgba(255, 255, 255, 0.1)' },
    hover: { scale: 1.03, backgroundColor: 'rgba(0, 0, 0, 0.4)', borderColor: 'rgba(147, 197, 253, 0.4)' },
    tap: { scale: 0.98 }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.5, delay, ease: "easeInOut" }}
      className={`relative overflow-hidden rounded-xl p-8 border ${variantClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="relative z-10">
        <AnimatedGradientText className="text-2xl md:text-3xl font-bold mb-6" delay={delay + 0.2}>
          {title}
        </AnimatedGradientText>
        
        <AnimatePresence mode="wait">
          {!isHovered && !isExpanded ? (
            <motion.p
              key="initial"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-mist-300 leading-relaxed"
            >
              {initialCopy}
            </motion.p>
          ) : (
            <motion.div
              key="detailed"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              <p className="text-mist-300 leading-relaxed">{detailedCopy}</p>
              <p className="text-sage-400 italic text-sm">{haiku}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8">
          <MicroExperience type={microExperience} isActive={isHovered || isExpanded} />
        </div>
      </div>
    </motion.div>
  );
};

export default ExpertiseShard; 