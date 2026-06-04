import Link from 'next/link';

export const metadata = {
  title: 'Talent, Staffing & Executive Search — OpelSoft',
  description: 'OpelSoft connects organizations with vetted talent across technology, engineering, healthcare, and professional services — through contract, direct-hire, and executive search.',
};

const SOLUTIONS = [
  { name: 'IT & Software Staffing', body: 'Engineers and specialists across AI/ML, Java, Python, full-stack, cloud, and DevOps — ready to ship.' },
  { name: 'Executive Search', body: 'Confidential senior-leadership and C-suite placement, matched to your culture and growth stage.' },
  { name: 'Engineering Staffing', body: 'Hardware, embedded, manufacturing, aerospace, and energy specialists for complex technical programs.' },
  { name: 'Professional Services', body: 'Finance, accounting, HR, legal, and operations professionals to scale your back office.' },
  { name: 'Healthcare Staffing', body: 'Clinical and non-clinical roles, sourced and screened for compliance and fit.' },
  { name: 'Creative & Marketing', body: 'Product designers, copywriters, brand, and growth-marketing talent for modern teams.' },
];

const MODELS = [
  { name: 'Contract / Temporary', body: 'Flexible capacity for projects, peaks, and specialised skills — scale up or down on demand.' },
  { name: 'Direct Hire', body: 'Permanent placements where we source, screen, and shortlist so you only meet the best.' },
  { name: 'Contract-to-Hire', body: 'Try-before-you-hire engagements that de-risk permanent decisions.' },
  { name: 'Managed Capacity', body: 'A dedicated, outcome-based team that owns a function or workstream end to end.' },
];

const VALUES = [
  { title: 'Vetted Talent', body: 'Every candidate is profile-complete and screened — you review quality, not noise.' },
  { title: 'Faster Shortlists', body: 'A continuously-refreshed talent pool means roles get qualified candidates sooner.' },
  { title: 'Built for Tech', body: 'Deep coverage of engineering and digital roles, with breadth across every other function.' },
];

export default function TalentStaffingPage() {
  return (
    <div style={{ background: 'var(--bg-color)', color: 'var(--text-primary)' }}>

      {/* HERO */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border-color)', padding: '92px 0 72px' }}>
        <div className="container" style={{ maxWidth: '860px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--accent-color)', fontWeight: '700', marginBottom: '18px' }}>
            Talent &amp; Staffing
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)', fontWeight: '800', letterSpacing: '-0.04em', lineHeight: '1.06', marginBottom: '20px' }}>
            Talent, Staffing &amp; Executive Search
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '640px', margin: '0 auto 32px' }}>
            Build the team you need — your way. OpelSoft connects organizations with vetted professionals across technology, engineering, healthcare, and the wider professional landscape.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="fs-btn-pill" style={{ padding: '13px 28px', borderRadius: '30px', fontWeight: '600' }}>Hire talent</Link>
            <Link href="/contact-us" className="fs-btn-ghost" style={{ padding: '13px 28px', borderRadius: '30px', fontWeight: '600', border: '1px solid var(--border-color)', background: '#fff', color: '#09090b' }}>Talk to us</Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: '#09090b', color: '#ffffff', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ padding: '46px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px', textAlign: 'center' }}>
            {[
              { value: '6', label: 'Specialisms' },
              { value: '4', label: 'Engagement models' },
              { value: '20+', label: 'Industries served' },
              { value: '24/7', label: 'Sourcing coverage' },
            ].map((m, i) => (
              <div key={i}>
                <div style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: '800', letterSpacing: '-0.03em' }}>{m.value}</div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY OPELSOFT */}
      <section className="section-light section-padding" style={{ background: '#ffffff', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '14px' }}>Why OpelSoft</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', letterSpacing: '-0.03em' }}>Talent partners, not just a posting board</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '24px' }}>
            {VALUES.map((c, i) => (
              <div key={i} className="card-light" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '10px' }}>{c.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.6' }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAFFING SOLUTIONS */}
      <section id="solutions" className="section-light section-padding" style={{ scrollMarginTop: '90px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '14px' }}>Our Solutions</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', letterSpacing: '-0.03em' }}>Staffing &amp; executive search solutions</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {SOLUTIONS.map((s, i) => (
              <div key={i} className="card-light" style={{ padding: '30px' }}>
                <div style={{ fontFamily: 'var(--font-mono-stack)', fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-color)', marginBottom: '12px' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '10px' }}>{s.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: '1.6' }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK / ENGAGEMENT MODELS */}
      <section id="models" className="section-light section-padding" style={{ background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', scrollMarginTop: '90px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '14px' }}>How We Work</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', letterSpacing: '-0.03em' }}>Build the team you need — your way</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {MODELS.map((m, i) => (
              <div key={i} className="card-light" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '8px' }}>{m.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: '1.55' }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-light" style={{ position: 'relative', overflow: 'hidden', padding: '96px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="ambient-glow ambient-blue animate-drift-1" style={{ top: '50%', left: '50%', width: '700px', height: '400px', transform: 'translate(-50%, -50%)', opacity: 0.5 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2.1rem, 5vw, 3.2rem)', fontWeight: '800', letterSpacing: '-0.04em', marginBottom: '16px' }}>
            Let&apos;s build your team
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '540px', margin: '0 auto 36px', lineHeight: '1.6' }}>
            Tell us the roles you need filled and how you like to engage — we&apos;ll take it from there.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact-us" className="fs-btn-pill" style={{ padding: '14px 28px', borderRadius: '30px', fontSize: '1rem', fontWeight: '600', boxShadow: 'var(--shadow-md)' }}>Start a conversation</Link>
            <Link href="/register" className="fs-btn-ghost" style={{ padding: '14px 28px', borderRadius: '30px', fontSize: '1rem', fontWeight: '600', border: '1px solid var(--border-color)', background: '#ffffff', color: '#09090b' }}>Create employer account</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
