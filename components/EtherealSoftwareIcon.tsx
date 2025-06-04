"use client";

import { motion } from 'framer-motion';
import React from 'react';

interface EtherealIconProps {
  isActive: boolean;
}

const EtherealSoftwareIcon: React.FC<EtherealIconProps> = ({
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
      {/* Abstract Code/Network Node Symbol */}
      <motion.path
         d="M 20 50 L 40 50 M 60 50 L 80 50 M 50 20 L 50 40 M 50 60 L 50 80 M 40 40 L 20 20 M 60 40 L 80 20 M 40 60 L 20 80 M 60 60 L 80 80"
         initial={{ pathLength: 0 }}
         animate={{ pathLength: isActive ? 1 : 0 }}
         transition={{ duration: 1, delay: isActive ? 0.2 : 0, ease: "easeInOut" }}
      />
       <motion.circle cx="50" cy="50" r="10"
        initial={{ scale: 0 }}
        animate={{ scale: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, delay: isActive ? 0.8 : 0, ease: "easeOut" }}
       />
    </motion.svg>
  );
};

export default EtherealSoftwareIcon; 