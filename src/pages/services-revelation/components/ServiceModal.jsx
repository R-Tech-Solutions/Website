import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceModal = ({ service, isOpen, onClose, onBookConsultation }) => {
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

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      rotateX: -15,
      y: 100
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      rotateX: 15,
      y: -100,
      transition: {
        duration: 0.3
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-morphism rounded-3xl shadow-glass-interactive perspective-1000"
            onClick={(e) => e?.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 glass-morphism border-b border-white/10 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 glass-interactive rounded-xl flex items-center justify-center">
                    <Icon name={service?.icon} size={24} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-glass-text-primary">{service?.title}</h2>
                    <p className="text-sm text-glass-text-secondary">Deep Dive Experience</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="glass-interactive hover:bg-red-500/10"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Overview */}
              <div>
                <h3 className="text-xl font-semibold text-glass-text-primary mb-4">Service Overview</h3>
                <p className="text-glass-text-secondary leading-relaxed mb-6">
                  {service?.detailedDescription}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-surface rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Clock" size={16} className="text-primary" />
                      <span className="font-medium text-glass-text-primary">Timeline</span>
                    </div>
                    <p className="text-glass-text-secondary">{service?.timeline}</p>
                  </div>
                  
                  <div className="glass-surface rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="DollarSign" size={16} className="text-accent" />
                      <span className="font-medium text-glass-text-primary">Investment</span>
                    </div>
                    <p className="text-glass-text-secondary">{service?.priceRange}</p>
                  </div>
                  
                  <div className="glass-surface rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Users" size={16} className="text-success" />
                      <span className="font-medium text-glass-text-primary">Team Size</span>
                    </div>
                    <p className="text-glass-text-secondary">{service?.teamSize}</p>
                  </div>
                </div>
              </div>

              {/* Methodology */}
              <div>
                <h3 className="text-xl font-semibold text-glass-text-primary mb-4">Our Methodology</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service?.methodology?.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-surface rounded-xl p-6"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-glass-text-primary mb-2">{step?.title}</h4>
                          <p className="text-sm text-glass-text-secondary">{step?.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technology Stack */}
              <div>
                <h3 className="text-xl font-semibold text-glass-text-primary mb-4">Technology Stack</h3>
                <div className="glass-surface rounded-xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {service?.technologies?.map((tech, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 glass-interactive rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <Icon name="Code" size={20} className="text-primary" />
                        </div>
                        <span className="text-sm text-glass-text-secondary">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h3 className="text-xl font-semibold text-glass-text-primary mb-4">What You'll Receive</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service?.deliverables?.map((deliverable, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                      <span className="text-glass-text-secondary">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 glass-morphism border-t border-white/10 p-6 rounded-b-3xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="flex-1 glass-interactive border-primary/20 text-primary hover:bg-primary/10"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Ask Questions
                </Button>
                <Button
                  variant="default"
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={() => onBookConsultation(service)}
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;