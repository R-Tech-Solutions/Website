import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Package, Zap, Shield, ArrowRight, Sparkles, Gift } from 'lucide-react';

export default function DownloadBundle() {
  const [downloadCount, setDownloadCount] = useState(12847);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Simulate download count increment
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="download" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-morphism rounded-full px-6 py-3 mb-6">
            <Gift className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-semibold text-violet-600 tracking-wider uppercase">
              Limited Time Offer
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 bg-clip-text text-transparent mb-4 leading-tight">
            Premium Bundle
          </h2>
          <p className="text-lg md:text-xl text-slate-600">Everything you need to ship faster</p>
        </div>

        {/* Card Section */}
        <div
          className="relative group max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="glass-interactive rounded-3xl p-8 md:p-12 relative overflow-hidden transform-3d">
            {/* Animated Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 via-violet-500/20 to-purple-500/20 opacity-0 transition-opacity duration-600 ${isHovered ? 'opacity-100' : ''
                }`}
            />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                style={{
                  animation: 'shimmer 3s infinite'
                }}
              />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Icon and Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-glass transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="glass-morphism rounded-full px-4 py-1 text-xs font-semibold text-emerald-600">
                  100% FREE
                </div>
              </div>

              <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
                Download Premium Apps For FREE
              </h3>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed mb-6">
                A curated bundle of tools, templates and UI kits our team uses to ship faster.
                Lightweight, well-documented and production-ready.
              </p>

              {/* Trust Badge */}
              <div className="glass-morphism rounded-2xl p-5 mb-8 text-center w-full max-w-xs">
                <Shield className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                <h5 className="text-sm font-semibold text-slate-900 mb-1">
                  100% Safe & Secure
                </h5>
                <p className="text-xs text-slate-600">
                  Verified by security experts. No malware, no tracking.
                </p>
              </div>
              <button
                className="group relative px-10 py-4 bg-white text-violet-600 font-semibold rounded-xl shadow-glass-interactive overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-glass-interactive flex items-center gap-2 justify-center border border-violet-400"
                onClick={() => navigate('/apps')}
              >
                {/* Download Icon */}
                <Download className="w-5 h-5 text-violet-600 transition-colors duration-300 group-hover:text-white" />

                {/* Button Text */}
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Download Now
                </span>

                {/* Arrow Icon */}
                <ArrowRight className="w-4 h-4 text-violet-600 transition-all duration-300 group-hover:text-white group-hover:translate-x-1" />

                {/* Hover Background Layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </button>

            </div>

            {/* Decorative Corners */}
            <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-white/30 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-white/30 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Shadow Glow on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-3xl transform translate-y-4 -z-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </section>
  );
}
