import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ContactForm from './components/ContactForm';
import CompanyInfo from './components/CompanyInfo';
import ServiceSelector from './components/ServiceSelector';
import WhatsAppFloat from './components/WhatsAppFloat';

const ContactInquiryHub = () => {
  const [selectedService, setSelectedService] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // R-tech Solution services
  const services = [
    {
      id: 'pos',
      title: 'POS Systems',
      icon: 'CreditCard',
      description: 'Complete point-of-sale solutions for retail and hospitality businesses',
      features: ['Inventory Management', 'Sales Analytics', 'Payment Integration', 'Multi-store Support']
    },
    {
      id: 'app',
      title: 'Mobile App Development',
      icon: 'Smartphone',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      features: ['Native Development', 'Cross-platform Solutions', 'API Integration', 'App Store Deployment']
    },
    {
      id: 'web',
      title: 'Web Development',
      icon: 'Globe',
      description: 'Modern responsive websites and web applications',
      features: ['Responsive Design', 'CMS Integration', 'E-commerce Solutions', 'Performance Optimization']
    },
    {
      id: 'cctv',
      title: 'CCTV Systems',
      icon: 'Video',
      description: 'Professional surveillance and security camera systems',
      features: ['HD/4K Cameras', 'Remote Monitoring', 'Motion Detection', 'Cloud Storage']
    },
    {
      id: 'networking',
      title: 'Networking Solutions',
      icon: 'Wifi',
      description: 'Complete network infrastructure and IT solutions',
      features: ['Network Setup', 'WiFi Solutions', 'Server Management', 'IT Support']
    }
  ];

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setFormStep(2);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      alert('Thank you for your inquiry! Our team will contact you within 24 hours.');
      setFormStep(1);
      setSelectedService('');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-background via-card to-background relative">
      <Header />
      {/* Background Effects */}
      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 opacity-20 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-glass-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glass-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-success/10 rounded-full blur-3xl animate-glass-float" style={{ animationDelay: '4s' }}></div>
      </motion.div>
      {/* WhatsApp Floating Button */}
      <WhatsAppFloat />
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ opacity: heroOpacity }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/assets/images/image-1760000663777.png" 
                alt="R-tech Solution Pvt Ltd" 
                className="h-16 w-auto mr-4"
              />
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-glass-text-primary via-primary to-accent bg-clip-text text-transparent">
                  Contact Us
                </h1>
                <p className="text-lg text-glass-text-secondary mt-2">R-tech Solution Pvt Ltd</p>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-glass-text-secondary max-w-4xl mx-auto leading-relaxed">
              Get in touch with R-tech Solution Pvt Ltd for all your technology needs. 
              We specialize in POS systems, mobile apps, web development, CCTV, and networking solutions.
            </p>
          </motion.div>
        </motion.div>
      </section>
      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {formStep === 1 ? (
                <ServiceSelector
                  services={services}
                  onServiceSelect={handleServiceSelect}
                />
              ) : (
                <ContactForm
                  selectedService={services?.find(s => s?.id === selectedService)}
                  onSubmit={handleFormSubmit}
                  onBack={() => setFormStep(1)}
                  isSubmitting={isSubmitting}
                />
              )}
            </motion.div>

            {/* Right Side - Company Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <CompanyInfo />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Map Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-3xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-glass-text-primary mb-4">
                Visit Our Office
              </h2>
              <p className="text-lg text-glass-text-secondary">
                Located in the heart of the technology district
              </p>
            </div>
            
            <div className="glass-interactive rounded-2xl overflow-hidden h-96 bg-card/50 flex items-center justify-center">
              <div className="text-center">
                <Icon name="MapPin" size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-glass-text-primary mb-2">
                  R-tech Solution Pvt Ltd
                </h3>
                <p className="text-glass-text-secondary">
                  123 Technology Street<br />
                  Tech Park, City 12345<br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-glass-text-secondary">
            © {new Date()?.getFullYear()} R-tech Solution Pvt Ltd. Empowering businesses with technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactInquiryHub;