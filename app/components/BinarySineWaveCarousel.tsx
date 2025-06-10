import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, BookText, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  summary: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  caseStudyUrl?: string;
}

interface BinarySineWaveCarouselProps {
  projects: Project[];
}

// Binary Stream Component
const BinaryStream = () => {
  const binaryElements = Array.from({ length: 50 }).map((_, i) => {
    const x = (i * 5) % 100;
    const y = (i * 7) % 100;
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
          x: [`${x}vw`, `${x + 20}vw`],
          y: [`${y}vh`, `${y + 20}vh`],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 8 + (i % 5),
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

// Project Node Component
const ProjectNode = ({ project, index, onClick, isActive }: { 
  project: Project; 
  index: number; 
  onClick: (project: Project) => void;
  isActive: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={nodeRef}
      className={cn(
        "absolute cursor-pointer rounded-full",
        "bg-gradient-to-br from-mint-400/20 to-sage-400/20",
        "flex items-center justify-center",
        "transition-all duration-300 ease-out",
        "hover:z-20",
        "w-24 h-24 md:w-32 md:h-32",
        isActive && "scale-110"
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: isActive ? 1.1 : 1,
        y: isActive ? 0 : Math.sin(index * Math.PI / 3) * 50
      }}
      whileHover={{ 
        scale: 1.15,
        boxShadow: "0 0 20px rgba(108,200,170,0.6), 0 0 40px rgba(108,200,170,0.3)"
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1
      }}
      onClick={() => onClick(project)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Inner Circle / Project Visual */}
      <div
        className="relative w-full h-full rounded-full overflow-hidden bg-black/50 border border-white/5"
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: isHovered ? 'grayscale(0%) brightness(100%)' : 'grayscale(20%) brightness(80%)',
          transition: 'filter 0.3s ease-out'
        }}
      />
      
      {/* Project Title */}
      <div className="absolute inset-0 flex items-center justify-center text-center p-2">
        <h4 className="text-white text-xs md:text-sm font-medium leading-tight line-clamp-2 select-none pointer-events-none opacity-90 group-hover:opacity-0 transition-opacity duration-300">
          {project.title}
        </h4>
      </div>

      {/* Tooltip on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -top-12 px-3 py-1 bg-black/70 backdrop-blur-md rounded-md text-xs text-white whitespace-nowrap border border-mint-400/20 z-30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {project.summary}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Project Detail Modal
const ProjectDetailModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.9 }}
          className="relative bg-black/80 border border-white/10 rounded-xl p-6 max-w-2xl w-full modal-content"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <div 
                className="aspect-video rounded-lg overflow-hidden bg-black/50"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>
            
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-light text-white mb-4">{project.title}</h3>
              <p className="text-gray-300 mb-6">{project.summary}</p>
              
              {project.techStack && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-mint-400 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-mint-400/10 text-mint-400 border border-mint-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button
                    className="unified-button primary showcase-modal-button"
                    onClick={() => window.open(project.liveUrl, "_blank")}
                  >
                    <span className="button-content">LIVE DEMO</span>
                  </Button>
                )}
                {project.caseStudyUrl && (
                  <Button
                    className="unified-button showcase-modal-button"
                    onClick={() => window.open(project.caseStudyUrl, "_blank")}
                  >
                    <span className="button-content">CASE STUDY</span>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button
                    className="unified-button showcase-modal-button"
                    onClick={() => window.open(project.repoUrl, "_blank")}
                  >
                    <span className="button-content">GITHUB</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function BinarySineWaveCarousel({ projects }: BinarySineWaveCarouselProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle touch/drag events for mobile
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current!.offsetLeft);
    setScrollLeft(containerRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current!.scrollLeft = scrollLeft - walk;
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex(prev => (prev > 0 ? prev - 1 : projects.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex(prev => (prev < projects.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        setSelectedProject(projects[activeIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, projects]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Binary Stream Background */}
      <BinaryStream />

      {/* Sine Wave Path */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,50 Q25,25 50,50 T100,50"
          fill="none"
          stroke="rgba(108,200,170,0.1)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Project Nodes Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        <div className="relative w-full h-full">
          {projects.map((project, index) => (
            <ProjectNode
              key={project.id}
              project={project}
              index={index}
              onClick={setSelectedProject}
              isActive={index === activeIndex}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
        <button
          className="p-2 rounded-full bg-black/50 text-white/60 hover:text-white pointer-events-auto"
          onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : projects.length - 1))}
        >
          ←
        </button>
        <button
          className="p-2 rounded-full bg-black/50 text-white/60 hover:text-white pointer-events-auto"
          onClick={() => setActiveIndex(prev => (prev < projects.length - 1 ? prev + 1 : 0))}
        >
          →
        </button>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 