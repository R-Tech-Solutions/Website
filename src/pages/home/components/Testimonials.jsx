import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote, MessageCircle, Sparkles, CheckCircle } from 'lucide-react';

const DEFAULT_TESTIMONIALS = [
    {
        role: 'Owner',
        company: 'Adspire DIGITAL',
        quote: "Adspire DIGITAL's site is sleek, easy to navigate, and the new analytics tools are impressive. Brilliant work!",
        rating: 5,
        avatar: '👩🏽‍💼',
        metric: '+45% Performance'
    },
    {
        role: 'Owner',
        company: 'Champika Export',
        quote: "Champika Export Marketing did an amazing job on our site! It's user-friendly, visually appealing, and the 5/5 rating system is a hit with our clients.",
        rating: 5,
        avatar: '👨🏾‍💻',
        metric: '99.9% Uptime'
    },
    {
        role: 'Owner',
        company: "Echo Tours Lanka's",
        quote: "Echo Tours Lanka's website is fantastic - user-friendly, visually appealing, and the booking process is smooth. Great job by Rtech Solution!",
        rating: 5,
        avatar: '👩🏻‍🎨',
        metric: '-60% Bug Rate'
    },
    {
        role: 'Owner',
        company: 'ELINE Technologies',
        quote: 'ELINE Technologies nailed it with our website! Love the sleek design, intuitive navigation, and the 5/5 rating system for customer feedback. Brilliant work!',
        rating: 5,
        avatar: '👨🏼‍💼',
        metric: '100% On-Time'
    },
    {
        role: 'Owner',
        company: 'Heartland Trading',
        quote: "Heartland Trading's site is spot-on! The layout's clean, navigation's smooth, and the 5/5 rating system really connects us with our customers. Excellent!",
        rating: 5,
        avatar: '👩🏻‍💻',
        metric: '+200% Speed'
    },
    {
        role: 'Owner',
        company: 'Ride With Me',
        quote: "Ride With Me's site is a game-changer for us! Love the easy navigation, the route planner, and the 5/5 review system for our services. Brilliant!",
        rating: 5,
        avatar: '👨🏽‍🎨',
        metric: '5-Star Quality'
    },
    {
        role: 'Owner',
        company: 'Twilight Blue',
        quote: "Twilight Blue's site is perfect! The layout, security features display, and the 5/5 customer rating system are all spot-on. Great work!",
        rating: 5,
        avatar: '👨🏽‍🎨',
        metric: '5-Star Quality'
    },
    {
        role: 'Owner',
        company: 'X-guard',
        quote: "X-guard's website is top-notch! The design, ease of use, and the 5/5 rating feature really showcase our services well. Fantastic!",
        rating: 5,
        avatar: '👨🏽‍🎨',
        metric: '5-Star Quality'
    },
];

export default function Testimonials({ items = DEFAULT_TESTIMONIALS }) {
    const [active, setActive] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const id = setInterval(() => setActive((s) => (s + 1) % items.length), 5000);
        return () => clearInterval(id);
    }, [items.length]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height
        });
    };

    const getVisibleCards = () => {
        const cards = [];
        for (let i = -1; i <= 1; i++) {
            const index = (active + i + items.length) % items.length;
            cards.push({ index, position: i });
        }
        return cards;
    };

    const renderCard = (testimonial, position, isCenter) => (
        <article
            key={`${testimonial.name}-${position}`}
            className={`flex-shrink-0 transition-all duration-400 ease-in-out ${isCenter ? 'w-[380px] scale-100 opacity-100' : 'w-[200px] scale-75 opacity-40'
                }`}
            style={{
                transform: `translateX(${position * 0}px) scale(${isCenter ? 1 : 0.75})`,
            }}
        >
            <div className="relative transform-3d transition-all duration-500">
                {/* Main Card */}
                <div className="glass-interactive rounded-3xl p-8 h-full min-h-[320px] flex flex-col relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-violet-500/10 via-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 ${isCenter ? 'opacity-100' : ''
                        }`} />

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-600 overflow-hidden rounded-3xl group-hover:opacity-100">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            style={{
                                animation: 'shimmer 2s infinite',
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                        {/* Quote Icon */}
                        <div className="mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-glass transform transition-all duration-300">
                                <Quote className="w-7 h-7 text-white" />
                            </div>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, idx) => (
                                <Star
                                    key={idx}
                                    className="w-4 h-4 text-amber-500 fill-amber-500 transition-all duration-300"
                                />
                            ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-lg leading-relaxed text-slate-700 mb-6 flex-grow">
                            "{testimonial.quote}"
                        </blockquote>

                        {/* Author Info */}
                        <div className="flex items-center justify-between pt-6 border-t border-white/20">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-violet-400 flex items-center justify-center text-2xl shadow-glass">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    {/* <div className="font-bold text-slate-900">{testimonial.name}</div> */}
                                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                                    <div className="text-xs text-slate-500">{testimonial.company}</div>
                                </div>
                            </div>

                            {/* Metric Badge */}
                            <div className="glass-morphism rounded-xl px-3 py-2">
                                <div className="text-xs font-bold text-emerald-600">{testimonial.metric}</div>
                            </div>
                        </div>

                        {/* Verified Badge */}
                        <div className="absolute top-6 right-6 glass-morphism rounded-full p-2">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                        </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-white/30 rounded-tl-2xl opacity-0 transition-opacity duration-300" />
                    <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-white/30 rounded-br-2xl opacity-0 transition-opacity duration-300" />
                </div>

                {/* 3D Shadow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 blur-2xl transform translate-y-4 -z-10 opacity-0 transition-opacity duration-300 ${isCenter ? 'opacity-100' : ''
                    }`} />
            </div>
        </article>
    );

    const visibleCards = getVisibleCards();

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

                {/* Counter */}
                <div className="flex items-center justify-center mb-12">
                    <div className="glass-morphism rounded-full px-4 py-1">
                        <span className="text-sm font-medium text-slate-600">
                            {active + 1} / {items.length}
                        </span>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative mb-16 flex justify-center items-center overflow-hidden">
                    {/* Gradient Overlays - Hidden on Mobile */}
                    <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none" />
                    <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none" />

                    {/* Cards Carousel */}
                    <div className="w-full overflow-x-hidden">
                        <div className="flex gap-4 md:gap-8 justify-center md:justify-center items-center py-8 px-2 md:px-4 w-full perspective">
                            {visibleCards.map(({ index, position }) => (
                                <div
                                    key={`container-${index}`}
                                    className="transition-all duration-400 ease-in-out hidden md:flex"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        transform: `translateX(${position === -1 ? -200 : position === 1 ? 200 : 0}px)`,
                                    }}
                                >
                                    {renderCard(items[index], position, position === 0)}
                                </div>
                            ))}
                        </div>

                        {/* Mobile Single Card View */}
                        <div className="md:hidden flex justify-center">
                            {renderCard(items[active], 0, true)}
                        </div>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-2 mt-12">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === active
                                ? 'w-12 bg-gradient-to-r from-violet-500 to-blue-500'
                                : 'w-2 bg-slate-300 hover:bg-slate-400'
                                }`}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="glass-interactive rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group mt-16">
                    {/* Hover background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

                    <div className="relative z-10 space-y-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 glass-morphism rounded-full px-5 py-2 mb-4">
                            <Sparkles className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-semibold text-slate-700">We're Hiring</span>
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
                        <button
                            onClick={() => window.location.href = "/careers"}
                            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl shadow-glass-interactive overflow-hidden transform transition-all duration-300 hover:scale-105"
                        >
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
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        section {
          perspective: 1200px;
        }
      `}</style>
        </section>
    );
}