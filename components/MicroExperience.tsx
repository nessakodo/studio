import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Code, GitBranch, Cpu, Lock, Zap } from 'lucide-react';

interface MicroExperienceProps {
  type: 'software' | 'security' | 'transform';
  isActive: boolean;
}

const MicroExperience: React.FC<MicroExperienceProps> = ({ type, isActive }) => {
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const renderExperience = () => {
    switch (type) {
      case 'software':
        return (
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate={isActive ? "pulse" : "initial"}
              className="absolute inset-0"
            >
              <Code size={50} className="text-mint-400" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-2 -right-2"
            >
              <Cpu size={20} className="text-mist-400" />
            </motion.div>
          </motion.div>
        );
      case 'security':
        return (
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate={isActive ? "pulse" : "initial"}
              className="absolute inset-0"
            >
              <Shield size={50} className="text-blue-400" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-2 -right-2"
            >
              <Lock size={20} className="text-sage-400" />
            </motion.div>
          </motion.div>
        );
      case 'transform':
        return (
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate={isActive ? "pulse" : "initial"}
              className="absolute inset-0"
            >
              <GitBranch size={50} className="text-sage-400" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-2 -right-2"
            >
              <Zap size={20} className="text-mint-400" />
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      {renderExperience()}
    </div>
  );
};

export default MicroExperience; 