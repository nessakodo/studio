import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, MotionValue } from "framer-motion";
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

interface SignalNodeProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
  scrollProgress: MotionValue<number>; // Global scroll progress from Framer Motion
  numProjects: number;
  position: { x: number; y: number }; // Fixed position relative to path
}

const SignalNode = ({ project, index, onClick, scrollProgress, numProjects, position }: SignalNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Determine visibility and active state based on scrollProgress
  const sectionScrollStart = 0.2; // When the signal flow section starts to unfurl
  const sectionScrollEnd = 0.8; // When it finishes unfurling
  
  const normalizedScroll = useTransform(scrollProgress, [sectionScrollStart, sectionScrollEnd], [0, 1]);

  // Calculate relative position within the signal flow section
  const nodeProgress = index / (numProjects - 1);

  // Opacity and scale for nodes based on their position relative to the normalized scroll
  const opacity = useTransform(normalizedScroll,
    [nodeProgress - 0.1, nodeProgress, nodeProgress + 0.1], // Range around the node's position
    [0, 1, 0] // Fade in and out
  );

  const scale = useTransform(normalizedScroll,
    [nodeProgress - 0.05, nodeProgress, nodeProgress + 0.05], // Pulse around node's position
    [0.8, 1.2, 0.8] // Smaller, then larger, then back to smaller
  );

  // Parallax for nodes - subtle movement relative to scroll
  const parallaxX = useTransform(normalizedScroll, [0, 1], [-50, 50]); // Nodes move slightly horizontally
  const parallaxY = useTransform(normalizedScroll, [0, 1], [20, -20]); // Nodes move slightly vertically

  return (
    <motion.div
      ref={ref}
      className={cn(
        "absolute cursor-pointer rounded-full p-0.5",
        "bg-gradient-to-br from-mint-400/20 to-sage-400/20",
        "flex items-center justify-center",
        "transition-all duration-300 ease-out",
        "hover:z-20"
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        translateX: parallaxX,
        translateY: parallaxY,
        opacity,
        scale,
        boxShadow: isHovered ? "0 0 30px rgba(108,200,170,0.6), 0 0 60px rgba(108,200,170,0.3)" : "none"
      }}
      whileHover={{ scale: 1.1 }} // Additional hover scale
      onTap={() => onClick(project)}
      onHoverStart={() => {
        setIsHovered(true);
        soundEffects.play('hover');
      }}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0} // Make node keyboard accessible
      role="button" // Indicate it's clickable
      aria-label={`View details for ${project.title}`} // ARIA label
    >
      {/* Inner Circle / Project Visual Hint */}
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
      <div className="absolute inset-0 rounded-full bg-black/30 group-hover:bg-transparent transition-colors" />
      
      {/* Project Title (always visible) */}
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
            role="tooltip"
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

interface SignalPathProps {
  projects: Project[];
  scrollProgress: MotionValue<number>; // Global scroll progress
}

const SignalPath = ({ projects, scrollProgress }: SignalPathProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    // Only get path length once, or when projects change
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [projects]); // Depend on projects to recalculate if data changes

  // Generate control points for a smooth curve
  const generatePath = () => {
    const points = projects.map((_, i) => {
      // Adjusted x to cover a wider conceptual space for parallax
      const x = (i / (projects.length - 1)) * 200; // Distribute over 200% width
      const y = 50 + Math.sin(i * Math.PI / 3) * 15; // Deeper wave, slightly different frequency
      return { x, y };
    });

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      // Use cubic Bezier control points for smoother curves
      const controlX1 = prev.x + (curr.x - prev.x) / 3;
      const controlY1 = prev.y;
      const controlX2 = curr.x - (curr.x - prev.x) / 3;
      const controlY2 = curr.y;
      path += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${curr.x} ${curr.y}`;
    }
    return path;
  };

  // Animated pulse along the path - dynamic position
  // The pulse's movement along the path is still relative to the path's own length
  const pulseTraversalProgress = useTransform(scrollProgress,
    [0.2, 0.8], // Section scroll range (when the signal flow section is in view)
    [0, 1] // Normalized progress for pulse (0 to 1 along path length)
  );

  const cx = useTransform(pulseTraversalProgress, (val) => {
    return pathRef.current ? pathRef.current.getPointAtLength(val * pathLength).x : 0;
  });
  const cy = useTransform(pulseTraversalProgress, (val) => {
    return pathRef.current ? pathRef.current.getPointAtLength(val * pathLength).y : 0;
  });

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 100" // Adjust viewBox to reflect the conceptual 200% width
      preserveAspectRatio="none"
    >
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(108,200,170,0.2)" />
          <stop offset="50%" stopColor="rgba(108,200,170,0.5)" />
          <stop offset="100%" stopColor="rgba(108,200,170,0.2)" />
        </linearGradient>
      </defs>

      {/* Main Path */}
      <motion.path
        ref={pathRef}
        d={generatePath()}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="0.5"
        initial={{ opacity: 0 }} // Fade in the path
        animate={{ opacity: 1 }} // Keep animate to trigger initial draw or re-render
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Animated Pulse along the path - dynamic position */} 
      {pathLength > 0 && ( // Only render pulse if pathLength is known
        <motion.circle
          cx={cx}
          cy={cy}
          r="0.8" // Larger pulse
          fill="rgba(108,200,170,0.8)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }} // Fade in and out pulse
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.svg>
  );
};

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/80"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${project.title}`}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-black/70 border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/30 transition-all duration-300"
          aria-label="Close project details"
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
            className="text-5xl md:text-7xl font-light leading-tight font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-sage-400 via-mist-400 to-mint-400 mb-4"
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

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/20 transition-colors flex items-center gap-2"
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/20 transition-colors flex items-center gap-2"
                aria-label={`View GitHub repository for ${project.title}`}
              >
                <Github size={16} /> GitHub
              </a>
            )}
            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/20 transition-colors flex items-center gap-2"
                aria-label={`Read case study for ${project.title}`}
              >
                <BookText size={16} /> Case Study
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function SignalFlow({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  
  // Use scrollYProgress from the window, but within the bounds of this component's visibility
  const { scrollYProgress } = useScroll({
    target: componentRef,
    offset: ["start end", "end start"]
  });

  // Calculate node positions along the signal path relative to the SVG's 200% width
  const getNodePositions = () => {
    return projects.map((_, i) => {
      const x = (i / (projects.length - 1)) * 200; // Distribute over 200% width of the SVG's conceptual space
      const y = 50 + Math.sin(i * Math.PI / 3) * 15; // Matches SignalPath wave pattern
      return { x, y };
    });
  };

  const nodePositions = getNodePositions();

  // Adjusted container height for parallax and visibility
  // This height ensures enough scroll space for the section to unfurl
  const sectionHeight = `${projects.length * 70}vh`; // Dynamically adjust height based on number of projects

  // Main horizontal parallax for the path and nodes container
  // As scrollYProgress goes from 0.2 (start of section) to 0.8 (end of section),
  // the content translates from 0% (initially visible) to -50% (scrolled halfway through the 200% conceptual width)
  const pathAndNodesXTranslation = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "-50%"]);

  return (
    <div 
      ref={componentRef}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-black"
      style={{ minHeight: sectionHeight }} // Make the section tall enough to scroll through
      role="region"
      aria-label="Kodex Signal Flow Project Showcase"
    >
      {/* Background Parallax Layer 1 (slowest) - Starfield */}
      <motion.div
        className="absolute inset-0 z-0 bg-[url('/assets/starfield.svg')] bg-repeat opacity-20"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) // Moves slowest relative to main scroll
        }}
      />

      {/* Background Parallax Layer 2 (medium) - Fading Gradient */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(10,10,20,0.5) 0%, rgba(0,0,0,0) 70%)",
          y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]), // Moves slightly faster than layer 1
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) // Fade in/out with section visibility
        }}
      />

      {/* Section Title - Sticky with fade effect */}
      <motion.div
        className="sticky top-0 z-30 pt-24 pb-12 text-center w-full bg-black/50 backdrop-blur-md"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }} // Fades in and out with section
      >
        <h2 className="text-5xl md:text-7xl font-light mb-4 font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-sage-400 via-mist-400 to-mint-400">
          KODEX SIGNAL FLOW
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Trace the signal. Follow the flow. Each project is a pulse in the evolution of Kodex Studio—bridging secure systems, creative code, and digital well-being.
        </p>
        <p className="mt-8 text-lg text-mint-400 opacity-70">Scroll to navigate the signal flow.</p>
      </motion.div>

      {/* Signal Path & Nodes Container - Now with main horizontal parallax */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20"
        style={{ translateX: pathAndNodesXTranslation }} // Apply the main horizontal parallax here
      >
        {/* Signal Path (SVG is now a child of this translating container) */}
        <SignalPath projects={projects} scrollProgress={scrollYProgress} />

        {/* Project Nodes (also children of this translating container) */}
        {projects.map((project, index) => (
          <SignalNode
            key={project.id}
            project={project}
            index={index}
            onClick={setSelectedProject}
            position={nodePositions[index]} // Fixed relative position within the conceptual SVG space
            scrollProgress={scrollYProgress}
            numProjects={projects.length}
          />
        ))}
      </motion.div>

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