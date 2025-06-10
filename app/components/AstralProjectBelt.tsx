import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface Project {
  title: string;
  description: string;
  demo?: string;
  caseStudy?: string;
  github?: string;
}

interface AstralProjectBeltProps {
  projects: Project[];
}

const ORB_SIZE = 160; // px
const ORB_SPACING = 60; // Increased spacing between orbs
const BELT_HEIGHT = 400; // px
const SCROLL_SPEED_PX_PER_SEC = 25; // Adjusted speed for a smoother, slower flow

// Project Orb Component (Moved outside AstralProjectBelt to fix Rules of Hooks)
const ProjectOrb = ({
  project,
  index,
  ORB_SIZE,
  ORB_SPACING,
  BELT_HEIGHT,
  setSelectedProject,
  setIsModalOpen,
}: {
  project: Project;
  index: number;
  ORB_SIZE: number;
  ORB_SPACING: number;
  BELT_HEIGHT: number;
  setSelectedProject: (project: Project) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const floatDistance = 10; // Reduced vertical float slightly
  const floatDuration = 3 + (index % 4); // Varied duration

  // Truncate description for orb display
  const shortDescription = project.description.length > 50
    ? project.description.substring(0, 50).trim() + '...'
    : project.description;

  // Calculate fixed top position for vertical centering
  const orbTopPosition = (BELT_HEIGHT / 2) - (ORB_SIZE / 2);

  return (
    <motion.div
      className={cn(
        "relative z-20",
        "flex flex-col items-center justify-center text-center",
        "rounded-full",
        "backdrop-blur-sm bg-black/20",
        "border border-white/5",
        "hover:border-mint-400/50 hover:shadow-[0_0_20px_rgba(108,200,170,0.3)]",
        "transition-all duration-300 ease-out",
        "cursor-pointer",
        "group",
        "w-[160px] h-[160px]",
        isHovered ? "scale-110" : "scale-100"
      )}
      style={{ 
        position: 'absolute',
        left: `${index * (ORB_SIZE + ORB_SPACING)}px`,
        top: orbTopPosition,
        pointerEvents: 'auto' // Ensure individual orbs allow pointer events
      }}
      animate={{
        y: [0, -floatDistance, 0, floatDistance, 0]
      }}
      transition={{ 
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      onHoverStart={() => {
        setIsHovered(true);
        console.log(`Orb ${project.title} hovered!`);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        console.log(`Orb ${project.title} unhovered.`);
      }}
      onClick={() => {
        setSelectedProject(project);
        setIsModalOpen(true);
        console.log(`Orb ${project.title} clicked!`);
      }}
    >
      <div className="flex flex-col items-center justify-center p-4 w-full h-full">
        <motion.h3 
          className="text-sm font-light text-transparent bg-clip-text bg-gradient-to-r from-sage-300 to-mint-300 group-hover:to-white transition-colors duration-300 leading-tight text-center mb-1"
        >
          {project.title}
        </motion.h3>
        <motion.p
          className="text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-tight text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {shortDescription}
        </motion.p>
      </div>
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow: isHovered 
            ? "0 0 20px rgba(108, 200, 170, 0.8), inset 0 0 20px rgba(108, 200, 170, 0.4)" 
            : "0 0 8px rgba(108, 200, 170, 0.3), inset 0 0 8px rgba(108, 200, 170, 0.1)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default function AstralProjectBelt({ projects }: AstralProjectBeltProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [beltContainerWidth, setBeltContainerWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0); // Hardcode for debugging

  console.log("AstralProjectBelt: Mounted: (removed)", ", Hardcoded beltContainerWidth: ", beltContainerWidth);

  // Binary stream animation
  const BinaryStream = () => {
    const binaryElements = Array.from({ length: 30 }).map((_, i) => {
      const x = (i * 7) % 100;
      const y = (i * 11) % 100;
      return (
        <motion.div
          key={i}
          className="absolute text-[8px] text-mint-400/20 font-mono"
          initial={{ 
            x: `${x}vw`,
            y: `${y}vh`,
            opacity: 0
          }}
          animate={{
            x: [`${x}vw`, `${x + 15}vw`],
            y: [`${y}vh`, `${y + 15}vh`],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 10 + (i % 5),
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0
          }}
        >
          {i % 2 === 0 ? "1" : "0"}
        </motion.div>
      );
    });

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {binaryElements}
      </div>
    );
  };

  // Project Modal Component
  const ProjectModal = () => {
    if (!selectedProject) return null;

    return (
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              className="relative bg-black/80 border border-white/10 rounded-xl p-6 max-w-md w-full modal-content"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white/60 hover:text-white modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-light text-white mb-4 modal-title">{selectedProject.title}</h3>
              <p className="text-gray-300 mb-6 modal-description">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-3 modal-actions">
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/20 transition-colors modal-button"
                  >
                    Live Demo
                  </a>
                )}
                {selectedProject.caseStudy && (
                  <a
                    href={selectedProject.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/20 transition-colors modal-button"
                  >
                    Case Study
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/20 transition-colors modal-button"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const displayedProjects = [...projects, ...projects, ...projects]; // Triple duplicate for longer seamless loop
  const singleLoopWidth = projects.length * (ORB_SIZE + ORB_SPACING); // Width of one set of unique projects
  const totalBeltContentWidth = displayedProjects.length * (ORB_SIZE + ORB_SPACING); // Total width of the duplicated belt content
  const animationDuration = singleLoopWidth / SCROLL_SPEED_PX_PER_SEC; // Duration based on duplicated belt width and speed

  console.log("Rendering animated belt. singleLoopWidth:", singleLoopWidth, "totalBeltContentWidth:", totalBeltContentWidth, "animationDuration:", animationDuration);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] overflow-hidden astral-belt-container">
      <BinaryStream />
      {/* Orb container for horizontal scrolling */}
      <motion.div
        className="absolute inset-y-0"
        style={{
          width: totalBeltContentWidth,
          height: '100%',
          pointerEvents: 'auto'
        }}
        initial={{ x: beltContainerWidth }}
        animate={{
          x: -singleLoopWidth
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {displayedProjects.map((project, index) => (
          <ProjectOrb 
            key={index} 
            project={project} 
            index={index}
            ORB_SIZE={ORB_SIZE}
            ORB_SPACING={ORB_SPACING}
            BELT_HEIGHT={BELT_HEIGHT}
            setSelectedProject={setSelectedProject}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </motion.div>
      <ProjectModal />
    </div>
  );
}