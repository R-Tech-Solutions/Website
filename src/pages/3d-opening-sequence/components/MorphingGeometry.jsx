import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const MorphingGeometry = ({ isActive, variant = 'primary', isMobile = false, devicePerformance = 'high' }) => {
  const [currentShape, setCurrentShape] = useState(0);
  
  const shapes = [
    // Hexagon
    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
    // Circle
    "circle(50% at 50% 50%)",
    // Diamond
    "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    // Triangle
    "polygon(50% 0%, 0% 100%, 100% 100%)",
    // Octagon
    "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
  ];

  // Optimize shape change interval based on device performance
  const shapeChangeInterval = useMemo(() => {
    if (devicePerformance === 'low') return 4000;
    if (isMobile) return 3500;
    return 3000;
  }, [isMobile, devicePerformance]);

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes?.length);
    }, shapeChangeInterval);

    return () => clearInterval(interval);
  }, [isActive, shapes?.length, shapeChangeInterval]);

  const variants = {
    primary: "from-primary/20 to-accent/20",
    secondary: "from-accent/15 to-primary/15",
    tertiary: "from-glass-surface/30 to-glass-base/30"
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className={`${isMobile ? 'w-48 h-48' : 'w-64 h-64'} bg-gradient-to-br ${variants?.[variant]} backdrop-blur-glass border border-white/20 shadow-glass`}
        style={{
          clipPath: shapes?.[currentShape],
        }}
        initial={{ 
          scale: 0, 
          rotate: 0,
          opacity: 0 
        }}
        animate={isActive ? {
          scale: [0, 1.1, 1],
          rotate: [0, 180, 360],
          opacity: [0, 0.8, 0.6],
        } : {
          scale: 0,
          opacity: 0
        }}
        transition={{
          duration: isMobile ? 1.5 : 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      {/* Inner morphing element - optimized for mobile */}
      <motion.div
        className={`absolute ${isMobile ? 'w-24 h-24' : 'w-32 h-32'} bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-glass-heavy border border-white/30 shadow-glass-subtle`}
        style={{
          clipPath: shapes?.[(currentShape + 2) % shapes?.length],
        }}
        initial={{ 
          scale: 0, 
          rotate: 0 
        }}
        animate={isActive ? {
          scale: [0, 1.2, 1],
          rotate: [360, 180, 0],
        } : {
          scale: 0
        }}
        transition={{
          duration: isMobile ? 2 : 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5
        }}
      />
      {/* Orbiting elements - reduced on mobile */}
      {Array.from({ length: isMobile ? 2 : (devicePerformance === 'low' ? 2 : 3) }, (_, i) => (
        <motion.div
          key={i}
          className={`absolute ${isMobile ? 'w-3 h-3' : 'w-4 h-4'} glass-morphism rounded-full`}
          initial={{ 
            scale: 0,
            x: 0,
            y: 0
          }}
          animate={isActive ? {
            scale: [0, 1, 0.8],
            x: [0, Math.cos((i * 120) * Math.PI / 180) * (isMobile ? 120 : 150)],
            y: [0, Math.sin((i * 120) * Math.PI / 180) * (isMobile ? 120 : 150)],
            rotate: [0, 360]
          } : {
            scale: 0,
            x: 0,
            y: 0
          }}
          transition={{
            duration: isMobile ? 3 : 4,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default MorphingGeometry;