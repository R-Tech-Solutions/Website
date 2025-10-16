import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';


const TeamHierarchy = ({ hierarchyData, onMemberClick }) => {
  const renderMember = (member, level = 0) => (
    <motion.div
      key={member?.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: level * 0.1 }}
      className={`relative ${level > 0 ? "ml-8" : ""}`}
    >
      {/* Connection Line */}
      {level > 0 && (
        <div className="absolute -left-4 top-6 w-4 h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
      )}

      {/* Member Card */}
      <div
        className="glass-morphism rounded-xl p-4 mb-4 cursor-pointer hover:scale-105 transition-transform duration-300 group"
        onClick={() => onMemberClick(member)}
      >
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-12 h-12 glass-surface rounded-full p-0.5 overflow-hidden">
              <Image
                src={member?.avatar || "/placeholder.svg"}
                alt={member?.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h4 className="font-medium text-glass-text-primary group-hover:text-primary transition-colors">
              {member?.name}
            </h4>
            <p className="text-sm text-glass-text-secondary">{member?.role}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-xs text-glass-text-secondary">
            {member?.teamSize && (
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={12} />
                <span>{member?.teamSize}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} />
              <span>{member?.rating}</span>
            </div>
          </div>

          {/* Expand Icon */}
          {member?.reports && member?.reports?.length > 0 && (
            <Icon name="ChevronRight" size={16} className="text-glass-text-secondary" />
          )}
        </div>
      </div>

      {/* Reports */}
      {member?.reports && member?.reports?.length > 0 && (
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent"></div>

          {member?.reports?.map((report) => renderMember(report, level + 1))}
        </div>
      )}
    </motion.div>
  )

  return (
    <div className="glass-morphism rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-glass-text-primary flex items-center">
          <Icon name="Workflow" size={24} className="mr-3 text-primary" />
          Team Structure
        </h3>
      </div>
      <div className="space-y-2">{hierarchyData?.map((member) => renderMember(member))}</div>
    </div>
  )
}

export default TeamHierarchy
