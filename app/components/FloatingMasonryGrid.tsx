import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import FloatingProjectCard from "./FloatingProjectCard";
import ProjectModal from "./ProjectModal";
import { cn } from "@/lib/utils";
import ShowcaseInteractiveBackground from "./ShowcaseInteractiveBackground";

interface Project {
  title: string;
  description: string;
  image: string;
  demo: string;
  caseStudy: string;
  github?: string;
  features?: string[];
}

interface FloatingMasonryGridProps {
  projects: Project[];
  onCardHoverChange: (isHovering: boolean) => void;
}

export default function FloatingMasonryGrid({ projects, onCardHoverChange }: FloatingMasonryGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Removed scrollYProgress as the carousel animation is not scroll-based

  // Removed isMobile check and getGridPosition as grid is no longer used

  // Handle project click
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Handle individual card hover change
  const handleCardHoverChange = (isHovering: boolean) => {
    setIsAnyCardHovered(isHovering);
    onCardHoverChange(isHovering);
  };

  // Duplicate projects to create a seamless loop
  const duplicatedProjects = [...projects, ...projects, ...projects]; // Duplicate more for smoother loop

  // Define animation for the carousel container (horizontal movement)
  const carouselVariants = {
    animate: {
      x: ['0%', '-100%'], // Animate from 0% to -100% of the original projects width
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 90, // Increased duration for slower speed
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="relative overflow-hidden" ref={containerRef}> {/* Added overflow-hidden */}
      {/* Interactive Background Effects */}
      <ShowcaseInteractiveBackground isAnyCardHovered={isAnyCardHovered} />

      {/* Carousel Container */}
      <motion.div
        className="relative flex z-10 space-x-16" // Increased space between cards further
        variants={carouselVariants}
        animate="animate"
        style={{ width: `${projects.length * (300 + 64)}px` }} // Calculate width based on original projects + increased space (using 64 for space-x-16)
      >
        {duplicatedProjects.map((project, index) => (
          <motion.div
            key={index} 
            className={cn(
              "relative z-20 flex-none",
              "w-[300px] h-[300px] flex items-center justify-center", // Square size for orb shape
            )}
            // Add vertical animation to individual cards
            animate={{
              y: [0, (index % 2 === 0 ? 40 : -40), 0], // Increased subtle up and down movement
            }}
            transition={{
              duration: 10 + (index % 4) * 3, // Varied duration for movement
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          >
            <FloatingProjectCard
              project={project}
              index={index}
              onClick={() => handleProjectClick(project)}
              onHoverChange={handleCardHoverChange}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
} 