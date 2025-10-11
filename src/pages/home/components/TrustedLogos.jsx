import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Users, Globe, CheckCircle, Sparkles, Shield, Zap } from 'lucide-react';

export default function TrustedLogos() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [animatedLogos, setAnimatedLogos] = useState([]);
    const [currentRotation, setCurrentRotation] = useState(0);

    const stats = [
        { icon: Users, value: '500+', label: 'Partner Companies', color: 'from-blue-500 to-cyan-500' },
        { icon: Globe, value: '50+', label: 'Countries', color: 'from-emerald-500 to-green-500' },
        { icon: Award, value: '98%', label: 'Retention Rate', color: 'from-violet-500 to-purple-500' },
        { icon: TrendingUp, value: '$2M+', label: 'Revenue Impact', color: 'from-amber-500 to-orange-500' }
    ];

    const features = [
        { icon: Shield, text: 'Enterprise-grade security', color: 'text-blue-600' },
        { icon: Zap, text: 'Lightning-fast performance', color: 'text-violet-600' },
        { icon: CheckCircle, text: '24/7 dedicated support', color: 'text-emerald-600' }
    ];

    return (
        <section id="trusted" className="relative py-24 overflow-hidden">
            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-particle-genesis"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 4 + 4}s`
                        }}
                    >
                        <Sparkles className="w-3 h-3 text-blue-400 opacity-30" />
                    </div>
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 glass-morphism rounded-full px-6 py-3 mb-4 animate-glass-float">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase">
                            Trusted Worldwide
                        </span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>


                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Join the world's most innovative companies using our solutions to transform their digital presence
                    </p>

                    {/* Decorative Line */}
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent to-blue-400" />
                        <Globe className="w-5 h-5 text-violet-500" />
                        <div className="h-px w-24 bg-gradient-to-l from-transparent to-violet-400" />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={i}
                                className="glass-interactive rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 group"
                            >
                                <div className="flex flex-col items-center space-y-3">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-glass transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-semibold text-slate-600">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Features List */}
                <div className="glass-interactive rounded-3xl p-8 md:p-12 mb-12">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                            Why Companies Choose Us
                        </h3>
                        <p className="text-slate-600">
                            Industry-leading solutions backed by proven results
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={i}
                                    className="glass-surface rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 group"
                                >
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-slate-100 flex items-center justify-center shadow-glass-subtle group-hover:shadow-glass transform transition-all duration-300 group-hover:rotate-12">
                                            <Icon className={`w-6 h-6 ${feature.color}`} />
                                        </div>
                                        <p className="font-semibold text-slate-700">
                                            {feature.text}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
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