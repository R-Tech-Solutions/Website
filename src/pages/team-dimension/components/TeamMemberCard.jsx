import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TeamMemberCard = ({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

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
      onClick={() => setIsSelected((s) => !s)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsSelected((s) => !s);
        }
      }}
      role="button"
      tabIndex={0}
    >
      {/* Glass Container with Fixed Height */}
      <div className="relative glass-morphism rounded-2xl overflow-hidden h-[420px] transform-3d transition-all duration-500 hover:scale-105 hover:shadow-2xl">

        {/* Blurred Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={member?.avatar || "/placeholder.svg"}
            alt={member?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6">

          {/* Top Section */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Avatar Container */}
            <div className="relative mb-4">
              <div className="w-28 h-28 mx-auto glass-surface rounded-full p-1 overflow-hidden shadow-xl">
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

            <div className="text-center mb-4 w-full px-4">
              <h3
                title={member?.name}
                className={`text-lg sm:text-xl font-bold mb-1 drop-shadow-lg px-4 py-2 inline-block max-w-full truncate whitespace-nowrap transition-all duration-300 ${
                  (isHovered || isSelected)
                    ? 'text-gray-400 bg-transparent backdrop-blur-none rounded-none'
                    : 'text-white bg-gray-900/80 backdrop-blur-sm rounded-full'
                }`}
              >
                {member?.name}
              </h3>
              <div className="mt-2">
                <span className={`px-4 py-1.5 text-xs sm:text-sm font-medium inline-block max-w-full transition-all duration-300 ${(isHovered || isSelected) ? 'text-gray-400 bg-transparent backdrop-blur-none rounded-none' : 'text-white  backdrop-blur-sm rounded-full'}`}>
                  {member?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Social Media Section - Bottom Card */}
          {member?.department === "Partners" && member?.socialMedia && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:scale-[1.02]">
                <div className="flex justify-center gap-4">
                  {member?.socialMedia?.linkedin && (
                    <motion.a
                      href={member?.socialMedia?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-[#0A66C2] text-white shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                      title="LinkedIn"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon name="Linkedin" size={22} />
                    </motion.a>
                  )}
                  {member?.socialMedia?.whatsapp && (
                    <motion.a
                      href={`https://wa.me/${member?.socialMedia?.whatsapp?.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-[#25D366] text-white shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                      title="WhatsApp"
                      whileHover={{ scale: 1.15, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon name="MessageCircle" size={22} />
                    </motion.a>
                  )}
                  {member?.socialMedia?.website && (
                    <motion.a
                      href={member?.socialMedia?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                      title="Website"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon name="Globe" size={22} />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-[5]">
          {[...Array(3)]?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
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