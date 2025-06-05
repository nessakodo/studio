import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface NodeData {
  id: number;
  project: any; // Use any for now, refine later
  size: number;
  arcPosition: number; // 0 to 1 along the arc
  depth: number; // Affects size, opacity, speed, z-index
  initialOffset: { x: number; y: number }; // Random small deviation from arc
  floatAmplitude: number; // Amplitude for subtle floating
  floatDuration: number; // Duration for subtle floating
}

interface ConstellationLinesProps {
  nodes: NodeData[];
  beltWidth: number; // The total width of the animated belt container
  beltHeight: number; // The total height of the animated belt container
}

const CONNECTION_DISTANCE_THRESHOLD = 150; // Max distance for nodes to connect

// Function to calculate distance between two nodes
const calculateDistance = (node1: { x: number; y: number }, node2: { x: number; y: number }): number => {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Function to get screen coordinates for a node based on its data and belt dimensions
const getNodeScreenCoordinates = (node: NodeData, beltWidth: number, beltHeight: number) => {
   const nodeX = node.arcPosition * beltWidth + node.initialOffset.x;
   // Calculate Y position based on arc shape (e.g., a sine wave)
   const arcY = Math.sin(node.arcPosition * Math.PI) * (beltHeight / 2);
   const nodeY = (beltHeight / 2) + arcY + node.initialOffset.y;
   return { x: nodeX, y: nodeY };
}

export default function ConstellationLines({ nodes, beltWidth, beltHeight }: ConstellationLinesProps) {
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; opacity: number }[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || nodes.length === 0) return;

    const generatedLines: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = [];
    const nodeCoords = nodes.map(node => getNodeScreenCoordinates(node, beltWidth, beltHeight));

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = calculateDistance(nodeCoords[i], nodeCoords[j]);
        if (dist < CONNECTION_DISTANCE_THRESHOLD) {
          // Calculate opacity based on distance (closer = more opaque)
          const opacity = 1 - (dist / CONNECTION_DISTANCE_THRESHOLD);
          generatedLines.push({
            x1: nodeCoords[i].x,
            y1: nodeCoords[i].y,
            x2: nodeCoords[j].x,
            y2: nodeCoords[j].y,
            opacity: opacity * (nodes[i].depth * 0.5 + nodes[j].depth * 0.5 + 0.2), // Also factor in node depth
          });
        }
      }
    }
    setLines(generatedLines);

  }, [nodes, beltWidth, beltHeight, isClient]); // Recalculate lines if nodes or dimensions change

  if (!isClient || lines.length === 0) {
    return null; // Render nothing on server or if no lines
  }

  return (
    // SVG must be positioned over the exact same area as the animated belt container
    <svg
      className="absolute top-0 left-0 h-full w-full pointer-events-none"
      style={{ width: beltWidth, height: beltHeight }}
    >
      {lines.map((line, index) => (
        <line
          key={index}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="rgba(108, 200, 170, 0.3)" // Base ethereal line color
          strokeWidth={1 + (line.opacity * 2)} // Thicker lines for closer nodes
          style={{ opacity: line.opacity * 0.5 }} // Overall line transparency
        >
           {/* Optional: Add a subtle glow filter */}
           {/* <filter id={`glow-${index}`}>
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
           </defs>
           style={{ filter: `url(#glow-${index})` }} */}
        </line>
      ))}
    </svg>
  );
} 