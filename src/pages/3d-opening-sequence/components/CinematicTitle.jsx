import React from 'react';
import { motion } from 'framer-motion';

const CinematicTitle = ({ isVisible, isMobile = false, shouldReduceMotion = false }) => {
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: isMobile ? 1 : 1.5,
        ease: "easeOut",
        staggerChildren: isMobile ? 0.1 : 0.2
      }
    }
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: isMobile ? 0.6 : 0.8,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      filter: "blur(5px)"
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: isMobile ? 0.8 : 1,
        delay: isMobile ? 0.8 : 1,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: shouldReduceMotion ? 0.3 : [0.3, 0.7, 0.4],
      scale: shouldReduceMotion ? 1 : [0.9, 1.1, 1],
      transition: {
        duration: isMobile ? 1 : 0.8,
        delay: 0,
        repeat: shouldReduceMotion ? 0 : Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const title = "R-Tech Solutions";
  const subtitle = "(Pvt) ltd";

  return (
    <div className="relative z-10 text-center px-4 md:px-0">
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 -m-8 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-3xl"
        variants={glowVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      />
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative"
      >
        {/* Main title - Mobile responsive */}
        <div className="flex flex-wrap justify-center items-center mb-4 -mx-1">
          {title?.split('')?.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className={`${isMobile ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl'} font-bold bg-gradient-to-br from-glass-text-primary via-primary to-accent bg-clip-text text-transparent inline-block transform-3d px-0.5`}
              style={{
                textShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                letterSpacing: isMobile ? '-0.01em' : '-0.02em'
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle - Mobile responsive */}
        <motion.div
          variants={subtitleVariants}
          className="relative"
        >
          <h2 className={`${isMobile ? 'text-lg sm:text-xl md:text-2xl' : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'} font-light text-glass-text-secondary font-mono tracking-wider`}>
            {subtitle}
          </h2>

          {/* Underline effect */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mt-4 mx-auto"
            initial={{ width: 0 }}
            animate={isVisible ? { width: isMobile ? "min(150px, 60vw)" : "min(200px, 80vw)" } : { width: 0 }}
            transition={{ duration: isMobile ? 1 : 1.5, delay: isMobile ? 1.2 : 1.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Tagline - Mobile responsive */}
        <motion.p
          className={`${isMobile ? 'text-xs sm:text-sm md:text-base' : 'text-sm sm:text-base md:text-lg lg:text-xl'} text-glass-text-secondary/80 mt-6 md:mt-8 max-w-2xl mx-auto leading-relaxed px-4`}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: isMobile ? 0.8 : 1, delay: isMobile ? 1.5 : 2, ease: "easeOut" }}
        >
          Where technology becomes art, and digital experiences breathe with life.
          <br />
          <span className="text-primary font-medium">Transparent Innovation</span> crafted with purpose.
        </motion.p>

        {/* Floating accent elements - reduced on mobile */}
        {Array.from({ length: isMobile ? 2 : 4 }, (_, i) => (
          <motion.div
            key={i}
            className={`absolute ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} glass-morphism rounded-full`}
            style={{
              left: `${20 + i * 20}%`,
              top: `${-10 + (i % 2) * 20}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? {
              opacity: [0, 0.6, 0.3],
              scale: [0, 1.5, 1],
              y: [0, isMobile ? -15 : -20, 0]
            } : {
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: isMobile ? 2.5 : 3,
              delay: isMobile ? 2 + i * 0.2 : 2.5 + i * 0.3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default CinematicTitle;