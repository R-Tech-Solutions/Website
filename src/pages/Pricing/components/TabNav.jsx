import React from 'react';

const TabNav = ({ tabs = [], active, onChange }) => {
  return (
    <div className="flex overflow-x-auto gap-2 items-center py-2">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${active === t.key ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-glass-subtle' : 'bg-white/60 text-glass-text-primary hover:bg-gray-100'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default TabNav;
