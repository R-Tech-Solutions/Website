import React, { useState } from 'react';

export default function ApplyModal({ job, open, onClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);

  if (!open || !job) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    // Simulate network request
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  }

  function handleClose() {
    // reset modal state
    setSubmitting(false);
    setSubmitted(false);
    setFile(null);
    setFileName('');
    onClose?.();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-glass" onClick={onClose}></div>
      <div className="relative max-w-2xl w-full glass-surface p-6 rounded-xl z-10">
        <header className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{submitted ? 'Thanks — application received' : `Apply for ${job.title}`}</h2>
            <p className="text-sm text-muted-foreground">{job.team} • {job.location}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-foreground/60">✕</button>
        </header>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="name" required className="col-span-1 md:col-span-2 px-3 py-2 rounded-md border border-border bg-input" placeholder="Full name" />
            <input name="email" type="email" required className="px-3 py-2 rounded-md border border-border bg-input" placeholder="Email" />
            <input name="phone" className="px-3 py-2 rounded-md border border-border bg-input" placeholder="Phone (optional)" />
            <input name="link" className="col-span-1 md:col-span-2 px-3 py-2 rounded-md border border-border bg-input" placeholder="LinkedIn or portfolio link" />

            <textarea name="message" className="col-span-1 md:col-span-2 px-3 py-2 rounded-md border border-border bg-input" rows={4} placeholder="Why do you want to join?" />

            <label className="col-span-1 md:col-span-2 block">
              <span className="text-sm text-muted-foreground">Upload resume (PDF, DOC)</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null;
                  setFile(f);
                  setFileName(f ? f.name : '');
                }}
                className="mt-2 w-full"
              />
              {fileName && <p className="mt-2 text-sm text-glass-text-secondary">Selected: {fileName}</p>}
            </label>

            <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-3">
              <button type="button" onClick={handleClose} className="px-4 py-2 rounded-md border border-border">Cancel</button>
              <button type="submit" disabled={submitting} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                {submitting ? 'Sending...' : 'Submit Application'}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 text-center">
            <p className="text-lg">Thanks for applying! We'll review your application and be in touch.</p>
            <div className="mt-4 flex justify-center">
              <button onClick={onClose} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
