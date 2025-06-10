import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, BookText, X, Star, Shield, Code, Database, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "../types";

interface Category {
  id: "security" | "creative" | "data" | "ai" | "all";
  label: string;
  icon: React.ReactNode;
  color: string;
}

const categories: Category[] = [
  {
    id: "security",
    label: "SECURITY TOOLS",
    icon: <Shield className="w-5 h-5" />,
    color: "from-red-500/20 to-red-600/20"
  },
  {
    id: "creative",
    label: "CREATIVE TECH",
    icon: <Code className="w-5 h-5" />,
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    id: "data",
    label: "DATA TOOLS",
    icon: <Database className="w-5 h-5" />,
    color: "from-green-500/20 to-green-600/20"
  },
  {
    id: "ai",
    label: "AI SOLUTIONS",
    icon: <Brain className="w-5 h-5" />,
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    id: "all",
    label: "ALL PROJECTS",
    icon: <Star className="w-5 h-5" />,
    color: "from-mint-400/20 to-sage-400/20"
  }
];

// Project Pod Component
const ProjectPod = ({ 
  project, 
  category,
  isExpanded,
  onExpand,
  onClick 
}: { 
  project: Project;
  category: Category;
  isExpanded: boolean;
  onExpand: () => void;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden",
        "bg-gradient-to-br",
        category.color,
        "backdrop-blur-sm",
        "border border-white/5",
        "transition-all duration-300 ease-out",
        "cursor-pointer",
        isExpanded ? "w-80" : "w-64"
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        width: isExpanded ? 320 : 256
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 0 20px rgba(108,200,170,0.3)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Preview Container */}
      <div className="relative w-full h-32 overflow-hidden">
        <img
          src={project.preview}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {category.icon}
            <h3 className="text-sm font-medium text-white">{project.title}</h3>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-gray-300 line-clamp-2"
              >
                {project.summary}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {project.liveUrl && (
              <Button
                size="sm"
                variant="ghost"
                className="h-6 px-2 text-xs text-white/60 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.liveUrl, "_blank");
                }}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View
              </Button>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-xs text-white/60 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
          >
            {isExpanded ? "Less" : "More"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Project Lane Component
const ProjectLane = ({
  category,
  projects,
  onProjectClick
}: {
  category: Category;
  projects: Project[];
  onProjectClick: (project: Project) => void;
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll animation
  useEffect(() => {
    if (!containerRef.current || isPaused || isDragging) return;

    const container = containerRef.current;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    let scrollAmount = 0;

    const animate = () => {
      if (!container || isPaused || isDragging) return;

      scrollAmount += 0.5;
      if (scrollAmount >= scrollWidth - clientWidth) {
        scrollAmount = 0;
      }
      container.scrollLeft = scrollAmount;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isDragging]);

  // Touch/Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - containerRef.current!.offsetLeft);
    setScrollLeft(containerRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative mb-8">
      {/* Lane Label */}
      <div className="flex items-center gap-2 mb-4">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center",
          "bg-gradient-to-br",
          category.color
        )}>
          {category.icon}
        </div>
        <h3 className="text-sm font-medium text-white">{category.label}</h3>
      </div>

      {/* Projects Container */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {projects.map((project) => (
          <ProjectPod
            key={project.id}
            project={project}
            category={category}
            isExpanded={expandedProjectId === project.id}
            onExpand={() => setExpandedProjectId(
              expandedProjectId === project.id ? null : project.id
            )}
            onClick={() => onProjectClick(project)}
          />
        ))}
      </div>
    </div>
  );
};

// Project Detail Modal
const ProjectDetailModal = ({ project, category, onClose }: { 
  project: Project;
  category: Category;
  onClose: () => void;
}) => {
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
          className="relative bg-black/80 border border-white/10 rounded-xl p-6 max-w-4xl w-full modal-content"
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
                  backgroundImage: `url(${project.preview})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  "bg-gradient-to-br",
                  category.color
                )}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-light text-white">{project.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-6">{project.description}</p>
              
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

export default function ProjectArcade({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category["id"]>("all");

  // Filter projects based on active category
  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  // Group projects by category
  const projectsByCategory = categories
    .filter(category => category.id !== "all")
    .map(category => ({
      ...category,
      projects: projects.filter(project => project.category === category.id)
    }));

  return (
    <div className="relative w-full">
      {/* Category Filter */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg",
              "bg-gradient-to-br",
              category.color,
              "backdrop-blur-sm",
              "border border-white/5",
              "transition-all duration-300",
              activeCategory === category.id
                ? "scale-105 border-white/20"
                : "hover:scale-102"
            )}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon}
            <span className="text-sm font-medium text-white">{category.label}</span>
          </button>
        ))}
      </div>

      {/* Project Lanes */}
      {activeCategory === "all" ? (
        projectsByCategory.map((category) => (
          <ProjectLane
            key={category.id}
            category={category}
            projects={category.projects}
            onProjectClick={setSelectedProject}
          />
        ))
      ) : (
        <ProjectLane
          category={categories.find(c => c.id === activeCategory)!}
          projects={filteredProjects}
          onProjectClick={setSelectedProject}
        />
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            category={categories.find(c => c.id === selectedProject.category)!}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 