import React from 'react';
import Icon from '../../../components/AppIcon';

const SectionIndicator = ({ sections, currentSection, onSectionClick }) => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <div className="glass-morphism rounded-2xl p-3 shadow-glass">
        <div className="space-y-3">
          {sections?.map((section, index) => {
            const isActive = currentSection === section?.id;
            const isPassed = sections?.findIndex(s => s?.id === currentSection) > index;
            
            return (
              <div key={section?.id} className="relative group">
                <button
                  onClick={() => onSectionClick(section?.id)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary to-accent scale-150 shadow-lg shadow-primary/30' 
                      : isPassed
                      ? 'bg-primary/60 scale-110' :'bg-glass-text-secondary/30 hover:bg-glass-text-secondary/60 hover:scale-125'
                  }`}
                />
                {/* Section name tooltip */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none">
                  <div className="glass-morphism rounded-lg px-3 py-2 shadow-glass-subtle whitespace-nowrap">
                    <p className="text-sm font-medium text-glass-text-primary">{section?.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon name="Clock" size={12} className="text-glass-text-secondary" />
                      <p className="text-xs text-glass-text-secondary">{section?.readTime}</p>
                    </div>
                  </div>
                </div>
                {/* Connection line */}
                {index < sections?.length - 1 && (
                  <div className={`absolute top-6 left-1/2 -translate-x-1/2 w-px h-6 transition-colors duration-500 ${
                    isPassed ? 'bg-primary/40' : 'bg-glass-text-secondary/20'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Progress percentage */}
        <div className="mt-4 pt-3 border-t border-border/20 text-center">
          <p className="text-xs font-mono text-glass-text-secondary">
            {Math.round(((sections?.findIndex(s => s?.id === currentSection) + 1) / sections?.length) * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionIndicator;