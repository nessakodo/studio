import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, BookText, ChevronDown, Shield, Brain, Database, Code, ArrowRight, Star, Key, Sparkles, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "../types";

interface Category {
  id: "security" | "creative" | "data" | "ai" | "all";
  label: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    id: "all",
    label: "ALL PROJECTS",
    icon: null,
  },
  {
    id: "security",
    label: "SECURITY",
    icon: null,
  },
  {
    id: "creative",
    label: "CREATIVE",
    icon: null,
  },
  {
    id: "data",
    label: "DATA",
    icon: null,
  },
  {
    id: "ai",
    label: "AI",
    icon: null,
  }
];

interface ProjectPlayerProps {
  projects: Project[];
}

export default function ProjectPlayer({ projects }: ProjectPlayerProps) {
  const [activeCategory, setActiveCategory] = useState<Category["id"]>("all");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 1, 1, 0]);

  // Filter projects based on active category
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  useEffect(() => {
    // Reset active project index when category changes to ensure a valid project is shown
    setActiveProjectIndex(0);
  }, [activeCategory, filteredProjects.length]);

  const activeProject = filteredProjects[activeProjectIndex];

  // Handle project navigation
  const navigateProject = (direction: "next" | "prev") => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const newIndex = direction === "next"
      ? (activeProjectIndex + 1) % filteredProjects.length
      : (activeProjectIndex - 1 + filteredProjects.length) % filteredProjects.length;
    
    setActiveProjectIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Handle category change
  const handleCategoryChange = (categoryId: Category["id"]) => {
    if (isTransitioning || categoryId === activeCategory) return;
    setIsTransitioning(true);
    setActiveCategory(categoryId);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div ref={containerRef} className="relative w-full py-16 section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Category Filter */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              onHoverStart={() => setIsHovered(category.id)}
              onHoverEnd={() => setIsHovered(null)}
              className={cn(
                "relative w-full h-9 md:h-10 flex items-center justify-center",
                "px-4 py-1.5 rounded-full transition-all duration-300 overflow-hidden",
                "backdrop-blur-md",
                activeCategory === category.id
                  ? "bg-gradient-to-br from-mist-500/20 to-mint-500/20 border border-mint-400/30 text-mint-200"
                  : "bg-black/20 border border-white/5 hover:border-white/10 hover:bg-gradient-to-br hover:from-mist-500/10 hover:to-mint-500/10 text-white/80"
              )}
              whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(108,200,170,0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xs md:text-sm font-medium uppercase">{category.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Project Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeProject && (filteredProjects.length > 0) ? (
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
                    />
                  )}
                  {/* Category Chip */}
                  <div className={cn(
                    "absolute top-4 left-4 px-3 py-1.5 rounded-full",
                    "bg-gradient-to-r from-mist-500/20 to-mint-500/20 backdrop-blur-sm border border-white/10",
                    "flex items-center justify-center"
                  )}>
                    <span className="text-sm font-medium text-white">
                      {categories.find(c => c.id === activeProject.category)?.label.charAt(0).toUpperCase() + categories.find(c => c.id === activeProject.category)?.label.slice(1).toLowerCase()}
                    </span>
                  </div>
                </motion.div>

                {/* Project Info */}
                <motion.div
                  className="text-white"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-3xl md:text-4xl font-light mb-4">{activeProject.title}</h3>
                  <p className="text-lg md:text-xl text-gray-400 mb-6">{activeProject.summary}</p>
                  
                  {/* Tech Stack Tags */}
                  {activeProject.techStack && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeProject.techStack.map((tech, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1.5 rounded-full bg-gradient-to-br from-mist-500/10 to-sage-500/10 text-sm text-gray-300 border border-white/10 hover:border-mint-400/30 transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {activeProject.liveUrl && (
                      <Button
                        className="unified-button group text-sm md:text-base"
                        onClick={() => window.open(activeProject.liveUrl, "_blank")}
                      >
                        <span className="button-content">
                          VIEW DEMO
                        </span>
                      </Button>
                    )}
                    {activeProject.repoUrl && (
                      <Button
                        className="unified-button group text-sm md:text-base"
                        onClick={() => window.open(activeProject.repoUrl, "_blank")}
                      >
                        <span className="button-content">
                          SEE CODE
                        </span>
                      </Button>
                    )}
                    {activeProject.caseStudyUrl && (
                      <Button
                        className="unified-button group text-sm md:text-base"
                        onClick={() => window.open(activeProject.caseStudyUrl, "_blank")}
                      >
                        <span className="button-content">
                          CASE STUDY
                        </span>
                      </Button>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center text-gray-400 py-16"
              >
                <p className="text-lg">No projects found for this category.</p>
                <Button
                  className="unified-button mt-8 text-sm md:text-base"
                  onClick={() => handleCategoryChange("all")}
                >
                  View All Projects
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Navigation Arrows */}
          <div className="flex items-center justify-center mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center gap-4">
              <motion.button
                className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                onClick={() => navigateProject("prev")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={filteredProjects.length <= 1}
              >
                <ArrowRight className="w-6 h-6 rotate-180 text-white" />
              </motion.button>
              <span className="text-sm md:text-base text-gray-400 font-mono text-center">
                {activeProjectIndex + 1} / {filteredProjects.length}{' '}
                {activeCategory === "all"
                  ? "Total Projects"
                  : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).toLowerCase()} Projects`}
              </span>
              <motion.button
                className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                onClick={() => navigateProject("next")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={filteredProjects.length <= 1}
              >
                <ArrowRight className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 