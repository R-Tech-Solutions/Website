import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SEO from '../../components/SEO';
import { generatePageSEO } from '../../utils/seoUtils';
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
  const [showNavigation, setShowNavigation] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [devicePerformance, setDevicePerformance] = useState('high');

  // Use framer-motion's built-in reduced motion detection
  const shouldReduceMotion = useReducedMotion();

  // Sequence phases: 0=particles, 1=geometry, 2=title, 3=complete
  const totalPhases = 4;
  const phaseDuration = useMemo(() => isMobile ? 2000 : 3000, [isMobile]); // Faster on mobile

  // Detect mobile device and performance
  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
      
      // Detect device performance based on hardware concurrency and memory
      const cores = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 4;
      const performance = cores >= 8 && memory >= 8 ? 'high' : cores >= 4 && memory >= 4 ? 'medium' : 'low';
      setDevicePerformance(performance);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Handle loading completion with optimized timing
  const handleLoadingComplete = useCallback(() => {
    // Add small delay to ensure smooth transition
    setTimeout(() => {
      setIsLoading(false);
      setUserInteracted(true);
    }, 300);
  }, []);

  // Auto-advance sequence phases with mobile optimization
  useEffect(() => {
    if (isLoading || !isPlaying || shouldReduceMotion) return;

    const timer = setTimeout(() => {
      if (sequencePhase < totalPhases - 1) {
        setSequencePhase(prev => prev + 1);
      } else {
        // Sequence complete, show navigation with optimized delay
        setTimeout(() => setShowNavigation(true), isMobile ? 500 : 1000);
      }
    }, phaseDuration);

    return () => clearTimeout(timer);
  }, [sequencePhase, isPlaying, isLoading, shouldReduceMotion, phaseDuration, isMobile]);

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

  const handleExplore = useCallback(() => {
    setShowNavigation(false);
    setUserInteracted(true);
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
    return <LoadingSequence onComplete={handleLoadingComplete} isMobile={isMobile} devicePerformance={devicePerformance} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SEO {...generatePageSEO('home')} />
      {/* Dynamic background with mobile optimization */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()}`}
        animate={shouldReduceMotion ? {} : {
          opacity: [0.8, 1, 0.9, 1]
        }}
        transition={shouldReduceMotion ? {} : {
          duration: isMobile ? 3 : 2,
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
              {(sequencePhase >= 0 && !shouldReduceMotion) && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: sequencePhase >= 0 ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: isMobile ? 0.5 : 1 }}
                >
                  <GlassParticleSystem 
                    isActive={isPlaying && sequencePhase >= 0}
                    intensity={shouldReduceMotion ? 0.3 : (isMobile ? 0.6 : 1)}
                    isMobile={isMobile}
                    devicePerformance={devicePerformance}
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
                  transition={{ duration: isMobile ? 1 : 1.5, ease: "easeOut" }}
                >
                  <MorphingGeometry 
                    isActive={isPlaying && sequencePhase >= 1 && !shouldReduceMotion}
                    variant="primary"
                    isMobile={isMobile}
                    devicePerformance={devicePerformance}
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
                  transition={{ duration: isMobile ? 0.5 : 1 }}
                >
                  <CinematicTitle 
                    isVisible={isPlaying && sequencePhase >= 2}
                    isMobile={isMobile}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Background geometric elements - optimized for mobile */}
            {!shouldReduceMotion && devicePerformance !== 'low' && (
              <>
                <motion.div
                  className={`absolute ${isMobile ? 'top-10 left-10 w-20 h-20' : 'top-20 left-20 w-32 h-32'}`}
                  animate={shouldReduceMotion ? {} : {
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={shouldReduceMotion ? {} : {
                    duration: isMobile ? 12 : 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <MorphingGeometry 
                    isActive={isPlaying}
                    variant="secondary"
                    isMobile={isMobile}
                    devicePerformance={devicePerformance}
                  />
                </motion.div>

                <motion.div
                  className={`absolute ${isMobile ? 'bottom-10 right-10 w-16 h-16' : 'bottom-20 right-20 w-24 h-24'}`}
                  animate={shouldReduceMotion ? {} : {
                    rotate: [360, 0],
                    scale: [1, 0.8, 1],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={shouldReduceMotion ? {} : {
                    duration: isMobile ? 10 : 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                >
                  <MorphingGeometry 
                    isActive={isPlaying}
                    variant="tertiary"
                    isMobile={isMobile}
                    devicePerformance={devicePerformance}
                  />
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Interactive Controls - Mobile Optimized */}
      <InteractiveControls
        onPlayPause={handlePlayPause}
        onRestart={handleRestart}
        onSkip={handleSkip}
        isPlaying={isPlaying}
        shouldReduceMotion={shouldReduceMotion}
        showControls={userInteracted}
        isMobile={isMobile}
      />
      {/* Navigation Prompt - Mobile Responsive */}
      <AnimatePresence>
        {showNavigation && (
          <NavigationPrompt
            isVisible={showNavigation}
            onExplore={handleExplore}
            isMobile={isMobile}
            shouldReduceMotion={shouldReduceMotion}
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