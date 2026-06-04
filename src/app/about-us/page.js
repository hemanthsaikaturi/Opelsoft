import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import CountUp from '@/components/ui/CountUp';

export const metadata = {
  title: 'About OpelSoft — Talent for AI, Robotics & Deep Tech',
  description: 'OpelSoft is a specialist talent and staffing platform connecting people with leaders in artificial intelligence, robotics, and emerging technology.',
};

function Icon({ tint, children }) {
  return (
    <div className="op-icon" style={{ background: `${tint}16` }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={tint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
    </div>
  );
}

const DO = [
  { tint: '#4F46E5', title: 'Specialist Job Board', body: 'Curated roles in AI, robotics, machine learning, and automation from teams building the future.', icon: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></> },
  { tint: '#7C3AED', title: 'Talent & Staffing', body: 'Contract, direct-hire, and executive search for technical teams that need rare, vetted skills.', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></> },
  { tint: '#0EA5E9', title: 'Career Support', body: 'A profile you build once, application tracking, and guidance to help you land the right role.', icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" /> },
];

const VALUES = [
  { tint: '#4F46E5', emoji: '🛡️', title: 'Absolute Integrity', body: 'Transparent partnerships, clear communication, and honest expectations — for candidates and companies alike.' },
  { tint: '#7C3AED', emoji: '🎯', title: 'Specialist Expertise', body: 'We focus on AI, robotics, and deep tech, so we understand the roles, the skills, and the people behind them.' },
  { tint: '#10B981', emoji: '🌍', title: 'Global Reach', body: 'A worldwide network of talent and employers, connecting remote-ready professionals with ambitious teams.' },
];

const FOCUS = ['Artificial Intelligence', 'Robotics', 'Machine Learning', 'Computer Vision', 'Automation', 'Data Science', 'Embedded Systems', 'MLOps'];

export default function AboutUsPage() {
  return (
    <div style={{ background: 'var(--bg-color)', color: 'var(--text-primary)' }}>

      {/* HERO */}
      <section className="op-mesh" style={{ borderBottom: '1px solid var(--border-color)', padding: '88px 0 72px' }}>
        <div className="container" style={{ maxWidth: '860px', textAlign: 'center' }}>
          <Reveal>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--op-indigo)', fontWeight: '700', marginBottom: '18px' }}>About OpelSoft</div>
            <h1 style={{ fontSize: 'clamp(2.4rem, 5.5vw, 3.9rem)', fontWeight: '800', letterSpacing: '-0.045em', lineHeight: '1.05', marginBottom: '20px' }}>
              Connecting <span className="op-grad-text">talent</span> with <span className="op-grad-text">opportunity</span>
            </h1>
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '640px', margin: '0 auto' }}>
              OpelSoft is a specialist talent and staffing platform. We help exceptional people find roles with the companies building artificial intelligence, robotics, and emerging technology — and help those companies hire the rare skills they need.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#0B0B0F', color: '#fff', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ padding: '52px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px', textAlign: 'center' }}>
            {[{ v: 8, s: '+', l: 'Specialisms' }, { v: 20, s: '+', l: 'Industries served' }, { v: 100, s: '%', l: 'Verified employers' }, { v: 24, s: '/7', l: 'Talent sourcing' }].map((m, i) => (
              <Reveal key={i} delay={(i % 4) + 1}>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', letterSpacing: '-0.03em' }}><CountUp value={m.v} suffix={m.s} /></div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>{m.l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="section-light section-padding" style={{ background: '#fff', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '56px', alignItems: 'center' }}>
            <Reveal>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--op-indigo)', fontWeight: '700', marginBottom: '14px' }}>Our Mission</div>
              <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '20px' }}>Make great careers in deep tech accessible</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.8', marginBottom: '18px' }}>
                The most important work of the next decade is being built by small, ambitious technical teams. Yet the best people and the best opportunities rarely find each other easily.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.8' }}>
                OpelSoft exists to close that gap — pairing deep specialism in AI and robotics with a clean, human hiring experience. Whether you are taking the next step in your career or scaling a technical team, we make the process seamless.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {FOCUS.map((f) => (
                  <span key={f} className="hover-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid var(--border-color)', borderRadius: '30px', padding: '10px 18px', fontSize: '0.92rem', fontWeight: '600', boxShadow: 'var(--shadow-sm)' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--op-grad)' }} /> {f}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section-light section-padding">
        <div className="container">
          <Reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--op-indigo)', fontWeight: '700', marginBottom: '14px' }}>What We Do</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', letterSpacing: '-0.03em' }}>Built for both sides of the hire</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '24px' }}>
            {DO.map((c, i) => (
              <Reveal key={i} delay={(i % 3) + 1}>
                <div className="card-light hover-lift" style={{ padding: '32px', height: '100%' }}>
                  <Icon tint={c.tint}>{c.icon}</Icon>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', letterSpacing: '-0.02em', margin: '20px 0 10px' }}>{c.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.6' }}>{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-light section-padding" style={{ background: '#fff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <Reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--op-indigo)', fontWeight: '700', marginBottom: '14px' }}>Our Values</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', letterSpacing: '-0.03em' }}>The principles behind every match</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '24px' }}>
            {VALUES.map((v, i) => (
              <Reveal key={i} delay={(i % 3) + 1}>
                <div className="card-light hover-lift" style={{ padding: '32px', height: '100%' }}>
                  <div className="op-icon" style={{ background: `${v.tint}16`, fontSize: '1.4rem' }}>{v.emoji}</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.02em', margin: '20px 0 10px' }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.6' }}>{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '72px 0 88px' }}>
        <div className="container">
          <Reveal>
            <div className="op-grad-bg" style={{ borderRadius: '28px', padding: 'clamp(40px, 6vw, 64px) 32px', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px -20px rgba(79,70,229,0.5)' }}>
              <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: '360px', height: '360px', background: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(40px)' }} />
              <h2 style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', fontWeight: '800', letterSpacing: '-0.04em', marginBottom: '14px', position: 'relative' }}>Ready to take the next step?</h2>
              <p style={{ fontSize: '1.15rem', opacity: 0.92, maxWidth: '520px', margin: '0 auto 34px', lineHeight: '1.6', position: 'relative' }}>Browse roles in AI and robotics, or talk to our team about hiring.</p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
                <Link href="/jobs" className="op-btn" style={{ padding: '14px 30px', borderRadius: '30px', fontSize: '1rem', fontWeight: '700', background: '#fff', color: 'var(--op-indigo)', textDecoration: 'none', boxShadow: 'var(--shadow-md)' }}>Browse Opportunities</Link>
                <Link href="/contact-us" className="op-btn" style={{ padding: '14px 30px', borderRadius: '30px', fontSize: '1rem', fontWeight: '700', background: 'rgba(255,255,255,0.14)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', textDecoration: 'none' }}>Talk to us</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
