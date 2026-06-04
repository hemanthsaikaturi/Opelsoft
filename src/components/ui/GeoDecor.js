// Subtle outlined geometric symbols for hero/section backgrounds.
// Purely decorative: no colored dots, just thin outlined shapes.
export default function GeoDecor() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* ring, top-right */}
      <svg width="240" height="240" viewBox="0 0 100 100" style={{ position: 'absolute', top: '-60px', right: '4%', opacity: 0.1 }}>
        <circle cx="50" cy="50" r="40" stroke="var(--op-violet)" strokeWidth="2" fill="none" />
      </svg>
      {/* rotated rounded square, lower-left */}
      <svg width="96" height="96" viewBox="0 0 100 100" style={{ position: 'absolute', bottom: '14%', left: '3%', opacity: 0.12, transform: 'rotate(16deg)' }}>
        <rect x="14" y="14" width="72" height="72" rx="12" stroke="var(--op-indigo)" strokeWidth="3" fill="none" />
      </svg>
      {/* plus, mid-left */}
      <svg width="42" height="42" viewBox="0 0 24 24" style={{ position: 'absolute', top: '24%', left: '11%', opacity: 0.16 }}>
        <path d="M12 4v16M4 12h16" stroke="var(--op-violet)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {/* triangle, lower-right */}
      <svg width="62" height="62" viewBox="0 0 100 100" style={{ position: 'absolute', top: '58%', right: '13%', opacity: 0.1 }}>
        <polygon points="50,14 86,80 14,80" stroke="var(--op-indigo)" strokeWidth="3" fill="none" strokeLinejoin="round" />
      </svg>
      {/* dashed circle, upper-mid */}
      <svg width="78" height="78" viewBox="0 0 100 100" style={{ position: 'absolute', top: '6%', left: '42%', opacity: 0.09 }}>
        <circle cx="50" cy="50" r="38" stroke="var(--op-violet)" strokeWidth="2" strokeDasharray="6 9" fill="none" />
      </svg>
    </div>
  );
}
