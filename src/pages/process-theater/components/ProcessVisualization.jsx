import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProcessVisualization = ({ activeStage, projectType, onNodeClick }) => {
  const [flowAnimation, setFlowAnimation] = useState(0);
  const [particlePositions, setParticlePositions] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowAnimation(prev => (prev + 0.05) % 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate random particle positions
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.2
    }));
    setParticlePositions(particles);
  }, []);

  const processNodes = [
    {
      id: 'discovery',
      name: 'Discovery',
      icon: 'Search',
      position: { x: 10, y: 20 },
      connections: ['strategy'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'strategy',
      name: 'Define',
      icon: 'Target',
      position: { x: 30, y: 10 },
      connections: ['design'],
      color: 'from-cyan-500 to-teal-500'
    },
    {
      id: 'design',
      name: 'Design',
      icon: 'Palette',
      position: { x: 50, y: 30 },
      connections: ['development'],
      color: 'from-teal-500 to-green-500'
    },
    {
      id: 'development',
      name: 'Development',
      icon: 'Code',
      position: { x: 70, y: 15 },
      connections: ['testing'],
      color: 'from-green-500 to-yellow-500'
    },
    {
      id: 'testing',
      name: 'Debug',
      icon: 'CheckCircle',
      position: { x: 85, y: 40 },
      connections: ['launch'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'launch',
      name: 'Deliver',
      icon: 'Rocket',
      position: { x: 90, y: 70 },
      connections: [],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const getConnectionPath = (from, to) => {
    const fromNode = processNodes?.find(n => n?.id === from);
    const toNode = processNodes?.find(n => n?.id === to);
    
    if (!fromNode || !toNode) return '';
    
    const x1 = fromNode?.position?.x;
    const y1 = fromNode?.position?.y;
    const x2 = toNode?.position?.x;
    const y2 = toNode?.position?.y;
    
    const midX = (x1 + x2) / 2;
    const midY = Math.min(y1, y2) - 10;
    
    return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
  };

  const isNodeActive = (nodeIndex) => nodeIndex <= activeStage;
  const isNodeCurrent = (nodeIndex) => nodeIndex === activeStage;

  return (
    <div className="glass-morphism rounded-2xl p-4 md:p-8 shadow-glass">
      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-glass-text-primary mb-2">
          Process Visualization
        </h3>
        <p className="text-sm md:text-base text-glass-text-secondary px-4">
          Interactive pipeline showing your project's journey through our methodology
        </p>
      </div>
      {/* Main Visualization Container */}
      <div className="relative w-full h-64 md:h-96 glass-surface rounded-xl overflow-hidden">
        {/* Background Particles */}
        <div className="absolute inset-0">
          {particlePositions?.map((particle) => (
            <motion.div
              key={particle?.id}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${particle?.x}%`,
                top: `${particle?.y}%`,
                width: `${particle?.size}px`,
                height: `${particle?.size}px`
              }}
              animate={{
                x: [0, 20, 0],
                y: [0, -10, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3 + particle?.speed,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* SVG Pipeline */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pipelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0.3" />
            </linearGradient>
            
            <linearGradient id="activeFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" />
              <stop offset="50%" stopColor="rgb(139, 92, 246)" />
              <stop offset="100%" stopColor="rgb(236, 72, 153)" />
            </linearGradient>
          </defs>

          {/* Pipeline Connections */}
          {processNodes?.map((node, index) => 
            node?.connections?.map(connectionId => {
              const connectionIndex = processNodes?.findIndex(n => n?.id === connectionId);
              const isActive = index <= activeStage && connectionIndex <= activeStage;
              
              return (
                <g key={`${node?.id}-${connectionId}`}>
                  {/* Background Path */}
                  <path
                    d={getConnectionPath(node?.id, connectionId)}
                    stroke="url(#pipelineGradient)"
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.5"
                  />
                  {/* Active Flow Path */}
                  {isActive && (
                    <motion.path
                      d={getConnectionPath(node?.id, connectionId)}
                      stroke="url(#activeFlow)"
                      strokeWidth="0.8"
                      fill="none"
                      strokeDasharray="2 1"
                      initial={{ strokeDashoffset: 10 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </g>
              );
            })
          )}

          {/* Flowing Data Points */}
          {processNodes?.map((node, index) => 
            node?.connections?.map(connectionId => {
              const connectionIndex = processNodes?.findIndex(n => n?.id === connectionId);
              const isActive = index <= activeStage && connectionIndex <= activeStage;
              
              if (!isActive) return null;
              
              return (
                <motion.circle
                  key={`flow-${node?.id}-${connectionId}`}
                  r="0.3"
                  fill="rgb(59, 130, 246)"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    cx: [node?.position?.x, processNodes?.find(n => n?.id === connectionId)?.position?.x],
                    cy: [node?.position?.y, processNodes?.find(n => n?.id === connectionId)?.position?.y]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                />
              );
            })
          )}
        </svg>

        {/* Process Nodes */}
        {processNodes?.map((node, index) => (
          <motion.div
            key={node?.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${onNodeClick ? 'cursor-pointer' : ''}`}
            style={{
              left: `${node?.position?.x}%`,
              top: `${node?.position?.y}%`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            onClick={() => {
              if (typeof onNodeClick === 'function') onNodeClick(index);
            }}
            whileHover={onNodeClick ? { scale: 1.03 } : undefined}
            whileTap={onNodeClick ? { scale: 0.98 } : undefined}
          >
            {/* Node Container */}
            <div className="relative flex items-center justify-center">
              {/* Highlight ring for current node */}
              {isNodeCurrent(index) && (
                <div className="absolute -inset-1 rounded-2xl pointer-events-none" style={{ boxShadow: '0 8px 22px rgba(99,102,241,0.16), 0 3px 8px rgba(139,92,246,0.08)', border: '2px solid rgba(99,102,241,0.10)' }} />
              )}

              {/* Halo behind the node so the icon remains visible */}
              {isNodeCurrent(index) && (
                <motion.div
                  className="absolute rounded-xl md:rounded-2xl"
                  style={{ width: '56px', height: '56px', background: 'radial-gradient(closest-side, rgba(99,102,241,0.12), rgba(139,92,246,0.05), transparent)' }}
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              <div className={`relative w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 z-10 ${
                isNodeCurrent(index)
                  ? 'glass-interactive shadow-glass-interactive scale-105'
                  : isNodeActive(index)
                  ? `bg-gradient-to-br ${node?.color} text-white shadow-glass`
                  : 'glass-surface text-glass-text-secondary'
              }`}>
                <Icon name={node?.icon} size={16} className="md:w-5 md:h-5" />
              </div>

              {/* Completion Check */}
              {isNodeActive(index) && !isNodeCurrent(index) && (
                <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-success rounded-full flex items-center justify-center z-20">
                  <Icon name="Check" size={10} className="text-white md:w-3 md:h-3" />
                </div>
              )}
            </div>

            {/* Node Label */}
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center">
              <div className={`text-xs font-medium whitespace-nowrap ${
                isNodeCurrent(index) ? 'text-primary' : 'text-glass-text-secondary'
              }`}>
                {node?.name}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-xs text-glass-text-secondary mb-2">
            <span>Progress</span>
            <span className="font-mono">{Math.round(((activeStage + 1) / processNodes?.length) * 100)}%</span>
          </div>
          <div className="h-1 bg-glass-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${((activeStage + 1) / processNodes?.length) * 100}%` }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Project Type Indicator */}
        {projectType && (
          <div className="absolute top-4 right-4 glass-surface rounded-lg px-3 py-1">
            <span className="text-xs font-medium text-glass-text-primary">
              {projectType?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
            </span>
          </div>
        )}
      </div>
      {/* Legend */}
      <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-glass-text-secondary"></div>
          <span className="text-xs text-glass-text-secondary">Pending</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <span className="text-xs text-glass-text-secondary">Active</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-success"></div>
          <span className="text-xs text-glass-text-secondary">Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent animate-pulse"></div>
          <span className="text-xs text-glass-text-secondary">Current</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessVisualization;