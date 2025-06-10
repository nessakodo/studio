import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
  demo: string;
  caseStudy: string;
  github?: string;
  features?: string[];
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key and click outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            className="fixed inset-y-6 left-4 right-4 md:left-auto md:right-10 md:w-[600px] lg:w-[700px] xl:w-[800px] z-50 overflow-y-auto rounded-2xl shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
          >
            <div className="min-h-full flex items-center justify-center p-4">
              <div className="relative w-full bg-black/90 backdrop-blur-xl rounded-xl border border-white/10">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-10"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Modal Content */}
                <div className="p-8 md:p-10 lg:p-12">
                  {/* Project Image */}
                  <div className="aspect-video rounded-lg overflow-hidden mb-6 relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-mint-400/20 to-transparent"
                      animate={{
                        opacity: [0.2, 0.3, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Project Details */}
                  <div className="space-y-6">
                    <h2
                      id="project-title"
                      className="text-2xl md:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-sage-400 via-mist-400 to-mint-400 leading-tight"
                    >
                      {project.title}
                    </h2>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features List */}
                    {project.features && project.features.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-light text-white">Key Features</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          {project.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-start space-x-2 text-gray-300"
                            >
                              <span className="w-1.5 h-1.5 mt-1 rounded-full bg-mint-400 shrink-0" />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-6">
                      <Button
                        className="unified-button primary showcase-modal-button"
                        onClick={() => window.open(project.demo, "_blank")}
                      >
                        <span className="button-content">LIVE DEMO</span>
                      </Button>
                      <Button
                        className="unified-button showcase-modal-button"
                        onClick={() => window.open(project.caseStudy, "_blank")}
                      >
                        <span className="button-content">CASE STUDY</span>
                      </Button>
                      {project.github && (
                        <Button
                          className="unified-button showcase-modal-button"
                          onClick={() => window.open(project.github, "_blank")}
                        >
                          <span className="button-content">GITHUB</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 