import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContactForm = ({ selectedService, onSubmit, onBack, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: selectedService?.id || '',
    timeline: '',
    budget: '',
    message: '',
    preferredContact: 'email'
  });

  const [errors, setErrors] = useState({});

  const timelineOptions = [
    { value: 'urgent', label: 'Urgent (1-2 weeks)' },
    { value: 'soon', label: 'Soon (1 month)' },
    { value: 'flexible', label: 'Flexible (2-3 months)' },
    { value: 'planning', label: 'Planning phase' }
  ];

  const budgetRanges = [
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-30k', label: '$15,000 - $30,000' },
    { value: '30k-50k', label: '$30,000 - $50,000' },
    { value: '50k+', label: '$50,000+' },
    { value: 'discuss', label: 'Let\'s discuss' }
  ];

  const contactMethods = [
    { value: 'email', label: 'Email', icon: 'Mail' },
    { value: 'phone', label: 'Phone Call', icon: 'Phone' },
    { value: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' }
  ];

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) newErrors.name = 'Name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Email is invalid';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.message?.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, service: selectedService?.title });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-morphism rounded-3xl p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 glass-interactive rounded-xl flex items-center justify-center">
            <Icon name={selectedService?.icon} size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-glass-text-primary">
              {selectedService?.title}
            </h2>
            <p className="text-glass-text-secondary text-sm">Project Inquiry</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="glass-interactive"
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Full Name *"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              placeholder="John Doe"
              error={errors?.name}
              className="glass-input"
            />
          </div>
          <div>
            <Input
              label="Email Address *"
              type="email"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              placeholder="john@company.com"
              error={errors?.email}
              className="glass-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Phone Number *"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              placeholder="+1 (555) 123-4567"
              error={errors?.phone}
              className="glass-input"
            />
          </div>
          <div>
            <Input
              label="Company Name"
              value={formData?.company}
              onChange={(e) => handleInputChange('company', e?.target?.value)}
              placeholder="Your Company"
              className="glass-input"
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select
              label="Project Timeline"
              value={formData?.timeline}
              onChange={(value) => handleInputChange('timeline', value)}
              options={timelineOptions}
              placeholder="Select timeline"
              className="glass-select"
            />
          </div>
          <div>
            <Select
              label="Budget Range"
              value={formData?.budget}
              onChange={(value) => handleInputChange('budget', value)}
              options={budgetRanges}
              placeholder="Select budget range"
              className="glass-select"
            />
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-sm font-medium text-glass-text-primary mb-3">
            Preferred Contact Method
          </label>
          <div className="grid grid-cols-3 gap-3">
            {contactMethods?.map((method) => (
              <motion.button
                key={method?.value}
                type="button"
                onClick={() => handleInputChange('preferredContact', method?.value)}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 flex flex-col items-center space-y-2 ${
                  formData?.preferredContact === method?.value
                    ? 'glass-interactive text-primary border-primary/20' :'glass-surface text-glass-text-secondary hover:glass-interactive'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon name={method?.icon} size={20} />
                <span>{method?.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-glass-text-primary mb-2">
            Project Details *
          </label>
          <textarea
            value={formData?.message}
            onChange={(e) => handleInputChange('message', e?.target?.value)}
            rows={4}
            className={`w-full px-4 py-3 glass-input rounded-xl resize-none transition-all duration-300 ${
              errors?.message ? 'border-red-500' : ''
            }`}
            placeholder="Please describe your project requirements, goals, and any specific features you need..."
          />
          {errors?.message && (
            <p className="text-red-500 text-sm mt-1">{errors?.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 flex-1"
            iconName={isSubmitting ? "Loader2" : "Send"}
            iconPosition="right"
          >
            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="glass-interactive border-success/20 text-success hover:bg-success/10"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => window.open('https://wa.me/1234567890', '_blank')}
          >
            WhatsApp
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;