import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const OptimizedNavbar = memo(({ sections, activeSection, onSectionChange, isNavigating }) => {
  const handleSectionClick = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onSectionChange(sectionId);
    }
  }, [onSectionChange]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40"
    >
      <div className="glass-morphism rounded-2xl p-2 shadow-glass-interactive">
        <div className="flex items-center space-x-1">
          {sections?.map((section) => (
            <motion.button
              key={section?.id}
              onClick={() => handleSectionClick(section?.id)}
              disabled={isNavigating}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeSection === section?.id
                  ? 'text-primary shadow-glass-subtle'
                  : 'text-glass-text-secondary hover:text-glass-text-primary hover:bg-glass-surface/50'
              } ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileHover={!isNavigating ? { scale: 1.05 } : {}}
              whileTap={!isNavigating ? { scale: 0.95 } : {}}
            >
              {activeSection === section?.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 glass-interactive rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon 
                name={section?.icon} 
                size={16} 
                className="relative z-10" 
              />
              <span className="relative z-10">{section?.title}</span>
            </motion.button>
          ))}
          
          {/* Performance Indicator */}
          <div className="flex items-center space-x-2 px-3 py-2 glass-surface rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-glass-text-secondary font-mono">
              Optimized
            </span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
});

OptimizedNavbar.displayName = 'OptimizedNavbar';

export default OptimizedNavbar;