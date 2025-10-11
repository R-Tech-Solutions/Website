import React, { useState, useEffect } from 'react';
import { Download, Package, Zap, Shield, Star, CheckCircle, ArrowRight, Sparkles, Gift } from 'lucide-react';

export default function DownloadBundle() {
  const [downloadCount, setDownloadCount] = useState(12847);
  const [isHovered, setIsHovered] = useState(false);
  const [activePreview, setActivePreview] = useState(0);

  // Simulate download count increment
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const bundleContents = [
    { icon: Package, name: 'UI Component Kit', count: '150+', color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, name: 'Performance Tools', count: '25+', color: 'from-violet-500 to-purple-500' },
    { icon: Shield, name: 'Security Templates', count: '30+', color: 'from-emerald-500 to-green-500' },
    { icon: Sparkles, name: 'Premium Icons', count: '500+', color: 'from-amber-500 to-orange-500' }
  ];

  const features = [
    'Production-ready components',
    'Fully documented & typed',
    'Dark mode support',
    'Regular updates',
    'Premium support',
    'Lifetime access'
  ];

  const previewItems = [
    { title: 'React Components', size: '2.4 MB', type: 'JSX/TSX' },
    { title: 'Design Tokens', size: '156 KB', type: 'JSON' },
    { title: 'Documentation', size: '890 KB', type: 'MD' },
    { title: 'Icon Library', size: '3.2 MB', type: 'SVG' }
  ];

  return (
    <section id="download" className="relative py-24 overflow-hidden">


      <div className="container mx-auto px-4 relative z-10">
        {/* Header Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-morphism rounded-full px-6 py-3 mb-6">
            <Gift className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-semibold text-violet-600 tracking-wider uppercase">
              Limited Time Offer
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 bg-clip-text text-transparent mb-4 leading-tight">
            Premium Bundle
          </h2>
          <p className="text-xl text-slate-600">Everything you need to ship faster</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Content Card */}
          <div 
            className="lg:col-span-2 relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="glass-interactive rounded-3xl p-8 md:p-10 relative overflow-hidden transform-3d">
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 via-violet-500/20 to-purple-500/20 opacity-0 transition-opacity duration-600 ${isHovered ? 'opacity-100' : ''}`} />
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                  style={{
                    animation: 'shimmer 3s infinite'
                  }}
                />
              </div>

              <div className="relative z-10">
                {/* Title Section */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-glass transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div className="glass-morphism rounded-full px-4 py-1 text-xs font-semibold text-emerald-600">
                        100% FREE
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                      Download Premium Apps For FREE
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      A curated bundle of tools, templates and UI kits our team uses to ship faster. Lightweight, well-documented and production-ready.
                    </p>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{downloadCount.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">Downloads</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                      <div className="text-xs text-slate-500">Rating</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">705+</div>
                      <div className="text-xs text-slate-500">Components</div>
                    </div>
                  </div>
                </div>

                {/* Bundle Contents Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {bundleContents.map((item, i) => (
                    <div 
                      key={i}
                      className="glass-surface rounded-xl p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-glass"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                          <div className="text-xs text-slate-500">{item.count} items</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features List */}
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl shadow-glass-interactive overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-glass-interactive">
                    <span className="relative z-10 flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Get the Bundle
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>

                  <button className="px-8 py-4 glass-interactive text-slate-700 font-semibold rounded-xl transform transition-all duration-300 hover:scale-105">
                    View Contents
                  </button>

                  <a 
                    className="flex items-center gap-2 px-6 py-4 text-sm text-slate-600 hover:text-blue-600 transition-colors duration-300 underline underline-offset-4" 
                    href="#tech"
                  >
                    <Zap className="w-4 h-4" />
                    See tech used
                  </a>
                </div>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-white/30 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-white/30 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* 3D Shadow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-3xl transform translate-y-4 -z-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Preview Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Bundle Preview */}
            <div className="glass-interactive rounded-3xl p-6 transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-slate-900">Bundle Preview</h4>
                <div className="glass-morphism rounded-full px-3 py-1 text-xs font-semibold text-violet-600">
                  7.6 MB
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-6">
                Includes UI kits, productivity tools, and performance utilities.
              </p>

              {/* Preview Items */}
              <div className="space-y-3 mb-6">
                {previewItems.map((item, i) => (
                  <div 
                    key={i}
                    className={`glass-surface rounded-xl p-3 cursor-pointer transform transition-all duration-300 ${activePreview === i ? 'scale-105 shadow-glass' : 'hover:scale-102'}`}
                    onClick={() => setActivePreview(i)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-semibold ${
                          activePreview === i 
                            ? 'bg-gradient-to-br from-blue-500 to-violet-500 text-white' 
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {item.type}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.size}</div>
                        </div>
                      </div>
                      {activePreview === i && (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl shadow-glass transform transition-all duration-300 hover:scale-105 hover:shadow-glass-interactive flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download Now
              </button>
            </div>

            {/* Trust Badge */}
            <div className="glass-morphism rounded-2xl p-6 text-center">
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h5 className="text-sm font-semibold text-slate-900 mb-2">
                100% Safe & Secure
              </h5>
              <p className="text-xs text-slate-600">
                Verified by security experts. No malware, no tracking.
              </p>
            </div>
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