"use client";

import { motion } from 'framer-motion';
import React from 'react';

interface EtherealIconProps {
  isActive: boolean;
}

const EtherealSecurityIcon: React.FC<EtherealIconProps> = ({
  isActive
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
      className="w-32 h-32 text-mint-400 drop-shadow-[0_0_8px_rgba(108,200,170,0.6)]"
      animate={{ scale: isActive ? 1.2 : 1, opacity: isActive ? 1 : 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Security Intelligence: Target/Scope Icon */}

      {/* Outer Circle (always visible) */}
       <motion.circle cx="50" cy="50" r="40"
        initial={{ opacity: 0.7, scale: 1 }} // Clearly visible by default
        animate={{ opacity: isActive ? 1 : 0.7, scale: isActive ? 1.05 : 1 }} // Subtle growth on hover
        transition={{ duration: 0.4, ease: "easeOut" }}
       />

       {/* Middle Ring (visible by default) */}
       <motion.circle cx="50" cy="50" r="25"
         initial={{ opacity: 0.8, scale: 1 }} // Visible by default
         animate={{ opacity: isActive ? 1 : 0.8, scale: isActive ? 1.05 : 1 }} // Subtle growth on hover
         transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
       />

       {/* Inner Circle (Target center) */}
       <motion.circle cx="50" cy="50" r="10"
         initial={{ opacity: 1, scale: 1 }} // Always visible
         animate={{ scale: isActive ? 1.3 : 1 }} // Grows on hover
         transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
       />

       {/* Crosshairs (always visible base) */}
       <motion.line x1="50" y1="10" x2="50" y2="90"
         initial={{ opacity: 0.6 }}
         animate={{ opacity: isActive ? 1 : 0.6 }}
         transition={{ duration: 0.4, ease: "easeOut" }}
       />
        <motion.line x1="10" y1="50" x2="90" y2="50"
         initial={{ opacity: 0.6 }}
         animate={{ opacity: isActive ? 1 : 0.6 }}
         transition={{ duration: 0.4, ease: "easeOut" }}
       />

       {/* Corner Markers (appear and animate on hover) */}
       <motion.path
         d="M 20 20 L 30 20 L 30 30 M 80 20 L 70 20 L 70 30 M 20 80 L 30 80 L 30 70 M 80 80 L 70 80 L 70 70"
         initial={{ opacity: 0, pathLength: 0 }} // Hidden by default
         animate={{ opacity: isActive ? 1 : 0, pathLength: isActive ? 1 : 0 }}
         transition={{ duration: 0.5, delay: isActive ? 0.2 : 0, ease: "easeOut" }}
       />

        {/* Inner Crosshair Detail (appear on hover) */}
       <motion.line x1="50" y1="35" x2="50" y2="65"
         initial={{ opacity: 0, scaleY: 0 }} // Hidden by default
         animate={{ opacity: isActive ? 0.8 : 0, scaleY: isActive ? 1 : 0 }}
         transition={{ duration: 0.4, delay: isActive ? 0.3 : 0, ease: "easeOut" }}
         style={{ transformOrigin: 'center' }}
       />
        <motion.line x1="35" y1="50" x2="65" y2="50"
         initial={{ opacity: 0, scaleX: 0 }} // Hidden by default
         animate={{ opacity: isActive ? 0.8 : 0, scaleX: isActive ? 1 : 0 }}
         transition={{ duration: 0.4, delay: isActive ? 0.4 : 0, ease: "easeOut" }}
         style={{ transformOrigin: 'center' }}
       />

    </motion.svg>
  );
};

export default EtherealSecurityIcon; 