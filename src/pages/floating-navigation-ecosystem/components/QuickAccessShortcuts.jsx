import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickAccessShortcuts = ({ isVisible }) => {
  const shortcuts = [
    {
      id: 'portfolio',
      name: 'View Work',
      description: 'Explore our projects',
      icon: 'Eye',
      path: '/portfolio',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'contact',
      name: 'Start Project',
      description: 'Begin collaboration',
      icon: 'MessageCircle',
      path: '/R-Tech_Solutions',
      color: 'from-primary to-accent'
    },
    {
      id: 'services',
      name: 'Our Services',
      description: 'What we offer',
      icon: 'Sparkles',
      path: '/services',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div 
      className={`fixed bottom-6 right-6 z-40 transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 visible translate-y-0' :'opacity-0 invisible translate-y-4'
      }`}
    >
      <div className="glass-morphism rounded-2xl p-4 shadow-glass-interactive">
        <div className="flex flex-col space-y-3">
          <div className="text-center mb-2">
            <h3 className="text-sm font-semibold text-glass-text-primary">Quick Access</h3>
            <p className="text-xs text-glass-text-secondary">Jump to key sections</p>
          </div>
          
          {shortcuts?.map((shortcut) => (
            <Link
              key={shortcut?.id}
              to={shortcut?.path}
              className="group relative overflow-hidden rounded-xl p-3 glass-surface hover:glass-interactive transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${shortcut?.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={shortcut?.icon} size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-glass-text-primary group-hover:text-primary transition-colors duration-200">
                    {shortcut?.name}
                  </p>
                  <p className="text-xs text-glass-text-secondary">
                    {shortcut?.description}
                  </p>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-glass-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-200"
                />
              </div>
              
              {/* Hover effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${shortcut?.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </Link>
          ))}
          
          {/* Collapse button */}
          <button className="mt-2 p-2 rounded-lg glass-surface hover:glass-interactive transition-all duration-300 flex items-center justify-center">
            <Icon name="ChevronDown" size={16} className="text-glass-text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessShortcuts;