import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkle } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  demo: string;
  caseStudy: string;
  github?: string;
  features?: string[];
}

interface FloatingProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
  onHoverChange: (isHovering: boolean) => void;
}

export default function FloatingProjectCard({ project, index, onClick, onHoverChange }: FloatingProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate unique orbit parameters based on index (refined)
  const orbitDistance = 8 + (index % 4) * 4; // Smaller variance
  const orbitDuration = 18 + (index % 6) * 3; // Varied durations
  const initialAngle = (index * 75); // More varied starting positions in degrees

  // Convert angle to radians for Math.cos and Math.sin
  const initialAngleRadians = initialAngle * (Math.PI / 180);

  // Handle hover state change and call the callback
  const handleHoverStart = () => {
    setIsHovered(true);
    onHoverChange(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    onHoverChange(false);
  };

  return (
    <motion.div
      className={cn(
        "relative z-20 p-3", // Padding and z-index
        "flex items-center justify-center", // Center content
        "rounded-full md:rounded-xl", // Rounded shape, slightly less rounded on desktop
        "backdrop-blur-sm bg-black/20", // Subtle background
        "border border-white/5", // Subtle border
        "hover:border-mint-400/50 hover:shadow-[0_0_20px_rgba(108,200,170,0.3)]", // Stronger hover effect
        "transition-all duration-300 ease-out",
        "cursor-pointer",
        "group", // Enable group hover effects
        "min-w-[150px] md:min-w-[200px] text-center", // Minimum size
         isHovered ? "scale-105" : "scale-100" // Scale on hover applied here
      )}
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        // Apply floating animation as translation
        x: [0, orbitDistance * Math.cos(initialAngleRadians), 0, orbitDistance * Math.cos((initialAngleRadians + Math.PI)), 0],
        y: [0, orbitDistance * Math.sin(initialAngleRadians), 0, orbitDistance * Math.sin((initialAngleRadians + Math.PI)), 0],
      }}
      transition={{
        duration: orbitDuration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        opacity: { duration: 0.8, delay: index * 0.1 }, // Initial fade-in
        scale: { duration: 0.8, delay: index * 0.1 },
        y: { duration: 0.8, delay: index * 0.1 },
      }}
      onHoverStart={handleHoverStart} // Use hover handlers
      onHoverEnd={handleHoverEnd}
      onClick={onClick}
    >
      {/* Content: Title and subtle icon */}
      <div className="flex flex-col items-center">
        <motion.h3 
          className="text-sm md:text-base font-light text-transparent bg-clip-text bg-gradient-to-r from-sage-300 to-mint-300 group-hover:to-white transition-colors duration-300 leading-tight"
          animate={{ 
            backgroundPosition: isHovered ? "100% 0%" : "0% 0%",
          }} // Text gradient animation on hover
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{ whiteSpace: 'nowrap' }} // Prevent wrapping for shorter titles
        >
          {project.title}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
          transition={{ duration: 0.3 }}
          className="mt-1"
        >
            <Sparkle className="w-4 h-4 text-mint-400 group-hover:text-white transition-colors" />
        </motion.div>
      </div>
       {/* Subtle outer glow/border effect on hover */}
        <motion.div
            className="absolute inset-0 rounded-full md:rounded-xl pointer-events-none"
            animate={{
                boxShadow: isHovered ? "0 0 12px rgba(108, 200, 170, 0.8)" : "0 0 4px rgba(108, 200, 170, 0.3)"
            }}
            transition={{duration: 0.3}}
        />
    </motion.div>
  );
} 