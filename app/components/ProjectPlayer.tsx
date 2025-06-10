import { motion, AnimatePresence } from "framer-motion";
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
    icon: <Star className="w-4 h-4" />,
  },
  {
    id: "security",
    label: "SECURITY",
    icon: <Key className="w-4 h-4" />,
  },
  {
    id: "creative",
    label: "CREATIVE",
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: "data",
    label: "DATA",
    icon: <Server className="w-4 h-4" />,
  },
  {
    id: "ai",
    label: "AI",
    icon: <Brain className="w-4 h-4" />,
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
    <div ref={containerRef} className="relative w-full py-24 section-padding">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-24 text-center">
        <motion.h2 
          className="text-4xl md:text-6xl font-light mb-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          FEATURED PROJECTS
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore Kodex Studio's signature projects. Each solution comes alive—see it in motion, understand its impact, and dive deeper with live demos or code.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Category Filter */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-16">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              onHoverStart={() => setIsHovered(category.id)}
              onHoverEnd={() => setIsHovered(null)}
              className={cn(
                "w-full px-4 py-2 rounded-full md:rounded-lg md:px-6 md:py-4",
                "bg-black/30 backdrop-blur-sm border transition-all duration-300",
                activeCategory === category.id
                  ? "border-mint-400/30"
                  : "border-white/5 hover:border-white/10"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                <motion.div
                  className={cn(
                    "w-4 h-4 md:w-8 md:h-8 rounded-full md:rounded-lg flex items-center justify-center",
                    "bg-gradient-to-br from-mist-500/20 to-mint-500/20", // Consistent background
                    "transition-all duration-300"
                  )}
                  initial={{ scale: 1 }}
                  animate={{ scale: activeCategory === category.id || isHovered === category.id ? 1.2 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {category.icon}
                </motion.div>
                <div>
                  <span className="text-sm font-medium text-white block text-center">{category.label}</span>
                </div>
              </div>
              <motion.div
                className="absolute inset-0 rounded-full md:rounded-lg bg-gradient-to-r from-mint-400/5 to-sage-400/5 opacity-0"
                initial={false}
                animate={{ 
                  opacity: activeCategory === category.id ? 1 : isHovered === category.id ? 0.5 : 0 
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Project Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeProject && (filteredProjects.length > 0) ? (
              <motion.div
                key={activeProject.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Project Preview */}
                <motion.div
                  className="relative aspect-[16/9] rounded-lg overflow-hidden bg-black/30 border border-white/10 mb-8"
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
                    "absolute top-4 left-4 px-3 py-1 rounded-full",
                    "bg-gradient-to-r from-mist-500/20 to-mint-500/20 backdrop-blur-sm border border-white/10", // Consistent background
                    "flex items-center gap-2"
                  )}>
                    <motion.div
                      className={cn("w-4 h-4 rounded-full flex items-center justify-center text-mint-400")}
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {categories.find(c => c.id === activeProject.category)?.icon}
                    </motion.div>
                    <span className="text-xs font-medium text-white">
                      {categories.find(c => c.id === activeProject.category)?.label}
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
                  <h3 className="text-4xl md:text-5xl font-light mb-4">{activeProject.title}</h3>
                  <p className="text-xl text-gray-400 mb-8">{activeProject.summary}</p>
                  
                  {/* Tech Stack Tags */}
                  {activeProject.techStack && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {activeProject.techStack.map((tech, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1 rounded-full bg-gradient-to-br from-mist-500/10 to-sage-500/10 text-xs text-gray-300 border border-white/10 hover:border-mint-400/30 transition-all duration-300"
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
                        className="unified-button primary group"
                        onClick={() => window.open(activeProject.liveUrl, "_blank")}
                      >
                        <span className="button-content">
                          VIEW DEMO
                        </span>
                      </Button>
                    )}
                    {activeProject.repoUrl && (
                      <Button
                        className="unified-button group"
                        onClick={() => window.open(activeProject.repoUrl, "_blank")}
                      >
                        <span className="button-content">
                          SEE CODE
                        </span>
                      </Button>
                    )}
                    {activeProject.caseStudyUrl && (
                      <Button
                        className="unified-button group"
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
                className="text-center text-gray-400 py-24"
              >
                <p>No projects found for this category.</p>
                <Button
                  className="unified-button mt-8"
                  onClick={() => handleCategoryChange("all")}
                >
                  View All Projects
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <motion.button
                className="p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                onClick={() => navigateProject("prev")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={filteredProjects.length <= 1}
              >
                <ArrowRight className="w-6 h-6 rotate-180 text-white" />
              </motion.button>
              <span className="text-sm text-gray-400">
                {activeProjectIndex + 1} / {filteredProjects.length}
              </span>
              <motion.button
                className="p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                onClick={() => navigateProject("next")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={filteredProjects.length <= 1}
              >
                <ArrowRight className="w-6 h-6 text-white" />
              </motion.button>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-mint-400" />
              <span className="text-sm text-gray-400">
                {filteredProjects.length} {activeCategory === "all" ? "Total Projects" : `${activeCategory.toUpperCase()} Projects`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 