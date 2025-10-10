import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProcessTimeline = ({ activeStage, totalStages, onTimelineClick }) => {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress(prev => (prev + 0.02) % 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const timelineStages = [
    { name: 'Discovery', icon: 'Search', color: 'from-blue-500 to-cyan-500' },
    { name: 'Strategy', icon: 'Target', color: 'from-cyan-500 to-teal-500' },
    { name: 'Design', icon: 'Palette', color: 'from-teal-500 to-green-500' },
    { name: 'Development', icon: 'Code', color: 'from-green-500 to-yellow-500' },
    { name: 'Testing', icon: 'CheckCircle', color: 'from-yellow-500 to-orange-500' },
    { name: 'Launch', icon: 'Rocket', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="glass-morphism rounded-2xl p-6 shadow-glass">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-glass-text-primary">
          Project Timeline
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-accent" />
          <span className="text-sm font-mono text-glass-text-secondary">
            12-16 weeks
          </span>
        </div>
      </div>
      {/* Timeline Visualization */}
      <div className="relative">
        {/* Background Pipeline */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-glass-surface rounded-full transform -translate-y-1/2">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((activeStage + 1) / totalStages) * 100}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          
          {/* Flowing Animation */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
            style={{
              transform: `translateX(${animationProgress * 200 - 50}%)`,
              width: '50%'
            }}
          />
        </div>

        {/* Timeline Nodes */}
        <div className="relative flex justify-between items-center">
          {timelineStages?.map((stage, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer group"
              onClick={() => onTimelineClick(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Node */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                index <= activeStage
                  ? `bg-gradient-to-br ${stage?.color} text-white shadow-glass`
                  : 'glass-surface text-glass-text-secondary hover:text-primary'
              }`}>
                <Icon name={stage?.icon} size={18} />
              </div>

              {/* Stage Label */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center">
                <div className={`text-xs font-medium whitespace-nowrap ${
                  index === activeStage ? 'text-primary' : 'text-glass-text-secondary'
                }`}>
                  {stage?.name}
                </div>
                <div className="text-xs text-glass-text-secondary font-mono">
                  {2 + index * 2}-{4 + index * 2}w
                </div>
              </div>

              {/* Active Indicator */}
              {index === activeStage && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Completion Check */}
              {index < activeStage && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Check" size={10} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {/* Timeline Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {activeStage + 1}
          </div>
          <div className="text-xs text-glass-text-secondary uppercase tracking-wide">
            Current Stage
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            {Math.round(((activeStage + 1) / totalStages) * 100)}%
          </div>
          <div className="text-xs text-glass-text-secondary uppercase tracking-wide">
            Complete
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-glass-text-primary">
            {totalStages - activeStage - 1}
          </div>
          <div className="text-xs text-glass-text-secondary uppercase tracking-wide">
            Remaining
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;