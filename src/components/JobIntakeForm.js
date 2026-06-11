'use client';

import { useState } from 'react';


const EMPTY = { name: '', contact: '', email: '' };

export default function JobIntakeForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState('');
  const [exp, setExp] = useState(1);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setMsg('');
    try {
      const r = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, experience: `${exp}+ years` }),
      });
      const d = await r.json();
      if (d.success) {
        setStatus('idle');
        setForm(EMPTY);
        setExp(1);
        setPopup(true);
      } else {
        setStatus('error');
        setMsg(d.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMsg('Network error. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={submit} className="card-light" style={{ padding: '36px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '6px' }}>Submit your details</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', marginBottom: '26px' }}>Share a few details and our team will get in touch within 1 working day.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="intake-name">Name</label>
            <input id="intake-name" className="form-control op-focus" required value={form.name} onChange={set('name')} placeholder="Your full name" autoComplete="name" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="intake-contact">Contact</label>
            <input id="intake-contact" className="form-control op-focus" required value={form.contact} onChange={set('contact')} placeholder="Phone number" autoComplete="tel" inputMode="tel" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="intake-email">Email</label>
            <input id="intake-email" type="email" className="form-control op-focus" required value={form.email} onChange={set('email')} placeholder="name@email.com" autoComplete="email" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="intake-exp">Years of Experience</label>
            <div className="exp-pick">
              <div className="exp-value">
                <span className="op-grad-text exp-num">{exp}+</span>
                <span className="exp-unit">{exp === 20 ? 'years & above' : 'years'}</span>
              </div>
              <input
                id="intake-exp" type="range" min="1" max="20" step="1" value={exp}
                onChange={(e) => setExp(Number(e.target.value))}
                className="exp-range"
                style={{ background: `linear-gradient(to right, var(--op-indigo) ${((exp - 1) / 19) * 100}%, #e5e7eb ${((exp - 1) / 19) * 100}%)` }}
                aria-label="Years of experience"
              />
              <div className="exp-scale"><span>1+</span><span>10+</span><span>20+</span></div>
            </div>
          </div>


          {status === 'error' && (
            <div className="status-alert alert-error" style={{ borderRadius: '12px' }}>{msg}</div>
          )}

          <button type="submit" disabled={status === 'sending'} className="op-btn op-grad-bg" style={{ marginTop: '4px', padding: '14px 28px', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', color: '#fff', border: 'none', cursor: 'pointer' }}>
            {status === 'sending' ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </form>

      {/* Confirmation popup */}
      {popup && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPopup(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4000, padding: '20px', animation: 'opFade 0.2s ease' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="card-light"
            style={{ maxWidth: '440px', width: '100%', background: '#fff', borderRadius: '22px', padding: '44px 36px', textAlign: 'center', boxShadow: '0 40px 90px -30px rgba(15,23,42,0.5)' }}
          >
            <div className="op-icon" style={{ width: '68px', height: '68px', borderRadius: '20px', background: 'rgba(16,185,129,0.14)', margin: '0 auto 22px' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h2 style={{ fontSize: '1.7rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '12px' }}>Thank you!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.6', marginBottom: '26px' }}>
              We&apos;ve received your details. Our executives will review them and one of our team members will contact you <strong>within 1 working day</strong>.
            </p>
            <button onClick={() => setPopup(false)} className="op-btn op-grad-bg" style={{ padding: '12px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '0.98rem', color: '#fff', border: 'none', cursor: 'pointer' }}>
              Done
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes opFade { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </>
  );
}
