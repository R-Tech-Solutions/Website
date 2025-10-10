import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'process', label: 'Process', icon: 'Workflow' },
    { id: 'results', label: 'Results', icon: 'TrendingUp' },
    { id: 'technical', label: 'Technical', icon: 'Code' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project?.gallery?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project?.gallery?.length - 1 : prev - 1
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-glass-text-primary mb-3">Project Overview</h4>
              <p className="text-glass-text-secondary leading-relaxed">{project?.fullDescription}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-glass-text-primary mb-2">Challenge</h5>
                <p className="text-sm text-glass-text-secondary">{project?.challenge}</p>
              </div>
              <div>
                <h5 className="font-medium text-glass-text-primary mb-2">Solution</h5>
                <p className="text-sm text-glass-text-secondary">{project?.solution}</p>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-glass-text-primary mb-3">Key Features</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
                    <span className="text-sm text-glass-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'process':
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-glass-text-primary mb-4">Development Process</h4>
            <div className="space-y-4">
              {project?.processSteps?.map((step, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 glass-morphism rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-glass-text-primary mb-1">{step?.title}</h5>
                    <p className="text-sm text-glass-text-secondary">{step?.description}</p>
                    <div className="text-xs text-glass-text-secondary mt-1">{step?.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'results':
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-glass-text-primary mb-4">Project Results</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project?.metrics?.map((metric, index) => (
                <div key={index} className="glass-morphism rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{metric?.value}</div>
                  <div className="text-sm text-glass-text-secondary">{metric?.label}</div>
                </div>
              ))}
            </div>
            <div>
              <h5 className="font-medium text-glass-text-primary mb-3">Client Testimonial</h5>
              <div className="glass-surface rounded-xl p-4">
                <p className="text-glass-text-secondary italic mb-3">"{project?.testimonial?.quote}"</p>
                <div className="flex items-center space-x-3">
                  <Image
                    src={project?.testimonial?.avatar}
                    alt={project?.testimonial?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-glass-text-primary">{project?.testimonial?.name}</div>
                    <div className="text-sm text-glass-text-secondary">{project?.testimonial?.position}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'technical':
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-glass-text-primary mb-4">Technical Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-glass-text-primary mb-3">Technologies Used</h5>
                <div className="flex flex-wrap gap-2">
                  {project?.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="glass-morphism px-3 py-1 rounded-full text-sm text-glass-text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-glass-text-primary mb-3">Architecture</h5>
                <p className="text-sm text-glass-text-secondary">{project?.architecture}</p>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-glass-text-primary mb-3">Performance Metrics</h5>
              <div className="space-y-3">
                {project?.performance?.map((perf, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-glass-text-secondary">{perf?.metric}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 glass-surface rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          style={{ width: `${perf?.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-glass-text-primary">{perf?.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[90vh] glass-morphism rounded-2xl overflow-hidden shadow-glass-interactive"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-glass-text-primary">{project?.title}</h2>
                <p className="text-glass-text-secondary">{project?.client} • {project?.category}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 glass-interactive rounded-lg hover:bg-white/10 transition-colors"
              >
                <Icon name="X" size={20} className="text-glass-text-secondary" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
              {/* Image Gallery */}
              <div className="lg:w-1/2 relative">
                <div className="relative h-64 lg:h-full">
                  <Image
                    src={project?.gallery?.[currentImageIndex]}
                    alt={`${project?.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {project?.gallery?.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 glass-morphism rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                      >
                        <Icon name="ChevronLeft" size={20} className="text-white" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 glass-morphism rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                      >
                        <Icon name="ChevronRight" size={20} className="text-white" />
                      </button>
                    </>
                  )}

                  {/* Image Indicators */}
                  {project?.gallery?.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {project?.gallery?.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 flex flex-col">
                {/* Tabs */}
                <div className="flex border-b border-white/10">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab?.id
                          ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-glass-text-secondary hover:text-glass-text-primary'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {renderTabContent()}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-glass-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{project?.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-amber-400" />
                        <span>{project?.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-interactive border-white/20"
                        iconName="ExternalLink"
                        iconPosition="right"
                        iconSize={14}
                      >
                        Live Demo
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-gradient-to-r from-primary to-accent"
                        iconName="MessageCircle"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Discuss Similar Project
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;