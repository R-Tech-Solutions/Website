import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, index, onExplore }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ 
        y: -10, 
        rotateX: 5,
        transition: { duration: 0.3 }
      }}
      className="group relative perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative glass-morphism rounded-2xl p-8 h-full transform-3d transition-all duration-500 group-hover:shadow-glass-interactive">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating Icon */}
        <motion.div 
          className="relative mb-6"
          animate={{ 
            rotateY: isHovered ? 180 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="w-16 h-16 glass-interactive rounded-xl flex items-center justify-center group-hover:shadow-glass-subtle">
            <Icon 
              name={service?.icon} 
              size={32} 
              className="text-primary group-hover:text-accent transition-colors duration-300"
            />
          </div>
          <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-glass-text-primary mb-3 group-hover:text-primary transition-colors duration-300">
            {service?.title}
          </h3>
          
          <p className="text-glass-text-secondary mb-6 leading-relaxed">
            {service?.description}
          </p>

          {/* Key Features */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-glass-text-primary mb-3 uppercase tracking-wide">
              Key Capabilities
            </h4>
            <div className="space-y-2">
              {service?.features?.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + idx * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                  <span className="text-sm text-glass-text-secondary">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline & Tech Stack */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass-surface rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Clock" size={14} className="text-primary" />
                <span className="text-xs font-medium text-glass-text-primary">Timeline</span>
              </div>
              <span className="text-sm text-glass-text-secondary">{service?.timeline}</span>
            </div>
            
            <div className="glass-surface rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Code" size={14} className="text-accent" />
                <span className="text-xs font-medium text-glass-text-primary">Tech Stack</span>
              </div>
              <span className="text-sm text-glass-text-secondary">{service?.techStack}</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            variant="outline"
            className="w-full glass-interactive border-primary/20 text-primary hover:bg-primary/10 group-hover:border-primary/40"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => onExplore(service)}
          >
            Explore Service
          </Button>
        </div>

        {/* Morphing Border Effect */}
        <div className="absolute inset-0 rounded-2xl border border-primary/10 group-hover:border-primary/30 transition-colors duration-500"></div>
        
        {/* Glass Refraction Effect */}
        <motion.div
          className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-sm"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

export default ServiceCard;