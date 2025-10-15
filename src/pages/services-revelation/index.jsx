import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../../components/ui/Header';
import SEO from '../../components/SEO';
import { generatePageSEO } from '../../utils/seoUtils';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ServiceCard from './components/ServiceCard';
import ServiceModal from './components/ServiceModal';
import ServiceCombinator from './components/ServiceCombinator';
import FloatingNavigation from './components/FloatingNavigation';

const ServicesRevelation = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Mock services data - Update services to match R-tech Solution offerings
  const services = [
    {
      id: "pos-systems",
      title: "POS Systems",
      icon: "CreditCard",
      description: "Complete point-of-sale solutions for retail and hospitality businesses with inventory management and sales analytics.",
      detailedDescription: `We provide comprehensive POS systems that streamline your business operations. Our solutions integrate seamlessly with inventory management, payment processing, and customer relationship management to give you complete control over your retail or hospitality business.\n\nOur POS systems are designed for reliability, speed, and ease of use, ensuring your staff can serve customers efficiently while you maintain complete oversight of your business operations.`,
      features: [
        "Inventory Management Integration",
        "Multi-Payment Gateway Support",
        "Real-time Sales Analytics",
        "Customer Management System",
        "Multi-store Support"
      ],
      timeline: "4-6 weeks",
      techStack: "Hardware + Software Solution",
      priceRange: "$2k - $15k",
      teamSize: "2-3 specialists",
      methodology: [
        {
          title: "Business Analysis",
          description: "Analyze your business requirements, customer flow, and operational needs to design the perfect POS solution."
        },
        {
          title: "System Configuration",
          description: "Configure hardware and software components, integrate payment gateways, and set up inventory management."
        },
        {
          title: "Staff Training",
          description: "Comprehensive training for your staff on system operation, troubleshooting, and daily management tasks."
        },
        {
          title: "Launch & Support",
          description: "System deployment with ongoing technical support, maintenance, and regular updates."
        }
      ],
      technologies: ["Touch Screen Terminals", "Barcode Scanners", "Receipt Printers", "Payment Terminals", "Inventory Software"],
      deliverables: [
        "Complete POS hardware setup",
        "Custom software configuration",
        "Payment gateway integration",
        "Inventory management system",
        "Staff training materials",
        "Technical documentation",
        "12 months warranty & support"
      ]
    },
    {
      id: "mobile-development",
      title: "Mobile App Development",
      icon: "Smartphone",
      description: "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
      detailedDescription: `Mobile-first thinking drives every decision in our development process. We create applications that feel native to each platform while maintaining consistency in your brand experience. Our approach balances performance, user experience, and development efficiency.\n\nFrom concept to app store deployment, we handle every aspect of mobile development with meticulous attention to platform-specific guidelines and user expectations.`,
      features: [
        "Native iOS & Android Development",
        "Cross-platform Solutions",
        "App Store Optimization",
        "Push Notification Systems",
        "Offline Functionality"
      ],
      timeline: "8-12 weeks",
      techStack: "React Native, Flutter, Native",
      priceRange: "$15k - $50k",
      teamSize: "3-5 specialists"
    },
    {
      id: "web-development",
      title: "Web Development",
      icon: "Globe",
      description: "Modern responsive websites and web applications that drive business growth and enhance user engagement.",
      detailedDescription: `We don't just build websites; we architect digital ecosystems that evolve with your business. Our web development approach combines technical excellence with creative vision, resulting in platforms that not only look stunning but perform flawlessly across all devices and user scenarios.\n\nEvery line of code is written with purpose, every interaction designed with intention. We leverage the latest technologies while ensuring your platform remains accessible, fast, and future-ready.`,
      features: [
        "Responsive Design Architecture",
        "Content Management Systems",
        "E-commerce Integration",
        "SEO Optimization",
        "Performance Optimization"
      ],
      timeline: "6-10 weeks",
      techStack: "React, Next.js, Node.js",
      priceRange: "$10k - $40k",
      teamSize: "3-4 specialists"
    },
    {
      id: "cctv-systems",
      title: "CCTV & Security Systems",
      icon: "Video",
      description: "Professional surveillance and security camera systems with remote monitoring and advanced analytics.",
      detailedDescription: `Your security is our priority. We design and install comprehensive CCTV systems that provide complete coverage of your premises. Our solutions combine high-definition cameras, intelligent recording systems, and remote monitoring capabilities to ensure your property is protected 24/7.\n\nOur security systems are scalable and can grow with your business needs, providing you with peace of mind and complete situational awareness of your premises.`,
      features: [
        "HD/4K Camera Installation",
        "Remote Monitoring System",
        "Motion Detection & Alerts",
        "Cloud Storage Solutions",
        "Night Vision Capabilities"
      ],
      timeline: "2-4 weeks",
      techStack: "IP Cameras, NVR Systems",
      priceRange: "$3k - $20k",
      teamSize: "2-3 technicians"
    },
    {
      id: "networking-solutions",
      title: "Networking & IT Solutions",
      icon: "Wifi",
      description: "Complete network infrastructure setup, WiFi solutions, and ongoing IT support for businesses of all sizes.",
      detailedDescription: `A robust network infrastructure is the backbone of any modern business. We design, implement, and maintain network solutions that ensure reliable connectivity, security, and scalability. Our approach covers everything from basic WiFi setup to complex enterprise network architectures.\n\nWe provide comprehensive IT support to keep your systems running smoothly, allowing you to focus on your core business while we handle the technology.`,
      features: [
        "Network Design & Setup",
        "WiFi Infrastructure",
        "Server Management",
        "IT Support & Maintenance",
        "Security Implementation"
      ],
      timeline: "3-6 weeks",
      techStack: "Enterprise Hardware & Software",
      priceRange: "$5k - $30k",
      teamSize: "2-4 specialists"
    }
  ];

  // Navigation sections
  const navigationSections = [
    { id: 'hero', title: 'Services Overview', icon: 'Home' },
    { id: 'services', title: 'Our Services', icon: 'Grid' },
    { id: 'combinator', title: 'Service Combinator', icon: 'Layers' },
    { id: 'contact', title: 'Get Started', icon: 'MessageCircle' }
  ];

  // Handle service exploration
  const handleExploreService = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Handle consultation booking
  const handleBookConsultation = (service) => {
    console.log('Booking consultation for:', service?.title);
    setIsModalOpen(false);
    // Mock booking logic
    alert(`Consultation booking initiated for ${service?.title}. Our team will contact you within 24 hours.`);
  };

  // Handle service combination selection
  const handleCombinationSelect = (selectedServices) => {
    console.log('Selected service combination:', selectedServices);
    alert(`Custom solution created with ${selectedServices?.length} services. Redirecting to strategy call booking...`);
  };

  // Handle section navigation
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationSections?.map(section => ({
        id: section?.id,
        element: document.getElementById(section?.id)
      }));

      const currentSection = sections?.find(section => {
        if (!section?.element) return false;
        const rect = section?.element?.getBoundingClientRect();
        return rect?.top <= 100 && rect?.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection?.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <SEO {...generatePageSEO('services')} />
      <Header />
      {/* Background Effects */}
      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 opacity-30 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-glass-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glass-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-success/10 rounded-full blur-3xl animate-glass-float" style={{ animationDelay: '4s' }}></div>
      </motion.div>
      {/* Floating Navigation */}
      <FloatingNavigation
        sections={navigationSections}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      {/* Hero Section */}
      <section id="hero" className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ opacity: heroOpacity }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-glass-text-primary via-primary to-accent bg-clip-text text-transparent mb-6">
              Services Revelation
            </h1>
            <p className="text-xl md:text-2xl text-glass-text-secondary max-w-4xl mx-auto leading-relaxed">
              Discover our comprehensive suite of digital services, each crafted with purpose and designed to elevate your brand beyond beautiful—to meaningful.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glass-subtle"
              iconName="ArrowDown"
              iconPosition="right"
              onClick={() => handleSectionChange('services')}
            >
              Explore Our Craft
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass-interactive border-primary/20 text-primary hover:bg-primary/10"
              iconName="Calendar"
              iconPosition="left"
            >
              Book Strategy Call
            </Button>
          </motion.div>
        </motion.div>
      </section>
      {/* Services Grid */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-glass-text-primary mb-6">
              Our Digital Craft
            </h2>
            <p className="text-lg text-glass-text-secondary max-w-3xl mx-auto">
              Each service represents years of expertise, refined through countless projects and driven by our commitment to transparent innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service, index) => (
              <ServiceCard
                key={service?.id}
                service={service}
                index={index}
                onExplore={handleExploreService}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Service Combinator */}
      <section id="combinator" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-glass-text-primary mb-6">
              Craft Your Solution
            </h2>
            <p className="text-lg text-glass-text-secondary max-w-3xl mx-auto">
              Combine multiple services to create a comprehensive solution tailored to your unique needs and objectives.
            </p>
          </motion.div>

          <ServiceCombinator
            services={services}
            onCombinationSelect={handleCombinationSelect}
          />
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 glass-interactive rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Icon name="MessageCircle" size={32} className="text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-glass-text-primary mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-glass-text-secondary mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can transform your digital presence and drive meaningful results for your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass-interactive border-primary/20 text-primary hover:bg-primary/10"
                iconName="FileText"
                iconPosition="left"
              >
                Request Proposal
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Service Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookConsultation={handleBookConsultation}
      />
    </div>
  );
};

export default ServicesRevelation;