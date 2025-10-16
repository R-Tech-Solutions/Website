import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationPrompt = ({ isVisible, onExplore, isMobile = false, shouldReduceMotion = false }) => {
  const navigationItems = [
    {
      title: "Portfolio",
      description: "Explore our crafted digital experiences",
      path: "/portfolio",    
      icon: "Layers",
      color: "from-primary to-primary/70"
    },
    {
      title: "Services",
      description: "Discover our creative capabilities",
      path: "/services",
      icon: "Sparkles",
      color: "from-accent to-accent/70"
    },
    {
      title: "Blog",
      description: "Meet the minds behind the magic",
      path: "/blogs",
      icon: "Users",
      color: "from-success to-success/70"
    },
    {
      title: "Careers",
      description: "Journey through our methodology",
      path: "/process",
      icon: "Workflow",
      color: "from-warning to-warning/70"
    },
    {
      title: "Contact Us",
      description: "Journey through our methodology",
      path: "/contact",
      icon: "Workflow",
      color: "from-warning to-warning/70"
    }
  ];

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.6 : 0.8,
        ease: "easeOut",
        staggerChildren: isMobile ? 0.05 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 40px rgba(59, 130, 246, 0.6)",
        "0 0 20px rgba(59, 130, 246, 0.3)"
      ],
      transition: {
        duration: isMobile ? 3 : 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-glass overflow-y-auto py-4 sm:py-6 md:py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 text-center my-auto">
        {/* Header - Fully responsive */}
        <motion.div
          className="mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-glass-text-primary to-primary bg-clip-text text-transparent mb-3 sm:mb-4">
            Begin Your Journey
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-glass-text-secondary max-w-2xl mx-auto leading-relaxed px-2">
            Choose your path through our digital realm. Each destination offers a unique perspective on our craft.
          </p>
        </motion.div>

        {/* Navigation Grid - Fully responsive */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          variants={containerVariants}
        >
          {navigationItems?.map((item, index) => (
            <motion.div
              key={item?.path}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item?.path}
                className="block p-3 sm:p-4 md:p-5 lg:p-6 glass-interactive rounded-xl shadow-glass-subtle hover:shadow-glass-interactive transition-all duration-300 group"
                onClick={onExplore}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <motion.div
                    className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg bg-gradient-to-br flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, var(--${item?.color.split(' ')[0].replace('from-', '')}))`
                    }}
                    variants={shouldReduceMotion ? {} : pulseVariants}
                    animate={shouldReduceMotion ? {} : "pulse"}
                  >
                    <Icon
                      name={item?.icon}
                      size={20}
                      className="text-white"
                    />
                  </motion.div>

                  <div className="flex-1 text-left min-w-0">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-glass-text-primary group-hover:text-primary transition-colors duration-300 mb-1 sm:mb-2">
                      {item?.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-glass-text-secondary group-hover:text-glass-text-primary transition-colors duration-300 line-clamp-2">
                      {item?.description}
                    </p>
                  </div>

                  <Icon
                    name="ArrowRight"
                    size={16}
                    className="text-glass-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Alternative Actions - Fully responsive */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6"
          variants={itemVariants}
        >
          <Link to="/home" className="w-full sm:w-auto">
            <Button
              variant="default"
              size="md"
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glass-subtle flex items-center justify-center space-x-2 px-6 py-2.5 sm:py-3"
              onClick={onExplore}
            >
              <Icon name="Portfolio" size={18} />
              <span className="text-sm sm:text-base">Explore Home</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NavigationPrompt;