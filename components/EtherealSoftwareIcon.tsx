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

      {/* Base Layer (always visible and pulsing) */}
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

      {/* Stack Layers (cascading fade in default) */}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.1, ease: "easeOut" }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
      </motion.g>

      {/* Processing Elements (visible and animated on hover) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Main Processing Block */}
        <motion.rect
          x="20"
          y="20"
          width="60"
          height="60"
          rx="6"
          ry="6"
          fill="none"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Internal Data Flow / Connections */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.line x1="30" y1="30" x2="70" y2="70" strokeWidth="1.5" />
          <motion.line x1="70" y1="30" x2="30" y2="70" strokeWidth="1.5" />
          <motion.circle cx="50" cy="50" r="4" strokeWidth="1.5"/>
        </motion.g>

        {/* Pulsing Nodes (on hover) */}
        <motion.g>
          <motion.circle
            cx="30"
            cy="30"
            r="3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isActive ? { 
              opacity: [0.6, 0.9, 0.6],
              scale: [1, 1.2, 1]
            } : { opacity: 0, scale: 0.5 }}
            transition={isActive ? { 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            } : { duration: 0.3 }}
          />
           <motion.circle
            cx="70"
            cy="30"
            r="3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isActive ? { 
              opacity: [0.6, 0.9, 0.6],
              scale: [1, 1.2, 1]
            } : { opacity: 0, scale: 0.5 }}
            transition={isActive ? { 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            } : { duration: 0.3 }}
          />
           <motion.circle
            cx="30"
            cy="70"
            r="3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isActive ? { 
              opacity: [0.6, 0.9, 0.6],
              scale: [1, 1.2, 1]
            } : { opacity: 0, scale: 0.5 }}
            transition={isActive ? { 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4
            } : { duration: 0.3 }}
          />
           <motion.circle
            cx="70"
            cy="70"
            r="3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isActive ? { 
              opacity: [0.6, 0.9, 0.6],
              scale: [1, 1.2, 1]
            } : { opacity: 0, scale: 0.5 }}
            transition={isActive ? { 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6
            } : { duration: 0.3 }}
          />
        </motion.g>

      </motion.g>

    </motion.svg>
  );
};

export default EtherealSoftwareIcon; 