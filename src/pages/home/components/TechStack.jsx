import React, { useState, useEffect, useRef } from 'react';
import { Code, Zap, Layers, Sparkles, CheckCircle, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import { SiReact, SiVite, SiNextdotjs, SiHtml5, SiNodedotjs, SiPython, SiPhp, SiFlutter, SiMysql, SiPostgresql, SiFirebase, SiSupabase, SiWordpress } from 'react-icons/si';

export default function TechStack() {
  const [pos, setPos] = useState(0);
  const [disableTransition, setDisableTransition] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(5);
  const trackRef = useRef(null);

  // Tech data with lucide-react icons
  const techData = [
    { name: 'React', icon: SiReact, color: 'from-cyan-500 to-blue-500' },
    { name: 'Vite', icon: SiVite, color: 'from-purple-500 to-violet-500' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'from-slate-800 to-slate-600' },
    { name: 'HTML', icon: SiHtml5, color: 'from-orange-500 to-amber-500' },
    { name: 'Node.js', icon: SiNodedotjs, color: 'from-green-500 to-emerald-500' },
    { name: 'Python', icon: SiPython, color: 'from-blue-600 to-blue-500' },
    { name: 'PHP', icon: SiPhp, color: 'from-indigo-500 to-purple-500' },
    { name: 'Java', icon: Code, color: 'from-red-600 to-orange-600' },
    { name: 'Flutter', icon: SiFlutter, color: 'from-cyan-500 to-blue-600' },
    { name: 'React Native', icon: SiReact, color: 'from-cyan-500 to-blue-500' },
    { name: 'MySQL', icon: SiMysql, color: 'from-blue-500 to-cyan-500' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: 'from-slate-600 to-slate-800' },
    { name: 'Firebase', icon: SiFirebase, color: 'from-yellow-500 to-orange-500' },
    { name: 'Supabase', icon: SiSupabase, color: 'from-emerald-500 to-green-600' },
    { name: 'WordPress', icon: SiWordpress, color: 'from-slate-700 to-blue-700' }
  ];

  const categories = [
    { id: 'all', label: 'All Technologies', icon: Layers },
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend', icon: Cpu },
    { id: 'appdev', label: 'App Development', icon: Sparkles },
    { id: 'database', label: 'Database', icon: Zap },
    { id: 'nocode', label: 'No Code Tools', icon: CheckCircle }
  ];

  // Duplicate items for seamless infinite loop
  const items = [...techData, ...techData];

  // Handle responsive items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // Mobile: 1 card
      } else if (window.innerWidth < 768) {
        setItemsPerView(2); // Small tablet: 2 cards
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3); // Tablet: 3 cards
      } else {
        setItemsPerView(5); // Desktop: 5 cards
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Auto-advance carousel every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPos((p) => p + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Reset position for seamless infinite loop
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onTransitionEnd = () => {
      // wrap forward
      if (pos >= techData.length) {
        setDisableTransition(true);
        setPos((p) => p - techData.length);
        requestAnimationFrame(() => requestAnimationFrame(() => setDisableTransition(false)));
        return;
      }

      // wrap backward (when decrementing past 0)
      if (pos < 0) {
        setDisableTransition(true);
        setPos((p) => p + techData.length);
        requestAnimationFrame(() => requestAnimationFrame(() => setDisableTransition(false)));
      }
    };

    el.addEventListener('transitionend', onTransitionEnd);
    return () => el.removeEventListener('transitionend', onTransitionEnd);
  }, [pos, techData.length]);

  const handleDotClick = (index) => {
    setPos(index);
  };

  // Step backward by one - allow negative pos, onTransitionEnd will normalize
  const handlePrev = () => {
    setPos((p) => p - 1);
  };

  // Step forward by one
  const handleNext = () => {
    setPos((p) => p + 1);
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 mb-2 shadow-lg">
            <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-violet-600" />
            <span className="text-xs sm:text-sm font-semibold text-violet-600 tracking-wider uppercase">
              Our Tech Arsenal
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 bg-clip-text text-transparent leading-tight px-4">
            Technology We Master
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-4">
            Cutting-edge tools and frameworks we use to build exceptional digital experiences
          </p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-blue-400" />
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-violet-500" />
            <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-violet-400" />
          </div>
        </div>

        {/* Category Filter - Responsive */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10 px-2">
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                className="px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-white/40 backdrop-blur-sm shadow-md text-slate-600 flex items-center gap-2"
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{cat.label}</span>
                <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>

        {/* Carousel Container - Fully Responsive */}
        <div className="relative mb-8 sm:mb-10">
          {/* Navigation Arrows - Desktop Only */}
          <button
            onClick={handlePrev}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-300 hover:scale-110 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" />
          </button>

          <button
            onClick={handleNext}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-300 hover:scale-110 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden px-2 sm:px-4 md:px-8 lg:px-16">
            <div
              ref={trackRef}
              className={`flex gap-3 sm:gap-4 md:gap-6 ${disableTransition ? '' : 'transition-transform duration-500 ease-in-out'}`}
              style={{
                transform: `translateX(-${pos * (100 / itemsPerView)}%)`
              }}
            >
              {items.map((tech, index) => {
                const originalIndex = index % techData.length;
                const IconComponent = tech.icon;

                return (
                  <div
                      key={`${tech.name}-${index}`}
                      className="flex-shrink-0 cursor-pointer"
                      style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                      onClick={() => setPos(originalIndex)}
                    >
                    <div className="relative group h-full">
                      {/* Main Card - Responsive Heights */}
                      <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 h-40 sm:h-48 md:h-56 lg:h-64 flex flex-col items-center justify-center transform transition-all duration-300 shadow-lg hover:shadow-2xl">
                        {/* Background Gradient on Hover */}
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center text-center space-y-2 sm:space-y-3 md:space-y-4">
                          {/* Icon - Responsive Sizes */}
                          <div className="transform transition-all duration-300 group-hover:scale-110">
                            <IconComponent className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-slate-700 group-hover:text-white transition-colors duration-300" />
                          </div>

                          {/* Tech Name - Responsive Text */}
                          <div className="font-bold text-base sm:text-lg md:text-xl transition-colors duration-300 text-slate-900 group-hover:text-white">
                            {tech.name}
                          </div>
                        </div>

                        {/* Corner Accents - Responsive */}
                        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-white/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-white/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* 3D Shadow Effect */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 blur-xl transform translate-y-2 -z-10 transition-opacity duration-300`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carousel Indicators - Responsive */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
            {techData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${index === (pos % techData.length)
                    ? 'w-6 sm:w-8 bg-gradient-to-r from-blue-500 to-violet-500'
                    : 'w-1.5 sm:w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA - Fully Responsive */}
        <div className="bg-white/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden group shadow-xl mx-2 sm:mx-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

          <div className="relative z-10 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-2 shadow-lg">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Always Learning</span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Ready to Build Something Amazing?
            </h3>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-4 sm:mb-6 px-4">
              Our tech stack is constantly evolving. We stay ahead of the curve to deliver cutting-edge solutions.
            </p>

            <button
              className="group/btn relative px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm sm:text-base"
            >
              <span className="relative z-10 flex items-center gap-2 mx-auto w-fit">
                Let's Talk Tech
                <Code className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:rotate-12" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}