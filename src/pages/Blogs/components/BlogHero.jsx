import React from 'react';
import Button from '../../../components/ui/Button';

export default function BlogHero({ total = 24 }) {
  return (
    <section className="glass-morphism p-8 rounded-xl mb-8 relative overflow-hidden">
      {/* subtle floating ornament */}
      <div className="absolute -right-12 -top-8 w-48 h-48 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl animate-prism-rotate opacity-80 pointer-events-none"></div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="fade-up">
          <h2 className="text-3xl lg:text-4xl font-semibold gradient-accent">Stories & Insights</h2>
          <p className="mt-2 text-muted-foreground max-w-xl">Deep dives, tutorials, and case studies from our engineers and designers. Learn how we ship fast, build clean, and craft delightful experiences.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="default" size="lg" iconName="Sparkles" className="transform hover:-translate-y-1 transition">Latest</Button>
            <Button variant="outline" size="lg" iconName="Layers" className="transform hover:scale-105 transition">Topics</Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground fade-up">
          <div className="text-2xl font-bold gradient-accent">{total}</div>
          <div className="mt-1">Articles</div>
        </div>
      </div>
    </section>
  );
}
