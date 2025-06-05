import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import ProjectNode from "./ProjectNode";
import BinaryBeltBackground from "./BinaryBeltBackground";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  image: string;
  demo: string;
  caseStudy: string;
  github?: string;
  features?: string[];
}

interface StarBeltShowcaseProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

interface NodeData {
  id: number;
  project: Project;
  size: number;
  arcPosition: number;
  depth: number;
  initialOffset: { x: number; y: number };
  floatAmplitude: number;
  floatDuration: number;
}

const BELT_HEIGHT = 800;
const BELT_VIEWPORT_MULTIPLIER = 2.5;
const NUM_NODES = 12;

const generateNodes = (projects: Project[]): NodeData[] => {
  const sourceProjects = projects.length < NUM_NODES 
    ? Array(Math.ceil(NUM_NODES / projects.length)).fill(projects).flat().slice(0, NUM_NODES) 
    : projects.slice(0, NUM_NODES);

  return sourceProjects.map((project, i) => {
    const arcPosition = i / NUM_NODES;
    const randomArcOffset = (Math.random() - 0.5) * 0.05;
    const finalArcPosition = Math.max(0, Math.min(1, arcPosition + randomArcOffset));

    // Increased base size range (120px to 160px)
    const size = 120 + Math.random() * 40;
    const depth = (size - 120) / 40;

    // Increased spacing between nodes
    const initialOffset = {
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 200,
    };

    const floatAmplitude = 4 + depth * 4;
    const floatDuration = 8 + (1 - depth) * 4;

    return {
      id: i,
      project,
      size,
      arcPosition: finalArcPosition,
      depth,
      initialOffset,
      floatAmplitude,
      floatDuration,
    };
  });
};

export default function StarBeltShowcase({ projects, onProjectClick }: StarBeltShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    setIsClient(true);
    setNodes(generateNodes(projects));
  }, [projects]);

  useEffect(() => {
    if (isClient) {
      setViewportWidth(window.innerWidth);
      const handleResize = () => setViewportWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isClient]);

  const totalBeltWidth = viewportWidth * BELT_VIEWPORT_MULTIPLIER;

  const beltVariants = {
    animate: {
      x: ['0px', `-${viewportWidth}px`],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 400,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef} style={{ height: BELT_HEIGHT }}>
      {/* Binary Belt Background */}
      <BinaryBeltBackground />

      {isClient && viewportWidth > 0 && totalBeltWidth > 0 ? (
        <motion.div
          className="absolute top-0 left-0 h-full flex items-center justify-center"
          style={{ width: totalBeltWidth, minWidth: totalBeltWidth }}
          variants={beltVariants}
          animate="animate"
        >
          {nodes.map(node => {
            const nodeX = node.arcPosition * totalBeltWidth;
            // Smoother arc with reduced amplitude
            const arcY = Math.sin(node.arcPosition * Math.PI) * (BELT_HEIGHT / 4);
            const nodeY = (BELT_HEIGHT / 2) + arcY + node.initialOffset.y;

            return (
              <ProjectNode
                key={node.id}
                nodeData={node}
                style={{
                  position: 'absolute',
                  left: `${nodeX + node.initialOffset.x}px`,
                  top: `${nodeY - node.size / 2}px`,
                  width: node.size,
                  height: node.size,
                  zIndex: Math.round(node.depth * 10),
                }}
                onProjectClick={onProjectClick}
              />
            );
          })}
        </motion.div>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-400">
          Loading Showcase...
        </div>
      )}
    </div>
  );
} 