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
      className="fixed inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-glass"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className={`${isMobile ? 'max-w-sm' : 'max-w-4xl'} mx-auto ${isMobile ? 'px-4' : 'px-6'} text-center`}>
        {/* Header - Mobile responsive */}
        <motion.div
          className={isMobile ? 'mb-8' : 'mb-12'}
          variants={itemVariants}
        >
          <h2 className={`${isMobile ? 'text-2xl md:text-3xl' : 'text-4xl md:text-5xl'} font-bold bg-gradient-to-r from-glass-text-primary to-primary bg-clip-text text-transparent mb-4`}>
            Begin Your Journey
          </h2>
          <p className={`${isMobile ? 'text-base md:text-lg' : 'text-xl'} text-glass-text-secondary max-w-2xl mx-auto leading-relaxed`}>
            Choose your path through our digital realm. Each destination offers a unique perspective on our craft.
          </p>
        </motion.div>

        {/* Navigation Grid - Mobile responsive */}
        <motion.div
          className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-6'} ${isMobile ? 'mb-8' : 'mb-12'}`}
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
                className={`block ${isMobile ? 'p-4' : 'p-6'} glass-interactive rounded-xl shadow-glass-subtle hover:shadow-glass-interactive transition-all duration-300 group`}
                onClick={onExplore}
              >
                <div className={`flex items-start ${isMobile ? 'space-x-3' : 'space-x-4'}`}>
                  <motion.div
                    className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg bg-gradient-to-br ${item?.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    variants={shouldReduceMotion ? {} : pulseVariants}
                    animate={shouldReduceMotion ? {} : "pulse"}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <Icon
                      name={item?.icon}
                      size={isMobile ? 20 : 24}
                      className="text-white"
                    />
                  </motion.div>

                  <div className="flex-1 text-left">
                    <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-glass-text-primary group-hover:text-primary transition-colors duration-300 mb-2`}>
                      {item?.title}
                    </h3>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-glass-text-secondary group-hover:text-glass-text-primary transition-colors duration-300`}>
                      {item?.description}
                    </p>
                  </div>

                  <Icon
                    name="ArrowRight"
                    size={isMobile ? 16 : 20}
                    className="text-glass-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Alternative Actions - Mobile responsive */}
        <motion.div
          className={`flex flex-col ${isMobile ? 'space-y-3' : 'sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6'}`}
          variants={itemVariants}
        >
          <Link to="/home">
            <Button
              variant="default"
              size={isMobile ? "md" : "lg"}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glass-subtle flex items-center space-x-2"
              onClick={onExplore}
            >
              <Icon name="Portfolio" size={isMobile ? 16 : 20} />
              <span className={isMobile ? 'text-sm' : 'text-base'}>Explore Home</span>
            </Button>
          </Link>
        </motion.div>

        {/* Skip hint */}
        <motion.p
          className="text-sm text-glass-text-secondary/60 mt-8"
          variants={itemVariants}
        >
        </motion.p>
      </div>
    </motion.div>
  );
};

export default NavigationPrompt;