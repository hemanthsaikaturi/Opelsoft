'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterClient() {
  const router = useRouter();
  const [role, setRole] = useState('candidate'); // 'candidate' | 'employer'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, email, password, role })
      });
      const data = await res.json();
      
      if (data.success) {
        setSuccess(data.message || 'Registration successful! Redirecting...');
        router.refresh();
        setTimeout(() => {
          if (role === 'candidate') {
            router.push('/dashboard/candidate');
          } else {
            router.push('/dashboard/employer');
          }
        }, 1500);
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleCard = (value, emoji, title, sub) => (
    <div
      onClick={() => !loading && setRole(value)}
      className="op-btn"
      style={{
        padding: '16px', textAlign: 'center', cursor: 'pointer', borderRadius: '14px', border: `1.5px solid ${role === value ? 'var(--op-indigo)' : 'var(--border-color)'}`, background: role === value ? 'rgba(79,70,229,0.06)' : '#fff', transition: 'border-color 0.2s, background 0.2s', }}
    >
      <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>{emoji}</span>
      <strong style={{ fontSize: '13px', display: 'block' }}>{title}</strong>
      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{sub}</span>
    </div>
  );

  return (
    <div className="op-mesh" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - var(--header-height) - 80px)', padding: '48px 24px' }}>
      <div className="card-light animate-fade-in" style={{ width: '100%', maxWidth: '960px', padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', boxShadow: '0 30px 70px -24px rgba(17,24,39,0.28)' }}>

        {/* Brand panel */}
        <div className="op-grad-bg" style={{ color: '#fff', padding: '44px 40px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', bottom: '-20%', left: '-20%', width: '320px', height: '320px', background: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(40px)' }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontSize: '1.9rem', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.15', marginBottom: '16px' }}>Start your journey in deep tech</h2>
            <p style={{ fontSize: '1rem', opacity: 0.92, lineHeight: '1.6', marginBottom: '26px' }}>Join OpelSoft and connect with the teams building what&apos;s next.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Free for candidates, always', 'One profile for every application', 'Roles from teams building the future'].map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.95rem', fontWeight: '500' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M20 6 9 17l-5-5" /></svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: '40px', background: '#fff' }}>
          <h1 style={{ fontSize: '1.7rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '6px' }}>Create your account</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '22px' }}>Pick how you want to use OpelSoft.</p>

          {error && <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', padding: '12px 16px', borderRadius: '10px', fontSize: '13px', marginBottom: '18px', textAlign: 'center' }}>⚠️ {error}</div>}
          {success && <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981', padding: '12px 16px', borderRadius: '10px', fontSize: '13px', marginBottom: '18px', textAlign: 'center' }}>✓ {success}</div>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '22px' }}>
            {roleCard('candidate', '👤', 'Candidate', 'Find & apply to jobs')}
            {roleCard('employer', '🏢', 'Employer', 'Post jobs & recruit')}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="register-email">Email Address</label>
              <input type="email" id="register-email" className="form-control op-focus" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="register-username">Username</label>
              <input type="text" id="register-username" className="form-control op-focus" placeholder="choose_username" value={username} onChange={(e) => setUsername(e.target.value)} required disabled={loading} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="register-password">Password</label>
              <input type="password" id="register-password" className="form-control op-focus" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
            </div>
            <button type="submit" className="op-btn op-grad-bg" style={{ marginTop: '6px', padding: '12px', borderRadius: '12px', fontWeight: '700', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.98rem' }} disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <div style={{ marginTop: '22px', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Already have an account? <Link href="/login" className="op-underline" style={{ color: 'var(--op-indigo)', fontWeight: '700' }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
