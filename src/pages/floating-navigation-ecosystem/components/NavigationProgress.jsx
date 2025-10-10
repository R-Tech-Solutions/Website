import React from 'react';
import Icon from '../../../components/AppIcon';

const NavigationProgress = ({ currentSection, sections, scrollProgress }) => {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="glass-morphism rounded-2xl p-4 shadow-glass">
        <div className="space-y-4">
          {sections?.map((section, index) => {
            const isActive = currentSection === section?.id;
            const isCompleted = sections?.findIndex(s => s?.id === currentSection) > index;
            
            return (
              <div key={section?.id} className="relative group">
                <button
                  onClick={() => section?.scrollTo()}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    isActive 
                      ? 'glass-interactive scale-110 shadow-glass-interactive' 
                      : isCompleted
                      ? 'bg-primary/20 text-primary' :'hover:glass-surface text-glass-text-secondary hover:text-glass-text-primary'
                  }`}
                >
                  <Icon 
                    name={isCompleted ? "Check" : section?.icon} 
                    size={18}
                    className={isActive ? 'text-primary' : ''}
                  />
                </button>
                {/* Progress indicator */}
                {isActive && (
                  <div className="absolute -right-2 top-0 w-1 h-12 bg-gradient-to-b from-primary/20 to-primary rounded-full overflow-hidden">
                    <div 
                      className="w-full bg-gradient-to-b from-primary to-accent transition-all duration-300"
                      style={{ height: `${scrollProgress}%` }}
                    />
                  </div>
                )}
                {/* Tooltip */}
                <div className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none">
                  <div className="glass-morphism rounded-lg px-3 py-2 shadow-glass-subtle whitespace-nowrap">
                    <p className="text-sm font-medium text-glass-text-primary">{section?.name}</p>
                    <p className="text-xs text-glass-text-secondary">{section?.readTime}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Overall progress */}
        <div className="mt-6 pt-4 border-t border-border/20">
          <div className="w-8 h-1 bg-glass-surface rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${(sections?.findIndex(s => s?.id === currentSection) + 1) / sections?.length * 100}%` }}
            />
          </div>
          <p className="text-xs text-glass-text-secondary text-center mt-2">
            {sections?.findIndex(s => s?.id === currentSection) + 1} / {sections?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavigationProgress;