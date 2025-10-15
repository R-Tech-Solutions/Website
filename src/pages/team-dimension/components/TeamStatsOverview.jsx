import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TeamStatsOverview = ({ stats }) => {
  const statItems = [
    {
      icon: "Users",
      label: "Team Members",
      value: stats?.totalMembers,
      color: "text-primary",
      bgColor: "from-primary/10 to-primary/5",
    },
    {
      icon: "Award",
      label: "Combined Experience",
      value: `${stats?.totalExperience}+ years`,
      color: "text-accent",
      bgColor: "from-accent/10 to-accent/5",
    },
    {
      icon: "Layers",
      label: "Projects Delivered",
      value: `${stats?.totalProjects}+`,
      color: "text-success",
      bgColor: "from-success/10 to-success/5",
    },
    {
      icon: "Star",
      label: "Average Rating",
      value: stats?.averageRating,
      color: "text-warning",
      bgColor: "from-warning/10 to-warning/5",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {statItems?.map((item, index) => (
        <motion.div
          key={item?.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="glass-morphism rounded-xl p-6 text-center group hover:scale-105 transition-transform duration-300"
        >
          {/* Background Gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item?.bgColor} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          ></div>

          {/* Content */}
          <div className="relative">
            {/* Icon */}
            <div className="w-12 h-12 mx-auto mb-4 glass-surface rounded-lg flex items-center justify-center">
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>

            {/* Value */}
            <div className={`text-2xl font-bold ${item?.color} mb-2`}>{item?.value}</div>

            {/* Label */}
            <div className="text-sm text-glass-text-secondary">{item?.label}</div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(2)]?.map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${item?.color?.replace("text-", "bg-")}/30 rounded-full`}
                style={{
                  left: `${20 + i * 60}%`,
                  top: `${15 + i * 30}%`,
                }}
                animate={{
                  y: [-5, 5, -5],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default TeamStatsOverview
