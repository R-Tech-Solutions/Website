import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProcessStage = ({ stage, index, isActive, onStageClick, totalStages }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setGlowIntensity(prev => (prev + 0.1) % 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const progressPercentage = ((index + 1) / totalStages) * 100;

  return (
    <motion.div
      className="relative group cursor-pointer"
      onClick={() => onStageClick(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      {/* Glass Pipeline Connection */}
      {index < totalStages - 1 && (
        <div className="absolute top-12 left-1/2 w-px h-24 bg-gradient-to-b from-primary/30 to-transparent z-0">
          <motion.div
            className="w-full bg-gradient-to-b from-primary to-accent"
            initial={{ height: 0 }}
            animate={{ height: isActive ? '100%' : '0%' }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>
      )}
      {/* Stage Container */}
      <div className={`relative z-10 p-6 rounded-2xl transition-all duration-500 ${
        isActive 
          ? 'glass-interactive shadow-glass-interactive scale-105' 
          : 'glass-morphism hover:glass-interactive'
      }`}>
        {/* Stage Number & Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isActive 
              ? 'bg-gradient-to-br from-primary to-accent text-white shadow-glass' 
              : 'glass-surface text-glass-text-secondary group-hover:text-primary'
          }`}>
            <Icon name={stage?.icon} size={20} />
          </div>
          
          <div className="text-right">
            <div className="text-xs font-mono text-glass-text-secondary">
              Stage {index + 1}
            </div>
            <div className="text-xs font-medium text-primary">
              {stage?.duration}
            </div>
          </div>
        </div>

        {/* Stage Content */}
        <div className="space-y-3">
          <h3 className={`text-lg font-semibold transition-colors duration-300 ${
            isActive ? 'text-primary' : 'text-glass-text-primary'
          }`}>
            {stage?.title}
          </h3>
          
          <p className="text-sm text-glass-text-secondary leading-relaxed">
            {stage?.description}
          </p>

          {/* Deliverables */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-glass-text-primary uppercase tracking-wide">
              Key Deliverables
            </h4>
            <div className="flex flex-wrap gap-1">
              {stage?.deliverables?.map((deliverable, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs rounded-lg glass-surface text-glass-text-secondary"
                >
                  {deliverable}
                </span>
              ))}
            </div>
          </div>

          {/* Client Touchpoints */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-glass-text-primary uppercase tracking-wide">
              Client Involvement
            </h4>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={14} className="text-accent" />
              <span className="text-xs text-glass-text-secondary">
                {stage?.clientTouchpoints}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 pt-4 border-t border-border/20">
          <div className="flex items-center justify-between text-xs">
            <span className="text-glass-text-secondary">Progress</span>
            <span className="font-mono text-primary">{progressPercentage?.toFixed(0)}%</span>
          </div>
          <div className="mt-2 h-1 bg-glass-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: isActive ? `${progressPercentage}%` : '0%' }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Hover Glow Effect */}
        {(isHovered || isActive) && (
          <div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 pointer-events-none"
            style={{ 
              opacity: isActive ? 0.3 + (glowIntensity * 0.2) : 0.1,
              filter: 'blur(1px)'
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ProcessStage;