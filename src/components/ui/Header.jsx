import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (drawerRef.current) drawerRef.current.focus();
      }, 0);
      window.addEventListener('keydown', onKeyDown);

      return () => {
        document.body.style.overflow = previousOverflow || '';
        window.removeEventListener('keydown', onKeyDown);
      };
    }

    return () => {};
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { name: 'Home', path: '/home', icon: 'Home' },
    { name: 'Portfolio', path: '/portfolio', icon: 'Folder' },
    { name: 'Pricing', path: '/pricing', icon: 'CreditCard' },
    { name: 'Services', path: '/services', icon: 'Tool' },
    { name: 'Process', path: '/process', icon: 'Workflow' },
    { name: 'Team', path: '/team', icon: 'Users' },
    { name: 'Careers', path: '/careers', icon: 'Briefcase' },
    { name: 'Blogs', path: '/blogs', icon: 'FileText' },
  ];

  const isActivePath = (path) => {
    if (!location?.pathname) return false;
    if (path === '/blogs') return location.pathname === '/blogs' || location.pathname.startsWith('/blogs/');
    return location.pathname === path;
  };

  const Logo = () => (
    <Link to="/R-Tech" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <img src="/new brand.png" alt="Logo" className="w-12 h-12 object-contain rounded-lg " />
        </div>
        <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
      </div>
      <div className="hidden sm:flex flex-col min-w-0 ml-2">
        <h1 className="text-xl font-bold bg-gradient-to-r from-glass-text-primary to-primary bg-clip-text text-transparent truncate whitespace-nowrap overflow-hidden">R-tech Solution</h1>
        <p className="text-xs text-glass-text-secondary font-mono truncate">Pvt Ltd</p>
      </div>
    </Link>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${isScrolled ? 'bg-white shadow-glass' : 'bg-white/95'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            <nav className="hidden lg:flex items-center space-x-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 px-3 py-1 rounded-full ${
                    isActivePath(item?.path)
                      ? 'bg-primary/10 text-primary shadow-sm'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span className="whitespace-nowrap">{item?.name}</span>
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="default" size="sm" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glass-subtle">
                Start Project
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-controls="mobile-drawer"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2 rounded-lg bg-white/90 hover:bg-white transition-all duration-300 shadow-sm"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} className="text-glass-text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (right-to-left) - outside header so it's not clipped by header transforms */}
      <div className="lg:hidden" aria-hidden={!isMobileMenuOpen}>
        <div
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-50 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <aside
          id="mobile-drawer"
          ref={drawerRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          className={`fixed top-0 right-0 h-screen w-80 max-w-[90%] z-50 transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col bg-white shadow-sm">
            <div className="p-3 flex items-center justify-between">
              <Logo />
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu" className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                <Icon name="X" size={20} />
              </button>
            </div>

            <nav className="flex-1 px-4 py-3 overflow-y-auto min-h-0">
              <div className="flex flex-col space-y-1 mt-2">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center w-full gap-3 px-4 py-2 text-sm rounded-lg transition-colors duration-150 ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span className="whitespace-nowrap">{item?.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 border-t border-border/20 pt-4">
                <div className="flex flex-col space-y-3 px-2">
                  <Button variant="outline" size="sm" fullWidth className="glass-interactive border-primary/20 text-primary hover:bg-primary/10" onClick={() => setIsMobileMenuOpen(false)}>
                    Explore Craft
                  </Button>
                  <Button variant="default" size="sm" fullWidth className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90" onClick={() => setIsMobileMenuOpen(false)}>
                    Start Project
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Header;