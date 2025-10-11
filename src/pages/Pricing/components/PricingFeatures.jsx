import React from 'react';

const Feature = ({ title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    </div>
    <div>
      <h4 className="font-semibold text-glass-text-primary">{title}</h4>
      <p className="text-sm text-glass-text-secondary">{desc}</p>
    </div>
  </div>
);

const PricingFeatures = () => {
  const features = [
    { title: 'Unified Billing', desc: 'One invoice for app, web, POS and CCTV services.' },
    { title: 'Dedicated Support', desc: 'Priority SLA with 24/7 monitoring for enterprise plans.' },
    { title: 'Flexible Add-ons', desc: 'Scale features and devices independently as you grow.' },
    { title: 'Secure by Design', desc: 'Network hardening, encrypted streams, and regular audits.' },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <Feature key={i} title={f.title} desc={f.desc} />
        ))}
      </div>
    </section>
  );
};

export default PricingFeatures;
