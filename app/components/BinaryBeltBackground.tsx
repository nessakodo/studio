import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const generateBinaryString = (length: number) => {
  return Array.from({ length }, () => Math.random() > 0.5 ? '1' : '0').join('');
};

export default function BinaryBeltBackground() {
  const [binaryStrings, setBinaryStrings] = useState<string[]>([]);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateViewport = () => {
      setViewportWidth(window.innerWidth);
      // Generate enough binary strings to fill the viewport
      const numStrings = Math.ceil(window.innerWidth / 100) + 1;
      setBinaryStrings(Array.from({ length: numStrings }, () => generateBinaryString(50)));
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
      >
        {binaryStrings.map((binary, index) => (
          <motion.div
            key={index}
            className="absolute text-[8px] font-mono text-mint-400/30"
            style={{
              left: `${index * 100}px`,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3 + index * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {binary}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 