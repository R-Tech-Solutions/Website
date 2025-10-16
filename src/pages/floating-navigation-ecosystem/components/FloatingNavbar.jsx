import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingNavbar = ({ isScrolled, currentSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Opening', path: '/R-Tech_Solutions', icon: 'Play', section: 'hero' },
    { name: 'Portfolio', path: '/portfolio', icon: 'Layers', section: 'portfolio' },
    { name: 'Services', path: '/services', icon: 'Sparkles', section: 'services' },
    { name: 'Process', path: '/process', icon: 'Workflow', section: 'process' },
    { name: 'Team', path: '/team', icon: 'Users', section: 'team' },
    // { name: 'Navigation', path: '/floating-navigation-ecosystem', icon: 'Navigation', section: 'navigation' },
  ];

  const isActivePath = (path) => location?.pathname === path;
  const isActiveSection = (section) => currentSection === section;

  const Logo = () => (
    <Link to="/R-Tech_Solutions" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-10 h-10 glass-morphism rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg animate-glass-float"></div>
        </div>
        <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold bg-gradient-to-r from-glass-text-primary to-primary bg-clip-text text-transparent">
          GlassForge
        </h1>
        <p className="text-xs text-glass-text-secondary font-mono">Studio</p>
      </div>
    </Link>
  );

  return (
    <>
      {/* Main Floating Navigation */}
      <nav 
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
          isScrolled 
            ? 'glass-morphism backdrop-blur-glass shadow-glass scale-100 opacity-100' 
            : 'bg-transparent scale-95 opacity-90'
        }`}
        style={{
          borderRadius: '24px',
          padding: '12px 24px',
          minWidth: '320px'
        }}
      >
        <div className="flex items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems?.slice(0, 4)?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  isActivePath(item?.path) || isActiveSection(item?.section)
                    ? 'glass-interactive text-primary shadow-glass-subtle scale-105'
                    : 'text-glass-text-secondary hover:text-glass-text-primary hover:glass-surface'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-lg text-sm font-medium text-glass-text-secondary hover:text-glass-text-primary hover:glass-surface transition-all duration-300 flex items-center space-x-2">
                <Icon name="MoreHorizontal" size={16} />
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 glass-morphism rounded-xl shadow-glass-interactive opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  {navigationItems?.slice(4)?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                        isActivePath(item?.path)
                          ? 'text-primary bg-primary/10' :'text-glass-text-secondary hover:text-glass-text-primary hover:bg-glass-surface/50'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              variant="default" 
              size="sm"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glass-subtle"
            >
              Start Project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg glass-surface hover:glass-interactive transition-all duration-300"
          >
            <Icon 
              name={isMobileMenuOpen ? "X" : "Menu"} 
              size={20} 
              className="text-glass-text-primary"
            />
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div 
        className={`fixed top-24 left-1/2 -translate-x-1/2 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'opacity-100 visible scale-100' :'opacity-0 invisible scale-95'
        }`}
        style={{ width: 'calc(100vw - 48px)', maxWidth: '400px' }}
      >
        <div className="glass-morphism rounded-2xl shadow-glass-interactive overflow-hidden">
          <nav className="py-4">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-6 py-3 text-sm transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10 border-r-2 border-primary' :'text-glass-text-secondary hover:text-glass-text-primary hover:bg-glass-surface/50'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            <div className="px-6 py-4 border-t border-border/20 mt-4">
              <Button 
                variant="default" 
                size="sm"
                fullWidth
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                Start Project
              </Button>
            </div>
          </nav>
        </div>
      </div>
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default FloatingNavbar;