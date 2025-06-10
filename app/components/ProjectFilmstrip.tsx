import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, ExternalLink, Github, BookText, Volume2, VolumeX } from "lucide-react";
import ParallaxBackground from "./ParallaxBackground";
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
}

interface ProjectFilmstripProps {
  projects: Project[];
}

const SLIDE_WIDTH = 400; // Width of each project slide
const SLIDE_SPACING = 40; // Space between slides
const PARALLAX_FACTOR = 0.5; // How much the background slides move relative to foreground

export default function ProjectFilmstrip({ projects }: ProjectFilmstripProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Motion values for smooth animations
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      setMousePosition({ x: newX, y: newY });
      mouseX.set(newX);
      mouseY.set(newY);
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      setScrollPosition(containerRef.current.scrollLeft);
      setIsScrolling(true);
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Handle drag to scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle sound effects with error handling
  const playSound = (soundName: 'hover' | 'scroll' | 'click') => {
    try {
      soundEffects.play(soundName);
    } catch (error) {
      console.log('Sound effect not available:', error);
    }
  };

  // Update keyboard navigation to use the new playSound function
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      
      if (e.key === 'ArrowLeft') {
        containerRef.current.scrollBy({ left: -SLIDE_WIDTH - SLIDE_SPACING, behavior: 'smooth' });
        playSound('scroll');
      } else if (e.key === 'ArrowRight') {
        containerRef.current.scrollBy({ left: SLIDE_WIDTH + SLIDE_SPACING, behavior: 'smooth' });
        playSound('scroll');
      } else if (e.key === 'Enter' && selectedProject) {
        setIsModalOpen(true);
        playSound('click');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  // Update sound mute handling
  useEffect(() => {
    try {
      soundEffects.setMuted(isMuted);
    } catch (error) {
      console.log('Sound effects not available:', error);
    }
  }, [isMuted]);

  const handleProjectFocus = (index: number) => {
    setFocusedIndex(index);
    if (!isMuted) playSound('hover');
  };

  const handleProjectBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Parallax Background */}
      <ParallaxBackground scrollY={scrollPosition} isScrolling={isScrolling} />

      {/* Sound Toggle - Only show if sound effects are available */}
      <button
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
        onClick={() => setIsMuted(!isMuted)}
        aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Filmstrip Container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        role="region"
        aria-label="Project showcase"
      >
        {/* Project Slides */}
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={cn(
              "relative flex-shrink-0 snap-center",
              "w-[400px] h-[600px] mx-5",
              "backdrop-blur-md bg-black/20 border border-white/10",
              "rounded-xl overflow-hidden",
              "transition-all duration-300 ease-out",
              "hover:border-white/20 hover:shadow-[0_0_30px_rgba(108,200,170,0.3)]",
              "cursor-pointer group"
            )}
            style={{
              x: useTransform(springX, (value) => value * PARALLAX_FACTOR * (index + 1)),
              rotateY: useTransform(mouseX, [-100, 100], [-5, 5]),
              rotateX: useTransform(mouseY, [-100, 100], [5, -5]),
            }}
            onClick={() => {
              setSelectedProject(project);
              setIsModalOpen(true);
              playSound('click');
            }}
            onMouseEnter={() => handleProjectFocus(index)}
            onMouseLeave={handleProjectBlur}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            role="article"
            aria-label={`Project: ${project.title}`}
            tabIndex={0}
          >
            {/* Project Image/Video */}
            <div className="relative w-full h-1/2 overflow-hidden">
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Project Info */}
            <div className="p-6">
              <h3 className="text-2xl font-light text-white mb-2 font-orbitron">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-4 italic">{project.tagline}</p>
              <p className="text-sm text-gray-300 line-clamp-3">{project.description}</p>
              
              {/* Tech Stack */}
              {project.techStack && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-mint-400/10 text-mint-400 border border-mint-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Focus Indicator */}
            {focusedIndex === index && (
              <motion.div
                className="absolute inset-0 border-2 border-mint-400/50 rounded-xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Project details: ${selectedProject.title}`}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              className="relative bg-black/90 border border-white/10 rounded-xl p-8 max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white/60 hover:text-white"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close project details"
              >
                <X size={24} />
              </button>

              {/* Hero Image/Video */}
              <div className="mb-6 rounded-lg overflow-hidden border border-white/5">
                {selectedProject.video ? (
                  <video
                    src={selectedProject.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-[400px] object-cover"
                  />
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-[400px] object-cover"
                  />
                )}
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-light text-white mb-2 font-orbitron">{selectedProject.title}</h2>
                  <p className="text-xl text-gray-400 mb-6 italic">{selectedProject.tagline}</p>
                  <p className="text-gray-300 mb-6">{selectedProject.description}</p>

                  {/* Impact Points */}
                  {selectedProject.impactPoints && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white font-orbitron">Impact</h3>
                      <ul className="space-y-2">
                        {selectedProject.impactPoints.map((point, i) => (
                          <li key={i} className="flex items-start space-x-2 text-gray-300">
                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-mint-400 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  {/* Tech Stack */}
                  {selectedProject.techStack && (
                    <div className="mb-6">
                      <h3 className="text-lg font-light text-white mb-4 font-orbitron">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-sm bg-mint-400/10 text-mint-400 border border-mint-400/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/20 transition-colors flex items-center gap-2"
                        aria-label={`View live demo of ${selectedProject.title}`}
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                    {selectedProject.repoUrl && (
                      <a
                        href={selectedProject.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/20 transition-colors flex items-center gap-2"
                        aria-label={`View GitHub repository for ${selectedProject.title}`}
                      >
                        <Github size={16} /> GitHub
                      </a>
                    )}
                    {selectedProject.caseStudyUrl && (
                      <a
                        href={selectedProject.caseStudyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-mint-400/10 border border-mint-400/20 text-mint-400 hover:bg-mint-400/20 transition-colors flex items-center gap-2"
                        aria-label={`Read case study for ${selectedProject.title}`}
                      >
                        <BookText size={16} /> Case Study
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 