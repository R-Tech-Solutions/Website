import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FloatingNavbar from './components/FloatingNavbar';
import NavigationProgress from './components/NavigationProgress';
import QuickAccessShortcuts from './components/QuickAccessShortcuts';
import SectionIndicator from './components/SectionIndicator';
import ContextualMicroNav from './components/ContextualMicroNav';
import NavigationDemo from './components/NavigationDemo';

const FloatingNavigationEcosystem = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuickAccess, setShowQuickAccess] = useState(false);

  const sections = [
    {
      id: 'hero',
      name: 'Navigation Hub',
      icon: 'Navigation',
      readTime: '2 min',
      scrollTo: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'features',
      name: 'Key Features',
      icon: 'Sparkles',
      readTime: '3 min',
      scrollTo: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'demo',
      name: 'Interactive Demo',
      icon: 'Play',
      readTime: '5 min',
      scrollTo: () => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'technical',
      name: 'Technical Details',
      icon: 'Code',
      readTime: '4 min',
      scrollTo: () => document.getElementById('technical')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'implementation',
      name: 'Implementation',
      icon: 'Settings',
      readTime: '6 min',
      scrollTo: () => document.getElementById('implementation')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 100;
    setIsScrolled(scrolled);
    setShowQuickAccess(window.scrollY > 500);

    // Calculate scroll progress
    const totalHeight = document.documentElement?.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(Math.min(progress, 100));

    // Determine current section
    const sectionElements = sections?.map(section => ({
      id: section?.id,
      element: document.getElementById(section?.id),
      offset: document.getElementById(section?.id)?.offsetTop || 0
    }));

    const currentSectionData = sectionElements?.find((section, index) => {
      const nextSection = sectionElements?.[index + 1];
      const scrollPosition = window.scrollY + 200;
      
      return scrollPosition >= section?.offset && 
             (!nextSection || scrollPosition < nextSection?.offset);
    });

    if (currentSectionData) {
      setCurrentSection(currentSectionData?.id);
    }
  }, [sections]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSectionClick = (sectionId) => {
    const section = sections?.find(s => s?.id === sectionId);
    if (section) {
      section?.scrollTo();
    }
  };

  const features = [
    {
      icon: 'Navigation',
      title: 'Adaptive Positioning',
      description: 'Navigation elements that respond intelligently to scroll position and content context, providing optimal user experience across all viewport sizes.'
    },
    {
      icon: 'Layers',
      title: 'Glass Morphism Design',
      description: 'Sophisticated multi-layer transparency effects with frosted glass textures and dynamic light refraction for premium visual appeal.'
    },
    {
      icon: 'Zap',
      title: 'Contextual Micro-Navigation',
      description: 'Section-specific navigation elements that emerge organically, providing relevant actions and shortcuts based on current content.'
    },
    {
      icon: 'BarChart3',
      title: 'Progress Visualization',
      description: 'User journey progress displayed through elegant glass filling animations and completion indicators with reading time estimates.'
    },
    {
      icon: 'Smartphone',
      title: 'Mobile Optimization',
      description: 'Responsive design with glass-themed hamburger menu and smooth morphing animations optimized for touch interactions.'
    },
    {
      icon: 'Accessibility',
      title: 'Accessibility First',
      description: 'Full keyboard navigation support, screen reader compatibility, and focus management ensuring inclusive user experience.'
    }
  ];

  const technicalSpecs = [
    {
      category: 'Performance',
      items: [
        'WebGL 2.0 optimization for 3D effects',
        '60fps animations on modern devices',
        'Lazy loading for navigation assets',
        'Adaptive quality based on device capabilities'
      ]
    },
    {
      category: 'Compatibility',
      items: [
        'Chrome/Safari/Firefox with WebGL support',
        'Graceful degradation for older browsers',
        'Progressive 3D enhancement',
        'Mobile-first responsive design'
      ]
    },
    {
      category: 'Accessibility',
      items: [
        'WCAG 2.1 AA compliance',
        'Keyboard navigation support',
        'Screen reader optimization',
        'High contrast mode support'
      ]
    },
    {
      category: 'Integration',
      items: [
        'React 18 + Hooks architecture',
        'GSAP Professional animations',
        'Framer Motion integration',
        'Custom CSS properties system'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>R-Tech Solutions</title>
        <meta name="description" content="Advanced glassmorphic navigation system with contextual adaptations, progress visualization, and seamless 3D interactions for premium web experiences." />
        <meta name="keywords" content="floating navigation, glassmorphism, 3D navigation, contextual navigation, progress indicators" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />
        
        {/* Floating Navigation System */}
        <FloatingNavbar isScrolled={isScrolled} currentSection={currentSection} />
        
        {/* Navigation Progress */}
        <NavigationProgress 
          currentSection={currentSection} 
          sections={sections} 
          scrollProgress={scrollProgress} 
        />
        
        {/* Section Indicators */}
        <SectionIndicator 
          sections={sections} 
          currentSection={currentSection} 
          onSectionClick={handleSectionClick} 
        />
        
        {/* Quick Access Shortcuts */}
        <QuickAccessShortcuts isVisible={showQuickAccess} />
        
        {/* Contextual Micro Navigation */}
        <ContextualMicroNav 
          currentSection={currentSection} 
          sectionData={sections} 
        />

        <main className="pt-24">
          {/* Hero Section */}
          <section id="hero" className="py-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl opacity-30"></div>
                <h1 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-r from-glass-text-primary via-primary to-accent bg-clip-text text-transparent mb-6">
                  Floating Navigation
                  <br />
                  <span className="text-4xl md:text-6xl">Ecosystem</span>
                </h1>
              </div>
              
              <p className="text-xl text-glass-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
                Experience the future of web navigation with our advanced glassmorphic system that adapts contextually to scroll position, 
                featuring depth-based information architecture and seamless 3D interactions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glass-interactive"
                >
                  Experience Demo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Code"
                  iconPosition="left"
                  className="glass-interactive border-primary/20 text-primary hover:bg-primary/10"
                >
                  View Documentation
                </Button>
              </div>

              {/* Navigation Preview */}
              <div className="glass-morphism rounded-3xl p-8 shadow-glass-interactive">
                <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
                  {/* Simulated floating navigation */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 glass-morphism rounded-2xl px-6 py-3 shadow-glass">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent"></div>
                        <span className="font-semibold text-glass-text-primary">R-Tech Solutions</span>
                      </div>
                      <div className="flex space-x-4">
                        {['Home', 'Work', 'About', 'Contact']?.map((item, index) => (
                          <div key={item} className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 ${
                            index === 1 ? 'glass-interactive text-primary' : 'text-glass-text-secondary hover:text-glass-text-primary'
                          }`}>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(8)]?.map((_, index) => (
                      <div
                        key={index}
                        className="absolute w-3 h-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full animate-glass-float"
                        style={{
                          left: `${15 + index * 10}%`,
                          top: `${20 + (index % 4) * 15}%`,
                          animationDelay: `${index * 0.3}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 px-4 bg-gradient-to-b from-transparent to-slate-50/50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-glass-text-primary to-primary bg-clip-text text-transparent mb-4">
                  Advanced Navigation Features
                </h2>
                <p className="text-lg text-glass-text-secondary max-w-2xl mx-auto">
                  Discover the sophisticated capabilities that make our navigation system the pinnacle of modern web interaction design
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features?.map((feature, index) => (
                  <div key={feature?.title} className="glass-morphism rounded-2xl p-8 shadow-glass hover:shadow-glass-interactive transition-all duration-500 hover:scale-105 group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon name={feature?.icon} size={32} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-glass-text-primary mb-4">{feature?.title}</h3>
                    <p className="text-glass-text-secondary leading-relaxed">{feature?.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive Demo Section */}
          <section id="demo" className="py-20 px-4">
            <NavigationDemo />
          </section>

          {/* Technical Specifications */}
          <section id="technical" className="py-20 px-4 bg-gradient-to-b from-slate-50/50 to-transparent">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-glass-text-primary to-primary bg-clip-text text-transparent mb-4">
                  Technical Specifications
                </h2>
                <p className="text-lg text-glass-text-secondary max-w-2xl mx-auto">
                  Built with cutting-edge technologies and optimized for performance across all modern browsers and devices
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {technicalSpecs?.map((spec) => (
                  <div key={spec?.category} className="glass-morphism rounded-2xl p-8 shadow-glass">
                    <h3 className="text-2xl font-semibold text-glass-text-primary mb-6 flex items-center">
                      <Icon name="Settings" size={24} className="text-primary mr-3" />
                      {spec?.category}
                    </h3>
                    <ul className="space-y-4">
                      {spec?.items?.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <Icon name="Check" size={14} className="text-primary" />
                          </div>
                          <span className="text-glass-text-secondary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Implementation Guide */}
          <section id="implementation" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-glass-text-primary to-primary bg-clip-text text-transparent mb-4">
                  Implementation Guide
                </h2>
                <p className="text-lg text-glass-text-secondary max-w-2xl mx-auto">
                  Learn how to integrate our floating navigation ecosystem into your projects with detailed implementation steps
                </p>
              </div>

              <div className="glass-morphism rounded-3xl p-8 shadow-glass-interactive">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold text-glass-text-primary mb-6">Quick Start Integration</h3>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-glass-text-primary mb-2">Install Dependencies</h4>
                          <p className="text-glass-text-secondary">Add required packages for glassmorphism effects and 3D animations</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-glass-text-primary mb-2">Configure Components</h4>
                          <p className="text-glass-text-secondary">Set up navigation components with your brand colors and preferences</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-glass-text-primary mb-2">Customize Interactions</h4>
                          <p className="text-glass-text-secondary">Tailor scroll behaviors and contextual navigation to your content</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex space-x-4">
                      <Button
                        variant="default"
                        iconName="Download"
                        iconPosition="left"
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                      >
                        Download Package
                      </Button>
                      <Button
                        variant="outline"
                        iconName="ExternalLink"
                        iconPosition="left"
                        className="glass-interactive border-primary/20 text-primary hover:bg-primary/10"
                      >
                        View Docs
                      </Button>
                    </div>
                  </div>

                  <div className="glass-surface rounded-2xl p-6">
                    <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm">
                      <div className="text-green-400 mb-2"># Install navigation ecosystem</div>
                      <div className="text-white mb-4">npm install @glassforge/navigation</div>
                      <div className="text-green-400 mb-2"># Import components</div>
                      <div className="text-blue-300">import</div>
                      <div className="text-white ml-2">{'{ FloatingNav, ProgressIndicator }'}</div>
                      <div className="text-blue-300 ml-2">from</div>
                      <div className="text-yellow-300 ml-2">'@glassforge/navigation'</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-glass-text-primary to-primary bg-clip-text text-transparent mb-6">
                Ready to Transform Your Navigation?
              </h2>
              <p className="text-lg text-glass-text-secondary mb-8 max-w-2xl mx-auto">
                Join leading brands who have elevated their user experience with our advanced navigation ecosystem
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Rocket"
                  iconPosition="left"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glass-interactive"
                >
                  Start Your Project
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="glass-interactive border-primary/20 text-primary hover:bg-primary/10"
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default FloatingNavigationEcosystem;