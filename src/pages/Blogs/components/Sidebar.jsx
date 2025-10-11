import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

export default function Sidebar({ onSearch = () => {} }) {
  const [q, setQ] = React.useState('');
  return (
    <aside className="space-y-6">
      <div className="glass-surface p-4 rounded-lg">
        <h4 className="text-sm font-semibold">Search</h4>
        <div className="mt-3">
          <Input placeholder="Search articles, tags or authors" value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="default" onClick={() => onSearch(q)}>Search</Button>
            <Button size="sm" variant="outline" onClick={() => { setQ(''); onSearch(''); }}>Reset</Button>
          </div>
        </div>
      </div>

      <div className="glass-surface p-4 rounded-lg">
        <h4 className="text-sm font-semibold">Popular tags</h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {['React', 'Design', 'Performance', 'Vite', 'UX', 'Case Study'].map((t, i) => (
            <button key={t} className={`text-xs px-3 py-1 rounded-full border border-input text-muted-foreground hover:shadow-glass-interactive transition ${i % 2 ? 'bg-primary/5 text-primary' : 'bg-accent/5 text-accent'}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="glass-surface p-4 rounded-lg">
        <h4 className="text-sm font-semibold">Subscribe</h4>
        <p className="text-sm text-muted-foreground mt-2">Get our monthly newsletter with the best articles.</p>
        <div className="mt-3">
          <Input placeholder="your@email.com" />
          <div className="mt-3">
            <Button size="sm" fullWidth className="bg-gradient-to-r from-primary to-accent animate-glow">Subscribe</Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
