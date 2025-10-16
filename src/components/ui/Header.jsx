import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef(null);
  const [whyDropdownOpen, setWhyDropdownOpen] = useState(false);
  const [mobileWhyOpen, setMobileWhyOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

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
      if (e.key === 'Escape' && whyDropdownOpen) {
        setWhyDropdownOpen(false);
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

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileMenuOpen, whyDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setWhyDropdownOpen(false);
      }
    };

    if (whyDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [whyDropdownOpen]);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setWhyDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setWhyDropdownOpen(false);
    }, 200);
  };

  // Navigation order: Home, Portfolio, Why choose us (dropdown), Blogs, Contact Us
  const navigationItems = [
    { name: 'Home', path: '/home', icon: 'Home' },
    { name: 'Portfolio', path: '/portfolio', icon: 'Folder' },
    { name: 'Blogs', path: '/blogs', icon: 'FileText' },
    { name: 'Contact Us', path: '/contact', icon: 'FileText' },
  ];

  // Dropdown items for the new 'Why choose us' tab
  const whyChooseItems = [
    { name: 'Services', path: '/services', icon: 'Tool', desc: 'Our core services and solutions' },
    { name: 'Pricing', path: '/pricing', icon: 'CreditCard', desc: 'Flexible plans for every size' },
    { name: 'FAQs', path: '/faqs', icon: 'FileText', desc: 'Common questions answered' },
    { name: 'Our Team', path: '/team', icon: 'Users', desc: 'Meet the experts behind our work' },
    { name: 'Our Process', path: '/process', icon: 'GitBranch', desc: 'How we bring ideas to life' },
  ];

  const isActivePath = (path) => {
    if (!location?.pathname) return false;
    if (path === '/blogs') return location.pathname === '/blogs' || location.pathname.startsWith('/blogs/');
    return location.pathname === path;
  };

  const Logo = () => (
    <Link to="/R-Tech_Solutions" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <img src="/new_brand.png" alt="Logo" className="w-12 h-12 object-contain rounded-lg " />
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
              {/* render first two nav items: Home, Portfolio */}
              {navigationItems.slice(0, 2).map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 px-3 py-1 rounded-full ${
                    isActivePath(item?.path) ? 'bg-primary/10 text-primary shadow-sm' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span className="whitespace-nowrap">{item?.name}</span>
                </Link>
              ))}

              {/* Why choose us dropdown - enhanced */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <button
                  onClick={() => setWhyDropdownOpen((s) => !s)}
                  aria-expanded={whyDropdownOpen}
                  aria-haspopup="menu"
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 px-3 py-2 rounded-full ${
                    whyDropdownOpen ? 'bg-primary/10 text-primary shadow-sm' : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                  }`}
                >
                  <span className="uppercase text-xs tracking-wide">Why choose us</span>
                  <Icon name={whyDropdownOpen ? 'ChevronUp' : 'ChevronDown'} size={14} />
                </button>

                <div
                  role="menu"
                  className={`absolute right-0 mt-3 w-80 bg-gradient-to-br from-primary/5 to-accent/5 glass-morphism backdrop-blur-glass rounded-2xl shadow-glass z-50 transform origin-top-right transition-all duration-300 ${
                    whyDropdownOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                  }`}
                >
                  {/* decorative pointer */}
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-white/80 backdrop-blur-sm rotate-45 shadow-sm z-50" aria-hidden />
                  <div className="p-4">
                    <div className="mb-3 px-1">
                      <h4 className="text-sm font-semibold text-glass-text-primary">Why choose R-tech Solution</h4>
                      <p className="text-xs text-glass-text-secondary">Crafting digital experiences with strategy, design and engineering.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {whyChooseItems.map((it) => (
                        <Link
                          key={it.path}
                          to={it.path}
                          role="menuitem"
                          onClick={() => setWhyDropdownOpen(false)}
                          className="group flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:translate-x-1"
                        >
                          <div className="flex items-center">
                            <span className="w-1 h-10 rounded-full bg-transparent group-hover:bg-primary transition-all duration-200 mr-3" aria-hidden />
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-white/60 flex items-center justify-center">
                            <Icon name={it.icon} size={16} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-glass-text-primary">{it.name}</div>
                            <div className="text-xs text-glass-text-secondary">{it.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* remaining nav items (Blogs, Contact) */}
              {navigationItems.slice(2).map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 px-3 py-1 rounded-full ${
                    isActivePath(item?.path) ? 'bg-primary/10 text-primary shadow-sm' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
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

                {/* Mobile Why choose us items - displayed directly without dropdown */}
                <div className="mt-2 border-t border-gray-200 pt-2">
                  {whyChooseItems.map((it) => (
                    <Link
                      key={it.path}
                      to={it.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center w-full gap-3 px-4 py-2 text-sm rounded-lg transition-colors duration-150 ${
                        isActivePath(it.path)
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                      }`}
                    >
                      <Icon name={it.icon} size={18} />
                      <span className="whitespace-nowrap">{it.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-border/20 pt-4">
                <div className="flex flex-col space-y-3 px-2">
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