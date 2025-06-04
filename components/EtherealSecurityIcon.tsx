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
      {/* Abstract Shield/Barrier Symbol */}
      <motion.path
         d="M 20 30 Q 20 10, 40 10 L 60 10 Q 80 10, 80 30 L 80 70 Q 80 90, 60 90 L 40 90 Q 20 90, 20 70 L 20 30 Z"
         initial={{ pathLength: 0 }}
         animate={{ pathLength: isActive ? 1 : 0 }}
         transition={{ duration: 1.2, delay: isActive ? 0.2 : 0, ease: "easeInOut" }}
      />
       <motion.circle cx="50" cy="50" r="15"
        initial={{ scale: 0 }}
        animate={{ scale: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, delay: isActive ? 0.8 : 0, ease: "easeOut" }}
       />
       <motion.line x1="40" y1="50" x2="60" y2="50"
         initial={{ scaleX: 0 }}
         animate={{ scaleX: isActive ? 1 : 0 }}
         transition={{ duration: 0.4, delay: isActive ? 1 : 0, ease: "easeOut" }}
         style={{ transformOrigin: 'center'}}
       />
    </motion.svg>
  );
};

export default EtherealSecurityIcon; 