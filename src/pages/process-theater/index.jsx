import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SEO from '../../components/SEO';
import { generatePageSEO } from '../../utils/seoUtils';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProcessStage from './components/ProcessStage';
import ProcessTimeline from './components/ProcessTimeline';
import ProjectTypeSelector from './components/ProjectTypeSelector';
import ProcessInquiryForm from './components/ProcessInquiryForm';
import ProcessVisualization from './components/ProcessVisualization';

const ProcessTheater = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [selectedProjectType, setSelectedProjectType] = useState('web-app');
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [backgroundParticles, setBackgroundParticles] = useState([]);

  useEffect(() => {
    // Generate background particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 20 + 10
    }));
    setBackgroundParticles(particles);
  }, []);

  const processStages = [
    {
      title: "Discovery & Research",
      icon: "Search",
      duration: "2-3 weeks",
      description: "We dive deep into understanding your business goals, target audience, and technical requirements. This phase includes stakeholder interviews, market research, and competitive analysis to ensure we build the right solution.",
      deliverables: ["Project Brief", "User Personas", "Technical Specs", "Timeline"],
      clientTouchpoints: "Daily check-ins, stakeholder interviews, requirement workshops"
    },
    {
      title: "Strategy & Planning",
      icon: "Target",
      duration: "1-2 weeks",
      description: "Based on our research, we create a comprehensive strategy that outlines the project architecture, technology stack, and implementation roadmap. This ensures alignment before development begins.",
      deliverables: ["Architecture Plan", "Technology Stack", "Project Roadmap", "Risk Assessment"],
      clientTouchpoints: "Strategy presentation, feedback sessions, plan approval"
    },
    {
      title: "Design & Prototyping",
      icon: "Palette",
      duration: "3-4 weeks",
      description: "Our design team creates intuitive user experiences and stunning visual interfaces. We build interactive prototypes to validate concepts before development, ensuring the final product exceeds expectations.",
      deliverables: ["Wireframes", "UI Designs", "Interactive Prototype", "Design System"],
      clientTouchpoints: "Design reviews, prototype testing, iterative feedback"
    },
    {
      title: "Development & Integration",
      icon: "Code",
      duration: "6-8 weeks",
      description: "Our development team brings designs to life using cutting-edge technologies. We follow agile methodologies with regular sprints, ensuring transparency and flexibility throughout the build process.",
      deliverables: ["Core Features", "API Integration", "Database Setup", "Admin Panel"],
      clientTouchpoints: "Sprint reviews, demo sessions, progress updates"
    },
    {
      title: "Testing & Quality Assurance",
      icon: "CheckCircle",
      duration: "2-3 weeks",
      description: "Comprehensive testing ensures your application is bug-free, secure, and performs optimally. We conduct user acceptance testing, security audits, and performance optimization.",
      deliverables: ["Test Reports", "Bug Fixes", "Performance Optimization", "Security Audit"],
      clientTouchpoints: "UAT sessions, bug review meetings, performance reports"
    },
    {
      title: "Launch & Deployment",
      icon: "Rocket",
      duration: "1-2 weeks",
      description: "We handle the complete deployment process, from server setup to go-live. Post-launch support ensures smooth operations and immediate issue resolution during the critical launch period.",
      deliverables: ["Live Application", "Deployment Guide", "Training Materials", "Support Plan"],
      clientTouchpoints: "Launch coordination, training sessions, post-launch support"
    }
  ];

  const handleStageClick = (stageIndex) => {
    setActiveStage(stageIndex);
  };

  const handleTimelineClick = (stageIndex) => {
    setActiveStage(stageIndex);
  };

  const handleProjectTypeSelect = (projectType) => {
    setSelectedProjectType(projectType);
  };

  const handleInquiryToggle = () => {
    setShowInquiryForm(!showInquiryForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background relative overflow-hidden">
      <SEO {...generatePageSEO('process')} />
      <Helmet>
        <title>R-Tech Solutions</title>
        <meta name="description" content="Experience our transparent development process through interactive glass pipeline animations. See how we transform ideas into exceptional digital experiences." />
        <meta name="keywords" content="development process, project methodology, glass morphism, interactive visualization, web development workflow" />
      </Helmet>
      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {backgroundParticles?.map((particle) => (
          <motion.div
            key={particle?.id}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${particle?.x}%`,
              top: `${particle?.y}%`,
              width: `${particle?.size}px`,
              height: `${particle?.size}px`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: particle?.speed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 glass-morphism rounded-full px-4 py-2 mb-6">
              <Icon name="Workflow" size={16} className="text-accent" />
              <span className="text-sm font-medium text-glass-text-secondary">
                Process Visualization Engine
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-glass-text-primary mb-6">
              Transparent
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}Methodology
              </span>
            </h1>
            
            <p className="text-xl text-glass-text-secondary max-w-3xl mx-auto leading-relaxed">
              Experience our development process through interactive glass pipeline animations. 
              See how complexity becomes beautiful simplicity in our proven methodology.
            </p>
          </motion.div>

          {/* Project Type Selection */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ProjectTypeSelector
              selectedType={selectedProjectType}
              onTypeSelect={handleProjectTypeSelect}
            />
          </motion.div>

          {/* Process Visualization */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ProcessVisualization
              activeStage={activeStage}
              projectType={selectedProjectType}
              onNodeClick={handleTimelineClick}
            />
          </motion.div>

          {/* Timeline Overview */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ProcessTimeline
              activeStage={activeStage}
              totalStages={processStages?.length}
              onTimelineClick={handleTimelineClick}
            />
          </motion.div>
        </div>
      </section>
      {/* Process Stages Detail */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-glass-text-primary mb-4">
              Detailed Process Breakdown
            </h2>
            <p className="text-lg text-glass-text-secondary max-w-2xl mx-auto">
              Click on any stage to explore the detailed workflow, deliverables, and client touchpoints
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processStages?.map((stage, index) => (
              <ProcessStage
                key={index}
                stage={stage}
                index={index}
                isActive={index === activeStage}
                onStageClick={handleStageClick}
                totalStages={processStages?.length}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Process Insights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-glass-text-primary mb-6">
                Why Our Process Works
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Eye" size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-glass-text-primary mb-2">
                      Complete Transparency
                    </h3>
                    <p className="text-glass-text-secondary">
                      Every step is visible and documented. You know exactly what's happening, when, and why.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Users" size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-glass-text-primary mb-2">
                      Collaborative Approach
                    </h3>
                    <p className="text-glass-text-secondary">
                      Your team is involved at every stage, ensuring the final product aligns perfectly with your vision.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-success to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Zap" size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-glass-text-primary mb-2">
                      Agile & Adaptive
                    </h3>
                    <p className="text-glass-text-secondary">
                      We adapt to changes quickly while maintaining quality and timeline commitments.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-morphism rounded-2xl p-8 shadow-glass"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-glass-text-primary mb-6">
                Process Statistics
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-glass-text-secondary">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">95%</div>
                  <div className="text-sm text-glass-text-secondary">On-Time Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">150+</div>
                  <div className="text-sm text-glass-text-secondary">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning mb-2">24h</div>
                  <div className="text-sm text-glass-text-secondary">Response Time</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-glass-text-primary mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-glass-text-secondary mb-8">
              Let's discuss your project and create a customized process roadmap tailored to your needs
            </p>
          </motion.div>

          {/* Inquiry Form */}
          {showInquiryForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProcessInquiryForm
                selectedProjectType={selectedProjectType}
                currentStage={activeStage}
              />
            </motion.div>
          )}
        </div>
      </section>
      {/* Footer */}
    </div>
  );
};

export default ProcessTheater;