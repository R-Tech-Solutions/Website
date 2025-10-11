import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Award, TrendingUp, Users, MessageCircle, Sparkles, CheckCircle } from 'lucide-react';

const DEFAULT_TESTIMONIALS = [
    {
        name: 'Aisha K.',
        role: 'Product Manager',
        company: 'TechCorp',
        quote: "R-Tech's work transformed our website — faster, cleaner, and more delightful to use.",
        rating: 5,
        avatar: '👩🏽‍💼',
        metric: '+45% Performance'
    },
    {
        name: 'Jamal R.',
        role: 'CTO',
        company: 'StartupXYZ',
        quote: 'The performance improvements were immediately noticeable across all devices.',
        rating: 5,
        avatar: '👨🏾‍💻',
        metric: '99.9% Uptime'
    },
    {
        name: 'Maya L.',
        role: 'Head of Design',
        company: 'DesignHub',
        quote: "Their design systems accelerated our team's output and reduced UI bugs dramatically.",
        rating: 5,
        avatar: '👩🏻‍🎨',
        metric: '-60% Bug Rate'
    },
    {
        name: 'Owen T.',
        role: 'Founder',
        company: 'InnovateLabs',
        quote: 'A trusted partner that ships high-quality work on time.',
        rating: 5,
        avatar: '👨🏼‍💼',
        metric: '100% On-Time'
    },
    {
        name: 'Sofia M.',
        role: 'VP Engineering',
        company: 'CloudTech',
        quote: 'Outstanding technical expertise and communication. They truly understand modern web development.',
        rating: 5,
        avatar: '👩🏻‍💻',
        metric: '+200% Speed'
    },
    {
        name: 'David K.',
        role: 'Creative Director',
        company: 'BrandStudio',
        quote: 'Beautiful designs that actually work. The attention to detail is phenomenal.',
        rating: 5,
        avatar: '👨🏽‍🎨',
        metric: '5-Star Quality'
    },
];

export default function Testimonials({ items = DEFAULT_TESTIMONIALS }) {
    const ref = useRef(null);
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (isPaused) return;
        const id = setInterval(() => setActive((s) => (s + 1) % items.length), 6000);
        return () => clearInterval(id);
    }, [items.length, isPaused]);



    const scroll = (dir = 1) => {
        setActive((s) => {
            const newIndex = s + dir;
            if (newIndex < 0) return items.length - 1;
            if (newIndex >= items.length) return 0;
            return newIndex;
        });
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height
        });
    };



    return (
        <section
            id="testimonials"
            className="relative py-24 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 glass-morphism rounded-full px-6 py-3 mb-4 animate-glass-float">
                        <MessageCircle className="w-4 h-4 text-violet-600" />
                        <span className="text-sm font-semibold text-violet-600 tracking-wider uppercase">
                            Client Testimonials
                        </span>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                            ))}
                        </div>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-violet-900 to-blue-900 bg-clip-text text-transparent leading-tight">
                        What Clients Say
                    </h2>

                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Trusted by industry leaders and innovative startups worldwide
                    </p>

                    {/* Decorative Line */}
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent to-violet-400" />
                        <Quote className="w-5 h-5 text-blue-500" />
                        <div className="h-px w-24 bg-gradient-to-l from-transparent to-blue-400" />
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-slate-900">Featured Reviews</h3>
                        <div className="glass-morphism rounded-full px-4 py-1">
                            <span className="text-sm font-medium text-slate-600">
                                {active + 1} / {items.length}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => scroll(-1)}
                            className="group w-12 h-12 rounded-xl glass-interactive flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-glass"
                        >
                            <ChevronLeft className="w-5 h-5 text-slate-700 transition-transform group-hover:-translate-x-0.5" />
                        </button>

                        <button
                            onClick={() => scroll(1)}
                            className="group w-12 h-12 rounded-xl glass-interactive flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-glass"
                        >
                            <ChevronRight className="w-5 h-5 text-slate-700 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </div>

                {/* Testimonials Scroller */}
                <div
                    className="relative mb-16"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none" />

                    <div
                        ref={ref}
                        className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {items.map((t, i) => {
                            const isActive = i === active;

                            return (
                                <article
                                    key={i}
                                    className={`group relative min-w-[380px] perspective-1000 transform transition-all duration-500 ${isActive ? 'scale-105' : 'scale-95 opacity-70'
                                        }`}
                                    onClick={() => setActive(i)}
                                >
                                    <div className="relative transform-3d transition-all duration-500 hover:scale-105 cursor-pointer">
                                        {/* Main Card */}
                                        <div className="glass-interactive rounded-3xl p-8 h-full min-h-[320px] flex flex-col relative overflow-hidden">
                                            {/* Background Gradient (appears on hover/active) */}
                                            <div className={`absolute inset-0 bg-gradient-to-br from-violet-500/10 via-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'group-hover:opacity-100'
                                                }`} />

                                            {/* Shimmer Effect */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 overflow-hidden rounded-3xl">
                                                <div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                    style={{
                                                        animation: 'shimmer 2s infinite',
                                                        animationDelay: `${i * 0.2}s`
                                                    }}
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="relative z-10 flex flex-col h-full">
                                                {/* Quote Icon */}
                                                <div className="mb-6">
                                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-glass transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                                                        <Quote className="w-7 h-7 text-white" />
                                                    </div>
                                                </div>

                                                {/* Rating Stars */}
                                                <div className="flex gap-1 mb-4">
                                                    {[...Array(t.rating)].map((_, idx) => (
                                                        <Star
                                                            key={idx}
                                                            className="w-4 h-4 text-amber-500 fill-amber-500 transition-all duration-300 group-hover:scale-110"
                                                            style={{ transitionDelay: `${idx * 50}ms` }}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Quote */}
                                                <blockquote className="text-lg leading-relaxed text-slate-700 mb-6 flex-grow">
                                                    "{t.quote}"
                                                </blockquote>

                                                {/* Author Info */}
                                                <div className="flex items-center justify-between pt-6 border-t border-white/20">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-violet-400 flex items-center justify-center text-2xl shadow-glass">
                                                            {t.avatar}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-900">{t.name}</div>
                                                            <div className="text-sm text-slate-600">{t.role}</div>
                                                            <div className="text-xs text-slate-500">{t.company}</div>
                                                        </div>
                                                    </div>

                                                    {/* Metric Badge */}
                                                    <div className="glass-morphism rounded-xl px-3 py-2">
                                                        <div className="text-xs font-bold text-emerald-600">{t.metric}</div>
                                                    </div>
                                                </div>

                                                {/* Verified Badge */}
                                                <div className="absolute top-6 right-6 glass-morphism rounded-full p-2">
                                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                                </div>
                                            </div>

                                            {/* Corner Accents */}
                                            <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-white/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-white/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>

                                        {/* 3D Shadow */}
                                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 blur-2xl transform translate-y-4 -z-10 opacity-0 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'group-hover:opacity-100'
                                            }`} />
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {items.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === active
                                    ? 'w-12 bg-gradient-to-r from-violet-500 to-blue-500'
                                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>


                {/* Bottom CTA */}
                <div className="glass-interactive rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
                    {/* Hover background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

                    <div className="relative z-10 space-y-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 glass-morphism rounded-full px-5 py-2 mb-4">
                            <Sparkles className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-semibold text-slate-700">We’re Hiring</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Join Our Team of Innovators
                        </h3>

                        {/* Description */}
                        <p className="text-slate-600 max-w-2xl mx-auto mb-8">
                            Passionate about technology, creativity, and growth? Discover exciting career opportunities and become part of a forward-thinking team that values innovation and collaboration.
                        </p>

                        {/* Button */}
                        <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl shadow-glass-interactive overflow-hidden transform transition-all duration-300 hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2 mx-auto w-fit">
                                Explore Careers
                                <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </div>
                </div>

            </div>

            <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
}