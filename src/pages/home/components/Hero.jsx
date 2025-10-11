import React, { useState, useEffect, useRef } from 'react';
import { Play, Download, ArrowRight, Zap, Sparkles, Code, Palette, Layers, Globe, TrendingUp, Award, Users } from 'lucide-react';

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPlaying, setIsPlaying] = useState(false);
    const [typedText, setTypedText] = useState('');
    const canvasRef = useRef(null);
    const fullText = 'Cutting-Edge Solutions';
    const halftext = 'Web Development , App Development , Custom Software Development , POS Solution , CCTV & Networking';
    const paragraph = 'Srilanka';

    // Typing animation
    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 30);
        return () => clearInterval(timer);
    }, []);

    // Mouse tracking for 3D effects
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
    };

    // Animated particles canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);

        const particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.offsetWidth,
                y: Math.random() * canvas.offsetHeight,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
                ctx.fill();
            });

            // Draw connections
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 100)})`;
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, []);

    const features = [
        { icon: Zap, label: 'Performance', desc: 'PageSpeed, Core Web Vitals', color: 'from-blue-500 to-cyan-500' },
        { icon: Palette, label: 'Design Systems', desc: 'Scalable UI patterns', color: 'from-violet-500 to-purple-500' },
        { icon: Layers, label: '3D Experiences', desc: 'WebGL & Three.js', color: 'from-emerald-500 to-green-500' },
        { icon: Code, label: 'Clean Code', desc: 'TypeScript & React', color: 'from-amber-500 to-orange-500' }
    ];

    const stats = [
        { icon: Users, value: '500+', label: 'Happy Clients' },
        { icon: Award, value: '98%', label: 'Satisfaction' },
        { icon: TrendingUp, value: '150%', label: 'ROI Average' }
    ];

    const techStack = ['React', 'Vite', 'Three.js', 'TypeScript', 'Tailwind'];

    return (
        <section className="relative pt-32 pb-20 overflow-hidden" onMouseMove={handleMouseMove}>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 glass-morphism rounded-full px-5 py-2 animate-glass-float">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-sm font-semibold text-slate-700">
                                Premium Digital Solutions
                            </span>
                            <Globe className="w-4 h-4 text-blue-500" />
                        </div>

                        {/* Main Heading with Typing Effect */}
                        <div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
                                <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 bg-clip-text text-transparent">
                                    {typedText}
                                </span>
                                <span className="animate-pulse text-blue-500">|</span>
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                            We design and build digital products that are fast, accessible, and delightful. Our team
                            blends design, animation and engineering to ship production-ready web experiences.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 items-center">
                            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl shadow-glass-interactive overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-glass-interactive">
                                <span className="relative z-10 flex items-center gap-2">
                                    <Play className="w-5 h-5" />
                                    View Demo
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>

                            <button className="px-8 py-4 glass-interactive text-slate-700 font-semibold rounded-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                <Download className="w-5 h-5" />
                                Download Bundle
                            </button>

                            <a
                                href="/contact"
                                className="flex items-center gap-2 px-6 py-4 text-slate-600 hover:text-blue-600 transition-colors duration-300 underline underline-offset-4 font-medium"
                            >
                                Talk to an expert
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-2 gap-4 pt-8">
                            {features.map((feature, i) => (
                                <div
                                    key={i}
                                    className="glass-interactive rounded-2xl p-4 transform transition-all duration-300 hover:scale-105 group"
                                    style={{
                                        animationDelay: `${i * 100}ms`
                                    }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-glass transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}>
                                            <feature.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-slate-900 text-sm mb-1">{feature.label}</div>
                                            <div className="text-xs text-slate-500">{feature.desc}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stats Bar */}
                        <div className="flex flex-wrap gap-6 pt-6 border-t border-white/20">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-violet-400 flex items-center justify-center">
                                        <stat.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                        <div className="text-xs text-slate-500">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Interactive Demo */}
                    <div className="relative perspective-2000">
                        <div
                            className="relative transform-3d transition-transform duration-300"
                            style={{
                                transform: `rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`
                            }}
                        >
                            {/* Main Demo Card */}
                            <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden glass-morphism shadow-glass group">
                                {/* Canvas Background */}
                                <canvas
                                    ref={canvasRef}
                                    className="absolute inset-0 w-full h-full"
                                />

                                {/* Animated Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
                                    {/* 3D Rotating Cube */}
                                    <div className="mb-8 perspective-1000">
                                        <div className="w-32 h-32 transform-3d animate-prism-rotate relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl opacity-80 shadow-glass" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Play className="w-16 h-16 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="glass-surface rounded-2xl p-6 text-center backdrop-blur-glass-heavy transform transition-all duration-300 hover:scale-105">
                                        <div className="flex items-center justify-center gap-2 mb-3">
                                            <Sparkles className="w-5 h-5 text-violet-500" />
                                            <span className="text-sm text-slate-600 font-medium">Interactive Demo</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                            3D Opening Sequence
                                        </h3>
                                        <p className="text-sm text-slate-600 mb-6">
                                            Experience immersive WebGL animations and smooth transitions
                                        </p>
                                        <button
                                            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl shadow-glass transform transition-all duration-300 hover:scale-105 hover:shadow-glass-interactive flex items-center gap-2 mx-auto"
                                            onClick={() => setIsPlaying(!isPlaying)}
                                        >
                                            <Play className="w-4 h-4" />
                                            {isPlaying ? 'Playing...' : 'Play Preview'}
                                        </button>
                                    </div>
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute top-6 right-6 glass-morphism rounded-full p-3 animate-pulse">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                </div>

                                {/* Corner Accents */}
                                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-white/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-white/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Tech Stack Badge */}
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 glass-morphism rounded-2xl px-6 py-3 shadow-glass whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-500 font-medium">Built with</span>
                                    <div className="flex items-center gap-2">
                                        {techStack.map((tech, i) => (
                                            <React.Fragment key={tech}>
                                                <span className="text-xs font-semibold text-slate-700">{tech}</span>
                                                {i < techStack.length - 1 && (
                                                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* 3D Shadow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-3xl transform translate-y-8 -z-10 blur-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}