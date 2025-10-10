import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationDemo = () => {
  const [activeDemo, setActiveDemo] = useState('floating');
  const [isAnimating, setIsAnimating] = useState(false);

  const demoSections = [
    {
      id: 'floating',
      name: 'Floating Navigation',
      description: 'Adaptive glassmorphic navigation that responds to scroll position',
      icon: 'Navigation',
      features: ['Scroll-responsive opacity', 'Glass morphism effects', 'Contextual positioning']
    },
    {
      id: 'progress',
      name: 'Progress Indicators',
      description: 'Visual journey tracking with glass filling animations',
      icon: 'BarChart3',
      features: ['Section progress tracking', 'Reading time estimates', 'Completion indicators']
    },
    {
      id: 'micro',
      name: 'Micro Navigation',
      description: 'Context-aware navigation elements that emerge organically',
      icon: 'Zap',
      features: ['Section-specific actions', 'Adaptive button layouts', 'Smart shortcuts']
    },
    {
      id: 'accessibility',
      name: 'Accessibility Features',
      description: 'Keyboard navigation and screen reader compatibility',
      icon: 'Accessibility',
      features: ['Keyboard shortcuts', 'Screen reader support', 'Focus management']
    }
  ];

  const triggerAnimation = (demoId) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveDemo(demoId);
      setIsAnimating(false);
    }, 300);
  };

  const currentDemo = demoSections?.find(demo => demo?.id === activeDemo);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-glass-text-primary to-primary bg-clip-text text-transparent mb-4">
          Navigation System Demo
        </h2>
        <p className="text-lg text-glass-text-secondary max-w-2xl mx-auto">
          Experience our advanced glassmorphic navigation system with contextual adaptations and seamless interactions
        </p>
      </div>
      {/* Demo Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {demoSections?.map((demo) => (
          <button
            key={demo?.id}
            onClick={() => triggerAnimation(demo?.id)}
            className={`p-6 rounded-2xl transition-all duration-500 text-left ${
              activeDemo === demo?.id
                ? 'glass-interactive scale-105 shadow-glass-interactive'
                : 'glass-surface hover:glass-morphism hover:scale-102'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-all duration-300 ${
              activeDemo === demo?.id
                ? 'bg-gradient-to-br from-primary to-accent' :'bg-glass-surface'
            }`}>
              <Icon 
                name={demo?.icon} 
                size={24} 
                className={activeDemo === demo?.id ? 'text-white' : 'text-glass-text-secondary'}
              />
            </div>
            <h3 className="text-lg font-semibold text-glass-text-primary mb-2">{demo?.name}</h3>
            <p className="text-sm text-glass-text-secondary">{demo?.description}</p>
          </button>
        ))}
      </div>
      {/* Demo Showcase */}
      <div className={`glass-morphism rounded-3xl p-8 shadow-glass transition-all duration-500 ${
        isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Demo Content */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Icon name={currentDemo?.icon} size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-glass-text-primary">{currentDemo?.name}</h3>
                <p className="text-glass-text-secondary">{currentDemo?.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-glass-text-primary">Key Features:</h4>
              <ul className="space-y-3">
                {currentDemo?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="Check" size={14} className="text-primary" />
                    </div>
                    <span className="text-glass-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex space-x-4">
              <Button
                variant="default"
                iconName="Play"
                iconPosition="left"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                Try Demo
              </Button>
              <Button
                variant="outline"
                iconName="Code"
                iconPosition="left"
                className="glass-interactive border-primary/20 text-primary hover:bg-primary/10"
              >
                View Code
              </Button>
            </div>
          </div>

          {/* Visual Demo */}
          <div className="relative">
            <div className="glass-surface rounded-2xl p-6 h-80 overflow-hidden">
              <div className="relative h-full">
                {/* Simulated navigation elements */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <div className="glass-morphism rounded-2xl px-6 py-3 flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent"></div>
                    <div className="flex space-x-2">
                      {['Home', 'About', 'Work', 'Contact']?.map((item, index) => (
                        <div key={item} className={`px-3 py-1 rounded-lg text-sm ${
                          index === 1 ? 'glass-interactive text-primary' : 'text-glass-text-secondary'
                        }`}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress indicators */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 space-y-3">
                  {[0, 1, 2, 3]?.map((index) => (
                    <div key={index} className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index <= 1 ? 'bg-gradient-to-r from-primary to-accent scale-125' : 'bg-glass-text-secondary/30'
                    }`} />
                  ))}
                </div>

                {/* Floating actions */}
                <div className="absolute bottom-4 right-4">
                  <div className="glass-morphism rounded-xl p-3 flex space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon name="MessageCircle" size={16} className="text-primary" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Icon name="Share" size={16} className="text-accent" />
                    </div>
                  </div>
                </div>

                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)]?.map((_, index) => (
                    <div
                      key={index}
                      className="absolute w-2 h-2 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full animate-glass-float"
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + (index % 3) * 20}%`,
                        animationDelay: `${index * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationDemo;