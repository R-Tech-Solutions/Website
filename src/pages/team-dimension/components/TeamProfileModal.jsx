import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const TeamProfileModal = ({ member, isOpen, onClose }) => {
  if (!member) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: 15 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="glass-morphism rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-glass-interactive">
              {/* Header */}
              <div className="relative p-8 pb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute top-4 right-4 glass-surface hover:glass-interactive"
                  iconName="X"
                />

                <div className="flex items-start space-x-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-32 h-32 glass-surface rounded-2xl p-2 overflow-hidden">
                      <Image
                        src={member?.avatar || "/placeholder.svg"}
                        alt={member?.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                    </div>
                    {member?.isOnline && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full glass-morphism flex items-center justify-center">
                        <div className="w-3 h-3 bg-success rounded-full"></div>
                      </div>
                    )}
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-glass-text-primary mb-2">{member?.name}</h2>
                    <p className="text-lg text-primary font-medium mb-2">{member?.role}</p>
                    <p className="text-glass-text-secondary mb-4">
                      {member?.experience} years of experience in {member?.department}
                    </p>
                  </div>
                </div>

                {member?.socialMedia && (
                  <div className="mt-6 pt-6 border-t border-glass-border">
                    <h3 className="text-sm font-semibold text-glass-text-primary mb-3 flex items-center">
                      <Icon name="Share2" size={16} className="mr-2 text-primary" />
                      Connect
                    </h3>
                    <div className="flex gap-3">
                      {member?.socialMedia?.website && (
                        <a
                          href={member?.socialMedia?.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 glass-surface rounded-lg hover:bg-primary/10 transition-colors"
                        >
                          <Icon name="Globe" size={18} className="text-primary" />
                          <span className="text-sm text-glass-text-secondary">Website</span>
                        </a>
                      )}
                      {member?.socialMedia?.linkedin && (
                        <a
                          href={member?.socialMedia?.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 glass-surface rounded-lg hover:bg-primary/10 transition-colors"
                        >
                          <Icon name="Linkedin" size={18} className="text-primary" />
                          <span className="text-sm text-glass-text-secondary">LinkedIn</span>
                        </a>
                      )}
                      {member?.socialMedia?.whatsapp && (
                        <a
                          href={`https://wa.me/${member?.socialMedia?.whatsapp?.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 glass-surface rounded-lg hover:bg-primary/10 transition-colors"
                        >
                          <Icon name="MessageCircle" size={18} className="text-primary" />
                          <span className="text-sm text-glass-text-secondary">WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="px-8 pb-8 space-y-6">
                {/* Specialties */}
                <div>
                  <h3 className="text-lg font-semibold text-glass-text-primary mb-3 flex items-center">
                    <Icon name="Sparkles" size={20} className="mr-2 text-primary" />
                    Specialties
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member?.specialties?.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 glass-surface rounded-full text-sm text-glass-text-secondary"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notable Projects */}
                <div>
                  <h3 className="text-lg font-semibold text-glass-text-primary mb-3 flex items-center">
                    <Icon name="Layers" size={20} className="mr-2 text-primary" />
                    Notable Projects
                  </h3>
                  <div className="space-y-3">
                    {member?.notableProjects?.map((project, index) => (
                      <div key={index} className="glass-surface rounded-lg p-4">
                        <h4 className="font-medium text-glass-text-primary mb-1">{project?.name}</h4>
                        <p className="text-sm text-glass-text-secondary mb-2">{project?.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-glass-text-secondary">
                          <span className="flex items-center">
                            <Icon name="Calendar" size={14} className="mr-1" />
                            {project?.year}
                          </span>
                          <span className="flex items-center">
                            <Icon name="Award" size={14} className="mr-1" />
                            {project?.impact}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills & Tools */}
                <div>
                  <h3 className="text-lg font-semibold text-glass-text-primary mb-3 flex items-center">
                    <Icon name="Wrench" size={20} className="mr-2 text-primary" />
                    Skills & Tools
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(member?.skills)?.map(([category, skills]) => (
                      <div key={category} className="glass-surface rounded-lg p-4">
                        <h4 className="font-medium text-glass-text-primary mb-2 capitalize">{category}</h4>
                        <div className="space-y-2">
                          {skills?.map((skill, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-glass-text-secondary">{skill?.name}</span>
                              <div className="flex space-x-1">
                                {[...Array(5)]?.map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${
                                      i < skill?.level ? "bg-primary" : "bg-glass-surface"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TeamProfileModal
