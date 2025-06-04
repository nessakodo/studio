"use client";

import { motion } from 'framer-motion';
import React from 'react';

interface EtherealIconProps {
  isActive: boolean;
}

const EtherealTransformationIcon: React.FC<EtherealIconProps> = ({
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
      {/* Abstract Transformation/Nodes Symbol */}
       <motion.circle cx="30" cy="30" r="10"
        initial={{ scale: 0 }}
        animate={{ scale: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.5, delay: isActive ? 0.2 : 0, ease: "easeOut" }}
       />
        <motion.circle cx="70" cy="30" r="10"
        initial={{ scale: 0 }}
        animate={{ scale: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.5, delay: isActive ? 0.4 : 0, ease: "easeOut" }}
       />
       <motion.circle cx="50" cy="70" r="10"
        initial={{ scale: 0 }}
        animate={{ scale: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.5, delay: isActive ? 0.6 : 0, ease: "easeOut" }}
       />
        <motion.line x1="30" y1="30" x2="70" y2="30"
         initial={{ pathLength: 0 }}
         animate={{ pathLength: isActive ? 1 : 0 }}
         transition={{ duration: 0.6, delay: isActive ? 0.8 : 0, ease: "easeOut" }}
       />
       <motion.line x1="30" y1="30" x2="50" y2="70"
         initial={{ pathLength: 0 }}
         animate={{ pathLength: isActive ? 1 : 0 }}
         transition={{ duration: 0.6, delay: isActive ? 1 : 0, ease: "easeOut" }}
       />
        <motion.line x1="70" y1="30" x2="50" y2="70"
         initial={{ pathLength: 0 }}
         animate={{ pathLength: isActive ? 1 : 0 }}
         transition={{ duration: 0.6, delay: isActive ? 1.2 : 0, ease: "easeOut" }}
       />
    </motion.svg>
  );
};

export default EtherealTransformationIcon; 