'use client';

import { useState } from 'react';

/** Bookmark/save toggle for job cards (local visual state). */
export default function SaveButton({ label = 'Save job' }) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSaved((s) => !s); }}
      aria-label={saved ? 'Saved' : label}
      aria-pressed={saved}
      className="op-btn"
      style={{
        width: '36px', height: '36px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid var(--border-color)', background: saved ? 'rgba(79,70,229,0.1)' : '#fff', cursor: 'pointer', flexShrink: 0,
      }}
    >
      <svg width="17" height="17" viewBox="0 0 24 24"
        fill={saved ? '#4F46E5' : 'none'} stroke={saved ? '#4F46E5' : 'var(--text-secondary)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}
