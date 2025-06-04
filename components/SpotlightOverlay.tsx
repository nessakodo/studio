"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SpotlightOverlayProps {
  containerRef: React.RefObject<HTMLElement | null>;
  hoveredExpertiseIndex: number | null; // Receive the hovered index
}

const SpotlightOverlay: React.FC<SpotlightOverlayProps> = ({
  containerRef,
  hoveredExpertiseIndex,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightSize = 300; // Increased size for a more substantial glow

  // Smooth the mouse movement with spring physics
  const springConfig = { stiffness: 150, damping: 15, mass: 0.8 }; // Adjusted for smoother feel
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Effect to update spotlight position when hoveredExpertiseIndex changes
  useEffect(() => {
    if (containerRef.current !== null && hoveredExpertiseIndex !== null) {
      const cardElements = containerRef.current.querySelectorAll(".expertise-card-item");
      const hoveredElement = cardElements[hoveredExpertiseIndex] as HTMLElement;

      if (hoveredElement) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const elementRect = hoveredElement.getBoundingClientRect();

        // Position spotlight at the center of the hovered element relative to the container
        const elementCenterX = elementRect.left + elementRect.width / 2 - containerRect.left;
        const elementCenterY = elementRect.top + elementRect.height / 2 - containerRect.top;

        mouseX.set(elementCenterX);
        mouseY.set(elementCenterY);
      }
    } else if (containerRef.current !== null && hoveredExpertiseIndex === null) {
       // Optional: move spotlight off-screen or fade out when no card is hovered
       // For now, let's just let it stay at the last hovered position or a default
       // mouseX.set(-spotlightSize); 
       // mouseY.set(-spotlightSize);
    }
  }, [hoveredExpertiseIndex, containerRef, mouseX, mouseY, spotlightSize]); // Added dependencies

  // Styles for the spotlight element
  const spotlightStyle = {
    position: "absolute" as "absolute",
    left: useTransform(smoothMouseX, (x) => x - spotlightSize / 2),
    top: useTransform(smoothMouseY, (y) => y - spotlightSize / 2),
    width: spotlightSize,
    height: spotlightSize,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(108,200,170,0.3) 0%, rgba(108,200,170,0) 60%)", // Subtle mint glow
    pointerEvents: "none" as "none", // Allow mouse events to pass through
    zIndex: 5, // Above cards, below header/nav
    filter: "blur(50px)", // Increased blur
    opacity: hoveredExpertiseIndex !== null ? 0.8 : 0, // Animate opacity based on hover state
    transition: "opacity 0.3s ease-out", // Smooth opacity transition
  };

  return (
    <div
      className="absolute inset-0 z-0"
      // Removed mouse/touch handlers from here
    >
      <motion.div
        style={spotlightStyle}
        // Removed initial, animate, exit props here to use style-based animation
      />
    </div>
  );
};

export default SpotlightOverlay; 