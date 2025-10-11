import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProcessTimeline = ({ activeStage = 0, totalStages: totalProp, onTimelineClick, allowClicks = true }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  // internal active state: sync from prop until user interacts
  const [internalActive, setInternalActive] = useState(activeStage || 0);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress(prev => (prev + 0.02) % 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const timelineStages = [
    { name: 'Discovery', icon: 'Search', color: 'from-blue-500 to-cyan-500' },
    { name: 'Define', icon: 'Target', color: 'from-cyan-500 to-teal-500' },
    { name: 'Design', icon: 'Palette', color: 'from-teal-500 to-green-500' },
    { name: 'Development', icon: 'Code', color: 'from-green-500 to-yellow-500' },
    { name: 'Debug', icon: 'CheckCircle', color: 'from-yellow-500 to-orange-500' },
    { name: 'Deliver', icon: 'Rocket', color: 'from-orange-500 to-red-500' }
  ];

  // decide total stages
  const totalStages = typeof totalProp === 'number' ? totalProp : timelineStages.length;

  // sync prop activeStage into internalActive unless the user has clicked - this prevents external auto-advances
  useEffect(() => {
    if (!userInteracted) {
      setInternalActive(activeStage || 0);
    }
  }, [activeStage, userInteracted]);

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
              className={`relative ${allowClicks ? 'cursor-pointer' : ''} group`}
              onClick={() => {
                if (!allowClicks) return;
                setInternalActive(index);
                setUserInteracted(true);
                if (typeof onTimelineClick === 'function') onTimelineClick(index);
              }}
              whileHover={{ scale: allowClicks ? 1.03 : 1 }}
              whileTap={{ scale: allowClicks ? 0.98 : 1 }}
            >
              {/* Node */}
              <div className="relative flex items-center justify-center">
                {/* Highlight ring for selected node */}
                {index === internalActive && (
                  <div className="absolute -inset-1 rounded-full pointer-events-none" style={{ boxShadow: '0 6px 18px rgba(99,102,241,0.18), 0 2px 6px rgba(139,92,246,0.12)', border: '2px solid rgba(99,102,241,0.12)' }} />
                )}

                {/* Halo placed behind the node so it doesn't cover the icon */}
                {index === internalActive && (
                  <motion.div
                    className="absolute rounded-full"
                    style={{ width: '68px', height: '68px', background: 'radial-gradient(closest-side, rgba(99,102,241,0.12), rgba(139,92,246,0.06), transparent)' }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 ${
                  index <= internalActive
                    ? `bg-gradient-to-br ${stage?.color} text-white shadow-glass`
                    : 'glass-surface text-glass-text-secondary hover:text-primary'
                }`}>
                  <Icon name={stage?.icon} size={18} />
                </div>
              </div>

              {/* Stage Label */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center">
                <div className={`text-xs font-medium whitespace-nowrap ${
                  index === internalActive ? 'text-primary' : 'text-glass-text-secondary'
                }`}>
                  {stage?.name}
                </div>
                <div className="text-xs text-glass-text-secondary font-mono">
                  {2 + index * 2}-{4 + index * 2}w
                </div>
              </div>

              {/* Completion Check */}
              {index < internalActive && (
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
            {internalActive + 1}
          </div>
          <div className="text-xs text-glass-text-secondary uppercase tracking-wide">
            Current Stage
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            {Math.round(((internalActive + 1) / totalStages) * 100)}%
          </div>
          <div className="text-xs text-glass-text-secondary uppercase tracking-wide">
            Complete
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-glass-text-primary">
            {totalStages - internalActive - 1}
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