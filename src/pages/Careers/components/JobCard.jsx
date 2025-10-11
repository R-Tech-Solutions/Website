import React, { useState } from 'react';

export default function JobCard({ job, onApply }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`glass-interactive p-6 rounded-lg shadow-glass-interactive hover:shadow-glass md:p-8 transition-all duration-300 flex flex-col w-full overflow-hidden ${open ? 'ring-2 ring-ring' : ''}`}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-foreground mb-1 truncate">{job.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{job.team} • {job.location}</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-sm inline-block px-3 py-1 bg-secondary rounded-full text-secondary-foreground whitespace-nowrap">{job.type}</span>
          <button
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-background/30"
            title={open ? 'Collapse details' : 'Expand details'}
          >
            <svg className={`w-5 h-5 transform transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>

      <div className="mt-4 text-sm text-glass-text-secondary flex-1">
        <p>{job.summary}</p>
      </div>

      {open && (
        <div className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
          <h4 className="font-medium">Responsibilities</h4>
          <ul className="list-disc pl-5 mt-2 mb-3">
            <li>Collaborate with cross-functional teams to deliver high-quality features.</li>
            <li>Mentor junior engineers and improve engineering processes.</li>
            <li>Advocate for performance and accessibility best practices.</li>
          </ul>

          <h4 className="font-medium">Requirements</h4>
          <ul className="list-disc pl-5 mt-2">
            {job.skills?.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <footer className="mt-6 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {job.skills?.slice(0, 6).map((s) => (
            <span key={s} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">{s}</span>
          ))}
        </div>

        <div className="flex w-full sm:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={() => onApply(job)}
            className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm shadow-sm hover:opacity-95 transition"
          >
            Apply
          </button>
          <a
            href={`mailto:careers@example.com?subject=Application for ${encodeURIComponent(job.title)}`}
            className="w-full sm:w-auto text-center sm:text-left text-sm text-foreground/70 hover:text-foreground px-2 py-2"
          >
            Contact
          </a>
        </div>
      </footer>
    </article>
  );
}
