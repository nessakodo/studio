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
        "relative z-20 p-4",
        "flex flex-col items-center justify-center",
        "rounded-full",
        "backdrop-blur-xl bg-black/60",
        "border border-mint-400/40",
        "hover:border-mint-400/80 hover:shadow-[0_0_60px_rgba(108,200,170,1)]",
        "transition-all duration-500 ease-out",
        "cursor-pointer",
        "group",
        "w-full h-full",
        isHovered ? "scale-110" : "scale-100"
      )}
      initial={{ opacity: 0.5, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: [0.95, 1.05, 0.95],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: index * 0.1,
      }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={onClick}
    >
      {/* Content */}
      <div className="flex flex-col items-center text-center w-full h-full justify-center px-6">
        <motion.h3 
          className="text-xl md:text-2xl font-light leading-tight transition-colors duration-300 mb-2"
          style={{
            backgroundImage: 'linear-gradient(to right, #e0f2f7, #b4d4ee, #a78bfa, #6ee7b7, #e0f2f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '400% auto',
            transition: 'background-position 1s ease-in-out',
          }}
          animate={{
             backgroundPosition: isHovered ? "-300% center" : "0% center",
          }}
        >
          {project.title}
        </motion.h3>
        <p className="text-sm text-gray-300 leading-relaxed line-clamp-2 px-2">{project.description}</p>
      </div>

      {/* Subtle outer glow/border effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow: isHovered ? "0 0 60px rgba(108, 200, 170, 1.2)" : "0 0 20px rgba(108, 200, 170, 0.8)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
} 