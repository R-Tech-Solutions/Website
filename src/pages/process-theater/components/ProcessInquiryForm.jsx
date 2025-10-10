import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProcessInquiryForm = ({ selectedProjectType, currentStage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: selectedProjectType || '',
    timeline: '',
    budget: '',
    currentStage: '',
    description: '',
    priority: 'medium'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypeOptions = [
    { value: 'web-app', label: 'Web Application' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'website', label: 'Corporate Website' },
    { value: 'ecommerce', label: 'E-commerce Platform' },
    { value: 'saas', label: 'SaaS Platform' },
    { value: 'portfolio', label: 'Portfolio Site' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP (Rush Project)' },
    { value: '1-3months', label: '1-3 Months' },
    { value: '3-6months', label: '3-6 Months' },
    { value: '6-12months', label: '6-12 Months' },
    { value: 'flexible', label: 'Flexible Timeline' }
  ];

  const budgetOptions = [
    { value: '10k-25k', label: '$10K - $25K' },
    { value: '25k-50k', label: '$25K - $50K' },
    { value: '50k-100k', label: '$50K - $100K' },
    { value: '100k-250k', label: '$100K - $250K' },
    { value: '250k+', label: '$250K+' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  const currentStageOptions = [
    { value: 'idea', label: 'Just an Idea' },
    { value: 'planning', label: 'Planning Phase' },
    { value: 'design', label: 'Have Designs' },
    { value: 'development', label: 'In Development' },
    { value: 'redesign', label: 'Need Redesign' },
    { value: 'maintenance', label: 'Need Maintenance' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: selectedProjectType || '',
        timeline: '',
        budget: '',
        currentStage: '',
        description: '',
        priority: 'medium'
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="glass-morphism rounded-2xl p-8 shadow-glass text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-success to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-glass-text-primary mb-2">
          Thank You!
        </h3>
        <p className="text-glass-text-secondary mb-4">
          Your project inquiry has been submitted successfully. Our team will review your requirements and get back to you within 24 hours.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-accent">
          <Icon name="Clock" size={16} />
          <span>Expected response time: 2-4 hours</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass-morphism rounded-2xl p-8 shadow-glass">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-glass-text-primary mb-2">
          Start Your Project Journey
        </h3>
        <p className="text-glass-text-secondary">
          Tell us about your project and we'll create a customized process roadmap for you
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="john@company.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            required
          />
        </div>

        <Input
          label="Company Name"
          type="text"
          placeholder="Your Company (Optional)"
          value={formData?.company}
          onChange={(e) => handleInputChange('company', e?.target?.value)}
        />

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Project Type"
            options={projectTypeOptions}
            value={formData?.projectType}
            onChange={(value) => handleInputChange('projectType', value)}
            placeholder="Select project type"
            required
          />

          <Select
            label="Desired Timeline"
            options={timelineOptions}
            value={formData?.timeline}
            onChange={(value) => handleInputChange('timeline', value)}
            placeholder="Select timeline"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Budget Range"
            options={budgetOptions}
            value={formData?.budget}
            onChange={(value) => handleInputChange('budget', value)}
            placeholder="Select budget range"
            required
          />

          <Select
            label="Current Project Stage"
            options={currentStageOptions}
            value={formData?.currentStage}
            onChange={(value) => handleInputChange('currentStage', value)}
            placeholder="Where are you now?"
            required
          />
        </div>

        <Select
          label="Priority Level"
          options={priorityOptions}
          value={formData?.priority}
          onChange={(value) => handleInputChange('priority', value)}
          description="Help us understand your project urgency"
        />

        <div>
          <label className="block text-sm font-medium text-glass-text-primary mb-2">
            Project Description
          </label>
          <textarea
            className="w-full h-32 px-4 py-3 glass-surface rounded-xl border border-[var(--color-border)]/20 text-glass-text-primary placeholder-glass-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300"
            placeholder="Tell us about your project vision, goals, and any specific requirements..."
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            required
          />
        </div>

        {/* Current Process Stage Indicator */}
        {currentStage !== undefined && (
          <div className="glass-surface rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Info" size={20} className="text-accent" />
              <div>
                <h4 className="text-sm font-medium text-glass-text-primary">
                  You're viewing: Stage {currentStage + 1}
                </h4>
                <p className="text-xs text-glass-text-secondary">
                  This inquiry will be tailored to your current process interest
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isSubmitting}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glass"
          >
            {isSubmitting ? 'Processing...' : 'Start My Project Journey'}
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="pt-4 border-t border-[var(--color-border)]/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-xs text-glass-text-secondary">Secure & Confidential</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Clock" size={16} className="text-accent" />
              <span className="text-xs text-glass-text-secondary">24hr Response</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-xs text-glass-text-secondary">Expert Consultation</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProcessInquiryForm;