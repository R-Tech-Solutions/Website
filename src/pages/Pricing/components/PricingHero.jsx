import React from 'react';
import Button from '../../../components/ui/Button';

const PricingHero = ({ onCTAClick }) => {
  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <div className="glass-morphism rounded-3xl p-8 md:p-12">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-glass-text-primary to-primary bg-clip-text text-transparent">Advanced Pricing for Apps, Web, POS & CCTV</h1>
            <p className="mt-3 text-glass-text-secondary max-w-2xl">Flexible plans built for startups, scaleups and enterprises. Mix & match services — app, web, POS, network and CCTV — with transparent pricing and dedicated support.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="default" size="lg" onClick={() => onCTAClick && onCTAClick('start')}>Start a Project</Button>
              <Button variant="outline" size="lg" onClick={() => onCTAClick && onCTAClick('contact')}>Contact Sales</Button>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border">
              <div className="text-sm text-glass-text-secondary">Estimate your monthly cost</div>
              <div className="mt-3 flex items-center gap-3">
                <div className="text-2xl font-bold">$</div>
                <div className="flex flex-col">
                  <div className="text-2xl font-extrabold">499</div>
                  <div className="text-xs text-glass-text-secondary">starting price</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
