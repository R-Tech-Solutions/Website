import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GlassParticleSystem = ({ isActive, intensity = 1 }) => {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particle data
    const particleCount = Math.floor(50 * intensity);
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      rotateSpeed: Math.random() * 360 + 180,
    }));
    setParticles(newParticles);
  }, [intensity]);

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
      {/* Floating glass shards */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`shard-${i}`}
          className="absolute glass-interactive rounded-lg"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
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
            y: [0, -30, 0],
          } : {
            scale: 0,
            opacity: 0
          }}
          transition={{
            duration: 4 + i * 0.5,
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