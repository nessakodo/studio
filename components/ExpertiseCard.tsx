"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExpertiseCardProps {
  title: string;
  description: string;
  microcopy: string;
  isActive: boolean;
  className?: string;
  // Add prop to indicate which animation to show
  animationType?: 'code' | 'shield' | 'nodes';
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({
  title,
  description,
  microcopy,
  isActive,
  className,
  animationType,
}) => {

  // Sample SVG Animation Component (Shield)
  const ShieldAnimation = () => (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-shield h-16 w-16 text-mint-400"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.path 
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
      />
      {/* Add more animated shield elements here if desired */}
    </motion.svg>
  );

  // Sample Code Animation Placeholder
  const CodeAnimation = () => (
    <div className="text-sm font-mono text-sage-400">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {`const secureFunction = (data) => {`}
      </motion.p>
       <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {`  // Validate and sanitize`}
      </motion.p>
       <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {`  return processedData;`}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {`};`}
      </motion.p>
    </div>
  );

  // Sample Nodes Animation Placeholder
  const NodesAnimation = () => (
    <div className="w-full h-full relative">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Replace with actual node/line SVG or Canvas animation */}
        <div className="w-16 h-16 rounded-full bg-mist-400/30 animate-pulse"></div>
      </motion.div>
    </div>
  );

  const renderAnimation = () => {
    if (!isActive) return null;

    switch (animationType) {
      case 'shield':
        return <ShieldAnimation />;
      case 'code':
        return <CodeAnimation />;
      case 'nodes':
        return <NodesAnimation />;
      default:
        return null;
    }
  };

  return (
    <Card
      className={cn(
        "mobile-card unified-card h-[420px] rounded-lg group backdrop-blur-md",
        isActive
          ? "bg-black/20 border border-mint-400/30 shadow-lg transform -translate-y-2"
          : "bg-black/10 border border-white/5",
        "transition-all duration-300",
        className
      )}
    >
      <CardContent className="p-8 flex flex-col h-full">
        <div className="flex-1">
          {/* Microcopy / Category area */}
          <motion.span
            className={cn(
              "thinking-category inline-block mb-2",
              isActive ? "opacity-100 scale-105" : "opacity-80 scale-100"
            )}
            transition={{ duration: 0.3 }}
          >
            {microcopy}
          </motion.span>
          {/* Title */}
          <motion.h3
            className={cn(
              "text-xl font-light mb-4 text-white",
              isActive ? "text-white/90" : "",
              "transition-all duration-300"
            )}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          {/* Description */}
          <motion.p
            className={cn(
              "mobile-text text-base text-gray-300 mb-4",
              isActive ? "text-gray-200" : "",
              "transition-all duration-300"
            )}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
          {/* SVG/Canvas animation area */}
          <div className="w-full h-24 bg-gray-800 rounded-md flex items-center justify-center text-gray-400 overflow-hidden">
            {renderAnimation()}
          </div>
        </div>
        {/* Optional: Action Button area or more info */}
        <div className="mt-auto">
            {/* Could add a button here if needed */}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpertiseCard; 