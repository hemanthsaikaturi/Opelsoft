'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginClient({ candidate, employer }) {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const executeLogin = async (identifier, pwd) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ usernameOrEmail: identifier, password: pwd })
      });
      const data = await res.json();
      if (data.success) {
        // Do NOT call router.refresh() here: refreshing /login around the push
        // races with the navigation and can strand the user on /login. The
        // target dashboards are force-dynamic, so they render fresh with the
        // new session on navigation.
        if (data.user.role === 'candidate') {
          router.push('/dashboard/candidate');
        } else if (data.user.role === 'employer') {
          router.push('/dashboard/employer');
        } else {
          router.push('/');
        }
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usernameOrEmail || !password) {
      setError('Please fill in both fields.');
      return;
    }
    executeLogin(usernameOrEmail, password);
  };

  return (
    <div className="op-mesh" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - var(--header-height) - 80px)', padding: '48px 24px' }}>
      <div className="card-light animate-fade-in" style={{ width: '100%', maxWidth: '940px', padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', boxShadow: '0 30px 70px -24px rgba(17,24,39,0.28)' }}>

        {/* Brand panel */}
        <div className="op-grad-bg" style={{ color: '#fff', padding: '44px 40px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '320px', height: '320px', background: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(40px)' }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontSize: '1.9rem', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.15', marginBottom: '16px' }}>Welcome back to OpelSoft</h2>
            <p style={{ fontSize: '1rem', opacity: 0.92, lineHeight: '1.6', marginBottom: '26px' }}>Your gateway to roles at the companies building what&apos;s next.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Apply to specialist roles in clicks', 'Track every application in one place', 'Build a profile that works for you'].map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.95rem', fontWeight: '500' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M20 6 9 17l-5-5" /></svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: '44px 40px', background: '#fff' }}>
          <h1 style={{ fontSize: '1.7rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '6px' }}>Sign in</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '24px' }}>Access your candidate or employer dashboard.</p>

          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '12px 16px', borderRadius: '10px', fontSize: '13px', marginBottom: '20px', textAlign: 'center' }}>⚠️ {error}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Email or Username</label>
              <input type="text" id="username" className="form-control op-focus" placeholder="name@company.com" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} required disabled={loading} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input type="password" id="password" className="form-control op-focus" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
            </div>
            <button type="submit" className="op-btn op-grad-bg" style={{ marginTop: '6px', padding: '12px', borderRadius: '12px', fontWeight: '700', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.98rem' }} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {(candidate || employer) && (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.08em', marginBottom: '12px', textAlign: 'center', fontWeight: '700' }}>Quick sign in (demo)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {candidate && <button onClick={() => executeLogin(candidate.username, 'password123')} className="op-btn" style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)', background: '#fff', fontWeight: '600', cursor: 'pointer' }} disabled={loading}>👤 Enter as Candidate</button>}
                {employer && <button onClick={() => executeLogin(employer.username, 'password123')} className="op-btn" style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)', background: '#fff', fontWeight: '600', cursor: 'pointer' }} disabled={loading}>🏢 Enter as Employer</button>}
              </div>
            </div>
          )}

          <div style={{ marginTop: '22px', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Don&apos;t have an account? <Link href="/register" className="op-underline" style={{ color: 'var(--op-indigo)', fontWeight: '700' }}>Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
