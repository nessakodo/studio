"use client";

import { motion } from 'framer-motion';
import React from 'react';

interface EtherealIconProps {
  isActive: boolean;
  className?: string;
}

const EtherealSoftwareIcon: React.FC<EtherealIconProps> = ({
  isActive,
  className
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || "w-32 h-32 text-mint-400 drop-shadow-[0_0_8px_rgba(108,200,170,0.6)]"}
      animate={{ scale: isActive ? 1.05 : 1, opacity: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Future-Proof Software: Modern Stack with Dynamic Processing */}

      {/* Base Layer (always visible) */}
      <motion.rect
        x="20"
        y="60"
        width="60"
        height="8"
        rx="2"
        ry="2"
        fill="none"
        strokeWidth="2"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Stack Layers */}
      <motion.g
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: isActive ? 0.3 : 1, y: isActive ? -10 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Layer 1 */}
        <motion.rect
          x="25"
          y="50"
          width="50"
          height="8"
          rx="2"
          ry="2"
          fill="none"
          strokeWidth="2"
          transition={{ duration: 0.3 }}
        />
        
        {/* Layer 2 */}
        <motion.rect
          x="30"
          y="40"
          width="40"
          height="8"
          rx="2"
          ry="2"
          fill="none"
          strokeWidth="2"
          transition={{ duration: 0.3, delay: 0.1 }}
        />

        {/* Layer 3 */}
        <motion.rect
          x="35"
          y="30"
          width="30"
          height="8"
          rx="2"
          ry="2"
          fill="none"
          strokeWidth="2"
          transition={{ duration: 0.3, delay: 0.2 }}
        />
      </motion.g>

      {/* Processing Elements (visible on hover) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Processing Container */}
        <motion.rect
          x="25"
          y="25"
          width="50"
          height="50"
          rx="4"
          ry="4"
          fill="none"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Processing Lines */}
        <motion.path
          d="M 30 35 L 70 35 M 30 45 L 70 45 M 30 55 L 70 55"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Processing Indicators */}
        <motion.g>
          <motion.circle
            cx="35"
            cy="35"
            r="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isActive ? [0.6, 0.8, 0.6] : 0,
              scale: isActive ? [1, 1.2, 1] : 0
            }}
            transition={{ 
              duration: 2,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
          <motion.circle
            cx="50"
            cy="35"
            r="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isActive ? [0.6, 0.8, 0.6] : 0,
              scale: isActive ? [1, 1.2, 1] : 0
            }}
            transition={{ 
              duration: 2,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.circle
            cx="65"
            cy="35"
            r="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isActive ? [0.6, 0.8, 0.6] : 0,
              scale: isActive ? [1, 1.2, 1] : 0
            }}
            transition={{ 
              duration: 2,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
              delay: 1.0
            }}
          />
        </motion.g>

        {/* Code Indicators */}
        <motion.g>
          <motion.line
            x1="30"
            y1="45"
            x2="40"
            y2="45"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          />
          <motion.line
            x1="30"
            y1="55"
            x2="40"
            y2="55"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          />
        </motion.g>
      </motion.g>

    </motion.svg>
  );
};

export default EtherealSoftwareIcon; 