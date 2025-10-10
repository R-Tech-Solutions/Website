import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import GlassParticleSystem from './components/GlassParticleSystem';
import MorphingGeometry from './components/MorphingGeometry';
import CinematicTitle from './components/CinematicTitle';
import LoadingSequence from './components/LoadingSequence';
import InteractiveControls from './components/InteractiveControls';
import NavigationPrompt from './components/NavigationPrompt';

const OpeningSequence = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sequencePhase, setSequencePhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMotionReduced, setIsMotionReduced] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Sequence phases: 0=particles, 1=geometry, 2=title, 3=complete
  const totalPhases = 4;
  const phaseDuration = 3000; // 3 seconds per phase

  // Handle loading completion
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setUserInteracted(true);
  }, []);

  // Auto-advance sequence phases
  useEffect(() => {
    if (isLoading || !isPlaying || isMotionReduced) return;

    const timer = setTimeout(() => {
      if (sequencePhase < totalPhases - 1) {
        setSequencePhase(prev => prev + 1);
      } else {
        // Sequence complete, show navigation
        setTimeout(() => setShowNavigation(true), 1000);
      }
    }, phaseDuration);

    return () => clearTimeout(timer);
  }, [sequencePhase, isPlaying, isLoading, isMotionReduced]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e?.code) {
        case 'Space':
          e?.preventDefault();
          setIsPlaying(prev => !prev);
          setUserInteracted(true);
          break;
        case 'Escape':
          setShowNavigation(true);
          setUserInteracted(true);
          break;
        case 'KeyR':
          if (e?.ctrlKey || e?.metaKey) {
            e?.preventDefault();
            handleRestart();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Control handlers
  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
    setUserInteracted(true);
  }, []);

  const handleRestart = useCallback(() => {
    setSequencePhase(0);
    setIsPlaying(true);
    setShowNavigation(false);
    setUserInteracted(true);
  }, []);

  const handleSkip = useCallback(() => {
    setShowNavigation(true);
    setUserInteracted(true);
  }, []);

  const handleReduceMotion = useCallback(() => {
    setIsMotionReduced(prev => !prev);
    setUserInteracted(true);
  }, []);

  const handleExplore = useCallback(() => {
    setShowNavigation(false);
    setUserInteracted(true);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsMotionReduced(mediaQuery?.matches);
    
    const handleChange = (e) => setIsMotionReduced(e?.matches);
    mediaQuery?.addEventListener('change', handleChange);
    
    return () => mediaQuery?.removeEventListener('change', handleChange);
  }, []);

  // Background gradient that responds to sequence phase
  const getBackgroundGradient = () => {
    const gradients = [
      'from-background via-glass-base/50 to-background', // Phase 0: Particles
      'from-background via-primary/10 to-background', // Phase 1: Geometry
      'from-background via-accent/10 to-primary/5', // Phase 2: Title
      'from-background via-glass-surface/30 to-background' // Phase 3: Complete
    ];
    return gradients?.[sequencePhase] || gradients?.[0];
  };

  if (isLoading) {
    return <LoadingSequence onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Header />
      {/* Dynamic background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()}`}
        animate={{
          opacity: [0.8, 1, 0.9, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      {/* Main sequence container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Sequence content */}
          <div className="relative h-screen flex items-center justify-center">
            
            {/* Phase 0: Particle System */}
            <AnimatePresence>
              {(sequencePhase >= 0 && !isMotionReduced) && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: sequencePhase >= 0 ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <GlassParticleSystem 
                    isActive={isPlaying && sequencePhase >= 0}
                    intensity={isMotionReduced ? 0.3 : 1}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 1: Morphing Geometry */}
            <AnimatePresence>
              {sequencePhase >= 1 && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: sequencePhase >= 1 ? 1 : 0,
                    scale: sequencePhase >= 1 ? 1 : 0.5
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <MorphingGeometry 
                    isActive={isPlaying && sequencePhase >= 1 && !isMotionReduced}
                    variant="primary"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 2: Cinematic Title */}
            <AnimatePresence>
              {sequencePhase >= 2 && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: sequencePhase >= 2 ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <CinematicTitle 
                    isVisible={isPlaying && sequencePhase >= 2}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Background geometric elements */}
            {!isMotionReduced && (
              <>
                <motion.div
                  className="absolute top-20 left-20 w-32 h-32"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <MorphingGeometry 
                    isActive={isPlaying}
                    variant="secondary"
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-20 right-20 w-24 h-24"
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 0.8, 1],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                >
                  <MorphingGeometry 
                    isActive={isPlaying}
                    variant="tertiary"
                  />
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Interactive Controls */}
      <InteractiveControls
        onPlayPause={handlePlayPause}
        onRestart={handleRestart}
        onSkip={handleSkip}
        onReduceMotion={handleReduceMotion}
        isPlaying={isPlaying}
        isMotionReduced={isMotionReduced}
        showControls={userInteracted}
      />
      {/* Navigation Prompt */}
      <AnimatePresence>
        {showNavigation && (
          <NavigationPrompt
            isVisible={showNavigation}
            onExplore={handleExplore}
          />
        )}
      </AnimatePresence>
      {/* Accessibility announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {sequencePhase === 0 && "Glass particle system initializing"}
        {sequencePhase === 1 && "Morphing geometry animation active"}
        {sequencePhase === 2 && "Cinematic title sequence displaying"}
        {sequencePhase === 3 && "Opening sequence complete"}
        {showNavigation && "Navigation options available"}
      </div>
      {/* Skip link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
    </div>
  );
};

export default OpeningSequence;