import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ServiceSelector = ({ services, onServiceSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-morphism rounded-3xl p-8"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 glass-interactive rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon name="Settings" size={32} className="text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-glass-text-primary mb-2">
          Select Your Service
        </h2>
        <p className="text-glass-text-secondary">
          Choose the service you're interested in to get a customized inquiry form
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services?.map((service, index) => (
          <motion.button
            key={service?.id}
            onClick={() => onServiceSelect(service?.id)}
            className="glass-surface hover:glass-interactive p-6 rounded-2xl text-left transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                <Icon 
                  name={service?.icon} 
                  size={24} 
                  className="text-primary group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-glass-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
                  {service?.title}
                </h3>
                <p className="text-glass-text-secondary text-sm mb-3 leading-relaxed">
                  {service?.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service?.features?.slice(0, 2)?.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-lg"
                    >
                      {feature}
                    </span>
                  ))}
                  {service?.features?.length > 2 && (
                    <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-lg">
                      +{service?.features?.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-glass-text-secondary">
                Get Custom Quote
              </span>
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-primary group-hover:translate-x-1 transition-transform duration-300" 
              />
            </div>
          </motion.button>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-glass-text-secondary text-sm mb-4">
          Need multiple services or a custom solution?
        </p>
        <motion.button
          onClick={() => onServiceSelect('custom')}
          className="glass-interactive px-6 py-3 rounded-xl text-primary font-medium hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon name="Plus" size={16} className="inline mr-2" />
          Request Custom Solution
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ServiceSelector;