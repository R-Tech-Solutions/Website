import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveControls = ({ 
  onPlayPause, 
  onRestart, 
  onSkip, 
  onReduceMotion, 
  isPlaying, 
  isMotionReduced,
  showControls = true 
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
        duration: 0.5,
        staggerChildren: 0.1
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
      className="fixed bottom-6 right-6 z-40"
      variants={controlVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main control button */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 rounded-full glass-interactive shadow-glass-interactive bg-gradient-to-r from-primary/90 to-accent/90 hover:from-primary hover:to-accent"
          aria-label="Toggle controls"
        >
          <Icon 
            name={isExpanded ? "X" : "Settings"} 
            size={20} 
            className="text-white"
          />
        </Button>
        
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      {/* Expanded controls */}
      <motion.div
        className={`absolute bottom-16 right-0 flex flex-col space-y-3 ${
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
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Play/Pause */}
        <motion.div variants={buttonVariants}>
          <Button
            variant="outline"
            size="sm"
            onClick={onPlayPause}
            className="glass-interactive border-white/20 text-glass-text-primary hover:bg-white/10 flex items-center space-x-2 min-w-[120px] justify-start"
          >
            <Icon 
              name={isPlaying ? "Pause" : "Play"} 
              size={16} 
            />
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </Button>
        </motion.div>

        {/* Restart */}
        <motion.div variants={buttonVariants}>
          <Button
            variant="outline"
            size="sm"
            onClick={onRestart}
            className="glass-interactive border-white/20 text-glass-text-primary hover:bg-white/10 flex items-center space-x-2 min-w-[120px] justify-start"
          >
            <Icon name="RotateCcw" size={16} />
            <span>Restart</span>
          </Button>
        </motion.div>

        {/* Skip */}
        <motion.div variants={buttonVariants}>
          <Button
            variant="outline"
            size="sm"
            onClick={onSkip}
            className="glass-interactive border-white/20 text-glass-text-primary hover:bg-white/10 flex items-center space-x-2 min-w-[120px] justify-start"
          >
            <Icon name="SkipForward" size={16} />
            <span>Skip</span>
          </Button>
        </motion.div>

        {/* Reduce Motion */}
        <motion.div variants={buttonVariants}>
          <Button
            variant="outline"
            size="sm"
            onClick={onReduceMotion}
            className={`glass-interactive border-white/20 hover:bg-white/10 flex items-center space-x-2 min-w-[120px] justify-start ${
              isMotionReduced 
                ? 'text-success bg-success/10 border-success/30' :'text-glass-text-primary'
            }`}
          >
            <Icon name="Zap" size={16} />
            <span>{isMotionReduced ? "Motion Off" : "Reduce Motion"}</span>
          </Button>
        </motion.div>

        {/* Accessibility info */}
        <motion.div 
          variants={buttonVariants}
          className="glass-surface rounded-lg p-3 max-w-[200px]"
        >
          <p className="text-xs text-glass-text-secondary leading-relaxed">
            Use these controls to customize your viewing experience. 
            Press <kbd className="px-1 py-0.5 bg-glass-base rounded text-xs">Space</kbd> to play/pause, 
            or <kbd className="px-1 py-0.5 bg-glass-base rounded text-xs">Esc</kbd> to skip.
          </p>
        </motion.div>
      </motion.div>
      {/* Keyboard shortcuts indicator */}
      <motion.div
        className="absolute -top-12 right-0 glass-surface rounded-lg px-3 py-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="text-xs text-glass-text-secondary whitespace-nowrap">
          Press <kbd className="px-1 py-0.5 bg-glass-base rounded text-xs">?</kbd> for help
        </p>
      </motion.div>
    </motion.div>
  );
};

export default InteractiveControls;