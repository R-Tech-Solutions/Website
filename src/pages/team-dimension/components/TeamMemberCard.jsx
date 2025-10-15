import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TeamMemberCard = ({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glass Container */}
      <div className="relative glass-morphism rounded-2xl p-6 transform-3d transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Colorful Social Media Icons Section for Partners only */}
        {member?.department === "Partners" && member?.socialMedia && (
          <div className="flex justify-center gap-3 mb-6 relative z-10">
            {member?.socialMedia?.linkedin && (
              <a
                href={member?.socialMedia?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg bg-[#0A66C2] text-white"
                onClick={(e) => e.stopPropagation()}
                title="LinkedIn"
              >
                <Icon name="Linkedin" size={20} />
              </a>
            )}
            {member?.socialMedia?.whatsapp && (
              <a
                href={`https://wa.me/${member?.socialMedia?.whatsapp?.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg bg-[#25D366] text-white"
                onClick={(e) => e.stopPropagation()}
                title="WhatsApp"
              >
                <Icon name="MessageCircle" size={20} />
              </a>
            )}
            {member?.socialMedia?.website && (
              <a
                href={member?.socialMedia?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                onClick={(e) => e.stopPropagation()}
                title="Website"
              >
                <Icon name="Globe" size={20} />
              </a>
            )}
          </div>
        )}

        {/* Avatar Container */}
        <div className="relative mb-6 z-10">
          <div className="w-24 h-24 mx-auto glass-surface rounded-full p-1 overflow-hidden">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <Image
                src={member?.avatar || "/placeholder.svg"}
                alt={member?.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Glass Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="text-center mb-4 relative z-10">
          <h3 className="text-lg font-semibold text-glass-text-primary mb-1">{member?.name}</h3>
          <p className="text-sm text-primary font-medium mb-2">{member?.role}</p>
          <p className="text-xs text-glass-text-secondary">{member?.experience} years experience</p>
        </div>

        {/* Specialties */}
        <div className="mb-4 relative z-10">
          <div className="flex flex-wrap gap-1 justify-center">
            {member?.specialties?.slice(0, 3)?.map((specialty, idx) => (
              <span key={idx} className="px-2 py-1 text-xs glass-surface rounded-full text-glass-text-secondary">
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
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
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
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default TeamMemberCard
