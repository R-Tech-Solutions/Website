import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FloatingNavigation = ({ sections, activeSection, onSectionChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 200;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0, 
      x: 50,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={navVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40"
        >
          <div className="glass-morphism rounded-2xl p-2 shadow-glass-interactive">
            <div className="space-y-2">
              {sections?.map((section, index) => (
                <motion.button
                  key={section?.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSectionChange(section?.id)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group relative ${
                    activeSection === section?.id
                      ? 'glass-interactive bg-primary/10 text-primary' :'text-glass-text-secondary hover:text-glass-text-primary hover:glass-surface'
                  }`}
                  title={section?.title}
                >
                  <Icon name={section?.icon} size={20} />
                  
                  {/* Tooltip */}
                  <div className="absolute right-full mr-3 px-3 py-2 glass-morphism rounded-lg text-sm font-medium text-glass-text-primary whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                    {section?.title}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-white/20 border-y-4 border-y-transparent"></div>
                  </div>
                  
                  {/* Active Indicator */}
                  {activeSection === section?.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 border-2 border-primary rounded-xl"
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Progress Indicator */}
            <div className="mt-4 pt-2 border-t border-white/10">
              <div className="w-8 h-1 bg-glass-surface rounded-full mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: `${((sections?.findIndex(s => s?.id === activeSection) + 1) / sections?.length) * 100}%` 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNavigation;