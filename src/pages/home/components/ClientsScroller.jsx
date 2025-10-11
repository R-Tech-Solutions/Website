import React, { useEffect, useRef, useState } from 'react';

export default function ClientsScroller({ count = 12 }) {
  const scrollerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Generate mock client data with colors
  const clients = Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: `Client ${i + 1}`,
    logo: String.fromCharCode(65 + (i % 26)), // A-Z letters
    color: `hsl(${(i * 360) / count}, 70%, 60%)`,
    gradient: `linear-gradient(135deg, hsl(${(i * 360) / count}, 70%, 60%), hsl(${((i + 2) * 360) / count}, 70%, 50%))`
  }));

  // Duplicate clients for seamless loop
  const displayClients = [...clients, ...clients];

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed;
        const maxScroll = scroller.scrollWidth / 2;
        
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        
        scroller.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section 
      id="clients" 
      className="relative py-24 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Glass Effect */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block glass-morphism rounded-full px-6 py-2 mb-4">
            <span className="text-sm font-medium text-blue-600 tracking-wider uppercase">
              Trusted Partners
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 bg-clip-text text-transparent leading-tight">
            Our Satisfied Clients
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join hundreds of companies that trust us to deliver exceptional results
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-blue-400"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-violet-400"></div>
          </div>
        </div>

        {/* Clients Scroller */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none"></div>

          {/* Scroller Container */}
          <div 
            ref={scrollerRef}
            className="overflow-x-hidden py-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-8">
              {displayClients.map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="flex-shrink-0 group perspective-1000"
                >
                  <div className="relative w-64 h-40 transform-3d transition-all duration-500 hover:scale-105">
                    {/* Glass Card */}
                    <div className="glass-interactive rounded-2xl p-8 h-full flex flex-col items-center justify-center space-y-4 relative overflow-hidden">
                      {/* Animated Background Gradient */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                        style={{ background: client.gradient }}
                      />
                      
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600">
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          style={{
                            transform: 'translateX(-100%)',
                            animation: 'shimmer 2s infinite'
                          }}
                        />
                      </div>

                      {/* Logo Circle */}
                      <div 
                        className="relative w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-glass transform transition-transform duration-600 group-hover:rotate-12 group-hover:scale-110"
                        style={{ background: client.gradient }}
                      >
                        {client.logo}
                        
                        {/* Pulsing Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-0 group-hover:opacity-100"></div>
                      </div>

                      {/* Client Name */}
                      <div className="relative z-10">
                        <h4 className="text-lg font-semibold text-slate-800 group-hover:text-white transition-colors duration-300 text-center">
                          {client.name}
                        </h4>
                        <p className="text-xs text-slate-500 group-hover:text-white/80 transition-colors duration-300 text-center mt-1">
                          Premium Partner
                        </p>
                      </div>

                      {/* Decorative Corner Elements */}
                      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* 3D Shadow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-2xl transform translate-y-2 -z-10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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