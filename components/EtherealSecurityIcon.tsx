"use client";

import { motion } from 'framer-motion';
import React from 'react';

interface EtherealIconProps {
  isActive: boolean;
  className?: string;
}

const EtherealSecurityIcon: React.FC<EtherealIconProps> = ({
  isActive,
  className
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || "w-32 h-32 text-mint-400 drop-shadow-[0_0_8px_rgba(108,200,170,0.6)]"}
      animate={{ scale: isActive ? 1.1 : 1, opacity: isActive ? 1 : 0.8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Security Intelligence: Protective Net/Barrier */}

      {/* Outer diamond grid (visible by default) */}
      <motion.path
        d="M 50 10 L 90 50 L 50 90 L 10 50 Z M 50 30 L 70 50 L 50 70 L 30 50 Z"
        initial={{ opacity: 0.7, pathLength: 1 }}
        animate={{ opacity: isActive ? 1 : 0.7, scale: isActive ? 1.05 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: 'center'}}
      />

      {/* Central pulsing node (animates on hover) */}
      <motion.circle cx="50" cy="50" r="8"
         initial={{ opacity: 0, scale: 0.5 }}
         animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1.5 : 0.5, transition: { repeat: Infinity, duration: 1, ease: "easeInOut" } }}
         transition={{ duration: 0.6, delay: isActive ? 0.2 : 0 }}
       />

       {/* Scanning/Data lines (appear and animate on hover) */}
       <motion.line x1="50" y1="50" x2="50" y2="20"
         initial={{ opacity: 0, pathLength: 0 }}
         animate={{ opacity: isActive ? 0.8 : 0, pathLength: isActive ? 1 : 0 }}
         transition={{ duration: 0.4, delay: isActive ? 0.4 : 0, ease: "easeOut" }}
       />
       <motion.line x1="50" y1="50" x2="80" y2="50"
         initial={{ opacity: 0, pathLength: 0 }}
         animate={{ opacity: isActive ? 0.8 : 0, pathLength: isActive ? 1 : 0 }}
         transition={{ duration: 0.4, delay: isActive ? 0.5 : 0, ease: "easeOut" }}
       />
        <motion.line x1="50" y1="50" x2="50" y2="80"
         initial={{ opacity: 0, pathLength: 0 }}
         animate={{ opacity: isActive ? 0.8 : 0, pathLength: isActive ? 1 : 0 }}
         transition={{ duration: 0.4, delay: isActive ? 0.6 : 0, ease: "easeOut" }}
       />
       <motion.line x1="50" y1="50" x2="20" y2="50"
         initial={{ opacity: 0, pathLength: 0 }}
         animate={{ opacity: isActive ? 0.8 : 0, pathLength: isActive ? 1 : 0 }}
         transition={{ duration: 0.4, delay: isActive ? 0.7 : 0, ease: "easeOut" }}
       />

    </motion.svg>
  );
};

export default EtherealSecurityIcon; 