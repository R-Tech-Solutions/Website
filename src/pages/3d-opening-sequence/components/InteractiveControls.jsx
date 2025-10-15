import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveControls = ({ 
  onPlayPause, 
  onRestart, 
  onSkip, 
  isPlaying, 
  shouldReduceMotion,
  showControls = true,
  isMobile = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const controlVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.3 : 0.5,
        staggerChildren: isMobile ? 0.05 : 0.1
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  if (!showControls) return null;

  return (
    <motion.div
      className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'} z-40`}
      variants={controlVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main control button - Mobile optimized */}
      <motion.div
        className="relative"
        whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full glass-interactive shadow-glass-interactive bg-gradient-to-r from-primary/90 to-accent/90 hover:from-primary hover:to-accent`}
          aria-label="Toggle controls"
        >
          <Icon 
            name={isExpanded ? "X" : "Settings"} 
            size={isMobile ? 16 : 20} 
            className="text-white"
          />
        </Button>
        
        {/* Pulse effect - reduced on mobile */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: isMobile ? 3 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>
      {/* Expanded controls - Mobile responsive */}
      <motion.div
        className={`absolute ${isMobile ? 'bottom-12 right-0' : 'bottom-16 right-0'} flex flex-col ${isMobile ? 'space-y-2' : 'space-y-3'} ${
          isExpanded ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={isExpanded ? { 
          opacity: 1, 
          scale: 1, 
          y: 0 
        } : { 
          opacity: 0, 
          scale: 0.8, 
          y: 20 
        }}
        transition={{ duration: isMobile ? 0.2 : 0.3, ease: "easeOut" }}
      >
        {/* Play/Pause */}
        <motion.div variants={buttonVariants}>
          <Button
            variant="outline"
            size={isMobile ? "xs" : "sm"}
            onClick={onPlayPause}
            className={`glass-interactive border-white/20 text-glass-text-primary hover:bg-white/10 flex items-center space-x-2 ${isMobile ? 'min-w-[100px]' : 'min-w-[120px]'} justify-start`}
          >
            <Icon 
              name={isPlaying ? "Pause" : "Play"} 
              size={isMobile ? 14 : 16} 
            />
            <span className={isMobile ? 'text-xs' : 'text-sm'}>{isPlaying ? "Pause" : "Play"}</span>
          </Button>
        </motion.div>

        {/* Restart */}
        <motion.div variants={buttonVariants}>
          <Button
            variant="outline"
            size={isMobile ? "xs" : "sm"}
            onClick={onRestart}
            className={`glass-interactive border-white/20 text-glass-text-primary hover:bg-white/10 flex items-center space-x-2 ${isMobile ? 'min-w-[100px]' : 'min-w-[120px]'} justify-start`}
          >
            <Icon name="RotateCcw" size={isMobile ? 14 : 16} />
            <span className={isMobile ? 'text-xs' : 'text-sm'}>Restart</span>
          </Button>
        </motion.div>

        {/* Skip */}
        <motion.div variants={buttonVariants}>
          <Button
            variant="outline"
            size={isMobile ? "xs" : "sm"}
            onClick={onSkip}
            className={`glass-interactive border-white/20 text-glass-text-primary hover:bg-white/10 flex items-center space-x-2 ${isMobile ? 'min-w-[100px]' : 'min-w-[120px]'} justify-start`}
          >
            <Icon name="SkipForward" size={isMobile ? 14 : 16} />
            <span className={isMobile ? 'text-xs' : 'text-sm'}>Skip</span>
          </Button>
        </motion.div>

        {/* Accessibility info */}
        <motion.div 
          variants={buttonVariants}
          className="glass-surface rounded-lg p-3 max-w-[200px]"
        >
        </motion.div>
      </motion.div>
      {/* Keyboard shortcuts indicator */}
      <motion.div
        className="absolute -top-12 right-0 glass-surface rounded-lg px-3 py-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
      </motion.div>
    </motion.div>
  );
};

export default InteractiveControls;