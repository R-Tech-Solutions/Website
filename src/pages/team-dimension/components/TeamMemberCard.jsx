import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const TeamMemberCard = ({ member, index, onViewProfile }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group relative perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glass Container */}
      <div className="relative glass-morphism rounded-2xl p-6 transform-3d transition-all duration-500 hover:scale-105 hover:rotate-y-5">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Avatar Container */}
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto glass-surface rounded-full p-1 overflow-hidden">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <Image
                src={member?.avatar}
                alt={member?.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Glass Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
            </div>
          </div>
          
          {/* Floating Status Indicator */}
          <motion.div
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 360 : 0
            }}
            transition={{ duration: 0.5 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full glass-morphism flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          </motion.div>
        </div>

        {/* Member Info */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-glass-text-primary mb-1">
            {member?.name}
          </h3>
          <p className="text-sm text-primary font-medium mb-2">
            {member?.role}
          </p>
          <p className="text-xs text-glass-text-secondary">
            {member?.experience} years experience
          </p>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 justify-center">
            {member?.specialties?.slice(0, 3)?.map((specialty, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs glass-surface rounded-full text-glass-text-secondary"
              >
                {specialty}
              </span>
            ))}
            {member?.specialties?.length > 3 && (
              <span className="px-2 py-1 text-xs glass-surface rounded-full text-glass-text-secondary">
                +{member?.specialties?.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {member?.projectsCompleted}
            </div>
            <div className="text-xs text-glass-text-secondary">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-accent">
              {member?.clientRating}
            </div>
            <div className="text-xs text-glass-text-secondary">Rating</div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => onViewProfile(member)}
          className="glass-interactive border-primary/20 text-primary hover:bg-primary/10"
          iconName="User"
          iconPosition="left"
        >
          View Profile
        </Button>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)]?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;