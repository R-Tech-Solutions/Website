import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const TeamFilterBar = ({ activeFilter, onFilterChange, searchTerm, onSearchChange, viewMode, onViewModeChange }) => {
  const filters = [
    { id: "all", label: "All Team", icon: "Users" },
    { id: "partners", label: "Partners", icon: "Crown" },
    { id: "administration", label: "Administration", icon: "Briefcase" },
    { id: "developers", label: "Developer Teams", icon: "Code" },
  ]

  return (
    <div className="glass-morphism rounded-2xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Icon
            name="Search"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-glass-text-secondary"
          />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full pl-10 pr-4 py-3 glass-surface rounded-xl border-0 focus:ring-2 focus:ring-primary/20 text-glass-text-primary placeholder-glass-text-secondary"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters?.map((filter) => (
            <motion.button
              key={filter?.id}
              onClick={() => onFilterChange(filter?.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeFilter === filter?.id
                  ? "glass-interactive text-primary shadow-glass-subtle"
                  : "text-glass-text-secondary hover:text-glass-text-primary hover:glass-surface"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name={filter?.icon} size={16} />
              <span>{filter?.label}</span>
            </motion.button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            iconName="Grid3X3"
            className={viewMode === "grid" ? "bg-primary text-white" : "glass-surface"}
          />
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            iconName="List"
            className={viewMode === "list" ? "bg-primary text-white" : "glass-surface"}
          />
        </div>
      </div>
    </div>
  )
}

export default TeamFilterBar
