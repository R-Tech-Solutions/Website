import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContextualMicroNav = ({ currentSection, sectionData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSectionActions = (section) => {
    switch (section) {
      case 'portfolio':
        return [
          { name: 'Filter Projects', icon: 'Filter', action: () => console.log('Filter') },
          { name: 'View Details', icon: 'Eye', action: () => console.log('Details') },
          { name: 'Download Case Study', icon: 'Download', action: () => console.log('Download') }
        ];
      case 'services':
        return [
          { name: 'Get Quote', icon: 'Calculator', action: () => console.log('Quote') },
          { name: 'Schedule Call', icon: 'Calendar', action: () => console.log('Schedule') },
          { name: 'View Pricing', icon: 'DollarSign', action: () => console.log('Pricing') }
        ];
      case 'team':
        return [
          { name: 'Meet Team', icon: 'Users', action: () => console.log('Meet') },
          { name: 'View Profiles', icon: 'User', action: () => console.log('Profiles') },
          { name: 'Contact Member', icon: 'Mail', action: () => console.log('Contact') }
        ];
      case 'process':
        return [
          { name: 'Start Process', icon: 'Play', action: () => console.log('Start') },
          { name: 'View Timeline', icon: 'Clock', action: () => console.log('Timeline') },
          { name: 'Get Estimate', icon: 'Calculator', action: () => console.log('Estimate') }
        ];
      default:
        return [
          { name: 'Learn More', icon: 'Info', action: () => console.log('Learn') },
          { name: 'Get Started', icon: 'ArrowRight', action: () => console.log('Start') }
        ];
    }
  };

  const actions = getSectionActions(currentSection);
  const sectionInfo = sectionData?.find(s => s?.id === currentSection);

  if (!sectionInfo || !actions?.length) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className={`glass-morphism rounded-2xl shadow-glass-interactive transition-all duration-500 ${
        isExpanded ? 'px-6 py-4' : 'px-4 py-3'
      }`}>
        <div className="flex items-center space-x-4">
          {/* Section info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Icon name={sectionInfo?.icon} size={18} className="text-primary" />
            </div>
            <div className="hidden sm:block">
              <h3 className="text-sm font-semibold text-glass-text-primary">{sectionInfo?.name}</h3>
              <p className="text-xs text-glass-text-secondary">{sectionInfo?.readTime} read</p>
            </div>
          </div>

          {/* Actions */}
          <div className={`flex items-center transition-all duration-500 ${
            isExpanded ? 'space-x-2 opacity-100' : 'space-x-1 opacity-80'
          }`}>
            {actions?.slice(0, isExpanded ? actions?.length : 2)?.map((action, index) => (
              <Button
                key={action?.name}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                onClick={action?.action}
                iconName={action?.icon}
                iconPosition="left"
                className={`transition-all duration-300 ${
                  index === 0 
                    ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90' :'glass-interactive border-primary/20 text-primary hover:bg-primary/10'
                }`}
              >
                {isExpanded ? action?.name : ''}
              </Button>
            ))}
            
            {actions?.length > 2 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-lg glass-surface hover:glass-interactive transition-all duration-300"
              >
                <Icon 
                  name={isExpanded ? "ChevronUp" : "MoreHorizontal"} 
                  size={16} 
                  className="text-glass-text-secondary"
                />
              </button>
            )}
          </div>
        </div>

        {/* Expanded actions */}
        {isExpanded && actions?.length > 2 && (
          <div className="mt-4 pt-4 border-t border-border/20">
            <div className="flex flex-wrap gap-2">
              {actions?.slice(2)?.map((action) => (
                <Button
                  key={action?.name}
                  variant="ghost"
                  size="sm"
                  onClick={action?.action}
                  iconName={action?.icon}
                  iconPosition="left"
                  className="text-glass-text-secondary hover:text-glass-text-primary hover:bg-glass-surface/50"
                >
                  {action?.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContextualMicroNav;