import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Zap, Layers, Sparkles, CheckCircle, Cpu } from 'lucide-react';

export default function TechStack() {
  const navigate = useNavigate();
  // `pos` tracks the sliding position across duplicated items for seamless loop
  const [pos, setPos] = useState(0);
  const [disableTransition, setDisableTransition] = useState(false);
  const trackRef = useRef(null);

  // Simplified tech data
  const techData = [
    { name: 'React', icon: '⚛️', color: 'from-cyan-500 to-blue-500' },
    { name: 'Vite', icon: '⚡', color: 'from-purple-500 to-violet-500' },
    { name: 'Next.js', icon: '▲', color: 'from-slate-800 to-slate-600' },
    { name: 'HTML', icon: '🏗️', color: 'from-orange-500 to-amber-500' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-emerald-500' },
    { name: 'Python', icon: '🐍', color: 'from-blue-600 to-blue-500' },
    { name: 'PHP', icon: '🐘', color: 'from-indigo-500 to-purple-500' },
    { name: 'Java', icon: '☕', color: 'from-red-600 to-orange-600' },
    { name: 'Flutter', icon: '📱', color: 'from-cyan-500 to-blue-600' },
    { name: 'React Native', icon: '⚛️', color: 'from-cyan-500 to-blue-500' },
    { name: 'MySQL', icon: '🗄️', color: 'from-blue-500 to-cyan-500' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-slate-600 to-slate-800' },
    { name: 'Firebase', icon: '🔥', color: 'from-yellow-500 to-orange-500' },
    { name: 'Supabase', icon: '🟢', color: 'from-emerald-500 to-green-600' },
    { name: 'WordPress', icon: '🌐', color: 'from-slate-700 to-blue-700' }
  ];

  const categories = [
    { id: 'all', label: 'All Technologies', icon: Layers },
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend', icon: Cpu },
    { id: 'appdev', label: 'App Development', icon: Sparkles },
    { id: 'database', label: 'Database', icon: Zap },
    { id: 'nocode', label: 'No Code Tools', icon: CheckCircle }
  ];


  // Duplicate items so we can create a seamless loop (items + items)
  const items = [...techData, ...techData];

  // Auto-advance quickly
  useEffect(() => {
    const interval = setInterval(() => {
      setPos((p) => p + 1);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // After each transition, if we've advanced into the duplicated area, jump back to the original
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onTransitionEnd = () => {
      if (pos >= techData.length) {
        // disable transition, jump back to equivalent position in original set
        setDisableTransition(true);
        // set position to pos - techData.length (same visual location)
        setPos((p) => p - techData.length);
        // re-enable transition on next frame
        requestAnimationFrame(() => requestAnimationFrame(() => setDisableTransition(false)));
      }
    };

    el.addEventListener('transitionend', onTransitionEnd);
    return () => el.removeEventListener('transitionend', onTransitionEnd);
  }, [pos, techData.length]);

  const handleDotClick = (index) => {
    // jump to the matching index in the first (original) set
    setPos(index);
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-2 mb-2 shadow-lg">
            <Cpu className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-semibold text-violet-600 tracking-wider uppercase">
              Our Tech Arsenal
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 bg-clip-text text-transparent leading-tight">
            Technology We Master
          </h2>

          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Cutting-edge tools and frameworks we use to build exceptional digital experiences
          </p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-400" />
            <Sparkles className="w-4 h-4 text-violet-500" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-violet-400" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-white/40 backdrop-blur-sm shadow-md text-slate-600 flex items-center gap-2"
              >
                <Icon className="w-3 h-3" />
                {cat.label}
              </div>
            );
          })}
        </div>

        {/* Carousel Container */}
        <div className="relative mb-10">
          {/* Navigation Buttons removed for automatic carousel */}

          {/* Carousel Track */}
          <div className="overflow-hidden px-16">
            <div
              ref={trackRef}
              className={`flex gap-6 ${disableTransition ? '' : 'transition-transform duration-200 ease-linear'}`}
              style={{
                transform: `translateX(-${(pos % techData.length) * (100 / 5)}%)`
              }}
            >
              {items.map((tech, index) => {
                const originalIndex = index % techData.length;

                return (
                  <div
                    key={`${tech.name}-${index}`}
                    className="flex-shrink-0 cursor-pointer"
                    onClick={() => setPos(originalIndex)}
                    style={{ width: 'calc(20% - 1.2rem)' }}
                  >
                    <div className="relative group h-full">
                      {/* Main Card */}
                      <div className={`bg-white/70 backdrop-blur-md rounded-xl p-8 h-64 flex flex-col items-center justify-center transform transition-all duration-300 shadow-lg hover:shadow-2xl`}>
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                          {/* Icon */}
                          <div className="text-7xl transform transition-all duration-300 group-hover:scale-105">
                            {tech.icon}
                          </div>

                          {/* Tech Name */}
                          <div className="font-bold text-xl transition-colors duration-300 text-slate-900 group-hover:text-white">
                            {tech.name}
                          </div>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-white/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-white/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* 3D Shadow */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 blur-xl transform translate-y-2 -z-10 transition-opacity duration-300`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {techData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === (pos % techData.length)
                  ? 'w-8 bg-gradient-to-r from-blue-500 to-violet-500'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-white/50 backdrop-blur-md rounded-2xl p-8 text-center relative overflow-hidden group shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-2 shadow-lg">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-slate-700">Always Learning</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Ready to Build Something Amazing?
            </h3>

            <p className="text-slate-600 max-w-2xl mx-auto mb-6">
              Our tech stack is constantly evolving. We stay ahead of the curve to deliver cutting-edge solutions.
            </p>

            <button
              onClick={() => navigate('/contact')}
              className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-2 mx-auto w-fit">
                Let's Talk Tech
                <Code className="w-5 h-5 transition-transform group-hover:rotate-12" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}