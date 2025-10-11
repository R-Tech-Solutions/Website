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
    preferredContact: 'email',
    // Service-specific fields
    appPlatform: '',
    webPlatform: '',
    posType: '',
    posCategory: '',
    cctvLocation: '',
    cctvQuantity: '',
    networkingLocation: ''
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

  const appPlatformOptions = [
    { value: 'ios', label: 'iOS' },
    { value: 'android', label: 'Android' },
    { value: 'both', label: 'Both/Cross-Platform' }
  ];

  const webPlatformOptions = [
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'office', label: 'Office' },
    { value: 'custom', label: 'Custom' }
  ];

  const posTypeOptions = [
    { value: 'online', label: 'Online' },
    { value: 'system', label: 'System' }
  ];

  const posCategoryOptions = [
    { value: 'grocery', label: 'Grocery' },
    { value: 'supermarket', label: 'Supermarket' },
    { value: 'restaurant', label: 'Restaurant' }
  ];

  const locationOptions = [
    { value: 'indoor', label: 'Indoor' },
    { value: 'outdoor', label: 'Outdoor' }
  ];

  const cctvQuantityOptions = [
    { value: '1-5', label: '1-5 cameras' },
    { value: '6-10', label: '6-10 cameras' },
    { value: '11-20', label: '11-20 cameras' },
    { value: '21-50', label: '21-50 cameras' },
    { value: '50+', label: '50+ cameras' }
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

    // Service-specific validation
    if (selectedService?.id === 'app' && !formData?.appPlatform) {
      newErrors.appPlatform = 'Please select a platform';
    }
    if (selectedService?.id === 'web' && !formData?.webPlatform) {
      newErrors.webPlatform = 'Please select a platform';
    }
    if (selectedService?.id === 'pos') {
      if (!formData?.posType) newErrors.posType = 'Please select system type';
      if (!formData?.posCategory) newErrors.posCategory = 'Please select business category';
    }
    if (selectedService?.id === 'cctv') {
      if (!formData?.cctvLocation) newErrors.cctvLocation = 'Please select location';
      if (!formData?.cctvQuantity) newErrors.cctvQuantity = 'Please select quantity';
    }
    if (selectedService?.id === 'networking' && !formData?.networkingLocation) {
      newErrors.networkingLocation = 'Please select location';
    }

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
          {selectedService?.id !== 'cctv' && selectedService?.id !== 'networking' && (
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
          )}
          <div className={selectedService?.id === 'cctv' || selectedService?.id === 'networking' ? 'md:col-span-2' : ''}>
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

        {/* Service-Specific Fields */}
        {/* Mobile App Platform */}
        {selectedService?.id === 'app' && (
          <div>
            <label className="block text-sm font-medium text-glass-text-primary mb-3">
              Platform *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {appPlatformOptions?.map((platform) => (
                <motion.button
                  key={platform?.value}
                  type="button"
                  onClick={() => handleInputChange('appPlatform', platform?.value)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    formData?.appPlatform === platform?.value
                      ? 'glass-interactive text-primary border-primary/20'
                      : 'glass-surface text-glass-text-secondary hover:glass-interactive'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {platform?.label}
                </motion.button>
              ))}
            </div>
            {errors?.appPlatform && (
              <p className="text-red-500 text-sm mt-2">{errors?.appPlatform}</p>
            )}
          </div>
        )}

        {/* Web Development Platform */}
        {selectedService?.id === 'web' && (
          <div>
            <label className="block text-sm font-medium text-glass-text-primary mb-3">
              Platform *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {webPlatformOptions?.map((platform) => (
                <motion.button
                  key={platform?.value}
                  type="button"
                  onClick={() => handleInputChange('webPlatform', platform?.value)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    formData?.webPlatform === platform?.value
                      ? 'glass-interactive text-primary border-primary/20'
                      : 'glass-surface text-glass-text-secondary hover:glass-interactive'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {platform?.label}
                </motion.button>
              ))}
            </div>
            {errors?.webPlatform && (
              <p className="text-red-500 text-sm mt-2">{errors?.webPlatform}</p>
            )}
          </div>
        )}

        {/* POS System Type and Category */}
        {selectedService?.id === 'pos' && (
          <>
            <div>
              <label className="block text-sm font-medium text-glass-text-primary mb-3">
                System Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {posTypeOptions?.map((type) => (
                  <motion.button
                    key={type?.value}
                    type="button"
                    onClick={() => handleInputChange('posType', type?.value)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      formData?.posType === type?.value
                        ? 'glass-interactive text-primary border-primary/20'
                        : 'glass-surface text-glass-text-secondary hover:glass-interactive'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {type?.label}
                  </motion.button>
                ))}
              </div>
              {errors?.posType && (
                <p className="text-red-500 text-sm mt-2">{errors?.posType}</p>
              )}
            </div>
            
            {formData?.posType && (
              <div>
                <label className="block text-sm font-medium text-glass-text-primary mb-3">
                  Business Category *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {posCategoryOptions?.map((category) => (
                    <motion.button
                      key={category?.value}
                      type="button"
                      onClick={() => handleInputChange('posCategory', category?.value)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        formData?.posCategory === category?.value
                          ? 'glass-interactive text-primary border-primary/20'
                          : 'glass-surface text-glass-text-secondary hover:glass-interactive'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {category?.label}
                    </motion.button>
                  ))}
                </div>
                {errors?.posCategory && (
                  <p className="text-red-500 text-sm mt-2">{errors?.posCategory}</p>
                )}
              </div>
            )}
          </>
        )}

        {/* CCTV Location and Quantity */}
        {selectedService?.id === 'cctv' && (
          <>
            <div>
              <label className="block text-sm font-medium text-glass-text-primary mb-3">
                Location *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {locationOptions?.map((location) => (
                  <motion.button
                    key={location?.value}
                    type="button"
                    onClick={() => handleInputChange('cctvLocation', location?.value)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      formData?.cctvLocation === location?.value
                        ? 'glass-interactive text-primary border-primary/20'
                        : 'glass-surface text-glass-text-secondary hover:glass-interactive'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {location?.label}
                  </motion.button>
                ))}
              </div>
              {errors?.cctvLocation && (
                <p className="text-red-500 text-sm mt-2">{errors?.cctvLocation}</p>
              )}
            </div>

            {formData?.cctvLocation && (
              <div>
                <Select
                  label="Number of Cameras *"
                  value={formData?.cctvQuantity}
                  onChange={(value) => handleInputChange('cctvQuantity', value)}
                  options={cctvQuantityOptions}
                  placeholder="Select quantity range"
                  className="glass-select"
                />
                {errors?.cctvQuantity && (
                  <p className="text-red-500 text-sm mt-2">{errors?.cctvQuantity}</p>
                )}
              </div>
            )}
          </>
        )}

        {/* Networking Location */}
        {selectedService?.id === 'networking' && (
          <div>
            <label className="block text-sm font-medium text-glass-text-primary mb-3">
              Location *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {locationOptions?.map((location) => (
                <motion.button
                  key={location?.value}
                  type="button"
                  onClick={() => handleInputChange('networkingLocation', location?.value)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    formData?.networkingLocation === location?.value
                      ? 'glass-interactive text-primary border-primary/20'
                      : 'glass-surface text-glass-text-secondary hover:glass-interactive'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {location?.label}
                </motion.button>
              ))}
            </div>
            {errors?.networkingLocation && (
              <p className="text-red-500 text-sm mt-2">{errors?.networkingLocation}</p>
            )}
          </div>
        )}

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