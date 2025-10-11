import React from 'react';

export default function CareersHeader({ total }) {
  return (
    <section className="mb-8">
      <div className="glass-morphism p-8 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold leading-tight">Careers at R-Tech Solutions</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl">We build delightful products with a focus on performance, design, and developer experience. Join our team and help shape the future of web experiences.</p>
          <p className="mt-3 text-sm text-muted-foreground">{total} open roles — remote-friendly</p>
        </div>

        <div className="flex items-center gap-3">
          <a href="#apply" className="px-5 py-3 bg-primary text-primary-foreground rounded-md shadow-glass">See open roles</a>
          <a href="/contact-inquiry-hub" className="px-4 py-2 border border-border rounded-md">Contact us</a>
        </div>
      </div>
    </section>
  );
}
