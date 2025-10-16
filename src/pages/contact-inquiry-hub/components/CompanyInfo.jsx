import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CompanyInfo = () => {
  const contactMethods = [
    {
      icon: 'Phone',
      title: 'Call Us',
      value: '+94 (74) 140-1400',
      description: 'Mon-Fri 9AM-6PM EST',
      action: () => window.open('tel:+94741401400')
    },
    {
      icon: 'Mail',
      title: 'Email Us',
      value: 'info@rtechsl.com',
      description: 'We respond within 2 hours',
      action: () => window.open('mailto:info@rtechsl.com')
    },
    {
      icon: 'MessageCircle',
      title: 'WhatsApp',
      value: '+94 (74) 140-1400',
      description: 'Instant messaging support',
      action: () => window.open('https://wa.me/94741401400')
    },
    {
      icon: 'MapPin',
      title: 'Visit Us',
      value: '123 Technology Street',
      description: 'Tech Park, City 12345',
      action: () => window.open('https://maps.app.goo.gl/5JKRLs2BSX8XHDfU9')
    }
  ];

  const businessHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', time: 'Closed' }
  ];

  const services = [
    { name: 'POS Systems', icon: 'CreditCard' },
    { name: 'Mobile Apps', icon: 'Smartphone' },
    { name: 'Web Development', icon: 'Globe' },
    { name: 'CCTV Systems', icon: 'Video' },
    { name: 'Networking', icon: 'Wifi' }
  ];

  return (
    <div className="space-y-8">
      {/* Company Logo and Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-morphism rounded-3xl p-8 text-center"
      >
        <img 
          src="/new_brand.png" 
          alt="R-tech Solution Pvt Ltd" 
          className="h-20 w-auto mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold text-glass-text-primary mb-2">
          R-tech Solution Pvt Ltd
        </h2>
        <p className="text-glass-text-secondary mb-6">
          Empowering businesses with cutting-edge technology solutions. 
          From POS systems to complete networking infrastructure, we deliver 
          excellence in every project.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {services?.map((service, index) => (
            <motion.div
              key={service?.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-surface p-3 rounded-xl flex flex-col items-center space-y-2"
            >
              <Icon name={service?.icon} size={20} className="text-primary" />
              <span className="text-xs text-glass-text-secondary font-medium">
                {service?.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Contact Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-morphism rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-glass-text-primary mb-6 text-center">
          Get in Touch
        </h3>
        
        <div className="space-y-4">
          {contactMethods?.map((method, index) => (
            <motion.button
              key={method?.title}
              onClick={method?.action}
              className="w-full glass-surface hover:glass-interactive p-4 rounded-xl text-left transition-all duration-300 group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                  <Icon 
                    name={method?.icon} 
                    size={20} 
                    className="text-primary group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-glass-text-primary group-hover:text-primary transition-colors duration-300">
                    {method?.title}
                  </h4>
                  <p className="text-primary font-medium">
                    {method?.value}
                  </p>
                  <p className="text-glass-text-secondary text-sm">
                    {method?.description}
                  </p>
                </div>
                <Icon 
                  name="ExternalLink" 
                  size={16} 
                  className="text-glass-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" 
                />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
      {/* Business Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-morphism rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-glass-text-primary mb-6 text-center">
          Business Hours
        </h3>
        
        <div className="space-y-3">
          {businessHours?.map((hours, index) => (
            <motion.div
              key={hours?.day}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex justify-between items-center py-2 px-4 glass-surface rounded-lg"
            >
              <span className="text-glass-text-primary font-medium">
                {hours?.day}
              </span>
              <span className="text-glass-text-secondary">
                {hours?.time}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Emergency Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-morphism rounded-3xl p-6 border border-accent/20"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Clock" size={24} className="text-accent" />
          </div>
          <h3 className="text-lg font-bold text-glass-text-primary mb-2">
            24/7 Emergency Support
          </h3>
          <p className="text-glass-text-secondary text-sm mb-4">
            For critical system issues and urgent technical support
          </p>
          <Button
            variant="outline"
            size="sm"
            className="glass-interactive border-accent/20 text-accent hover:bg-accent/10"
            iconName="Phone"
            iconPosition="left"
            onClick={() => window.open('tel:+15551234567')}
          >
            Emergency Line
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyInfo;