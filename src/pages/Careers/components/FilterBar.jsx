import React from 'react';

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="glass-morphism p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
      <input
        aria-label="Search roles"
        type="search"
        placeholder="Search roles, skills, or keywords"
        className="px-4 py-2 rounded-md border border-border bg-input text-sm w-full md:max-w-lg"
        onChange={(e) => onChange({ ...filters, q: e.target.value })}
      />

      <select
        aria-label="Location filter"
        className="px-3 py-2 rounded-md border border-border bg-input text-sm"
        value={filters.location}
        onChange={(e) => onChange({ ...filters, location: e.target.value })}
      >
        <option value="">All locations</option>
        <option>Remote</option>
        <option>New York, USA</option>
        <option>Berlin, Germany</option>
      </select>

      <select
        aria-label="Team filter"
        className="px-3 py-2 rounded-md border border-border bg-input text-sm"
        value={filters.team}
        onChange={(e) => onChange({ ...filters, team: e.target.value })}
      >
        <option value="">All teams</option>
        <option>Engineering</option>
        <option>Design</option>
        <option>Product</option>
      </select>

      <button
        onClick={() => onChange({ q: '', location: '', team: '' })}
        className="text-sm px-3 py-2 rounded-md border border-border bg-background"
      >
        Reset
      </button>
    </div>
  );
}
