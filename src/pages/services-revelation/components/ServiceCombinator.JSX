import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCombinator = ({ services, onCombinationSelect }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleService = (serviceId) => {
    setSelectedServices(prev => 
      prev?.includes(serviceId) 
        ? prev?.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getSelectedServicesData = () => {
    return services?.filter(service => selectedServices?.includes(service?.id));
  };

  const calculateCombinedTimeline = () => {
    const selectedData = getSelectedServicesData();
    if (selectedData?.length === 0) return "0 weeks";
    
    const totalWeeks = selectedData?.reduce((sum, service) => {
      const weeks = parseInt(service?.timeline?.match(/\d+/)?.[0]);
      return sum + weeks;
    }, 0);
    
    // Apply efficiency discount for multiple services
    const efficiency = selectedData?.length > 1 ? 0.85 : 1;
    return `${Math.ceil(totalWeeks * efficiency)} weeks`;
  };

  const calculateCombinedInvestment = () => {
    const selectedData = getSelectedServicesData();
    if (selectedData?.length === 0) return "$0";
    
    const totalMin = selectedData?.reduce((sum, service) => {
      const min = parseInt(service?.priceRange?.match(/\$(\d+)/)?.[1]);
      return sum + min;
    }, 0);
    
    // Apply bundle discount
    const discount = selectedData?.length > 1 ? 0.9 : 1;
    return `$${Math.floor(totalMin * discount / 1000)}k+`;
  };

  return (
    <div className="glass-morphism rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-glass-text-primary mb-2">Service Combinator</h3>
          <p className="text-sm text-glass-text-secondary">
            Mix and match services to create your perfect solution
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="glass-interactive"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Service Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services?.map((service) => (
                <motion.div
                  key={service?.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`glass-surface rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                    selectedServices?.includes(service?.id)
                      ? 'border-2 border-primary bg-primary/5' :'border border-white/10 hover:border-primary/30'
                  }`}
                  onClick={() => toggleService(service?.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                      selectedServices?.includes(service?.id)
                        ? 'border-primary bg-primary' :'border-glass-text-secondary'
                    }`}>
                      {selectedServices?.includes(service?.id) && (
                        <Icon name="Check" size={12} className="text-white" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 flex-1">
                      <Icon name={service?.icon} size={16} className="text-primary" />
                      <span className="font-medium text-glass-text-primary">{service?.title}</span>
                    </div>
                    
                    <span className="text-xs text-glass-text-secondary">{service?.timeline}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Combination Summary */}
            <AnimatePresence>
              {selectedServices?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-interactive rounded-xl p-6 border border-primary/20"
                >
                  <h4 className="font-semibold text-glass-text-primary mb-4">
                    Your Custom Solution ({selectedServices?.length} services)
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Icon name="Clock" size={16} className="text-primary" />
                        <span className="text-sm font-medium text-glass-text-primary">Timeline</span>
                      </div>
                      <span className="text-lg font-bold text-primary">{calculateCombinedTimeline()}</span>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Icon name="DollarSign" size={16} className="text-accent" />
                        <span className="text-sm font-medium text-glass-text-primary">Investment</span>
                      </div>
                      <span className="text-lg font-bold text-accent">{calculateCombinedInvestment()}</span>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Icon name="Zap" size={16} className="text-success" />
                        <span className="text-sm font-medium text-glass-text-primary">Savings</span>
                      </div>
                      <span className="text-lg font-bold text-success">
                        {selectedServices?.length > 1 ? "15%" : "0%"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 glass-interactive border-primary/20 text-primary hover:bg-primary/10"
                      iconName="FileText"
                      iconPosition="left"
                    >
                      Get Proposal
                    </Button>
                    <Button
                      variant="default"
                      className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                      iconName="Calendar"
                      iconPosition="left"
                      onClick={() => onCombinationSelect(getSelectedServicesData())}
                    >
                      Book Strategy Call
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceCombinator;