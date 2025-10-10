import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterBar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  technologies,
  selectedTechnology,
  onTechnologyChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange 
}) => {
  const sortOptions = [
    { value: 'recent', label: 'Most Recent', icon: 'Clock' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'impact', label: 'Biggest Impact', icon: 'TrendingUp' },
    { value: 'duration', label: 'Project Length', icon: 'Calendar' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3' },
    { value: 'list', icon: 'List' },
    { value: 'masonry', icon: 'LayoutGrid' }
  ];

  return (
    <motion.div
      className="glass-morphism rounded-2xl p-6 mb-8 backdrop-blur-glass"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-glass-text-secondary mb-2 lg:mb-0 lg:mr-3">
            Categories:
          </span>
          {categories?.map((category) => (
            <Button
              key={category?.value}
              variant={selectedCategory === category?.value ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category?.value)}
              className={`${
                selectedCategory === category?.value
                  ? 'bg-gradient-to-r from-primary to-accent text-white' :'glass-interactive border-white/20 text-glass-text-secondary hover:text-glass-text-primary'
              }`}
              iconName={category?.icon}
              iconPosition="left"
              iconSize={14}
            >
              {category?.label}
            </Button>
          ))}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Technology Filter */}
          <div className="flex items-center space-x-2">
            <Icon name="Code" size={16} className="text-glass-text-secondary" />
            <select
              value={selectedTechnology}
              onChange={(e) => onTechnologyChange(e?.target?.value)}
              className="glass-morphism border-0 rounded-lg px-3 py-2 text-sm text-glass-text-primary bg-transparent focus:ring-2 focus:ring-primary/50 focus:outline-none"
            >
              <option value="">All Technologies</option>
              {technologies?.map((tech) => (
                <option key={tech} value={tech} className="bg-glass-base text-glass-text-primary">
                  {tech}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-glass-text-secondary" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e?.target?.value)}
              className="glass-morphism border-0 rounded-lg px-3 py-2 text-sm text-glass-text-primary bg-transparent focus:ring-2 focus:ring-primary/50 focus:outline-none"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value} className="bg-glass-base text-glass-text-primary">
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 glass-morphism rounded-lg p-1">
            {viewModes?.map((mode) => (
              <button
                key={mode?.value}
                onClick={() => onViewModeChange(mode?.value)}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === mode?.value
                    ? 'bg-primary text-white shadow-glass-subtle'
                    : 'text-glass-text-secondary hover:text-glass-text-primary hover:bg-glass-surface/50'
                }`}
              >
                <Icon name={mode?.icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {(selectedCategory !== 'all' || selectedTechnology) && (
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-white/10">
          <span className="text-xs text-glass-text-secondary">Active filters:</span>
          {selectedCategory !== 'all' && (
            <div className="flex items-center space-x-1 glass-surface px-2 py-1 rounded-full">
              <span className="text-xs text-glass-text-primary">
                {categories?.find(c => c?.value === selectedCategory)?.label}
              </span>
              <button
                onClick={() => onCategoryChange('all')}
                className="text-glass-text-secondary hover:text-glass-text-primary"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          {selectedTechnology && (
            <div className="flex items-center space-x-1 glass-surface px-2 py-1 rounded-full">
              <span className="text-xs text-glass-text-primary">{selectedTechnology}</span>
              <button
                onClick={() => onTechnologyChange('')}
                className="text-glass-text-secondary hover:text-glass-text-primary"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default FilterBar;