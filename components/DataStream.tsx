import React from 'react';
import { motion } from 'framer-motion';

interface DataStreamProps {
  className?: string;
}

const DataStream: React.FC<DataStreamProps> = ({ className = '' }) => {
  const streamVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0.1, 0.2, 0.1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute inset-0"
        variants={streamVariants}
        initial="initial"
        animate="animate"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(127,255,212,0.1)" />
              <stop offset="50%" stopColor="rgba(150,180,200,0.1)" />
              <stop offset="100%" stopColor="rgba(127,255,212,0.1)" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q25,20 50,50 T100,50"
            fill="none"
            stroke="url(#streamGradient)"
            strokeWidth="0.5"
            className="animate-stream"
          />
          <path
            d="M0,30 Q25,60 50,30 T100,30"
            fill="none"
            stroke="url(#streamGradient)"
            strokeWidth="0.5"
            className="animate-stream-delayed"
          />
          <path
            d="M0,70 Q25,40 50,70 T100,70"
            fill="none"
            stroke="url(#streamGradient)"
            strokeWidth="0.5"
            className="animate-stream-delayed-2"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default DataStream; 