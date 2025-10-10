import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, index, onExplore }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef?.current) return;
    
    const rect = cardRef?.current?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const y = e?.clientY - rect?.top;
    
    const centerX = rect?.width / 2;
    const centerY = rect?.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef?.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-96 glass-morphism rounded-2xl overflow-hidden cursor-pointer transform-3d"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onExplore(project)}
    >
      {/* Background Image with Glass Overlay */}
      <div className="absolute inset-0">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className={`absolute inset-0 glass-surface transition-opacity duration-500 ${isHovered ? 'opacity-30' : 'opacity-0'}`} />
      </div>
      {/* Floating Glass Elements */}
      <div className="absolute top-4 right-4 flex space-x-2">
        {project?.technologies?.slice(0, 3)?.map((tech, idx) => (
          <div
            key={tech}
            className="w-8 h-8 glass-interactive rounded-lg flex items-center justify-center text-xs font-mono text-white/80"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {tech?.charAt(0)}
          </div>
        ))}
      </div>
      {/* Project Category Badge */}
      <div className="absolute top-4 left-4">
        <div className="glass-morphism px-3 py-1 rounded-full">
          <span className="text-xs font-medium text-white/90">{project?.category}</span>
        </div>
      </div>
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="glass-morphism rounded-xl p-4 backdrop-blur-glass-heavy">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{project?.title}</h3>
              <p className="text-sm text-white/70">{project?.client}</p>
            </div>
            <div className="flex items-center space-x-1 text-amber-400">
              <Icon name="Star" size={16} className="fill-current" />
              <span className="text-sm font-medium">{project?.rating}</span>
            </div>
          </div>

          <p className="text-sm text-white/80 mb-4 line-clamp-2">{project?.description}</p>

          {/* Project Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-xs text-white/60">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} />
                <span>{project?.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={12} />
                <span>{project?.teamSize}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={12} />
                <span>{project?.impact}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              iconName="ExternalLink"
              iconPosition="right"
              iconSize={14}
            >
              Explore Project
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="glass-interactive border-white/20 text-white hover:bg-white/10"
              iconName="Play"
              iconSize={14}
            >
              Demo
            </Button>
          </div>
        </div>
      </div>
      {/* Hover Effects */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />
      </div>
    </motion.div>
  );
};

export default ProjectCard;