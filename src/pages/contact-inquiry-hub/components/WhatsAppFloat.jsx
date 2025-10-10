import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip after a delay
      setTimeout(() => setShowTooltip(true), 2000);
      // Hide tooltip after showing
      setTimeout(() => setShowTooltip(false), 8000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '15551234567'; // Replace with actual WhatsApp number
    const message = encodeURIComponent('Hi! I\'m interested in R-tech Solution services. Can you help me?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                className="absolute bottom-full right-0 mb-4 max-w-xs"
              >
                <div className="glass-morphism rounded-2xl p-4 shadow-glass-interactive">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="MessageCircle" size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-glass-text-primary font-medium text-sm mb-1">
                        Need Help?
                      </p>
                      <p className="text-glass-text-secondary text-xs">
                        Chat with us on WhatsApp for instant support!
                      </p>
                    </div>
                    <button
                      onClick={() => setShowTooltip(false)}
                      className="text-glass-text-secondary hover:text-glass-text-primary"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full right-4 -mt-1">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/10"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <motion.button
            onClick={handleWhatsAppClick}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button Background */}
            <div className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-green-500/25 group-hover:shadow-2xl">
              <Icon name="MessageCircle" size={24} className="text-white" />
              
              {/* Pulse Animation */}
              <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
            </div>

            {/* Notification Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-xs font-bold">1</span>
            </motion.div>
          </motion.button>

          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full border-2 border-green-500/30 animate-pulse scale-125"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppFloat;