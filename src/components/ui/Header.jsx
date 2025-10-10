import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Portfolio', path: '/portfolio-showcase', icon: 'Layers' },
    { name: 'Services', path: '/services-revelation', icon: 'Sparkles' },
    { name: 'Process', path: '/process-theater', icon: 'Workflow' },
    { name: 'Team', path: '/team-dimension', icon: 'Users' },
  ];

  const moreItems = [
    { name: 'Navigation', path: '/floating-navigation-ecosystem', icon: 'Navigation' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const Logo = () => (
    <Link to="/3d-opening-sequence" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-10 h-10 glass-morphism rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg animate-glass-float"></div>
        </div>
        <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold bg-gradient-to-r from-glass-text-primary to-primary bg-clip-text text-transparent">
          R-tech Solution
        </h1>
        <p className="text-xs text-glass-text-secondary font-mono">Pvt Ltd</p>
      </div>
    </Link>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
        isScrolled 
          ? 'glass-morphism backdrop-blur-glass shadow-glass' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  isActivePath(item?.path)
                    ? 'glass-interactive text-primary shadow-glass-subtle'
                    : 'text-glass-text-secondary hover:text-glass-text-primary hover:glass-surface'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* More Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-glass-text-secondary hover:text-glass-text-primary hover:glass-surface transition-all duration-300 flex items-center space-x-2">
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 glass-morphism rounded-xl shadow-glass-interactive opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  {moreItems?.map((item) => (
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
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              className="glass-interactive border-primary/20 text-primary hover:bg-primary/10"
            >
              Explore Craft
            </Button>
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
      </div>
      {/* Mobile Menu */}
      <div 
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' :'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-morphism mx-4 mb-4 rounded-xl shadow-glass">
          <nav className="py-4">
            {[...navigationItems, ...moreItems]?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-6 py-3 text-sm transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10 border-r-2 border-primary' :'text-glass-text-secondary hover:text-glass-text-primary hover:bg-glass-surface/50'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            <div className="px-6 py-4 border-t border-border/20 mt-4">
              <div className="flex flex-col space-y-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  fullWidth
                  className="glass-interactive border-primary/20 text-primary hover:bg-primary/10"
                >
                  Explore Craft
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  fullWidth
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  Start Project
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;