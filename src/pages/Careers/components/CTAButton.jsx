import React from 'react';

export default function CTAButton({ children, onClick, variant = 'primary' }) {
  const base = 'px-4 py-2 rounded-md text-sm shadow-sm';
  const styles = variant === 'primary' ? 'bg-primary text-primary-foreground' : 'border border-border bg-background text-foreground';

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>{children}</button>
  );
}
