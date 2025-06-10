import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate grid positions for desktop
  const getGridPosition = (index: number) => {
    if (isMobile) return {};

    // Create a refined organic layout for smaller elements
    const positions = [
      { row: 1, col: 1, height: "h-[180px]" }, // Further adjusted heights and positions
      { row: 1, col: 2, height: "h-[160px]" },
      { row: 1, col: 3, height: "h-[200px]" },
      { row: 1, col: 4, height: "h-[170px]" },

      { row: 2, col: 2, height: "h-[190px]" },
      { row: 2, col: 3, height: "h-[160px]" },
      { row: 2, col: 4, height: "h-[210px]" },

      { row: 3, col: 1, height: "h-[200px]" },
      { row: 3, col: 3, height: "h-[180px]" },
      { row: 3, col: 4, height: "h-[220px]" },

      { row: 4, col: 2, height: "h-[170px]" },
      { row: 4, col: 4, height: "h-[190px]" },
    ];

    const position = positions[index % positions.length];
    return {
      gridRow: position.row,
      gridColumn: position.col,
      height: position.height,
    };
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Handle individual card hover change
  const handleCardHoverChange = (isHovering: boolean) => {
    // Simple approach: if any card is hovered, set state to true. Reset when no cards are hovered.
    // More complex logic could track individual card hover states if needed.
    setIsAnyCardHovered(isHovering);
  };

  return (
    <div className="relative">
      {/* Interactive Background Effects - Passed hover state */}
      <ShowcaseInteractiveBackground isAnyCardHovered={isAnyCardHovered} />

      {/* Grid Container */}
      <div className={cn(
        "relative grid gap-4 md:gap-6 z-10",
        isMobile ? "grid-cols-1" : "grid-cols-4",
        !isMobile && "grid-rows-masonry",
        !isMobile && "grid-auto-rows-[minmax(160px,_1fr)]" // Adjusted min row height again
      )}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative z-20 flex items-center justify-center",
              isMobile ? "w-full" : getGridPosition(index).height
            )}
            style={!isMobile ? {
              gridRow: getGridPosition(index).gridRow,
              gridColumn: getGridPosition(index).gridColumn,
            } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.06 }} // Slightly faster stagger
          >
            <FloatingProjectCard
              project={project}
              index={index}
              onClick={() => handleProjectClick(project)}
              onHoverChange={handleCardHoverChange}
            />
          </motion.div>
        ))}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
} 