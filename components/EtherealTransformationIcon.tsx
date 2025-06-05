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
      animate={{ scale: isActive ? 1.05 : 1, opacity: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Digital Transformation: Elegant Network Evolution */}

      {/* Base Processing Element (always visible and pulsing) */}
      <motion.rect
        x="35"
        y="35"
        width="30"
        height="30"
        rx="4"
        ry="4"
        fill="none"
        strokeWidth="2"
        initial={{ opacity: 0.3, scale: 1 }}
        animate={{ 
          opacity: [0.3, 0.4, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Initial State: Simple Network */}
      <motion.g
        initial={{ opacity: 0.9 }}
        animate={{ opacity: isActive ? 0.3 : 0.9 }}
        transition={{ duration: 0.4 }}
      >
        {/* Central Node */}
        <motion.circle cx="50" cy="50" r="8" />
        
        {/* Basic Connections */}
        <motion.path
          d="M 50 50 L 30 30 M 50 50 L 70 30 M 50 50 L 30 70 M 50 50 L 70 70"
          initial={{ pathLength: 1 }}
          animate={{ pathLength: isActive ? 0.3 : 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Simple Nodes (pulsating on default) */}
        <motion.circle cx="30" cy="30" r="4"
           animate={{
             opacity: [0.8, 0.9, 0.8],
             scale: [1, 1.05, 1]
           }}
           transition={{
             duration: 2,
             repeat: Infinity,
             ease: "easeInOut"
           }}
        />
        <motion.circle cx="70" cy="30" r="4"
           animate={{
             opacity: [0.8, 0.9, 0.8],
             scale: [1, 1.05, 1]
           }}
           transition={{
             duration: 2,
             repeat: Infinity,
             ease: "easeInOut",
             delay: 0.3
           }}
        />
        <motion.circle cx="30" cy="70" r="4"
           animate={{
             opacity: [0.8, 0.9, 0.8],
             scale: [1, 1.05, 1]
           }}
           transition={{
             duration: 2,
             repeat: Infinity,
             ease: "easeInOut",
             delay: 0.6
           }}
        />
        <motion.circle cx="70" cy="70" r="4"
           animate={{
             opacity: [0.8, 0.9, 0.8],
             scale: [1, 1.05, 1]
           }}
           transition={{
             duration: 2,
             repeat: Infinity,
             ease: "easeInOut",
             delay: 0.9
           }}
        />
      </motion.g>

      {/* Transformed State: Enhanced Network */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.8
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Central Hub */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="12"
          initial={{ scale: 0 }}
          animate={{ scale: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Outer Ring */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="40"
          fill="none"
          strokeWidth="2"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: isActive ? 1 : 0,
            rotate: isActive ? 360 : 0
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Network Nodes */}
        <motion.g>
          {/* Primary Nodes */}
          <motion.circle cx="50" cy="10" r="4"
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
          <motion.circle cx="90" cy="50" r="4"
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
          <motion.circle cx="50" cy="90" r="4"
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
          <motion.circle cx="10" cy="50" r="4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isActive ? [0.6, 0.8, 0.6] : 0,
              scale: isActive ? [1, 1.2, 1] : 0
            }}
            transition={{ 
              duration: 2,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </motion.g>

        {/* Network Connections */}
        <motion.path
          d="M 50 50 L 50 10 M 50 50 L 90 50 M 50 50 L 50 90 M 50 50 L 10 50"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.path
          d="M 50 10 L 90 50 L 50 90 L 10 50 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </motion.g>

    </motion.svg>
  );
};

export default EtherealTransformationIcon; 