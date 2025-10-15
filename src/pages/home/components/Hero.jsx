import React, { useState, useEffect, useRef } from 'react';
import { Cpu, ShieldCheck, Network, Workflow } from 'lucide-react';

// ParallaxImage component (local to Hero)
function ParallaxImage() {
    const ref = useRef(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const windowH = window.innerHeight || document.documentElement.clientHeight;
            // calculate parallax offset when element enters viewport
            const visible = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)));
            setOffset((visible - 0.5) * 20); // -10 to 10 range
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);
    return (
        <div ref={ref} className="space-y-6">
            <div className="relative h-96 md:h-[520px] overflow-hidden rounded-3xl shadow-lg">
                <img
                    src="/new brand.png"
                    alt="Showcase"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ transform: `translateY(${offset}px)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 opacity-30" />
            </div>
        </div>
    );
}

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPlaying, setIsPlaying] = useState(false);
    const [typedText, setTypedText] = useState('');
    const canvasRef = useRef(null);
    const fullText = 'Cutting-Edge Solutions';
    const halftext = 'Web Development , App Development , Custom Software Development , POS Solution , CCTV & Networking';
    const newtext = 'in';
    const paragraph = 'Srilanka';
    const [loopText, setLoopText] = useState('');
    const phrases = halftext.split(',').map(s => s.trim()).filter(Boolean);

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

    // Looping typed + erase for halftext phrases
    useEffect(() => {
        let phraseIndex = 0;
        let charIndex = 0;
        let deleting = false;
        let timeout;

        const tick = () => {
            const current = phrases[phraseIndex] || '';
            if (!deleting) {
                if (charIndex <= current.length) {
                    setLoopText(current.slice(0, charIndex));
                    charIndex++;
                    timeout = setTimeout(tick, 120);
                } else {
                    // pause at full phrase
                    deleting = true;
                    timeout = setTimeout(tick, 900);
                }
            } else {
                if (charIndex > 0) {
                    charIndex--;
                    setLoopText(current.slice(0, charIndex));
                    timeout = setTimeout(tick, 60);
                } else {
                    // move to next phrase
                    deleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    timeout = setTimeout(tick, 300);
                }
            }
        };

        tick();

        return () => clearTimeout(timeout);
    }, [halftext]);

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
        {
            icon: Cpu,
            label: 'Next-Gen Digital Solutions',
            desc: 'Future-ready tech for modern business',
            color: 'from-sky-500 to-blue-600'
        },
        {
            icon: ShieldCheck,
            label: 'Advanced Security & Surveillance',
            desc: 'Smart systems to keep you protected',
            color: 'from-purple-500 to-indigo-600'
        },
        {
            icon: Network,
            label: 'Smart Infrastructure Design',
            desc: 'Efficient, scalable IT frameworks',
            color: 'from-emerald-500 to-green-600'
        },
        {
            icon: Workflow,
            label: 'Reliable System Integration',
            desc: 'Seamless tech connectivity made easy',
            color: 'from-amber-500 to-orange-600'
        }
    ];
    return (
        <section className="relative pt-32 pb-20 overflow-hidden" onMouseMove={handleMouseMove}>
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 sm:space-y-8 relative">
                        {/* Heading with small logo beside it on mobile */}
                        <div className="flex items-center justify-between relative">
                            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 flex-1">
                                <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 bg-clip-text text-transparent whitespace-nowrap sm:whitespace-normal overflow-hidden">
                                    {typedText}
                                </span>
                                <span className="animate-pulse text-blue-500">|</span>
                            </h1>
                        </div>

                        {/* Looping phrases */}
                        <div className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-5xl text-slate-700 font-semibold">
                            <span className="mr-2">{loopText}</span>
                            <span className="text-blue-500 animate-pulse">|</span>
                        </div>

                        {/* "in Sri Lanka" section with small image beside */}
                        <div className="flex items-center gap-2">
                            {newtext}
                            <span
                                className="text-2xl sm:text-4xl font-bold"
                                style={{
                                    backgroundImage: `url('/new.png')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    color: 'transparent',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                }}
                            >
                                {paragraph}
                            </span>
                        </div>

                        {/* Mobile logo card (box, rounded) - appears only on small screens and sits before the description */}
                        <div className="sm:hidden w-auto h-36 mx-auto mb-4 rounded-xl overflow-hidden shadow-md border border-gray-200">
                            <img
                                src="/new brand.png"
                                alt="Mobile Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Description */}
                        <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                            We design and build digital products that are fast, accessible, and delightful. Our team blends design,
                            animation, and engineering to ship production-ready web experiences.
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 sm:pt-8">
                            {features.map((feature, i) => (
                                <div
                                    key={i}
                                    className="glass-interactive rounded-2xl p-4 transform transition-all duration-300 hover:scale-105 group"
                                    style={{
                                        animationDelay: `${i * 100}ms`,
                                    }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-glass transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}
                                        >
                                            <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-slate-900 text-sm mb-1">{feature.label}</div>
                                            <div className="text-xs text-slate-500">{feature.desc}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right-side image for large screens */}
                    <div className="relative hidden lg:block">
                        <ParallaxImage />
                    </div>
                </div>
            </div>
        </section>
    );
}