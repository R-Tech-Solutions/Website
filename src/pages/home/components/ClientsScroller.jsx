import React, { useEffect, useRef, useState } from 'react';

export default function ClientsScroller({ count = 12 }) {
  const scrollerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const clients = [
    { id: 1, name: 'EcoLankan Tours', image: '/assets/Clients/St1.jpeg' },
    { id: 2, name: 'SoapstoRis', image: '/assets/Clients/St2.jpeg' },
    { id: 3, name: 'E-Line Technologies', image: '/assets/Clients/St3.png' },
    { id: 4, name: 'Heartland Trading', image: '/assets/Clients/St4.jpg' },
    { id: 5, name: 'Champika Export', image: '/assets/Clients/St5.png' },
    { id: 6, name: 'Ride With Me', image: '/assets/Clients/St6.jpg' },
    { id: 7, name: 'Twilight Blue Security Systems', image: '/assets/Clients/St7.png' },
    { id: 8, name: 'X-guard', image: '/assets/Clients/St8.png' },
    { id: 9, name: 'Pasyale Wedamedura', image: '/assets/Clients/St9.png' },
    { id: 10, name: 'Adspire DIGITAL', image: '/assets/Clients/St10-1.png' }
  ];

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
                <div key={`${client.id}-${index}`} className="flex-shrink-0 group">
                  <div className="relative w-64 h-40 rounded-2xl overflow-hidden transform transition-transform duration-500 hover:scale-105 shadow-md bg-white/60 flex items-center justify-center">
                    {/* Image - use object-contain so logos with different aspect ratios fit inside the fixed card height */}
                    <img
                      src={client.image}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain block p-4"
                      style={{ width: '100%', height: '100%' }}
                    />

                    {/* Hover overlay with name */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center px-4">
                        <h4 className="text-white text-lg font-semibold">{client.name}</h4>
                      </div>
                    </div>
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