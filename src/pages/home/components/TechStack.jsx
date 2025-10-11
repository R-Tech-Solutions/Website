import React, { useState, useEffect } from 'react';
import { Code, Zap, Layers, Sparkles, CheckCircle, TrendingUp, Award, Cpu } from 'lucide-react';

export default function TechStack({ items = ['React', 'Vite', 'Tailwind CSS', 'Three.js', 'WebGL', 'Node.js'] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [animatedItems, setAnimatedItems] = useState([]);

  // Enhanced tech data with categories and metadata
  const techData = items.map((tech, i) => {
    const categories = {
      'React': { category: 'frontend', icon: '⚛️', color: 'from-cyan-500 to-blue-500', experience: '5+ years' },
      'Vite': { category: 'build', icon: '⚡', color: 'from-purple-500 to-violet-500', experience: '3+ years' },
      'Tailwind CSS': { category: 'frontend', icon: '🎨', color: 'from-sky-500 to-cyan-500', experience: '4+ years' },
      'Three.js': { category: 'graphics', icon: '🎮', color: 'from-emerald-500 to-green-500', experience: '4+ years' },
      'WebGL': { category: 'graphics', icon: '🌐', color: 'from-orange-500 to-amber-500', experience: '5+ years' },
      'Node.js': { category: 'backend', icon: '🟢', color: 'from-green-500 to-emerald-500', experience: '6+ years' },
      'TypeScript': { category: 'frontend', icon: '📘', color: 'from-blue-600 to-blue-500', experience: '5+ years' },
      'Next.js': { category: 'frontend', icon: '▲', color: 'from-slate-800 to-slate-600', experience: '4+ years' },
      'GraphQL': { category: 'backend', icon: '🔷', color: 'from-pink-500 to-rose-500', experience: '3+ years' },
      'Docker': { category: 'devops', icon: '🐳', color: 'from-blue-500 to-cyan-500', experience: '4+ years' }
    };

    return {
      name: tech,
      ...categories[tech] || { category: 'other', icon: '🔧', color: 'from-gray-500 to-slate-500', experience: '3+ years' }
    };
  });

  const categories = [
    { id: 'all', label: 'All Technologies', icon: Layers },
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend', icon: Cpu },
    { id: 'graphics', label: '3D & Graphics', icon: Sparkles },
    { id: 'build', label: 'Build Tools', icon: Zap }
  ];

  const filteredTech = selectedCategory === 'all'
    ? techData
    : techData.filter(t => t.category === selectedCategory);

  // Staggered animation effect
  useEffect(() => {
    setAnimatedItems([]);
    filteredTech.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedItems(prev => [...prev, index]);
      }, index * 100);
    });
  }, [selectedCategory]);


  return (
    <section id="tech" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 glass-morphism rounded-full px-6 py-3 mb-4 animate-glass-float">
            <Cpu className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-semibold text-violet-600 tracking-wider uppercase">
              Our Tech Arsenal
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 bg-clip-text text-transparent leading-tight">
            Technology We Master
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Cutting-edge tools and frameworks we use to build exceptional digital experiences
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-blue-400" />
            <Sparkles className="w-5 h-5 text-violet-500" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-violet-400" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${isActive
                    ? 'glass-morphism shadow-glass'
                    : 'glass-surface hover:shadow-glass-subtle'
                  }`}
              >
                <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-blue-600' : 'text-slate-600'
                  }`}>
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </span>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-xl" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
          {filteredTech.map((tech, index) => {
            const isAnimated = animatedItems.includes(index);
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={tech.name}
                className={`group relative perspective-1000 transition-all duration-500 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
              >
                <div className="relative transform-3d transition-all duration-500 hover:scale-110">
                  {/* Main Card */}
                  <div className="glass-interactive rounded-2xl p-6 h-full transform transition-all duration-500 group-hover:shadow-glass-interactive">
                    {/* Background Gradient (appears on hover) */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 overflow-hidden rounded-2xl">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        style={{
                          animation: 'shimmer 2s infinite',
                          animationDelay: `${index * 0.1}s`
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                      {/* Icon */}
                      <div className="relative">
                        <div className={`text-5xl transform transition-all duration-500 ${isHovered ? 'scale-125 rotate-12' : ''
                          }`}>
                          {tech.icon}
                        </div>
                        {isHovered && (
                          <div className="absolute inset-0 rounded-full bg-white/20 blur-xl animate-pulse" />
                        )}
                      </div>

                      {/* Tech Name */}
                      <div className={`font-bold text-lg transition-colors duration-300 ${isHovered ? 'text-white' : 'text-slate-900'
                        }`}>
                        {tech.name}
                      </div>

                      {/* Experience Badge */}
                      <div className={`text-xs font-medium px-3 py-1 rounded-full transition-all duration-300 ${isHovered
                          ? 'bg-white/30 text-white backdrop-blur-sm'
                          : 'bg-slate-100 text-slate-600'
                        }`}>
                        {tech.experience}
                      </div>

                      {/* Category Tag */}
                      <div className={`text-xs uppercase tracking-wider font-semibold transition-colors duration-300 ${isHovered ? 'text-white/80' : 'text-slate-500'
                        }`}>
                        {tech.category}
                      </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* 3D Shadow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-30 blur-xl transform translate-y-4 -z-10 transition-opacity duration-300`} />
                </div>
              </div>
            );
          })}
        </div>
        {/* Bottom CTA */}
        <div className="glass-interactive rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 glass-morphism rounded-full px-5 py-2 mb-4">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-slate-700">Always Learning</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Build Something Amazing?
            </h3>

            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
              Our tech stack is constantly evolving. We stay ahead of the curve to deliver cutting-edge solutions.
            </p>

            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl shadow-glass-interactive overflow-hidden transform transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center gap-2 mx-auto w-fit">
                Let's Talk Tech
                <Code className="w-5 h-5 transition-transform group-hover:rotate-12" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
}