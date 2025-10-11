import React from 'react';
import Button from '../../../components/ui/Button';

const PricingCard = ({ title, price, priceUnit, features = [], popular = false, cta='Start', onCTAClick }) => {
  return (
    <div className={`glass-surface rounded-2xl p-6 shadow-glass ${popular ? 'ring-2 ring-primary/30 scale-100' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-glass-text-primary">{title}</h3>
          <p className="text-sm text-glass-text-secondary mt-1">{priceUnit}</p>
        </div>
        {popular && (
          <div className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-full">Most popular</div>
        )}
      </div>

      <div className="mt-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-glass-text-primary">{price}</span>
          <span className="text-sm text-glass-text-secondary">/mo</span>
        </div>
      </div>

      <ul className="mt-6 space-y-2 text-sm text-glass-text-secondary">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <svg className="w-4 h-4 mt-1 text-primary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.704 5.29a1 1 0 01.083 1.32l-7 9a1 1 0 01-1.49.083l-4-4a1 1 0 011.32-1.497L8 13.584l6.877-8.484a1 1 0 011.827.19z" clipRule="evenodd" />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={onCTAClick}
          className={popular ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-glass-interactive' : ''}
        >
          {cta}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
