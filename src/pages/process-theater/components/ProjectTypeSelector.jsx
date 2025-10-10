import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProjectTypeSelector = ({ selectedType, onTypeSelect }) => {
  const [hoveredType, setHoveredType] = useState(null);

  const projectTypes = [
    {
      id: 'web-app',
      name: 'Web Application',
      icon: 'Globe',
      description: 'Full-stack web applications with modern frameworks',
      timeline: '12-16 weeks',
      complexity: 'High',
      features: ['Custom Development', 'API Integration', 'Database Design', 'User Authentication'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'mobile-app',
      name: 'Mobile Application',
      icon: 'Smartphone',
      description: 'Native and cross-platform mobile solutions',
      timeline: '14-20 weeks',
      complexity: 'High',
      features: ['iOS & Android', 'Push Notifications', 'Offline Support', 'App Store Deployment'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'website',
      name: 'Corporate Website',
      icon: 'Monitor',
      description: 'Professional websites with CMS integration',
      timeline: '6-10 weeks',
      complexity: 'Medium',
      features: ['Responsive Design', 'CMS Integration', 'SEO Optimization', 'Analytics Setup'],
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Platform',
      icon: 'ShoppingCart',
      description: 'Complete online store solutions',
      timeline: '16-24 weeks',
      complexity: 'Very High',
      features: ['Payment Gateway', 'Inventory Management', 'Order Processing', 'Admin Dashboard'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'saas',
      name: 'SaaS Platform',
      icon: 'Cloud',
      description: 'Scalable software-as-a-service solutions',
      timeline: '20-32 weeks',
      complexity: 'Very High',
      features: ['Multi-tenancy', 'Subscription Billing', 'API Development', 'Cloud Infrastructure'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'portfolio',
      name: 'Portfolio Site',
      icon: 'User',
      description: 'Personal or professional portfolio websites',
      timeline: '4-6 weeks',
      complexity: 'Low',
      features: ['Custom Design', 'Portfolio Gallery', 'Contact Forms', 'Social Integration'],
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Low': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'High': return 'text-orange-500';
      case 'Very High': return 'text-red-500';
      default: return 'text-glass-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-glass-text-primary mb-2">
          Select Project Type
        </h3>
        <p className="text-glass-text-secondary">
          Choose your project type to see the customized process flow
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectTypes?.map((type) => (
          <motion.div
            key={type?.id}
            className={`relative cursor-pointer transition-all duration-300 ${
              selectedType === type?.id
                ? 'glass-interactive shadow-glass-interactive scale-105'
                : 'glass-morphism hover:glass-interactive'
            }`}
            onClick={() => onTypeSelect(type?.id)}
            onMouseEnter={() => setHoveredType(type?.id)}
            onMouseLeave={() => setHoveredType(null)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-6 rounded-2xl">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${type?.color} text-white shadow-glass`}>
                  <Icon name={type?.icon} size={20} />
                </div>
                
                {selectedType === type?.id && (
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} className="text-white" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-glass-text-primary">
                  {type?.name}
                </h4>
                
                <p className="text-sm text-glass-text-secondary leading-relaxed">
                  {type?.description}
                </p>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} className="text-accent" />
                    <span className="text-glass-text-secondary">{type?.timeline}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="BarChart3" size={12} className={getComplexityColor(type?.complexity)} />
                    <span className={getComplexityColor(type?.complexity)}>{type?.complexity}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h5 className="text-xs font-medium text-glass-text-primary uppercase tracking-wide">
                    Key Features
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {type?.features?.slice(0, 2)?.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs rounded-lg glass-surface text-glass-text-secondary"
                      >
                        {feature}
                      </span>
                    ))}
                    {type?.features?.length > 2 && (
                      <span className="px-2 py-1 text-xs rounded-lg glass-surface text-accent">
                        +{type?.features?.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              {(hoveredType === type?.id || selectedType === type?.id) && (
                <div 
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${type?.color} opacity-10 pointer-events-none`}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Selected Type Details */}
      {selectedType && (
        <motion.div
          className="glass-morphism rounded-2xl p-6 shadow-glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {(() => {
            const selected = projectTypes?.find(type => type?.id === selectedType);
            return (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${selected?.color} text-white`}>
                    <Icon name={selected?.icon} size={16} />
                  </div>
                  <h4 className="text-lg font-semibold text-glass-text-primary">
                    {selected?.name} Process
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{selected?.timeline}</div>
                    <div className="text-xs text-glass-text-secondary uppercase tracking-wide">Timeline</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-xl font-bold ${getComplexityColor(selected?.complexity)}`}>
                      {selected?.complexity}
                    </div>
                    <div className="text-xs text-glass-text-secondary uppercase tracking-wide">Complexity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-accent">{selected?.features?.length}</div>
                    <div className="text-xs text-glass-text-secondary uppercase tracking-wide">Features</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-glass-text-primary">All Features Included:</h5>
                  <div className="flex flex-wrap gap-2">
                    {selected?.features?.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm rounded-lg glass-surface text-glass-text-secondary"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
};

export default ProjectTypeSelector;