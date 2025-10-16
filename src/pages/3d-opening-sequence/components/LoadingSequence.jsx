import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const LoadingSequence = ({ onComplete, duration = 4000, isMobile = false, devicePerformance = 'high' }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = [
    { label: "Web Solutions", progress: 25 },
    { label: "App Solutions", progress: 50 },
    { label: "Pos Solutions", progress: 75 },
    { label: "Networking & CCTV", progress: 100 }
  ];

  // Optimize duration based on device performance
  const optimizedDuration = useMemo(() => {
    if (devicePerformance === 'low') return duration * 0.7;
    if (isMobile) return duration * 0.8;
    return duration;
  }, [duration, isMobile, devicePerformance]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (optimizedDuration / 50));

        // Update phase based on progress
        const phaseIndex = Math.floor((newProgress / 100) * phases?.length);
        setCurrentPhase(Math.min(phaseIndex, phases?.length - 1));

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [optimizedDuration, onComplete, phases?.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-glass-base to-background">
      {/* Background pattern - optimized for mobile */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse" />
        {Array.from({ length: isMobile ? 10 : 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: isMobile ? 3 : 2,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo formation animation - Mobile optimized */}
        <motion.div
          className={`${isMobile ? 'mb-6' : 'mb-8'} flex justify-center`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: isMobile ? 0.8 : 1, ease: "easeOut" }}
        >
          <div className="relative">
            <motion.div
              className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} glass-morphism rounded-xl flex items-center justify-center`}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(139, 92, 246, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{
                duration: isMobile ? 3 : 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} rounded-lg overflow-hidden flex items-center justify-center`}
                animate={{
                  rotate: [0, 180, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: isMobile ? 4 : 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img
                  src="/new_brand.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Orbiting particles - reduced on mobile */}
            {Array.from({ length: isMobile ? 2 : 3 }, (_, i) => (
              <motion.div
                key={i}
                className={`absolute ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-accent/60 rounded-full`}
                style={{
                  left: "50%",
                  top: "50%",
                  marginLeft: isMobile ? "-3px" : "-4px",
                  marginTop: isMobile ? "-3px" : "-4px"
                }}
                animate={{
                  x: [0, Math.cos((i * 120) * Math.PI / 180) * (isMobile ? 30 : 40)],
                  y: [0, Math.sin((i * 120) * Math.PI / 180) * (isMobile ? 30 : 40)],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: isMobile ? 3 : 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Loading text - Mobile responsive */}
        <motion.h2
          className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold bg-gradient-to-r from-glass-text-primary to-primary bg-clip-text text-transparent mb-2`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.5 }}
        >
          R-Tech Solutions
        </motion.h2>

        {/* Phase indicator */}
        <motion.p
          className={`text-glass-text-secondary ${isMobile ? 'mb-6' : 'mb-8'} font-mono ${isMobile ? 'text-xs' : 'text-sm'}`}
          key={currentPhase}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {phases?.[currentPhase]?.label}
        </motion.p>

        {/* Progress bar container */}
        <div className="relative mb-6">
          <div className="w-full h-2 glass-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "100%"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          {/* Progress percentage */}
          <motion.span
            className="absolute -top-6 right-0 text-xs text-glass-text-secondary font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-1">
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary/60 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Completion message */}
        {progress >= 100 && (
          <motion.p
            className="text-success text-sm font-medium mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Experience Ready
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default LoadingSequence;