import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ShowcaseInteractiveBackgroundProps {
  isAnyCardHovered: boolean;
  // Potentially add props for hovered card index or position later
}

export default function ShowcaseInteractiveBackground({
  isAnyCardHovered,
}: ShowcaseInteractiveBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle base texture/dots - Barely visible normally, subtle fade in on hover */}
       <motion.div
        className="absolute inset-0"
        style={{backgroundImage: 'radial-gradient(#365346 0.5px, transparent 0.5px)', backgroundSize: '30px 30px'}}
        initial={{opacity: 0.005}}
        animate={{opacity: isAnyCardHovered ? 0.02 : 0.005}}
        transition={{duration: 1.5}}
      />

      {/* Removed Primary interactive gradient (green orb) */}

      {/* Abstract lines/connections - More reactive and visible on hover, invisible otherwise */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute bg-mint-400 rounded-full"
          initial={{ 
            x: `${Math.random() * 100}vw`, 
            y: `${Math.random() * 100}vh`, 
            width: isAnyCardHovered ? '3px' : '0.5px',
            height: isAnyCardHovered ? '60px' : '1px',
            opacity: isAnyCardHovered ? 0.6 : 0,
            rotate: Math.random() * 360
          }}
           animate={{
            x: isAnyCardHovered ? `${Math.random() * 100}vw` : `${Math.random() * 100}vw`,
            y: isAnyCardHovered ? `${Math.random() * 100}vh` : `${Math.random() * 100}vh`,
            opacity: isAnyCardHovered ? [0.6, 0.9, 0.6] : 0,
            transition: { 
              duration: isAnyCardHovered ? 1.5 + Math.random() * 1.5 : 0.4,
              repeat: isAnyCardHovered ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          transition={{
             duration: 0.5,
             delay: isAnyCardHovered ? i * 0.02 : i * 0.005,
          }}
           style={{
               originX: 0.5,
               originY: 0.5,
           }}
        />
      ))}

    </div>
  );
} 