import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const GlassParticleSystem = ({ isActive, intensity = 1, isMobile = false, devicePerformance = 'high' }) => {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Optimize particle count based on device performance and mobile status
  const optimizedParticleCount = useMemo(() => {
    let baseCount = 50;
    if (devicePerformance === 'low') baseCount = 20;
    else if (devicePerformance === 'medium') baseCount = 35;
    
    if (isMobile) baseCount *= 0.6;
    
    return Math.floor(baseCount * intensity);
  }, [intensity, isMobile, devicePerformance]);

  useEffect(() => {
    // Generate optimized particle data
    const newParticles = Array.from({ length: optimizedParticleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (isMobile ? 2 : 4) + (isMobile ? 1 : 2),
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 2,
      duration: Math.random() * (isMobile ? 2 : 3) + (isMobile ? 1.5 : 2),
      rotateSpeed: Math.random() * 360 + 180,
    }));
    setParticles(newParticles);
  }, [intensity, optimizedParticleCount, isMobile]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles?.map((particle) => (
        <motion.div
          key={particle?.id}
          className="absolute w-1 h-1 glass-morphism rounded-full"
          style={{
            left: `${particle?.x}%`,
            top: `${particle?.y}%`,
            width: `${particle?.size}px`,
            height: `${particle?.size}px`,
            opacity: particle?.opacity,
          }}
          initial={{ 
            scale: 0, 
            rotate: 0,
            y: 20 
          }}
          animate={isActive ? {
            scale: [0, 1, 0.8, 1],
            rotate: particle?.rotateSpeed,
            y: [-20, 20, -10, 0],
            opacity: [0, particle?.opacity, particle?.opacity * 0.7, particle?.opacity]
          } : {
            scale: 0,
            opacity: 0
          }}
          transition={{
            duration: particle?.duration,
            delay: particle?.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
      {/* Floating glass shards - optimized for mobile */}
      {Array.from({ length: isMobile ? 4 : (devicePerformance === 'low' ? 4 : 8) }, (_, i) => (
        <motion.div
          key={`shard-${i}`}
          className="absolute glass-interactive rounded-lg"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            width: `${Math.random() * (isMobile ? 15 : 20) + (isMobile ? 8 : 10)}px`,
            height: `${Math.random() * (isMobile ? 15 : 20) + (isMobile ? 8 : 10)}px`,
          }}
          initial={{ 
            scale: 0, 
            rotate: 0,
            opacity: 0 
          }}
          animate={isActive ? {
            scale: [0, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0, 0.6, 0.4],
            y: [0, isMobile ? -20 : -30, 0],
          } : {
            scale: 0,
            opacity: 0
          }}
          transition={{
            duration: isMobile ? 3 + i * 0.3 : 4 + i * 0.5,
            delay: i * 0.3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default GlassParticleSystem;