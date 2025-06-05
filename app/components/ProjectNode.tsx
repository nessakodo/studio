import { motion } from "framer-motion";
import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  image: string;
  demo: string;
  caseStudy: string;
  github?: string;
  features?: string[];
}

interface NodeData {
  id: number;
  project: Project;
  size: number;
  arcPosition: number;
  depth: number;
  initialOffset: { x: number; y: number };
  floatAmplitude: number;
  floatDuration: number;
}

interface ProjectNodeProps {
  nodeData: NodeData;
  style: CSSProperties;
  onProjectClick: (project: Project) => void;
}

export default function ProjectNode({
  nodeData,
  style,
  onProjectClick,
}: ProjectNodeProps) {
  // Subtle floating animation (Removed animation, keeping whileHover for scale)
  // const floatVariants = {
  //   animate: (particle: NodeData) => ({
  //     y: [
  //       0,
  //       particle.floatAmplitude * 0.1,
  //       0,
  //       particle.floatAmplitude * -0.1,
  //       0,
  //     ],
  //     transition: {
  //       duration: particle.floatDuration * 3,
  //       ease: "easeInOut",
  //       repeat: Infinity,
  //       repeatType: "mirror",
  //     },
  //   }),
  // };

  return (
    <motion.div
      className={cn(
        "rounded-full flex items-center justify-center cursor-pointer",
        "transition-all duration-300 ease-out",
        "bg-black/40 backdrop-blur-sm",
        "border border-white/10",
        "hover:border-white/30",
        "group"
      )}
      style={{
        ...style,
        boxShadow: `
          0 0 ${20 + nodeData.depth * 20}px rgba(255, 255, 255, ${0.1 + nodeData.depth * 0.1}),
          inset 0 0 ${10 + nodeData.depth * 10}px rgba(255, 255, 255, ${0.05 + nodeData.depth * 0.05})
        `,
      }}
      // variants={floatVariants} // Removed animation variants
      // animate="animate" // Removed animation
      custom={nodeData}
      onClick={() => onProjectClick(nodeData.project)}
      whileHover={{ scale: 1.05 }}
    >
      {/* Glowing orb effect */}
      <div
        className="absolute inset-0 rounded-full opacity-50"
        style={{
          background: `radial-gradient(circle at center, 
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 40%,
            rgba(255, 255, 255, 0) 70%
          )`,
        }}
      />

      {/* Project Title */}
      <div
        className={cn(
          "text-base font-light text-white/90 text-center px-6 py-3",
          "pointer-events-none w-full",
          "transition-all duration-300",
          "group-hover:text-white"
        )}
        style={{
          textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
          borderRadius: '9999px',
        }}
      >
        {nodeData.project.title}
      </div>
    </motion.div>
  );
} 