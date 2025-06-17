import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, BookText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "../types";

interface ProjectPlayerProps {
  projects: Project[];
}

export default function ProjectPlayer({ projects }: ProjectPlayerProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 1, 1, 0]);

  const activeProject = projects[activeProjectIndex];

  // Handle project navigation with debounce
  const navigateProject = (direction: "next" | "prev") => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const newIndex = direction === "next"
      ? (activeProjectIndex + 1) % projects.length
      : (activeProjectIndex - 1 + projects.length) % projects.length;
    
    setActiveProjectIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div ref={containerRef} className="relative w-full py-16 section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Project Display */}
        <div className="relative px-4">
          <AnimatePresence mode="wait">
            {activeProject && (
              <motion.div
                key={activeProject.id}
                className="relative grid md:grid-cols-2 gap-8 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Project Preview */}
                <motion.div
                  className="relative aspect-[16/9] rounded-lg overflow-hidden bg-black/30 border border-white/10"
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {activeProject.preview && (
                    <img
                      src={activeProject.preview}
                      alt={activeProject.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  {/* Category Chip */}
                  <div className={cn(
                    "absolute top-4 left-4 px-3 py-1.5 rounded-full",
                    "bg-gradient-to-r from-mist-500/20 to-mint-500/20 backdrop-blur-sm border border-white/10",
                    "flex items-center justify-center"
                  )}>
                    <span className="text-sm font-medium text-white tracking-wide">
                      {activeProject.category.toUpperCase()}
                    </span>
                  </div>
                </motion.div>

                {/* Project Info */}
                <motion.div
                  className="text-white py-4 md:py-0"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-3xl md:text-4xl font-light mb-4 md:mb-6 tracking-tight">{activeProject.title}</h3>
                  <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8 leading-relaxed">{activeProject.summary}</p>
                  
                  {/* Tech Stack Tags */}
                  {activeProject.techStack && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {activeProject.techStack.map((tech, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1.5 rounded-full bg-gradient-to-br from-mist-500/10 to-sage-500/10 text-sm text-gray-300 border border-white/10 hover:border-mint-400/30 transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                          title={`Built with ${tech}`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-wrap gap-3 md:gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {activeProject.liveUrl && (
                      <Button
                        className="unified-button group text-sm md:text-base bg-black/30 border border-white/10 hover:border-mint-400/50 transition-all duration-300 hover:bg-black/50 hover:shadow-lg hover:shadow-mint-400/30"
                        onClick={() => window.open(activeProject.liveUrl, "_blank")}
                        title={`View live demo of ${activeProject.title}`}
                      >
                        <span className="button-content">VIEW DEMO</span>
                      </Button>
                    )}
                    {activeProject.repoUrl && (
                      <Button
                        className="unified-button group text-sm md:text-base bg-black/30 border border-white/10 hover:border-mint-400/50 transition-all duration-300 hover:bg-black/50 hover:shadow-lg hover:shadow-mint-400/30"
                        onClick={() => window.open(activeProject.repoUrl, "_blank")}
                        title={`View source code of ${activeProject.title}`}
                      >
                        <span className="button-content">SEE CODE</span>
                      </Button>
                    )}
                    {activeProject.caseStudyUrl && (
                      <Button
                        className="unified-button group text-sm md:text-base bg-black/30 border border-white/10 hover:border-mint-400/50 transition-all duration-300 hover:bg-black/50 hover:shadow-lg hover:shadow-mint-400/30"
                        onClick={() => window.open(activeProject.caseStudyUrl, "_blank")}
                        title={`Read case study about ${activeProject.title}`}
                      >
                        <span className="button-content">CASE STUDY</span>
                      </Button>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.div 
            className="flex items-center justify-center mt-12 pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center gap-6">
              <motion.button
                className="p-3 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                onClick={() => navigateProject("prev")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={projects.length <= 1}
                aria-label="Previous project"
              >
                <ArrowRight className="w-6 h-6 rotate-180 text-white" />
              </motion.button>
              <span className="text-sm md:text-base text-gray-300 font-light text-center min-w-[120px]">
                {activeProjectIndex + 1} / {projects.length}
              </span>
              <motion.button
                className="p-3 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                onClick={() => navigateProject("next")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={projects.length <= 1}
                aria-label="Next project"
              >
                <ArrowRight className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 