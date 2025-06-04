"use client";

import { motion } from 'framer-motion';
import React from 'react';

interface EtherealIconProps {
  isActive: boolean;
  className?: string;
}

const EtherealTransformationIcon: React.FC<EtherealIconProps> = ({
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
      animate={{ scale: isActive ? 1.2 : 1, opacity: isActive ? 1 : 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Abstract Transformation/Nodes Symbol - Enhanced default visibility */}
       {/* Nodes (visible by default) */}
       <motion.circle cx="30" cy="30" r="8"
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.8 }}
        transition={{ duration: 0.5, delay: isActive ? 0.2 : 0, ease: "easeOut" }}
       />
        <motion.circle cx="70" cy="30" r="8"
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.8 }}
        transition={{ duration: 0.5, delay: isActive ? 0.3 : 0, ease: "easeOut" }}
       />
       <motion.circle cx="50" cy="70" r="8"
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.8 }}
        transition={{ duration: 0.5, delay: isActive ? 0.4 : 0, ease: "easeOut" }}
       />
        {/* Connecting Lines (visible by default) */}
        <motion.line x1="30" y1="30" x2="70" y2="30"
         initial={{ pathLength: 1, opacity: 0.6 }}
         animate={{ pathLength: 1, opacity: isActive ? 1 : 0.6 }}
         transition={{ duration: 0.6, delay: isActive ? 0.5 : 0, ease: "easeOut" }}
       />
       <motion.line x1="30" y1="30" x2="50" y2="70"
         initial={{ pathLength: 1, opacity: 0.6 }}
         animate={{ pathLength: 1, opacity: isActive ? 1 : 0.6 }}
         transition={{ duration: 0.6, delay: isActive ? 0.6 : 0, ease: "easeOut" }}
       />
        <motion.line x1="70" y1="30" x2="50" y2="70"
         initial={{ pathLength: 1, opacity: 0.6 }}
         animate={{ pathLength: 1, opacity: isActive ? 1 : 0.6 }}
         transition={{ duration: 0.6, delay: isActive ? 0.7 : 0, ease: "easeOut" }}
       />

       {/* Pulse/Flowing effect (appears on hover) */}
       <motion.path
         d="M 30 30 Q 50 10, 70 30 Q 90 50, 70 70 Q 50 90, 30 70 Q 10 50, 30 30"
         strokeWidth="2"
         initial={{ pathLength: 0, opacity: 0 }}
         animate={{ pathLength: isActive ? 1 : 0, opacity: isActive ? 0.7 : 0 }}
         transition={{ duration: 1, delay: isActive ? 0.8 : 0, ease: "easeOut" }}
       />

    </motion.svg>
  );
};

export default EtherealTransformationIcon; 