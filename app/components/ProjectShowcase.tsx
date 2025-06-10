import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, BookText, X, ChevronUp, Star, Zap, ArrowUpRight, Eye } from "lucide-react";
import { soundEffects } from "../utils/soundEffects";

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  video?: string;
  liveUrl?: string;
  repoUrl?: string;
  caseStudyUrl?: string;
  techStack?: string[];
  impactPoints?: string[];
  themeColor?: string;
  featured?: boolean;
}

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/80"
      onClick={onClose} // Close on backdrop click
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-black/70 border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/30 transition-all duration-300"
        >
          <X size={20} />
        </button>

        {/* Media Section */}
        <div className="w-full aspect-video relative overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
          <motion.h2
            className="text-5xl md:text-7xl font-light leading-tight text-transparent bg-clip-text bg-gradient-to-r from-sage-400 via-mist-400 to-mint-400 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {project.title}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 italic mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {project.tagline}
          </motion.p>
          <motion.p
            className="text-gray-300 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {project.description}
          </motion.p>

          {project.techStack && (
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm rounded-full bg-mint-400/10 text-mint-400 border border-mint-400/20"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          )}

          {project.impactPoints && (
            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-light text-white flex items-center gap-2"><Star size={20} className="text-sage-400" /> Key Impact</h3>
              <ul className="space-y-2">
                {project.impactPoints.map((point, i) => (
                  <li key={i} className="flex items-start space-x-2 text-gray-300">
                    <span className="w-2 h-2 mt-2 rounded-full bg-mint-400 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 rounded-lg bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/20 transition-all duration-300 flex items-center gap-2"
              >
                <ExternalLink size={18} /> Live Demo
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 rounded-lg bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/20 transition-all duration-300 flex items-center gap-2"
              >
                <Github size={18} /> GitHub Repo
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 rounded-lg bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/20 transition-all duration-300 flex items-center gap-2"
              >
                <BookText size={18} /> Case Study
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface ProjectNodeProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}

const ProjectNode = ({ project, index, onClick }: ProjectNodeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-30% 0px", once: true });
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 }); // Softer spring for subtle movement
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 }); // Softer spring for subtle movement

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0, x: Math.random() * 200 - 100, y: Math.random() * 200 - 100 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 30, // Much less stiff
        damping: 15,   // More damping for slower, smoother motion
        delay: index * 0.05 + Math.random() * 0.5 
      }
    },
    hover: {
      scale: 1.15, // Slightly less aggressive scale on hover
      boxShadow: "0 0 20px rgba(108,200,170,0.6), 0 0 40px rgba(108,200,170,0.3)",
      zIndex: 10,
      transition: { duration: 0.2 }
    }
  };

  const tooltipVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "absolute cursor-pointer rounded-full p-0.5", // Use p-0.5 for a subtle border/glow effect
        "bg-gradient-to-br from-mint-400/20 to-sage-400/20",
        "flex items-center justify-center",
        "transition-all duration-300 ease-out",
        "hover:z-20",
        project.featured ? "w-28 h-28 md:w-36 md:h-36" : "w-20 h-20 md:w-24 md:h-24" // Slightly larger base sizes
      )}
      variants={nodeVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onTap={() => onClick(project)}
      onHoverStart={() => {
        setIsHovered(true);
        soundEffects.play('hover');
      }}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        x: useTransform(mouseX, [-50, 50], [-5, 5]), // Reduced parallax effect
        y: useTransform(mouseY, [-50, 50], [-5, 5]), // Reduced parallax effect
        boxShadow: isHovered ? "0 0 20px rgba(108,200,170,0.6), 0 0 40px rgba(108,200,170,0.3)" : "none"
      }}
    >
      {/* Inner Circle / Project Visual Hint */}
      <div
        className="relative w-full h-full rounded-full overflow-hidden bg-black/50 border border-white/5"
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: isHovered ? 'grayscale(0%) brightness(100%)' : 'grayscale(20%) brightness(80%)', // More visible by default
          transition: 'filter 0.3s ease-out'
        }}
      />
      <div className="absolute inset-0 rounded-full bg-black/30 group-hover:bg-transparent transition-colors" />
      
      {/* Project Title (always visible) */}
      <div className="absolute inset-0 flex items-center justify-center text-center p-2">
        <h4 className="text-white text-xs md:text-sm font-medium leading-tight line-clamp-2 select-none pointer-events-none opacity-90 group-hover:opacity-0 transition-opacity duration-300">
          {project.title}
        </h4>
      </div>

      {/* Tooltip on Hover (for tagline) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -top-12 px-3 py-1 bg-black/70 backdrop-blur-md rounded-md text-xs text-white whitespace-nowrap border border-mint-400/20 z-30"
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {project.tagline}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Icon */}
      {project.featured && (
        <div className="absolute top-1 right-1 p-0.5 rounded-full bg-mint-400/20 text-mint-200 z-10">
          <Star size={12} fill="currentColor" />
        </div>
      )}
    </motion.div>
  );
};

interface ProjectShowcaseProps {
  projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(10); // Initially visible projects (increased)
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const scrollThreshold = 0.7; // When 70% of the container is scrolled

      if (scrollTop + clientHeight >= scrollHeight * scrollThreshold) {
        // Load more projects as user scrolls down
        setVisibleProjectsCount(prevCount => Math.min(prevCount + 5, projects.length)); // Load more projects in chunks of 5
      }
    }
  }, [projects.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  // Combine and shuffle for a more organic constellation
  const combinedProjects = [...featuredProjects, ...otherProjects];
  const shuffledProjects = useRef(combinedProjects
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  ).current;

  const visibleProjects = shuffledProjects.slice(0, visibleProjectsCount);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[120vh] overflow-y-auto custom-scrollbar pt-24 pb-48"
    >
      {/* Dynamic Grid for Constellation (loosely used for distribution) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-0 gap-y-0 h-full p-4 md:p-8 relative justify-items-center items-center">
        {visibleProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            className="relative flex items-center justify-center"
            style={{
              width: project.featured ? '100%' : 'auto',
              height: project.featured ? '100%' : 'auto',
              minWidth: project.featured ? '120px' : '80px',
              minHeight: project.featured ? '120px' : '80px',
              gridColumn: `span ${project.featured ? 2 : 1}`,
              gridRow: `span ${project.featured ? 2 : 1}`,
              // Add random positioning within its grid cell for subtle variation
              left: `${Math.random() * 50 - 25}%`,
              top: `${Math.random() * 50 - 25}%`,
            }}
          >
            <ProjectNode project={project} index={idx} onClick={setSelectedProject} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* Scroll indicator for more projects */}
      {visibleProjectsCount < projects.length && (
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-mint-400 animate-bounce flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <ChevronUp size={24} className="rotate-180" />
          <span className="text-sm">Scroll for more</span>
        </motion.div>
      )}

    </div>
  );
} 